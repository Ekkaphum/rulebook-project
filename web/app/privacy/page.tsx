import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy",
  description: "How The Rulebook Project measures visits and protects visitor privacy.",
};

export default function PrivacyPage() {
  return (
    <article className="prose" style={{ maxWidth: "48rem" }}>
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

      <h2>Your account</h2>
      <p>
        The full handbook and research database are free, but you sign in with Google to read them. When you do, we
        keep your Google name, email address and profile picture, your approximate country and city (from your IP
        address), when you signed in, and a record of what you read here: which pages you open, how far down each page
        you scroll and for how long, which chapter headings you reach, and which files and source links you click.
      </p>
      <p>
        We use this to understand who the material reaches and which parts are useful, and to block accounts that
        abuse the site. Only the site owner can see it. It is not sold, shared with advertisers, or combined with data
        from elsewhere. On the landing page, before you sign in, we count visits with a random per-tab identifier that
        is not linked to you.
      </p>
      <p>
        You can delete your account at any time from the account menu; your account and reading history are erased
        immediately. One session cookie keeps you signed in; it is strictly necessary and is not used for advertising.
      </p>

      <p style={{ color: "var(--ink-3)", fontSize: ".9rem" }}>Last updated: 11 October 2026</p>
    </article>
  );
}
