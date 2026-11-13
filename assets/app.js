/* Forskningsradarn v3.4, statisk prototyp för GitHub Pages.
 * Demo-lösenord: ändra DEMO_PASSWORD före publicering.
 * Observera: klientsidelösenord är inte en säker åtkomstkontroll.
 */
'use strict';
const DEMO_PASSWORD = 'forskning';
const SOURCES = [
  {
    "id": "forskning",
    "name": "forskning.se",
    "group": "svenska",
    "subcategory": "Samlat svensk forskning",
    "type": "autodiscover",
    "url": "https://forskning.se/",
    "homepage": "https://forskning.se/",
    "enabled": true,
    "note": "Försöker hitta RSS automatiskt."
  },
  {
    "id": "su",
    "name": "Stockholms universitet",
    "group": "svenska",
    "subcategory": "Universitet",
    "type": "autodiscover",
    "url": "https://www.mynewsdesk.com/se/su",
    "homepage": "https://www.mynewsdesk.com/se/su/latest_news",
    "enabled": true,
    "note": ""
  },
  {
    "id": "gu",
    "name": "Göteborgs universitet",
    "group": "svenska",
    "subcategory": "Universitet",
    "type": "autodiscover",
    "url": "https://www.gu.se/aktuellt/hitta-nyheter?hits=25",
    "homepage": "https://www.gu.se/aktuellt/hitta-nyheter?hits=25",
    "enabled": true,
    "note": ""
  },
  {
    "id": "lu",
    "name": "Lunds universitet",
    "group": "svenska",
    "subcategory": "Universitet",
    "type": "autodiscover",
    "url": "https://www.lu.se/nyheter-och-press",
    "homepage": "https://www.lu.se/nyheter-och-press",
    "enabled": true,
    "note": ""
  },
  {
    "id": "slu",
    "name": "Sveriges lantbruksuniversitet",
    "group": "svenska",
    "subcategory": "Universitet",
    "type": "autodiscover",
    "url": "https://www.slu.se/nyheter/alla-nyheter/",
    "homepage": "https://www.slu.se/nyheter/alla-nyheter/",
    "enabled": true,
    "note": ""
  },
  {
    "id": "umu",
    "name": "Umeå universitet",
    "group": "svenska",
    "subcategory": "Universitet",
    "type": "autodiscover",
    "url": "https://via.tt.se/pressrum/3237223/umea-universitet",
    "homepage": "https://via.tt.se/pressrum/3237223/umea-universitet",
    "enabled": true,
    "note": ""
  },
  {
    "id": "ki",
    "name": "Karolinska Institutet",
    "group": "svenska",
    "subcategory": "Universitet",
    "type": "autodiscover",
    "url": "https://via.tt.se/pressrum/3236920/karolinska-institutet",
    "homepage": "https://via.tt.se/pressrum/3236920/karolinska-institutet",
    "enabled": true,
    "note": ""
  },
  {
    "id": "uu",
    "name": "Uppsala universitet",
    "group": "svenska",
    "subcategory": "Universitet",
    "type": "rss",
    "url": "https://www.uu.se/appresource/4.2b8c8eef189bf820242712b2/12.2f8c577918d548f1b011b0fc/rss",
    "homepage": "https://www.uu.se/press/pressmeddelanden",
    "enabled": true,
    "note": "RSS-länk från universitetets pressida."
  },
  {
    "id": "sh",
    "name": "Södertörns högskola",
    "group": "svenska",
    "subcategory": "Universitet",
    "type": "autodiscover",
    "url": "https://www.sh.se/forskning/upptack-var-forskning/nyheter-om-forskning",
    "homepage": "https://www.sh.se/forskning/upptack-var-forskning/nyheter-om-forskning",
    "enabled": true,
    "note": ""
  },
  {
    "id": "iffs",
    "name": "Institutet för framtidsstudier",
    "group": "svenska",
    "subcategory": "Forskningsinstitut",
    "type": "autodiscover",
    "url": "https://www.iffs.se/nyheter/",
    "homepage": "https://www.iffs.se/nyheter/",
    "enabled": true,
    "note": ""
  },
  {
    "id": "sva",
    "name": "Statens veterinärmedicinska anstalt",
    "group": "svenska",
    "subcategory": "Myndighet",
    "type": "autodiscover",
    "url": "https://www.sva.se/aktuellt/",
    "homepage": "https://www.sva.se/aktuellt/",
    "enabled": true,
    "note": ""
  },
  {
    "id": "bbc",
    "name": "BBC Science",
    "group": "medier",
    "subcategory": "Internationella medier",
    "type": "rss",
    "url": "https://feeds.bbci.co.uk/news/science_and_environment/rss.xml",
    "homepage": "https://www.bbc.com/news/science_and_environment",
    "enabled": true,
    "note": ""
  },
  {
    "id": "guardian",
    "name": "The Guardian Science",
    "group": "medier",
    "subcategory": "Internationella medier",
    "type": "rss",
    "url": "https://www.theguardian.com/science/rss",
    "homepage": "https://www.theguardian.com/science",
    "enabled": true,
    "note": ""
  },
  {
    "id": "ap",
    "name": "AP Science",
    "group": "medier",
    "subcategory": "Internationella medier",
    "type": "manual",
    "url": "",
    "homepage": "https://apnews.com/science",
    "enabled": false,
    "note": "Ingen verifierad fri RSS-källa. Kan öppnas manuellt."
  },
  {
    "id": "reuters",
    "name": "Reuters Science",
    "group": "medier",
    "subcategory": "Internationella medier",
    "type": "manual",
    "url": "",
    "homepage": "https://www.reuters.com/science/",
    "enabled": false,
    "note": "Ingen verifierad fri RSS-källa. Kräver separat överenskommelse."
  },
  {
    "id": "dn",
    "name": "DN Vetenskap",
    "group": "medier",
    "subcategory": "Svenska medier",
    "type": "manual",
    "url": "",
    "homepage": "https://www.dn.se/vetenskap/",
    "enabled": false,
    "note": "Bevakas som länk tills feed/licens har klarlagts."
  },
  {
    "id": "svd",
    "name": "SvD Tech",
    "group": "medier",
    "subcategory": "Svenska medier",
    "type": "manual",
    "url": "",
    "homepage": "https://www.svd.se/tagg/tech",
    "enabled": false,
    "note": "Bevakas som länk tills feed/licens har klarlagts."
  },
  {
    "id": "nyteknik",
    "name": "Ny Teknik",
    "group": "medier",
    "subcategory": "Svenska medier",
    "type": "autodiscover",
    "url": "https://www.nyteknik.se/",
    "homepage": "https://www.nyteknik.se/",
    "enabled": true,
    "note": ""
  },
  {
    "id": "psykolog",
    "name": "Psykologtidningen",
    "group": "medier",
    "subcategory": "Svenska medier",
    "type": "autodiscover",
    "url": "https://psykologtidningen.se/",
    "homepage": "https://psykologtidningen.se/",
    "enabled": true,
    "note": ""
  },
  {
    "id": "lakartidningen",
    "name": "Läkartidningen",
    "group": "medier",
    "subcategory": "Svenska medier",
    "type": "autodiscover",
    "url": "https://lakartidningen.se/",
    "homepage": "https://lakartidningen.se/",
    "enabled": true,
    "note": ""
  },
  {
    "id": "americanscientist",
    "name": "American Scientist",
    "group": "medier",
    "subcategory": "Internationella medier",
    "type": "autodiscover",
    "url": "https://www.americanscientist.org/",
    "homepage": "https://www.americanscientist.org/",
    "enabled": true,
    "note": ""
  },
  {
    "id": "science",
    "name": "Science News",
    "group": "medier",
    "subcategory": "Vetenskapliga tidskrifter",
    "type": "rss",
    "url": "https://www.science.org/rss/news_current.xml",
    "homepage": "https://www.science.org/news",
    "enabled": true,
    "note": ""
  },
  {
    "id": "nature",
    "name": "Nature",
    "group": "medier",
    "subcategory": "Vetenskapliga tidskrifter",
    "type": "rss",
    "url": "https://www.nature.com/nature.rss",
    "homepage": "https://www.nature.com/news",
    "enabled": true,
    "note": ""
  },
  {
    "id": "newscientist",
    "name": "New Scientist",
    "group": "medier",
    "subcategory": "Internationella medier",
    "type": "rss",
    "url": "https://www.newscientist.com/section/news/feed/",
    "homepage": "https://www.newscientist.com/",
    "enabled": true,
    "note": "Publicerad RSS-adress; anslutningen verifieras vid första hämtning."
  },
  {
    "id": "ieee",
    "name": "IEEE Spectrum",
    "group": "medier",
    "subcategory": "Internationella medier",
    "type": "autodiscover",
    "url": "https://spectrum.ieee.org/",
    "homepage": "https://spectrum.ieee.org/",
    "enabled": true,
    "note": ""
  },
  {
    "id": "arxiv_ai",
    "name": "arXiv – AI",
    "group": "studier",
    "subcategory": "Preprint – ej sakkunniggranskad",
    "type": "rss",
    "url": "https://rss.arxiv.org/rss/cs.AI",
    "homepage": "https://arxiv.org/list/cs.AI/recent",
    "enabled": true,
    "note": ""
  },
  {
    "id": "arxiv_bio",
    "name": "arXiv – biologi",
    "group": "studier",
    "subcategory": "Preprint – ej sakkunniggranskad",
    "type": "rss",
    "url": "https://rss.arxiv.org/rss/q-bio",
    "homepage": "https://arxiv.org/list/q-bio/recent",
    "enabled": true,
    "note": ""
  },
  {
    "id": "arxiv_astro",
    "name": "arXiv – astronomi",
    "group": "studier",
    "subcategory": "Preprint – ej sakkunniggranskad",
    "type": "rss",
    "url": "https://rss.arxiv.org/rss/astro-ph",
    "homepage": "https://arxiv.org/list/astro-ph/recent",
    "enabled": true,
    "note": ""
  },
  {
    "id": "naturemedicine",
    "name": "Nature Medicine",
    "group": "studier",
    "subcategory": "Vetenskaplig tidskrift",
    "type": "rss",
    "url": "https://www.nature.com/nm.rss",
    "homepage": "https://www.nature.com/nm/",
    "enabled": true,
    "note": ""
  },
  {
    "id": "pubmed_cancer",
    "name": "PubMed – cancer",
    "group": "studier",
    "subcategory": "Medicinsk forskning",
    "type": "pubmed",
    "url": "cancer OR oncology",
    "homepage": "https://pubmed.ncbi.nlm.nih.gov/?term=cancer",
    "enabled": true,
    "note": ""
  },
  {
    "id": "pubmed_neuro",
    "name": "PubMed – hjärna & neuro",
    "group": "studier",
    "subcategory": "Medicinsk forskning",
    "type": "pubmed",
    "url": "neurology OR neuroscience",
    "homepage": "https://pubmed.ncbi.nlm.nih.gov/?term=neurology",
    "enabled": true,
    "note": ""
  },
  {
    "id": "crossref",
    "name": "Crossref – nya publikationer",
    "group": "studier",
    "subcategory": "Studier med DOI",
    "type": "crossref",
    "url": "climate change",
    "homepage": "https://search.crossref.org/",
    "enabled": true,
    "note": "Pilot: filter på nyligen publicerade studier om klimat. Kan breddas."
  },
  {
    "id": "smhi_forskning",
    "name": "SMHI – forskningsnyheter",
    "group": "svenska",
    "subcategory": "Forskningsmyndighet",
    "type": "rss",
    "url": "https://www.smhi.se/rss/forskningsnyheter",
    "homepage": "https://www.smhi.se/forskning",
    "enabled": true,
    "note": "Officiellt RSS-flöde publicerat av SMHI."
  },
  {
    "id": "folkhalsa",
    "name": "Folkhälsomyndigheten",
    "group": "svenska",
    "subcategory": "Hälsa och smittskydd",
    "type": "rss",
    "url": "https://www.folkhalsomyndigheten.se/nyheter-och-press/nyhetsarkiv/?syndication=rss",
    "homepage": "https://www.folkhalsomyndigheten.se/nyheter-och-press/nyhetsarkiv/",
    "enabled": true,
    "note": "Officiellt RSS för myndighetens nyheter."
  },
  {
    "id": "kth",
    "name": "KTH – nyheter",
    "group": "svenska",
    "subcategory": "Universitet",
    "type": "rss",
    "url": "https://www.kth.se/om/nyheter/centrala-nyheter?rss=news",
    "homepage": "https://www.kth.se/om/nyheter/centrala-nyheter",
    "enabled": true,
    "note": "Officiell nyhets-RSS dokumenterad av KTH."
  },
  {
    "id": "forskning_press",
    "name": "forskning.se – pressmeddelanden",
    "group": "svenska",
    "subcategory": "Forskningspress",
    "type": "rss",
    "url": "https://www.forskning.se/pressmeddelanden/feed/",
    "homepage": "https://forskning.se/pressmeddelanden/",
    "enabled": true,
    "note": "RSS-länk anges på forskning.se. Exakt svar verifieras vid första automatiska körningen."
  },
  {
    "id": "liu",
    "name": "Linköpings universitet",
    "group": "svenska",
    "subcategory": "Universitet",
    "type": "manual",
    "url": "",
    "homepage": "https://liu.se/artikel/forskning-och-samhalle-nyheter-fran-liu",
    "enabled": false,
    "note": "Nyhetsbrev om forskning finns; öppet maskinellt RSS-flöde återstår att verifiera."
  },
  {
    "id": "vr_nyheter",
    "name": "Vetenskapsrådet – nyheter",
    "group": "svenska",
    "subcategory": "Forskningsfinansiär",
    "type": "manual",
    "url": "",
    "homepage": "https://www.vr.se/aktuellt/nyheter.html",
    "enabled": false,
    "note": "Officiell nyhetssida. Nyhets-RSS är ännu inte bekräftad (RSS för utlysningar finns)."
  },
  {
    "id": "science_daily",
    "name": "ScienceDaily – vetenskap",
    "group": "medier",
    "subcategory": "Internationella vetenskapsmedier",
    "type": "rss",
    "url": "https://www.sciencedaily.com/rss/top/science.xml",
    "homepage": "https://www.sciencedaily.com/newsfeeds.htm",
    "enabled": true,
    "note": "Officiellt RSS-flöde för vetenskapsnyheter."
  },
  {
    "id": "science_daily_health",
    "name": "ScienceDaily – medicin",
    "group": "medier",
    "subcategory": "Internationella vetenskapsmedier",
    "type": "rss",
    "url": "https://www.sciencedaily.com/rss/top/health.xml",
    "homepage": "https://www.sciencedaily.com/newsfeeds.htm",
    "enabled": true,
    "note": "Officiellt RSS-flöde för hälsa."
  },
  {
    "id": "science_daily_env",
    "name": "ScienceDaily – miljö",
    "group": "medier",
    "subcategory": "Internationella vetenskapsmedier",
    "type": "rss",
    "url": "https://www.sciencedaily.com/rss/top/environment.xml",
    "homepage": "https://www.sciencedaily.com/newsfeeds.htm",
    "enabled": true,
    "note": "Officiellt RSS-flöde för miljö."
  },
  {
    "id": "science_daily_tech",
    "name": "ScienceDaily – teknik",
    "group": "medier",
    "subcategory": "Internationella vetenskapsmedier",
    "type": "rss",
    "url": "https://www.sciencedaily.com/rss/top/technology.xml",
    "homepage": "https://www.sciencedaily.com/newsfeeds.htm",
    "enabled": true,
    "note": "Officiellt RSS-flöde för teknik."
  },
  {
    "id": "physorg",
    "name": "Phys.org – forskning",
    "group": "medier",
    "subcategory": "Internationella vetenskapsmedier",
    "type": "rss",
    "url": "https://phys.org/rss-feed/",
    "homepage": "https://phys.org/feeds/",
    "enabled": true,
    "note": "Officiellt RSS-flöde från Phys.org."
  },
  {
    "id": "physorg_space",
    "name": "Phys.org – rymden",
    "group": "medier",
    "subcategory": "Internationella vetenskapsmedier",
    "type": "rss",
    "url": "https://phys.org/rss-feed/space-news/",
    "homepage": "https://phys.org/feeds/",
    "enabled": true,
    "note": "Officiellt temaflöde från Phys.org."
  },
  {
    "id": "quanta",
    "name": "Quanta Magazine",
    "group": "medier",
    "subcategory": "Internationella vetenskapsmedier",
    "type": "rss",
    "url": "https://api.quantamagazine.org/feed/",
    "homepage": "https://www.quantamagazine.org/",
    "enabled": true,
    "note": "Publikt Quanta-flöde listat av RSS-katalog. Status kontrolleras av hämtaren."
  },
  {
    "id": "nyt_science",
    "name": "New York Times – Science",
    "group": "medier",
    "subcategory": "Internationella vetenskapsmedier",
    "type": "rss",
    "url": "https://rss.nytimes.com/services/xml/rss/nyt/Science.xml",
    "homepage": "https://www.nytimes.com/section/science",
    "enabled": true,
    "note": "Publikt listad RSS; vissa artiklar kan kräva abonnemang."
  },
  {
    "id": "scientificamerican",
    "name": "Scientific American",
    "group": "medier",
    "subcategory": "Internationella vetenskapsmedier",
    "type": "rss",
    "url": "https://www.scientificamerican.com/platform/syndication/rss/",
    "homepage": "https://www.scientificamerican.com/",
    "enabled": true,
    "note": "Publikt listad RSS; verifieras av hämtaren."
  },
  {
    "id": "wired_science",
    "name": "WIRED Science",
    "group": "medier",
    "subcategory": "Internationella vetenskapsmedier",
    "type": "rss",
    "url": "https://www.wired.com/feed/category/science/latest/rss",
    "homepage": "https://www.wired.com/category/science/",
    "enabled": true,
    "note": "Publikt listad RSS; verifieras av hämtaren."
  },
  {
    "id": "niehs_recent",
    "name": "NIEHS – nya forskningspublikationer",
    "group": "studier",
    "subcategory": "Forskningspublikationer",
    "type": "rss",
    "url": "https://www.niehs.nih.gov/news/newsroom/rssfeed/rss_recently_published_research.xml",
    "homepage": "https://www.niehs.nih.gov/rssfeed",
    "enabled": true,
    "note": "NIH/NIEHS officiella RSS för nyligen publicerad forskning."
  },
  {
    "id": "esa",
    "name": "ESA – rymdnyheter",
    "group": "medier",
    "subcategory": "Internationella myndigheter",
    "type": "manual",
    "url": "",
    "homepage": "https://www.esa.int/Services/RSS_Feeds",
    "enabled": false,
    "note": "ESA publicerar officiella flöden, men direktlänken för aktuell avdelning behöver verifieras."
  },
  {
    "id": "nasa",
    "name": "NASA – forskning och rymd",
    "group": "medier",
    "subcategory": "Internationella myndigheter",
    "type": "rss",
    "url": "https://www.nasa.gov/feed/",
    "homepage": "https://www.nasa.gov/rss-feeds/",
    "enabled": true,
    "note": "NASA har officiell RSS-sida. Direktadressen behöver testas vid hämtning."
  },
  {
    "id": "pubmed_infection",
    "name": "PubMed – infektion & resistens",
    "group": "studier",
    "subcategory": "Medicinsk forskning",
    "type": "pubmed",
    "url": "antibiotic resistance OR infectious diseases",
    "homepage": "https://pubmed.ncbi.nlm.nih.gov/?term=antibiotic+resistance",
    "enabled": true,
    "note": "Nya studier hämtas ur PubMed med datumfiltrerad sökning."
  },
  {
    "id": "pubmed_psychiatry",
    "name": "PubMed – psykisk hälsa",
    "group": "studier",
    "subcategory": "Medicinsk forskning",
    "type": "pubmed",
    "url": "depression OR mental health OR psychiatry",
    "homepage": "https://pubmed.ncbi.nlm.nih.gov/?term=mental+health",
    "enabled": true,
    "note": "Nya studier hämtas ur PubMed med datumfiltrerad sökning."
  }
];
const DEMO_DATA = {
  "updated_at": "2026-11-13T09:30:00+01:00",
  "is_demo": true,
  "is_snapshot": true,
  "articles": [
    {
      "id": "c5baf9c61d657c7baa4e",
      "source_id": "forskning_press",
      "title": "Jordens frusna områden har passerat säkra gränser",
      "description": "Ny forskning om kryosfären presenteras inför klimatmötet. Läs pressmeddelandet och kontrollera originalstudien.",
      "published": "2026-11-12T08:00:00+01:00",
      "url": "https://forskning.se/pressmeddelanden/jordens-frusna-omraden-har-passerat-sakra-granser/",
      "doi": "",
      "image": "",
      "image_credit": "",
      "image_alt": "",
      "topic": "klimat",
      "kind": "press"
    },
    {
      "id": "94618ef1142cab37cd73",
      "source_id": "forskning_press",
      "title": "Forskare från Linnéuniversitetet får 10 miljoner euro för att forska om livets tidigaste utveckling",
      "description": "Linnéuniversitetet deltar i ett projekt om livets ursprung.",
      "published": "2026-11-12T08:00:00+01:00",
      "url": "https://forskning.se/pressmeddelanden/forskare-fran-linneuniversitetet-far-10-miljoner-euro-for-att-forska-om-livets-tidigaste-utveckling/",
      "doi": "",
      "image": "",
      "image_credit": "",
      "image_alt": "",
      "topic": "biologi",
      "kind": "press"
    },
    {
      "id": "1eae8a407c9131989444",
      "source_id": "forskning_press",
      "title": "Nytt projekt undersöker Antarktis glaciärer",
      "description": "Ett forskningsprojekt lett från Göteborg ska undersöka hur glaciärer vittrar underifrån.",
      "published": "2026-11-12T08:00:00+01:00",
      "url": "https://forskning.se/pressmeddelanden/nytt-projekt-gar-pa-djupet-med-antarktis-glaciarer/",
      "doi": "",
      "image": "",
      "image_credit": "",
      "image_alt": "",
      "topic": "klimat",
      "kind": "press"
    },
    {
      "id": "04c35f7dcf48194e45e9",
      "source_id": "forskning_press",
      "title": "Organ-på-chip visar hur cancer samspelar med sin omgivning",
      "description": "Forskare vid Linköpings universitet undersöker tumörers samspel med nerver och blodkärl.",
      "published": "2026-11-12T08:00:00+01:00",
      "url": "https://forskning.se/pressmeddelanden/organ-pa-chip-visar-hur-cancer-samspelar-med-sin-omgivning/",
      "doi": "",
      "image": "",
      "image_credit": "",
      "image_alt": "",
      "topic": "medicin",
      "kind": "press"
    },
    {
      "id": "a875e53243277fd95ee7",
      "source_id": "forskning_press",
      "title": "När vårdpersonal kan tvingas gå emot sin moral",
      "description": "Forskare undersöker konsekvenserna när vårdpersonal inte kan ge den vård de bedömer som rätt.",
      "published": "2026-11-12T08:00:00+01:00",
      "url": "https://forskning.se/pressmeddelanden/nar-vardpersonal-kan-tvingas-ga-emot-sin-moral/",
      "doi": "",
      "image": "",
      "image_credit": "",
      "image_alt": "",
      "topic": "samhalle",
      "kind": "press"
    },
    {
      "id": "01cb0217405866f8393d",
      "source_id": "forskning_press",
      "title": "Efter 23 års forskning får kroppens proteinkarta en AI-guide",
      "description": "En ny guide ska göra information om kroppens proteiner mer tillgänglig.",
      "published": "2026-11-11T08:00:00+01:00",
      "url": "https://forskning.se/pressmeddelanden/efter-23-ars-forskning-far-kroppens-proteinkarta-en-ai-guide/",
      "doi": "",
      "image": "",
      "image_credit": "",
      "image_alt": "",
      "topic": "teknik",
      "kind": "press"
    },
    {
      "id": "8525ac377d6566f27570",
      "source_id": "forskning_press",
      "title": "Ny forskning: Vem tar makten när presidenten försvagas?",
      "description": "Forskare undersöker hur makt kan förskjutas vid konstitutionella reformer.",
      "published": "2026-11-11T08:00:00+01:00",
      "url": "https://forskning.se/pressmeddelanden/ny-forskning-vem-tar-makten-nar-presidenten-forsvagas/",
      "doi": "",
      "image": "",
      "image_credit": "",
      "image_alt": "",
      "topic": "samhalle",
      "kind": "press"
    },
    {
      "id": "46ec3edaa9a2bf9a132b",
      "source_id": "folkhalsa",
      "title": "Nu startar vaccinationerna mot influensa och covid-19",
      "description": "Folkhälsomyndigheten informerar om årets vaccinationer och rekommendationer till riskgrupper.",
      "published": "2026-11-02T08:00:00+01:00",
      "url": "https://www.folkhalsomyndigheten.se/nyheter-och-press/nyhetsarkiv/2026/november/nu-startar-vaccinationerna-mot-influensa-och-covid-19/",
      "doi": "",
      "image": "",
      "image_credit": "",
      "image_alt": "",
      "topic": "medicin",
      "kind": "press"
    },
    {
      "id": "9990991ffbc406496b4e",
      "source_id": "folkhalsa",
      "title": "Breaks – rörelsepausen som kan ändra en skoldag",
      "description": "En nationell satsning vill öka rörelsen i skolan genom korta pauser.",
      "published": "2026-10-20T08:00:00+01:00",
      "url": "https://www.folkhalsomyndigheten.se/nyheter-och-press/nyhetsarkiv/2026/oktober/breaks-rorelsepausen-som-kan-andra-en-skoldag/",
      "doi": "",
      "image": "",
      "image_credit": "",
      "image_alt": "",
      "topic": "samhalle",
      "kind": "press"
    },
    {
      "id": "e1218136e47023ee130f",
      "source_id": "folkhalsa",
      "title": "Mässlingsutbrottet är över",
      "description": "Folkhälsomyndigheten meddelar att inga ytterligare fall kopplade till utbrottet har rapporterats.",
      "published": "2026-10-14T08:00:00+01:00",
      "url": "https://www.folkhalsomyndigheten.se/nyheter-och-press/nyhetsarkiv/2026/oktober/masslingsutbrottet-ar-over/",
      "doi": "",
      "image": "",
      "image_credit": "",
      "image_alt": "",
      "topic": "medicin",
      "kind": "press"
    },
    {
      "id": "524de7d51192bb42f110",
      "source_id": "folkhalsa",
      "title": "Antibiotikaresistensen fortsatte att öka i Sverige under 2025",
      "description": "Ny årsrapport från Folkhälsomyndigheten och SVA visar oroande utveckling.",
      "published": "2026-06-17T08:00:00+01:00",
      "url": "https://www.folkhalsomyndigheten.se/nyheter-och-press/nyhetsarkiv/2026/juni/antibiotikaresistensen-fortsatte-att-oka-i-sverige-under-2025/",
      "doi": "",
      "image": "",
      "image_credit": "",
      "image_alt": "",
      "topic": "medicin",
      "kind": "press"
    }
  ],
  "source_status": {}
};


