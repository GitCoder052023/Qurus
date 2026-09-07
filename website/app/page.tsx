import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import InteractivePlayer from "@/components/InteractivePlayer";
import QurusOverview from "@/components/QurusOverview";
import ComparisonMatrix from "@/components/ComparisonMatrix";
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
        <QurusOverview />
        <ComparisonMatrix />
        <PhilosophyStory />
        <ApkDownloadSection />
        <FaqAccordion />
      </main>
      <Footer />
    </div>
  );
}
