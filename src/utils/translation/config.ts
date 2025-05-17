
import { ModelConfig, ModelEndpointConfig } from './types';

// Configuration object to store model endpoints
export const MODEL_CONFIG: ModelConfig = {
  translation: {
    "en-gir": import.meta.env.VITE_EN_TO_GIRIAMA_API_URL || "/api/translate/en-to-gir", 
    "gir-en": import.meta.env.VITE_GIRIAMA_TO_EN_API_URL || "/api/translate/gir-to-en",
  },
  asr: {
    en: {
      type: "google",
      apiKey: import.meta.env.VITE_GOOGLE_ASR_API_KEY || "",
    },
    gir: {
      "url":import.meta.env.VITE_GIRIAMA_ASR_API_URL || "/api/asr-giriama", 
      "apiKey": import.meta.env.VITE_GIRIAMA_ASR_API_KEY ,}
  },
  tts: {
    en: {
      type: "google", 
      apiKey: import.meta.env.VITE_GOOGLE_TTS_API_KEY || "",
    },
    gir: {
      "url":import.meta.env.VITE_GIRIAMA_TTS_API_URL || "/api/tts-giriama",
      "apiKey": import.meta.env.VITE_GIRIAMA_TTS_API_KEY ,
    }
  }
};

// Set custom model endpoints
export const configureModelEndpoints = (config: ModelEndpointConfig) => {
  if (config.enToGiriamaUrl) MODEL_CONFIG.translation["en-gir"] = config.enToGiriamaUrl;
  if (config.giriamaToEnUrl) MODEL_CONFIG.translation["gir-en"] = config.giriamaToEnUrl;
  if (config.giriamaAsrUrl) MODEL_CONFIG.asr.gir["url"] = config.giriamaAsrUrl;
  if (config.giriamaAsrKey) MODEL_CONFIG.asr.gir["apiKey"] = config.giriamaAsrKey;
  if (config.giriamaTtsUrl) MODEL_CONFIG.tts.gir["url"] = config.giriamaTtsUrl;
  if (config.giriamaTtsKey) MODEL_CONFIG.tts.gir["apiKey"] = config.giriamaTtsKey;
  if (config.googleAsrKey && MODEL_CONFIG.asr.en) MODEL_CONFIG.asr.en.apiKey = config.googleAsrKey;
  if (config.googleTtsKey && MODEL_CONFIG.tts.en) MODEL_CONFIG.tts.en.apiKey = config.googleTtsKey;
};