// Fungerar även i webbläsare som blockerar lagring för lokala filer.
const temporaryStore = new Map();
const temporarySession = new Map();
const storage = {
  get(k, fallback){
    try { const v=localStorage.getItem(k);if(v!==null)return JSON.parse(v); } catch{}
    return temporaryStore.has(k)?temporaryStore.get(k):fallback;
  },
  set(k,v){ temporaryStore.set(k,v);try{localStorage.setItem(k,JSON.stringify(v))}catch{} },
  del(k){ temporaryStore.delete(k);try{localStorage.removeItem(k)}catch{} }
};
const session = {
  get(k){try{if(sessionStorage.getItem(k)==='yes')return true}catch{}return temporarySession.get(k)===true},
  set(k,v){temporarySession.set(k,!!v);try{sessionStorage.setItem(k,v?'yes':'no')}catch{}}
};
const iconPaths = {
  heart:'<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z"/>',
  leaf:'<path d="M20 4C9 3 4 8 4 14a6 6 0 0 0 6 6c7 0 11-8 10-16Z"/><path d="M4 21c3-6 7-9 12-12"/>',
  cpu:'<rect x="6" y="6" width="12" height="12" rx="2"/><path d="M9 1v5M15 1v5M9 18v5M15 18v5M1 9h5M1 15h5M18 9h5M18 15h5"/>',
  users:'<circle cx="9" cy="8" r="3"/><path d="M3 20v-2a6 6 0 0 1 12 0v2M16 5a3 3 0 0 1 0 6M18 14a5 5 0 0 1 3 5v1"/>',
  folder:'<path d="M3 6a2 2 0 0 1 2-2h5l2 3h7a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6Z"/>',
  sparkles:'<path d="m12 3 1.9 5.9L20 11l-6.1 2.1L12 19l-1.9-5.9L4 11l6.1-2.1L12 3Z"/><path d="m19 18 1 2 2 1-2 1-1 2-1-2-2-1 2-1 1-2ZM4 2l.7 2L7 5l-2.3 1L4 8l-.7-2L1 5l2.3-1L4 2Z"/>',
  atom:'<circle cx="12" cy="12" r="1.65"/><ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(35 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(-35 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(90 12 12)"/>',
  search:'<circle cx="10.8" cy="10.8" r="6.8"/><path d="m16 16 4.7 4.7"/>',
  home:'<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V10Z"/><path d="M9 21v-7h6v7"/>',
  clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l4 3"/>',
  archive:'<rect x="3" y="4" width="18" height="5" rx="1"/><path d="M5 9v11h14V9M10 13h4"/>',
  archive:'<rect x="3" y="4" width="18" height="5" rx="1"/><path d="M5 9v11h14V9M10 13h4"/>',
  bookmark:'<path d="M6 4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v17l-6-4-6 4V4Z"/>',
  check:'<path d="m4.5 12 5 5L20 6"/>',
  checkCircle:'<circle cx="12" cy="12" r="9"/><path d="m8 12 3 3 5-6"/>',
  grid:'<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
  list:'<path d="M9 5h12M9 12h12M9 19h12"/><path d="M4 5h.01M4 12h.01M4 19h.01" stroke-width="4"/>',
  settings:'<circle cx="12" cy="12" r="3"/><path d="M19.4 15a2 2 0 0 0 .4 2.1l-1.8 1.8a2 2 0 0 0-2.1-.4 8 8 0 0 1-1.2.5l-.4 2.1h-2.6l-.4-2.1a8 8 0 0 1-1.2-.5 2 2 0 0 0-2.1.4l-1.8-1.8a2 2 0 0 0 .4-2.1 8 8 0 0 1-.5-1.2L4 13.4v-2.6l2.1-.4a8 8 0 0 1 .5-1.2 2 2 0 0 0-.4-2.1l1.8-1.8a2 2 0 0 0 2.1.4 8 8 0 0 1 1.2-.5L11.7 3h2.6l.4 2.1a8 8 0 0 1 1.2.5 2 2 0 0 0 2.1-.4l1.8 1.8a2 2 0 0 0-.4 2.1 8 8 0 0 1 .5 1.2l2.1.4v2.6l-2.1.4a8 8 0 0 1-.5 1.3Z"/>',
  logOut:'<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="m16 17 5-5-5-5M21 12H9"/>',
  plus:'<path d="M12 5v14M5 12h14"/>',
  arrow:'<path d="M5 12h14m-7-7 7 7-7 7"/>',
  external:'<path d="M14 4h6v6M20 4l-9 9"/><path d="M20 14v6H4V4h6"/>',
  x:'<path d="M5 5 19 19M19 5 5 19"/>',
  menu:'<path d="M3 6h18M3 12h18M3 18h18"/>',
  filter:'<path d="M3 5h18l-7 8v6l-4-2v-4L3 5Z"/>',
  calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v4M17 3v4M3 10h18"/>',
  book:'<path d="M3 5h7a4 4 0 0 1 4 4v12H7a4 4 0 0 0-4-4V5ZM21 5h-7a4 4 0 0 0-4 4v12h7a4 4 0 0 1 4-4V5Z"/>',
  globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c-5 4.5-5 13.5 0 18M12 3c5 4.5 5 13.5 0 18"/>',
  beaker:'<path d="M9 3h6M10 3v7l-5 9a2 2 0 0 0 1.7 3h10.6A2 2 0 0 0 19 19l-5-9V3M8 16h8"/>',
  info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7h.01"/>',
  eye:'<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>',
  eyeOff:'<path d="M3 3 21 21M10.7 5.1A11 11 0 0 1 12 5c6.5 0 10 7 10 7a15 15 0 0 1-3 3.6M7 6.6C3.6 8.4 2 12 2 12s3.5 7 10 7c1.7 0 3.2-.5 4.5-1.2M10 10a3 3 0 0 0 4 4"/>',
  refresh:'<path d="M20 6v5h-5M4 18v-5h5"/><path d="M5 9a8 8 0 0 1 13-3l2 5M4 13l2 5a8 8 0 0 0 13-3"/>',
  warning:'<path d="m10.5 3-8 15A2 2 0 0 0 4.3 21h15.4a2 2 0 0 0 1.8-3l-8-15a2 2 0 0 0-3 0Z"/><path d="M12 9v5M12 17h.01"/>',
  clipboard:'<rect x="7" y="4" width="14" height="17" rx="2"/><path d="M17 4V2H5a2 2 0 0 0-2 2v13h4"/>',
};
const icon=(name,extra='')=>`<svg class="i ${extra}" viewBox="0 0 24 24" aria-hidden="true">${iconPaths[name]||iconPaths.info}</svg>`;
const atom=()=>`<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">${iconPaths.atom}</svg>`;
const escapeHTML=(v)=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function safeURL(url){try{const u=new URL(url,location.href);return ['https:','http:'].includes(u.protocol)?u.href:'#'}catch{return '#'}}
function dateFmt(v,long=false){try{return new Intl.DateTimeFormat('sv-SE',long?{day:'numeric',month:'long',year:'numeric'}:{day:'numeric',month:'short'}).format(new Date(v))}catch{return 'Okänt datum'}}
function relativeDate(v){if(!v||!Number.isFinite(Date.parse(v)))return 'Datum saknas';return dateFmt(v)}
function refreshReference(){const n=Date.parse(appState.updatedAt||'');return Number.isFinite(n)?n:Date.now()}
function withinLastDay(a){const p=Date.parse(a.published||'');const end=refreshReference();return Number.isFinite(p)&&p<=end&&p>end-86400000&&!['unknown','year','month'].includes(a.date_precision)}
function dateTimeSE(time){if(!Number.isFinite(time))return 'okänd tid';return new Intl.DateTimeFormat('sv-SE',{timeZone:'Europe/Stockholm',day:'numeric',month:'short',hour:'2-digit',minute:'2-digit'}).format(new Date(time))}
function lastDayPeriod(){const end=refreshReference();return `${dateTimeSE(end-86400000)} – ${dateTimeSE(end)}`}

