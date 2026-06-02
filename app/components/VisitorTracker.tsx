"use client";

import { useEffect, useRef } from "react";

type EventPayload = {
  type: string;
  section?: string;
  target?: string;
  value?: string | number | boolean;
  metadata?: Record<string, unknown>;
  contact?: {
    email?: string;
    name?: string;
    clinic?: string;
    clinicSize?: string;
    challenge?: string;
  };
};

declare global {
  interface Window {
    mt?: (...args: unknown[]) => void;
  }
}

function getStoredId(key: string, prefix: string) {
  const existing = window.localStorage.getItem(key);
  if (existing) return existing;
  const next = `${prefix}_${crypto.randomUUID()}`;
  window.localStorage.setItem(key, next);
  return next;
}

export function VisitorTracker() {
  const visitorId = useRef<string | null>(null);
  const sessionId = useRef<string | null>(null);
  const startedAt = useRef(Date.now());

  useEffect(() => {
    visitorId.current = getStoredId("clinicflow_visitor_id", "visitor");
    sessionId.current = `session_${crypto.randomUUID()}`;

    const send = (payload: EventPayload, useBeacon = false) => {
      const event = {
        ...payload,
        visitorId: visitorId.current,
        sessionId: sessionId.current,
        pageUrl: window.location.href,
        pagePath: window.location.pathname,
        referrer: document.referrer
      };

      if (useBeacon) {
        navigator.sendBeacon("/api/behavior-events", JSON.stringify(event));
        return;
      }

      fetch("/api/behavior-events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(event),
        keepalive: true
      }).catch(() => undefined);
    };

    send({
      type: "page_view",
      metadata: {
        language: document.documentElement.lang,
        viewportWidth: window.innerWidth,
        viewportHeight: window.innerHeight
      }
    });

    const scrollMilestones = new Set<number>();
    const onScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll <= 0) return;
      const depth = Math.round((window.scrollY / maxScroll) * 100);
      [25, 50, 75, 100].forEach((milestone) => {
        if (depth >= milestone && !scrollMilestones.has(milestone)) {
          scrollMilestones.add(milestone);
          window.localStorage.setItem("clinicflow_max_scroll_depth", String(milestone));
          send({ type: "scroll_depth", value: milestone });
        }
      });
    };

    const visibleSections = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const section = entry.target.getAttribute("data-track-section");
          if (entry.isIntersecting && section && !visibleSections.has(section)) {
            visibleSections.add(section);
            window.localStorage.setItem("clinicflow_viewed_sections", JSON.stringify([...visibleSections]));
            send({ type: "section_view", section });
          }
        });
      },
      { threshold: 0.45 }
    );

    document.querySelectorAll("[data-track-section]").forEach((section) => observer.observe(section));

    const clickHandler = (event: MouseEvent) => {
      const target = (event.target as Element).closest<HTMLElement>("[data-track-click]");
      if (!target) return;
      const clicked = JSON.parse(window.localStorage.getItem("clinicflow_clicked_targets") ?? "[]") as string[];
      if (target.dataset.trackClick && !clicked.includes(target.dataset.trackClick)) {
        window.localStorage.setItem("clinicflow_clicked_targets", JSON.stringify([...clicked, target.dataset.trackClick]));
      }
      send({
        type: "click",
        target: target.dataset.trackClick,
        section: target.closest("[data-track-section]")?.getAttribute("data-track-section") ?? undefined
      });

      if (window.mt && target.dataset.trackClick) {
        window.mt("send", "event", {
          eventCategory: "landing_page",
          eventAction: "click",
          eventLabel: target.dataset.trackClick
        });
      }
    };

    const beforeUnload = () => {
      send(
        {
          type: "time_on_page",
          value: Math.round((Date.now() - startedAt.current) / 1000)
        },
        true
      );
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("click", clickHandler);
    window.addEventListener("beforeunload", beforeUnload);

    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("click", clickHandler);
      window.removeEventListener("beforeunload", beforeUnload);
      observer.disconnect();
    };
  }, []);

  return null;
}

export function trackBehavior(payload: EventPayload) {
  const visitorId = window.localStorage.getItem("clinicflow_visitor_id");
  fetch("/api/behavior-events", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...payload,
      visitorId,
      pageUrl: window.location.href,
      pagePath: window.location.pathname,
      referrer: document.referrer
    }),
    keepalive: true
  }).catch(() => undefined);

  if (window.mt) {
    window.mt("send", "event", {
      eventCategory: "landing_page",
      eventAction: payload.type,
      eventLabel: payload.target ?? payload.section ?? String(payload.value ?? "")
    });
  }
}
