'use client';

import { useSession, signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { 
  Heart, 
  Clock, 
  ChefHat, 
  Star, 
  Plus, 
  Search, 
  Filter, 
  Trash2, 
  Edit3, 
  BookOpen,
  TrendingUp,
  Calendar,
  Settings,
  LogOut,
  User,
  Crown
} from "lucide-react";
import { useAuthModal } from "../providers";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const { openAuthModal } = useAuthModal();
  const [showToast, setShowToast] = useState(false);

  // Authentication check
  useEffect(() => {
    if (status === "loading") return; // Still loading
    if (!session) {
      openAuthModal();
      setShowToast(true);
      const timer = setTimeout(() => setShowToast(false), 3500);
      return () => clearTimeout(timer);
    }
  }, [session, status, openAuthModal]);

  // Fetch recipes from API - moved before conditional returns
  useEffect(() => {
    if (!session) return; // Don't fetch if not authenticated
    const fetchRecipes = async () => {
      try {
        const response = await fetch('/api/recipes');
        if (response.ok) {
          const data = await response.json();
          setFavoriteRecipes(data.recipes || []);
        }
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };
    fetchRecipes();
  }, [session]);

  // Show loading while checking authentication
  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#271539] via-[#501f5a] to-[#e783b5] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render dashboard content if not authenticated
  if (!session) {
    // Render only the toast notification (modal is handled globally)
    return (
      <>
        {showToast && (
          <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[9999] bg-pink-600 text-white px-6 py-3 rounded-lg shadow-lg font-semibold text-base animate-fade-in-out">
            For this feature you need to be registered first
          </div>
        )}
      </>
    );
  }

  const removeRecipe = async (id) => {
    try {
      const response = await fetch(`/api/recipes/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setFavoriteRecipes(favoriteRecipes.filter(recipe => recipe._id !== id));
      }
    } catch (error) {
      console.error('Error deleting recipe:', error);
    }
  };

  const filteredRecipes = favoriteRecipes.filter(recipe => {
    const matchesSearch = recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         recipe.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === "all" || recipe.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const stats = {
    totalRecipes: favoriteRecipes.length,
    favoriteCategory: favoriteRecipes.length > 0 
      ? favoriteRecipes.reduce((acc, recipe) => {
          acc[recipe.category] = (acc[recipe.category] || 0) + 1;
          return acc;
        }, {}) : {},
    averageRating: favoriteRecipes.length > 0 
      ? (favoriteRecipes.reduce((sum, recipe) => sum + recipe.rating, 0) / favoriteRecipes.length).toFixed(1)
      : 0
  };

  // Get the most popular category
  const getFavoriteCategory = () => {
    if (Object.keys(stats.favoriteCategory).length === 0) return "None";
    return Object.entries(stats.favoriteCategory)
      .sort(([,a], [,b]) => b - a)[0][0];
  };

  const categories = [
    { id: "all", name: "All Recipes", icon: BookOpen },
    { id: "main", name: "Main Course", icon: ChefHat },
    { id: "dessert", name: "Desserts", icon: Star },
    { id: "seafood", name: "Seafood", icon: TrendingUp },
    { id: "breakfast", name: "Breakfast", icon: Calendar }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#271539] via-[#501f5a] to-[#e783b5]">
      {/* Navigation Bar - TOP */}
      <nav className="bg-white/10 backdrop-blur-sm border-b border-white/20 px-8 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <button 
                onClick={() => router.push('/')}
                className="text-white/80 hover:text-white transition-all duration-200 font-medium hover:scale-105"
              >
                Home
              </button>
              <button 
                onClick={() => router.push('/recipe')}
                className="text-white/80 hover:text-white transition-all duration-200 font-medium hover:scale-105"
              >
                Explore Recipes
              </button>
              <button 
                onClick={() => router.push('/dashboard')}
                className="text-white font-medium bg-[#e783b5]/20 px-4 py-2 rounded-lg hover:bg-[#e783b5]/30 transition-all duration-200 hover:scale-105"
              >
                My Favorites
              </button>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-white/60">Logged in as {session?.user?.name}</span>
              <button 
                onClick={() => router.push('/profile')}
                className="p-2 bg-white/10 hover:bg-white/20 rounded-xl transition-all duration-200 hover:scale-105"
              >
                <Settings className="w-5 h-5 text-white" />
              </button>
              <button 
                onClick={() => signOut()}
                className="flex items-center gap-2 px-4 py-2 bg-[#c2649b] hover:bg-[#915ba4] text-white rounded-xl transition-all duration-200 hover:scale-105 shadow-sm"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Header */}
      <header className="bg-white/10 backdrop-blur-sm border-b border-white/20 px-8 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Image
                src={session?.user?.image || "/default-food.png"}
                alt="Profile Pic"
                width={64}
                height={64}
                className="rounded-full border-4 border-[#e783b5] shadow-lg"
              />
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#915ba4] rounded-full border-2 border-white"></div>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">
                Welcome back, {session?.user?.name || "Chef"}! 👨‍🍳
              </h1>
              <p className="text-white/80">Your favorite recipes collection</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#271539] to-[#501f5a] rounded-xl flex items-center justify-center shadow-lg">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-white/70 text-sm font-medium">Total Favorites</p>
                <p className="text-3xl font-bold text-white">{stats.totalRecipes}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#915ba4] to-[#c2649b] rounded-xl flex items-center justify-center shadow-lg">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-white/70 text-sm font-medium">Favorite Category</p>
                <p className="text-2xl font-bold text-white capitalize">{getFavoriteCategory()}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#c2649b] to-[#e783b5] rounded-xl flex items-center justify-center shadow-lg">
                <Star className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-white/70 text-sm font-medium">Average Rating</p>
                <p className="text-3xl font-bold text-white">{stats.averageRating} ⭐</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" />
            <input
              type="text"
              placeholder="Search your favorite recipes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-[#e783b5] focus:border-transparent transition-all"
            />
          </div>
          
          <div className="flex gap-3">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#e783b5] focus:border-transparent transition-all"
            >
              {categories.map(category => (
                <option key={category.id} value={category.id} className="bg-[#271539]">
                  {category.name}
                </option>
              ))}
            </select>
            
            <button
              onClick={() => router.push('/recipe')}
              className="px-6 py-4 bg-gradient-to-r from-[#c2649b] to-[#e783b5] hover:from-[#915ba4] hover:to-[#c2649b] rounded-xl transition-all duration-300 hover:scale-105 shadow-lg flex items-center gap-2 text-white font-medium"
            >
              <Plus className="w-5 h-5" />
              Explore Recipes
            </button>
          </div>
        </div>

        {/* Recipe Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredRecipes.map((recipe, index) => (
              <motion.div
                key={recipe._id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105"
              >
                <div className="relative h-48 bg-gradient-to-br from-[#271539]/20 to-[#e783b5]/20">
                  <Image
                    src={recipe.image}
                    alt={recipe.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-3 right-3">
                    <button
                      onClick={() => removeRecipe(recipe._id)}
                      className="p-2 bg-[#c2649b] hover:bg-[#915ba4] rounded-lg transition-colors shadow-lg"
                    >
                      <Trash2 className="w-4 h-4 text-white" />
                    </button>
                  </div>
                  <div className="absolute bottom-3 left-3 bg-[#271539]/80 px-3 py-1 rounded-lg text-xs text-white font-medium">
                    {recipe.cookingTime}
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-bold text-white">{recipe.title}</h3>
                    <div className="flex items-center gap-1 text-[#e783b5]">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="text-sm font-medium">{recipe.rating}</span>
                    </div>
                  </div>
                  
                  <p className="text-white/70 text-sm mb-4 line-clamp-2">{recipe.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 bg-[#915ba4]/20 text-[#e783b5] rounded-full text-xs font-medium border border-[#915ba4]/30">
                      {recipe.category}
                    </span>
                    <span className="text-white/60 text-xs">{recipe.savedDate}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>


      </div>
    </div>
  );
}
