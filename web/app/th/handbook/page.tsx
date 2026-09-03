import { renderMarkdown } from "@/lib/content";
import TocSidebar from "@/components/TocSidebar";

export const metadata = {
  title: "วิธีสร้าง Rulebook ที่ดี",
  description: "คู่มือฉบับเต็มสำหรับนักออกแบบบอร์ดเกม เจ็ดภาค สังเคราะห์จากแหล่งข้อมูล 106 แหล่ง",
};

export default function Page() {
  const { html, headings } = renderMarkdown("handbook-th.md");
  return (
    <>
      <header style={{ maxWidth: "46rem", marginBottom: "2.5rem" }}>
        <p style={{ color: "var(--accent-2)", fontSize: ".76rem", fontWeight: 650, letterSpacing: ".1em", textTransform: "uppercase", margin: "0 0 .75rem" }}>
          คู่มือฉบับเต็ม
        </p>
        <h1 style={{ fontSize: "clamp(1.8rem, 4vw, 2.6rem)", fontWeight: 700, letterSpacing: "-.01em", lineHeight: 1.2, margin: "0 0 .75rem" }}>
          วิธีสร้าง Rulebook ที่ดี
        </h1>
        <p style={{ color: "var(--ink-2)", fontSize: "1.02rem", margin: 0 }}>
          คู่มือสำหรับนักออกแบบบอร์ดเกม เจ็ดภาค ครอบคลุมพื้นฐาน สถาปัตยกรรม งานฝีมือ การผลิต กระบวนการ หลักฐาน
          และ template ที่ใช้ได้ทันที
        </p>
      </header>
      <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr)", gap: "2.5rem" }} className="handbook-grid">
        <div className="prose" dangerouslySetInnerHTML={{ __html: html }} />
        <aside className="handbook-toc"><TocSidebar headings={headings} /></aside>
      </div>
      <style>{`
        @media (min-width: 1080px) { .handbook-grid { grid-template-columns: minmax(0,1fr) 15rem !important; } .handbook-toc { order: 2; } }
        @media (max-width: 1079px) { .handbook-toc { display: none; } }
      `}</style>
    </>
  );
}
