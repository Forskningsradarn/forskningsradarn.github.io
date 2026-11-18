#!/usr/bin/env python3
"""Hämta tillåtna RSS/Atom-flöden, PubMed och Crossref för en statisk nyhetssida.

Kör: python scripts/update_feeds.py
Inga externa Python-paket krävs. Hämtar enbart metadata och korta ingresser.
"""
from __future__ import annotations

import datetime as dt
import email.utils
import hashlib
import html
import json
import logging
import re
import sys
import time
from zoneinfo import ZoneInfo
import urllib.error
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET
from html.parser import HTMLParser
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SOURCES_FILE = ROOT / 'data' / 'sources.json'
OUTPUT_FILE = ROOT / 'data' / 'articles.json'
STATUS_FILE = ROOT / 'test-output' / 'source_status.json'
NOW = dt.datetime.now(dt.timezone.utc)
STOCKHOLM = ZoneInfo("Europe/Stockholm")
RETENTION_DAYS = 90
MAX_ITEMS_PER_FEED = 40
MAX_TOTAL = 1800
USER_AGENT = 'Forskningsradarn/1.0 (RSS and scientific metadata monitoring; contact via repository)'
NS_MEDIA = '{http://search.yahoo.com/mrss/}'
logging.basicConfig(level=logging.INFO, format='%(asctime)s %(levelname)-7s %(message)s')


def absolute(url, base=''):
    if not url:
        return ''
    try:
        u = urllib.parse.urlparse(urllib.parse.urljoin(base, str(url).strip()))
        if u.scheme not in ('http', 'https') or not u.netloc:
            return ''
        return u.geturl()
    except ValueError:
        return ''


def http_get(url, accept='application/rss+xml, application/atom+xml, application/xml, text/xml, text/html;q=0.8, */*;q=0.5'):
    req = urllib.request.Request(url, headers={'User-Agent':USER_AGENT, 'Accept':accept, 'Accept-Language':'sv-SE,sv;q=0.9,en;q=0.6'})
    with urllib.request.urlopen(req, timeout=18) as resp:
        if int(resp.status) >= 400:
            raise RuntimeError('HTTP '+str(resp.status))
        raw = resp.read(5_000_000 + 1)
        if len(raw)>5_000_000:
            raise RuntimeError('Källan överskred tillåten storlek (5 MB)')
        return raw, resp.headers.get('Content-Type', ''), resp.geturl()


def get_json(url):
    raw, _, _ = http_get(url, 'application/json')
    return json.loads(raw.decode('utf-8-sig'))


class FeedDiscovery(HTMLParser):
    def __init__(self):
        super().__init__()
        self.candidates = []

    def handle_starttag(self, tag, attrs):
        if tag != 'link':
            return
        attrs = dict(attrs)
        typ = (attrs.get('type') or '').lower()
        rel = (attrs.get('rel') or '').lower()
        if 'alternate' in rel and ('rss' in typ or 'atom' in typ):
            self.candidates.append(attrs.get('href', ''))


def autodiscover(homepage):
    raw, ct, final_url = http_get(homepage, 'text/html,application/xhtml+xml')
    if 'xml' in ct and ('rss' in raw[:1000].decode('utf-8','ignore').lower() or '<feed' in raw[:1000].decode('utf-8','ignore').lower()):
        return final_url
    p = FeedDiscovery()
    p.feed(raw.decode('utf-8', 'replace'))
    feed_urls = [absolute(x, final_url) for x in p.candidates]
    feed_urls = [x for x in feed_urls if x]
    if not feed_urls:
        raise RuntimeError('Ingen RSS-/Atom-länk hittades i sidans HTML')
    # Föredra RSS-flöde med generell nyhetsbevakning.
    feed_urls.sort(key=lambda u: ('rss' not in u.lower(), 'news' not in u.lower() and 'nyhet' not in u.lower(), len(u)))
    return feed_urls[0]


def first(el, names):
    for name in names:
        match = el.find(name)
        if match is not None:
            text = ''.join(match.itertext()).strip()
            if text:
                return text
    return ''


