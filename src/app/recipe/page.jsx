"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import RecipeGrid from './components/RecipeGrid';
import SearchBar from './components/SearchBar';
import AuthModal from '@/components/AuthModal';
import { useAuthModal } from '../providers';

const RecipePage = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const { openAuthModal } = useAuthModal();
  const [showToast, setShowToast] = useState(false);

  // LIFTED STATE FOR SEARCH AND FILTERS
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    difficulty: '',
    country: '',
    mealType: ''
  });

  // Handlers to pass to SearchBar
  const handleSearchChange = (value) => setSearchQuery(value);
  const handleFiltersChange = (newFilters) => setFilters(newFilters);

  // Authentication check for dashboard access
  const handleDashboard = () => {
    if (!session) {
      openAuthModal();
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3500);
      return;
    }
    router.push('/dashboard');
  };

  const handleMealExplorer = () => {
    // Already on recipe page, so just scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleHome = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-800 to-purple-900 relative overflow-hidden">
      {/* SVG Wave Background */}
      <div className="absolute inset-0 opacity-20">
        <svg className="w-full h-full" viewBox="0 0 1200 800" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="wave1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ec4899" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#ec4899" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient id="wave2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.2" />
              <stop offset="50%" stopColor="#ec4899" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          <path d="M0,400 Q300,300 600,400 T1200,400 L1200,800 L0,800 Z" fill="url(#wave1)" />
          <path d="M0,500 Q300,400 600,500 T1200,500 L1200,800 L0,800 Z" fill="url(#wave2)" />
        </svg>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[9999] bg-pink-600 text-white px-6 py-3 rounded-lg shadow-lg font-semibold text-base animate-fade-in-out">
          For this feature you need to be registered first
        </div>
      )}

      {/* Auth Modal Popup */}
      <AuthModal isOpen={false} onClose={() => { }} /> {/* Modal is now global, so keep this as a placeholder or remove if not needed */}

      {/* Main Content */}
      <div className="relative z-10 pt-24">
        {/* Hero Section with Search - Side by Side Layout */}
        <section className="relative py-12 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              {/* Left Side - Hero Content */}
              <div className="space-y-4">
                <motion.h1
                  className="text-3xl md:text-4xl font-black text-white leading-tight tracking-tight"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  EXPLORE
                </motion.h1>
                <motion.h1
                  className="text-3xl md:text-4xl font-black bg-gradient-to-r from-pink-400 via-pink-500 to-purple-500 bg-clip-text text-transparent leading-tight tracking-tight"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  RECIPES
                </motion.h1>
                <motion.p
                  className="text-gray-200 text-base leading-relaxed"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  Discover delicious recipes from around the world, powered by AI suggestions and curated collections.
                </motion.p>
              </div>

              {/* Right Side - Search Bar */}
              <div className="flex justify-end">
                <div className="w-full max-w-sm">
                  <SearchBar
                    searchQuery={searchQuery}
                    filters={filters}
                    onSearchChange={handleSearchChange}
                    onFiltersChange={handleFiltersChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="relative py-12 px-6">
          <div className="max-w-7xl mx-auto">
            <RecipeGrid
              searchQuery={searchQuery}
              filters={filters}
            />
          </div>
        </section>

        {/* Footer */}
        <footer className="relative py-16 px-6 mt-20">
          <div className="max-w-7xl mx-auto text-center">
            <motion.div
              className="text-gray-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <p className="text-lg mb-4">Made with ❤️ for food lovers</p>
              <p className="text-sm">© 2024 FoodBot. All rights reserved.</p>
            </motion.div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default RecipePage;