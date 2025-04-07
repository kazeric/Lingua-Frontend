
import React, { useEffect, useState } from "react";
import { ArrowRight, Globe, RefreshCw, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  const [translateAnimation, setTranslateAnimation] = useState(false);
  const farmWords = [
    { en: "harvest", translated: "mavuno" },
    { en: "crops", translated: "mazao" },
    { en: "farm", translated: "shamba" },
    { en: "irrigation", translated: "umwagiliaji" },
  ];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    // Start animation immediately
    setTranslateAnimation(true);

    // Word animation interval
    const interval = setInterval(() => {
      setTranslateAnimation(false);
      
      // After animation out, change the word
      setTimeout(() => {
        setCurrentWordIndex((prev) => (prev + 1) % farmWords.length);
        setTranslateAnimation(true);
      }, 500);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="pt-28 pb-16 md:pt-32 md:pb-24 overflow-hidden leaf-pattern">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-slide-right">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Bridging Language Gaps in{" "}
              <span className="text-lingua-500">Agricultural Data</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-md">
              Empowering farmers and researchers to collect and share agricultural knowledge
              across language barriers, especially for low-resource languages.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                className="bg-lingua-500 hover:bg-lingua-600 h-12 px-6 rounded-full text-white font-medium"
                size="lg"
              >
                Start Translating
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                className="h-12 px-6 rounded-full font-medium border-lingua-300"
                size="lg"
              >
                Contribute Data
              </Button>
            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-lingua-500" />
                <span>25+ Languages</span>
              </div>
              <div className="flex items-center gap-2">
                <Wand2 className="h-5 w-5 text-lingua-500" />
                <span>AI-Powered</span>
              </div>
            </div>
          </div>

          <div className="relative min-h-[320px] bg-gradient-to-br from-lingua-50 to-lingua-100 rounded-2xl p-6 border border-lingua-200 shadow-lg animate-slide-left">
            <div className="absolute top-6 left-0 right-0 flex justify-center">
              <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
                <RefreshCw className="h-4 w-4 text-lingua-500 animate-pulse" />
                <span className="text-sm font-medium text-lingua-700">
                  Agricultural Translation
                </span>
              </div>
            </div>

            <div className="mt-16 grid grid-cols-2 gap-6">
              <div className="bg-white/70 backdrop-blur-sm p-4 rounded-lg shadow-sm">
                <h3 className="text-sm font-medium text-muted-foreground mb-2">
                  English
                </h3>
                <p className={`text-xl font-medium ${translateAnimation ? 'animate-grow' : 'opacity-0'}`}>
                  {farmWords[currentWordIndex].en}
                </p>
              </div>

              <div className="bg-lingua-500/10 backdrop-blur-sm p-4 rounded-lg shadow-sm">
                <h3 className="text-sm font-medium text-muted-foreground mb-2">
                  Swahili
                </h3>
                <p className={`text-xl font-medium text-lingua-700 ${translateAnimation ? 'animate-grow' : 'opacity-0'}`}>
                  {farmWords[currentWordIndex].translated}
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3">
              <div className="bg-white/70 backdrop-blur-sm p-3 rounded-lg shadow-sm w-3/4">
                <div className="h-3 bg-lingua-100 rounded-full animate-pulse-light"></div>
              </div>
              <div className="bg-white/70 backdrop-blur-sm p-3 rounded-lg shadow-sm w-1/2 ml-auto">
                <div className="h-3 bg-lingua-100 rounded-full animate-pulse-light"></div>
              </div>
            </div>
            
            <div className="absolute bottom-6 right-6">
              <Button
                size="sm"
                className="rounded-full h-8 bg-lingua-500/90 hover:bg-lingua-500 text-white"
              >
                <ArrowRight className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
