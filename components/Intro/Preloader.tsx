"use client";

import { useCallback, useEffect, useState } from "react";
import { BootLog } from "./BootLog";
import { PixelSnake } from "./PixelSnake";
import {
  COLORS,
  COPY,
  GITHUB_URL,
  INTRO_SESSION_KEY,
  TIMING,
} from "./constants";
import { useBootLog } from "./hooks/useBootLog";
import { usePrefersReducedMotion } from "./hooks/usePrefersReducedMotion";

type Phase = "cover" | "play" | "exit" | "gone";

function WordmarkIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
      className="shrink-0"
    >
      <path
        d="M5 3.5 1.8 8 5 12.5"
        stroke={COLORS.accent}
        strokeWidth="1.4"
        strokeLinecap="square"
      />
      <path
        d="M11 3.5 14.2 8 11 12.5"
        stroke={COLORS.accent}
        strokeWidth="1.4"
        strokeLinecap="square"
      />
      <path
        d="M9.2 2.5 6.8 13.5"
        stroke={COLORS.green}
        strokeWidth="1.2"
        strokeLinecap="square"
      />
    </svg>
  );
}

export function Preloader() {
  const reducedMotion = usePrefersReducedMotion();
  const [phase, setPhase] = useState<Phase>("cover");
  const playing = phase === "play";
  const { visibleCount, timestamps, done: logDone } = useBootLog(
    playing,
    reducedMotion,
  );
  const [snakeDone, setSnakeDone] = useState(false);

  const beginExit = useCallback(() => {
    setPhase((current) => {
      if (current === "exit" || current === "gone") return current;
      try {
        sessionStorage.setItem(INTRO_SESSION_KEY, "1");
      } catch {
        // Private mode / blocked storage should not trap the visitor.
      }
      return "exit";
    });
  }, []);

  // After hydration: skip straight to the hero, or start the sequence.
  // sessionStorage is read on a timeout so it never runs during SSR/hydration.
  useEffect(() => {
    const id = window.setTimeout(() => {
      let seen = false;
      try {
        seen = sessionStorage.getItem(INTRO_SESSION_KEY) === "1";
      } catch {
        seen = false;
      }
      setPhase(seen ? "gone" : "play");
    }, 0);
    return () => window.clearTimeout(id);
  }, []);

  useEffect(() => {
    if (phase !== "play") return;
    if (!logDone) return;
    if (!reducedMotion && !snakeDone) return;

    const hold = window.setTimeout(beginExit, TIMING.holdMs);
    return () => window.clearTimeout(hold);
  }, [phase, logDone, snakeDone, reducedMotion, beginExit]);

  // Tell the page the intro is finished so hero animations can start.
  // Starting at "exit" lets them overlap the 300ms overlay fade.
  useEffect(() => {
    if (phase === "exit" || phase === "gone") {
      document.documentElement.dataset.intro = "done";
    }
  }, [phase]);

  useEffect(() => {
    if (phase !== "exit") return;
    const fade = window.setTimeout(() => setPhase("gone"), TIMING.fadeMs);
    return () => window.clearTimeout(fade);
  }, [phase]);

  useEffect(() => {
    if (phase !== "play") return;

    const skip = (event: KeyboardEvent) => {
      // Space would otherwise also scroll the page down behind the overlay.
      if (event.key === " ") event.preventDefault();
      beginExit();
    };
    window.addEventListener("keydown", skip);
    return () => window.removeEventListener("keydown", skip);
  }, [phase, beginExit]);

  if (phase === "gone") return null;

  const snakeDuration = reducedMotion
    ? TIMING.reducedMotionDurationMs
    : TIMING.totalDurationMs;

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading portfolio. Press any key or click to skip."
      className="fixed inset-0 z-50 flex h-dvh min-h-dvh flex-col px-4 py-4 font-mono md:px-8 md:py-6"
      style={{
        background: COLORS.bg,
        opacity: phase === "exit" ? 0 : 1,
        transition:
          phase === "exit" ? `opacity ${TIMING.fadeMs}ms ease` : "none",
      }}
      onClick={(event) => {
        if (phase !== "play") return;
        const target = event.target as HTMLElement;
        if (target.closest("[data-no-skip]")) return;
        beginExit();
      }}
    >
      {phase === "cover" ? null : (
        <>
          <header className="flex items-center gap-2.5 text-[11px] uppercase tracking-[0.28em] text-white/80">
            <WordmarkIcon />
            <span>{COPY.wordmark}</span>
          </header>

          <div className="mt-6 flex min-h-0 flex-1 flex-col gap-6 md:flex-row md:gap-10">
            <div className="min-h-0 flex-1 overflow-auto pr-1">
              <BootLog visibleCount={visibleCount} timestamps={timestamps} />
            </div>
            <div className="h-[34dvh] w-full shrink-0 md:h-auto md:w-[42%]">
              <PixelSnake
                enabled={!reducedMotion}
                durationMs={snakeDuration}
                onComplete={() => setSnakeDone(true)}
              />
            </div>
          </div>

          <footer className="mt-4 flex items-end justify-between gap-3 text-[10px] uppercase tracking-[0.22em]">
            <a
              href={GITHUB_URL}
              data-no-skip
              target="_blank"
              rel="noopener noreferrer"
              className="transition-opacity hover:opacity-80"
              style={{ color: COLORS.accent }}
              onClick={(event) => event.stopPropagation()}
            >
              {COPY.githubLink}
            </a>

            <p className="hidden text-center text-white/35 sm:block">
              {COPY.skipHint}
            </p>

            <div className="flex items-center gap-2 text-white/45">
              <span
                className="inline-block h-3 w-3 rounded-full border border-white/25 border-t-[#7a00ff] motion-reduce:animate-none animate-spin"
                aria-hidden
              />
              <span>{COPY.loadingLabel}</span>
            </div>
          </footer>

          <p className="mt-2 text-[10px] uppercase tracking-[0.22em] text-white/35 sm:hidden">
            {COPY.skipHint}
          </p>
        </>
      )}
    </div>
  );
}
