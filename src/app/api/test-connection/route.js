import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';

export async function GET() {
  try {
    console.log('🔍 Testing MongoDB connection...');
    
    // Test the connection
    await connectDB();
    
    console.log('✅ Connection test successful!');
    
    return NextResponse.json({ 
      success: true, 
      message: 'MongoDB connection successful! 🎉',
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('❌ Connection test failed:', error.message);
    
    return NextResponse.json({ 
      success: false, 
      error: error.message,
      timestamp: new Date().toISOString(),
      suggestions: [
        'Check your internet connection',
        'Verify MongoDB Atlas is accessible',
        'Check if your IP is whitelisted in MongoDB Atlas',
        'Try using a different DNS server'
      ]
    }, { status: 500 });
  }
} 