def strip_html(raw, limit=230):
    if not raw:
        return ''
    s = html.unescape(str(raw))
    s = re.sub(r'(?is)<(script|style)\b[^>]*>.*?</\1>', ' ', s)
    s = re.sub(r'<[^>]+>', ' ', s)
    s = re.sub(r'\s+', ' ', s).strip()
    return s[:limit].rstrip(' ,;:.') + ('…' if len(s)>limit else '')


class FirstHTMLImage(HTMLParser):
    """Find the first image included in RSS HTML, without fetching article pages."""
    def __init__(self):
        super().__init__()
        self.images=[]

    def handle_starttag(self, tag, attrs):
        if tag.lower()=='img':
            a=dict(attrs)
            u=a.get('src') or a.get('data-src') or ''
            if u:
                self.images.append(u)


def image_info(item, source):
    """Image metadata from RSS/Atom: media namespace, enclosures, HTML images.

    Do not make additional requests for article pages or use unrelated stock images.
    Editorial images are hotlinked, not copied. Publishers may restrict reuse.
    """
    images=[]
    base=source.get('homepage','')
    def candidate(url, width=0, credit='', alt='', priority=0):
        url=absolute(url, base)
        if not url.startswith('https://'):
            return
        if url.lower().split('?')[0].endswith(('.svg','.gif')):
            return
        try:
            width=int(width)
        except (ValueError,TypeError):
            width=0
        images.append((priority,width,url,strip_html(credit,150),strip_html(alt,180)))

    for elem in item.iter():
        tag=elem.tag.lower()
        if not isinstance(tag,str):
            continue
        if tag in (NS_MEDIA+'content', NS_MEDIA+'thumbnail'):
            typ=(elem.attrib.get('type') or '').lower()
            medium=(elem.attrib.get('medium') or '').lower()
            url=elem.attrib.get('url','')
            # Exclude audio / video content.
            if (typ and not typ.startswith('image/')) or medium in ('video','audio'):
                continue
            credit=first(elem,[NS_MEDIA+'copyright'])
            alt=first(elem,[NS_MEDIA+'description',NS_MEDIA+'title'])
            candidate(url,elem.attrib.get('width'),credit,alt,30 if tag==NS_MEDIA+'content' else 20)
        elif tag.endswith('}enclosure') or tag=='enclosure':
            typ=(elem.attrib.get('type') or '').lower()
            if typ.startswith('image/'):
                candidate(elem.attrib.get('url',''),0,priority=25)
        elif tag in ('{http://www.itunes.com/dtds/podcast-1.0.dtd}image','image'):
            candidate(elem.attrib.get('href') or elem.attrib.get('url') or '',0,priority=15)
        elif tag.endswith('}link'):
            if elem.attrib.get('rel')=='enclosure' and elem.attrib.get('type','').startswith('image/'):
                candidate(elem.attrib.get('href',''),0,priority=25)

    for tag in ('description','{http://purl.org/rss/1.0/modules/content/}encoded','{http://www.w3.org/2005/Atom}summary','{http://www.w3.org/2005/Atom}content'):
        el=item.find(tag)
        if el is not None:
            body=''.join(el.itertext())
            parser=FirstHTMLImage()
            try:
                parser.feed(html.unescape(body[:40000]))
                for url in parser.images[:3]:
                    candidate(url,0,priority=5)
            except Exception:
                pass
    if not images:
        return '', '', ''
    # Prefer a medium/large image to tiny thumbnails. Among matching sizes,
    # prefer Media RSS images ahead of an arbitrary image in HTML description.
    images.sort(key=lambda x:(1 if x[1]>=400 else 0, x[0], min(x[1],1600)), reverse=True)
    chosen=images[0]
    return chosen[2],chosen[3],chosen[4]


