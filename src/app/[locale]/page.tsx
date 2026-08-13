import HeroSection          from "@/components/sections/HeroSection";
import TrustBar             from "@/components/sections/TrustBar";
import AboutSection         from "@/components/sections/AboutSection";
import DirectriceSection    from "@/components/sections/DirectriceSection";
import ProgramsSection      from "@/components/sections/ProgramsSection";
import ExcellenceSection    from "@/components/sections/ExcellenceSection";
import StatsSection         from "@/components/sections/StatsSection";
import WhyUsSection         from "@/components/sections/WhyUsSection";
import GallerySection       from "@/components/sections/GallerySection";
import TestimonialsSection  from "@/components/sections/TestimonialsSection";
import AdmissionsCtaSection from "@/components/sections/AdmissionsCtaSection";

/**
 * Homepage — Structure calquée sur CSI La Gaieté :
 *
 * 1. Hero        — slider 4 cycles, CTA par slide, fusion header desktop
 * 2. TrustBar    — 4 piliers iconographiques fond blanc
 * 3. À Propos    — 3 photos empilées + stats flottant + onglets mission/vision
 * 4. Nos Cycles  — grille 4 cartes image plein-fond
 * 5. Pôles       — 6 infrastructures/pôles d'excellence
 * 6. Stats       — compteurs animés sur fond image (bug compteurs corrigé)
 * 7. Pourquoi    — 8 atouts fond sombre
 * 8. Galerie     — mosaïque photos
 * 9. Témoignages — 3 cartes parents
 * 10. CTA        — section rouge immersive
 */
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustBar />
      <AboutSection />
      <DirectriceSection />
      <ProgramsSection />
      <ExcellenceSection />
      <StatsSection />
      <WhyUsSection />
      <GallerySection />
      <TestimonialsSection />
      <AdmissionsCtaSection />
    </>
  );
}
