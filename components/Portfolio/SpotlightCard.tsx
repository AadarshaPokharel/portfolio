"use client";

import { useRef, type ReactNode } from "react";

const FINE_POINTER =
  "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)";

/**
 * Card with a cursor-following spotlight and optional subtle 3D tilt.
 * Pointer position is written to CSS variables (--mx/--my/--rx/--ry);
 * styling lives in .spot in globals.css.
 */
export function SpotlightCard({
  children,
  className = "",
  tilt = false,
}: {
  children: ReactNode;
  className?: string;
  tilt?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || !window.matchMedia(FINE_POINTER).matches) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    el.style.setProperty("--mx", `${x}px`);
    el.style.setProperty("--my", `${y}px`);
    if (tilt) {
      el.style.setProperty("--rx", `${(y / r.height - 0.5) * -7}deg`);
      el.style.setProperty("--ry", `${(x / r.width - 0.5) * 7}deg`);
    }
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  };

  return (
    <div
      ref={ref}
      className={`spot ${className}`}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      {children}
    </div>
  );
}
