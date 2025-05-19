
import React from 'react';
import { Mic, MicOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { LanguageSelector } from "./LanguageSelector";

interface TranslationInputProps {
  sourceLanguage: string;
  setSourceLanguage: (language: string) => void;
  inputText: string;
  setInputText: (text: string) => void;
  isListening: boolean;
  handleVoiceInput: () => Promise<void>;
  getLanguageName: (code: string) => string;
}

export const TranslationInput: React.FC<TranslationInputProps> = ({
  sourceLanguage,
  setSourceLanguage,
  inputText,
  setInputText,
  isListening,
  handleVoiceInput,
  getLanguageName
}) => {
  const languageOptions = [
    { value: "en", label: "English" },
    { value: "gir", label: "Giriama" }
  ];

  return (
    <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden 
                 transition-all duration-300 hover:shadow-md flex flex-col">
      <div className="p-4 border-b border-border flex items-center justify-between">
        <LanguageSelector 
          language={sourceLanguage} 
          setLanguage={setSourceLanguage} 
          getLanguageName={getLanguageName}
          options={languageOptions}
        />
      </div>
      
      <div className="flex-1 p-4">
        <Textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type or speak to translate..."
          className="h-full min-h-[200px] resize-none"
        />
      </div>
      
      <div className="p-4 border-t border-border flex justify-between">
        <Button variant="outline" onClick={() => setInputText("")}>
          Clear
        </Button>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            className={cn(
              "transition-all", 
              isListening && "animate-pulse bg-lingua-100 text-lingua-700"
            )}
            onClick={handleVoiceInput}
          >
            {isListening ? (
              <>
                <MicOff className="h-4 w-4 mr-2" />
                Stop Listening
              </>
            ) : (
              <>
                <Mic className="h-4 w-4 mr-2" />
                Voice Input
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};
