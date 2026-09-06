---
name: rulebook
description: Write, review, restructure, or edit a board game rulebook — the manual that ships in the box. Use when the user is drafting rules text, asks how to organise a rulebook, wants a rulebook or a section of one critiqued, asks what to put on the back cover, asks about wording ("may vs must", "each vs every", "when vs whenever"), asks about component lists, setup diagrams, iconography, glossaries, indexes, player aids, teaching order, blind playtesting the rules, rules editing and proofreading, errata and living rules, rulebook typography and accessibility, or asks why players keep misplaying their game. Triggers on "rulebook", "rules document", "how to play booklet", "learn to play", "rules reference", "คู่มือเกม", "กติกาเกม", "เขียนกฎเกม".
---

# Board game rulebook craft

A rulebook has two incompatible jobs: **teaching** a stranger the game once, and **answering** a specific question in eight seconds during play. Most rulebook failures are one document trying to do both jobs in the same paragraph. Nearly every recommendation below is downstream of that tension.

Evidence base: a 106-source corpus — professional rules editors' style guides, publisher house guides, BGG designer and comprehension threads, and reviewer post-mortems. The 67 sources cited directly by this skill are indexed in `references/sources.md`.

## Pick the workflow

| The user wants | Go to |
|---|---|
| A rulebook drafted, or a structure proposed | [Writing](#writing-a-rulebook) |
| An existing rulebook or section critiqued | [Reviewing](#reviewing-a-rulebook) |
| A specific wording or terminology decision | [The line-level rules](#the-line-level-rules) |
| A final pass before print | `references/checklist.md`, all 46 items |

Always ask for or read the actual game first — component list, turn structure, win condition. Rulebook advice given without knowing the game is worthless, and this skill exists to stop you producing generic advice.

## Writing a rulebook

### 1. Decide the architecture before writing a word

Answer these three, in order:

1. **One document or two?** Above roughly medium weight, split a **Learn to Play** (linear, example-heavy, read once) from a **Rules Reference** (alphabetical or numbered, never read linearly, consulted forever). Fantasy Flight's dual-document model is the reference implementation and users report finding answers "in seconds". Below that weight, one document with a strong back cover is better — two thin books create the *wrong-booklet problem* (A Feast for Odin, Ulm).
2. **What is the teaching order?** Theme in one or two sentences → **win condition and end trigger** → big-picture flow → details. Rules do not stick without a goal to attach them to. This ordering is the single most-repeated finding in the corpus.
3. **What goes on the back cover?** Turn flow, icon key, setup summary — decide now, because it constrains what the body must repeat. It is the most valuable page in the book.

Then pick a section order from `references/templates.md` (10 published templates) and state which one you are following and why.

### 2. Draft in this order

Write **Components → Setup → Goal → Turn overview → Turn detail → End & scoring** first; write the introduction and any flavour last. Flavour written first contaminates the rules with vagueness.

For each section:

- Lead with the shape, then the detail. A reader should be able to stop after the overview and know what the game *feels* like.
- Attach an example to any rule you would explain out loud with "so for instance…". Examples must cover a **non-obvious** case — an obvious example is wasted print.
- Put exceptions *beside* their rule or in a marked section, never inline in the core flow.

### 3. Non-negotiables in the finished draft

- **No rule exists only in an example, a caption, a parenthetical, or on a component.** Rules that live only on a reference card vanish when the card does (Mage Knight, Triplock).
- **No term used before it is defined.** The most-cited reader irritation in the entire corpus.
- **Setup fully specified for every player count**, including solo and variants — and their end conditions too.
- **A tie-breaker for every "the most / the least / first"** superlative.
- **The end-of-game sequence, not just the trigger.** Does the current round finish? Say so.
- **A version number and date on the book.**

## Reviewing a rulebook

Work in this order and report findings the same way. Do not reorder — structural faults make line-level notes moot.

1. **Completeness** — read for what is *absent*. Missing player-count deltas, missing tie-breakers, missing end-of-round resolution, rules present on components but not in the book. This finds the defects that ship.
2. **Structure** — can one linear read teach the game? Is the goal before the detail? Does each rule sit under the heading a *confused* player would reach for? Retrieval is a separate problem from teaching, and most books solve only one.
3. **Terminology** — build a term inventory. One concept must have exactly one name, everywhere, including cards and the box. Flag every synonym pair and every undefined game-specific term (Caper shipped with "set" never defined; two independent groups misplayed for months).
4. **Language** — apply `references/style-rules.md`. Highest-yield checks: `should` anywhere, passive voice in player-facing rules, effect-before-condition, sentences failing the one-breath test.
5. **Reference apparatus** — TOC always; index above ~12 pages; icon key in exactly one findable place; a "commonly missed rules" list (highest value per word in the whole book); a searchable PDF.
6. **Typography and accessibility** — body ≥10pt (12pt preferred), contrast ≥4.5:1, no rules text over art, **nothing coded by colour alone**. Numbers in `references/metrics.md`.

For each finding give: the quoted text, why it fails, and a rewritten line. A critique without a replacement sentence is not useful to a designer on deadline.

## The line-level rules

The full 26 are in `references/style-rules.md`. These decide the most arguments:

- **may** = optional · **may not** = forbidden · **cannot** = impossible · **must** = compelled · **should** = delete it, always.
- **Condition first, effect second.** "If you roll 5 or higher, draw a card." Not the reverse — it lets a player skim for the trigger.
- **gain** = from an unlimited supply · **take** = from a limited supply or another player.
- **when** = once and predictable · **whenever** = repeatable · **if** = may never happen · **at** = a point in time.
- **each** = individually · **every / all** = as a group. This one silently changes scoring.
- **Singular they**, never he/she or (s)he. Use "that player" when "they" is ambiguous.
- **Active voice, addressing the player.** Passive only for universal prohibitions ("Mountain tiles cannot be removed").
- **Capitalise only in-game proper nouns** — components, named actions, named values. Not Every Important Noun.
- **Bold** = keywords at first definition and headings. *Italic* = examples and flavour. Never underline rules text.
- **One action per sentence.** If you cannot read it in one breath, split it.
- **Cross-references cite their target** ("see Connections, p. 34"), never "as mentioned above".
- **Parentheses clarify; they never introduce a rule.**

Treat **"exception"**, **"remember"** and **"should"** as design smells: the fix is often to change the game, not the sentence.

## Process, when the user is planning rather than writing

- Write it, then rewrite twice — the third draft is materially better.
- **Blind playtest**: at least 1, ideally 2–3 for medium-heavy games. No how-to-play videos, no designer intervention except to rescue the session. It is the only reliable detector of missing rules. Budget ~25% of blind playtesting at the rulebook itself.
- **Edit before layout; proofread after layout.** A single pass catches 80–95% of errors, which is exactly why editor and proofreader are two people.
- A **timed look-up test** on the pre-production copy: name a rule, time how long it takes to find. Slow look-up is a structural defect, not a reader failure.
- Read the book **backwards, section by section** as the final QA pass — it defeats autopilot skimming.
- Plan a public living-rules / errata page and a searchable PDF from the start. Reprints are the industry's patch mechanism; a URL is faster.

## Citing examples

Name real books. `references/examples.md` holds 35 praised and 33 criticised rulebooks with the specific reason each is cited. Reach for it whenever a recommendation would otherwise sound like taste — "Gloomhaven's graphical index" and "Robinson Crusoe's first edition" carry more weight with a designer than any principle stated abstractly.

## Deeper background

`references/knowledge-base.md` holds 127 sourced findings across 14 categories (Purpose & Audience, Structure, Teach vs Reference, Language, Terminology, Examples, Layout, Reference, Player Aids, Process, Accessibility, Localization, Failure Modes, Impact). Load the single category you need — do not read the file whole.

## Language

Answer in the language the user is writing in. When drafting Thai rules text, the structural and process guidance transfers unchanged, but the English wording rules do not map one-to-one: Thai has no articles or plural marking, so ambiguity that English resolves with "a/the/each" must be resolved by explicit classifiers and counts instead. Keep game-term capitalisation conventions by **bolding** the term instead, and keep the English keyword in parentheses on first use so players can match it to the components.
