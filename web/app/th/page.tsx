import Link from "next/link";
import { loadJson, type Knowledge, type GameEntry, type SourceRow } from "@/lib/content";

export const metadata = {
  title: "เขียนกฎบอร์ดเกมให้คนใช้งานได้จริง",
  description: "คู่มือเรื่องการเขียน rulebook บอร์ดเกม สังเคราะห์จากแหล่งข้อมูลปฐมภูมิ 106 แหล่ง พร้อมลิงก์แหล่งที่มาทุกข้อความ",
};

const PILLARS = [
  { n: "01", t: "บอกเป้าหมายก่อนบอกกฎ", d: "ผู้อ่านที่รู้เป้าหมายจะผูกกฎทุกข้อเข้ากับจุดประสงค์ได้ “เป้าหมายคือตัวเกม”" },
  { n: "02", t: "ห้ามใช้คำก่อนนิยามคำนั้น", d: "สิ่งที่ผู้อ่านบ่นบ่อยที่สุดตลอดสิบห้าปีของเธรดในฟอรั่ม" },
  { n: "03", t: "หนึ่งแนวคิด หนึ่งคำ ตลอดไป", d: "สัญชาตญาณที่บอกให้เปลี่ยนคำอย่าให้ซ้ำ ผิดสนิทในงานนี้ คำพ้องบังคับให้คนค้นหาความต่างที่ไม่มีอยู่จริง" },
  { n: "04", t: "เงื่อนไขมาก่อนผลลัพธ์", d: "“ถ้าคุณทอยได้ 5 ขึ้นไป จั่วการ์ด” — คนอ่านผ่านๆ ข้ามผลที่เงื่อนไขไม่เข้าได้ และทำผิดจังหวะน้อยลง" },
  { n: "05", t: "ตัวอย่างมีไว้แก้ความกำกวม", d: "อย่าแสดงการเล่นที่ทุกคนเข้าใจอยู่แล้ว ให้แสดงอันที่ไม่งั้นจะกลายเป็นกระทู้ในฟอรั่ม" },
  { n: "06", t: "ห้ามซ่อนกฎในตัวอย่าง", d: "คนอ่านซ้ำข้ามตัวอย่างโดยธรรมชาติ กฎที่วางไว้ตรงนั้นจึงล่องหนทุกรอบหลังรอบแรก" },
  { n: "07", t: "วางกฎไว้ที่คนงงจะเปิดหา", d: "การจัดโครงสร้างคือปัญหาการค้นหา ไม่ใช่แค่การสอน จับเวลาการเปิดหา ไม่ใช่แค่การอ่าน" },
  { n: "08", t: "Blind test — แล้วห้ามช่วยเขา", d: "การเข้าไปแทรกฝึกให้ผู้ทดสอบมองหน้าคุณแทนกระดาษ และทำลายข้อมูลที่คุณมาเก็บ" },
];