def published_meta(raw):
    """Return a trustworthy publication time and its precision.

    Never invent the current time for a missing date, or accept a future date.
    Sources can publish dates precise only to the year or month: those remain
    useful in the archive but must not be counted as published within 24 h.
    """
    precision = 'instant'
    parsed = None
    raw_text = str(raw or '').strip()
    if isinstance(raw, dt.datetime):
        parsed = raw
    elif not raw_text:
        return '', 'unknown', 'Publiceringsdatum saknas hos källan'
    else:
        if re.fullmatch(r'\d{4}', raw_text):
            precision = 'year'
            raw_text += '-01-01'
        elif re.fullmatch(r'\d{4}-\d{2}', raw_text):
            precision = 'month'
            raw_text += '-01'
        elif re.fullmatch(r'\d{4}[-/]\d{2}[-/]\d{2}', raw_text):
            precision = 'day'
        try:
            parsed = email.utils.parsedate_to_datetime(raw_text)
        except (TypeError, ValueError):
            pass
        if parsed is None:
            try:
                parsed = dt.datetime.fromisoformat(raw_text.replace('/', '-').replace('Z', '+00:00'))
            except (TypeError, ValueError):
                for fmt, fmt_precision in (
                    ('%Y %b %d', 'day'), ('%Y %B %d', 'day'),
                    ('%Y %b', 'month'), ('%Y %B', 'month'),
                    ('%Y/%m/%d %H:%M', 'instant'),
                ):
                    try:
                        parsed = dt.datetime.strptime(raw_text, fmt)
                        precision = fmt_precision
                        break
                    except (TypeError, ValueError):
                        continue
    if parsed is None:
        return '', 'unknown', 'Publiceringsdatum gick inte att tolka'
    if parsed.tzinfo is None:
        parsed = parsed.replace(tzinfo=dt.timezone.utc)
    parsed = parsed.astimezone(dt.timezone.utc)
    if parsed > NOW + dt.timedelta(minutes=5):
        return '', 'unknown', 'Källan anger ett framtida publiceringsdatum'
    if parsed.year < 1900:
        return '', 'unknown', 'Publiceringsdatum är orimligt gammalt'
    return parsed.isoformat(timespec='seconds'), precision, ''


def parse_date(raw):
    return published_meta(raw)[0]


def choose_pubmed_date(rec):
    """Electronic publication first; fall back only to valid dated metadata."""
    for field in ('epubdate', 'pubdate', 'sortpubdate'):
        value = rec.get(field)
        published, precision, note = published_meta(value)
        if published:
            return published, precision, ''
    return '', 'unknown', 'Publiceringsdatum saknas eller ligger i framtiden hos PubMed'


def crossref_date(rec):
    """Prefer first online release, then posted/issued print dates."""
    for field in ('published-online', 'posted', 'published', 'issued', 'published-print'):
        value = rec.get(field) or {}
        parts = value.get('date-parts') or []
        if not parts or not isinstance(parts[0], list):
            continue
        d = parts[0]
        try:
            if not d or not 1 <= len(d) <= 3:
                continue
            date = dt.date(int(d[0]), int(d[1]) if len(d) > 1 else 1, int(d[2]) if len(d) > 2 else 1)
        except (TypeError, ValueError):
            continue
        precision = {1:'year', 2:'month', 3:'day'}[len(d)]
        published, _, _ = published_meta(date.isoformat())
        if published:
            return published, precision, ''
    return '', 'unknown', 'Publiceringsdatum saknas eller ligger i framtiden hos Crossref'


def stockholm_day(timestamp):
    published, _, _ = published_meta(timestamp)
    if not published:
        return None
    return dt.datetime.fromisoformat(published).astimezone(STOCKHOLM).date()

KEYWORDS = {
    'medicin': ['medic','health','cancer','tumour','tumor','disease','patient','hospital','vård','hjärn','brain','neuro','dement','diabet','vaccin','behandling','therapy','sjuk','läkemedel','psychiat','depression','infektion','antibiot','immun'],
    'klimat': ['climate','environment','carbon','ocean','warming','forest','energy','emission','global uppvärm','miljö','klimat','skog','utsläpp','glaci','isberg','pfa','ekosystem','hållbar'],
    'teknik': ['artificial intelligence','robot','algorithm','quantum','technology','teknik','ai ','machine learning','dator','fysik','materials','computer','digital','nanoteknik'],
    'rymd': ['astro','planet','galaxy','galax','star','satellite','space','nasa','solar system','universum','rymd','exoplanet','moon'],
    'biologi': ['species','genetic','gene ','biology','animal','biodivers','ecology','genetik','djur','växt','artskydd','mikrob','natur','insek','fåg'],
    'samhalle': ['school','education','economy','social','politic','psychology','policy','samhäll','skola','betyg','demokrati','migration','arbets','psykolog','utbildning','histor','kultur']
}


