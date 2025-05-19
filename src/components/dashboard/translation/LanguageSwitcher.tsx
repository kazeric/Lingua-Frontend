
import React from 'react';
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface LanguageSwitcherProps {
  isFlipped: boolean;
  isHoveringSwitch: boolean;
  setIsHoveringSwitch: (value: boolean) => void;
  switchLanguages: () => void;
  isMobile: boolean;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  isFlipped,
  isHoveringSwitch,
  setIsHoveringSwitch,
  switchLanguages,
  isMobile
}) => {
  if (isMobile) return null;
  
  return (
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
  );
};
