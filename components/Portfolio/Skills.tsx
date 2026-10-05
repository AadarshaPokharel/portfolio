import { SKILLS } from "./content";
import { Reveal } from "./Reveal";
import { Section } from "./Section";
import { SpotlightCard } from "./SpotlightCard";

export function Skills() {
  return (
    <Section id="skills" index="02" label="Skills" title="What I work with.">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SKILLS.map((g, i) => (
          <Reveal key={g.group} delay={i * 70} variant="scale">
            <SpotlightCard tilt className="h-full rounded-xl border border-white/10 bg-white/[0.03] p-5">
              <h3 className="text-[10px] uppercase tracking-[0.22em] text-[#2dff9a]">
                {g.group}
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {g.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-md border border-[#7a00ff]/40 bg-[#7a00ff]/10 px-2.5 py-1 text-xs text-white/85"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
