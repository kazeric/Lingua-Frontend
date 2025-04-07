
import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeatureSection from "@/components/FeatureSection";
import LanguageSelector from "@/components/LanguageSelector";
import TranslationDemo from "@/components/TranslationDemo";
import Footer from "@/components/Footer";

const Index = () => {
  // Add entrance animations when the page loads
  useEffect(() => {
    // Add animation to elements as they enter the viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target.classList.contains("animate-on-scroll")) {
              entry.target.classList.add("animate-slide-up");
              observer.unobserve(entry.target);
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    // Select all elements to animate
    document.querySelectorAll(".animate-on-scroll").forEach((el) => {
      observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main>
        <HeroSection />
        <FeatureSection />
        <LanguageSelector />
        <TranslationDemo />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
