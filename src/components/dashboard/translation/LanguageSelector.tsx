
import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface LanguageSelectorProps {
  language: string;
  setLanguage: (language: string) => void;
  getLanguageName: (code: string) => string;
  options: { value: string; label: string }[];
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  language,
  setLanguage,
  getLanguageName,
  options
}) => {
  return (
    <div className="w-full">
      <Select value={language} onValueChange={setLanguage}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select language">{getLanguageName(language)}</SelectValue>
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
