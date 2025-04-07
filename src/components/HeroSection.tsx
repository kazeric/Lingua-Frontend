
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center justify-center pt-16 leaf-pattern">
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="flex flex-col space-y-6 text-left animate-slide-up">
            <div className="inline-block px-3 py-1 rounded-full bg-lingua-100 text-lingua-700 text-sm font-medium dark:bg-lingua-900/30 dark:text-lingua-300">
              Bridging the Language Gap in Agriculture
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Language Translation for <span className="text-lingua-500">Agricultural Context</span>
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-lg">
              Specialized translation tools to support data collection 
              and knowledge sharing in low-resource agricultural communities.
            </p>
            
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
              <Link to="/dashboard">
                <Button className="bg-lingua-500 hover:bg-lingua-600 text-white px-6 py-6 h-auto text-lg rounded-xl">
                  Get Started
                </Button>
              </Link>
              <a href="#demo">
                <Button variant="outline" className="px-6 py-6 h-auto text-lg rounded-xl">
                  Try Demo
                </Button>
              </a>
            </div>
          </div>
          
          <div className="animate-fade-in">
            <div className="bg-card shadow-xl rounded-xl border border-border overflow-hidden">
              <div className="bg-lingua-500 text-white p-3 text-sm flex items-center">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="mx-auto font-medium">Translation Live Demo</div>
              </div>
              
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="font-medium text-sm text-muted-foreground">English</div>
                  <div className="p-3 bg-muted/30 rounded-md border border-border">
                    How to implement sustainable irrigation systems for small farms?
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="font-medium text-sm text-muted-foreground">Giriama</div>
                  <div className="p-3 bg-lingua-50 rounded-md border border-lingua-100 dark:bg-lingua-900/10 dark:border-lingua-800">
                    Nini kutsaza mfumo wa kumwagiza wa endelofu kwa mashamba madogo?
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="font-medium text-sm text-muted-foreground">English</div>
                  <div className="p-3 bg-muted/30 rounded-md border border-border">
                    When is the best time to plant drought-resistant maize?
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="font-medium text-sm text-muted-foreground">Giriama</div>
                  <div className="p-3 bg-lingua-50 rounded-md border border-lingua-100 dark:bg-lingua-900/10 dark:border-lingua-800">
                    Hani wakati mwema wa kuhamba mahindi ya kustahimili ukame?
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