function todayText(){const d=new Date();return new Intl.DateTimeFormat('sv-SE',{weekday:'long',day:'numeric',month:'long'}).format(d)}
const topicNames={medicin:'Medicin & hälsa',klimat:'Miljö & klimat',teknik:'Teknik & AI',samhalle:'Samhälle',biologi:'Biologi & natur',rymd:'Rymden',ovrigt:'Övrigt'};
const topicIcons={medicin:'🧬',klimat:'🌿',teknik:'⚛️',samhalle:'📚',biologi:'🦋',rymd:'🪐',ovrigt:'🔬'};
const topicCats=Object.keys(topicNames);
const appState={sidebarCollapsed:storage.get('vr_side_collapsed',false),activeList:null,lists:storage.get('vr_lists',{inslag:{name:'Möjliga inslag',ids:[]},uppfoljningar:{name:'Uppföljningar',ids:[]}}),mode:'all',tab:'all',topic:'all',source:'all',view:storage.get('vr_view','cards'),sort:'new',range:'all',customFrom:'',customTo:'',search:'',limit:18,limitRecent:18,limitOlder:18,articles:[],isDemo:true,updatedAt:null,sourceStatus:{},sourceMessage:"",sourceSection:'editorial',sourceQuery:'',modal:null,sideOpen:false,customSources:storage.get('vr_custom_sources',[]),disabledSources:new Set(storage.get('vr_disabled_sources',[])),favorites:new Set(storage.get('vr_favorites',[])),read:new Set(storage.get('vr_read',[])),loaded:false};
function allSources(){return [...SOURCES,...appState.customSources]}
function sourceByID(id){return allSources().find(s=>s.id===id)||{name:'Okänd källa',group:'medier',homepage:'#'}}
function filtered(){
 const now=refreshReference(),ms={week:7*86400000,month:30*86400000}[appState.range];
 let res=appState.articles.filter(a=>{
 const s=sourceByID(a.source_id);
 if(appState.disabledSources.has(a.source_id))return false;
 if(appState.mode==='saved'&&!appState.favorites.has(a.id))return false;
 if(appState.mode==='unread'&&appState.read.has(a.id))return false;
 if(appState.mode==='read'&&!appState.read.has(a.id))return false;
 if(appState.mode==='list'&&!(appState.lists[appState.activeList]?.ids||[]).includes(a.id))return false;
 if(appState.mode==='today'&&!withinLastDay(a))return false;
 if(appState.tab!=='all'&&s.group!==appState.tab)return false;
 if(appState.topic!=='all'&&a.topic!==appState.topic)return false;
 if(appState.source!=='all'&&a.source_id!==appState.source)return false;
 if(appState.range==='today'&&!withinLastDay(a))return false;
 if(ms&&(!Number.isFinite(Date.parse(a.published||''))||now-new Date(a.published).getTime()>ms||new Date(a.published).getTime()>now))return false;
 if(appState.range==='custom'){
  const day=String(a.published||'').slice(0,10);
  if(!day)return false;
  if(appState.customFrom&&day<appState.customFrom)return false;
  if(appState.customTo&&day>appState.customTo)return false;
 }
 if(appState.search){const q=appState.search.trim().toLocaleLowerCase('sv-SE'); if(![a.title,a.description,s.name,topicNames[a.topic]].join(' ').toLocaleLowerCase('sv-SE').includes(q))return false}
 return true;
 });
 res.sort((a,b)=>{const x=Date.parse(a.published||''),y=Date.parse(b.published||'');if(!Number.isFinite(x)&&!Number.isFinite(y))return 0;if(!Number.isFinite(x))return 1;if(!Number.isFinite(y))return -1;return appState.sort==='old'?x-y:y-x});return res;
}
function counts(){const a=appState.articles.filter(a=>!appState.disabledSources.has(a.source_id));return{all:a.length,today:a.filter(withinLastDay).length,saved:a.filter(x=>appState.favorites.has(x.id)).length,unread:a.filter(x=>!appState.read.has(x.id)).length,studies:a.filter(x=>sourceByID(x.source_id).group==='studier').length,sources:new Set(a.map(x=>x.source_id)).size}}
function navItem(key,title,symbol,n){return `<button class="nav-item ${appState.mode===key&&appState.source==='all'?'active':''}" data-action="mode" data-value="${key}">${icon(symbol)}<span>${title}</span><span class="count">${n}</span></button>`}
function sourceNav(s){const c=appState.articles.filter(a=>a.source_id===s.id).length;return `<button class="nav-item child ${appState.source===s.id?'active':''}" data-action="source" data-value="${escapeHTML(s.id)}"><span class="source-dot" style="background:${s.group==='studier'?'#29bba5':s.group==='svenska'?'#7091f5':'#efa575'}"></span><span style="min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${escapeHTML(s.name)}</span><span class="count">${c||'–'}</span></button>`}
function makeSidebar(){
 const c=counts(), available=appState.articles.filter(a=>!appState.disabledSources.has(a.source_id));
 const groups=[['medicin','Medicin & hälsa','heart'],['klimat','Miljö & klimat','leaf'],['teknik','Teknik & AI','cpu'],['samhalle','Samhälle','users'],['biologi','Biologi & natur','globe'],['rymd','Rymden','atom'],['ovrigt','Övrigt','grid']];
 const nav=(key,label,ico,n)=>`<button class="nav-item ${appState.mode===key?'active':''}" data-action="mode" data-value="${key}" title="${label}">${icon(ico)}<span class="side-label">${label}</span>${n!==undefined?`<span class="count">${n}</span>`:''}</button>`;
 const listNames=Object.entries(appState.lists||{});
 return `<div class="brand"><div class="brandmark">${atom()}</div><div class="brand-text"><div class="brand-kicker">VETENSKAPSRADION</div><div class="brand-name">Forskningsradarn</div><div class="brand-sub">Nyheter · originalstudier</div></div><button class="sidebar-collapse" title="${appState.sidebarCollapsed?'Visa sidopanel':'Fäll ihop sidopanel'}" aria-label="${appState.sidebarCollapsed?'Visa sidopanel':'Fäll ihop sidopanel'}" data-action="collapse">${icon('menu','sm')}</button></div>
 <div class="side-primary">
 ${nav('all','Start','home')}
 <button class="nav-item" data-action="source-section" data-value="editorial" title="Källor">${icon('book')}<span class="side-label">Källor</span></button>
 <div class="side-source-shortcuts"><button class="side-source-link" data-action="source-section" data-value="editorial" title="Redaktionens källor">Redaktionens källor</button><button class="side-source-link" data-action="source-section" data-value="personal" title="Mina källor">Mina källor <span class="side-source-count">${appState.customSources.length}</span></button></div>
 ${nav('saved','Favoriter','bookmark',c.saved)}
 ${nav('read','Lästa artiklar','check',appState.read.size)}
 </div>
 <div class="side-heading">ÄMNEN</div>
 ${groups.map(([id,label,ico])=>`<button class="nav-item side-topic ${appState.topic===id?'topic-active':''}" data-action="sided-topic" data-value="${id}" title="${label}">${icon(ico)}<span class="side-label">${label}</span><span class="count">${available.filter(a=>a.topic===id).length}</span></button>`).join('')}
 <div class="side-list-heading"><span class="side-label">MINA LISTOR</span><button data-action="newlist" title="Skapa lista" aria-label="Skapa lista">${icon('plus','sm')}</button></div>
 ${listNames.map(([id,obj])=>`<button class="nav-item side-list ${appState.mode==='list'&&appState.activeList===id?'active':''}" data-action="list" data-value="${escapeHTML(id)}" title="${escapeHTML(obj.name)}">${icon('folder')}<span class="side-label">${escapeHTML(obj.name)}</span><span class="count">${(obj.ids||[]).length}</span></button>`).join('')}
 <div class="side-bottom"><button class="side-utility" data-action="importfeed" title="Läs in RSS-fil">${icon('plus')} <span class="side-label">Läs in RSS-fil</span></button><button class="side-utility" data-action="about" title="Om tjänsten">${icon('info')} <span class="side-label">Om tjänsten</span></button><button class="side-utility" data-action="logout" title="Logga ut">${icon('logOut')} <span class="side-label">Logga ut</span></button><div class="side-mini side-label">${appState.isDemo?'Demo och lokalt inlästa RSS-filer':'Automatiskt uppdaterade flöden'}<br>Ingen AI-genererad text</div></div>`;
}
function makeHeader(){return `<div class="topbar"><button class="top-button mobile-btn" aria-label="Öppna sidomenyn" data-action="side">${icon('menu')}</button><div class="top-ident"><strong>Forskningsradarn</strong><small>Redaktionens forskningsbevakning</small></div><div class="search-wrap">${icon('search','sm')}<input id="search" placeholder="Sök forskning, artiklar, källor..." value="${escapeHTML(appState.search)}" aria-label="Sök bland artiklar"><span class="search-hint">Ctrl K</span></div><span class="datebox">${escapeHTML(todayText())}</span><button class="top-button" title="Källor och inställningar" aria-label="Källor och inställningar" data-action="sources">${icon('settings')}</button><div class="profile"><span class="avatar">VR</span><span>Redaktionen</span></div></div>`}
function makeHero(){return `<section class="hero"><div class="hero-copy"><div class="hero-eyebrow">EN SMARTARE FORSKNINGSBEVAKNING</div><h2>Upptäck forskningen.<br>Före nyheten.</h2><p>Universitet, vetenskapsmedier och originalstudier – samlade i ett och samma redaktionella flöde.</p><button class="hero-button" data-action="tab" data-value="studier">Utforska nya studier ${icon('arrow','sm')}</button></div><div class="hero-graphic">${atom()}</div></section>`}
function makeMetrics(){const c=counts();return `<div class="metrics"><div class="metric">${icon('book')}<strong>${c.all}</strong><span>artiklar i flödet</span></div><div class="metric">${icon('beaker')}<strong>${c.studies}</strong><span>originalstudier</span></div><div class="metric">${icon('bookmark')}<strong>${c.saved}</strong><span>favoriter</span></div><div class="metric">${icon('globe')}<strong>${c.sources}</strong><span>källor med artiklar</span></div></div>`}
function makeFilters(){
 const a=appState.articles.filter(a=>!appState.disabledSources.has(a.source_id));const n=(group)=>a.filter(x=>sourceByID(x.source_id).group===group).length;
 const tabs=[['all','Alla källor',a.length],['svenska','Universitet & forskning',n('svenska')],['medier','Vetenskapsmedier',n('medier')],['studier','Originalstudier',n('studier')]];
 const topics=[['all','Alla ämnen'],...Object.entries(topicNames)];
 const listLabel=appState.mode==='list'?(appState.lists[appState.activeList]?.name||'Min lista'):appState.mode==='saved'?'Favoriter':appState.mode==='read'?'Lästa artiklar':appState.mode==='today'?'Senaste dygnet':appState.mode==='unread'?'Olästa artiklar':'Nyhetsflöde';
 return `<div class="filter-ribbon"><div class="filters"><span class="filter-name">Ämne:</span>${topics.map(([id,title])=>`<button class="chip ${appState.topic===id?'active':''}" data-action="topic" data-value="${id}">${escapeHTML(title)}</button>`).join('')}</div><div class="source-filters"><div class="source-pills" role="tablist" aria-label="Källtyp">${tabs.map(([id,title,count])=>`<button role="tab" aria-selected="${appState.tab===id}" class="source-pill ${appState.tab===id?'active':''}" data-action="tab" data-value="${id}">${title}<span>${count}</span></button>`).join('')}</div><div class="section-actions"><select id="date-filter" aria-label="Datumfilter" class="select"><option value="all" ${appState.range==='all'?'selected':''}>Alla datum</option><option value="today" ${appState.range==='today'?'selected':''}>Senaste dygnet</option><option value="week" ${appState.range==='week'?'selected':''}>Senaste veckan</option><option value="month" ${appState.range==='month'?'selected':''}>Senaste 30 dagarna</option><option value="custom" ${appState.range==='custom'?'selected':''}>Välj datum...</option></select><select id="sort-filter" class="select" aria-label="Sortering"><option value="new" ${appState.sort==='new'?'selected':''}>Nyast först</option><option value="old" ${appState.sort==='old'?'selected':''}>Äldst först</option></select><button class="icon-btn ${appState.view==='cards'?'active':''}" data-action="view" data-value="cards" aria-label="Kortvy" title="Kortvy">${icon('grid')}</button><button class="icon-btn ${appState.view==='list'?'active':''}" data-action="view" data-value="list" aria-label="Listvy" title="Listvy">${icon('list')}</button></div></div></div><div class="section-top"><div class="result-summary"><h3 class="section-title">${escapeHTML(listLabel)}</h3><span class="section-hint" id="result-info">${filtered().length} artiklar</span></div>${appState.source!=='all'?`<button class="active-source" data-action="source" data-value="all">${escapeHTML(sourceByID(appState.source).name)} ×</button>`:''}<button class="clear" data-action="reset">Rensa filter</button></div>`;
}
function card(a){const s=sourceByID(a.source_id),t=topicNames[a.topic]||topicNames.ovrigt;const starred=appState.favorites.has(a.id),read=appState.read.has(a.id);const isStudy=s.group==='studier';const image=safeURL(a.image);const img=image!=='#'&&image.startsWith('https://')?`<img class="news-image" src="${escapeHTML(image)}" loading="lazy" referrerpolicy="no-referrer" alt="${escapeHTML(a.image_alt||'Artikelbild från källan')}" title="${escapeHTML(a.image_credit||'')}" onerror="this.closest('.news-visual').classList.remove('has-image');this.remove()">`:'';return `<article class="news-card ${read?'was-read':''}"><div class="news-visual ${img?'has-image':''} palette-${escapeHTML(topicNames[a.topic]?a.topic:'ovrigt')}">${img}<span class="visual-symbol" aria-hidden="true">${topicIcons[a.topic]||topicIcons.ovrigt}</span><span class="visual-overlay"></span><span class="visual-flag ${isStudy?'study':''}">${isStudy?'⚗ Originalstudie':escapeHTML(t)}</span></div><div class="news-body"><div class="news-meta"><span class="source-mini" title="${escapeHTML(s.name)}">${escapeHTML(s.name)}</span><span class="mid-dot"></span><span title="${escapeHTML(a.date_note||'')}">${escapeHTML(relativeDate(a.published))}</span></div><h4 class="news-title">${escapeHTML(a.title)}</h4><p class="news-desc">${escapeHTML(a.description||'Ingen beskrivning tillgänglig. Öppna originalkällan.')}</p><div class="news-footer"><a class="read-link" href="${escapeHTML(safeURL(a.url))}" target="_blank" rel="noopener noreferrer" data-action="article" data-value="${escapeHTML(a.id)}" title="Öppna hos källan i en ny flik">${a.url.endsWith('/pressmeddelanden/')?'Källarkiv':'Läs mer'} ${icon('external','sm')}</a><div class="card-tools"><button class="small-icon" data-action="organize" data-value="${escapeHTML(a.id)}" title="Lägg i en lista" aria-label="Lägg i en lista">${icon('folder','sm')}</button><button class="small-icon ${read?'is-read':''}" title="${read?'Markera som oläst':'Markera som läst'}" aria-label="${read?'Markera som oläst':'Markera som läst'}" data-action="read" data-value="${escapeHTML(a.id)}">${icon('check','sm')}</button><button class="small-icon ${starred?'is-fav':''}" title="${starred?'Ta bort favorit':'Spara favorit'}" aria-label="${starred?'Ta bort favorit':'Spara favorit'}" data-action="favorite" data-value="${escapeHTML(a.id)}">${icon('bookmark','sm')}</button></div></div></div></article>`}
function makeList(){
 const f=filtered(),visible=f.slice(0,appState.limit);
 const more=f.length>visible.length?`<button class="loadmore" data-action="more">Visa fler artiklar (${f.length-visible.length} kvar)</button>`:'';
 const empty=`<div class="empty-state"><div class="empty-icon">${icon('search','lg')}</div><h3>Inga artiklar matchar dina filter</h3><p>Prova ett annat ämne, datumintervall eller en annan sökning.</p><button data-action="reset">Visa alla artiklar</button></div>`;
 const className=`news-grid ${appState.view==='list'?'list-mode':''}`;
 if(!f.length)return `<div class="${className}" id="article-grid">${empty}</div>`;
 const group=appState.mode==='all'&&appState.range==='all'&&appState.sort==='new';
 if(!group)return `<div class="${className}" id="article-grid">${visible.map(card).join('')}</div>${more}`;
 const recentAll=f.filter(withinLastDay),earlierAll=f.filter(a=>!withinLastDay(a));
 const recent=recentAll.slice(0,appState.limitRecent),earlier=earlierAll.slice(0,appState.limitOlder);
 const recentTitle=`<div class="day-group-heading"><div><h3>${icon('clock','sm')} Publicerat senaste dygnet <span class="group-count">${recentAll.length}</span></h3><p>${escapeHTML(lastDayPeriod())} · utifrån senaste lyckade hämtningen</p></div></div>`;
 const olderTitle=`<div class="day-group-heading older-heading"><div><h3>${icon('archive','sm')} Tidigare publicerat <span class="group-count">${earlierAll.length}</span></h3><p>Äldre artiklar och artiklar med oklart publiceringsdatum · nyast först</p></div></div>`;
 const recentMore=recentAll.length>recent.length?`<button class="loadmore group-more" data-action="more-recent">Visa fler från senaste dygnet (${recentAll.length-recent.length} kvar)</button>`:'';
 const olderMore=earlierAll.length>earlier.length?`<button class="loadmore group-more" data-action="more-older">Visa fler äldre artiklar (${earlierAll.length-earlier.length} kvar)</button>`:'';
 return `<div id="article-grid" class="day-group-container">${recentTitle}${recent.length?`<div class="${className}">${recent.map(card).join('')}</div>`:`<div class="recent-empty">Inga artiklar från det senaste bevakade dygnet i det här urvalet.</div>`}${recentMore}${olderTitle}${earlier.length?`<div class="${className}">${earlier.map(card).join('')}</div>`:`<div class="recent-empty">Inga tidigare publiceringar i urvalet.</div>`}${olderMore}</div>`;
}
function demoNotice(){return appState.isDemo?`<div class="notice notice-compact">${icon('warning','sm')}<div><strong>Testläge – riktiga publikationer, men ingen liveuppdatering.</strong> Den inbyggda ögonblicksbilden bygger på offentliga källsidor från november 2026. Varje kort öppnar sin ursprungspublicering direkt. Automatisk hämtning sker först när uppdateringsrutinen körs online.</div></div>`:''}
function renderApp(){if(!isAuthenticated()){renderLogin();return}const root=document.getElementById('app');root.innerHTML=`<div class="app-shell ${appState.sidebarCollapsed?'is-collapsed':''}"><div class="sidebar-backdrop ${appState.sideOpen?'active':''}" data-action="side"></div><aside class="sidebar ${appState.sideOpen?'open':''}">${makeSidebar()}</aside><main class="main">${makeHeader()}<div class="content"><div class="compact-status"><div><strong>Din forskningsöversikt</strong><span class="status-badge ${appState.isDemo?'demo':''}"><span class="pulse"></span>${appState.isDemo?(storage.get('vr_imported_feeds',[]).length?'TEST / INLÄST RSS':'TEST / ÖGONBLICKSBILD'):'AKTUELLA KÄLLOR'}</span></div><span class="status-updated">${appState.updatedAt?'Senast hämtad: '+escapeHTML(dateTimeSE(Date.parse(appState.updatedAt))):'Ingen automatisk hämtning'}</span></div>${makeMetrics()}<section id="news-section">${makeFilters()}${demoNotice()}<div id="news-list-area">${makeList()}</div></section></div></main></div>${appState.modal?renderModalHTML():''}`;}
function updateList(){const area=document.getElementById('news-list-area');if(area)area.innerHTML=makeList();const info=document.getElementById('result-info');if(info)info.textContent=`${filtered().length} artiklar`}
function loginIcon(){return `<div class="brandmark">${atom()}</div>`}
function renderLogin(err=''){document.getElementById('app').innerHTML=`<div class="login-page"><div class="login-wrap"><div class="login-brand">${loginIcon()}<div><div class="brand-name">Forskningsradarn</div><div class="brand-sub">Vetenskapsradion</div></div></div><div class="login-card"><div class="login-eyebrow">REDAKTIONELL FORSKNINGSBEVAKNING</div><h1 class="login-title">Välkommen tillbaka</h1><p class="login-intro">Universitetens senaste forskningsnyheter, internationell vetenskap och färska studier – allt på ett ställe.</p><form id="login-form"><label for="login-password" class="modal-label">Gemensamt lösenord</label><div class="login-field">${icon('bookmark','sm')}<input type="password" required autofocus id="login-password" autocomplete="current-password" placeholder="Ange lösenord"><button type="button" id="password-eye" aria-label="Visa eller dölj lösenord">${icon('eye','sm')}</button></div><label class="remember"><input type="checkbox" id="login-remember" checked> Kom ihåg mig på den här datorn</label><button class="login-submit" type="submit">Öppna Forskningsradarn ${icon('arrow','sm')}</button>${err?`<div class="login-error" role="alert">${escapeHTML(err)}</div>`:''}</form>${appState.isDemo?'<div class="login-demo">🔑 <strong>Testversion:</strong> lösenordet är <strong>forskning</strong>. Byt det innan publicering.</div>':''}</div><p class="login-note">Ett arbetsverktyg för att upptäcka och bevaka forskning.</p></div></div>`;document.getElementById('login-password')?.focus()}
function isAuthenticated(){return storage.get('vr_auth',false)||session.get('vr_auth')}
function logout(){storage.del('vr_auth');session.set('vr_auth',false);appState.modal=null;renderLogin()}
function renderModalHTML(){if(appState.modal==='sources')return modalSources();if(appState.modal==='about')return modalAbout();if(appState.modal==='dates')return modalDates();if(appState.modal==='addsource')return modalAddSource();if(appState.modal==='importfeed')return modalImportFeed();if(appState.modal==='newlist')return modalNewList();if(appState.modal.startsWith('organize:'))return modalOrganize(appState.modal.slice(9));return ''}
function modalFrame(title,sub,content,wide=false){return `<div class="overlay" id="modal-overlay"><section role="dialog" aria-modal="true" aria-label="${escapeHTML(title)}" class="modal ${wide?'wide':''}"><div class="modal-head"><div><h2 class="modal-title">${escapeHTML(title)}</h2><p class="modal-sub">${sub}</p></div><button data-action="close" class="close-button" aria-label="Stäng">${icon('x')}</button></div><div class="modal-content">${content}</div></section></div>`}
function sourceListRow(s){
 const disabled=appState.disabledSources.has(s.id),st=appState.sourceStatus[s.id];
 const personal=appState.customSources.some(x=>x.id===s.id);
 const status=disabled?'Dold i din vy':s.type==='browser'?(st?.ok===false?'Kunde inte uppdateras':'Hämtas i denna webbläsare'):s.type==='local'?'Inläst RSS-fil':personal?'Sparad – inväntar hämtning':s.enabled?(st?.ok===false?'Hämtningsfel':st?.ok===true?'Aktiv':'Konfigurerad'):'Manuell / ej inkopplad';
 return `<div class="source-row"><span class="source-dot" style="background:${s.group==='studier'?'#27b6a3':s.group==='svenska'?'#6585e7':'#dd9567'}"></span><div class="source-info"><div class="sname">${escapeHTML(s.name)}</div><div class="snote">${escapeHTML(s.subcategory||'RSS')} · <span class="tag ${s.enabled&&!disabled?'':'pending'}">${escapeHTML(status)}</span></div></div><a class="saction" href="${escapeHTML(safeURL(s.homepage||s.url))}" target="_blank" rel="noopener noreferrer" title="Öppna källa">${icon('external','sm')}</a><button class="saction" data-action="toggle-source" data-value="${escapeHTML(s.id)}">${disabled?'Visa':'Dölj'}</button>${personal?`<button class="saction" data-action="remove-source" data-value="${escapeHTML(s.id)}" title="Ta bort personlig källa">Ta bort</button>`:''}</div>`;
}
function modalSources(){
 const editorial=SOURCES,personal=appState.customSources.filter(s=>!SOURCES.some(x=>x.id===s.id));const selectedEditorial=editorial.filter(s=>[s.name,s.subcategory,s.note].join(' ').toLocaleLowerCase('sv-SE').includes(appState.sourceQuery.trim().toLocaleLowerCase('sv-SE')));
 const selected=appState.sourceSection==='personal'?'personal':'editorial';
 const tabs=`<div class="source-section-tabs" role="tablist" aria-label="Välj typ av källor"><button role="tab" aria-selected="${selected==='editorial'}" class="source-section-tab ${selected==='editorial'?'selected':''}" data-action="source-section" data-value="editorial">${icon('book','sm')} Redaktionens källor <span>${editorial.length}</span></button><button role="tab" aria-selected="${selected==='personal'}" class="source-section-tab ${selected==='personal'?'selected':''}" data-action="source-section" data-value="personal">${icon('bookmark','sm')} Mina källor <span>${personal.length}</span></button></div>`;
 let body='';
 if(selected==='editorial'){
  body=`<p class="source-section-description">Gemensamma forskningskällor och vetenskapsmedier. Dölj källor du inte vill se; valet sparas bara i din webbläsare. Vissa källor väntar på teknisk anslutning.</p><div class="source-management"><label class="sr-only" for="source-search">Sök bland källorna</label><input id="source-search" class="source-find" placeholder="Sök källa..." value="${escapeHTML(appState.sourceQuery)}"><span class="source-visible-count">${editorial.length-[...appState.disabledSources].filter(id=>editorial.some(s=>s.id===id)).length} av ${editorial.length} visas</span><button class="saction" data-action="show-all-sources">Visa alla</button><button class="saction" data-action="hide-all-sources">Dölj alla</button></div><div class="source-table scroll-list" id="editorial-source-list">${selectedEditorial.map(sourceListRow).join('')}</div><div class="source-panel-tip">Vissa nyhetskällor saknar öppet RSS-flöde. Då visas de i registret, men inga artiklar hämtas automatiskt. Följ dem manuellt eller välj <strong>Mina källor</strong> för att lägga till eget RSS.</div>`;
 }else{
  body=`<p class="source-section-description">Lägg till egna RSS-flöden från universitet, tidskrifter och andra webbplatser. Dina källor sparas bara i <strong>den här webbläsaren</strong> – de syns inte automatiskt för kollegorna.</p>${appState.sourceMessage?`<div class="source-feedback" role="status">${escapeHTML(appState.sourceMessage)}</div>`:''}${personal.length?`<div class="source-table scroll-list">${personal.map(sourceListRow).join('')}</div>`:`<div class="source-empty">${icon('book','lg')}<h3>Här är det tomt än så länge</h3><p>Lägg till ditt första RSS-flöde och samla dina egna forskningskällor här.</p></div>`}<div class="personal-actions"><button class="primary-btn" data-action="addsource">${icon('plus','sm')} Lägg till RSS-flöde</button><button class="secondary-btn" data-action="importfeed">${icon('book','sm')} Läs in RSS-fil från datorn</button></div><div class="source-panel-tip">Appen försöker läsa RSS direkt. Vissa webbplatser blockerar hämtning i webbläsaren. Då sparas adressen utan nya artiklar tills flödet kan kopplas in i en gemensam hämtningslösning.</div>`;
 }
 return modalFrame('Källor och bevakning','Redaktionens gemensamma källor och dina egna RSS-flöden.',tabs+body,true);
}
function modalAbout(){return modalFrame('Om Forskningsradarn','Redaktionell nyhets- och forskningsbevakning utan AI',`<p class="article-detail-desc">Forskningsradarn samlar rubriker, publiceringsdatum och korta ingressutdrag från universitet, nyhetsmedier och vetenskapliga databaser. Originaltexten finns hos källan.</p><p class="article-detail-desc">Automatisk hämtning kan ske via GitHub Actions. Webbplatsen kan visas via GitHub Pages. Favoriter, läsmarkeringar och egna källor sparas enbart i den webbläsare du använder. RSS-flöden som tillåter webbläsarhämtning uppdateras när du öppnar sidan; andra behöver en gemensam hämtningslösning.</p><div class="detail-warning"><strong>Lösenordet är endast ett enklare insynsskydd.</strong> På en statisk GitHub Pages-webbplats kan tekniskt kunniga besökare kringgå det och läsa offentliggjorda datafiler. Publicera därför inte känsliga eller interna uppgifter här.</div><p class="article-detail-desc">RSS-/API-källor kan sluta fungera eller ändra sina villkor. Kontrollera rättigheter och drift innan sidan används brett.</p><div class="actions-row"><button class="primary-btn" data-action="close">Stäng</button></div>`)}
function modalDates(){return modalFrame('Välj datumintervall','Visa enbart artiklar publicerade under en viss period.',`<form id="date-form"><label for="custom-from" class="modal-label">Från datum</label><input id="custom-from" type="date" class="modal-input" value="${escapeHTML(appState.customFrom)}"><label for="custom-to" class="modal-label">Till datum</label><input id="custom-to" type="date" class="modal-input" value="${escapeHTML(appState.customTo)}"><div class="actions-row"><button type="button" class="secondary-btn" data-action="close">Avbryt</button><button class="primary-btn" type="submit">Visa artiklar</button></div></form>`)}
function modalNewList(){return modalFrame('Skapa en redaktionell lista','Listorna sparas i din webbläsare och är inte delade mellan användare.',`<form id="list-form"><label class="modal-label" for="list-name">Namn på listan</label><input id="list-name" class="modal-input" required maxlength="60" placeholder="Exempel: Intervjuförslag"><div class="actions-row"><button class="secondary-btn" data-action="close" type="button">Avbryt</button><button type="submit" class="primary-btn">Skapa lista</button></div></form>`)}
function modalOrganize(id){const a=appState.articles.find(x=>x.id===id);if(!a)return '';return modalFrame('Spara i lista',escapeHTML(a.title),`<div class="organize-list">${Object.entries(appState.lists).map(([key,obj])=>`<button class="organize-row" data-action="toggle-in-list" data-value="${escapeHTML(key)}"><span>${icon('folder','sm')} ${escapeHTML(obj.name)}</span><strong>${(obj.ids||[]).includes(id)?'✓ Sparad':'+ Lägg till'}</strong></button>`).join('')}</div><div class="actions-row"><button class="secondary-btn" data-action="newlist">${icon('plus','sm')} Ny lista</button><button class="primary-btn" data-action="close">Klart</button></div>`)}
function modalImportFeed(){return modalFrame('Läs in aktuellt RSS-flöde','Testa med verkliga nyhetsrubriker och originalbilder, utan server.',`<p class="article-detail-desc">Öppna ett av flödena nedan i webbläsaren och spara XML-filen på datorn. Välj sedan filen här. Forskningsradarn läser rubriker, datum, länkar och eventuella artikelbilder direkt från filen.</p>
 <div class="rss-import-links"><a href="https://feeds.bbci.co.uk/news/science_and_environment/rss.xml" target="_blank" rel="noopener noreferrer">BBC Science – RSS ${icon('external','sm')}</a><a href="https://www.theguardian.com/science/rss" target="_blank" rel="noopener noreferrer">The Guardian Science – RSS ${icon('external','sm')}</a></div>
 <label class="modal-label" for="rss-file">Välj nedladdad RSS- eller Atom-fil (.xml, .rss, .atom)</label><input class="modal-input" type="file" accept=".xml,.rss,.atom,text/xml,application/xml,application/rss+xml" id="rss-file"><div class="modal-help">De inlästa artiklarna sparas bara i din webbläsare. Detta uppdaterar inte automatiskt nyheterna. Vid senare GitHub-publicering kan flödena hämtas enligt schema.</div><div id="rss-file-result" role="status" class="import-status"></div><div class="actions-row"><button class="secondary-btn" data-action="sources">Tillbaka till källor</button><button class="secondary-btn" data-action="clearimports">Ta bort inlästa flöden</button></div>`,true)}

