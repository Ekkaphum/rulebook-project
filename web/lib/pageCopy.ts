import type { Locale } from "./content";

export const COPY = {
  en: {
    principles: {
      eyebrow: "The research database",
      title: (n: number) => `${n} findings`,
      lede: "Every entry carries a principle, the reasoning behind it, a piece of supporting evidence, and a link to the source it came from. Filter by category or search the full text.",
      labels: { search: "Search findings, evidence, sources…", showing: "Showing {a} of {b}", source: "Source", none: "No findings match that search.", all: "All" },
    },
    examples: {
      eyebrow: "Evidence",
      title: (n: number) => `${n} rulebooks studied`,
      lede: "Named games, the specific thing that was praised or criticised, and a link to whoever said it.",
      note: "These are records of what named sources said, not verdicts. A few games appear on both lists — that is not an error, it is the state of the argument.",
      labels: {
        search: "Search games, failure modes, sources…",
        both: "Both", good: "Worth studying", bad: "Worth avoiding",
        goodTitle: "Worth studying", goodSub: "Rulebooks named as exemplary, and the specific quality that earned the mention.",
        badTitle: "Worth studying as warnings",
        badSub: "Almost every game here is one people like. It is in this list because of what it teaches, not because anyone deserves criticism.",
        none: "Nothing matches that search.",
      },
    },
    checklist: {
      eyebrow: "Tools", title: "Pre-print checklist",
      lede: "46 checks across 8 phases, each with the reason it exists. Tick things off as you go — your progress is stored in this browser only, and never leaves your machine.",
      labels: {
        tabs: ["Checklist", "Style rules", "Numbers", "Section templates"] as [string, string, string, string],
        complete: "{a} of {b} complete",
        reset: "Reset", do: "DO", dont: "DON’T",
        metricHead: ["Metric", "Value", "Context", "Source"],
        templateIntro: "Ten section orders from ten independent authorities. They differ at the edges and agree almost perfectly in the middle — note how many put the goal before the details, and how few open with setup.",
      },
    },
    sources: {
      eyebrow: "Provenance", title: (n: number) => `${n} sources`,
      lede: "Everything harvested for this project. BoardGameGeek pages were retrieved through a text-extraction proxy, because BGG serves a Cloudflare challenge to automated clients and its XML API now returns 401 for anonymous forum and geeklist requests.",
      note: "Reddit is absent because it blocks automated access. The “years” column shows post dates found inside each thread, which is a rough guide to when the discussion happened.",
      labels: { search: "Search titles and URLs…", showing: "Showing {a} of {b}", none: "Nothing matches that search.", open: "Open", all: "All", head: ["ID", "Type", "Title", "Years", "Link"] },
    },
    handbook: {
      eyebrow: "The handbook", title: "How to Create a Good Rulebook",
      lede: "A practitioner’s handbook for board game designers. Seven parts, roughly 17,000 words — foundations, architecture, craft, production, process, evidence, and ready-to-use templates.",
    },
    downloads: {
      eyebrow: "Take it with you", title: "Downloads",
      lede: "Everything on this site, as files you can keep, edit and hand to a collaborator.",
      reuseTitle: "Reuse",
      reuseA: "These documents summarise and attribute their sources rather than reproducing them. Michael “Curby” Lee’s Board Game Editing Style Guide is licensed CC BY-NC-SA, and the material derived from it is attributed throughout.",
      reuseB: "If you use this material in your own work, please link back to the original sources — they did the hard part.",
      files: [
        { href: "/downloads/how-to-create-a-good-rulebook.docx", title: "How to Create a Good Rulebook", sub: "Word document · ~17,000 words", desc: "The full practitioner’s handbook: seven parts covering foundations, architecture, craft, production, process, evidence and templates. Includes the master rulebook skeleton, a style-guide worksheet, a blind-playtest protocol and the pre-print checklist." },
        { href: "/downloads/rulebook-research-database.xlsx", title: "Rulebook Research Database", sub: "Excel workbook · 10 sheets", desc: "The complete research data: 106 sources with clickable URLs, 127 findings with citations, 68 rulebooks praised and criticised, 10 section templates, 26 style rules, the 46-item checklist, 16 quantitative reference points, and the failure taxonomy." },
        { href: "/downloads/rulebook-handbook-th.docx", title: "วิธีสร้าง Rulebook ที่ดี (Thai handbook)", sub: "Word document · Thai edition", desc: "The full handbook in Thai — the same seven parts, written for Thai-speaking designers." },
        { href: "/downloads/rulebook-ebook-th.docx", title: "เขียน Rulebook ให้คนอยากอ่าน (Thai ebook)", sub: "Word document · Thai, informal", desc: "A relaxed, conversational Thai edition for designers at any level — principles, real examples, worksheets and a checklist, written as knowledge-sharing rather than a manual." },
        { href: "/downloads/rulebook-research-database-th.xlsx", title: "ฐานข้อมูลงานวิจัย Rulebook (Thai database)", sub: "Excel workbook · 10 sheets, Thai", desc: "The full research database in Thai, with the same 106 source URLs and 127 findings." },
      ],
    },
  },
  th: {
    principles: {
      eyebrow: "ฐานข้อมูลงานวิจัย",
      title: (n: number) => `องค์ความรู้ ${n} ข้อ`,
      lede: "แต่ละรายการมีหลักการ เหตุผลเบื้องหลัง หลักฐานสนับสนุน และลิงก์ไปยังแหล่งที่มา กรองตามหมวดหรือค้นหาจากข้อความเต็มได้",
      labels: { search: "ค้นหาองค์ความรู้ หลักฐาน แหล่งที่มา…", showing: "แสดง {a} จาก {b}", source: "แหล่งที่มา", none: "ไม่พบองค์ความรู้ที่ตรงกับคำค้น", all: "ทั้งหมด" },
    },
    examples: {
      eyebrow: "หลักฐาน",
      title: (n: number) => `rulebook ${n} เล่มที่ศึกษา`,
      lede: "ชื่อเกมจริง สิ่งที่ถูกชมหรือถูกวิจารณ์อย่างเจาะจง และลิงก์ไปหาคนที่พูดไว้",
      note: "นี่คือบันทึกสิ่งที่แหล่งที่ระบุชื่อพูดไว้ ไม่ใช่คำตัดสิน มีบางเกมปรากฏในทั้งสองรายการ — นั่นไม่ใช่ความผิดพลาด แต่คือสภาพของข้อถกเถียง",
      labels: {
        search: "ค้นหาเกม รูปแบบความล้มเหลว แหล่งที่มา…",
        both: "ทั้งหมด", good: "ควรศึกษา", bad: "ควรระวัง",
        goodTitle: "rulebook ที่ควรศึกษา", goodSub: "เล่มที่ถูกยกเป็นตัวอย่างดี และคุณสมบัติเฉพาะที่ทำให้ถูกกล่าวถึง",
        badTitle: "rulebook ที่ควรศึกษาในฐานะคำเตือน",
        badSub: "เกือบทุกเกมในรายการนี้คือเกมที่คนชอบ มันอยู่ตรงนี้เพราะสิ่งที่มันสอนเรา ไม่ใช่เพราะใครสมควรถูกตำหนิ",
        none: "ไม่พบรายการที่ตรงกับคำค้น",
      },
    },
    checklist: {
      eyebrow: "เครื่องมือ", title: "เช็กลิสต์ก่อนส่งโรงพิมพ์",
      lede: "46 ข้อตรวจใน 8 ระยะ แต่ละข้อมีเหตุผลว่าทำไมถึงมีอยู่ ติ๊กไปเรื่อยๆ ได้เลย — ความคืบหน้าถูกเก็บไว้ในเบราว์เซอร์นี้เท่านั้น และไม่ถูกส่งออกไปไหน",
      labels: {
        tabs: ["เช็กลิสต์", "กฎการเขียน", "ตัวเลขอ้างอิง", "template โครงสร้าง"] as [string, string, string, string],
        complete: "เสร็จแล้ว {a} จาก {b}",
        reset: "ล้างค่า", do: "ควรทำ", dont: "ไม่ควรทำ",
        metricHead: ["ตัวชี้วัด", "ค่า", "บริบท", "แหล่งที่มา"],
        templateIntro: "ลำดับหัวข้อสิบแบบจากแหล่งอ้างอิงสิบแหล่งที่เป็นอิสระต่อกัน พวกมันต่างกันตรงขอบและตรงกันเกือบสมบูรณ์ตรงกลาง — สังเกตว่ามีกี่แหล่งที่วางเป้าหมายไว้ก่อนรายละเอียด และมีน้อยแค่ไหนที่เปิดด้วยการตั้งเกม",
      },
    },
    sources: {
      eyebrow: "ที่มาของข้อมูล", title: (n: number) => `แหล่งข้อมูล ${n} แหล่ง`,
      lede: "ทุกอย่างที่เก็บมาสำหรับโปรเจกต์นี้ หน้าเว็บ BoardGameGeek ถูกดึงผ่าน text-extraction proxy เพราะ BGG ส่ง Cloudflare challenge ให้ client อัตโนมัติ และ XML API ของมันคืนค่า 401 สำหรับคำขอ forum และ geeklist แบบไม่ล็อกอินแล้ว",
      note: "Reddit ไม่อยู่ในรายการเพราะมันบล็อกการเข้าถึงแบบอัตโนมัติ ส่วนคอลัมน์ “ปี” แสดงวันที่ของโพสต์ที่พบภายในแต่ละเธรด ซึ่งเป็นเครื่องบอกคร่าวๆ ว่าการถกเถียงเกิดขึ้นเมื่อไหร่",
      labels: { search: "ค้นหาชื่อเอกสารและ URL…", showing: "แสดง {a} จาก {b}", none: "ไม่พบรายการที่ตรงกับคำค้น", open: "เปิด", all: "ทั้งหมด", head: ["รหัส", "ประเภท", "ชื่อเอกสาร", "ปี", "ลิงก์"] },
    },
    handbook: {
      eyebrow: "คู่มือฉบับเต็ม", title: "วิธีสร้าง Rulebook ที่ดี",
      lede: "คู่มือสำหรับนักออกแบบบอร์ดเกม เจ็ดภาค ครอบคลุมพื้นฐาน สถาปัตยกรรม งานฝีมือ การผลิต กระบวนการ หลักฐาน และ template ที่ใช้ได้ทันที",
    },
    downloads: {
      eyebrow: "เอาไปใช้ต่อ", title: "ดาวน์โหลด",
      lede: "ทุกอย่างบนเว็บนี้ ในรูปแบบไฟล์ที่คุณเก็บไว้ แก้ไข และส่งต่อให้เพื่อนร่วมงานได้",
      reuseTitle: "การนำไปใช้",
      reuseA: "เอกสารเหล่านี้สรุปและอ้างอิงแหล่งที่มา ไม่ได้คัดลอกมาทั้งชิ้น Board Game Editing Style Guide ของ Michael “Curby” Lee ใช้สัญญาอนุญาต CC BY-NC-SA และเนื้อหาที่ต่อยอดจากมันถูกอ้างอิงไว้ตลอด",
      reuseB: "ถ้าคุณนำเนื้อหานี้ไปใช้ในงานของคุณ กรุณาลิงก์กลับไปหาต้นทางด้วย — พวกเขาคือคนที่ทำส่วนที่ยาก",
      files: [
        { href: "/downloads/rulebook-handbook-th.docx", title: "วิธีสร้าง Rulebook ที่ดี", sub: "ไฟล์ Word · คู่มือฉบับเต็ม", desc: "คู่มือฉบับเต็มสำหรับคนทำงานจริง เจ็ดภาค ครอบคลุมพื้นฐาน สถาปัตยกรรม งานฝีมือ การผลิต กระบวนการ หลักฐาน และ template — รวมโครงร่าง rulebook แบบฟอร์ม style guide ขั้นตอน blind playtest และเช็กลิสต์ก่อนพิมพ์" },
        { href: "/downloads/rulebook-research-database-th.xlsx", title: "ฐานข้อมูลงานวิจัย Rulebook", sub: "ไฟล์ Excel · 10 ชีต", desc: "ข้อมูลวิจัยครบชุด: 106 แหล่งพร้อม URL ที่คลิกได้, องค์ความรู้ 127 ข้อพร้อมการอ้างอิง, rulebook 68 เล่มที่ถูกชมและถูกวิจารณ์, template โครงสร้าง 10 แบบ, กฎการเขียน 26 ข้อ, เช็กลิสต์ 46 ข้อ, ตัวเลขอ้างอิง 16 จุด และระบบจำแนกความล้มเหลว" },
        { href: "/downloads/rulebook-ebook-th.docx", title: "เขียน Rulebook ให้คนอยากอ่าน", sub: "ไฟล์ Word · ฉบับเล่าสู่กันฟัง", desc: "เวอร์ชันเขียนแบบสบายๆ ไม่เป็นทางการ สำหรับนักออกแบบทั้งมือใหม่และมือเก๋า มีทั้งหลักการ ตัวอย่างจริง แบบฟอร์ม และเช็กลิสต์ เขียนเหมือนแชร์ความรู้กันมากกว่าเป็นตำรา" },
        { href: "/downloads/how-to-create-a-good-rulebook.docx", title: "How to Create a Good Rulebook (English)", sub: "ไฟล์ Word · ~17,000 คำ", desc: "คู่มือฉบับภาษาอังกฤษ เนื้อหาเดียวกับฉบับไทย สำหรับส่งต่อให้เพื่อนร่วมงานหรือสำนักพิมพ์ต่างประเทศ" },
        { href: "/downloads/rulebook-research-database.xlsx", title: "Rulebook Research Database (English)", sub: "ไฟล์ Excel · 10 ชีต", desc: "ฐานข้อมูลงานวิจัยฉบับภาษาอังกฤษ ข้อมูลชุดเดียวกัน" },
      ],
    },
  },
} as const;

export function copy(locale: Locale) {
  return COPY[locale];
}
