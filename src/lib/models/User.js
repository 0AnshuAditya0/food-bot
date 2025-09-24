import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: String,
  // Array of providers: 'discord', 'google', or 'credentials' (manual)
  providers: [{
    type: String,
    enum: ['discord', 'google', 'credentials'],
    required: true
  }],
  // Hashed password for manual login (optional, only for 'credentials' users)
  password: {
    type: String,
    required: false
  },
  lastLogin: {
    type: Date,
    default: Date.now
  },
  preferences: {
    dietaryRestrictions: [String],
    favoriteCuisines: [String],
    skillLevel: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      default: 'beginner'
    }
  }
}, {
  timestamps: true
});

export default mongoose.models.User || mongoose.model('User', userSchema); 