function safeImageURL(raw){try{const u=new URL(raw);return u.protocol==='https:'?u.href:''}catch{return ''}}
function textFromMarkup(raw){const doc=new DOMParser().parseFromString(String(raw||''),'text/html');return (doc.body.textContent||'').replace(/\s+/g,' ').trim().slice(0,240)}
function xmlDirectText(elem,names){if(!elem)return '';for(const el of elem.children){if(names.includes(el.localName.toLowerCase())){const value=(el.textContent||'').trim();if(value)return value}}return ''}
function getImageFromXML(item, rawDesc){const images=[];
 const add=(url,w=0,priority=0,alt='',credit='')=>{const safe=safeImageURL(url);if(!safe)return;images.push({url:safe,width:Number(w)||0,priority,alt,credit})};
 for(const el of item.getElementsByTagName('*')){const name=el.localName.toLowerCase(),ns=el.namespaceURI||'',type=(el.getAttribute('type')||'').toLowerCase(),medium=(el.getAttribute('medium')||'').toLowerCase();
  if((name==='content'||name==='thumbnail')&&ns.includes('search.yahoo.com/mrss')){if((type&&!type.startsWith('image/'))||['audio','video'].includes(medium))continue;
   const readChild=(label)=>{const child=[...el.children].find(x=>x.localName.toLowerCase()===label);return child?child.textContent.trim():''};
   add(el.getAttribute('url'),el.getAttribute('width'),name==='content'?30:20,readChild('description')||readChild('title'),readChild('copyright'));
  }else if(name==='enclosure'&&type.startsWith('image/'))add(el.getAttribute('url'),0,25);
  else if(name==='link'&&el.getAttribute('rel')==='enclosure'&&type.startsWith('image/'))add(el.getAttribute('href'),0,25);
 }
 if(rawDesc){const html=new DOMParser().parseFromString(rawDesc,'text/html');for(const img of [...html.querySelectorAll('img')].slice(0,3))add(img.getAttribute('src')||img.getAttribute('data-src'),0,5,img.getAttribute('alt')||'');}
 images.sort((a,b)=>((b.width>=400)-(a.width>=400))||(b.priority-a.priority)||(Math.min(b.width,1600)-Math.min(a.width,1600)));return images[0]||{url:'',alt:'',credit:''}
}
function guessTopic(title,desc){const v=(title+' '+desc).toLowerCase();for(const [topic,terms] of Object.entries({medicin:['health','medic','cancer','brain','vård','hälsa','sjuk','treatment'],klimat:['climate','environment','klimat','skog','warming','emissions'],rymd:['space','mars','planet','galaxy','rymd','star'],biologi:['animal','biology','species','genetic','djur','genetik'],teknik:['technology','computer','robot','quantum','teknik',' ai ','machine learning'],samhalle:['social','school','education','society','samhäll','psykolog','skola']})){if(terms.some(t=>v.includes(t)))return topic}return 'ovrigt'}
function stableShortHash(str){let h=2166136261;for(const c of str){h=Math.imul(h^c.charCodeAt(0),16777619)}return (h>>>0).toString(36)}
function parseImportedRSS(xml,filename,preferredSource=null){const doc=new DOMParser().parseFromString(xml,'application/xml');if(doc.querySelector('parsererror'))throw Error('Filen är inte giltig RSS/Atom-XML.');
 const channel=doc.getElementsByTagName('channel')[0]||doc.documentElement;
 const entries=[...doc.getElementsByTagName('item')];if(!entries.length)entries.push(...doc.getElementsByTagNameNS('*','entry'));
 if(!entries.length)throw Error('Hittade inga artiklar i RSS-/Atom-filen.');
 const title=(xmlDirectText(channel,['title'])||filename.replace(/\.(xml|rss|atom)$/i,'')).slice(0,100),home=xmlDirectText(channel,['link']);
 let matched=preferredSource; if(!matched)try{const host=new URL(home).hostname.replace(/^www\./,'');matched=SOURCES.find(s=>{try{return new URL(s.homepage).hostname.replace(/^www\./,'')===host}catch{return false}})}catch{}
 if(!matched){if(/bbc/i.test(title))matched=SOURCES.find(s=>s.id==='bbc');else if(/guardian/i.test(title))matched=SOURCES.find(s=>s.id==='guardian')}
 const sid=matched?.id||'local-'+stableShortHash(title),source=matched||{id:sid,name:title,group:'medier',subcategory:'Inläst RSS-fil',type:'local',url:'',homepage:safeURL(home),enabled:true,note:'Importerad lokalt från fil'};
 const results=[];
 for(const el of entries.slice(0,70)){
  const title=xmlDirectText(el,['title']),description=xmlDirectText(el,['description','summary','encoded','content']);
  const linkEl=[...el.children].find(x=>x.localName.toLowerCase()==='link'&&(x.getAttribute('rel')||'alternate')==='alternate');
  const link=safeURL(linkEl?.getAttribute('href')||linkEl?.textContent||xmlDirectText(el,['guid','id']));if(!title||link==='#')continue;
  const date=xmlDirectText(el,['pubdate','published','updated','date']);let iso=new Date(date||Date.now());if(Number.isNaN(iso.getTime()))iso=new Date();
  const img=getImageFromXML(el,description);
  results.push({id:sid+'-'+stableShortHash(link),source_id:sid,title:textFromMarkup(title),description:textFromMarkup(description).slice(0,220),published:iso.toISOString(),url:link,doi:'',image:img.url,image_credit:img.credit,image_alt:img.alt,topic:guessTopic(title,description),kind:source.group==='studier'?'study':source.group==='svenska'?'press':'news'});
 }
 if(!results.length)throw Error('Hittade inga artiklar med fungerande länkar.');
 return {source,articles:results,importedAt:new Date().toISOString()};
}
function dedupeArticles(articles){const found=new Set();return articles.filter(a=>{let url='';try{const u=new URL(a.url||'');u.searchParams.delete('at_medium');u.searchParams.delete('at_campaign');u.searchParams.delete('utm_source');u.searchParams.delete('utm_medium');u.searchParams.delete('utm_campaign');u.hash='';url=u.href.replace(/\/$/,'')}catch{url=a.id}const k=(a.source_id||'')+'|'+url+'|'+String(a.title||'').toLocaleLowerCase('sv-SE').trim();if(found.has(k))return false;found.add(k);return true})}
function applyLocalImports(){const saved=storage.get('vr_imported_feeds',[]);if(!Array.isArray(saved))return;
 for(const batch of saved){if(!batch||!Array.isArray(batch.articles)||!batch.source?.id)continue;const id=batch.source.id;
  if(!SOURCES.some(x=>x.id===id)&&!appState.customSources.some(x=>x.id===id))appState.customSources.push(batch.source);
  appState.articles=dedupeArticles(appState.articles.filter(a=>a.source_id!==id).concat(batch.articles));
  appState.sourceStatus[id]={ok:true,count:batch.articles.length,feed:'Inläst RSS-fil'};
 }
}
async function importRSSFile(file){if(file.size>5_000_000)throw Error('Filen är för stor (max 5 MB).');
 const xml=await file.text(),batch=parseImportedRSS(xml,file.name),all=storage.get('vr_imported_feeds',[]),keep=all.filter(x=>x.source?.id!==batch.source.id);
 storage.set('vr_imported_feeds',[...keep.slice(-9),batch]);
 // Refresh from original data on future page reload; replace the imported source now.
 appState.articles=dedupeArticles(appState.articles.filter(a=>a.source_id!==batch.source.id).concat(batch.articles));
 if(!SOURCES.some(x=>x.id===batch.source.id)&&!appState.customSources.some(x=>x.id===batch.source.id))appState.customSources.push(batch.source);
 appState.sourceStatus[batch.source.id]={ok:true,count:batch.articles.length,feed:'Inläst RSS-fil'};
 appState.limit=18;appState.mode='all';appState.tab='all';appState.topic='all';appState.source=batch.source.id;appState.range='all';appState.modal=null;renderApp();
 return batch.articles.length;
}

