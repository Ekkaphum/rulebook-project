import re,glob,os
DROP = [
 r'^\s*\*?\s*Give GeekGold', r'^\s*Tip with GeekGold', r'^\s*\*?\s*Reply\s*$',
 r'^\s*\*?\s*Quote\s*$', r'^\s*\*?\s*More Options', r'^\s*[\d.]+\s*GeekGold',
 r'^\s*\*?\s*Report Un-report', r'^\s*\*\s*$', r'^\s*User actions menu\s*$',
 r'^\s*Full Date\s*$', r'^\s*:strip_icc', r'^\s*Download the BGG App',
 r'^\s*#\s*Footer Links', r'^\s*##\s*(Company|Policies|Connect)\s*$',
 r'^\s*\*\s+(About|Contact|Advertise|Support BGG|Community Guidelines|Privacy|Terms|Manage Cookies|Facebook|Bluesky|Instagram|Youtube|Twitch|Discord)\s*$',
 r'^\s*Markdown Content:\s*$', r'^\s*URL Source:', r'^\s*\[q\]',
 r'^\s*Thumb up', r'^\s*\d+\s+Posts?\s*$',
]
CRE=[re.compile(p) for p in DROP]
os.makedirs('research/final',exist_ok=True)
tot=0
for f in sorted(glob.glob('research/clean/*.md')):
    t=open(f,encoding='utf-8',errors='replace').read()
    out=[]; prev=''
    for ln in t.split("\n"):
        if any(c.match(ln) for c in CRE): continue
        if ln.strip() and ln.strip()==prev.strip(): continue
        out.append(ln); prev=ln
    t="\n".join(out); t=re.sub(r'\n{3,}','\n\n',t).strip()
    o=f.replace('clean/','final/')
    open(o,'w',encoding='utf-8').write(t); tot+=len(t)
print(f"{len(glob.glob('research/final/*.md'))} files, {tot} chars (~{tot//4} tokens)")
