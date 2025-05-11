
// translation-services.ts - Handles API calls to translation services

// Types for the translation services
interface TranslationRequest {
  text: string;
  sourceLang: string;
  targetLang: string;
}

interface SpeechRecognitionSettings {
  continuous?: boolean;
  interimResults?: boolean;
}

// Configuration object to store model endpoints
const MODEL_CONFIG = {
  translation: {
    endpoint: "/api/translate", // Default endpoint, can be updated
  },
  asr: {
    en: "google", // Use Google's ASR for English
    gir: "/api/asr-giriama", // Custom endpoint for Giriama ASR
  },
  tts: {
    en: "google", // Use Google's TTS for English
    gir: "/api/tts-giriama", // Custom endpoint for Giriama TTS
  }
};

// Set custom model endpoints
export const configureModelEndpoints = (config: {
  translation?: string;
  asrGiriama?: string;
  ttsGiriama?: string;
}) => {
  if (config.translation) MODEL_CONFIG.translation.endpoint = config.translation;
  if (config.asrGiriama) MODEL_CONFIG.asr.gir = config.asrGiriama;
  if (config.ttsGiriama) MODEL_CONFIG.tts.gir = config.ttsGiriama;
};

/**
 * Translate text between languages
 */
export const translateText = async ({ text, sourceLang, targetLang }: TranslationRequest): Promise<string> => {
  console.log(`Translating from ${sourceLang} to ${targetLang}: "${text}"`);
  
  try {
    // For demonstration/development, fallback to mock translations
    const fallbackTranslations: Record<string, Record<string, string>> = {
      en: {
        "irrigation system": "mfumo wa kunyunyizia",
        "crop rotation": "kubadilisha mimea",
        "sustainable farming": "kilimo endelevu",
        "soil fertility": "rutuba ya udongo",
        "harvest season": "majira ya mavuno",
      },
      gir: {
        "mfumo wa kunyunyizia": "irrigation system",
        "kubadilisha mimea": "crop rotation",
        "kilimo endelevu": "sustainable farming",
        "rutuba ya udongo": "soil fertility",
        "majira ya mavuno": "harvest season",
      }
    };

    // Try to make an API call to the translation endpoint
    try {
      const response = await fetch(MODEL_CONFIG.translation.endpoint, {
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
      
      // Use fallback translations for development/demo purposes
      const sourceDict = sourceLang === 'en' ? fallbackTranslations.en : fallbackTranslations.gir;
      const lowerText = text.toLowerCase();
      
      if (sourceDict && sourceDict[lowerText]) {
        return sourceDict[lowerText];
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
  
  // Use Google's Web Speech API for English
  if (language === 'en') {
    return new Promise((resolve, reject) => {
      if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
        reject(new Error('Speech recognition not supported in this browser'));
        return;
      }

      // Initialize speech recognition
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
      const recognition = new SpeechRecognition();
      
      // Configure recognition
      recognition.lang = 'en-US';
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
  } 
  // For Giriama, use the custom ASR endpoint
  else if (language === 'gir') {
    try {
      // Mock implementation for development
      if (MODEL_CONFIG.asr.gir === '/api/asr-giriama') {
        // This is a simulated delay for development purposes
        await new Promise(resolve => setTimeout(resolve, 2000));
        return "Mimi ni mkulima wa mahindi";  // Simulated Giriama transcription
      }
      
      // Implement file upload to custom ASR endpoint
      const audioBlob = await recordAudio();
      const formData = new FormData();
      formData.append('audio', audioBlob);
      
      const response = await fetch(MODEL_CONFIG.asr.gir, {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error(`Giriama ASR API responded with status: ${response.status}`);
      }
      
      const data = await response.json();
      return data.transcript;
    } catch (error) {
      console.error("Giriama speech recognition error:", error);
      throw new Error("Failed to recognize Giriama speech");
    }
  } else {
    throw new Error(`Speech recognition not supported for ${language}`);
  }
};

/**
 * Helper function to record audio
 */
const recordAudio = (): Promise<Blob> => {
  return new Promise(async (resolve, reject) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      const audioChunks: BlobPart[] = [];
      
      mediaRecorder.addEventListener("dataavailable", (event) => {
        audioChunks.push(event.data);
      });
      
      mediaRecorder.addEventListener("stop", () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
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
    // Use Google's TTS for English
    if (language === 'en') {
      // For development, we'll use a simple implementation with Web Speech API
      return new Promise((resolve, reject) => {
        if (!('speechSynthesis' in window)) {
          reject(new Error('Text-to-speech not supported in this browser'));
          return;
        }
        
        // Create utterance
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US';
        
        // Create a dummy audio URL to return
        // In a real implementation, we'd use Google Cloud TTS API
        const dummyAudioUrl = 'data:audio/wav;base64,UklGRigAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQQAAAA=';
        
        // Speak the text
        window.speechSynthesis.speak(utterance);
        
        resolve(dummyAudioUrl);
      });
    }
    // For Giriama, use custom TTS endpoint
    else if (language === 'gir') {
      try {
        // Mock implementation for development
        if (MODEL_CONFIG.tts.gir === '/api/tts-giriama') {
          // Return a simple audio URL for development
          return 'data:audio/wav;base64,UklGRigAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQQAAAA=';
        }
        
        // Real implementation would call the TTS API
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
        throw new Error("Failed to convert Giriama text to speech");
      }
    } else {
      throw new Error(`Text-to-speech not supported for ${language}`);
    }
  } catch (error) {
    console.error("Text-to-speech error:", error);
    throw new Error("Failed to convert text to speech");
  }
};

// Add TypeScript declarations for the Web Speech API if needed
declare global {
  interface Window {
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
  }
}
