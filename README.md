# The Rulebook Project

**How to write board game rules people can actually use.**

A researched, source-linked handbook on board game rulebook design — synthesised from 106 primary
sources across BoardGameGeek forums and blogs, publisher style guides, professional rules editors,
and the accessibility literature.

Live site: **https://rulebook-project.vercel.app** · อ่านภาษาไทย: [README.th.md](README.th.md) · [เว็บฉบับภาษาไทย](https://rulebook-project.vercel.app/th)

---

## What's here

| Deliverable | What it is |
| --- | --- |
| `deliverables/How to Create a Good Rulebook.docx` | The full practitioner's handbook (~17,000 words, 7 parts) |
| `deliverables/Rulebook_Research_Database.xlsx` | 10-sheet research database — every finding with a clickable source URL |
| `deliverables/วิธีสร้าง Rulebook ที่ดี.docx` | The same handbook in Thai |
| `deliverables/คู่มือเขียน Rulebook ฉบับแชร์ความรู้.docx` | Thai ebook — the same material written informally, as knowledge-sharing |
| `deliverables/ฐานข้อมูลงานวิจัย Rulebook.xlsx` | The research database in Thai (same 10 sheets, same source URLs) |
| `web/` | Bilingual Next.js site presenting all of the above, with search and an interactive checklist |
| `.claude/skills/rulebook/` | The same research packaged as a Claude Code skill for writing and reviewing rulebooks |

### The database (10 sheets)

- **01_Sources** — 106 documents harvested, with URLs and era
- **02_Knowledge_Base** — 127 findings across 14 categories, each with rationale, evidence and citation
- **03_Praised_Rulebooks** — 35 rulebooks named as exemplary, and exactly what was praised
- **04_Criticised_Rulebooks** — 33 rulebooks named as problematic, and the specific failure mode
- **05_Structure_Templates** — 10 section-order templates from different authorities, side by side
- **06_Style_Rules** — 26 concrete writing rules with a right/wrong example each
- **07_Checklist** — 46-item pre-print QA checklist across 8 phases
- **08_Metrics** — 16 quantitative reference points (font sizes, contrast ratios, rates, timings)
- **09_Failure_Modes** — the failure taxonomy, pulled out for quick scanning

---

## Using the research as a Claude Code skill

`.claude/skills/rulebook/` turns the corpus into a working skill. It loads automatically
in this repo whenever a conversation is about writing, structuring or reviewing a
rulebook; to make it available everywhere, copy the directory to `~/.claude/skills/`.

`SKILL.md` carries the workflows and the line-level rules; the seven files in
`references/` are generated from the same data modules as the Excel database, so a
finding in the skill and a row in the spreadsheet cite the same URL. Regenerate them
with `python3 build/build_skill_refs.py`.

## Running the site locally

```bash
cd web
npm install
npm run dev
```

Then open <http://localhost:3000>.

To build:

```bash
cd web
npm run build
```

The site is fully static — all 19 routes (9 English, 10 Thai) are prerendered at build time.

### Visitor analytics

The site includes Vercel Web Analytics via `@vercel/analytics`. Once the project is deployed on Vercel,
enable **Web Analytics** in the Vercel project dashboard. The dashboard will then report page views,
referrers, visit times, approximate geography, browsers, operating systems and devices without adding
analytics cookies. A visitor-facing explanation is available at `/privacy`.

Analytics intentionally does not fingerprint visitors or infer a person's identity. If named attribution is
needed later, add an explicit account, feedback or mailing-list flow with appropriate consent and retention
controls, and keep that identity data separate from anonymous audience analytics.

## Regenerating the documents

The Word and Excel deliverables are generated from the Markdown and Python data files in `build/`:

```bash
python3 -m venv .venv
./.venv/bin/pip install openpyxl python-docx
./.venv/bin/python build/build_xlsx.py        # -> English database
./.venv/bin/python build/build_xlsx_th.py     # -> Thai database
./.venv/bin/python build/export_json.py       # -> web/data/*.json
./.venv/bin/python build/export_json_th.py    # -> web/data/th/*.json
```

Source content lives in `build/handbook.md` (English), `build/handbook_th.md` (Thai handbook) and
`build/ebook_th.md` (Thai ebook); the structured research data lives in `build/data_kb.py`,
`build/data_kb_th.py`, `build/data_aux.py` and `build/data_aux_th.py`.

---

## Method, and its limits

**How the research was done.** Targeted harvesting of BoardGameGeek forum threads, geeklists and
blogs on rulebook design, criticism and process; primary sources from Stonemaier Games, Resonym,
Leder Games and Fantasy Flight; professional style guides (principally Michael "Curby" Lee's
*Board Game Editing Style Guide* and the *Stonemaier Games Style Guide*); interviews with career
rules editors including Paul Grogan of Gaming Rules!; and accessibility guidance derived from WCAG
and dyslexia typography practice.

**What this is not.** This is targeted research, not an exhaustive crawl. BoardGameGeek hosts
millions of posts and offers no bulk export, so threads were selected by relevance across roughly
2007–2026, weighted towards 2019–2026. Reddit is absent because it blocks automated access.

**Opinion is opinion.** Several games appear in both the praised and criticised lists, because
experienced people disagree about them. Nothing here is a verdict; everything is attributed.

**Harvested material is not redistributed.** Local working copies of third-party forum posts and
articles are gitignored. Only URL manifests (`research/sources_*.tsv`) are versioned, so the
research is reproducible without republishing anyone else's text.

---

## Attribution

Michael "Curby" Lee's [Board Game Editing Style Guide](https://cur.by/styleguide) is licensed
CC BY-NC-SA. Material derived from it — principally the framing, templating, modal-verb and
word-choice guidance — is attributed to him throughout the handbook and the database.

All other sources are summarised and attributed rather than reproduced. Quotations are short
excerpts for attribution and commentary; follow the URLs in the database for full context.

If you use this material, please link back to the original sources. They did the hard part.