function modalAddSource(){return modalFrame('Lägg till RSS-flöde','Sparas under Mina källor i den här webbläsaren.',`<form id="source-form"><label class="modal-label" for="new-source-name">Namn på källan</label><input class="modal-input" required maxlength="90" id="new-source-name" placeholder="Till exempel: Forskning vid ett universitet"><label class="modal-label" for="new-source-url">RSS-adress (helst en .xml- eller /rss-länk)</label><input class="modal-input" required type="url" pattern="https://.*" id="new-source-url" placeholder="https://exempel.se/rss.xml"><label class="modal-label" for="new-source-group">Kategori</label><select id="new-source-group" class="modal-input"><option value="svenska">Svenska forskningskällor</option><option value="medier">Vetenskapsmedier</option><option value="studier">Originalstudier</option></select><p class="modal-help">Appen testar att läsa RSS direkt och sparar artiklarna om det fungerar. Vissa källor blockerar hämtning i webbläsare. Då sparas källan som ett förslag som kan aktiveras i den gemensamma uppdateringen senare. Detta påverkar inte andra användare.</p><div id="source-error" class="import-status" role="status"></div><div class="actions-row"><button class="secondary-btn" type="button" data-action="sources">Tillbaka till Mina källor</button><button class="primary-btn" type="submit" id="save-source">Lägg till och testa RSS</button></div></form>`)}
async function fetchBrowserRSS(source){
 // Never use unknown CORS proxies or secret tokens; a publisher must allow the read.
 const controller=new AbortController();const timeout=setTimeout(()=>controller.abort(),10000);
 try{const response=await fetch(source.url,{mode:'cors',credentials:'omit',cache:'no-store',signal:controller.signal});
 if(!response.ok)throw Error('HTTP '+response.status);
 const body=await response.text();if(body.length>5_000_000)throw Error('RSS-filen är för stor.');
 return parseImportedRSS(body,source.name,source);
 }finally{clearTimeout(timeout)}
}
function applyPersonalBatch(batch){
 const saved=storage.get('vr_imported_feeds',[]),keep=saved.filter(x=>x.source?.id!==batch.source.id);
 storage.set('vr_imported_feeds',[...keep.slice(-14),batch]);
 appState.articles=dedupeArticles(appState.articles.filter(a=>a.source_id!==batch.source.id).concat(batch.articles));
 appState.sourceStatus[batch.source.id]={ok:true,count:batch.articles.length,feed:'Personlig RSS-källa'};
}
async function createPersonalSource(name,url,group){
 const existing=allSources().find(s=>s.url===url||s.homepage===url);
 if(existing){appState.sourceSection='personal';appState.sourceMessage='Källan finns redan: '+existing.name;openModal('sources');return}
 const source={id:'custom-'+stableShortHash(url),name,group,subcategory:'Egen källa',type:'manual',url,homepage:url,enabled:false,note:'Personligt källförslag'};
 let fetched=false,count=0;
 try{
  const batch=await fetchBrowserRSS(source);count=batch.articles.length;fetched=true;
  source.type='browser';source.enabled=true;source.note='Hämtas när du öppnar Forskningsradarn, om källan tillåter det';
  applyPersonalBatch(batch);
 }catch(err){
  source.note='Sparad som förslag: källan kunde inte läsas direkt av webbläsaren.';
 }
 appState.customSources.push(source);storage.set('vr_custom_sources',appState.customSources);
 appState.sourceSection='personal';appState.sourceMessage=fetched?`Klart! ${name} är tillagd med ${count} artiklar på den här datorn. Flödet uppdateras när du öppnar appen.`:`${name} är sparad, men artiklarna kunde inte hämtas direkt. Det kan bero på webbläsarens åtkomstregler eller på länken. Prova RSS-import, eller aktivera källan i den gemensamma hämtningen senare.`;
 openModal('sources');
}
async function refreshBrowserSources(){
 const personals=appState.customSources.filter(s=>s.type==='browser'&&s.enabled&&!appState.disabledSources.has(s.id));
 for(const source of personals.slice(0,15)){
  try{applyPersonalBatch(await fetchBrowserRSS(source));}
  catch{appState.sourceStatus[source.id]={ok:false,count:appState.articles.filter(a=>a.source_id===source.id).length,feed:'Gick inte att uppdatera i webbläsaren'};}
 }
 if(personals.length&&isAuthenticated()&&!appState.modal)renderApp();
}
function openModal(name){appState.modal=name;renderApp();document.querySelector('#modal-overlay .close-button')?.focus()}
function closeModal(){appState.modal=null;renderApp()}
function action(e){const el=e.target.closest('[data-action]');if(!el)return;const what=el.dataset.action,v=el.dataset.value||'';if(what==='side'){appState.sideOpen=!appState.sideOpen;renderApp();return}
 if(what==='logout'){logout();return}if(what==='collapse'){appState.sidebarCollapsed=!appState.sidebarCollapsed;storage.set('vr_side_collapsed',appState.sidebarCollapsed);renderApp();return}if(what==='close'){closeModal();return}
 if(what==='source-section'){appState.sourceSection=v==='personal'?'personal':'editorial';openModal('sources');return}if(what==='sources'||what==='about'||what==='addsource'||what==='importfeed'||what==='newlist'){openModal(what);return}if(what==='organize'){openModal('organize:'+v);return}
 if(what==='mode'){appState.mode=v;appState.source='all';appState.topic='all';appState.tab='all';appState.sideOpen=false;appState.limit=18;renderApp();return}
 if(what==='sided-topic'){appState.topic=appState.topic===v?'all':v;appState.mode='all';appState.source='all';appState.tab='all';appState.sideOpen=false;appState.limit=18;renderApp();return}if(what==='list'){appState.mode='list';appState.activeList=v;appState.source='all';appState.tab='all';appState.topic='all';appState.sideOpen=false;appState.limit=18;renderApp();return}if(what==='toggle-in-list'){const list=appState.lists[v],id=appState.modal?.split(':')[1];if(!list||!id)return;list.ids=list.ids||[];list.ids.includes(id)?list.ids=list.ids.filter(x=>x!==id):list.ids.push(id);storage.set('vr_lists',appState.lists);renderApp();return}if(what==='source'){appState.source=v;appState.mode='all';appState.sideOpen=false;appState.limit=18;renderApp();return}
 if(what==='tab'){appState.tab=v;appState.mode='all';appState.source='all';appState.limit=18;renderApp();return}
 if(what==='topic'){appState.topic=v;appState.limit=18;renderApp();return}
 if(what==='view'){appState.view=v;storage.set('vr_view',v);renderApp();return}
 if(what==='clearimports'){if(confirm('Ta bort lokalt inlästa RSS-flöden?')){const old=storage.get('vr_imported_feeds',[]);const ids=new Set(old.map(x=>x.source?.id));const importedIDs=new Set(old.flatMap(x=>(x.articles||[]).map(a=>a.id)));appState.articles=appState.articles.filter(x=>!importedIDs.has(x.id));appState.customSources=appState.customSources.filter(x=>x.type!=='local');storage.del('vr_imported_feeds');appState.modal=null;renderApp()}return}
 if(what==='reset'){appState.mode='all';appState.tab='all';appState.topic='all';appState.source='all';appState.search='';appState.range='all';appState.limit=18;renderApp();return}
 if(what==='more'){appState.limit+=18;updateList();return}
 if(what==='more-recent'){appState.limitRecent+=18;updateList();return}
 if(what==='more-older'){appState.limitOlder+=18;updateList();return}
 if(what==='article'){appState.read.add(v);storage.set('vr_read',[...appState.read]);el.closest('.news-card')?.classList.add('was-read');return}
 if(what==='favorite'){appState.favorites.has(v)?appState.favorites.delete(v):appState.favorites.add(v);storage.set('vr_favorites',[...appState.favorites]);renderApp();return}
 if(what==='read'){appState.read.has(v)?appState.read.delete(v):appState.read.add(v);storage.set('vr_read',[...appState.read]);renderApp();return}
 if(what==='remove-source'){const custom=appState.customSources.find(s=>s.id===v);if(!custom)return;if(!confirm('Ta bort '+custom.name+' och lokalt inlästa artiklar från den här källan?'))return;appState.customSources=appState.customSources.filter(s=>s.id!==v);storage.set('vr_custom_sources',appState.customSources);storage.set('vr_imported_feeds',storage.get('vr_imported_feeds',[]).filter(x=>x.source?.id!==v));appState.articles=appState.articles.filter(a=>a.source_id!==v);appState.disabledSources.delete(v);storage.set('vr_disabled_sources',[...appState.disabledSources]);appState.sourceMessage=custom.name+' har tagits bort från den här webbläsaren.';renderApp();return}
 if(what==='show-all-sources'||what==='hide-all-sources'){for(const s of SOURCES){if(what==='hide-all-sources')appState.disabledSources.add(s.id);else appState.disabledSources.delete(s.id)}storage.set('vr_disabled_sources',[...appState.disabledSources]);renderApp();return}if(what==='toggle-source'){appState.disabledSources.has(v)?appState.disabledSources.delete(v):appState.disabledSources.add(v);storage.set('vr_disabled_sources',[...appState.disabledSources]);renderApp();return}
}
function onSubmit(e){if(e.target.id==='login-form'){e.preventDefault();const p=document.getElementById('login-password')?.value||'';if(p!==DEMO_PASSWORD){renderLogin('Fel lösenord. Försök igen.');return}const remember=document.getElementById('login-remember')?.checked;if(remember){storage.set('vr_auth',true)}else{storage.del('vr_auth');session.set('vr_auth',true)}renderApp();return}
 if(e.target.id==='date-form'){e.preventDefault();const from=document.getElementById('custom-from')?.value||'',to=document.getElementById('custom-to')?.value||'';if(from&&to&&from>to){alert('Från-datum måste vara före till-datum.');return}appState.customFrom=from;appState.customTo=to;appState.range='custom';closeModal();return}
 if(e.target.id==='list-form'){e.preventDefault();const input=document.getElementById('list-name');const name=input?.value.trim().slice(0,60);if(!name)return;const id='list-'+Date.now();appState.lists[id]={name,ids:[]};storage.set('vr_lists',appState.lists);appState.mode='list';appState.activeList=id;closeModal();return}
 if(e.target.id==='source-form'){e.preventDefault();const name=document.getElementById('new-source-name').value.trim(),url=document.getElementById('new-source-url').value.trim(),group=document.getElementById('new-source-group').value;try{const u=new URL(url);if(u.protocol!=='https:')throw Error('Använd en https-adress.')}catch{const error=document.getElementById('source-error');error.textContent='Ange en giltig https-adress.';error.className='import-status import-error';return}const button=document.getElementById('save-source');if(button){button.disabled=true;button.textContent='Kontrollerar RSS ...'}createPersonalSource(name,url,group).catch(err=>{const error=document.getElementById('source-error');if(error){error.textContent='Kunde inte lägga till källan: '+err.message;error.className='import-status import-error'}if(button){button.disabled=false;button.textContent='Försök igen'}});return}}
