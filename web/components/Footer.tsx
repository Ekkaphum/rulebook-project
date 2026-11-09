"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { DICT } from "@/lib/i18n";

export default function Footer() {
  const pathname = usePathname() || "/";
  const locale = pathname === "/th" || pathname.startsWith("/th/") ? "th" : "en";
  const t = DICT[locale];
  return (
    <footer style={{ borderTop: "1px solid var(--border)", background: "var(--surface)" }}>
      <div
        style={{
          maxWidth: "72rem", margin: "0 auto", padding: "2rem 1.25rem",
          fontSize: ".82rem", color: "var(--ink-3)", display: "grid", gap: ".5rem",
        }}
      >
        <section className="creator-credits" aria-label={locale === "th" ? "ผู้จัดทำโปรเจกต์" : "Project creators"}>
          <div>
            <p className="creator-label">{locale === "th" ? "จัดทำโดย" : "A project by"}</p>
            <div className="creator-brands">
              <a className="creator-brand creator-lifebugs" href="https://lifebugs.dev" target="_blank" rel="noopener noreferrer" aria-label="Lifebugs">
                <Image className="creator-logo-light" src="/images/creators/lifebugs-light.webp" alt="Lifebugs" width={1086} height={362} unoptimized />
                <Image className="creator-logo-dark" src="/images/creators/lifebugs-dark.webp" alt="" width={1086} height={362} unoptimized />
              </a>
              <span className="creator-divider" aria-hidden="true" />
              <a className="creator-brand creator-lunar" href="https://www.facebook.com/LunarGravityGames" target="_blank" rel="noopener noreferrer">
                <Image src="/images/creators/lunar-gravity.webp" alt="" width={48} height={48} unoptimized />
                <span>Lunar Gravity</span>
              </a>
            </div>
          </div>
          <div className="creator-author">
            <p className="creator-label">{locale === "th" ? "ออกแบบและเรียบเรียง" : "Design & research"}</p>
            <p className="creator-name">Poom Phumiphan</p>
          </div>
        </section>
        <p style={{ margin: 0 }}>{t.footerA}</p>
        <p style={{ margin: 0 }}>
          {t.footerB.split("Board Game Editing Style Guide")[0]}
          <a href="https://cur.by/styleguide">Board Game Editing Style Guide</a>
          {t.footerB.split("Board Game Editing Style Guide")[1]}
        </p>
        <p style={{ margin: 0 }}>
          {t.footerPrivacy[0]}
          <Link href={locale === "th" ? "/th/privacy" : "/privacy"}>{t.footerPrivacy[1]}</Link>
          {t.footerPrivacy[2]}
        </p>
      </div>
    </footer>
  );
}
