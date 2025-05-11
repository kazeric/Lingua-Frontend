
import { HistoryItem } from './types';

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
