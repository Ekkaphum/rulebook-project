import Link from "next/link";
import { loadJson, type Knowledge, type GameEntry, type SourceRow } from "@/lib/content";

const PILLARS = [
  { n: "01", t: "State the goal before the rules", d: "Readers who know the objective can attach every later rule to a purpose. “The goal is the game.”" },
  { n: "02", t: "Never use a term before you define it", d: "The single most-cited reader irritation across fifteen years of forum threads." },
  { n: "03", t: "One concept, one word, forever", d: "The instinct to vary your wording is exactly wrong here. Synonyms make readers hunt for differences that don’t exist." },
  { n: "04", t: "Conditions before effects", d: "“If you roll a 5 or higher, draw a card” — skimmers can skip effects whose condition isn’t met, and misplay less." },
  { n: "05", t: "Examples resolve ambiguity, not the obvious", d: "Don’t illustrate the move everyone already understood. Illustrate the one that will otherwise become a forum thread." },
  { n: "06", t: "Never hide a rule in an example", d: "Re-readers skip examples by design. A rule placed there is invisible on every read after the first." },
  { n: "07", t: "Put rules where a confused player will look", d: "Organisation is a retrieval problem, not only a teaching one. Time the look-up, not just the read." },
  { n: "08", t: "Blind test — and do not help them", d: "Intervening trains testers to look at you instead of the page, and destroys the data you came for." },
];

