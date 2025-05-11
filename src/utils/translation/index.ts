
// Types
export * from './types';

// Configuration
export { MODEL_CONFIG, configureModelEndpoints } from './config';

// Translation functionality
export { translateText } from './translation';
export { speechToText } from './speech-to-text';
export { textToSpeech } from './text-to-speech';
export { saveToHistory } from './history';

// Add TypeScript declarations for the Web Speech API
declare global {
  interface Window {
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
  }
}

// Export a default object with all main functions
const translationServices = {
  translateText,
  speechToText,
  textToSpeech,
  configureModelEndpoints,
  saveToHistory
};

export default translationServices;