function onChange(e){if(e.target.id==='rss-file'){const file=e.target.files?.[0];if(file){importRSSFile(file).catch(err=>{const box=document.getElementById('rss-file-result');if(box){box.textContent=err.message||'Kunde inte läsa filen.';box.className='import-status import-error'}})}return}if(e.target.id==='date-filter'){appState.range=e.target.value;if(appState.range==='custom'){openModal('dates')}else{appState.limit=18;renderApp()}}if(e.target.id==='sort-filter'){appState.sort=e.target.value;renderApp()}}
function onInput(e){if(e.target.id==='source-search'){appState.sourceQuery=e.target.value;const list=document.getElementById('editorial-source-list');if(list){const q=appState.sourceQuery.trim().toLocaleLowerCase('sv-SE');list.innerHTML=SOURCES.filter(s=>[s.name,s.subcategory,s.note].join(' ').toLocaleLowerCase('sv-SE').includes(q)).map(sourceListRow).join('')||'<div class="source-empty">Inga källor matchar sökningen.</div>'}return}if(e.target.id==='search'){appState.search=e.target.value;appState.limit=18;updateList()}}
function onKey(e){if(e.key==='Escape'&&appState.modal)closeModal();if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();document.getElementById('search')?.focus()}}
async function init(){appState.articles=dedupeArticles(DEMO_DATA.articles);appState.isDemo=true;appState.updatedAt=DEMO_DATA.updated_at;try{if(location.protocol!=='file:'){
 const response=await fetch('data/articles.json?cache='+Date.now(),{cache:'no-store'});
 if(response.ok){const json=await response.json();if(Array.isArray(json.articles)){appState.articles=dedupeArticles(json.articles.filter(a=>a&&a.id&&a.source_id&&a.title));appState.isDemo=!!json.is_demo;appState.updatedAt=json.updated_at;appState.sourceStatus=json.source_status||{}}}
 }}catch(err){console.warn('Demo används tills datafilen kan hämtas:',err)}
 applyLocalImports();appState.loaded=true;renderApp();refreshBrowserSources();
}
document.addEventListener('click',e=>{const show=e.target.closest('#password-eye');if(show){const f=document.getElementById('login-password');if(f){f.type=f.type==='password'?'text':'password';show.innerHTML=icon(f.type==='password'?'eye':'eyeOff','sm')}}if(e.target.id==='modal-overlay')closeModal();action(e)});
document.addEventListener('submit',onSubmit);document.addEventListener('change',onChange);document.addEventListener('input',onInput);document.addEventListener('keydown',onKey);
init();
