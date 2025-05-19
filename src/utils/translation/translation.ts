
import { TranslationRequest } from './types';
import { MODEL_CONFIG } from './config';

/**
 * Translate text between languages
 */
export const translateText = async ({ text, sourceLang, targetLang }: TranslationRequest): Promise<string> => {
  console.log(`Translating from ${sourceLang} to ${targetLang}: "${text}"`);
  
  try {
    // Determine which translation model to use
    const translationDirection = `${sourceLang}-${targetLang}`;
    const reverseDirection = `${targetLang}-${sourceLang}`;
    let endpoint = MODEL_CONFIG.translation.urls[translationDirection];
    let api_key = MODEL_CONFIG.translation.keys[translationDirection];
    let target_token= targetLang;
    let source_token= sourceLang;

    // make sure language tokens are connistent with the model's
    if(source_token === "gir"){
      source_token = "sw";
    }else if(target_token === "gir"){
      target_token = "sw";
    }
    
    if (!endpoint && MODEL_CONFIG.translation.urls[reverseDirection]) {
      console.log("Using reverse translation model with switched languages");
      endpoint = MODEL_CONFIG.translation.urls[reverseDirection];
      api_key = MODEL_CONFIG.translation.keys[reverseDirection];
    }

    if (!endpoint) {
      throw new Error(`No translation model available for ${sourceLang} to ${targetLang}`);
    }
    
    // Try to make an API call to the translation endpoint
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${api_key}`,
        },
        body: JSON.stringify({
          input: {
            text: text,
            source_lang: source_token,
            target_lang: target_token,
            max_length: 150,
            num_beams: 5,
          },
        }),
      });
      
      if (!response.ok) {
        throw new Error(`Translation API responded with status: ${response.status}`);
      }
      
      const data = await response.json();
      return data.output.translations;
      
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
