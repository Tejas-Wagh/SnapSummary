import HeroSection from "@/components/home/hero-section";
import DemoSection from "@/components/home/demo-section";
import HowItWorksSection from "@/components/home/how-it-works";
import Pricing from "@/components/home/pricing";
import CTASection from "@/components/home/cta-section";

export default function Home() {
  return (
    <div className="relative w-full">
      <div className="flex flex-col">
        <HeroSection />
        <DemoSection />
        <HowItWorksSection />
        <Pricing/>
        <CTASection/>
      </div>
    </div>
  );
}
