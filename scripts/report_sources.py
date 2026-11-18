#!/usr/bin/env python3
"""Skapa en kort svensk testöversikt med full status för varje källa, utan AI."""
import csv
import json
from pathlib import Path
from datetime import datetime, timezone
ROOT=Path(__file__).resolve().parents[1]
SOURCES=json.loads((ROOT/'data/sources.json').read_text(encoding='utf-8'))
RAW=ROOT/'test-output/source_status.json'
STATUS=json.loads(RAW.read_text(encoding='utf-8')) if RAW.exists() else {'source_status':{},'success_count':0}
DETAILS=STATUS.get('source_status',{})
DATA=json.loads((ROOT/'data/articles.json').read_text(encoding='utf-8'))
DEST=ROOT/'test-output'
DEST.mkdir(exist_ok=True)
def md(s):
    return str(s).replace('|','\\|').replace('\n',' ').replace('\r',' ').replace('`',"'")
rows=[]
for source in SOURCES:
    d=DETAILS.get(source['id'],{})
    if not source.get('enabled'):
        state='Ej inkopplad'
    elif d.get('ok'):
        state='OK'
    elif d:
        state='Fel'
    else:
        state='Ej testad'
    rows.append({
        'namn':source['name'],
        'grupp':source.get('group',''),
        'typ':source['type'],
        'status':state,
        'artiklar_i_hamtningen': d.get('count',0) if d.get('ok') else '',
        'rss_eller_api_adress': d.get('feed') or source.get('url',''),
        'fel':d.get('reason','') if state=='Fel' else ''
    })
with (DEST/'kallstatus.csv').open('w',encoding='utf-8-sig',newline='') as f:
    writer=csv.DictWriter(f,fieldnames=rows[0].keys(),delimiter=';')
    writer.writeheader();writer.writerows(rows)
ok=sum(r['status']=='OK' for r in rows)
failed=sum(r['status']=='Fel' for r in rows)
not_configured=sum(r['status']=='Ej inkopplad' for r in rows)
not_tested=sum(r['status']=='Ej testad' for r in rows)
articles=len(DATA.get('articles',[])) if not DATA.get('is_demo',True) and ok else 0
lines=[
 '# Forskningsradarn – test av forskningskällor',
 '',
 f"Körning: **{md(STATUS.get('checked_at','Okänt datum'))}** (UTC)",
 '',
 f"**{ok} fungerande**, **{failed} med fel**, **{not_configured} inte inkopplade**, **{not_tested} ej testade** av totalt **{len(rows)} källor**.",
 f"**{articles} artiklar** i den nya datafilen efter dubblettkontroll och datumgräns." if ok else '**Ingen lyckad livehämtning.** Den befintliga artikelfilen har inte ersatts med en ny körning.',
 '',
 '> Rapporten avser en enda testkörning. En godkänd källa kan ge noll nya artiklar.',
 '> Alla flöden behöver inte vara tillgängliga varje gång.',
 '',
 '## Källor som inte kunde hämtas',
 '',
 '| Källa | Typ | Orsak |',
 '|---|---|---|'
]
for r in rows:
    if r['status']=='Fel':lines.append('| '+ ' | '.join(md(r[x]) for x in ['namn','typ','fel'])+' |')
if not failed: lines.append('| – | – | Inga fel i denna körning |')
lines+=['','## Samtliga källor','','| Källa | Grupp | Status | Hämtade poster |','|---|---|---|---:|']
for r in rows:
    lines.append('| '+ ' | '.join(md(r[x]) for x in ['namn','grupp','status','artiklar_i_hamtningen'])+' |')
lines+=['','*Observera att antal poster per källa anges före dubblettrensning; totalsiffran för artiklar är efter dubblettrensning.*','']
(DEST/'rapport.md').write_text('\n'.join(lines),encoding='utf-8')
print('Rapport skapad:',DEST/'rapport.md')
print(f'OK: {ok}, fel: {failed}, inte inkopplade: {not_configured}, ej testade: {not_tested}, artiklar: {articles}')
