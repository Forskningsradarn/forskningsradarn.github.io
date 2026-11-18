"""Isolerat integrationstest av Forskningsradarn 3.3 utan nätverk eller GitHub.
Använder simulerade svar på riktiga RSS/Atom/API-format, inte publicerade nyheter.
"""
import json, tempfile, shutil, sys
from pathlib import Path
from unittest.mock import patch

original=Path(__file__).resolve().parents[1]
sys.path.insert(0,str(original))
from scripts import update_feeds as u

now=u.NOW
valid_date=now.strftime('%a, %d %b %Y %H:%M:%S GMT')
dateiso=now.isoformat(timespec='seconds')

rss=f'''<rss version="2.0" xmlns:media="http://search.yahoo.com/mrss/"><channel>
<item><title>Medicinsk studie om hjarnan</title><description>Forskare om hjarnan</description><link>https://example.org/study/one?utm_source=bbc</link><pubDate>{valid_date}</pubDate><media:thumbnail url="https://images.example.org/brain.jpg" width="550"/></item>
<item><title>Ny klimatforskning</title><description>Nya klimatdata</description><link>https://example.org/study/two</link><pubDate>{valid_date}</pubDate></item>
</channel></rss>'''.encode()
atom=f'''<feed xmlns="http://www.w3.org/2005/Atom"><entry><title>Medicinsk studie om hjarnan</title><summary>Forskare om hjarnan</summary><link rel="alternate" href="https://example.org/study/one"/><updated>{dateiso}</updated></entry></feed>'''.encode()

sources=[
  dict(id='bbc',name='BBC Science',group='medier',type='rss',url='https://feeds.bbci.co.uk/news/science_and_environment/rss.xml',homepage='https://www.bbc.com/news/science_and_environment',enabled=True),
  dict(id='guardian',name='Guardian Science',group='medier',type='rss',url='https://www.theguardian.com/science/rss',homepage='https://www.theguardian.com/science',enabled=True),
  dict(id='pubmed_demo',name='PubMed',group='studier',type='pubmed',url='brain',homepage='https://pubmed.ncbi.nlm.nih.gov/',enabled=True),
  dict(id='crossref_demo',name='Crossref',group='studier',type='crossref',url='climate',homepage='https://search.crossref.org',enabled=True),
  dict(id='error_demo',name='Trasig RSS',group='medier',type='rss',url='https://example.org/error',homepage='https://example.org',enabled=True),
  dict(id='disabled_demo',name='Avstängd källa',group='medier',type='manual',url='',homepage='https://example.org',enabled=False),
]

def mock_http_get(url,*args,**kwargs):
    if 'bbc' in url: return rss, 'application/rss+xml',url
    if 'guardian' in url: return atom, 'application/atom+xml',url
    raise RuntimeError('Test: nätverksfel')

def mock_json(url):
    if 'esearch.fcgi' in url: return {'esearchresult':{'idlist':['123456789']}}
    if 'esummary.fcgi' in url: return {'result': {'123456789':{'title':'Cancer research study','sortpubdate':now.date().isoformat(),'fulljournalname':'Medical Journal','articleids':[{'idtype':'doi','value':'10.1000/example'}]}}}
    if 'crossref.org' in url: return {'message': {'items':[{'title':['Climate science article'], 'DOI':'10.9999/example', 'URL':'https://doi.org/10.9999/example', 'published':{'date-parts':[[now.year,now.month,now.day]]},'container-title':['Research Journal']}]}}
    raise RuntimeError('Unrecognized fake API URL')

results=[]
with tempfile.TemporaryDirectory() as d:
    root=Path(d)
    (root/'data').mkdir()
    (root/'data'/'sources.json').write_text(json.dumps(sources),encoding='utf-8')
    source_path=root/'data'/'sources.json'
    output_path=root/'data'/'articles.json'
    status_path=root/'test-output'/'source_status.json'
    with patch.object(u,'SOURCES_FILE',source_path),patch.object(u,'OUTPUT_FILE',output_path),patch.object(u,'STATUS_FILE',status_path),patch.object(u,'http_get',side_effect=mock_http_get),patch.object(u,'get_json',side_effect=mock_json),patch.object(u.time,'sleep',return_value=None):
        code=u.main()
        assert code==0,code
        data=json.loads(output_path.read_text())
        assert data['is_demo']==False
        assert len(data['articles'])==4,('Unexpected count',len(data['articles']))
        assert data['source_status']['bbc']['ok']
        assert data['source_status']['guardian']['ok']
        assert data['source_status']['pubmed_demo']['ok']
        assert data['source_status']['crossref_demo']['ok']
        assert data['source_status']['error_demo']['ok']==False
        assert data['source_status']['disabled_demo']['ok']==False
        bbc=next(x for x in data['articles'] if x['source_id']=='bbc' and 'hjarnan' in x['title'])
        assert bbc['image']=='https://images.example.org/brain.jpg'
        assert bbc['url'].startswith('https://example.org/study/one')
        assert any(x['kind']=='study' for x in data['articles'])
        results.append('PASS: RSS + Atom, PubMed + Crossref behandlas och sparas')
        results.append('PASS: Dubblett med samma artikeladress men olika spårningsparametrar tas bort')
        results.append('PASS: Artikelbilder, originaladress, datum och studiemärkning sparas')
        results.append('PASS: Trasiga och avstängda källor visas separat som fel/inaktiva')
        code2=u.main()
        data2=json.loads(output_path.read_text())
        assert code2==0 and len(data2['articles'])==4
        results.append('PASS: Upprepad hämtning skapar inga extra kopior')
    before=output_path.read_bytes()
    with patch.object(u,'SOURCES_FILE',source_path),patch.object(u,'OUTPUT_FILE',output_path),patch.object(u,'STATUS_FILE',status_path),patch.object(u,'http_get',side_effect=RuntimeError('Nätverk saknas')),patch.object(u,'get_json',side_effect=RuntimeError('Nätverk saknas')),patch.object(u.time,'sleep',return_value=None):
        code3=u.main()
    assert code3==1 and output_path.read_bytes()==before
    results.append('PASS: Fullständigt avbrott bevarar senast sparade nyheter')

print('\n'.join(results))
print('ALLA 6 INTEGRATIONSKONTROLLER GODKÄNDA – SIMULERADE INDATA, EJ LIVEHÄMTNING')