def topic_for(title, desc, source=None):
    text = (title+' '+desc).lower()
    scores={topic:sum(2 if token in title.lower() else 1 for token in words if token in text) for topic,words in KEYWORDS.items()}
    best=max(scores,key=scores.get)
    if scores[best]>0:
        return best
    if source:
        if 'arxiv_ai' in source:
            return 'teknik'
        if 'arxiv_bio' in source:
            return 'biologi'
        if 'arxiv_astro' in source:
            return 'rymd'
        if source.startswith('pubmed') or source=='naturemedicine':
            return 'medicin'
    return 'ovrigt'


def article_id(source_id, url):
    return hashlib.sha1((source_id+'|'+url).encode('utf-8')).hexdigest()[:20]


def is_navigation_item(source_id, url):
    # Ny Teknik's RSS currently includes three persistent site/promotional links.
    if source_id != 'nyteknik':
        return False
    p = urllib.parse.urlparse(url).path.rstrip('/')
    return p in ('/a', '/tipsa', '/klurigheter')


def make_article(source_id, title, description, published, link, kind='news', doi='', precision=None, date_note=None):
    title = strip_html(title, 230)
    description = strip_html(description, 230)
    link=absolute(link)
    if not title or not link or is_navigation_item(source_id,link):
        return None
    t=topic_for(title,description,source_id)
    clean, detected_precision, note = published_meta(published)
    return {'id':article_id(source_id,link),'source_id':source_id,'title':title,'description':description,'published':clean,'date_precision':precision or detected_precision,'date_note':date_note or note,'first_seen_at':NOW.isoformat(timespec='seconds'),'url':link,'doi':doi,'image':'','image_credit':'','image_alt':'','topic':t,'kind':kind}


def parse_rss(raw, source):
    try:
        root=ET.fromstring(raw)
    except ET.ParseError as err:
        raise RuntimeError('Felaktig RSS/Atom XML: '+str(err)) from err
    items=root.findall('./channel/item') or root.findall('{*}item')
    atom=False
    if not items:
        items=root.findall('{*}entry')
        atom=True
    if not items:
        raise RuntimeError('RSS/Atom innehåller inga artiklar')
    is_preprint=source['id'].startswith('arxiv_')
    is_study=source['group']=='studier'
    kind='preprint' if is_preprint else ('study' if is_study else ('press' if source['group']=='svenska' else 'news'))
    results=[]
    for item in items[:MAX_ITEMS_PER_FEED]:
        title=first(item,['title','{*}title'])
        summary=first(item,['description','{*}description','{*}summary','{*}content','{http://purl.org/rss/1.0/modules/content/}encoded'])
        # .itertext() of title and summary is suitable for plain and inline HTML.
        rawdate=first(item,['pubDate','{http://purl.org/dc/elements/1.1/}date','{*}published','{*}updated','{*}date'])
        url=''
        if atom:
            links=item.findall('{*}link')
            preferred=next((l for l in links if l.attrib.get('rel','alternate')=='alternate'),None)
            link_element=preferred if preferred is not None else (links[0] if links else None)
            url=link_element.attrib.get('href','') if link_element is not None else ''
        if not url:
            url=first(item,['link','{*}link','guid','{*}id'])
        url=absolute(url,source.get('homepage',''))
        result=make_article(source['id'],title,summary,rawdate,url,kind)
        if result:
            result['image'],result['image_credit'],result['image_alt']=image_info(item,source)
            results.append(result)
    return results


def fetch_rss(source):
    url=source['url']
    if source['type']=='autodiscover':
        url=autodiscover(url)
    raw,ct,final=http_get(url)
    if 'html' in ct.lower():
        raise RuntimeError('RSS-adressen gav HTML istället för ett flöde')
    return parse_rss(raw,source), final


