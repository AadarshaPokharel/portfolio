"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Fades + lifts its children in when scrolled into view.
 *
 * The IntersectionObserver watches an unclipped outer wrapper while the
 * animated styles live on an inner element: a clip-path'd target can report
 * zero visible area, which would stop "mask" reveals from ever firing.
 *
 * State lives in a data attribute (not React state), so server HTML is fully
 * visible without JS and there is no hydration mismatch. See globals.css.
 */
export function Reveal({
  children,
  delay = 0,
  className,
  variant = "fade",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  /** fade: lift + fade · mask: wipe up from a clip · scale: lift + settle */
  variant?: "fade" | "mask" | "scale";
}) {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    inner.dataset.reveal = "hidden";
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        inner.dataset.reveal = "shown";
        io.disconnect();
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    io.observe(outer);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={outerRef} className={className}>
      <div
        ref={innerRef}
        className="h-full"
        data-variant={variant}
        style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}
      >
        {children}
      </div>
    </div>
  );
}
