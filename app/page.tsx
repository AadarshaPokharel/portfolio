import { Hero } from "@/components/Hero/Hero";
import { Preloader } from "@/components/Intro/Preloader";
import { About } from "@/components/Portfolio/About";
import { Contact } from "@/components/Portfolio/Contact";
import { CursorGlow } from "@/components/Portfolio/CursorGlow";
import { Footer } from "@/components/Portfolio/Footer";
import { Nav } from "@/components/Portfolio/Nav";
import { Projects } from "@/components/Portfolio/Projects";
import { ScrollEffects } from "@/components/Portfolio/ScrollEffects";
import { Skills } from "@/components/Portfolio/Skills";
import { TechMarquee } from "@/components/Portfolio/TechMarquee";

export default function Home() {
  return (
    <>
      <ScrollEffects />
      <CursorGlow />
      <Nav />
      <main className="relative">
        <Hero />
        <TechMarquee />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
      {/* Unmounts itself after the sequence (or skip) and reveals the page. */}
      <Preloader />
    </>
  );
}
