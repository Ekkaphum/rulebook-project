import { renderMarkdown } from "@/lib/content";
import TocSidebar from "@/components/TocSidebar";

export const metadata = {
  title: "How to Create a Good Rulebook",
  description: "A practitioner's handbook for board game designers, synthesised from 106 primary sources.",
};

export default function HandbookPage() {
  const { html, headings } = renderMarkdown("handbook.md");
  return (
    <>
      <header style={{ maxWidth: "46rem", marginBottom: "2.5rem" }}>
        <p style={{ color: "var(--accent-2)", fontSize: ".76rem", fontWeight: 650, letterSpacing: ".1em", textTransform: "uppercase", margin: "0 0 .75rem" }}>
          The handbook
        </p>
        <h1 style={{ fontSize: "clamp(1.8rem, 4vw, 2.6rem)", fontWeight: 700, letterSpacing: "-.02em", lineHeight: 1.15, margin: "0 0 .75rem" }}>
          How to Create a Good Rulebook
        </h1>
        <p style={{ color: "var(--ink-2)", fontSize: "1.02rem", margin: 0 }}>
          A practitioner’s handbook for board game designers. Seven parts, roughly 17,000 words — foundations,
          architecture, craft, production, process, evidence, and ready-to-use templates.
        </p>
      </header>
      <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr)", gap: "2.5rem" }} className="handbook-grid">
        <div className="prose" dangerouslySetInnerHTML={{ __html: html }} />
        <aside className="handbook-toc">
          <TocSidebar headings={headings} />
        </aside>
      </div>
      <style>{`
        @media (min-width: 1080px) {
          .handbook-grid { grid-template-columns: minmax(0,1fr) 15rem !important; }
          .handbook-toc { order: 2; }
        }
        @media (max-width: 1079px) { .handbook-toc { display: none; } }
      `}</style>
    </>
  );
}
