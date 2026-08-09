import HeroSection          from "@/components/sections/HeroSection";
import TrustBar             from "@/components/sections/TrustBar";
import AboutSection         from "@/components/sections/AboutSection";
import ProgramsSection      from "@/components/sections/ProgramsSection";
import StatsSection         from "@/components/sections/StatsSection";
import WhyUsSection         from "@/components/sections/WhyUsSection";
import GallerySection       from "@/components/sections/GallerySection";
import TestimonialsSection  from "@/components/sections/TestimonialsSection";
import AdmissionsCtaSection from "@/components/sections/AdmissionsCtaSection";

/**
 * Structure calquée sur CSI La Gaieté :
 *
 * 1. Hero  ─── plein-écran image/texte gauche + arc doré
 * 2. TrustBar  ─── chiffres clés sobres (fond gris clair)
 * 3. À Propos  ─── présentation 2 colonnes + vidéo
 * 4. Nos Cycles  ─── grille 4 cartes image plein-fond (style "Nos Institutions")
 * 5. Chiffres / Stats  ─── grands chiffres sur image
 * 6. Pourquoi nous  ─── 8 atouts fond sombre
 * 7. Galerie  ─── mosaïque photos
 * 8. Témoignages  ─── cartes parents
 * 9. CTA Admissions  ─── section rouge immersive
 */
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustBar />
      <AboutSection />
      <ProgramsSection />
      <StatsSection />
      <WhyUsSection />
      <GallerySection />
      <TestimonialsSection />
      <AdmissionsCtaSection />
    </>
  );
}
