"use client";

import { useEffect, useState } from "react";
import { NAV_LINKS, SITE } from "./content";

/** Sticky top bar with anchor links, scroll-spy highlight and a mobile menu. */
export function Nav() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");
  const [hidden, setHidden] = useState(false);

  // Hide on scroll down, reveal on scroll up (never while the menu is open).
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > last && y > 120);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = NAV_LINKS.map((l) => document.getElementById(l.id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <header
      className={`nav-in fixed inset-x-0 top-0 z-40 border-b border-white/5 bg-[#0a0f0f]/80 backdrop-blur transition-transform duration-300 ${
        hidden && !open ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-14 max-w-5xl items-center justify-between px-5"
      >
        <a
          href="#top"
          className="flex items-center gap-2 text-[11px] uppercase tracking-[0.28em] text-white/85"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
            <path d="M5 3.5 1.8 8 5 12.5" stroke="#7a00ff" strokeWidth="1.4" strokeLinecap="square" />
            <path d="M11 3.5 14.2 8 11 12.5" stroke="#7a00ff" strokeWidth="1.4" strokeLinecap="square" />
            <path d="M9.2 2.5 6.8 13.5" stroke="#2dff9a" strokeWidth="1.2" strokeLinecap="square" />
          </svg>
          <span className="hidden sm:inline">{SITE.name}</span>
          <span className="sm:hidden">A.P.</span>
        </a>

        <ul className="hidden items-center gap-7 text-[11px] uppercase tracking-[0.22em] md:flex">
          {NAV_LINKS.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                aria-current={active === l.id ? "true" : undefined}
                className={`transition-colors hover:text-white ${
                  active === l.id ? "text-[#2dff9a]" : "text-white/50"
                }`}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="text-[11px] uppercase tracking-[0.22em] text-white/70 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </nav>

      {open && (
        <ul
          id="mobile-menu"
          className="border-t border-white/5 bg-[#0a0f0f] px-5 py-3 md:hidden"
        >
          {NAV_LINKS.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                onClick={() => setOpen(false)}
                className="block py-3 text-[11px] uppercase tracking-[0.22em] text-white/70"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
