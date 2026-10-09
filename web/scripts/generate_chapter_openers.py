"""Build chapter-specific overview infographics for the two long-form pages."""

import html
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DATA = json.loads((ROOT / "data/chapterOpeners.json").read_text(encoding="utf-8"))
OUT = ROOT / "public/images/chapter-openers"
OUT.mkdir(parents=True, exist_ok=True)

COLORS = ["#a84938", "#246c69", "#8d642e", "#4b6190", "#8a4d70"]
FONT = "Noto Sans Thai, Tahoma, Arial, sans-serif"
ICONS = {
    "book": '<path d="M10 25 Q30 15 50 28 Q70 15 90 25 V82 Q70 72 50 85 Q30 72 10 82 Z M50 28 V85"/>',
    "people": '<circle cx="50" cy="25" r="12"/><circle cx="22" cy="40" r="9"/><circle cx="78" cy="40" r="9"/><path d="M29 82 Q30 54 50 54 Q70 54 71 82 M5 82 Q7 57 24 57 M76 57 Q93 57 95 82"/>',
    "target": '<circle cx="50" cy="50" r="38"/><circle cx="50" cy="50" r="22"/><circle cx="50" cy="50" r="6"/>',
    "flow": '<rect x="6" y="15" width="26" height="24" rx="5"/><rect x="68" y="15" width="26" height="24" rx="5"/><rect x="37" y="65" width="26" height="24" rx="5"/><path d="M32 27 H68 M50 39 V65 M44 58 L50 65 L56 58"/>',
    "split": '<path d="M9 20 H43 V80 H9 Z M57 20 H91 V80 H57 Z M43 50 H57 M50 50 V38 M44 44 L50 38 L56 44"/>',
    "pen": '<path d="M17 76 L69 24 L80 35 L28 87 Z M69 24 L76 17 Q80 13 84 17 L89 22 Q93 26 89 30 L80 35 M17 76 L13 91 L28 87"/>',
    "tag": '<path d="M12 23 H57 L88 50 L57 77 H12 Z"/><circle cx="28" cy="50" r="6"/><path d="M48 36 H64 M48 50 H70 M48 64 H64"/>',
    "cards": '<rect x="15" y="18" width="52" height="67" rx="5"/><path d="M67 30 H83 Q88 30 88 35 V80 Q88 85 83 85 H67 M27 35 H55 M27 49 H55 M27 63 H46"/>',
    "index": '<path d="M20 18 H78 V84 H20 Z M78 32 H88 V46 H78 M78 55 H88 V69 H78 M31 35 H65 M31 50 H65 M31 65 H58"/>',
    "layout": '<rect x="14" y="16" width="72" height="72" rx="5"/><path d="M14 38 H86 M48 38 V88 M24 27 H61 M24 51 H39 M24 61 H39 M56 51 H77 M56 61 H77"/>',
    "aid": '<rect x="15" y="15" width="70" height="70" rx="6"/><path d="M29 36 L35 42 L45 29 M52 36 H73 M29 61 L35 67 L45 54 M52 61 H73"/>',
    "access": '<circle cx="50" cy="17" r="8"/><path d="M13 37 Q50 48 87 37 M50 31 V83 M50 51 L28 83 M50 51 L72 83"/>',
    "process": '<circle cx="20" cy="50" r="11"/><circle cx="50" cy="50" r="11"/><circle cx="80" cy="50" r="11"/><path d="M31 50 H39 M61 50 H69"/>',
    "test": '<path d="M12 24 Q31 17 50 29 Q69 17 88 24 V79 Q69 72 50 84 Q31 72 12 79 Z M50 29 V84"/><path d="M37 44 Q37 36 46 36 Q56 36 56 45 Q56 51 50 54 M50 62 V63"/>',
    "warning": '<path d="M50 14 L93 84 H7 Z M50 38 V60 M50 72 V73"/>',
    "case": '<circle cx="44" cy="43" r="25"/><path d="M62 62 L85 85 M32 44 H56 M44 32 V56"/>',
    "tools": '<rect x="18" y="16" width="58" height="70" rx="5"/><path d="M29 35 L34 40 L42 30 M47 35 H65 M29 59 L34 64 L42 54 M47 59 H65 M65 16 V10 H80 V22"/>',
}


def wrap(value: str, limit: int) -> list[str]:
    if len(value) <= limit:
        return [value]
    words = value.split()
    if len(words) > 1:
        result, line = [], ""
        for word in words:
            candidate = f"{line} {word}".strip()
            if len(candidate) > limit and line:
                result.append(line)
                line = word
            else:
                line = candidate
        result.append(line)
        return result
    return [value[:limit], value[limit:]]


