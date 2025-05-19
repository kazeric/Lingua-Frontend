
import React from 'react';
import { ArrowRight, Volume2, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LanguageSelector } from "./LanguageSelector";

interface TranslationOutputProps {
  targetLanguage: string;
  setTargetLanguage: (language: string) => void;
  outputText: string;
  isTranslating: boolean;
  isPlaying: boolean;
  handleTextToSpeech: () => Promise<void>;
  switchLanguages: () => void;
  getLanguageName: (code: string) => string;
  isMobile: boolean;
}

export const TranslationOutput: React.FC<TranslationOutputProps> = ({
  targetLanguage,
  setTargetLanguage,
  outputText,
  isTranslating,
  isPlaying,
  handleTextToSpeech,
  switchLanguages,
  getLanguageName,
  isMobile
}) => {
  const languageOptions = [
    { value: "gir", label: "Giriama" },
    { value: "en", label: "English" }
  ];

  return (
    <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden 
                 transition-all duration-300 hover:shadow-md flex flex-col">
      <div className="p-4 border-b border-border flex items-center justify-between">
        <LanguageSelector 
          language={targetLanguage} 
          setLanguage={setTargetLanguage} 
          getLanguageName={getLanguageName}
          options={languageOptions}
        />
      </div>
      
      <div className="flex-1 p-4 flex flex-col">
        {isTranslating ? (
          <div className="flex-1 flex items-center justify-center">
            <RefreshCw className="h-8 w-8 text-muted-foreground animate-spin" />
          </div>
        ) : (
          <div className="flex-1 bg-muted/30 rounded-md p-4 h-full min-h-[200px]">
            {outputText ? (
              <p>{outputText}</p>
            ) : (
              <p className="text-muted-foreground">Translation will appear here...</p>
            )}
          </div>
        )}
      </div>
      
      <div className="p-4 border-t border-border flex justify-between">
        <div>
          <Button 
            variant="outline" 
            className="md:hidden mr-2"
            onClick={switchLanguages}
          >
            <div className="flex items-center">
              <ArrowRight className="h-4 w-4 mr-2" />
              Switch
            </div>
          </Button>
        </div>
        <Button 
          variant="outline" 
          onClick={handleTextToSpeech}
          disabled={!outputText}
          className={isPlaying ? "bg-lingua-100 text-lingua-700" : ""}
        >
          <Volume2 className="h-4 w-4 mr-2" />
          {isPlaying ? "Stop" : "Listen"}
        </Button>
      </div>
    </div>
  );
};
