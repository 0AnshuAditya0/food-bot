import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_AI);

// Food and health specific system prompt with better formatting
const SYSTEM_PROMPT = `You are an AI Chef Assistant, a helpful and knowledgeable cooking companion. 

IMPORTANT: Always format your responses with clear structure and use markdown formatting for better readability.

Your role is to:
1. **Recipe Creation**: Help users create recipes from available ingredients
2. **Ingredient Substitutions**: Suggest alternatives when ingredients are missing
3. **Dietary Guidance**: Provide advice for various dietary restrictions
4. **Health Tips**: Offer nutritional advice and healthy cooking suggestions
5. **Cooking Tips**: Provide step-by-step guidance and timing optimization
6. **Meal Planning**: Suggest complete meals and meal prep ideas

RESPONSE FORMATTING RULES:
- Use **bold** for headings and important points
- Use bullet points (•) for lists
- Use numbered lists for step-by-step instructions
- Keep paragraphs short and readable
- Use emojis sparingly but effectively (🍳 👨‍🍳 🥘)
- Always structure recipes with clear sections: Ingredients, Instructions, Tips
- Use tables for nutritional info when relevant

Always be friendly, encouraging, and provide practical, actionable advice. Keep responses concise but informative.`;

export class GeminiService {
  constructor() {
    try {
      if (!process.env.GEMINI_AI) {
        throw new Error('GEMINI_AI environment variable is not set');
      }
      this.model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      this.chat = null;
      this.isInitialized = false;
    } catch (error) {
      console.error('Error initializing Gemini service:', error);
      throw error;
    }
  }

  // Initialize a new chat session
  async startNewChat() {
    try {
      this.chat = this.model.startChat({
        generationConfig: {
          maxOutputTokens: 1000,
          temperature: 0.7,
        },
      });
      
      // Send the system prompt as the first message to set context
      const initResult = await this.chat.sendMessage(SYSTEM_PROMPT);
      await initResult.response;
      
      this.isInitialized = true;
      return { success: true, message: "Chat session started" };
    } catch (error) {
      console.error('Error starting chat:', error);
      return { success: false, error: error.message };
    }
  }

  // Send a message and get AI response
  async sendMessage(userMessage) {
    try {
      if (!userMessage || typeof userMessage !== 'string') {
        throw new Error('Invalid message format');
      }

      if (!this.chat || !this.isInitialized) {
        const chatResult = await this.startNewChat();
        if (!chatResult.success) {
          throw new Error(chatResult.error);
        }
      }

      const result = await this.chat.sendMessage(userMessage);
      const response = await result.response;
      const text = response.text();

      return {
        success: true,
        message: text,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error sending message to Gemini:', error);
      return {
        success: false,
        error: error.message || 'Failed to get response from AI'
      };
    }
  }

  // Get suggested prompts for the user
  getSuggestedPrompts() {
    return [
      "What's for dinner?",
      "Healthy breakfast ideas",
      "30-minute meals",
      "I have chicken, broccoli, and rice. What can I make?",
      "Vegetarian dinner options",
      "Low-carb meal suggestions",
      "Quick lunch ideas",
      "Dessert recipes"
    ];
  }

  // Get dietary restriction options
  getDietaryOptions() {
    return [
      "Vegetarian",
      "Vegan",
      "Gluten-Free",
      "Dairy-Free",
      "Low-Carb",
      "Keto",
      "Paleo",
      "Mediterranean",
      "Low-Sodium",
      "Nut-Free"
    ];
  }
}

export default GeminiService; 