# -*- coding: utf-8 -*-
import sys, os, json
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from data_kb import S, KB
from data_aux import PRAISED, CRITICISED, TEMPLATES, STYLE_RULES, CHECKLIST, METRICS

OUT = 'web/data'
os.makedirs(OUT, exist_ok=True)

def w(name, obj):
    with open(f'{OUT}/{name}.json','w',encoding='utf-8') as f:
        json.dump(obj, f, ensure_ascii=False, indent=1)
    print(name, len(obj))

w('knowledge', [{'id':a,'category':b,'topic':c,'principle':d,'detail':e,'evidence':f,
                 'source':S.get(g,(g,''))[0],'url':S.get(g,(g,''))[1]} for a,b,c,d,e,f,g in KB])
w('praised', [{'game':g,'aspect':a,'detail':d,'source':S.get(k,(k,''))[0],'url':S.get(k,(k,''))[1]} for g,a,d,k in PRAISED])
w('criticised', [{'game':g,'aspect':a,'detail':d,'source':S.get(k,(k,''))[0],'url':S.get(k,(k,''))[1]} for g,a,d,k in CRITICISED])
w('templates', [{'source':k,'sections':v} for k,v in TEMPLATES.items()])
w('styleRules', [{'area':a,'rule':r,'do':d,'dont':dn,'source':S.get(k,(k,''))[0],'url':S.get(k,(k,''))[1]} for a,r,d,dn,k in STYLE_RULES])
w('checklist', [{'phase':p,'item':i,'why':wh} for p,i,wh in CHECKLIST])
w('metrics', [{'metric':m,'value':v,'context':c,'source':S.get(k,(k,''))[0],'url':S.get(k,(k,''))[1]} for m,v,c,k in METRICS])

auto = json.load(open('build/sources_auto.json'))
def plat(u):
    if 'boardgamegeek.com/geeklist' in u: return 'BGG GeekList'
    if 'boardgamegeek.com/blog' in u: return 'BGG Blog'
    if 'boardgamegeek.com/wiki' in u: return 'BGG Wiki'
    if 'boardgamegeek.com' in u: return 'BGG Thread'
    if 'stonemaiergames' in u: return 'Publisher'
    if 'docs.google' in u or 'cur.by' in u: return 'Style Guide'
    return 'Web / Blog'
srcs = [{'id':f'SRC-{i:03d}','type':plat(r['url']),'title':r['title'],'url':r['url'],'years':r['years']}
        for i,r in enumerate(sorted(auto, key=lambda x:x['slug']), start=1)]
srcs.append({'id':f'SRC-{len(srcs)+1:03d}','type':'Style Guide',
             'title':'Board Game Editing Style Guide (Michael "Curby" Lee) — full text','url':'https://cur.by/styleguide','years':'2020-2025'})
w('sources', srcs)
