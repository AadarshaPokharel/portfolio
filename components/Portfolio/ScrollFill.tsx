"use client";

import { useEffect, useRef } from "react";

/**
 * Paragraph whose words light up one by one as it scrolls through the
 * viewport. Words are server-rendered at full opacity; the dimmed state is
 * only enabled (data-fill) once JS runs, and never with reduced motion.
 */
export function ScrollFill({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const words = text.split(" ");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const spans = Array.from(el.querySelectorAll<HTMLElement>(".sw"));
    el.dataset.fill = "on";
    let raf = 0;

    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 when the paragraph enters at ~85% of the viewport, 1 by ~35%.
      const p = Math.min(1, Math.max(0, (vh * 0.85 - r.top) / (vh * 0.5 + r.height)));
      const lit = Math.round(p * spans.length);
      spans.forEach((s, i) => s.classList.toggle("lit", i < lit));
    };
    const onScroll = () => {
      if (!raf) raf = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <p ref={ref} className={`scroll-fill ${className}`}>
      {words.map((w, i) => (
        <span key={i}>
          <span className="sw">{w}</span>
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </p>
  );
}