def fetch_pubmed(source):
    # PubMeds E-utilities: sökning med publiceringsdatum de senaste 7 dagarna.
    params=urllib.parse.urlencode({'db':'pubmed','term':f'({source["url"]}) AND ("last 7 days"[crdt])','retmax':25,'retmode':'json','sort':'pub_date','tool':'Forskningsradarn'})
    search=get_json('https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?'+params)
    ids=search.get('esearchresult',{}).get('idlist',[])
    if not ids:
        return [],'PubMed E-utilities'
    time.sleep(.4)
    summary=get_json('https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?'+urllib.parse.urlencode({'db':'pubmed','id':','.join(ids),'retmode':'json','tool':'Forskningsradarn'}))
    result=[]
    for uid in ids:
        rec=summary.get('result',{}).get(uid,{})
        if not rec:
            continue
        doi=''
        for ident in rec.get('articleids',[]):
            if ident.get('idtype')=='doi':
                doi=ident.get('value','')
                break
        journal=rec.get('fulljournalname','')
        title=rec.get('title','')
        link='https://pubmed.ncbi.nlm.nih.gov/'+uid+'/'
        pub, precision, note=choose_pubmed_date(rec)
        a=make_article(source['id'],title,journal,pub,link,'study',doi,precision=precision,date_note=note)
        if a:
            a['topic']=topic_for(a['title'],a['description'],source['id'])
            result.append(a)
    return result,'PubMed E-utilities'


def fetch_crossref(source):
    since=(NOW-dt.timedelta(days=6)).strftime('%Y-%m-%d')
    params=urllib.parse.urlencode({'filter':f'type:journal-article,from-created-date:{since}','query.bibliographic':source['url'],'sort':'created','order':'desc','rows':25,'select':'DOI,title,published,published-online,published-print,issued,posted,created,abstract,container-title,type,URL'})
    response=get_json('https://api.crossref.org/works?'+params)
    results=[]
    for x in response.get('message',{}).get('items',[]):
        title=' '.join(x.get('title',[])[:1]);doi=x.get('DOI','')
        pub, precision, note=crossref_date(x)
        desc=x.get('abstract','') or ', '.join(x.get('container-title',[])[:1])
        a=make_article(source['id'],title,desc,pub,x.get('URL') or ('https://doi.org/'+doi),'study',doi,precision=precision,date_note=note)
        if a:
            results.append(a)
    return results,'Crossref REST API'


