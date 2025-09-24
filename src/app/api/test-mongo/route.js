import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';

export async function GET() {
  try {
    console.log('Testing MongoDB connection...');
    console.log('MONGO_URI2:', process.env.MONGO_URI2 ? 'Set' : 'Not set');
    
    await connectDB();
    
    return NextResponse.json({ 
      success: true, 
      message: 'MongoDB connected successfully!',
      uriSet: !!process.env.MONGO_URI2
    });
  } catch (error) {
    console.error('MongoDB connection error:', error);
    return NextResponse.json({ 
      success: false, 
      error: error.message,
      uriSet: !!process.env.MONGO_URI2
    }, { status: 500 });
  }
} 