import { NextResponse } from 'next/server';
import GeminiService from '@/services/geminiService';

export async function POST(request) {
  try {
    // Check if environment variable is available
    if (!process.env.GEMINI_AI) {
      console.error('GEMINI_AI environment variable is not set');
      return NextResponse.json(
        { error: 'AI service not configured. Please check environment variables.' },
        { status: 500 }
      );
    }

    const { message } = await request.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Initialize Gemini service
    const geminiService = new GeminiService();
    
    // Send message to AI
    const response = await geminiService.sendMessage(message);

    if (!response.success) {
      console.error('Gemini API error:', response.error);
      return NextResponse.json(
        { error: response.error || 'Failed to get AI response' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: response.message,
      timestamp: response.timestamp,
      user: 'User' // Placeholder for now
    });

  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: `Internal server error: ${error.message}` },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    // Check if environment variable is available
    if (!process.env.GEMINI_AI) {
      console.error('GEMINI_AI environment variable is not set');
      return NextResponse.json(
        { error: 'AI service not configured. Please check environment variables.' },
        { status: 500 }
      );
    }

    // Return suggested prompts
    const geminiService = new GeminiService();
    const suggestedPrompts = geminiService.getSuggestedPrompts();
    const dietaryOptions = geminiService.getDietaryOptions();

    return NextResponse.json({
      success: true,
      suggestedPrompts,
      dietaryOptions,
      user: 'User' // Placeholder for now
    });

  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: `Internal server error: ${error.message}` },
      { status: 500 }
    );
  }
} 