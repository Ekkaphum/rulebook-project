"""Generate the chapter-specific SVG diagrams used by both long-form pages."""

import html
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DATA = json.loads((ROOT / "data/chapterVisuals.json").read_text(encoding="utf-8"))
OUT = ROOT / "public/images/chapters"
OUT.mkdir(parents=True, exist_ok=True)

PALETTES = [
    ("#b6533d", "#fae7dc"),
    ("#27706a", "#e2f0e9"),
    ("#9d7135", "#f6ecd6"),
    ("#526d9b", "#e5ebf5"),
    ("#9a5d80", "#f3e6ee"),
]


def lines(value: str, max_chars: int) -> list[str]:
    """Split labels by words where possible; Thai can break after a short phrase."""
    if len(value) <= max_chars:
        return [value]
    words = value.split()
    if len(words) > 1:
        first = ""
        for word in words:
            candidate = f"{first} {word}".strip()
            if len(candidate) > max_chars and first:
                break
            first = candidate
        return [first, value[len(first):].strip()]
    midpoint = min(max_chars, len(value) // 2 + 1)
    return [value[:midpoint], value[midpoint:]]


def svg_for(locale: str, number: int, cards: list[str]) -> str:
    accent, pale = PALETTES[(number - 1) % len(PALETTES)]
    chapter = f"บทที่ {number:02d}" if locale == "th" else f"CHAPTER {number:02d}"
    parts = [f'''<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="420" viewBox="0 0 1000 420" role="img" aria-labelledby="title desc">
<title id="title">{html.escape(chapter)} — visual summary</title>
<desc id="desc">{html.escape(' → '.join(cards))}</desc>
<rect width="1000" height="420" rx="26" fill="#fffaf1"/>
<rect x="1" y="1" width="998" height="418" rx="25" fill="none" stroke="#e8d9c5" stroke-width="2"/>
<circle cx="920" cy="66" r="76" fill="{pale}" opacity=".8"/>
<circle cx="946" cy="55" r="32" fill="none" stroke="{accent}" stroke-width="3" opacity=".24"/>
<path d="M880 88 l24 -42 24 42z" fill="none" stroke="{accent}" stroke-width="3" opacity=".22"/>
<text x="43" y="62" fill="{accent}" font-family="Noto Sans Thai, Tahoma, Arial, sans-serif" font-size="19" font-weight="700">{html.escape(chapter)}</text>
<text x="43" y="94" fill="#544b42" font-family="Noto Sans Thai, Tahoma, Arial, sans-serif" font-size="18">{('สามจุดที่ควรจำ' if locale == 'th' else 'Three things to keep in mind')}</text>
<path d="M314 242 H354 M626 242 H666" fill="none" stroke="{accent}" stroke-width="3" stroke-linecap="round"/>
<path d="m344 235 11 7 -11 7 m312 -14 11 7 -11 7" fill="none" stroke="{accent}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>''']
    for idx, label in enumerate(cards):
        x = 42 + idx * 312
        y = 133
        parts.append(f'''<rect x="{x}" y="{y}" width="290" height="216" rx="19" fill="#ffffff" stroke="#e8d9c5" stroke-width="2"/>
<rect x="{x}" y="{y}" width="290" height="12" rx="6" fill="{accent}"/>
<circle cx="{x + 42}" cy="{y + 59}" r="25" fill="{pale}"/>
<text x="{x + 42}" y="{y + 68}" text-anchor="middle" fill="{accent}" font-family="Arial, sans-serif" font-size="24" font-weight="700">{idx + 1}</text>''')
        chunks = lines(label, 22)
        if len(chunks) == 1:
            chunks = [chunks[0], ""]
        for line_idx, chunk in enumerate(chunks[:2]):
            if chunk:
                parts.append(f'<text x="{x + 25}" y="{y + 123 + line_idx * 34}" fill="#352e2a" font-family="Noto Sans Thai, Tahoma, Arial, sans-serif" font-size="23" font-weight="700">{html.escape(chunk)}</text>')
        parts.append(f'<path d="M{x + 25} {y + 184} h75" stroke="{accent}" stroke-width="4" stroke-linecap="round" opacity=".45"/>')
    parts.append('</svg>')
    return "\n".join(parts)


def mobile_svg_for(locale: str, number: int, cards: list[str]) -> str:
    accent, pale = PALETTES[(number - 1) % len(PALETTES)]
    chapter = f"บทที่ {number:02d}" if locale == "th" else f"CHAPTER {number:02d}"
    parts = [f'''<svg xmlns="http://www.w3.org/2000/svg" width="420" height="520" viewBox="0 0 420 520" role="img" aria-labelledby="title desc">
<title id="title">{html.escape(chapter)} — visual summary</title>
<desc id="desc">{html.escape(' → '.join(cards))}</desc>
<rect width="420" height="520" rx="20" fill="#fffaf1"/>
<rect x="1" y="1" width="418" height="518" rx="19" fill="none" stroke="#e8d9c5" stroke-width="2"/>
<circle cx="365" cy="42" r="55" fill="{pale}"/>
<text x="24" y="45" fill="{accent}" font-family="Noto Sans Thai, Tahoma, Arial, sans-serif" font-size="20" font-weight="700">{html.escape(chapter)}</text>
<text x="24" y="74" fill="#544b42" font-family="Noto Sans Thai, Tahoma, Arial, sans-serif" font-size="17">{('สามจุดที่ควรจำ' if locale == 'th' else 'Three things to keep in mind')}</text>''']
    for idx, label in enumerate(cards):
        y = 95 + idx * 139
        parts.append(f'''<rect x="24" y="{y}" width="372" height="115" rx="17" fill="#fff" stroke="#e8d9c5" stroke-width="2"/>
<rect x="24" y="{y}" width="372" height="9" rx="5" fill="{accent}"/>
<circle cx="62" cy="{y + 55}" r="23" fill="{pale}"/>
<text x="62" y="{y + 63}" text-anchor="middle" fill="{accent}" font-family="Arial, sans-serif" font-size="22" font-weight="700">{idx + 1}</text>''')
        chunks = lines(label, 24)
        for line_idx, chunk in enumerate(chunks[:2]):
            parts.append(f'<text x="98" y="{y + 54 + line_idx * 31}" fill="#352e2a" font-family="Noto Sans Thai, Tahoma, Arial, sans-serif" font-size="21" font-weight="700">{html.escape(chunk)}</text>')
        if idx < 2:
            parts.append(f'<path d="M210 {y + 115} v24 m-7 -8 7 8 7 -8" fill="none" stroke="{accent}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>')
    parts.append('</svg>')
    return "\n".join(parts)


for locale, chapters in DATA.items():
    for number, chapter in enumerate(chapters, start=1):
        (OUT / f"{locale}-{number:02d}.svg").write_text(
            svg_for(locale, number, chapter["cards"]), encoding="utf-8"
        )
        (OUT / f"{locale}-{number:02d}-mobile.svg").write_text(
            mobile_svg_for(locale, number, chapter["cards"]), encoding="utf-8"
        )

print(f"Generated desktop and mobile visuals for {sum(map(len, DATA.values()))} chapters in {OUT}")
