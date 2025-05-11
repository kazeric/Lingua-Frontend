// translation-services.ts - Handles API calls to translation services

// Types for the translation services
interface TranslationRequest {
  text: string;
  sourceLang: string;
  targetLang: string;
}

interface TranslationResponse {
  translatedText: string;
  error?: string;
}

interface SpeechRecognitionSettings {
  continuous?: boolean;
  interimResults?: boolean;
}

interface HistoryItem {
  id: number;
  sourceText: string;
  translatedText: string;
  sourceLang: string;
  targetLang: string;
  date: string;
  fromDashboard: boolean;
  isDemo?: boolean;
}

// Configuration object to store model endpoints
const MODEL_CONFIG = {
  translation: {
    "en-gir": import.meta.env.VITE_EN_TO_GIRIAMA_API_URL || "/api/translate/en-to-gir", 
    "gir-en": import.meta.env.VITE_GIRIAMA_TO_EN_API_URL || "/api/translate/gir-to-en",
  },
  asr: {
    en: {
      type: "google",
      apiKey: import.meta.env.VITE_GOOGLE_ASR_API_KEY || "",
    },
    gir: import.meta.env.VITE_GIRIAMA_ASR_API_URL || "/api/asr-giriama", 
  },
  tts: {
    en: {
      type: "google", 
      apiKey: import.meta.env.VITE_GOOGLE_TTS_API_KEY || "",
    },
    gir: import.meta.env.VITE_GIRIAMA_TTS_API_URL || "/api/tts-giriama",
  }
};

// Set custom model endpoints
export const configureModelEndpoints = (config: {
  enToGiriamaUrl?: string;
  giriamaToEnUrl?: string;
  giriamaAsrUrl?: string;
  giriamaTtsUrl?: string;
  googleAsrKey?: string;
  googleTtsKey?: string;
}) => {
  if (config.enToGiriamaUrl) MODEL_CONFIG.translation["en-gir"] = config.enToGiriamaUrl;
  if (config.giriamaToEnUrl) MODEL_CONFIG.translation["gir-en"] = config.giriamaToEnUrl;
  if (config.giriamaAsrUrl) MODEL_CONFIG.asr.gir = config.giriamaAsrUrl;
  if (config.giriamaTtsUrl) MODEL_CONFIG.tts.gir = config.giriamaTtsUrl;
  if (config.googleAsrKey && MODEL_CONFIG.asr.en) MODEL_CONFIG.asr.en.apiKey = config.googleAsrKey;
  if (config.googleTtsKey && MODEL_CONFIG.tts.en) MODEL_CONFIG.tts.en.apiKey = config.googleTtsKey;
};

/**
 * Save translation to history
 */
export const saveToHistory = (
  sourceText: string, 
  translatedText: string, 
  sourceLang: string, 
  targetLang: string, 
  fromDashboard: boolean,
  isDemo: boolean = false
): void => {
  try {
    // Check if user is logged in and history setting is enabled
    // This is a placeholder - replace with actual user login check
    const isUserLoggedIn = localStorage.getItem('userLoggedIn') === 'true';
    const isHistoryEnabled = localStorage.getItem('saveTranslationHistory') !== 'false';
    
    // Create history item
    const historyItem: HistoryItem = {
      id: Date.now(),
      sourceText,
      translatedText,
      sourceLang,
      targetLang,
      date: new Date().toISOString(),
      fromDashboard,
      isDemo
    };
    
    // Always save to local storage for now
    const existingHistory = JSON.parse(localStorage.getItem('translationHistory') || '[]');
    localStorage.setItem(
      'translationHistory', 
      JSON.stringify([historyItem, ...existingHistory])
    );
    
    // If user is logged in and history setting is enabled, send to backend
    if (isUserLoggedIn && isHistoryEnabled && !isDemo) {
      // This is a placeholder for the API call to save history to backend
      // Uncomment and complete when backend API is ready
      /*
      fetch('/api/translations/history', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(historyItem),
      }).catch(error => {
        console.error('Error saving to history API:', error);
      });
      */
    }
  } catch (error) {
    console.error("Error saving translation history:", error);
  }
};

/**
 * Translate text between languages
 */
