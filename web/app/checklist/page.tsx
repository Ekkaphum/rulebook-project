import { loadJson, type CheckItem, type StyleRule, type Metric, type TemplateRow } from "@/lib/content";
import ChecklistView from "./ChecklistView";

export const metadata = {
  title: "Pre-print checklist",
  description: "A 46-item pre-print QA checklist for board game rulebooks, across 8 phases.",
};

export default function ChecklistPage() {
  return (
    <>
      <header style={{ maxWidth: "46rem", marginBottom: "2rem" }}>
        <p style={{ color: "var(--accent-2)", fontSize: ".76rem", fontWeight: 650, letterSpacing: ".1em", textTransform: "uppercase", margin: "0 0 .75rem" }}>
          Tools
        </p>
        <h1 style={{ fontSize: "clamp(1.8rem, 4vw, 2.4rem)", fontWeight: 700, letterSpacing: "-.02em", margin: "0 0 .75rem" }}>
          Pre-print checklist
        </h1>
        <p style={{ color: "var(--ink-2)", margin: 0 }}>
          46 checks across 8 phases, each with the reason it exists. Tick things off as you go — your progress is
          stored in this browser only, and never leaves your machine.
        </p>
      </header>
      <ChecklistView
        items={loadJson<CheckItem[]>("checklist")}
        rules={loadJson<StyleRule[]>("styleRules")}
        metrics={loadJson<Metric[]>("metrics")}
        templates={loadJson<TemplateRow[]>("templates")}
      />
    </>
  );
}
