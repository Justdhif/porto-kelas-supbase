"use client";

import HeroSection from "../components/HeroSection";
import FeaturesSection from "../components/FeaturesSection";
import PengurusKelasSection from "../components/PengurusKelasSection";

export default function Home() {

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <HeroSection />

      <FeaturesSection />

      <PengurusKelasSection />
    </div>
  );
}
