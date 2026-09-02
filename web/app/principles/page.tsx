import { loadJson, type Knowledge } from "@/lib/content";
import KnowledgeList from "./KnowledgeList";

export const metadata = {
  title: "All findings",
  description: "127 researched findings on board game rulebook design, each with a source link.",
};

export default function PrinciplesPage() {
  const knowledge = loadJson<Knowledge[]>("knowledge");
  return (
    <>
      <header style={{ maxWidth: "46rem", marginBottom: "2rem" }}>
        <p style={{ color: "var(--accent-2)", fontSize: ".76rem", fontWeight: 650, letterSpacing: ".1em", textTransform: "uppercase", margin: "0 0 .75rem" }}>
          The research database
        </p>
        <h1 style={{ fontSize: "clamp(1.8rem, 4vw, 2.4rem)", fontWeight: 700, letterSpacing: "-.02em", margin: "0 0 .75rem" }}>
          {knowledge.length} findings
        </h1>
        <p style={{ color: "var(--ink-2)", margin: 0 }}>
          Every entry carries a principle, the reasoning behind it, a piece of supporting evidence, and a link to the
          source it came from. Filter by category or search the full text.
        </p>
      </header>
      <KnowledgeList items={knowledge} />
    </>
  );
}
