"use client";

import { BOOT_ENTRIES, COLORS } from "./constants";

type BootLogProps = {
  visibleCount: number;
  timestamps: string[];
};

export function BootLog({ visibleCount, timestamps }: BootLogProps) {
  return (
    <ol className="flex flex-col gap-2 font-mono text-[10px] uppercase leading-relaxed tracking-[0.18em] md:text-[11px]">
      {BOOT_ENTRIES.slice(0, visibleCount).map((entry, index) => {
        const isNewest = index === visibleCount - 1;
        const stamp = timestamps[index] ?? "--:--:--";
        const color = entry.kind === "text" && entry.highlight
          ? COLORS.textBright
          : isNewest
            ? COLORS.textMid
            : COLORS.textDim;

        return (
          <li key={index} className="flex gap-3" style={{ color }}>
            <time
              className="shrink-0 tabular-nums opacity-80"
              dateTime={stamp}
            >
              {stamp}
            </time>
            {entry.kind === "box" ? (
              <pre className="whitespace-pre font-mono leading-[1.35] opacity-70">
                {entry.lines.join("\n")}
              </pre>
            ) : (
              <span className={entry.highlight ? "tracking-[0.14em]" : undefined}>
                {entry.text}
              </span>
            )}
          </li>
        );
      })}
    </ol>
  );
}
