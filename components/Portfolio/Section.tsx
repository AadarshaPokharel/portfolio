import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

/** Shared section frame: anchor id, numbered mono label and heading. */
export function Section({
  id,
  index,
  label,
  title,
  children,
}: {
  id: string;
  index: string;
  label: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-14 px-6 py-20 md:py-28">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <p className="text-[11px] uppercase tracking-[0.28em] text-white/40">
            <span className="text-[#2dff9a]">{index}</span> / {label}
          </p>
        </Reveal>
        <Reveal variant="mask" delay={80}>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white md:text-5xl">
            {title}
          </h2>
        </Reveal>
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}
