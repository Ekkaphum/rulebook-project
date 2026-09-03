"use client";
import { useCallback, useState } from "react";
import type { GameEntry } from "@/lib/content";
import { SearchBox } from "@/components/Filterable";

function Card({ e, tone }: { e: GameEntry; tone: "good" | "bad" }) {
  const color = tone === "good" ? "var(--good)" : "var(--bad)";
  const bg = tone === "good" ? "var(--good-bg)" : "var(--bad-bg)";
  return (
    <article className="card" style={{ borderLeft: `3px solid ${color}` }}>
      <h3 style={{ fontSize: ".98rem", fontWeight: 650, margin: "0 0 .4rem", lineHeight: 1.35 }}>{e.game}</h3>
      <span
        style={{
          display: "inline-block", fontSize: ".72rem", fontWeight: 600, color,
          background: bg, borderRadius: 999, padding: ".12rem .6rem", marginBottom: ".6rem",
        }}
      >
        {e.aspect}
      </span>
      <p style={{ fontSize: ".875rem", color: "var(--ink-2)", margin: "0 0 .65rem" }}>{e.detail}</p>
      <p style={{ fontSize: ".76rem", color: "var(--ink-3)", margin: 0 }}>
        {e.url ? (
          <a href={e.url} target="_blank" rel="noreferrer">
            {e.source}
          </a>
        ) : (
          e.source
        )}
      </p>
    </article>
  );
}

type L = { search: string; both: string; good: string; bad: string; goodTitle: string; goodSub: string; badTitle: string; badSub: string; none: string };

export default function ExamplesView({ praised, criticised, labels }: { praised: GameEntry[]; criticised: GameEntry[]; labels: L }) {
  const [q, setQ] = useState("");
  const [tab, setTab] = useState<"both" | "good" | "bad">("both");

  const match = useCallback(
    (e: GameEntry) => {
      const n = q.trim().toLowerCase();
      if (!n) return true;
      return [e.game, e.aspect, e.detail, e.source].some((f) => f.toLowerCase().includes(n));
    },
    [q]
  );

  const g = praised.filter(match);
  const b = criticised.filter(match);

  return (
    <>
      <div style={{ display: "grid", gap: ".9rem", marginBottom: "2rem" }}>
        <SearchBox value={q} onChange={setQ} placeholder={labels.search} />
        <div style={{ display: "flex", gap: ".4rem", flexWrap: "wrap" }}>
          {([
            ["both", `${labels.both} (${g.length + b.length})`],
            ["good", `${labels.good} (${g.length})`],
            ["bad", `${labels.bad} (${b.length})`],
          ] as const).map(([k, label]) => (
            <button
              key={k}
              onClick={() => setTab(k)}
              style={{
                padding: ".35rem .8rem", borderRadius: 999, fontSize: ".82rem", cursor: "pointer",
                border: "1px solid var(--border)",
                background: tab === k ? "var(--accent)" : "transparent",
                color: tab === k ? "#fff" : "var(--ink-2)",
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {(tab === "both" || tab === "good") && (
        <section style={{ marginBottom: "3rem" }}>
          <h2 style={{ fontSize: "1.3rem", fontWeight: 650, margin: "0 0 .4rem", color: "var(--good)" }}>{labels.goodTitle}</h2>
          <p style={{ color: "var(--ink-3)", fontSize: ".86rem", margin: "0 0 1.25rem" }}>
            {labels.goodSub}
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1rem" }}>
            {g.map((e) => (
              <Card key={e.game + e.aspect} e={e} tone="good" />
            ))}
          </div>
        </section>
      )}

      {(tab === "both" || tab === "bad") && (
        <section>
          <h2 style={{ fontSize: "1.3rem", fontWeight: 650, margin: "0 0 .4rem", color: "var(--bad)" }}>{labels.badTitle}</h2>
          <p style={{ color: "var(--ink-3)", fontSize: ".86rem", margin: "0 0 1.25rem" }}>
            {labels.badSub}
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1rem" }}>
            {b.map((e) => (
              <Card key={e.game + e.aspect} e={e} tone="bad" />
            ))}
          </div>
        </section>
      )}

      {g.length + b.length === 0 && <p style={{ color: "var(--ink-3)" }}>{labels.none}</p>}
    </>
  );
}
