import { Magnetic } from "@/components/Portfolio/Magnetic";
import { SpotlightCard } from "@/components/Portfolio/SpotlightCard";
import { SplitText } from "@/components/Portfolio/SplitText";
import { HERO } from "@/components/Portfolio/content";
import type { CSSProperties } from "react";

/** Staggered entrance delay (ms), consumed by .hero-anim in globals.css. */
const d = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

/** First screen after the intro: kinetic name, pitch, CTAs and entry cards. */
export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-6 pb-20 pt-24"
    >
      {/* Drifting light orbs + graph paper; parallaxed by --sy. */}
      <div aria-hidden className="hero-bg pointer-events-none absolute inset-0">
        <div className="orb orb-violet" />
        <div className="orb orb-blue" />
        <div className="orb orb-green" />
        <div className="hero-grid absolute inset-0" />
      </div>

      <div className="hero-parallax relative flex w-full max-w-3xl flex-col items-center text-center">
        <p
          className="hero-anim text-[11px] uppercase tracking-[0.28em] text-[#2dff9a]"
          style={d(150)}
        >
          {HERO.eyebrow}
        </p>

        <h1
          aria-label={HERO.headline}
          className="mt-5 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-7xl"
          style={{ "--base": "250ms" } as CSSProperties}
        >
          <SplitText text={HERO.headline} />
        </h1>

        <p
          className="hero-anim mt-5 max-w-xl text-sm leading-relaxed text-white/55 md:text-base"
          style={d(750)}
        >
          {HERO.subtitle}
        </p>

        <div
          className="hero-anim mt-8 flex flex-wrap items-center justify-center gap-3"
          style={d(900)}
        >
          <Magnetic>
            <a
              href={HERO.primaryCta.href}
              className="inline-flex items-center rounded-full bg-[#5b7cfa] px-6 py-3 text-sm font-medium text-white transition hover:brightness-110"
            >
              {HERO.primaryCta.label}
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href={HERO.secondaryCta.href}
              className="inline-flex items-center rounded-full border border-white/15 px-6 py-3 text-sm text-white/80 transition hover:border-white/35 hover:text-white"
            >
              {HERO.secondaryCta.label}
            </a>
          </Magnetic>
        </div>

        <ul className="mt-14 grid w-full gap-4 sm:grid-cols-3">
          {HERO.steps.map((s, i) => (
            <li key={s.step} className="hero-anim" style={d(1050 + i * 120)}>
              <SpotlightCard
                tilt
                className="h-full rounded-xl border border-white/10 bg-white/[0.04] transition-colors hover:border-[#7a00ff]/60"
              >
                <a href={s.href} className="block h-full px-4 py-5 text-left">
                  <p className="text-[10px] uppercase tracking-[0.22em] text-[#f5a524]">
                    {s.step}
                  </p>
                  <p className="mt-2 text-sm font-medium text-white">{s.title}</p>
                  <p className="mt-1 text-xs leading-relaxed text-white/45">{s.body}</p>
                </a>
              </SpotlightCard>
            </li>
          ))}
        </ul>
      </div>

      <div
        aria-hidden
        className="hero-anim absolute bottom-6 flex flex-col items-center gap-2 text-[10px] uppercase tracking-[0.28em] text-white/35"
        style={d(1500)}
      >
        <span>Scroll</span>
        <span className="scroll-cue" />
      </div>
    </section>
  );
}
