import HeroSection          from "@/components/sections/HeroSection";
import TrustBar             from "@/components/sections/TrustBar";
import AboutSection         from "@/components/sections/AboutSection";
import StatsSection         from "@/components/sections/StatsSection";
import ProgramsSection      from "@/components/sections/ProgramsSection";
import WhyUsSection         from "@/components/sections/WhyUsSection";
import GallerySection       from "@/components/sections/GallerySection";
import TestimonialsSection  from "@/components/sections/TestimonialsSection";
import AdmissionsCtaSection from "@/components/sections/AdmissionsCtaSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustBar />
      <AboutSection />
      <StatsSection />
      <ProgramsSection />
      <WhyUsSection />
      <GallerySection />
      <TestimonialsSection />
      <AdmissionsCtaSection />
    </>
  );
}
