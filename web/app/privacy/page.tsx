import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy",
  description: "How The Rulebook Project measures visits and protects visitor privacy.",
};

export default function PrivacyPage() {
  return (
    <article style={{ maxWidth: "48rem" }}>
      <p className="eyebrow">Privacy</p>
      <h1>Visitor analytics</h1>

      <p>
        We use Vercel Web Analytics to understand how this site is used. It records aggregate visit information such
        as the page viewed, approximate time, referring site, country or region, browser, operating system, and device
        type. This helps us improve the material and understand where readers discover it.
      </p>

      <h2>What we do not do</h2>
      <p>
        We do not use analytics cookies, advertising trackers, or browser fingerprinting, and the analytics data is not
        intended to identify you by name. We do not attempt to combine it with data bought from third parties.
      </p>

      <h2>If you identify yourself</h2>
      <p>
        If the site later offers an account, feedback form, or mailing list, any name or contact details you choose to
        provide must be handled separately and only for the purpose explained at the point of collection. Anonymous
        browsing data will not be presented as proof of a visitor&apos;s identity.
      </p>

      <p style={{ color: "var(--ink-3)", fontSize: ".9rem" }}>Last updated: 3 September 2026</p>
    </article>
  );
}
