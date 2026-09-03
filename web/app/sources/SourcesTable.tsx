"use client";
import { useCallback } from "react";
import type { SourceRow } from "@/lib/content";
import { SearchBox, Chips, useFilter } from "@/components/Filterable";
import { fmt } from "@/lib/fmt";

type L = { search: string; showing: string; none: string; open: string; head: readonly string[] };

export default function SourcesTable({ rows, labels }: { rows: SourceRow[]; labels: L }) {
  const fields = useCallback((r: SourceRow) => [r.title, r.url, r.type, r.years], []);
  const categoryOf = useCallback((r: SourceRow) => r.type, []);
  const { q, setQ, cat, setCat, categories, filtered } = useFilter(rows, fields, categoryOf);

  return (
    <>
      <div style={{ display: "grid", gap: ".9rem", marginBottom: "1.5rem" }}>
        <SearchBox value={q} onChange={setQ} placeholder={labels.search} />
        <Chips options={categories} active={cat} onToggle={setCat} />
        <p style={{ fontSize: ".8rem", color: "var(--ink-3)", margin: 0 }}>
          {fmt(labels.showing, filtered.length, rows.length)}
        </p>
      </div>

      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: ".85rem", minWidth: 680 }}>
          <thead>
            <tr>
              {labels.head.map((h) => (
                <th key={h} style={{ background: "var(--accent)", color: "#fff", textAlign: "left", padding: ".55rem .7rem", fontWeight: 600, whiteSpace: "nowrap" }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((r) => (
              <tr key={r.id}>
                <td style={{ padding: ".5rem .7rem", border: "1px solid var(--border)", color: "var(--ink-3)", fontFamily: "ui-monospace, monospace", fontSize: ".75rem", whiteSpace: "nowrap" }}>
                  {r.id}
                </td>
                <td style={{ padding: ".5rem .7rem", border: "1px solid var(--border)", color: "var(--ink-3)", fontSize: ".78rem", whiteSpace: "nowrap" }}>{r.type}</td>
                <td style={{ padding: ".5rem .7rem", border: "1px solid var(--border)", color: "var(--ink)" }}>{r.title}</td>
                <td style={{ padding: ".5rem .7rem", border: "1px solid var(--border)", color: "var(--ink-3)", fontSize: ".78rem", whiteSpace: "nowrap" }}>{r.years || "—"}</td>
                <td style={{ padding: ".5rem .7rem", border: "1px solid var(--border)", whiteSpace: "nowrap" }}>
                  <a href={r.url} target="_blank" rel="noreferrer">{labels.open}</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {filtered.length === 0 && <p style={{ color: "var(--ink-3)", marginTop: "1rem" }}>{labels.none}</p>}
    </>
  );
}
