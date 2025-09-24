import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Clock, Users, ChefHat, Star, Heart, Globe, Utensils, Zap, Sparkles, X, Timer, CheckCircle, Share2 } from 'lucide-react';

const RecipeCard = ({ recipe, isAI = false }) => {
  const { data: session } = useSession();
  const [isFavorite, setIsFavorite] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [imageError, setImageError] = useState(false);

  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'easy': return 'bg-green-100 text-green-700 border-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'hard': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getDifficultyIcons = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'easy': return '🌟';
      case 'medium': return '⭐⭐';
      case 'hard': return '⭐⭐⭐';
      default: return '⭐';
    }
  };

  const getSpiceLevelEmoji = (spiceLevel) => {
    switch (spiceLevel?.toLowerCase()) {
      case 'mild': return '🌶️';
      case 'medium': return '🌶️🌶️';
      case 'hot': return '🌶️🌶️🌶️';
      case 'very hot': return '🌶️🌶️🌶️🌶️';
      default: return '';
    }
  };

  const toggleFavorite = async (e) => {
    e.stopPropagation();
    
    if (!session) {
      // If not logged in, just toggle local state for visual feedback
      setIsFavorite(!isFavorite);
      return;
    }

    try {
      if (isFavorite) {
        // Remove from favorites
        const response = await fetch(`/api/recipes/${recipe._id || recipe.id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          setIsFavorite(false);
        }
      } else {
        // Add to favorites
        const response = await fetch('/api/recipes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: recipe.name,
            description: recipe.description || 'A delicious recipe from our collection',
            category: mapCategory(recipe.mealType?.toLowerCase()) || 'main',
            cookingTime: parseInt(recipe.prepTime) || 30,
            difficulty: recipe.difficulty?.toLowerCase() || 'medium',
            ingredients: formatIngredients(recipe.ingredients),
            instructions: formatInstructions(recipe.instructions),
            image: recipe.image || '/default-food.png',
            isFavorite: true
          }),
        });
        if (response.ok) {
          setIsFavorite(true);
        }
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  const handleCardClick = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  // Helper function to map categories to valid enum values
  const mapCategory = (category) => {
    const categoryMap = {
      'dinner': 'main',
      'lunch': 'main',
      'breakfast': 'breakfast',
      'dessert': 'dessert',
      'seafood': 'seafood',
      'appetizer': 'appetizer',
      'soup': 'soup',
      'salad': 'salad'
    };
    return categoryMap[category] || 'main';
  };

  // Helper function to format ingredients
  const formatIngredients = (ingredients) => {
    if (!ingredients) return ['Ingredient 1', 'Ingredient 2'];
    
    if (Array.isArray(ingredients)) {
      return ingredients.map(ingredient => {
        if (typeof ingredient === 'string') {
          return ingredient;
        } else if (ingredient && typeof ingredient === 'object') {
          // Handle object format like { name: 'Chicken', amount: '2' }
          return `${ingredient.amount || ''} ${ingredient.name || ingredient}`.trim();
        }
        return String(ingredient);
      });
    }
    
    return ['Ingredient 1', 'Ingredient 2'];
  };

  // Helper function to format instructions
  const formatInstructions = (instructions) => {
    if (!instructions) return ['Step 1', 'Step 2'];
    
    if (Array.isArray(instructions)) {
      return instructions.map(instruction => {
        if (typeof instruction === 'string') {
          return instruction;
        } else if (instruction && typeof instruction === 'object') {
          // Handle object format
          return instruction.text || instruction.step || String(instruction);
        }
        return String(instruction);
      });
    }
    
    return ['Step 1', 'Step 2'];
  };

  // Get image source - prioritize API image, fallback to Unsplash
  const getImageSource = () => {
    // If API provides a direct image URL, use it
    if (recipe.image && !imageError) {
      return recipe.image;
    }

    // Fallback to Unsplash for recipes without images
    const searchTerm = recipe.name?.toLowerCase().includes('pasta') ? 'pasta' :
                      recipe.name?.toLowerCase().includes('chicken') ? 'chicken' :
                      recipe.name?.toLowerCase().includes('pizza') ? 'pizza' : 'food';
    return `https://source.unsplash.com/random/600x400/?${searchTerm},food&sig=${recipe.id}`;
  };

  // Mock AI-generated content
  const getMockIngredients = () => {
    const baseIngredients = [
      "2 cups main ingredient",
      "1 tsp seasoning",
      "1/2 tsp salt",
      "2 tbsp cooking oil",
      "1 cup liquid (water/broth)",
      "Fresh herbs for garnish"
    ];

    if (recipe.name?.toLowerCase().includes('pasta')) {
      return [
        "400g pasta",
        "2 tbsp olive oil",
        "3 cloves garlic, minced",
        "1 can diced tomatoes",
        "1/2 cup parmesan cheese",
        "Fresh basil leaves",
        "Salt and pepper to taste"
      ];
    }

    if (recipe.name?.toLowerCase().includes('chicken')) {
      return [
        "500g chicken breast",
        "2 tbsp olive oil",
        "1 tsp garlic powder",
        "1 tsp paprika",
        "Salt and pepper",
        "1 cup chicken broth",
        "Fresh thyme"
      ];
    }

    return baseIngredients;
  };

  const getMockInstructions = () => {
    return [
      "Prepare all ingredients and preheat cooking equipment as needed.",
      "Start by cooking the main ingredient according to the recipe specifications.",
      "Add seasonings and aromatics to build flavor layers.",
      "Combine ingredients gradually, following proper cooking techniques.",
      "Cook until desired texture and doneness is achieved.",
      "Taste and adjust seasonings as needed.",
      "Serve hot and garnish with fresh herbs. Enjoy your meal!"
    ];
  };

  return (
    <>
      {/* Recipe Card - Futuristic Trading Card Template */}
      <div
        className="group relative w-[320px] h-[480px] bg-gradient-to-br from-pink-100 via-pink-200 to-pink-300 rounded-[20px] overflow-hidden shadow-2xl hover:shadow-pink-500/20 transition-all duration-500 cursor-pointer"
        onClick={handleCardClick}
      >
        {/* Metallic Frame Border */}
        <div className="absolute inset-0 bg-gradient-to-br from-pink-300 via-pink-400 to-pink-500 rounded-[20px] p-[12px]">
          <div className="relative w-full h-full bg-gradient-to-br from-pink-100 via-pink-200 to-pink-300 rounded-[16px] overflow-hidden">
            
            {/* Country Name at Very Top */}
            <div className="absolute top-0 left-0 right-0 z-40 p-2 bg-gradient-to-b from-pink-300/95 via-pink-200/90 to-transparent">
              <h3 className="text-lg font-bold text-pink-800 leading-tight group-hover:text-pink-600 transition-colors duration-200 line-clamp-1 uppercase tracking-wider drop-shadow-lg font-mono text-center">
                {recipe.country || 'INTERNATIONAL'}
              </h3>
            </div>
            
            {/* Main Image Area - Just Below Country Name */}
            <div className="absolute top-[45px] left-0 right-0 h-[280px] p-4">
              <div className="relative w-full h-full overflow-hidden rounded-[12px]">
                {!imageLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-pink-200 to-pink-300">
                    <ChefHat className="w-16 h-16 text-pink-600 animate-pulse" />
                  </div>
                )}
                <img
                  src={imageError ? '/default-food.png' : getImageSource()}
                  alt={recipe.name}
                  className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                  loading="lazy"
                  onLoad={() => setImageLoaded(true)}
                  onError={() => setImageError(true)}
                />
                
                {/* Image Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-pink-100/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Floating Action Buttons */}
                <div className="absolute top-4 right-4 flex flex-col space-y-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0 z-30">
                  {session ? (
                    <button
                      onClick={toggleFavorite}
                      className={`
                        w-10 h-10 rounded-full backdrop-blur-md border border-pink-400/30 shadow-lg transform hover:scale-110 transition-all duration-200
                        ${isFavorite ? 'bg-red-500/80 text-white' : 'bg-pink-200/80 text-pink-600 hover:text-red-400'}
                      `}
                      title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                    >
                      <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
                    </button>
                  ) : (
                    <div className="relative group">
                      <button
                        disabled
                        className="w-10 h-10 rounded-full backdrop-blur-md border border-pink-400/30 shadow-lg bg-pink-100/60 text-pink-400 cursor-not-allowed opacity-70"
                        title="Login to save favorites"
                      >
                        <Heart className="w-4 h-4" />
                      </button>
                      <span className="absolute right-12 top-1/2 -translate-y-1/2 bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none">
                        Please log in to save favorites
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Recipe Name - Just Below Image */}
            <div className="absolute top-[330px] left-0 right-0 z-30 p-2 bg-white/90 backdrop-blur-sm">
              <h4 className="text-base font-bold text-pink-800 leading-tight group-hover:text-pink-600 transition-colors duration-200 line-clamp-1 uppercase tracking-wider drop-shadow-lg font-mono text-center">
                {recipe.name}
              </h4>
            </div>

            {/* All Recipe Details in One White Background Div */}
            <div className="absolute bottom-0 left-0 right-0 h-[120px] z-20 bg-white rounded-b-[16px] shadow-lg">
              <div className="flex items-center justify-between p-4 h-full">
                {/* Left Side - Difficulty & Time */}
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-pink-600 font-mono text-sm">{getDifficultyIcons(recipe.difficulty)}</span>
                    <span className="text-pink-800 font-mono text-sm uppercase tracking-wider">{recipe.difficulty || 'MEDIUM'}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-pink-600" />
                    <span className="text-pink-700 font-mono text-sm">{recipe.prepTime || '20MIN'}</span>
                  </div>
                </div>
                
                {/* Right Side - Rating */}
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-pink-700 font-mono text-sm">
                    {isAI ? 'NEW' : `4.${Math.floor(Math.random() * 5) + 3}`}
                  </span>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-4 left-4 w-3 h-3 bg-gradient-to-r from-pink-400 to-rose-500 rounded-full opacity-60 transform -rotate-12 animate-pulse z-30"></div>
            <div className="absolute bottom-4 right-4 w-2 h-2 bg-gradient-to-r from-rose-500 to-pink-400 rounded-full opacity-60 transform rotate-12 animate-pulse delay-1000 z-30"></div>
            
            {/* Side Text - Changed to HAPPY FOOD */}
            <div className="absolute left-2 top-1/2 transform -translate-y-1/2 -rotate-90 text-pink-600 font-mono text-xs uppercase tracking-widest opacity-60">
              HAPPY FOOD
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="relative bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 p-2 bg-white/80 rounded-full text-gray-600 hover:text-gray-800 transition-all backdrop-blur-sm z-10 hover:bg-white"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Scrollable Content */}
            <div className="overflow-y-auto max-h-[90vh] p-8 space-y-8">
              {/* Image */}
              <div className="bg-gray-50 rounded-2xl p-4">
                <div className="relative aspect-video overflow-hidden rounded-xl">
                  <img
                    src={imageError ? '/default-food.png' : getImageSource()}
                    alt={recipe.name}
                    className="w-full h-full object-cover object-center"
                    onError={() => setImageError(true)}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                </div>
              </div>

              {/* Recipe Title */}
              <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-3">{recipe.name}</h2>
                <div className="flex items-center justify-center gap-6 text-gray-600 text-sm">
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {(parseInt(recipe.prepTime) || 20) + (parseInt(recipe.cookTime) || 25)} min
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {recipe.servings || 4} servings
                  </span>
                  <span className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(recipe.difficulty)}`}>
                    <Zap className="w-4 h-4" />
                    {recipe.difficulty || 'Medium'}
                  </span>
                </div>
              </div>

              {/* Description */}
              <div className="text-center">
                <p className="text-gray-600 text-lg leading-relaxed max-w-2xl mx-auto">
                  {recipe.description || 'A delicious recipe that will satisfy your taste buds and bring joy to your dining experience.'}
                </p>
              </div>

              {/* Nutritional Info */}
              <div className="grid grid-cols-4 gap-4 bg-gray-50 rounded-2xl p-6">
                <div className="text-center">
                  <div className="text-orange-500 font-bold text-2xl">{recipe.calories || 350}</div>
                  <div className="text-gray-600 text-sm">Calories</div>
                </div>
                <div className="text-center">
                  <div className="text-blue-500 font-bold text-2xl">{recipe.protein || 25}g</div>
                  <div className="text-gray-600 text-sm">Protein</div>
                </div>
                <div className="text-center">
                  <div className="text-green-500 font-bold text-2xl">{recipe.carbs || 45}g</div>
                  <div className="text-gray-600 text-sm">Carbs</div>
                </div>
                <div className="text-center">
                  <div className="text-purple-500 font-bold text-2xl">{recipe.fat || 12}g</div>
                  <div className="text-gray-600 text-sm">Fat</div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Ingredients */}
                <div className="bg-gray-50 rounded-2xl p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <ChefHat className="w-5 h-5" />
                    Ingredients
                    {isAI && <span className="text-purple-600 text-sm">(AI Generated)</span>}
                  </h3>
                  <div className="space-y-3">
                    {getMockIngredients().map((ingredient, index) => (
                      <div key={index} className="flex items-center gap-3 text-gray-700">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span>{ingredient}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Instructions */}
                <div className="bg-gray-50 rounded-2xl p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Timer className="w-5 h-5" />
                    Instructions
                    {isAI && <span className="text-purple-600 text-sm">(AI Generated)</span>}
                  </h3>
                  <div className="space-y-4">
                    {getMockInstructions().map((instruction, index) => (
                      <div key={index} className="flex gap-4 text-gray-700">
                        <span className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                          {index + 1}
                        </span>
                        <p className="leading-relaxed">{instruction}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Tags */}
              {recipe.tags && recipe.tags.length > 0 && (
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Tags</h3>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {recipe.tags.map((tag, index) => (
                      <span
                        key={index}
                        className={`px-4 py-2 rounded-full text-sm ${isAI ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700'}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RecipeCard;