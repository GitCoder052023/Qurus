import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import InteractivePlayer from "@/components/InteractivePlayer";
import EverydayLifeGrid from "@/components/EverydayLifeGrid";
import ComparisonMatrix from "@/components/ComparisonMatrix";
import FeatureDeepDives from "@/components/FeatureDeepDives";
import PhilosophyStory from "@/components/PhilosophyStory";
import ApkDownloadSection from "@/components/ApkDownloadSection";
import FaqAccordion from "@/components/FaqAccordion";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <InteractivePlayer />
        <EverydayLifeGrid />
        <ComparisonMatrix />
        <FeatureDeepDives />
        <PhilosophyStory />
        <ApkDownloadSection />
        <FaqAccordion />
      </main>
      <Footer />
    </div>
  );
}
