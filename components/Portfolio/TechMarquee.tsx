import { SKILLS } from "./content";

/**
 * Infinite, pause-on-hover ticker of the tech stack. Pure CSS animation.
 * The list is rendered twice; the second copy is hidden from screen readers
 * and the track slides by exactly -50% to loop seamlessly.
 */
export function TechMarquee() {
  const items = Array.from(new Set(SKILLS.flatMap((g) => g.items)));

  return (
    <div className="marquee border-y border-white/5 py-5" aria-label="Tech stack">
      <div className="marquee-track">
        {[false, true].map((isCopy) => (
          <ul
            key={String(isCopy)}
            className="marquee-row"
            aria-hidden={isCopy ? true : undefined}
          >
            {items.map((item) => (
              <li key={item} className="flex items-center gap-8">
                <span>{item}</span>
                <span className="h-1.5 w-1.5 bg-[#7a00ff]" aria-hidden />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
