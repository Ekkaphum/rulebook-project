import sys, re
def clean(text):
    title = ''
    tm = re.search(r'^Title: (.*)$', text, re.M)
    if tm: title = tm.group(1).strip()
    url = ''
    um = re.search(r'^URL Source: (\S+)', text, re.M)
    if um: url = um.group(1)
    # strip images, flatten links to "text <url>"
    text = re.sub(r'!\[[^\]]*\]\([^)]*\)', '', text)
    text = re.sub(r'\[([^\]]{0,180})\]\(([^)\s]+)\)', r'\1 <\2>', text)
    # cut leading nav
    for marker in [r'\n1\.\s+Forums\s*<', r'\n#\s+', r'\nMarkdown Content:']:
        m = re.search(marker, text)
        if m and m.start() > 200:
            text = text[m.start():]
            break
    # cut trailing footer
    for tail in ['Advertising & Shopping Recommendations','Front Page | Welcome | Contact',
                 'Geekdo, BoardGameGeek, the Geekdo logo','Your Privacy Choices']:
        i = text.find(tail)
        if i > 500: text = text[:i]
    lines=[]
    for ln in text.split("\n"):
        if ln.count("<http")>5: continue
        if re.match(r'^\s*\*?\s*/pic\d+', ln): continue
        if re.match(r'^\s*Published\s+\d{4}\s*$', ln): continue
        lines.append(ln.rstrip())
    text="\n".join(lines)
    text=re.sub(r'\n{3,}','\n\n',text)
    return f"# SOURCE\nTitle: {title}\nURL: {url}\n\n---\n\n" + text.strip()
if __name__=='__main__':
    t=open(sys.argv[1],encoding='utf-8',errors='replace').read()
    open(sys.argv[2],'w',encoding='utf-8').write(clean(t))
