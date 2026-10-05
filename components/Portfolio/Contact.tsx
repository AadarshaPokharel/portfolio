import { CONTACT, SITE } from "./content";
import { Magnetic } from "./Magnetic";
import { Reveal } from "./Reveal";
import { Section } from "./Section";

export function Contact() {
  return (
    <Section id="contact" index="04" label="Contact" title={CONTACT.heading}>
      <Reveal>
        <p className="max-w-xl text-sm leading-relaxed text-white/65 md:text-base">
          {CONTACT.body}
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Magnetic>
          <a
            href={`mailto:${SITE.email}`}
            className="inline-flex items-center rounded-full bg-[#5b7cfa] px-6 py-3 text-sm font-medium text-white transition hover:brightness-110"
          >
            {SITE.email}
          </a>
          </Magnetic>
          <Magnetic>
          <a
            href={SITE.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-full border border-white/15 px-6 py-3 text-sm text-white/80 transition hover:border-white/35 hover:text-white"
          >
            GitHub ↗
          </a>
          </Magnetic>
        </div>
      </Reveal>
    </Section>
  );
}
