
import { MODEL_CONFIG } from './config';
import { base64ToBlob, useBrowserTTS } from './audio-utils';

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
                name: 'en-US-Wavenet-D',
                ssmlGender: 'FEMALE' 
              },
              audioConfig: {
                audioEncoding: 'MP3',
                speakingRate: 1.0,
                pitch: 0.0,
              }
            }),
          })
          
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
        const response = await fetch(MODEL_CONFIG.tts.gir["url"], {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${MODEL_CONFIG.tts.gir["apiKey"]}`,
          },
          body: JSON.stringify({
            "input": {
              "text": text,
            },
          }),
        });
        
        if (!response.ok) {
          throw new Error(`Giriama TTS API responded with status: ${response.status}`);
        }

        const data = await response.json();
        
        const blob = base64ToBlob(data.output.audio_data, "audio/mp3");
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
