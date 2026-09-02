# -*- coding: utf-8 -*-
"""Minimal, dependable Markdown -> DOCX renderer for these deliverables.
Supports: # .. ##### headings, paragraphs, - / * bullets, 1. numbered lists,
> blockquote callouts, | pipe tables |, --- page break, **bold**, *italic*, `code`,
and [text](url) links rendered as underlined blue text with the URL kept.
"""
import re
from docx import Document
from docx.shared import Pt, RGBColor, Inches, Emu
from docx.enum.text import WD_ALIGN_PARAGRAPH, WD_BREAK
from docx.enum.table import WD_TABLE_ALIGNMENT
from docx.oxml.ns import qn
from docx.oxml import OxmlElement

ACCENT = RGBColor(0x1F, 0x38, 0x64)
MUTED  = RGBColor(0x59, 0x59, 0x59)
LINK   = RGBColor(0x05, 0x63, 0xC1)

INLINE = re.compile(r'(\*\*.+?\*\*|\*[^*]+?\*|`[^`]+?`|\[[^\]]+?\]\([^)]+?\))')

def _shade(cell, hexcolor):
    tcPr = cell._tc.get_or_add_tcPr()
    shd = OxmlElement('w:shd'); shd.set(qn('w:val'),'clear'); shd.set(qn('w:fill'), hexcolor)
    tcPr.append(shd)

def _para_border(p, color="1F3864", size="18", left_only=True):
    pPr = p._p.get_or_add_pPr()
    pbdr = OxmlElement('w:pBdr')
    for side in (['left'] if left_only else ['top','left','bottom','right']):
        el = OxmlElement(f'w:{side}')
        el.set(qn('w:val'),'single'); el.set(qn('w:sz'), size)
        el.set(qn('w:space'),'8'); el.set(qn('w:color'), color)
        pbdr.append(el)
    pPr.append(pbdr)

def add_runs(p, text, base_size=None, base_color=None):
    for part in INLINE.split(text):
        if not part: continue
        if part.startswith('**') and part.endswith('**') and len(part) > 4:
            r = p.add_run(part[2:-2]); r.bold = True
        elif part.startswith('*') and part.endswith('*') and len(part) > 2:
            r = p.add_run(part[1:-1]); r.italic = True
        elif part.startswith('`') and part.endswith('`') and len(part) > 2:
            r = p.add_run(part[1:-1]); r.font.name = 'Consolas'; r.font.size = Pt(9.5)
        elif part.startswith('[') and '](' in part:
            label, url = part[1:-1].split('](', 1)
            r = p.add_run(label); r.font.color.rgb = LINK; r.underline = True
        else:
            r = p.add_run(part)
        if base_size: r.font.size = base_size
        if base_color is not None: r.font.color.rgb = base_color
    return p

def set_cs_font(style_or_run, name):
    el = style_or_run._element if hasattr(style_or_run, '_element') else style_or_run.element
    rPr = el.get_or_add_rPr()
    rf = rPr.find(qn('w:rFonts'))
    if rf is None:
        rf = OxmlElement('w:rFonts'); rPr.insert(0, rf)
    for a in ('w:ascii','w:hAnsi','w:cs','w:eastAsia'):
        rf.set(qn(a), name)

