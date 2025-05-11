
// Types for the translation services
export interface TranslationRequest {
  text: string;
  sourceLang: string;
  targetLang: string;
}

export interface TranslationResponse {
  translatedText: string;
  error?: string;
}

export interface SpeechRecognitionSettings {
  continuous?: boolean;
  interimResults?: boolean;
}

export interface HistoryItem {
  id: number;
  sourceText: string;
  translatedText: string;
  sourceLang: string;
  targetLang: string;
  date: string;
  fromDashboard: boolean;
  isDemo?: boolean;
}

// Configuration types for model endpoints
export interface ModelConfig {
  translation: Record<string, string>;
  asr: {
    en: {
      type: string;
      apiKey: string;
    };
    gir: string;
  };
  tts: {
    en: {
      type: string;
      apiKey: string;
    };
    gir: string;
  };
}

export interface ModelEndpointConfig {
  enToGiriamaUrl?: string;
  giriamaToEnUrl?: string;
  giriamaAsrUrl?: string;
  giriamaTtsUrl?: string;
  googleAsrKey?: string;
  googleTtsKey?: string;
}