export default function Home() {
  const knowledge = loadJson<Knowledge[]>("knowledge");
  const praised = loadJson<GameEntry[]>("praised");
  const criticised = loadJson<GameEntry[]>("criticised");
  const sources = loadJson<SourceRow[]>("sources");
  const categories = Array.from(new Set(knowledge.map((k) => k.category)));

  const stats = [
    { n: sources.length, l: "primary sources" },
    { n: knowledge.length, l: "findings, each with a citation" },
    { n: praised.length + criticised.length, l: "rulebooks studied" },
    { n: categories.length, l: "topic areas" },
  ];

  return (
    <>
      <section style={{ maxWidth: "44rem", paddingTop: "1.5rem" }}>
        <p style={{ color: "var(--accent-2)", fontSize: ".78rem", fontWeight: 650, letterSpacing: ".1em", textTransform: "uppercase", margin: "0 0 1rem" }}>
          Board game rulebooks
        </p>
        <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.1rem)", lineHeight: 1.1, fontWeight: 700, letterSpacing: "-.02em", margin: "0 0 1.25rem" }}>
          How to write rules people can actually use
        </h1>
        <p style={{ fontSize: "1.1rem", color: "var(--ink-2)", margin: "0 0 1rem" }}>
          Everyone complains about rulebooks. Almost nobody teaches how to write one. This is an attempt at the
          second thing — a handbook synthesised from {sources.length} primary sources, with every claim linked
          back to where it came from.
        </p>
        <blockquote
          style={{
            margin: "1.75rem 0", padding: ".9rem 1.15rem", borderLeft: "3px solid var(--accent)",
            background: "var(--surface)", borderRadius: "0 6px 6px 0", color: "var(--ink)",
          }}
        >
          “If someone can’t learn the game, they won’t play the game.”
          <br />
          <span style={{ color: "var(--ink-3)", fontSize: ".85rem" }}>
            — Michael “Curby” Lee, <a href="https://cur.by/styleguide">Board Game Editing Style Guide</a>
          </span>
        </blockquote>
        <div style={{ display: "flex", gap: ".7rem", flexWrap: "wrap", marginTop: "1.5rem" }}>
          <Link
            href="/handbook"
            style={{ background: "var(--accent)", color: "#fff", padding: ".7rem 1.3rem", borderRadius: 8, fontWeight: 600, fontSize: ".92rem" }}
          >
            Read the handbook
          </Link>
          <Link
            href="/checklist"
            style={{ border: "1px solid var(--border)", color: "var(--ink)", padding: ".7rem 1.3rem", borderRadius: 8, fontWeight: 600, fontSize: ".92rem" }}
          >
            Pre-print checklist
          </Link>
          <Link
            href="/downloads"
            style={{ border: "1px solid var(--border)", color: "var(--ink)", padding: ".7rem 1.3rem", borderRadius: 8, fontWeight: 600, fontSize: ".92rem" }}
          >
            Download everything
          </Link>
        </div>
      </section>

      <section
        style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
          gap: "1px", background: "var(--border)", border: "1px solid var(--border)",
          borderRadius: 10, overflow: "hidden", margin: "3.5rem 0",
        }}
      >
        {stats.map((s) => (
          <div key={s.l} style={{ background: "var(--bg)", padding: "1.25rem 1.1rem" }}>
            <div style={{ fontSize: "2rem", fontWeight: 700, color: "var(--accent-2)", lineHeight: 1 }}>{s.n}</div>
            <div style={{ fontSize: ".8rem", color: "var(--ink-3)", marginTop: ".35rem" }}>{s.l}</div>
          </div>
        ))}
      </section>

      <section style={{ margin: "3.5rem 0" }}>
        <h2 style={{ fontSize: "1.5rem", fontWeight: 650, margin: "0 0 .5rem" }}>Eight things that matter most</h2>
        <p style={{ color: "var(--ink-3)", margin: "0 0 1.75rem", maxWidth: "42rem" }}>
          Distilled from the full set of {knowledge.length} findings. Each links into the chapter that explains it.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(270px, 1fr))", gap: "1rem" }}>
          {PILLARS.map((p) => (
            <div key={p.n} className="card">
              <div style={{ color: "var(--accent-2)", fontSize: ".72rem", fontWeight: 700, letterSpacing: ".08em", marginBottom: ".4rem" }}>{p.n}</div>
              <h3 style={{ fontSize: ".98rem", fontWeight: 650, margin: "0 0 .4rem", lineHeight: 1.35 }}>{p.t}</h3>
              <p style={{ fontSize: ".86rem", color: "var(--ink-2)", margin: 0 }}>{p.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ margin: "3.5rem 0" }}>
        <h2 style={{ fontSize: "1.5rem", fontWeight: 650, margin: "0 0 1.5rem" }}>Where to start</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1rem" }}>
          {[
            { href: "/handbook", t: "The handbook", d: "17,000 words across seven parts: foundations, architecture, craft, production, process, evidence and templates." },
            { href: "/principles", t: `All ${knowledge.length} findings`, d: "The full research database, filterable by category and searchable, with a source link on every row." },
            { href: "/examples", t: `${praised.length + criticised.length} real rulebooks`, d: "What the community praises and what it condemns — named games, specific reasons, linked sources." },
            { href: "/checklist", t: "Pre-print checklist", d: "46 checks across 8 phases, from content completeness to handover. Your progress is saved in your browser." },
            { href: "/sources", t: "Every source", d: `All ${sources.length} documents harvested for this project, with clickable URLs.` },
            { href: "/thai", t: "ฉบับภาษาไทย", d: "เวอร์ชันภาษาไทย เขียนแบบไม่เป็นทางการ สำหรับนักออกแบบมือใหม่และมือเก๋า" },
          ].map((c) => (
            <Link key={c.href} href={c.href} className="card" style={{ display: "block", color: "inherit", textDecoration: "none" }}>
              <h3 style={{ fontSize: "1rem", fontWeight: 650, margin: "0 0 .4rem", color: "var(--accent-2)" }}>{c.t} →</h3>
              <p style={{ fontSize: ".86rem", color: "var(--ink-2)", margin: 0 }}>{c.d}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="card" style={{ margin: "3.5rem 0", maxWidth: "48rem" }}>
        <h2 style={{ fontSize: "1.05rem", fontWeight: 650, margin: "0 0 .6rem" }}>Scope, honestly stated</h2>
        <p style={{ fontSize: ".88rem", color: "var(--ink-2)", margin: "0 0 .6rem" }}>
          This is targeted research, not an exhaustive crawl. BoardGameGeek hosts millions of posts and offers no bulk
          export, so threads were selected by relevance across roughly 2007–2026, weighted towards 2019–2026. Reddit
          could not be included — it blocks automated access.
        </p>
        <p style={{ fontSize: ".88rem", color: "var(--ink-2)", margin: 0 }}>
          Community opinion is opinion. Several games appear in both the praised and the criticised lists, because
          experienced people disagree about them. Nothing here is a verdict; everything here is attributed.
        </p>
      </section>
    </>
  );
}
