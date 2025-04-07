
import React, { useState } from "react";
import { ArrowRight, ArrowLeft, Mic, Volume2, Expand, Minimize, RefreshCcw } from "lucide-react";
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
  const [targetLanguage, setTargetLanguage] = useState("kin");
  const [isListening, setIsListening] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isHoveringSwitch, setIsHoveringSwitch] = useState(false);
  
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
    if (!inputText.trim()) {
      toast.error("Please enter text to translate");
      return;
    }
    
    setIsTranslating(true);
    
    // Simulate translation process
    setTimeout(() => {
      if (translations[inputText.toLowerCase()]) {
        setOutputText(translations[inputText.toLowerCase()]);
        toast.success("Translation complete!");
      } else {
        // Simulated translation for non-matching text
        setOutputText("Byahuwe (translated text would appear here)");
      }
      setIsTranslating(false);
    }, 1000);
  };

  const handleVoiceInput = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      setIsListening(true);
      toast.info("Listening...");
      
      // Simulate voice recognition
      setTimeout(() => {
        setInputText("irrigation system");
        setIsListening(false);
        toast.success("Voice input captured!");
      }, 2000);
    } else {
      toast.error("Speech recognition not supported in your browser");
    }
  };

  const handleTextToSpeech = () => {
    if (!outputText) return;
    
    toast.info("Playing audio...");
    
    // Simulate text-to-speech
    // In a real app, you would use the Web Speech API here
  };

  const switchLanguages = () => {
    setIsFlipped(!isFlipped);
    const temp = sourceLanguage;
    setSourceLanguage(targetLanguage);
    setTargetLanguage(temp);
    setInputText(outputText);
    setOutputText(inputText);
  };

  return (
    <div className={cn(
      "flex flex-col p-4 md:p-6 h-full transition-all duration-300",
      isExpanded ? "max-w-[1400px] mx-auto w-full" : "max-w-[1000px] mx-auto w-full"
    )}>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Translation Dashboard</h1>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsExpanded(!isExpanded)}
          className="rounded-full"
        >
          {isExpanded ? <Minimize className="h-5 w-5" /> : <Expand className="h-5 w-5" />}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 flex-1 relative">
        {/* Source Language Panel */}
        <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden 
                     transition-all duration-300 hover:shadow-md flex flex-col">
          <div className="p-4 border-b border-border flex items-center justify-between">
            <div className="w-full">
              <Select value={sourceLanguage} onValueChange={setSourceLanguage}>
                <SelectTrigger className="w-full">
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
            <Button 
              variant="outline" 
              className={cn(
                "transition-all", 
                isListening && "animate-pulse bg-lingua-100 text-lingua-700"
              )}
              onClick={handleVoiceInput}
            >
              <Mic className="h-4 w-4 mr-2" />
              Voice Input
            </Button>
          </div>
        </div>

        {/* Direction Switch Button (fixed in the middle) */}
        <div className="hidden md:flex items-center justify-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          <Button 
            variant="outline" 
            size="icon" 
            className="rounded-full h-12 w-12 bg-card border border-border shadow-md transition-transform"
            onClick={switchLanguages}
            onMouseEnter={() => setIsHoveringSwitch(true)}
            onMouseLeave={() => setIsHoveringSwitch(false)}
          >
            <div className={cn(
              "transition-all duration-300",
              isHoveringSwitch && "rotate-180" 
            )}>
              {isFlipped ? <ArrowLeft className="h-5 w-5" /> : <ArrowRight className="h-5 w-5" />}
            </div>
          </Button>
        </div>

        {/* Target Language Panel */}
        <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden 
                     transition-all duration-300 hover:shadow-md flex flex-col">
          <div className="p-4 border-b border-border flex items-center justify-between">
            <div className="w-full">
              <Select value={targetLanguage} onValueChange={setTargetLanguage}>
                <SelectTrigger className="w-full">
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
          
          <div className="flex-1 p-4 flex flex-col">
            {isTranslating ? (
              <div className="flex-1 flex items-center justify-center">
                <RefreshCcw className="h-8 w-8 text-muted-foreground animate-spin" />
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
              {/* Mobile direction switch button */}
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
            >
              <Volume2 className="h-4 w-4 mr-2" />
              Listen
            </Button>
          </div>
        </div>
      </div>

      {/* Added Translate Button */}
      <div className="flex justify-center mt-6">
        <Button 
          onClick={handleTranslate} 
          disabled={isTranslating || !inputText.trim()}
          className="px-8 bg-lingua-500 hover:bg-lingua-600"
        >
          {isTranslating ? (
            <>
              <RefreshCcw className="h-4 w-4 mr-2 animate-spin" />
              Translating...
            </>
          ) : (
            "Translate"
          )}
        </Button>
      </div>
    </div>
  );
};
