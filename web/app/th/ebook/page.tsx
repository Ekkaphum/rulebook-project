import { renderMarkdown } from "@/lib/content";
import TocSidebar from "@/components/TocSidebar";
import Image from "next/image";

export const metadata = {
  title: "เขียน Rulebook ให้คนอยากอ่าน",
  description: "คู่มือเขียน rulebook บอร์ดเกม ฉบับเล่าสู่กันฟัง เรียบเรียงจาก 106 แหล่งข้อมูล",
};

export default function Page() {
  const { html, headings } = renderMarkdown("ebook-th.md", "th");
  return (
    <div className="ebook-page">
      <header className="ebook-intro">
        <p className="ebook-kicker">
          ฉบับเล่าสู่กันฟัง
        </p>
        <h1>
          เขียน Rulebook ให้คนอยากอ่าน
        </h1>
        <p className="ebook-deck">
          บันทึกจากการอ่านฟอรั่มบอร์ดเกม บล็อกนักออกแบบ และ style guide ของสำนักพิมพ์ รวม 106 แหล่ง
          แล้วเรียบเรียงใหม่เป็นภาษาคน — เขียนแบบไม่เป็นทางการ เหมือนแชร์ความรู้กันมากกว่าเป็นตำรา
        </p>
      </header>
      <figure className="ebook-hero">
        <Image
          src="/images/ebook/reading-together.jpg"
          alt="เพื่อนเปิดคู่มือบอร์ดเกมและช่วยกันเรียนรู้วิธีเล่นรอบโต๊ะ"
          width={1536}
          height={1024}
          priority
        />
        <figcaption>คู่มือที่ดีทำให้โต๊ะเริ่มเล่นได้ แม้คนเขียนจะไม่ได้นั่งอยู่ด้วย</figcaption>
      </figure>
      <div className="ebook-grid">
        <article className="prose ebook-prose" dangerouslySetInnerHTML={{ __html: html }} />
        <aside className="handbook-toc"><TocSidebar headings={headings} /></aside>
      </div>
    </div>
  );
}
