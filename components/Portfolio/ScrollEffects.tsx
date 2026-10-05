"use client";

import { useEffect, useRef } from "react";

/**
 * One rAF-throttled scroll listener that drives:
 *  - the top progress bar (scaleX via --progress)
 *  - hero parallax / fade (--sy, unitless pixels, clamped)
 * Values are written as CSS variables so React never re-renders on scroll.
 */
export function ScrollEffects() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    let raf = 0;

    const update = () => {
      raf = 0;
      const y = window.scrollY;
      const max = Math.max(1, root.scrollHeight - window.innerHeight);
      root.style.setProperty("--progress", String(Math.min(1, y / max)));
      root.style.setProperty("--sy", String(Math.min(y, 1200)));
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

  return <div ref={barRef} className="scroll-progress" aria-hidden />;
}