export default function Page() {
  const knowledge = loadJson<Knowledge[]>("knowledge", "th");
  const praised = loadJson<GameEntry[]>("praised", "th");
  const criticised = loadJson<GameEntry[]>("criticised", "th");
  const sources = loadJson<SourceRow[]>("sources", "th");
  const categories = Array.from(new Set(knowledge.map((k) => k.category)));

  const stats = [
    { n: sources.length, l: "แหล่งข้อมูลปฐมภูมิ" },
    { n: knowledge.length, l: "องค์ความรู้ พร้อมการอ้างอิง" },
    { n: praised.length + criticised.length, l: "rulebook ที่ศึกษา" },
    { n: categories.length, l: "หมวดหัวข้อ" },
  ];

  return (
    <>
      <section style={{ maxWidth: "44rem", paddingTop: "1.5rem" }}>
        <p style={{ color: "var(--accent-2)", fontSize: ".78rem", fontWeight: 650, letterSpacing: ".1em", textTransform: "uppercase", margin: "0 0 1rem" }}>
          rulebook บอร์ดเกม
        </p>
        <h1 style={{ fontSize: "clamp(1.9rem, 5vw, 3rem)", lineHeight: 1.2, fontWeight: 700, letterSpacing: "-.01em", margin: "0 0 1.25rem" }}>
          เขียนกฎให้คนใช้งานได้จริง
        </h1>
        <p style={{ fontSize: "1.08rem", color: "var(--ink-2)", margin: "0 0 1rem" }}>
          ทุกคนบ่นเรื่อง rulebook แต่แทบไม่มีใครสอนว่าเขียนยังไง นี่คือความพยายามทำอย่างหลัง — คู่มือที่สังเคราะห์จาก
          แหล่งข้อมูลปฐมภูมิ {sources.length} แหล่ง โดยทุกข้อความมีลิงก์กลับไปหาต้นทาง
        </p>
        <blockquote
          style={{
            margin: "1.75rem 0", padding: ".9rem 1.15rem", borderLeft: "3px solid var(--accent)",
            background: "var(--surface)", borderRadius: "0 6px 6px 0", color: "var(--ink)",
          }}
        >
          “ถ้าใครสักคนเรียนเกมไม่ได้ เขาก็จะไม่เล่นเกมนั้น”
          <br />
          <span style={{ color: "var(--ink-3)", fontSize: ".85rem" }}>
            — Michael “Curby” Lee, <a href="https://cur.by/styleguide">Board Game Editing Style Guide</a>
          </span>
        </blockquote>
        <div style={{ display: "flex", gap: ".7rem", flexWrap: "wrap", marginTop: "1.5rem" }}>
          <Link href="/th/handbook" style={{ background: "var(--accent)", color: "#fff", padding: ".7rem 1.3rem", borderRadius: 8, fontWeight: 600, fontSize: ".92rem" }}>
            อ่านคู่มือฉบับเต็ม
          </Link>
          <Link href="/th/ebook" style={{ border: "1px solid var(--border)", color: "var(--ink)", padding: ".7rem 1.3rem", borderRadius: 8, fontWeight: 600, fontSize: ".92rem" }}>
            ฉบับเล่าสู่กันฟัง
          </Link>
          <Link href="/th/downloads" style={{ border: "1px solid var(--border)", color: "var(--ink)", padding: ".7rem 1.3rem", borderRadius: 8, fontWeight: 600, fontSize: ".92rem" }}>
            ดาวน์โหลดทั้งหมด
          </Link>
        </div>
      </section>

      <section
        style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))",
          gap: "1px", background: "var(--border)", border: "1px solid var(--border)",
          borderRadius: 10, overflow: "hidden", margin: "3.5rem 0",
        }}
      >
        {stats.map((s) => (
          <div key={s.l} style={{ background: "var(--bg)", padding: "1.25rem 1.1rem" }}>
            <div style={{ fontSize: "2rem", fontWeight: 700, color: "var(--accent-2)", lineHeight: 1 }}>{s.n}</div>
            <div style={{ fontSize: ".8rem", color: "var(--ink-3)", marginTop: ".35rem" }}>{s.l}</div>
          </div>
        ))}
      </section>

      <section style={{ margin: "3.5rem 0" }}>
        <h2 style={{ fontSize: "1.5rem", fontWeight: 650, margin: "0 0 .5rem" }}>แปดเรื่องที่สำคัญที่สุด</h2>
        <p style={{ color: "var(--ink-3)", margin: "0 0 1.75rem", maxWidth: "42rem" }}>
          กลั่นจากองค์ความรู้ทั้ง {knowledge.length} ข้อ แต่ละข้อมีบทที่อธิบายเต็มในคู่มือ
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(270px, 1fr))", gap: "1rem" }}>
          {PILLARS.map((p) => (
            <div key={p.n} className="card">
              <div style={{ color: "var(--accent-2)", fontSize: ".72rem", fontWeight: 700, letterSpacing: ".08em", marginBottom: ".4rem" }}>{p.n}</div>
              <h3 style={{ fontSize: ".98rem", fontWeight: 650, margin: "0 0 .4rem", lineHeight: 1.4 }}>{p.t}</h3>
              <p style={{ fontSize: ".86rem", color: "var(--ink-2)", margin: 0 }}>{p.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ margin: "3.5rem 0" }}>
        <h2 style={{ fontSize: "1.5rem", fontWeight: 650, margin: "0 0 1.5rem" }}>เริ่มตรงไหนดี</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1rem" }}>
          {[
            { href: "/th/handbook", t: "คู่มือฉบับเต็ม", d: "เจ็ดภาค: พื้นฐาน สถาปัตยกรรม งานฝีมือ การผลิต กระบวนการ หลักฐาน และ template ที่ใช้ได้ทันที" },
            { href: "/th/ebook", t: "ฉบับเล่าสู่กันฟัง", d: "เนื้อหาเดียวกัน แต่เขียนแบบสบายๆ ไม่เป็นทางการ เหมาะกับการอ่านรวดเดียวหรืออ่านก่อนนอน" },
            { href: "/th/principles", t: `องค์ความรู้ทั้ง ${knowledge.length} ข้อ`, d: "ฐานข้อมูลงานวิจัยฉบับเต็ม กรองตามหมวดและค้นหาได้ พร้อมลิงก์แหล่งที่มาทุกแถว" },
            { href: "/th/examples", t: `rulebook จริง ${praised.length + criticised.length} เล่ม`, d: "อะไรที่ชุมชนชื่นชม และอะไรที่ถูกวิจารณ์ — ชื่อเกมจริง เหตุผลเจาะจง ลิงก์แหล่งที่มา" },
            { href: "/th/checklist", t: "เช็กลิสต์ก่อนพิมพ์", d: "46 ข้อใน 8 ระยะ ตั้งแต่ความครบถ้วนถึงการส่งมอบ ความคืบหน้าถูกเก็บไว้ในเบราว์เซอร์ของคุณ" },
            { href: "/th/sources", t: "แหล่งข้อมูลทั้งหมด", d: `เอกสารทั้ง ${sources.length} ชิ้นที่เก็บมาสำหรับโปรเจกต์นี้ พร้อม URL ที่คลิกได้` },
          ].map((c) => (
            <Link key={c.href} href={c.href} className="card" style={{ display: "block", color: "inherit", textDecoration: "none" }}>
              <h3 style={{ fontSize: "1rem", fontWeight: 650, margin: "0 0 .4rem", color: "var(--accent-2)" }}>{c.t} →</h3>
              <p style={{ fontSize: ".86rem", color: "var(--ink-2)", margin: 0 }}>{c.d}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="card" style={{ margin: "3.5rem 0", maxWidth: "48rem" }}>
        <h2 style={{ fontSize: "1.05rem", fontWeight: 650, margin: "0 0 .6rem" }}>ขอบเขต บอกกันตรงๆ</h2>
        <p style={{ fontSize: ".88rem", color: "var(--ink-2)", margin: "0 0 .6rem" }}>
          นี่คืองานวิจัยแบบเจาะจง ไม่ใช่การไล่เก็บทั้งหมด BoardGameGeek มีโพสต์หลักล้านและไม่มีช่องทาง export
          ทั้งชุด เธรดจึงถูกคัดตามความเกี่ยวข้อง ครอบคลุมราวปี 2007–2026 โดยเน้นหนักที่ 2019–2026
          ส่วน Reddit รวมไม่ได้เพราะมันบล็อกการเข้าถึงแบบอัตโนมัติ
        </p>
        <p style={{ fontSize: ".88rem", color: "var(--ink-2)", margin: 0 }}>
          ความเห็นในชุมชนคือความเห็น มีหลายเกมที่ปรากฏทั้งในรายการที่ควรศึกษาและที่ถูกวิจารณ์
          เพราะคนที่มีประสบการณ์เห็นต่างกันจริงๆ ไม่มีอะไรตรงนี้เป็นคำตัดสิน ทุกอย่างมีการอ้างอิง
        </p>
      </section>
    </>
  );
}
