
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { FeatureSection } from "@/components/FeatureSection";
import { Footer } from "@/components/Footer";
import { AnimatedBenefitBanner } from "@/components/AnimatedBenefitBanner";
import { useLanguage } from "@/contexts/LanguageContext";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <AnimatedBenefitBanner />
        <FeatureSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
