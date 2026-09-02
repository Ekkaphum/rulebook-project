"use client";
import { useEffect, useMemo, useState } from "react";
import type { CheckItem, StyleRule, Metric, TemplateRow } from "@/lib/content";

const KEY = "rulebook-checklist-v1";

export default function ChecklistView({
  items, rules, metrics, templates,
}: { items: CheckItem[]; rules: StyleRule[]; metrics: Metric[]; templates: TemplateRow[] }) {
  const [done, setDone] = useState<Record<string, boolean>>({});
  const [tab, setTab] = useState<"checklist" | "style" | "metrics" | "templates">("checklist");

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setDone(JSON.parse(raw));
    } catch { /* private mode, blocked storage — proceed with empty state */ }
  }, []);

  const toggle = (k: string) => {
    setDone((prev) => {
      const next = { ...prev, [k]: !prev[k] };
      try { localStorage.setItem(KEY, JSON.stringify(next)); } catch { /* ignore */ }
      return next;
    });
  };

  const reset = () => {
    setDone({});
    try { localStorage.removeItem(KEY); } catch { /* ignore */ }
  };

  const phases = useMemo(() => {
    const m = new Map<string, CheckItem[]>();
    items.forEach((i) => {
      if (!m.has(i.phase)) m.set(i.phase, []);
      m.get(i.phase)!.push(i);
    });
    return Array.from(m.entries());
  }, [items]);

  const total = items.length;
  const count = items.filter((i) => done[i.item]).length;

  return (
    <>
      <div style={{ display: "flex", gap: ".4rem", flexWrap: "wrap", marginBottom: "1.75rem" }}>
        {([
          ["checklist", "Checklist"],
          ["style", `Style rules (${rules.length})`],
          ["metrics", `Numbers (${metrics.length})`],
          ["templates", `Section templates (${templates.length})`],
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

      {tab === "checklist" && (
        <>
          <div className="card" style={{ marginBottom: "1.75rem", display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
            <div style={{ flex: "1 1 14rem" }}>
              <div style={{ fontSize: ".82rem", color: "var(--ink-3)", marginBottom: ".4rem" }}>
                {count} of {total} complete
              </div>
              <div style={{ height: 8, background: "var(--border)", borderRadius: 999, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${(count / total) * 100}%`, background: "var(--accent-2)", transition: "width .2s" }} />
              </div>
            </div>
            <button
              onClick={reset}
              style={{ border: "1px solid var(--border)", background: "transparent", color: "var(--ink-2)", padding: ".4rem .8rem", borderRadius: 8, fontSize: ".82rem", cursor: "pointer" }}
            >
              Reset
            </button>
          </div>

          <div style={{ display: "grid", gap: "2rem" }}>
            {phases.map(([phase, list]) => (
              <section key={phase}>
                <h2 style={{ fontSize: "1.05rem", fontWeight: 650, margin: "0 0 .9rem", color: "var(--accent-2)" }}>{phase}</h2>
                <div style={{ display: "grid", gap: ".55rem" }}>
                  {list.map((i) => (
                    <label
                      key={i.item}
                      className="card"
                      style={{
                        display: "flex", gap: ".75rem", cursor: "pointer", alignItems: "flex-start",
                        padding: ".8rem 1rem", opacity: done[i.item] ? 0.6 : 1,
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={!!done[i.item]}
                        onChange={() => toggle(i.item)}
                        style={{ marginTop: ".25rem", width: 16, height: 16, accentColor: "var(--accent-2)", flexShrink: 0 }}
                      />
                      <span>
                        <span style={{ display: "block", fontSize: ".9rem", color: "var(--ink)", textDecoration: done[i.item] ? "line-through" : "none" }}>
                          {i.item}
                        </span>
                        <span style={{ display: "block", fontSize: ".8rem", color: "var(--ink-3)", marginTop: ".25rem" }}>{i.why}</span>
                      </span>
                    </label>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </>
      )}

      {tab === "style" && (
        <div style={{ display: "grid", gap: ".9rem" }}>
          {rules.map((r) => (
            <article key={r.rule} className="card">
              <div style={{ fontSize: ".72rem", fontWeight: 700, color: "var(--accent-2)", letterSpacing: ".06em", textTransform: "uppercase", marginBottom: ".4rem" }}>
                {r.area}
              </div>
              <p style={{ fontSize: ".95rem", fontWeight: 600, color: "var(--ink)", margin: "0 0 .75rem" }}>{r.rule}</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: ".7rem", marginBottom: ".7rem" }}>
                <div style={{ background: "var(--good-bg)", borderRadius: 6, padding: ".55rem .75rem" }}>
                  <div style={{ fontSize: ".7rem", fontWeight: 700, color: "var(--good)", marginBottom: ".25rem" }}>DO</div>
                  <div style={{ fontSize: ".84rem", color: "var(--ink-2)" }}>{r.do}</div>
                </div>
                <div style={{ background: "var(--bad-bg)", borderRadius: 6, padding: ".55rem .75rem" }}>
                  <div style={{ fontSize: ".7rem", fontWeight: 700, color: "var(--bad)", marginBottom: ".25rem" }}>DON’T</div>
                  <div style={{ fontSize: ".84rem", color: "var(--ink-2)" }}>{r.dont}</div>
                </div>
              </div>
              <p style={{ fontSize: ".76rem", color: "var(--ink-3)", margin: 0 }}>
                {r.url ? <a href={r.url} target="_blank" rel="noreferrer">{r.source}</a> : r.source}
              </p>
            </article>
          ))}
        </div>
      )}

      {tab === "metrics" && (
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: ".87rem", minWidth: 640 }}>
            <thead>
              <tr>
                {["Metric", "Value", "Context", "Source"].map((h) => (
                  <th key={h} style={{ background: "var(--accent)", color: "#fff", textAlign: "left", padding: ".6rem .75rem", fontWeight: 600 }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {metrics.map((m) => (
                <tr key={m.metric}>
                  <td style={{ padding: ".6rem .75rem", border: "1px solid var(--border)", color: "var(--ink)", fontWeight: 500 }}>{m.metric}</td>
                  <td style={{ padding: ".6rem .75rem", border: "1px solid var(--border)", color: "var(--accent-2)", fontWeight: 600 }}>{m.value}</td>
                  <td style={{ padding: ".6rem .75rem", border: "1px solid var(--border)", color: "var(--ink-2)" }}>{m.context}</td>
                  <td style={{ padding: ".6rem .75rem", border: "1px solid var(--border)", color: "var(--ink-3)", fontSize: ".8rem" }}>
                    {m.url ? <a href={m.url} target="_blank" rel="noreferrer">{m.source}</a> : m.source}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === "templates" && (
        <>
          <p style={{ color: "var(--ink-3)", fontSize: ".86rem", margin: "0 0 1.5rem", maxWidth: "42rem" }}>
            Ten section orders from ten independent authorities. They differ at the edges and agree almost perfectly
            in the middle — note how many put the goal before the details, and how few open with setup.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1rem" }}>
            {templates.map((t) => (
              <article key={t.source} className="card">
                <h3 style={{ fontSize: ".92rem", fontWeight: 650, margin: "0 0 .7rem", color: "var(--accent-2)" }}>{t.source}</h3>
                <ol style={{ margin: 0, paddingLeft: "1.15rem", fontSize: ".84rem", color: "var(--ink-2)", display: "grid", gap: ".2rem" }}>
                  {t.sections.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ol>
              </article>
            ))}
          </div>
        </>
      )}
    </>
  );
}