def render(md, out_path, title=None, subtitle=None, meta=None, body_font='Calibri',
           body_size=10.5, cover_note=None, toc_after_cover=True, complex_script=False):
    doc = Document()
    st = doc.styles['Normal']; st.font.name = body_font; st.font.size = Pt(body_size)
    if complex_script:
        set_cs_font(st, body_font)
        for sname in ('List Bullet','List Bullet 2','List Number'):
            try: set_cs_font(doc.styles[sname], body_font)
            except Exception: pass
    st.paragraph_format.space_after = Pt(6); st.paragraph_format.line_spacing = 1.15
    for sec in doc.sections:
        sec.left_margin = Inches(1.0); sec.right_margin = Inches(1.0)
        sec.top_margin = Inches(0.9); sec.bottom_margin = Inches(0.9)

    if title:
        for _ in range(4): doc.add_paragraph()
        p = doc.add_paragraph(); p.alignment = WD_ALIGN_PARAGRAPH.CENTER
        r = p.add_run(title); r.bold = True; r.font.size = Pt(30); r.font.color.rgb = ACCENT
        if subtitle:
            p = doc.add_paragraph(); p.alignment = WD_ALIGN_PARAGRAPH.CENTER
            r = p.add_run(subtitle); r.font.size = Pt(14); r.font.color.rgb = MUTED
        if cover_note:
            doc.add_paragraph()
            p = doc.add_paragraph(); p.alignment = WD_ALIGN_PARAGRAPH.CENTER
            r = p.add_run(cover_note); r.font.size = Pt(10.5); r.italic = True; r.font.color.rgb = MUTED
        if meta:
            for _ in range(2): doc.add_paragraph()
            for m in meta:
                p = doc.add_paragraph(); p.alignment = WD_ALIGN_PARAGRAPH.CENTER
                r = p.add_run(m); r.font.size = Pt(9.5); r.font.color.rgb = MUTED
        doc.add_page_break()

    lines = md.split('\n')
    i = 0
    while i < len(lines):
        line = lines[i].rstrip()
        # table
        if line.startswith('|') and i+1 < len(lines) and set(lines[i+1].replace('|','').strip()) <= set('-: '):
            header = [c.strip() for c in line.strip('|').split('|')]
            i += 2
            body = []
            while i < len(lines) and lines[i].startswith('|'):
                body.append([c.strip() for c in lines[i].strip('|').split('|')]); i += 1
            t = doc.add_table(rows=1, cols=len(header)); t.style = 'Table Grid'
            t.alignment = WD_TABLE_ALIGNMENT.CENTER
            for j, h in enumerate(header):
                c = t.rows[0].cells[j]; c.text = ''
                p = c.paragraphs[0]; add_runs(p, h)
                for r in p.runs: r.bold = True; r.font.size = Pt(9.5); r.font.color.rgb = RGBColor(0xFF,0xFF,0xFF)
                _shade(c, '1F3864')
            for brow in body:
                cells = t.add_row().cells
                for j, v in enumerate(brow[:len(header)]):
                    cells[j].text = ''
                    p = cells[j].paragraphs[0]; add_runs(p, v)
                    for r in p.runs: r.font.size = Pt(9)
            doc.add_paragraph()
            continue
        if not line.strip():
            i += 1; continue
        if line.strip() == '---':
            doc.add_page_break(); i += 1; continue
        if line.startswith('```'):
            i += 1; block = []
            while i < len(lines) and not lines[i].startswith('```'):
                block.append(lines[i]); i += 1
            i += 1
            for bl in block:
                p = doc.add_paragraph()
                p.paragraph_format.space_after = Pt(0); p.paragraph_format.space_before = Pt(0)
                p.paragraph_format.left_indent = Inches(0.15)
                r = p.add_run(bl if bl.strip() else ' ')
                r.font.name = 'Consolas'; r.font.size = Pt(8.5)
            doc.add_paragraph()
            continue
        if line.startswith('- [ ] '):
            p = doc.add_paragraph()
            p.paragraph_format.left_indent = Inches(0.25)
            p.paragraph_format.space_after = Pt(2)
            r = p.add_run('\u2610  '); r.font.size = Pt(11)
            add_runs(p, line[6:])
            i += 1; continue
        m = re.match(r'^(#{1,5})\s+(.*)$', line)
        if m:
            lvl = len(m.group(1)); txt = m.group(2)
            if lvl == 1:
                doc.add_page_break()
                p = doc.add_paragraph(); r = p.add_run(txt)
                r.bold = True; r.font.size = Pt(20); r.font.color.rgb = ACCENT
                p.paragraph_format.space_after = Pt(10)
            elif lvl == 2:
                p = doc.add_paragraph(); p.paragraph_format.space_before = Pt(14)
                r = p.add_run(txt); r.bold = True; r.font.size = Pt(14.5); r.font.color.rgb = ACCENT
            elif lvl == 3:
                p = doc.add_paragraph(); p.paragraph_format.space_before = Pt(10)
                r = p.add_run(txt); r.bold = True; r.font.size = Pt(12)
            else:
                p = doc.add_paragraph(); p.paragraph_format.space_before = Pt(8)
                r = p.add_run(txt); r.bold = True; r.italic = True; r.font.size = Pt(10.5)
            i += 1; continue
        if line.startswith('> '):
            block = []
            while i < len(lines) and lines[i].startswith('> '):
                block.append(lines[i][2:]); i += 1
            p = doc.add_paragraph()
            p.paragraph_format.left_indent = Inches(0.25)
            p.paragraph_format.space_before = Pt(8); p.paragraph_format.space_after = Pt(10)
            add_runs(p, ' '.join(block), base_size=Pt(10), base_color=RGBColor(0x2F,0x2F,0x2F))
            for r in p.runs: r.italic = True
            _para_border(p)
            continue
        m = re.match(r'^(\s*)[-*]\s+(.*)$', line)
        if m:
            indent = len(m.group(1)) // 2
            p = doc.add_paragraph(style='List Bullet' if indent == 0 else 'List Bullet 2')
            add_runs(p, m.group(2)); p.paragraph_format.space_after = Pt(3)
            i += 1; continue
        m = re.match(r'^(\s*)\d+\.\s+(.*)$', line)
        if m:
            p = doc.add_paragraph(style='List Number')
            add_runs(p, m.group(2)); p.paragraph_format.space_after = Pt(3)
            i += 1; continue
        p = doc.add_paragraph(); add_runs(p, line)
        i += 1

    if complex_script:
        for para in doc.paragraphs:
            for r in para.runs:
                set_cs_font(r, body_font if r.font.name in (None, body_font) else r.font.name)
        for t in doc.tables:
            for row in t.rows:
                for c in row.cells:
                    for para in c.paragraphs:
                        for r in para.runs:
                            set_cs_font(r, body_font if r.font.name in (None, body_font) else r.font.name)
    doc.save(out_path)
    return out_path
