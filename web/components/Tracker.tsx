"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

type Event = { type: string; path?: string; target?: string; value?: number; duration?: number };

function sid() {
  try {
    let id = sessionStorage.getItem("rb_sid");
    if (!id) {
      id = crypto.randomUUID();
      sessionStorage.setItem("rb_sid", id);
    }
    return id;
  } catch {
    return undefined;
  }
}

function send(events: Event[], beacon = false) {
  const body = JSON.stringify(events.map((e) => ({ ...e, sid: sid() })));
  if (beacon && navigator.sendBeacon) {
    navigator.sendBeacon("/api/track", new Blob([body], { type: "application/json" }));
    return;
  }
  fetch("/api/track", { method: "POST", body, headers: { "content-type": "application/json" }, keepalive: true }).catch(() => {});
}

/**
 * Records what signed-in readers open and how far they read: a page view,
 * each chapter heading that scrolls into view, the deepest scroll point and
 * time on page when they leave, and clicks on downloads and source links.
 */
export default function Tracker() {
  const pathname = usePathname() || "/";

  useEffect(() => {
    if (pathname.startsWith("/admin")) return;
    const start = Date.now();
    let maxDepth = 0;
    let flushed = false;
    const seen = new Set<string>();

    send([{ type: "page_view", path: pathname }]);

    const onScroll = () => {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      const depth = scrollable <= 0 ? 100 : Math.round((window.scrollY / scrollable) * 100);
      if (depth > maxDepth) maxDepth = Math.min(100, depth);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const text = e.target.textContent?.trim();
          if (!e.isIntersecting || !text || seen.has(text)) continue;
          seen.add(text);
          send([{ type: "section", path: pathname, target: text }]);
        }
      },
      { rootMargin: "0px 0px -60% 0px" }
    );
    // Content renders with the page, but give client components a tick.
    const t = setTimeout(() => document.querySelectorAll(".prose h1[id], .prose h2[id]").forEach((h) => obs.observe(h)), 300);

    const onClick = (ev: MouseEvent) => {
      const a = (ev.target as HTMLElement | null)?.closest("a");
      if (!a?.href) return;
      const url = new URL(a.href, location.href);
      if (/\.(docx|xlsx|pdf|zip)$/i.test(url.pathname)) send([{ type: "download", path: pathname, target: url.pathname }], true);
      else if (url.origin !== location.origin) send([{ type: "outbound", path: pathname, target: url.href }], true);
    };
    document.addEventListener("click", onClick, true);

    const flush = () => {
      if (flushed) return;
      flushed = true;
      const seconds = Math.round((Date.now() - start) / 1000);
      if (seconds >= 1) send([{ type: "read", path: pathname, value: maxDepth, duration: seconds }], true);
    };
    const onHide = () => document.visibilityState === "hidden" && flush();
    document.addEventListener("visibilitychange", onHide);
    window.addEventListener("pagehide", flush);

    return () => {
      flush();
      clearTimeout(t);
      obs.disconnect();
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("click", onClick, true);
      document.removeEventListener("visibilitychange", onHide);
      window.removeEventListener("pagehide", flush);
    };
  }, [pathname]);

  return null;
}
