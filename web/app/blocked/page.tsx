import type { Metadata } from "next";

export const metadata: Metadata = { title: "Account unavailable", robots: { index: false } };

export default function BlockedPage() {
  return (
    <article className="prose" style={{ maxWidth: "40rem", paddingTop: "2rem" }}>
      <p className="eyebrow">Account unavailable · บัญชีถูกระงับ</p>
      <h1>This account can’t access the site</h1>
      <p>Access for this account has been suspended. If you think this is a mistake, please get in touch with the site owner.</p>
      <h2>บัญชีนี้ไม่สามารถเข้าใช้งานเว็บได้</h2>
      <p>บัญชีนี้ถูกระงับการเข้าถึง หากคิดว่าเกิดข้อผิดพลาด กรุณาติดต่อผู้ดูแลเว็บ</p>
    </article>
  );
}
