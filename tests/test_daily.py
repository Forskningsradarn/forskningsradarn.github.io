"""Additional date and once-a-day regression tests; no network."""
import datetime as dt
import json
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch

from scripts import update_feeds as u

class DailyCollectionTests(unittest.TestCase):
    def test_future_and_missing_date_are_not_made_up(self):
        self.assertEqual(u.published_meta('2117-01-01')[0], '')
        self.assertEqual(u.published_meta('')[1], 'unknown')
        self.assertEqual(u.published_meta('2026-11')[1], 'month')
        self.assertEqual(u.published_meta('2026-11-12')[1], 'day')

    def test_prefer_pubmed_online_over_future_print_issue(self):
        rec={'epubdate':(u.NOW-dt.timedelta(days=1)).date().isoformat(),
             'pubdate':(u.NOW+dt.timedelta(days=100)).date().isoformat(),
             'sortpubdate':(u.NOW+dt.timedelta(days=100)).date().isoformat()}
        a=u.choose_pubmed_date(rec)
        self.assertTrue(a[0].startswith(rec['epubdate']))
        self.assertEqual(a[1], 'day')

    def test_crossref_prefers_online_date_and_rejects_future(self):
        before=(u.NOW-dt.timedelta(days=1)).date()
        x={'published-online':{'date-parts':[[before.year,before.month,before.day]]},
           'published':{'date-parts':[[2117,1,1]]}}
        date,precision,_=u.crossref_date(x)
        self.assertTrue(date.startswith(before.isoformat()))
        self.assertEqual(precision,'day')
        self.assertEqual(u.crossref_date({'published':{'date-parts':[[2117,1,1]]}})[0],'')

    def test_skip_second_collection_on_same_stockholm_day(self):
        with tempfile.TemporaryDirectory() as dir:
            output=Path(dir)/'articles.json'
            body={'updated_at':u.NOW.isoformat(timespec='seconds'),'is_demo':False,'articles':[]}
            output.write_text(json.dumps(body),encoding='utf-8')
            before=output.read_bytes()
            with patch.object(u,'OUTPUT_FILE',output),patch.object(u,'http_get',side_effect=AssertionError('Should not fetch')):
                self.assertEqual(u.main(once_per_day=True),0)
            self.assertEqual(output.read_bytes(),before)

    def test_stockholm_timezone(self):
        # In summertime 06:15 Europe/Stockholm is 04:15 UTC.
        c=dt.datetime(2026,7,1,4,15,tzinfo=dt.timezone.utc)
        self.assertEqual(c.astimezone(u.STOCKHOLM).hour,6)

if __name__ == '__main__':
    unittest.main()
