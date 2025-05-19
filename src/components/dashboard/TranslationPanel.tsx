import React, { useState, useEffect, useRef } from "react";
import { ArrowRight, ArrowLeft, Mic, MicOff, Volume2, Expand, Minimize, RefreshCcw, Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { translateText, speechToText, textToSpeech, saveToHistory } from "@/utils/translation-services";
import {
  Switch,
} from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { LanguageSelector } from "./translation/LanguageSelector";
import { TranslationInput } from "./translation/TranslationInput";
import { TranslationOutput } from "./translation/TranslationOutput";
import { TranslationControls } from "./translation/TranslationControls";
import { LanguageSwitcher } from "./translation/LanguageSwitcher";

interface TranslationPanelProps {
  isExpanded: boolean;
  setIsExpanded: (value: boolean) => void;
}

export const TranslationPanel: React.FC<TranslationPanelProps> = ({ 
  isExpanded, 
  setIsExpanded 
}) => {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [isTranslating, setIsTranslating] = useState(false);
  const [sourceLanguage, setSourceLanguage] = useState("en");
  const [targetLanguage, setTargetLanguage] = useState("gir");
  const [isListening, setIsListening] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isHoveringSwitch, setIsHoveringSwitch] = useState(false);
  const [autoTranslate, setAutoTranslate] = useState(() => {
    return localStorage.getItem('autoTranslate') === 'true';
  });

  // References
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'autoTranslate') {
        setAutoTranslate(e.newValue === 'true');
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  useEffect(() => {
    if (autoTranslate && inputText.trim()) {
      const timer = setTimeout(() => {
        handleTranslate();
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [inputText, autoTranslate]);

  const handleTranslate = async () => {
    if (!inputText || typeof inputText !== 'string' || !inputText.trim()) {
      toast.error("Please enter text to translate");
      return;
    }

    if (sourceLanguage === targetLanguage) {
      toast.error("Source and target languages cannot be the same");
      return;
    }
    
    setIsTranslating(true);
    
    try {
      const translationResult = await translateText({
        text: inputText,
        sourceLang: sourceLanguage,
        targetLang: targetLanguage
      });
      
      setOutputText(translationResult);
      toast.success("Translation complete!");
      
      // Save translation to history
      saveToHistory(
        inputText,
        translationResult,
        getLanguageName(sourceLanguage),
        getLanguageName(targetLanguage),
        true,  // fromDashboard is true
        false  // isDemo is false
      );
      
    } catch (error) {
      console.error("Translation error:", error);
      toast.error("Translation failed. Please try again.");
    } finally {
      setIsTranslating(false);
    }
  };

  const handleVoiceInput = async () => {
    if (isListening) {
      // Stop listening
      setIsListening(false);
      return;
    }
    
    try {
      setIsListening(true);
      toast.info(`Listening in ${getLanguageName(sourceLanguage)}...`);
      
      // Pass only the language parameter as required
      const transcription = await speechToText(sourceLanguage);
      
      if (transcription) {
        setInputText(transcription);
        toast.success("Voice input captured!");
      } else {
        toast.error("No speech detected. Try again.");
      }
    } catch (error) {
      console.error("Voice input error:", error);
      toast.error("Speech recognition failed. Please try again.");
    } finally {
      setIsListening(false);
    }
  };

  const handleTextToSpeech = async () => {
    if (!outputText) return;
    
    try {
      if (isPlaying && audioRef.current) {
        audioRef.current.pause();
        setIsPlaying(false);
        return;
      }
      
      setIsPlaying(true);
      toast.info(`Playing audio in ${getLanguageName(targetLanguage)}...`);
      
      const audioUrl = await textToSpeech(outputText, targetLanguage);
      
      if (audioRef.current) {
        audioRef.current.src = audioUrl;
        audioRef.current.play();
        
        audioRef.current.onended = () => {
          setIsPlaying(false);
        };
      }
    } catch (error) {
      console.error("Text-to-speech error:", error);
      toast.error("Audio playback failed. Please try again.");
      setIsPlaying(false);
    }
  };

  const switchLanguages = () => {
    if (sourceLanguage === targetLanguage) {
      toast.error("Cannot switch identical languages");
      return;
    }

    // Save current state before switching
    const tempSourceLang = sourceLanguage;
    const tempTargetLang = targetLanguage;
    const tempInputText = inputText;
    const tempOutputText = outputText;

    // Set the new state
    setSourceLanguage(tempTargetLang);
    setTargetLanguage(tempSourceLang);
    setInputText(tempOutputText);
    setOutputText(tempInputText);
    setIsFlipped(!isFlipped);
  };

  const getLanguageName = (code) => {
    const languages = {
      en: "English",
      gir: "Giriama",
      fr: "French",
      hau: "Hausa"
    };
    return languages[code] || code;
  };

  return (
    <div className={cn(
      "flex flex-col p-4 md:p-6 h-full transition-all duration-300",
      isExpanded ? "max-w-[1400px] mx-auto w-full" : "max-w-[1000px] mx-auto w-full"
    )}>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Translation Dashboard</h1>
        {!isMobile && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsExpanded(!isExpanded)}
            className="rounded-full"
          >
            {isExpanded ? <Minimize className="h-5 w-5" /> : <Expand className="h-5 w-5" />}
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 flex-1 relative">
        <TranslationInput 
          sourceLanguage={sourceLanguage}
          setSourceLanguage={setSourceLanguage}
          inputText={inputText}
          setInputText={setInputText}
          isListening={isListening}
          handleVoiceInput={handleVoiceInput}
          getLanguageName={getLanguageName}
        />

        <LanguageSwitcher 
          isFlipped={isFlipped}
          isHoveringSwitch={isHoveringSwitch}
          setIsHoveringSwitch={setIsHoveringSwitch}
          switchLanguages={switchLanguages}
          isMobile={isMobile}
        />

        <TranslationOutput 
          targetLanguage={targetLanguage}
          setTargetLanguage={setTargetLanguage}
          outputText={outputText}
          isTranslating={isTranslating}
          isPlaying={isPlaying}
          handleTextToSpeech={handleTextToSpeech}
          switchLanguages={switchLanguages}
          getLanguageName={getLanguageName}
          isMobile={isMobile}
        />
      </div>


      <TranslationControls 
        handleTranslate={handleTranslate}
        isTranslating={isTranslating}
        hasInputText={!!(inputText && typeof inputText === 'string' && inputText.trim())}
      />

      
      {/* Hidden audio element for TTS playback */}
      <audio ref={audioRef} className="hidden" />
    </div>
  );
};