
// This file is maintained for backward compatibility
// All functionality has been moved to the translation folder for better organization

import translationServices, {
  translateText,
  speechToText,
  textToSpeech,
  saveToHistory,
  configureModelEndpoints,
  ModelConfig,
  TranslationRequest,
  TranslationResponse,
  SpeechRecognitionSettings,
  HistoryItem,
} from './translation';

// Re-export all types and functions
export {
  translateText,
  speechToText,
  textToSpeech,
  saveToHistory,
  configureModelEndpoints,
  ModelConfig,
  TranslationRequest,
  TranslationResponse,
  SpeechRecognitionSettings,
  HistoryItem,
};

// Export default object with all main functions
export default translationServices;
