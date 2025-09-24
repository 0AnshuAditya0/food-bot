import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const dbPassword = process.env.DB_PASSWORD;
    
    // Check if environment variable exists
    if (!dbPassword) {
      return NextResponse.json({
        success: false,
        error: 'DB_PASSWORD environment variable is not set',
        hasPassword: false
      }, { status: 400 });
    }

    // Check if it's empty
    if (dbPassword.trim() === '') {
      return NextResponse.json({
        success: false,
        error: 'DB_PASSWORD environment variable is empty',
        hasPassword: true,
        passwordLength: 0
      }, { status: 400 });
    }

    // Construct the URI for testing
    const mongoUri = `mongodb+srv://anshubaka2004:${dbPassword}@cluster0.pbrnms0.mongodb.net/foodbot?retryWrites=true&w=majority&appName=Cluster0`;

    return NextResponse.json({
      success: true,
      hasPassword: true,
      passwordLength: dbPassword.length,
      clusterName: 'cluster0',
      databaseName: 'foodbot',
      username: 'anshubaka2004',
      // Don't expose the password for security
      uriPreview: `mongodb+srv://anshubaka2004:${'*'.repeat(Math.min(dbPassword.length, 3))}@cluster0.pbrnms0.mongodb.net/foodbot?retryWrites=true&w=majority&appName=Cluster0`,
      message: 'DB_PASSWORD is set. Try testing the connection now.'
    });

  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message,
      hasPassword: !!process.env.DB_PASSWORD
    }, { status: 500 });
  }
} 