import mongoose from 'mongoose';

const recipeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['main', 'dinner', 'lunch', 'dessert', 'seafood', 'breakfast', 'appetizer', 'soup', 'salad'],
    required: true
  },
  cookingTime: {
    type: Number,
    required: true
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    default: 'medium'
  },
  ingredients: [{
    type: String,
    required: true
  }],
  instructions: [{
    type: String,
    required: true
  }],
  image: String,
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  isFavorite: {
    type: Boolean,
    default: false
  },
  tags: [String],
  source: {
    type: String,
    enum: ['manual', 'ai', 'import'],
    default: 'manual'
  }
}, {
  timestamps: true
});

// Add text index for search
recipeSchema.index({ title: 'text', description: 'text', ingredients: 'text' });

export default mongoose.models.Recipe || mongoose.model('Recipe', recipeSchema); 