def text_lines(value: str, x: int, y: int, size: int, limit: int, gap: int, color: str) -> str:
    return "".join(
        f'<text x="{x}" y="{y + i * gap}" fill="{color}" font-family="{FONT}" font-size="{size}" font-weight="700">{html.escape(line)}</text>'
        for i, line in enumerate(wrap(value, limit)[:3])
    )


def render(locale: str, number: int, item: dict, mobile: bool) -> str:
    accent = COLORS[(number - 1) % len(COLORS)]
    chapter = f"บทที่ {number:02d}" if locale == "th" else f"CHAPTER {number:02d}"
    subhead = "ในบทนี้จะเจอ" if locale == "th" else "INSIDE THIS CHAPTER"
    width, height = (420, 720) if mobile else (1000, 560)
    parts = [f'''<svg xmlns="http://www.w3.org/2000/svg" width="{width}" height="{height}" viewBox="0 0 {width} {height}" role="img" aria-labelledby="title desc">
<title id="title">{html.escape(chapter)}: {html.escape(item['focus'])}</title>
<desc id="desc">{html.escape(' • '.join(item['topics']))}</desc>
<rect width="{width}" height="{height}" rx="24" fill="#f8f3e9"/>
<rect x="1" y="1" width="{width - 2}" height="{height - 2}" rx="23" fill="none" stroke="#e8d9c5" stroke-width="2"/>''']
    if mobile:
        parts.append(f'''<rect x="18" y="18" width="384" height="220" rx="19" fill="{accent}"/>
<circle cx="340" cy="208" r="105" fill="#fff" opacity=".07"/>
<text x="39" y="53" fill="#fff" opacity=".85" font-family="{FONT}" font-size="17" font-weight="700">{html.escape(chapter)}</text>
{text_lines(item['focus'], 39, 101, 27, 23, 38, '#fff')}
<g transform="translate(287 143) scale(.75)" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" opacity=".9">{ICONS[item['icon']]}</g>
<text x="20" y="275" fill="{accent}" font-family="{FONT}" font-size="18" font-weight="700">{subhead}</text>''')
        for i, topic in enumerate(item["topics"]):
            y = 294 + i * 101
            parts.append(f'''<rect x="18" y="{y}" width="384" height="83" rx="14" fill="#fff" stroke="#e8d9c5" stroke-width="2"/>
<rect x="18" y="{y}" width="7" height="83" rx="3" fill="{accent}"/>
<text x="42" y="{y + 36}" fill="{accent}" font-family="Arial, sans-serif" font-size="18" font-weight="700">{i + 1:02d}</text>
{text_lines(topic, 88, y + 40, 20, 27, 26, '#352e2a')}''')
    else:
        parts.append(f'''<rect x="26" y="26" width="385" height="508" rx="23" fill="{accent}"/>
<circle cx="368" cy="441" r="135" fill="#fff" opacity=".07"/>
<text x="57" y="78" fill="#fff" opacity=".85" font-family="{FONT}" font-size="21" font-weight="700">{html.escape(chapter)}</text>
{text_lines(item['focus'], 57, 144, 31, 23, 43, '#fff')}
<g transform="translate(150 332) scale(1.2)" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" opacity=".93">{ICONS[item['icon']]}</g>
<text x="446" y="77" fill="{accent}" font-family="{FONT}" font-size="20" font-weight="700">{subhead}</text>''')
        for i, topic in enumerate(item["topics"]):
            x = 442 + (i % 2) * 263
            y = 106 + (i // 2) * 219
            parts.append(f'''<rect x="{x}" y="{y}" width="247" height="193" rx="18" fill="#fff" stroke="#e8d9c5" stroke-width="2"/>
<circle cx="{x + 37}" cy="{y + 39}" r="20" fill="{accent}" opacity=".13"/>
<text x="{x + 37}" y="{y + 46}" text-anchor="middle" fill="{accent}" font-family="Arial, sans-serif" font-size="19" font-weight="700">{i + 1}</text>
{text_lines(topic, x + 21, y + 97, 20, 21, 29, '#352e2a')}
<path d="M{x + 21} {y + 163} h67" stroke="{accent}" stroke-width="4" opacity=".4" stroke-linecap="round"/>''')
    parts.append("</svg>")
    return "\n".join(parts)


for locale, chapters in DATA.items():
    for number, item in enumerate(chapters, start=1):
        for mobile in (False, True):
            suffix = "-mobile" if mobile else ""
            (OUT / f"{locale}-{number:02d}{suffix}.svg").write_text(
                render(locale, number, item, mobile), encoding="utf-8"
            )

print(f"Generated overview infographics for {sum(map(len, DATA.values()))} chapters")
