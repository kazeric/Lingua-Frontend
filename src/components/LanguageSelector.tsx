
import React, { useState } from "react";
import { Check, ChevronDown, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Sample of low-resource languages particularly in agricultural regions
const languages = {
  african: [
    { code: "en", name: "English" },
    { code: "nyf", name: "Giriama" },
  ],
};

const LanguageSelector = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("Giriama");

  const scrollToContribute = () => {
    const contributeSection = document.getElementById('contribute');
    if (contributeSection) {
      contributeSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="languages" className="py-16 md:py-24 bg-accent/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/2 animate-slide-right">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Supporting Low-Resource Languages
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Our platform prioritizes languages that are critical to agricultural
              communities but often overlooked by mainstream translation tools.
            </p>
            
            <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium">Currently Selected:</h3>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="rounded-full">
                      <Globe className="h-4 w-4 mr-2 text-lingua-500" />
                      {selectedLanguage}
                      <ChevronDown className="h-4 w-4 ml-2" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    {Object.values(languages)
                      .flat()
                      .map((lang) => (
                        <DropdownMenuItem
                          key={lang.code}
                          className="cursor-pointer"
                          onClick={() => setSelectedLanguage(lang.name)}
                        >
                          {lang.name}
                          {selectedLanguage === lang.name && (
                            <Check className="h-4 w-4 ml-auto" />
                          )}
                        </DropdownMenuItem>
                      ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              
              <div className="bg-muted/50 rounded-lg p-4">
                <p className="text-sm text-muted-foreground mb-2">Currently Available:</p>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="font-medium">Primary Language:</div>
                  <div>English</div>
                  <div className="font-medium">Target Language:</div>
                  <div>Giriama</div>
                  <div className="font-medium">Agricultural Terms:</div>
                  <div className="text-lingua-500">500+ translated</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="md:w-1/2 animate-slide-left">
            <div className="bg-card rounded-xl p-6 border border-border shadow-md">
              <Tabs defaultValue="african" className="w-full">
                <TabsList className="grid mb-6">
                  <TabsTrigger value="african">African</TabsTrigger>
                </TabsList>
                
                <TabsContent value="african" className="mt-0">
                  <div className="grid grid-cols-2 gap-3">
                    {languages.african.map((lang) => (
                      <div 
                        key={lang.code}
                        className={`rounded-lg p-4 border transition-colors cursor-pointer ${
                          selectedLanguage === lang.name
                            ? "border-lingua-500 bg-lingua-50 dark:bg-lingua-900/20"
                            : "border-border bg-card hover:bg-accent/50"
                        }`}
                        onClick={() => setSelectedLanguage(lang.name)}
                      >
                        <div className="flex flex-col items-start">
                          <span className="font-medium text-lg mb-1">{lang.name}</span>
                          <span className="text-xs text-muted-foreground">
                            {lang.code.toUpperCase()}
                          </span>
                          {selectedLanguage === lang.name && (
                            <span className="text-xs mt-2 bg-lingua-100 dark:bg-lingua-900/30 text-lingua-700 dark:text-lingua-300 px-2 py-0.5 rounded-full">
                              Currently selected
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
              
              <div className="mt-6 pt-6 border-t border-border">
                <p className="text-sm text-muted-foreground mb-4">
                  Don't see the language you need? Let us know:
                </p>
                <Button
                  className="w-full bg-lingua-500 hover:bg-lingua-600 text-white"
                  onClick={scrollToContribute}
                >
                  Request a Language
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LanguageSelector;
