import { renderMarkdown } from "@/lib/content";
import TocSidebar from "@/components/TocSidebar";

export const metadata = {
  title: "เขียน Rulebook ให้คนอยากอ่าน",
  description: "คู่มือเขียน rulebook บอร์ดเกม ฉบับภาษาไทย เรียบเรียงจาก 106 แหล่งข้อมูล",
};

export default function ThaiPage() {
  const { html, headings } = renderMarkdown("ebook-th.md");
  return (
    <>
      <header style={{ maxWidth: "46rem", marginBottom: "2.5rem" }}>
        <p style={{ color: "var(--accent-2)", fontSize: ".76rem", fontWeight: 650, letterSpacing: ".1em", textTransform: "uppercase", margin: "0 0 .75rem" }}>
          ฉบับภาษาไทย
        </p>
        <h1 style={{ fontSize: "clamp(1.8rem, 4vw, 2.6rem)", fontWeight: 700, letterSpacing: "-.01em", lineHeight: 1.2, margin: "0 0 .75rem" }}>
          เขียน Rulebook ให้คนอยากอ่าน
        </h1>
        <p style={{ color: "var(--ink-2)", fontSize: "1.02rem", margin: 0 }}>
          บันทึกจากการอ่านฟอรั่มบอร์ดเกม บล็อกนักออกแบบ และ style guide ของสำนักพิมพ์ รวม 106 แหล่ง
          แล้วเรียบเรียงใหม่เป็นภาษาคน — สำหรับนักออกแบบทั้งมือใหม่และมือเก๋า
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