def main(once_per_day=False):
    if once_per_day and OUTPUT_FILE.exists():
        try:
            previous=json.loads(OUTPUT_FILE.read_text(encoding='utf-8'))
            if (not previous.get('is_demo',True) and
                stockholm_day(previous.get('updated_at')) == NOW.astimezone(STOCKHOLM).date()):
                logging.info('En lyckad insamling finns redan för dagens datum i Stockholm. Hoppar över.')
                return 0
        except (OSError,ValueError,KeyError,TypeError):
            pass
    sources=json.loads(SOURCES_FILE.read_text(encoding='utf-8'))
    old={'articles':[], 'source_status':{}}
    if OUTPUT_FILE.exists():
        try:
            previous=json.loads(OUTPUT_FILE.read_text(encoding='utf-8'))
            if not previous.get('is_demo',True):
                old=previous
        except (ValueError,OSError):
            pass
    articles={}
    for a in old.get('articles',[]):
        if not a.get('id') or is_navigation_item(a.get('source_id',''),a.get('url','')): continue
        a=a.copy()
        pub, prec, note=published_meta(a.get('published',''))
        a['published']=pub
        a['date_precision']=a.get('date_precision') if pub and a.get('date_precision') else prec
        a['date_note']=note or a.get('date_note','')
        a['first_seen_at']=a.get('first_seen_at') or old.get('updated_at') or NOW.isoformat(timespec='seconds')
        articles[a['id']]=a
    status={}
    success=0
    for source in sources:
        if not source.get('enabled'):
            status[source['id']]={'ok':False,'reason':'Inte inkopplad för hämtning'}
            continue
        sid=source['id']
        try:
            if source['type'] in ('rss','autodiscover'):
                result,actual=fetch_rss(source)
            elif source['type']=='pubmed':
                result,actual=fetch_pubmed(source)
            elif source['type']=='crossref':
                result,actual=fetch_crossref(source)
            else:
                raise RuntimeError('Okänd källtyp '+source['type'])
            for a in result:
                articles[a['id']]=a
            status[sid]={'ok':True,'count':len(result),'feed':actual}
            success+=1
            logging.info('%s: %s artiklar',source['name'],len(result))
        except Exception as exc:
            msg=str(exc)[:180]
            logging.warning('%s: %s',source['name'],msg)
            status[sid]={'ok':False,'reason':msg}
    # Spara status separat även vid totalt fel (bevara samtidigt befintliga artiklar).
    STATUS_FILE.parent.mkdir(parents=True, exist_ok=True)
    STATUS_FILE.write_text(json.dumps({
        'checked_at': NOW.isoformat(timespec='seconds'),
        'total_sources': len(sources),
        'configured_sources': sum(bool(s.get('enabled')) for s in sources),
        'success_count': success,
        'source_status': status
    }, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    if success==0:
        logging.error('Ingen källa kunde hämtas. Lämnar den gamla datafilen oförändrad.')
        return 1
    earliest=NOW-dt.timedelta(days=RETENTION_DAYS)
    filtered=[]
    for a in articles.values():
        # Missing / untrusted publication date never qualifies as 'last 24 h'.
        # Keep in the archive for up to 90 days from first discovery.
        time_str = a.get('published') or a.get('first_seen_at')
        try:
            pub=dt.datetime.fromisoformat(time_str.replace('Z','+00:00'))
            if pub.tzinfo is None:
                pub=pub.replace(tzinfo=dt.timezone.utc)
            if pub>=earliest:
                filtered.append(a)
        except (TypeError,ValueError,AttributeError):
            continue
    filtered.sort(key=lambda x:x.get('published',''),reverse=True)
    # Exact duplicates across topic feeds, with normalized canonical URL or identical title.
    # Ignore tracking query parameters but do not merge distinct articles with similar titles.
    deduped=[]; seen_urls=set();seen_titles=set()
    for article in filtered:
        raw_url=article.get('url','')
        parsed=urllib.parse.urlsplit(raw_url)
        params=urllib.parse.parse_qsl(parsed.query,keep_blank_values=True)
        params=[(k,v) for k,v in params if not k.lower().startswith('utm_') and k.lower() not in ('at_medium','at_campaign','fbclid')]
        norm=urllib.parse.urlunsplit((parsed.scheme,parsed.netloc.lower(),parsed.path.rstrip('/'),urllib.parse.urlencode(params),''))
        title_key=re.sub(r'\s+',' ',article.get('title','').casefold()).strip()
        # Keep same title if it is from two distinctly different outlets; instead dedupe
        # only if exact original URL or same provider/title across multiple topical feeds.
        provider=urllib.parse.urlsplit(raw_url).netloc.lower()
        title_key=(provider,title_key)
        if (norm and norm in seen_urls) or title_key in seen_titles:
            continue
        seen_urls.add(norm);seen_titles.add(title_key);deduped.append(article)
    for s in sources:
        if s['id'] in status:
            status[s['id']]['checked_at']=NOW.isoformat(timespec='seconds')
    data={'updated_at':NOW.isoformat(timespec='seconds'),'is_demo':False,'articles':deduped[:MAX_TOTAL],'source_status':status,'timezone':'Europe/Stockholm','period_hours':24}
    temp=OUTPUT_FILE.with_suffix('.tmp')
    temp.write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    temp.replace(OUTPUT_FILE)
    logging.info('Sparade %s artiklar från %s lyckade källor; %s misslyckade',len(deduped[:MAX_TOTAL]),success,sum(1 for v in status.values() if v.get('reason') and v.get('reason') != 'Inte inkopplad för hämtning'))
    return 0

if __name__=='__main__':
    sys.exit(main(once_per_day='--once-per-day' in sys.argv))
