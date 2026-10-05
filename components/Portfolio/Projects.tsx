import { PROJECTS, type Project } from "./content";
import { Reveal } from "./Reveal";
import { Section } from "./Section";
import { SpotlightCard } from "./SpotlightCard";

function Chip({ children }: { children: string }) {
  return (
    <li className="rounded-md border border-white/10 px-2 py-0.5 text-[11px] text-white/60">
      {children}
    </li>
  );
}

function FeaturedCard({ p }: { p: Project }) {
  return (
    <SpotlightCard className="h-full rounded-xl border border-white/10 bg-white/[0.03] p-6 transition-colors hover:border-[#7a00ff]/50">
    <article className="flex h-full flex-col">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] uppercase tracking-[0.22em]">
        <span className="text-[#2dff9a]">{p.kind}</span>
        <span className="text-white/35">{p.status}</span>
      </div>
      <h3 className="mt-3 text-xl font-bold text-white">{p.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-white/60">{p.summary}</p>
      <ul className="mt-4 space-y-2 text-sm leading-relaxed text-white/70">
        {p.highlights.map((h) => (
          <li key={h} className="flex gap-2">
            <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 bg-[#7a00ff]" />
            <span>{h}</span>
          </li>
        ))}
      </ul>
      <ul className="mt-5 flex flex-wrap gap-2">
        {p.stack.map((s) => (
          <Chip key={s}>{s}</Chip>
        ))}
      </ul>
      <a
        href={p.href}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-flex w-fit text-[11px] uppercase tracking-[0.22em] text-[#a66bff] transition hover:text-white"
      >
        View on GitHub ↗
      </a>
    </article>
    </SpotlightCard>
  );
}

function SmallCard({ p }: { p: Project }) {
  return (
    <SpotlightCard className="h-full rounded-xl border border-white/10 bg-white/[0.03] transition-colors hover:border-[#7a00ff]/50">
    <a
      href={p.href}
      target="_blank"
      rel="noopener noreferrer"
      className="block h-full p-5"
    >
      <div className="flex flex-wrap items-center gap-x-3 text-[10px] uppercase tracking-[0.22em]">
        <span className="text-[#2dff9a]">{p.kind}</span>
        <span className="text-white/35">{p.status}</span>
      </div>
      <h3 className="mt-3 text-base font-bold text-white">{p.title} ↗</h3>
      <p className="mt-2 text-sm leading-relaxed text-white/60">{p.summary}</p>
      <ul className="mt-4 flex flex-wrap gap-2">
        {p.stack.map((s) => (
          <Chip key={s}>{s}</Chip>
        ))}
      </ul>
    </a>
    </SpotlightCard>
  );
}

export function Projects() {
  const featured = PROJECTS.filter((p) => p.featured);
  const rest = PROJECTS.filter((p) => !p.featured);

  return (
    <Section id="projects" index="03" label="Projects" title="Things I've built.">
      <div className="grid gap-5 lg:grid-cols-2">
        {featured.map((p, i) => (
          <Reveal key={p.title} delay={i * 110} variant="scale">
            <FeaturedCard p={p} />
          </Reveal>
        ))}
      </div>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        {rest.map((p, i) => (
          <Reveal key={p.title} delay={i * 110} variant="scale">
            <SmallCard p={p} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
