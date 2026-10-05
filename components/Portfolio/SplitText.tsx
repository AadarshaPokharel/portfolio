import type { CSSProperties } from "react";

/**
 * Splits a string into masked, per-character spans so CSS can rise each
 * letter in with a stagger (see .split / .char in globals.css).
 * Server-rendered: no JS needed, the animation is gated by html[data-intro].
 */
export function SplitText({ text }: { text: string }) {
  const words = text.split(" ");
  let n = 0;

  return (
    <span className="split" aria-hidden>
      {words.map((word, wi) => (
        <span key={wi}>
          <span className="word">
            {[...word].map((ch, ci) => {
              const index = n++;
              return (
                <span
                  key={ci}
                  className="char"
                  style={{ "--i": index } as CSSProperties}
                >
                  {ch}
                </span>
              );
            })}
          </span>
          {wi < words.length - 1 ? " " : null}
        </span>
      ))}
    </span>
  );
}
