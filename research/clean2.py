import sys,re,os,glob
CRUFT = [
 r'^\s*\*\s+New Thread\b', r'^\s*\*\s+Community Rules\b', r'^\s*\*\s+Bookmarks\b',
 r'^\s*\*\s+Forum Search\b', r'^\s*\*\s+Subscribe\b', r'^\s*\*\s+Bookmark\s*$',
 r'^\s*\*\s+Share\s*$', r'^\s*\*\s+More Actions\b', r'^\s*User actions menu\s*$',
 r'^\s*\*\s+\d+\s*$', r'^\s*Toggle\b', r'^\s*Search\s*$', r'^\s*Sign In\b',
 r'^\s*Join \(it', r'^\s*Skip \w+', r'^\s*More Geek Sites', r'^\s*Close Menu',
 r'^\s*Change hotness', r'^\s*Hotness Display', r'^\s*\+ Show more',
 r'^\s*Full Date\s*$', r'^\s*\*\s+Recommend\b', r'^\s*\*\s+Poll\b',
 r'^\s*@\S+ <https', r'^\s*\d+\.\s+(Forums|GeekLists|Board Game Creation)\b',
 r'^\s*\*?\s*(Previous|Next)\s*$', r'^\s*Page \d+ of \d+',
 r'^\s*\*\s+(Hot|Recent|All|Browse)\b', r'^\s*Advertisement\s*$',
 r'^\s*Your Tags:', r'^\s*Users? Suggested Tags',
]
CRE=[re.compile(p) for p in CRUFT]
for f in sorted(glob.glob('research/raw/*.md')):
    t=open(f,encoding='utf-8',errors='replace').read()
    out=[]
    for ln in t.split("\n"):
        if any(c.match(ln) for c in CRE): continue
        ln=re.sub(r'\s*<https?://[^>]*>','',ln) if 'SOURCE' not in ln else ln
        out.append(ln)
    t="\n".join(out)
    t=re.sub(r'\n{3,}','\n\n',t)
    # restore header
    os.makedirs('research/clean',exist_ok=True)
    open(f.replace('raw/','clean/'),'w',encoding='utf-8').write(t.strip())
tot=sum(os.path.getsize(x) for x in glob.glob('research/clean/*.md'))
print(f"cleaned {len(glob.glob('research/clean/*.md'))} files, {tot} bytes total")
