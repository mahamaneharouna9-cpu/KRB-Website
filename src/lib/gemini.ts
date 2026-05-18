import { GoogleGenAI } from '@google/genai';

// Instantiate globally to restore automatic AI Studio proxy injection
export const ai = new GoogleGenAI({ 
  apiKey: process.env.GEMINI_API_KEY,
});

