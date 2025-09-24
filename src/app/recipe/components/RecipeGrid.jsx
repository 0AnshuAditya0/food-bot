import React, { useState, useEffect, useMemo } from 'react';
import RecipeCard from './RecipeCard';
import { Loader2, AlertCircle, ChefHat, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';

const RECIPES_PER_PAGE = 20;

const RecipeGrid = ({ searchQuery = '', filters = {}, aiRecipes = [] }) => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  // Fetch recipes for the current page only (server-side pagination)
  useEffect(() => {
    if (aiRecipes.length > 0) {
      setLoading(false);
      return;
    }
    const fetchRecipes = async () => {
      setLoading(true);
      setError(null);
      try {
        let url = searchQuery.trim()
          ? `https://happyfood-api.vercel.app/api/dishes/search?q=${encodeURIComponent(searchQuery.trim())}&page=${currentPage}&limit=${RECIPES_PER_PAGE}`
          : `https://happyfood-api.vercel.app/api/dishes?page=${currentPage}&limit=${RECIPES_PER_PAGE}`;
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch recipes');
        const data = await response.json();
        let pageRecipes = [];
        if (data.dishes) pageRecipes = data.dishes;
        else if (data.data) pageRecipes = data.data;
        else if (Array.isArray(data)) pageRecipes = data;
        // Remove duplicates by name+image for this page
        const normalize = str => (str || '').toString().trim().toLowerCase().replace(/\s+/g, ' ');
        const uniqueRecipes = pageRecipes.filter((recipe, index, self) =>
          index === self.findIndex(r =>
            normalize(r.name) === normalize(recipe.name) &&
            normalize(r.image) === normalize(recipe.image)
          )
        );
        setRecipes(uniqueRecipes);
        setTotalCount(data.totalCount || uniqueRecipes.length);
      } catch (err) {
        setError('Failed to load recipes. Please check your connection and try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchRecipes();
  }, [searchQuery, aiRecipes.length, currentPage]);

  // Filtering (if needed)
  const filteredRecipes = useMemo(() => {
    return recipes.filter(recipe => {
      const { difficulty, country, mealType } = filters;
      if (difficulty && recipe.difficulty?.toLowerCase() !== difficulty.toLowerCase()) return false;
      if (country && !recipe.country?.toLowerCase().includes(country.toLowerCase())) return false;
      if (mealType && recipe.mealType?.toLowerCase() !== mealType.toLowerCase()) return false;
      return true;
    });
  }, [recipes, filters]);

  const totalPages = Math.max(1, Math.ceil((totalCount || 0) / RECIPES_PER_PAGE));

  // Reset to page 1 when filters or search change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters, searchQuery]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    return pages;
  };

  const recipesToDisplay = aiRecipes.length > 0 ? aiRecipes : filteredRecipes;

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-500 rounded-full animate-spin"></div>
          <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-pink-500 rounded-full animate-spin" style={{animationDirection: 'reverse', animationDuration: '1.5s'}}></div>
        </div>
        <p className="text-gray-600 text-lg mt-6 font-medium">Loading delicious recipes...</p>
        <div className="flex items-center gap-2 mt-4">
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce delay-100"></div>
          <div className="w-2 h-2 bg-violet-400 rounded-full animate-bounce delay-200"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="relative mb-6">
          <div className="w-20 h-20 bg-gradient-to-r from-red-100 to-purple-100 rounded-full flex items-center justify-center">
            <AlertCircle className="w-10 h-10 text-red-500" />
          </div>
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full animate-pulse"></div>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Oops! Something went wrong</h3>
        <p className="text-red-600 text-lg mb-6 text-center max-w-md">{error}</p>
        <button 
          onClick={() => setCurrentPage(currentPage)}
          className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl font-medium"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (recipesToDisplay.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="relative mb-6">
          <div className="w-20 h-20 bg-gradient-to-r from-gray-100 to-purple-100 rounded-full flex items-center justify-center">
            <ChefHat className="w-10 h-10 text-gray-400" />
          </div>
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-gray-400 rounded-full animate-pulse"></div>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">No Recipes Found</h3>
        <p className="text-gray-600 text-center max-w-md mb-6">
          We couldn't find any recipes matching your criteria. Try adjusting your search or filters.
        </p>
        <div className="flex items-center gap-4">
          <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
          <div className="w-3 h-3 bg-pink-400 rounded-full animate-pulse delay-300"></div>
          <div className="w-3 h-3 bg-violet-400 rounded-full animate-pulse delay-700"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Enhanced Header with Stats */}
      <div className="mb-8 p-6 bg-white/20 backdrop-blur-md rounded-2xl border border-purple-200/30 shadow-lg">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
          <div className="text-center lg:text-left">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              🍽️ Recipe Collection
            </h2>
            <div className="flex flex-wrap items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
                <span className="text-gray-600">
                  <span className="font-semibold text-gray-900">{recipesToDisplay.length}</span> recipes shown
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-pink-400 rounded-full animate-pulse delay-300"></div>
                <span className="text-gray-600">
                  <span className="font-semibold text-gray-900">{totalCount}</span> total
                </span>
              </div>
            </div>
          </div>
          {totalPages > 1 && aiRecipes.length === 0 && (
            <div className="flex items-center gap-3 px-4 py-2 bg-white/30 rounded-full border border-purple-200/50 shadow-sm">
              <span className="text-sm font-medium text-gray-700">Page</span>
              <span className="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full text-sm font-bold">
                {currentPage}
              </span>
              <span className="text-sm text-gray-500">of {totalPages}</span>
            </div>
          )}
        </div>
      </div>
      {/* Enhanced Recipe Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8 justify-items-center">
        {recipesToDisplay.map((recipe, index) => (
          <div 
            key={recipe._id || recipe.id || `recipe-${index}`}
            className="group relative transition-all duration-300 ease-out hover:shadow-xl"
          >
            <RecipeCard recipe={recipe} isAI={aiRecipes.length > 0} />
          </div>
        ))}
      </div>
      {/* Enhanced Pagination */}
      {totalPages > 1 && aiRecipes.length === 0 && (
        <div className="flex flex-col items-center gap-6 p-6 bg-white/20 backdrop-blur-md rounded-2xl border border-purple-200/30 shadow-lg">
          <div className="flex items-center gap-3">
            {/* Jump to First Page */}
            <button
              onClick={() => handlePageChange(1)}
              disabled={currentPage === 1}
              className="p-3 bg-white/30 hover:bg-purple-50/50 text-gray-700 hover:text-purple-600 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg border border-purple-200/50 disabled:opacity-50 disabled:cursor-not-allowed"
              title="First Page"
            >
              «
            </button>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-3 bg-white/30 hover:bg-purple-50/50 text-gray-700 hover:text-purple-600 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg border border-purple-200/50 disabled:opacity-50 disabled:cursor-not-allowed"
              title="Previous Page"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              {getPageNumbers().map((page, index) => (
                <button
                  key={index}
                  onClick={() => typeof page === 'number' && handlePageChange(page)}
                  disabled={page === '...'}
                  className={`px-4 py-2 rounded-xl transition-all duration-200 shadow-md text-sm font-medium ${
                    page === currentPage
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                      : page === '...'
                      ? 'bg-transparent text-gray-400 border-transparent cursor-default'
                      : 'bg-white/30 hover:bg-purple-50/50 text-gray-700 hover:text-purple-600 border border-purple-200/50 hover:shadow-lg'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-3 bg-white/30 hover:bg-purple-50/50 text-gray-700 hover:text-purple-600 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg border border-purple-200/50 disabled:opacity-50 disabled:cursor-not-allowed"
              title="Next Page"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            {/* Jump to Last Page */}
            <button
              onClick={() => handlePageChange(totalPages)}
              disabled={currentPage === totalPages}
              className="p-3 bg-white/30 hover:bg-purple-50/50 text-gray-700 hover:text-purple-600 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg border border-purple-200/50 disabled:opacity-50 disabled:cursor-not-allowed"
              title="Last Page"
            >
              »
            </button>
          </div>
          <div className="text-center">
            <p className="text-gray-600 text-sm">
              Showing <span className="font-semibold text-gray-900">{((currentPage - 1) * RECIPES_PER_PAGE) + 1}</span> to{' '}
              <span className="font-semibold text-gray-900">{Math.min(currentPage * RECIPES_PER_PAGE, totalCount)}</span> of{' '}
              <span className="font-semibold text-gray-900">{totalCount}</span> recipes
            </p>
            <div className="mt-2 w-32 h-1 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-300"
                style={{ width: `${(currentPage / totalPages) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      )}
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-pink-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-purple-200/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-1/3 w-32 h-32 bg-yellow-200/20 rounded-full blur-xl animate-pulse delay-500"></div>
      </div>
    </div>
  );
};

export default RecipeGrid;