export const translateText = async ({ text, sourceLang, targetLang }: TranslationRequest): Promise<string> => {
  console.log(`Translating from ${sourceLang} to ${targetLang}: "${text}"`);
  
  try {
    // Determine which translation model to use
    const translationDirection = `${sourceLang}-${targetLang}`;
    const reverseDirection = `${targetLang}-${sourceLang}`;
    let endpoint = MODEL_CONFIG.translation[translationDirection];
    
    if (!endpoint && MODEL_CONFIG.translation[reverseDirection]) {
      console.log("Using reverse translation model with switched languages");
      endpoint = MODEL_CONFIG.translation[reverseDirection];
    }

    if (!endpoint) {
      throw new Error(`No translation model available for ${sourceLang} to ${targetLang}`);
    }
    
    // Try to make an API call to the translation endpoint
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text,
          sourceLang,
          targetLang
        }),
      });
      
      if (!response.ok) {
        throw new Error(`Translation API responded with status: ${response.status}`);
      }
      
      const data = await response.json();
      return data.translatedText;
      
    } catch (apiError) {
      console.warn("API call failed, using fallback translations", apiError);
      
      // Fallback translations for development/demo purposes
      const fallbackTranslations: Record<string, Record<string, string>> = {
        en: {
          "irrigation system": "mfumo wa kunyunyizia",
          "crop rotation": "kubadilisha mimea",
          "sustainable farming": "kilimo endelevu",
          "soil fertility": "rutuba ya udongo",
          "harvest season": "majira ya mavuno",
          "drought resistant seeds": "mbegu zinazostahimili ukame",
          "organic fertilizer": "mbolea ya asili",
          "pest management": "kudhibiti wadudu",
        },
        gir: {
          "mfumo wa kunyunyizia": "irrigation system",
          "kubadilisha mimea": "crop rotation",
          "kilimo endelevu": "sustainable farming",
          "rutuba ya udongo": "soil fertility",
          "majira ya mavuno": "harvest season",
          "mbegu zinazostahimili ukame": "drought resistant seeds",
          "mbolea ya asili": "organic fertilizer",
          "kudhibiti wadudu": "pest management",
        }
      };
      
      const lowerText = text.toLowerCase();
      
      if (sourceLang === 'en' && fallbackTranslations.en[lowerText]) {
        return fallbackTranslations.en[lowerText];
      }
      
      if (sourceLang === 'gir' && fallbackTranslations.gir[lowerText]) {
        return fallbackTranslations.gir[lowerText];
      }
      
      // If no fallback translation exists, return a placeholder
      return sourceLang === 'en' 
        ? `[${text} translated to Giriama]`
        : `[${text} translated to English]`;
    }
  } catch (error) {
    console.error("Translation error:", error);
    throw new Error("Failed to translate text");
  }
};

/**
 * Convert speech to text using appropriate ASR service based on language
 */
