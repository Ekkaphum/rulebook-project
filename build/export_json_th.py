# -*- coding: utf-8 -*-
import sys, os, json
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from data_kb import S
from data_kb_th import KB_TH
from data_aux_th import PRAISED_TH, CRITICISED_TH, TEMPLATES_TH, STYLE_RULES_TH, CHECKLIST_TH, METRICS_TH

OUT = 'web/data/th'
os.makedirs(OUT, exist_ok=True)
def w(name, obj):
    json.dump(obj, open(f'{OUT}/{name}.json','w',encoding='utf-8'), ensure_ascii=False, indent=1)
    print('th/'+name, len(obj))

w('knowledge', [{'id':a,'category':b,'topic':c,'principle':d,'detail':e,'evidence':f,
                 'source':S.get(g,(g,''))[0],'url':S.get(g,(g,''))[1]} for a,b,c,d,e,f,g in KB_TH])
w('praised', [{'game':g,'aspect':a,'detail':d,'source':S.get(k,(k,''))[0],'url':S.get(k,(k,''))[1]} for g,a,d,k in PRAISED_TH])
w('criticised', [{'game':g,'aspect':a,'detail':d,'source':S.get(k,(k,''))[0],'url':S.get(k,(k,''))[1]} for g,a,d,k in CRITICISED_TH])
w('templates', [{'source':k,'sections':v} for k,v in TEMPLATES_TH.items()])
w('styleRules', [{'area':a,'rule':r,'do':d,'dont':dn,'source':S.get(k,(k,''))[0],'url':S.get(k,(k,''))[1]} for a,r,d,dn,k in STYLE_RULES_TH])
w('checklist', [{'phase':p,'item':i,'why':wh} for p,i,wh in CHECKLIST_TH])
w('metrics', [{'metric':m,'value':v,'context':c,'source':S.get(k,(k,''))[0],'url':S.get(k,(k,''))[1]} for m,v,c,k in METRICS_TH])

auto = json.load(open('build/sources_auto.json'))
def plat(u):
    if 'boardgamegeek.com/geeklist' in u: return 'BGG GeekList'
    if 'boardgamegeek.com/blog' in u: return 'BGG บล็อก'
    if 'boardgamegeek.com/wiki' in u: return 'BGG วิกิ'
    if 'boardgamegeek.com' in u: return 'BGG เธรด'
    if 'stonemaiergames' in u: return 'สำนักพิมพ์'
    if 'docs.google' in u or 'cur.by' in u: return 'Style Guide'
    return 'เว็บ / บล็อก'
srcs = [{'id':f'SRC-{i:03d}','type':plat(r['url']),'title':r['title'],'url':r['url'],'years':r['years']}
        for i,r in enumerate(sorted(auto, key=lambda x:x['slug']), start=1)]
srcs.append({'id':f'SRC-{len(srcs)+1:03d}','type':'Style Guide',
             'title':'Board Game Editing Style Guide (Michael "Curby" Lee) — ข้อความเต็ม','url':'https://cur.by/styleguide','years':'2020-2025'})
w('sources', srcs)
