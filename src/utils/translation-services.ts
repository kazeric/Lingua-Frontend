
// This file is maintained for backward compatibility
// All functionality has been moved to the translation folder for better organization

import translationServices, {
  translateText,
  speechToText,
  textToSpeech,
  saveToHistory,
  configureModelEndpoints,
} from './translation';

// Re-export all types using 'export type' syntax
export type {
  ModelConfig,
  TranslationRequest,
  TranslationResponse,
  SpeechRecognitionSettings,
  HistoryItem,
} from './translation/types';

// Re-export all functions
export {
  translateText,
  speechToText,
  textToSpeech,
  saveToHistory,
  configureModelEndpoints,
};

// Export default object with all main functions
export default translationServices;
