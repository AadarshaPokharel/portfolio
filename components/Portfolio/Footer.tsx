import { SITE } from "./content";

export function Footer() {
  return (
    <footer className="border-t border-white/5 px-6 py-8">
      <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-2 text-[10px] uppercase tracking-[0.22em] text-white/35 sm:flex-row sm:items-center">
        <p>© {new Date().getFullYear()} {SITE.name}</p>
        <p>Built with Next.js · Tailwind CSS</p>
      </div>
    </footer>
  );
}
