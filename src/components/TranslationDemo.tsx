import React, { useState, useRef } from "react";
import { ArrowRight, MicIcon, RefreshCwIcon, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  translateText,
  speechToText,
  textToSpeech,
  saveToHistory
} from "@/utils/translation";

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

// Giriama translations of agricultural terms
const giriamaTrans = [
  "mfumo wa kunyunyizia",
  "kubadilisha mimea",
  "kilimo endelevu",
  "rutuba ya udongo",
  "majira ya mavuno",
  "mbegu zinazostahimili ukame",
  "mbolea ya asili",
  "kudhibiti wadudu",
];

const TranslationDemo = () => {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [isTranslating, setIsTranslating] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [sourceLanguage, setSourceLanguage] = useState("en");
  const [targetLanguage, setTargetLanguage] = useState("nyf");
  const [translationDirection, setTranslationDirection] = useState("en-to-nyf");
  
  // Reference for audio element
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  const handleSampleClick = async (term) => {
    setInputText(term);
    
    // Trigger translation automatically when sample is clicked
    setTimeout(async () => {
      setIsTranslating(true);
      try {
        const translatedText = await translateText({
          text: term,
          sourceLang: sourceLanguage === "en" ? "en" : "gir",
          targetLang: targetLanguage === "nyf" ? "gir" : "en"
        });
        
        setOutputText(translatedText);
        
        // Save to history as a demo translation
        saveToHistory(
          term,
          translatedText,
          sourceLanguage === "en" ? "English" : "Giriama",
          targetLanguage === "nyf" ? "Giriama" : "English",
          false, // fromDashboard is false
          true   // isDemo is true
        );
      } catch (error) {
        console.error("Translation error:", error);
        
        // Fallback to hardcoded translations if API fails
        if (translationDirection === "en-to-nyf") {
          const index = agriculturalTerms.findIndex(item => 
            item.toLowerCase() === term.toLowerCase());
          
          if (index !== -1) {
            setOutputText(giriamaTrans[index]);
          } else {
            setOutputText("Translation not available");
          }
        } else {
          const index = giriamaTrans.findIndex(item => 
            item.toLowerCase() === term.toLowerCase());
          
          if (index !== -1) {
            setOutputText(agriculturalTerms[index]);
          } else {
            setOutputText("Translation not available");
          }
        }
      } finally {
        setIsTranslating(false);
      }
    }, 100);
  };

  const handleVoiceInput = async () => {
    if (isListening) return;
    
    try {
      setIsListening(true);
      
      const lang = sourceLanguage === "en" ? "en" : "gir";
      const transcription = await speechToText(lang);
      
      if (transcription) {
        setInputText(transcription);
        toast.success("Voice input captured!");
      }
    } catch (error) {
      console.error("Voice input error:", error);
      toast.error("Speech recognition failed. Please try again.");
    } finally {
      setIsListening(false);
    }
  };

  const handleTextToSpeech = async () => {
    if (!outputText || isPlaying) {
      if (audioRef.current) {
        audioRef.current.pause();
        setIsPlaying(false);
      }
      return;
    }
    
    try {
      setIsPlaying(true);
      
      const lang = targetLanguage === "nyf" ? "gir" : "en";
      const audioUrl = await textToSpeech(outputText, lang);
      
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

  const switchDirection = () => {
    if (translationDirection === "en-to-nyf") {
      setTranslationDirection("nyf-to-en");
      setSourceLanguage("nyf");
      setTargetLanguage("en");
      // Swap input and output
      if (inputText) {
        const tempText = inputText;
        setInputText(outputText);
        setOutputText(tempText);
      }
    } else {
      setTranslationDirection("en-to-nyf");
      setSourceLanguage("en");
      setTargetLanguage("nyf");
      // Swap input and output
      if (inputText) {
        const tempText = inputText;
        setInputText(outputText);
        setOutputText(tempText);
      }
    }
  };

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
                <Select defaultValue={sourceLanguage} value={sourceLanguage} onValueChange={setSourceLanguage}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="nyf">Giriama</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="hidden md:flex items-center justify-center">
                <button 
                  className="p-2 rounded-full bg-lingua-50 hover:bg-lingua-100 dark:bg-lingua-900/20 dark:hover:bg-lingua-900/40 transition-all"
                  onClick={switchDirection}
                  aria-label="Switch translation direction"
                >
                  <ArrowRight className="h-5 w-5 text-lingua-500 transition-transform hover:rotate-180" />
                </button>
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium mb-2">To:</label>
                <Select defaultValue={targetLanguage} value={targetLanguage} onValueChange={setTargetLanguage}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="nyf">Giriama</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium">Demo text:</label>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    disabled={isListening}
                    onClick={handleVoiceInput}
                    className={isListening ? "animate-pulse" : ""}
                  >
                    <MicIcon className="h-4 w-4" />
                  </Button>
                </div>
                <Textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Select an agricultural term below..."
                  className="h-40 resize-none"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium">Translation:</label>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    disabled={!outputText || isTranslating}
                    onClick={handleTextToSpeech}
                    className={isPlaying ? "animate-pulse" : ""}
                  >
                    <Volume2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="h-40 bg-muted/30 border border-border rounded-md p-3 overflow-auto">
                  {isTranslating ? (
                    <div className="h-full flex items-center justify-center">
                      <RefreshCwIcon className="h-6 w-6 text-muted-foreground animate-spin" />
                    </div>
                  ) : (
                    <p className="text-base">{outputText}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-sm font-medium mb-3">Try with agricultural terms:</h3>
              <div className="flex flex-wrap gap-2">
                {(translationDirection === "en-to-nyf" ? agriculturalTerms : giriamaTrans).map((term, index) => (
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
            
            <div className="mt-6 text-center">
              <Link to="/dashboard" className="inline-block">
                <Button className="bg-lingua-500 hover:bg-lingua-600 text-white px-6">
                  Go to Full Translation Tool
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Hidden audio element for TTS playback */}
      <audio ref={audioRef} className="hidden" />
    </section>
  );
};

export default TranslationDemo;
