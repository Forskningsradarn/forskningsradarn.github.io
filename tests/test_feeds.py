import unittest
from scripts.update_feeds import parse_rss, make_article, parse_date, strip_html, FeedDiscovery, article_id

SOURCE={'id':'exempel','name':'Exempel','group':'medier','homepage':'https://example.org'}

class FeedsTest(unittest.TestCase):
    def test_rss(self):
        xml=b'''<?xml version="1.0"?><rss version="2.0"><channel><title>Nyheter</title>
          <item><title>Ny forskning om klimatet</title><description>Varmare &amp; torrare klimat</description>
          <link>https://example.org/article/1</link><pubDate>Thu, 12 Nov 2026 08:00:00 +0000</pubDate></item>
        </channel></rss>'''
        entries=parse_rss(xml,SOURCE)
        self.assertEqual(len(entries),1)
        self.assertEqual(entries[0]['topic'],'klimat')
        self.assertEqual(entries[0]['url'],'https://example.org/article/1')
        self.assertTrue(entries[0]['published'].startswith('2026-11-12'))

    def test_atom(self):
        xml=b'''<?xml version="1.0"?><feed xmlns="http://www.w3.org/2005/Atom"><entry>
          <title>Brain cancer treatments</title><link rel="alternate" href="https://example.org/paper/2"/>
          <updated>2026-11-12T18:20:00Z</updated><summary>New medical study</summary>
        </entry></feed>'''
        entries=parse_rss(xml,SOURCE)
        self.assertEqual(entries[0]['topic'],'medicin')
        self.assertEqual(entries[0]['url'],'https://example.org/paper/2')

    def test_bbc_media_thumbnail_and_copyright(self):
        xml=b'''<rss xmlns:media="http://search.yahoo.com/mrss/" version="2.0"><channel><item>
         <title>Climate observation</title><link>https://example.org/climate</link>
         <media:content url="https://img.example.org/large.jpg" width="900" medium="image">
           <media:copyright>Example photographer</media:copyright>
           <media:description>Image of climate measurements</media:description>
           <media:thumbnail url="https://img.example.org/small.jpg" width="180" />
         </media:content>
        </item></channel></rss>'''
        article=parse_rss(xml,SOURCE)[0]
        self.assertEqual(article['image'],'https://img.example.org/large.jpg')
        self.assertEqual(article['image_credit'],'Example photographer')
        self.assertEqual(article['image_alt'],'Image of climate measurements')

    def test_guardian_several_media_sizes(self):
        xml=b'''<rss xmlns:media="http://search.yahoo.com/mrss/" version="2.0"><channel><item>
          <title>Physics research</title><link>https://example.org/p</link>
          <media:content url="https://img.example.org/140.jpg" width="140" medium="image"/>
          <media:content url="https://img.example.org/700.jpg" width="700" medium="image"/>
          <media:content url="https://img.example.org/460.jpg" width="460" medium="image"/>
        </item></channel></rss>'''
        self.assertEqual(parse_rss(xml,SOURCE)[0]['image'],'https://img.example.org/700.jpg')

    def test_image_from_enclosure_or_html(self):
        xml=b'''<rss version="2.0"><channel>
          <item><title>Bio news</title><link>https://example.org/b</link><enclosure url="https://img.example.org/b.jpg" type="image/jpeg"/></item>
          <item><title>Medical science</title><link>https://example.org/m</link><description>&lt;p&gt;&lt;img src="https://img.example.org/m.jpg" /&gt;&lt;/p&gt;</description></item>
        </channel></rss>'''
        images=[a['image'] for a in parse_rss(xml,SOURCE)]
        self.assertEqual(images,['https://img.example.org/b.jpg','https://img.example.org/m.jpg'])

    def test_reject_untrusted_images(self):
        xml=b'''<rss xmlns:media="http://search.yahoo.com/mrss/"><channel><item><title>News</title><link>https://example.org/a</link>
        <media:content url="javascript:alert(1)" medium="image"/></item></channel></rss>'''
        self.assertEqual(parse_rss(xml,SOURCE)[0]['image'],'')

    def test_html_sanitization(self):
        self.assertEqual(strip_html('<strong>Resultat</strong> &amp; fakta'),'Resultat & fakta')
        self.assertIsNone(make_article('exempel','T','X','2026-11-13','javascript:alert(1)'))
        self.assertEqual(parse_date('2026/11/12 00:00')[:10],'2026-11-12')

    def test_autodiscovery_link_parser(self):
        p=FeedDiscovery()
        p.feed('<link rel="alternate" type="application/rss+xml" href="/feed.xml">')
        self.assertEqual(p.candidates,['/feed.xml'])

if __name__=='__main__':
    unittest.main()
