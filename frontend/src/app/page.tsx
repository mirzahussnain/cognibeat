import { Navbar, Footer, NoiseOverlay } from "@/shared/components/layout";
import { HeroSection, ScienceOfFlow, TechStackMarquee } from "@/features/landing/sections";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="bg-background relative">
        <NoiseOverlay />
        <HeroSection />
        <TechStackMarquee />
        <ScienceOfFlow />
        <Footer />
      </main>
    </>
  );
}