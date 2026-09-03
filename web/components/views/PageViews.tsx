import Link from "next/link";
import { loadJson, type Locale, type Knowledge, type GameEntry, type SourceRow, type CheckItem, type StyleRule, type Metric, type TemplateRow } from "@/lib/content";
import { copy } from "@/lib/pageCopy";
import KnowledgeList from "@/app/principles/KnowledgeList";
import ExamplesView from "@/app/examples/ExamplesView";
import ChecklistView from "@/app/checklist/ChecklistView";
import SourcesTable from "@/app/sources/SourcesTable";

function Header({ eyebrow, title, lede, note }: { eyebrow: string; title: string; lede: string; note?: string }) {
  return (
    <header style={{ maxWidth: "46rem", marginBottom: "2rem" }}>
      <p style={{ color: "var(--accent-2)", fontSize: ".76rem", fontWeight: 650, letterSpacing: ".1em", textTransform: "uppercase", margin: "0 0 .75rem" }}>
        {eyebrow}
      </p>
      <h1 style={{ fontSize: "clamp(1.8rem, 4vw, 2.4rem)", fontWeight: 700, letterSpacing: "-.02em", margin: "0 0 .75rem", lineHeight: 1.2 }}>
        {title}
      </h1>
      <p style={{ color: "var(--ink-2)", margin: note ? "0 0 .5rem" : 0 }}>{lede}</p>
      {note && <p style={{ color: "var(--ink-3)", fontSize: ".85rem", margin: 0 }}>{note}</p>}
    </header>
  );
}

export function PrinciplesView({ locale }: { locale: Locale }) {
  const items = loadJson<Knowledge[]>("knowledge", locale);
  const c = copy(locale).principles;
  return (
    <>
      <Header eyebrow={c.eyebrow} title={c.title(items.length)} lede={c.lede} />
      <KnowledgeList items={items} labels={c.labels} />
    </>
  );
}

export function ExamplesPageView({ locale }: { locale: Locale }) {
  const praised = loadJson<GameEntry[]>("praised", locale);
  const criticised = loadJson<GameEntry[]>("criticised", locale);
  const c = copy(locale).examples;
  return (
    <>
      <Header eyebrow={c.eyebrow} title={c.title(praised.length + criticised.length)} lede={c.lede} note={c.note} />
      <ExamplesView praised={praised} criticised={criticised} labels={c.labels} />
    </>
  );
}

export function ChecklistPageView({ locale }: { locale: Locale }) {
  const c = copy(locale).checklist;
  return (
    <>
      <Header eyebrow={c.eyebrow} title={c.title} lede={c.lede} />
      <ChecklistView
        items={loadJson<CheckItem[]>("checklist", locale)}
        rules={loadJson<StyleRule[]>("styleRules", locale)}
        metrics={loadJson<Metric[]>("metrics", locale)}
        templates={loadJson<TemplateRow[]>("templates", locale)}
        labels={c.labels}
      />
    </>
  );
}

export function SourcesPageView({ locale }: { locale: Locale }) {
  const rows = loadJson<SourceRow[]>("sources", locale);
  const c = copy(locale).sources;
  return (
    <>
      <Header eyebrow={c.eyebrow} title={c.title(rows.length)} lede={c.lede} note={c.note} />
      <SourcesTable rows={rows} labels={c.labels} />
    </>
  );
}

export function DownloadsPageView({ locale }: { locale: Locale }) {
  const c = copy(locale).downloads;
  return (
    <>
      <Header eyebrow={c.eyebrow} title={c.title} lede={c.lede} />
      <div style={{ display: "grid", gap: "1rem", maxWidth: "50rem" }}>
        {c.files.map((f) => (
          <a key={f.href} href={f.href} download className="card" style={{ display: "block", color: "inherit", textDecoration: "none" }}>
            <h2 style={{ fontSize: "1.05rem", fontWeight: 650, margin: "0 0 .25rem", color: "var(--accent-2)" }}>{f.title} ↓</h2>
            <div style={{ fontSize: ".78rem", color: "var(--ink-3)", marginBottom: ".6rem" }}>{f.sub}</div>
            <p style={{ fontSize: ".88rem", color: "var(--ink-2)", margin: 0 }}>{f.desc}</p>
          </a>
        ))}
      </div>
      <section className="card" style={{ marginTop: "2.5rem", maxWidth: "50rem" }}>
        <h2 style={{ fontSize: "1rem", fontWeight: 650, margin: "0 0 .6rem" }}>{c.reuseTitle}</h2>
        <p style={{ fontSize: ".86rem", color: "var(--ink-2)", margin: "0 0 .5rem" }}>
          {c.reuseA.split("Board Game Editing Style Guide")[0]}
          <a href="https://cur.by/styleguide">Board Game Editing Style Guide</a>
          {c.reuseA.split("Board Game Editing Style Guide")[1]}
        </p>
        <p style={{ fontSize: ".86rem", color: "var(--ink-2)", margin: 0 }}>{c.reuseB}</p>
      </section>
      {locale === "th" && (
        <p style={{ marginTop: "1.5rem", fontSize: ".85rem", color: "var(--ink-3)" }}>
          อยากอ่านบนเว็บแทน? <Link href="/th/handbook">คู่มือฉบับเต็ม</Link> · <Link href="/th/ebook">ฉบับเล่าสู่กันฟัง</Link>
        </p>
      )}
    </>
  );
}