export const speechToText = async (language: string): Promise<string> => {
  console.log(`Starting speech recognition for ${language}`);
  
  // Use Google's Web Speech API or Google Cloud Speech-to-Text API for English
  if (language === 'en') {
    // If Google Cloud API key is available and valid, use Google Cloud Speech-to-Text
    if (MODEL_CONFIG.asr.en?.apiKey && MODEL_CONFIG.asr.en.apiKey.length > 10) {
      return new Promise(async (resolve, reject) => {
        try {
          // Record audio first
          const audioBlob = await recordAudio();
          
          // Convert audio blob to base64
          const reader = new FileReader();
          reader.readAsDataURL(audioBlob);
          
          reader.onloadend = async () => {
            const base64Audio = reader.result?.toString().split(',')[1];
            
            if (!base64Audio) {
              reject(new Error('Failed to convert audio to base64'));
              return;
            }
            
            try {
              // Call Google Cloud Speech-to-Text API
              const response = await fetch('https://speech.googleapis.com/v1/speech:recognize', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${MODEL_CONFIG.asr.en?.apiKey}`,
                },
                body: JSON.stringify({
                  config: {
                    encoding: 'LINEAR16',
                    sampleRateHertz: 16000,
                    languageCode: 'en-US',
                  },
                  audio: {
                    content: base64Audio,
                  },
                }),
              });
              
              const data = await response.json();
              
              if (data.error) {
                throw new Error(data.error.message || 'Google Speech API error');
              }
              
              if (data.results && data.results.length > 0) {
                const transcript = data.results[0].alternatives[0].transcript;
                resolve(transcript);
              } else {
                reject(new Error('No speech detected'));
              }
            } catch (error) {
              console.error('Google Cloud Speech API error:', error);
              // Fall back to Web Speech API
              const webSpeechResult = await useWebSpeechAPI('en-US');
              resolve(webSpeechResult);
            }
          };
        } catch (error) {
          console.error('Speech recognition error:', error);
          reject(error);
        }
      });
    } else {
      // Fall back to Web Speech API
      return useWebSpeechAPI('en-US');
    }
  } 
  // For Giriama, use the custom ASR endpoint
  else if (language === 'gir') {
    try {
      // Record audio
      const audioBlob = await recordAudio();
      const formData = new FormData();
      formData.append('audio', audioBlob);
      
      // Call the Giriama ASR endpoint
      const response = await fetch(MODEL_CONFIG.asr.gir, {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error(`Giriama ASR API responded with status: ${response.status}`);
      }
      
      const data = await response.json();
      return data.transcript || '';
      
    } catch (error) {
      console.error("Giriama speech recognition error:", error);
      
      // For development, return a mock result
      return "Mimi ni mkulima wa mahindi";
    }
  } else {
    throw new Error(`Speech recognition not supported for ${language}`);
  }
};

/**
 * Helper function to use Web Speech API
 */
const useWebSpeechAPI = (langCode: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      reject(new Error('Speech recognition not supported in this browser'));
      return;
    }

    // Initialize speech recognition
    const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
    const recognition = new SpeechRecognition();
    
    // Configure recognition
    recognition.lang = langCode;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    
    let finalTranscript = '';
    
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      finalTranscript += transcript;
    };
    
    recognition.onerror = (event) => {
      console.error('Speech recognition error', event.error);
      recognition.stop();
      reject(new Error(`Speech recognition error: ${event.error}`));
    };
    
    recognition.onend = () => {
      if (finalTranscript) {
        resolve(finalTranscript);
      } else {
        reject(new Error('No speech detected'));
      }
    };
    
    // Start listening
    recognition.start();
    
    // Safety timeout after 10 seconds
    setTimeout(() => {
      if (recognition) {
        recognition.stop();
      }
    }, 10000);
  });
};

/**
 * Helper function to record audio
 */
const recordAudio = (): Promise<Blob> => {
  return new Promise(async (resolve, reject) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm'
      });
      const audioChunks: BlobPart[] = [];
      
      mediaRecorder.addEventListener("dataavailable", (event) => {
        audioChunks.push(event.data);
      });
      
      mediaRecorder.addEventListener("stop", () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
        resolve(audioBlob);
        
        // Stop all tracks
        stream.getTracks().forEach(track => track.stop());
      });
      
      // Start recording
      mediaRecorder.start();
      
      // Record for 5 seconds
      setTimeout(() => {
        mediaRecorder.stop();
      }, 5000);
    } catch (error) {
      reject(error);
    }
  });
};

/**
 * Convert text to speech using appropriate TTS service based on language
 */
export const textToSpeech = async (text: string, language: string): Promise<string> => {
  console.log(`Converting text to speech for ${language}: "${text}"`);
  
  try {
    // Use Google Cloud Text-to-Speech for English
    if (language === 'en') {
      // If Google Cloud API key is available and valid, use Google Cloud TTS
      if (MODEL_CONFIG.tts.en?.apiKey && MODEL_CONFIG.tts.en.apiKey.length > 10) {
        try {
          const response = await fetch('https://texttospeech.googleapis.com/v1/text:synthesize', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${MODEL_CONFIG.tts.en?.apiKey}`,
            },
            body: JSON.stringify({
              input: { text },
              voice: {
                languageCode: 'en-US',
                ssmlGender: 'NEUTRAL'
              },
              audioConfig: {
                audioEncoding: 'MP3'
              }
            }),
          });
          
          const data = await response.json();
          
          if (data.error) {
            throw new Error(data.error.message || 'Google TTS API error');
          }
          
          // Convert base64 to audio URL
          const audioContent = data.audioContent;
          const audioBlob = base64ToBlob(audioContent, 'audio/mp3');
          return URL.createObjectURL(audioBlob);
          
        } catch (error) {
          console.error('Google Cloud TTS API error:', error);
          // Fall back to Web Speech API
          return useBrowserTTS(text, 'en-US');
        }
      } else {
        // Fall back to Web Speech API
        return useBrowserTTS(text, 'en-US');
      }
    }
    // For Giriama, use the custom TTS endpoint
    else if (language === 'gir') {
      try {
        const response = await fetch(MODEL_CONFIG.tts.gir, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ text }),
        });
        
        if (!response.ok) {
          throw new Error(`Giriama TTS API responded with status: ${response.status}`);
        }
        
        const blob = await response.blob();
        return URL.createObjectURL(blob);
        
      } catch (error) {
        console.error("Giriama text-to-speech error:", error);
        // Return a simple audio URL for development
        return 'data:audio/wav;base64,UklGRigAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQQAAAA=';
      }
    } else {
      throw new Error(`Text-to-speech not supported for ${language}`);
    }
  } catch (error) {
    console.error("Text-to-speech error:", error);
    throw new Error("Failed to convert text to speech");
  }
};

/**
 * Helper function to use browser's speech synthesis
 */
const useBrowserTTS = (text: string, langCode: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (!('speechSynthesis' in window)) {
      reject(new Error('Text-to-speech not supported in this browser'));
      return;
    }
    
    // Create utterance
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = langCode;
    
    // Create a dummy audio URL
    const dummyAudioUrl = 'data:audio/wav;base64,UklGRigAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQQAAAA=';
    
    // Speak the text
    window.speechSynthesis.speak(utterance);
    
    resolve(dummyAudioUrl);
  });
};

/**
 * Helper function to convert base64 to Blob
 */
const base64ToBlob = (base64: string, mimeType: string): Blob => {
  const byteCharacters = atob(base64);
  const byteNumbers = new Array(byteCharacters.length);
  
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  
  const byteArray = new Uint8Array(byteNumbers);
  return new Blob([byteArray], { type: mimeType });
};

// Add TypeScript declarations for the Web Speech API
declare global {
  interface Window {
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
  }
}

export default {
  translateText,
  speechToText,
  textToSpeech,
  configureModelEndpoints,
  saveToHistory
};
