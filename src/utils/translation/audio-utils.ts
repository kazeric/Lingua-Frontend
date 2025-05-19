
/**
 * Helper function to record audio
 */
export const recordAudio = (): Promise<Blob> => {
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
 * Helper function to use Web Speech API
 */
export const useWebSpeechAPI = (langCode: string): Promise<string> => {
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
    }, 10000); // Increased to 10 seconds for better user experience
  });
};

/**
 * Helper function to use browser's speech synthesis
 */
export const useBrowserTTS = (text: string, langCode: string): Promise<string> => {
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
export const base64ToBlob = (base64: string, mimeType: string): Blob => {
  const byteCharacters = atob(base64);
  const byteNumbers = new Array(byteCharacters.length);
  
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  
  const byteArray = new Uint8Array(byteNumbers);
  return new Blob([byteArray], { type: mimeType });
};
