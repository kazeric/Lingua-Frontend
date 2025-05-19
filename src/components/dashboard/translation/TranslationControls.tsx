
import React from 'react';
import { Languages, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TranslationControlsProps {
  handleTranslate: () => Promise<void>;
  isTranslating: boolean;
  hasInputText: boolean;
}

export const TranslationControls: React.FC<TranslationControlsProps> = ({
  handleTranslate,
  isTranslating,
  hasInputText
}) => {
  return (
    <div className="flex justify-center mt-6">
      <Button 
        onClick={handleTranslate} 
        disabled={isTranslating || !hasInputText}
        className="px-8 bg-lingua-500 hover:bg-lingua-600"
      >
        {isTranslating ? (
          <>
            <RefreshCcw className="h-4 w-4 mr-2 animate-spin" />
            Translating...
          </>
        ) : (
          <>
            <Languages className="h-4 w-4 mr-2" />
            Translate
          </>
        )}
      </Button>
    </div>
  );
};
