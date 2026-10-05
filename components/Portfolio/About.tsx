import { ABOUT } from "./content";
import { Reveal } from "./Reveal";
import { ScrollFill } from "./ScrollFill";
import { Section } from "./Section";

export function About() {
  return (
    <Section id="about" index="01" label="About" title="Hi, I'm Aadarsha.">
      <div className="grid gap-10 md:grid-cols-[1.4fr_1fr]">
        <div className="space-y-6">
          {ABOUT.paragraphs.map((p) => (
            <ScrollFill
              key={p}
              text={p}
              className="text-base leading-relaxed text-white/85 md:text-lg"
            />
          ))}
        </div>

        <Reveal delay={120}>
          <dl className="divide-y divide-white/10 rounded-xl border border-white/10 bg-white/[0.03]">
            {ABOUT.facts.map((f) => (
              <div key={f.label} className="flex items-baseline justify-between gap-4 px-4 py-3">
                <dt className="text-[10px] uppercase tracking-[0.22em] text-white/40">
                  {f.label}
                </dt>
                <dd className="text-right text-sm text-white/85">{f.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </Section>
  );
}
