import React, { useState, useEffect } from 'react';
import { Search, Filter, X, ChefHat, MapPin, Clock } from 'lucide-react';
import { generateRecipes } from '../../../services/aiRecipeService';

const SearchBar = ({ searchQuery, filters, onSearchChange, onFiltersChange }) => {
  // Remove internal state for searchQuery and filters
  // const [searchQuery, setSearchQuery] = useState('');
  // const [filters, setFilters] = useState({ ... });
  const [showFilters, setShowFilters] = useState(false);
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Sample suggestions - in a real app, this would come from an API
  const suggestions = [
    'Pasta Carbonara', 'Chicken Tikka Masala', 'Beef Tacos', 'Sushi Rolls',
    'Chocolate Cake', 'Caesar Salad', 'Pad Thai', 'Pizza Margherita',
    'Ramen Noodles', 'Fish and Chips', 'Burger', 'Pancakes'
  ];

  // Filter options
  const difficultyOptions = ['Easy', 'Medium', 'Hard'];
  const countryOptions = ['Italian', 'Indian', 'Mexican', 'Japanese', 'Thai', 'American', 'Chinese', 'French'];
  const mealTypeOptions = ['Breakfast', 'Lunch', 'Dinner', 'Snack', 'Dessert', 'Appetizer'];

  // Handle search input changes
  const handleSearchChangeLocal = (e) => {
    const value = e.target.value;
    onSearchChange(value);
    if (value.length > 0) {
      const filtered = suggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(value.toLowerCase())
      );
      setSearchSuggestions(filtered.slice(0, 5));
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  // Handle filter changes
  const handleFilterChange = (filterType, value) => {
    const newFilters = {
      ...filters,
      [filterType]: filters[filterType] === value ? '' : value
    };
    onFiltersChange(newFilters);
  };

  // Clear all filters
  const clearAllFilters = () => {
    onFiltersChange({
      difficulty: '',
      country: '',
      mealType: ''
    });
  };

  // Get active filters count
  const activeFiltersCount = Object.values(filters).filter(Boolean).length;

  // Get active filter chips
  const getActiveFilterChips = () => {
    const chips = [];
    if (filters.difficulty) chips.push({ type: 'difficulty', value: filters.difficulty });
    if (filters.country) chips.push({ type: 'country', value: filters.country });
    if (filters.mealType) chips.push({ type: 'mealType', value: filters.mealType });
    return chips;
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setShowSuggestions(false);
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className="w-full max-w-sm mx-auto mb-6">
      {/* Main Search Bar */}
      <div className="relative">
        <div className="bg-white/90 backdrop-blur-lg rounded-xl border border-pinkish-medium/30 p-4 shadow-lg">
          {/* Search Input */}
          <div className="relative mb-3">
            <div className="flex items-center gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-medium w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search for recipes..."
                  value={searchQuery}
                  onChange={handleSearchChangeLocal}
                  onFocus={() => searchQuery && setShowSuggestions(true)}
                  className="w-full pl-10 pr-3 py-2 bg-pinkish-light/50 backdrop-blur-sm rounded-lg border border-pinkish-medium/30 text-text-dark placeholder-text-light focus:outline-none focus:ring-2 focus:ring-orange-primary/30 focus:border-orange-primary/40 transition-all duration-200 text-sm"
                />
              </div>

              {/* Filter Toggle Button */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-1 px-3 py-2 rounded-lg border transition-all duration-200 text-sm ${showFilters || activeFiltersCount > 0
                    ? 'bg-orange-primary/10 border-orange-primary/30 text-orange-primary'
                    : 'bg-pinkish-light/50 border-pinkish-medium/30 text-text-medium hover:bg-pinkish-medium/30'
                  }`}
              >
                <Filter className="w-4 h-4" />
                <span>Filter</span>
                {activeFiltersCount > 0 && (
                  <span className="bg-orange-primary text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    {activeFiltersCount}
                  </span>
                )}
              </button>
              <button
                onClick={async () => {
                  if (!searchQuery) return;
                  try {
                    const aiRecipes = await generateRecipes(searchQuery);
                    console.log("AI Recipes:", aiRecipes);
                    // We'll connect this to your parent component later
                  } catch (error) {
                    console.error("AI Search failed:", error);
                  }
                }}
                disabled={!searchQuery}
                className={`flex items-center gap-1 px-3 py-2 rounded-lg border transition-all duration-200 text-sm ${searchQuery
                    ? 'bg-orange-primary border-orange-primary text-white hover:bg-orange-dark'
                    : 'bg-pinkish-light/50 border-pinkish-medium/30 text-text-light cursor-not-allowed'
                  }`}
              >
                <span>✨ AI</span>
              </button>
            </div>

            {/* Search Suggestions */}
            {showSuggestions && searchSuggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-lg rounded-xl border border-pinkish-medium/30 shadow-xl z-10">
                {searchSuggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      onSearchChange(suggestion);
                      setShowSuggestions(false);
                    }}
                    className="w-full text-left px-4 py-3 text-text-dark hover:bg-pinkish-light/50 first:rounded-t-xl last:rounded-b-xl transition-colors duration-150"
                  >
                    <div className="flex items-center gap-3">
                      <Search className="w-4 h-4 text-text-medium" />
                      <span>{suggestion}</span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Active Filter Chips */}
          {getActiveFilterChips().length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {getActiveFilterChips().map((chip, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 bg-orange-primary/10 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm text-orange-primary border border-orange-primary/30"
                >
                  <span>{chip.value}</span>
                  <button
                    onClick={() => handleFilterChange(chip.type, chip.value)}
                    className="hover:bg-orange-primary/20 rounded-full p-0.5 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
              <button
                onClick={clearAllFilters}
                className="text-sm text-text-medium hover:text-orange-primary underline transition-colors"
              >
                Clear all
              </button>
            </div>
          )}

          {/* Filter Panel */}
          {showFilters && (
            <div className="border-t border-pinkish-medium/30 pt-4 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Difficulty Filter */}
                <div>
                  <label className="flex items-center gap-2 text-text-medium text-sm font-medium mb-2">
                    <Clock className="w-4 h-4" />
                    Difficulty
                  </label>
                  <div className="space-y-2">
                    {difficultyOptions.map((option) => (
                      <button
                        key={option}
                        onClick={() => handleFilterChange('difficulty', option)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-200 ${filters.difficulty === option
                            ? 'bg-orange-primary/10 text-orange-primary border border-orange-primary/30'
                            : 'bg-pinkish-light/50 text-text-medium hover:bg-pinkish-medium/30 border border-pinkish-medium/30'
                          }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Country Filter */}
                <div>
                  <label className="flex items-center gap-2 text-text-medium text-sm font-medium mb-2">
                    <MapPin className="w-4 h-4" />
                    Cuisine
                  </label>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {countryOptions.map((option) => (
                      <button
                        key={option}
                        onClick={() => handleFilterChange('country', option)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-200 ${filters.country === option
                            ? 'bg-orange-primary/10 text-orange-primary border border-orange-primary/30'
                            : 'bg-pinkish-light/50 text-text-medium hover:bg-pinkish-medium/30 border border-pinkish-medium/30'
                          }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Meal Type Filter */}
                <div>
                  <label className="flex items-center gap-2 text-text-medium text-sm font-medium mb-2">
                    <ChefHat className="w-4 h-4" />
                    Meal Type
                  </label>
                  <div className="space-y-2">
                    {mealTypeOptions.map((option) => (
                      <button
                        key={option}
                        onClick={() => handleFilterChange('mealType', option)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-200 ${filters.mealType === option
                            ? 'bg-orange-primary/10 text-orange-primary border border-orange-primary/30'
                            : 'bg-pinkish-light/50 text-text-medium hover:bg-pinkish-medium/30 border border-pinkish-medium/30'
                          }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;