import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import connectDB from '@/lib/mongodb';
import Recipe from '@/lib/models/Recipe';
import User from '@/lib/models/User';

// GET - Get all recipes for user
export async function GET(request) {
  try {
    await connectDB();
    
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ 
        error: 'Authentication required',
        message: 'Please sign in to access your recipes'
      }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const favorites = searchParams.get('favorites');

    // Find or create user
    let user;
    try {
      user = await User.findOne({ email: session.user.email });
      if (!user) {
        user = await User.create({
          email: session.user.email,
          name: session.user.name,
          image: session.user.image
        });
      }
    } catch (userError) {
      console.error('Error with user:', userError);
      return NextResponse.json({ 
        error: 'User account error',
        message: 'Unable to access user account'
      }, { status: 500 });
    }

    // Build query
    let query = { userId: user._id };
    
    if (category && category !== 'all') {
      query.category = category;
    }
    
    if (favorites === 'true') {
      query.isFavorite = true;
    }

    let recipes = await Recipe.find(query).sort({ createdAt: -1 });

    // Text search if provided
    if (search) {
      recipes = recipes.filter(recipe => 
        recipe.title.toLowerCase().includes(search.toLowerCase()) ||
        recipe.description.toLowerCase().includes(search.toLowerCase()) ||
        recipe.ingredients.some(ingredient => 
          ingredient.toLowerCase().includes(search.toLowerCase())
        )
      );
    }

    return NextResponse.json({ recipes });
  } catch (error) {
    console.error('Error fetching recipes:', error);
    
    if (error.name === 'MongoError' && error.code === 11000) {
      return NextResponse.json({ 
        error: 'Duplicate recipe',
        message: 'This recipe already exists in your collection'
      }, { status: 409 });
    }
    
    return NextResponse.json({ 
      error: 'Failed to fetch recipes',
      message: 'Unable to load your recipes. Please try again.'
    }, { status: 500 });
  }
}

// POST - Create new recipe
export async function POST(request) {
  try {
    await connectDB();
    
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ 
        error: 'Authentication required',
        message: 'Please sign in to save recipes'
      }, { status: 401 });
    }

    const body = await request.json();
    
    // Validate required fields
    if (!body.title || !body.description) {
      return NextResponse.json({ 
        error: 'Missing required fields',
        message: 'Recipe title and description are required'
      }, { status: 400 });
    }
    
    // Find or create user
    let user;
    try {
      user = await User.findOne({ email: session.user.email });
      if (!user) {
        user = await User.create({
          email: session.user.email,
          name: session.user.name,
          image: session.user.image
        });
      }
    } catch (userError) {
      console.error('Error with user:', userError);
      return NextResponse.json({ 
        error: 'User account error',
        message: 'Unable to access user account'
      }, { status: 500 });
    }

    // Validate and format data
    const recipeData = {
      ...body,
      userId: user._id,
      title: body.title.trim(),
      description: body.description.trim(),
      category: body.category || 'main',
      cookingTime: parseInt(body.cookingTime) || 30,
      difficulty: body.difficulty || 'medium',
      ingredients: Array.isArray(body.ingredients) ? body.ingredients : [body.ingredients],
      instructions: Array.isArray(body.instructions) ? body.instructions : [body.instructions],
      image: body.image || '/default-food.png',
      isFavorite: body.isFavorite || false
    };

    // Validate category
    const validCategories = ['main', 'dinner', 'lunch', 'dessert', 'seafood', 'breakfast', 'appetizer', 'soup', 'salad'];
    if (!validCategories.includes(recipeData.category)) {
      return NextResponse.json({ 
        error: 'Invalid category',
        message: 'Please select a valid recipe category'
      }, { status: 400 });
    }

    // Create recipe
    const recipe = await Recipe.create(recipeData);

    return NextResponse.json({ recipe }, { status: 201 });
  } catch (error) {
    console.error('Error creating recipe:', error);
    
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return NextResponse.json({ 
        error: 'Validation failed',
        message: 'Please check your recipe data',
        details: validationErrors
      }, { status: 400 });
    }
    
    if (error.name === 'MongoError' && error.code === 11000) {
      return NextResponse.json({ 
        error: 'Duplicate recipe',
        message: 'This recipe already exists in your collection'
      }, { status: 409 });
    }
    
    return NextResponse.json({ 
      error: 'Failed to create recipe',
      message: 'Unable to save recipe. Please try again.'
    }, { status: 500 });
  }
} 