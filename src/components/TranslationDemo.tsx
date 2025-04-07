
import React, { useState, useEffect } from "react";
import { ArrowRight, MicIcon, RefreshCcwIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const agriculturalTerms = [
  "irrigation system",
  "crop rotation",
  "sustainable farming",
  "soil fertility",
  "harvest season",
  "drought resistant seeds",
  "organic fertilizer",
  "pest management",
];

const TranslationDemo = () => {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [isTranslating, setIsTranslating] = useState(false);
  const [sourceLanguage, setSourceLanguage] = useState("en");
  const [targetLanguage, setTargetLanguage] = useState("kin");
  
  // Simulated translations
  const translations = {
    "irrigation system": "uburyo bwo kuhira",
    "crop rotation": "guhinduranya ibihingwa",
    "sustainable farming": "ubuhinzi burambye",
    "soil fertility": "uburumbuke bw'ubutaka",
    "harvest season": "igihe cyo gusarura",
    "drought resistant seeds": "imbuto zihanganira amapfa",
    "organic fertilizer": "ifumbire mvaruganda",
    "pest management": "gucunga ibyonnyi",
  };

  const handleTranslate = () => {
    if (!inputText.trim()) return;
    
    setIsTranslating(true);
    
    // Simulate translation process
    setTimeout(() => {
      if (translations[inputText.toLowerCase()]) {
        setOutputText(translations[inputText.toLowerCase()]);
      } else {
        // Simulated translation for non-matching text
        setOutputText("Byahuwe (translated text would appear here)");
      }
      setIsTranslating(false);
    }, 1000);
  };

  const handleSampleClick = (term) => {
    setInputText(term);
    
    // Trigger translation automatically when sample is clicked
    setTimeout(() => {
      setIsTranslating(true);
      setTimeout(() => {
        setOutputText(translations[term.toLowerCase()]);
        setIsTranslating(false);
      }, 800);
    }, 100);
  };

  useEffect(() => {
    // Automatically translate after a short delay when input changes
    if (inputText.trim()) {
      const handler = setTimeout(() => {
        handleTranslate();
      }, 1000);
      return () => clearTimeout(handler);
    }
  }, [inputText]);

  return (
    <section id="demo" className="py-16 md:py-24 leaf-pattern">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12 animate-slide-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Try Our Agricultural Translation
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Experience the specialized translation capabilities designed for agricultural terminology.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-card rounded-xl p-6 md:p-8 border border-border shadow-md animate-grow">
            <div className="flex flex-col md:flex-row gap-6 mb-6">
              <div className="flex-1">
                <label className="block text-sm font-medium mb-2">From:</label>
                <Select defaultValue={sourceLanguage} onValueChange={setSourceLanguage}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="sw">Swahili</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="hidden md:flex items-center justify-center">
                <div className="p-2 rounded-full bg-lingua-50 dark:bg-lingua-900/20">
                  <ArrowRight className="h-5 w-5 text-lingua-500" />
                </div>
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium mb-2">To:</label>
                <Select defaultValue={targetLanguage} onValueChange={setTargetLanguage}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kin">Kinyarwanda</SelectItem>
                    <SelectItem value="lug">Luganda</SelectItem>
                    <SelectItem value="hau">Hausa</SelectItem>
                    <SelectItem value="yor">Yoruba</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium">Enter text:</label>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 text-muted-foreground"
                    onClick={() => setInputText("")}
                  >
                    Clear
                  </Button>
                </div>
                <Textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Type agricultural terms or sentences..."
                  className="h-40 resize-none"
                />
                <div className="flex justify-between mt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 text-muted-foreground"
                  >
                    <MicIcon className="h-4 w-4 mr-1" />
                    Voice
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 text-muted-foreground"
                    onClick={handleTranslate}
                    disabled={!inputText.trim() || isTranslating}
                  >
                    {isTranslating ? (
                      <>
                        <RefreshCcwIcon className="h-4 w-4 mr-1 animate-spin" />
                        Translating...
                      </>
                    ) : (
                      "Translate"
                    )}
                  </Button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Translation:</label>
                <div className="h-40 bg-muted/30 border border-border rounded-md p-3 overflow-auto">
                  {isTranslating ? (
                    <div className="h-full flex items-center justify-center">
                      <RefreshCcwIcon className="h-6 w-6 text-muted-foreground animate-spin" />
                    </div>
                  ) : (
                    <p className="text-base">{outputText}</p>
                  )}
                </div>
                <div className="flex justify-end mt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 text-muted-foreground"
                    disabled={!outputText}
                  >
                    <MicIcon className="h-4 w-4 mr-1" />
                    Listen
                  </Button>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-sm font-medium mb-3">Try with agricultural terms:</h3>
              <div className="flex flex-wrap gap-2">
                {agriculturalTerms.map((term, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="text-xs bg-lingua-50 hover:bg-lingua-100 border-lingua-200 dark:bg-lingua-900/10 dark:border-lingua-800 dark:hover:bg-lingua-900/20"
                    onClick={() => handleSampleClick(term)}
                  >
                    {term}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TranslationDemo;
