'use client';

import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAuthModal } from '../app/providers';

const GlobalHeader = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const { openAuthModal } = useAuthModal();
  const [showToast, setShowToast] = useState(false);

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
    router.push('/recipe');
  };

  const handleHome = () => {
    router.push('/');
  };

  return (
    <>
      {/* Header */}
      <header className="fixed top-0 left-0 w-full backdrop-blur-md bg-black/40 border-b border-white/20 px-6 py-4 flex justify-between items-center z-[9999]">
        <nav className="flex space-x-8 text-sm text-white font-medium">
          {session && (
            <button 
              onClick={handleDashboard}
              className="hover:text-pink-400 transition-all duration-200 cursor-pointer hover:scale-105"
            >
              Dashboard
            </button>
          )}
          <button 
            onClick={handleMealExplorer}
            className="hover:text-pink-400 transition-all duration-200 cursor-pointer hover:scale-105"
          >
            Meal Explorer
          </button>
        </nav>

        <button 
          onClick={handleHome}
          className="text-xl text-white font-bold flex items-center gap-2 cursor-pointer hover:text-pink-400 transition-colors"
        >
          <span className="text-2xl">🍽️</span>
          <span>FoodBot</span>
        </button>

        <div className="relative">
          {session ? (
            <button
              onClick={() => setDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 focus:outline-none"
            >
              <span className="text-sm text-white hidden md:inline">{session.user.name}</span>
              <Image
                src={session.user.image}
                alt="Profile"
                width={32}
                height={32}
                className="rounded-full border border-pink-400/50"
              />
            </button>
          ) : (
            <button
              onClick={openAuthModal}
              className="text-white text-sm hover:text-pink-400 transition-colors"
            >
              Login
            </button>
          )}

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-black/90 backdrop-blur-md border border-pink-500/30 rounded-lg shadow-xl z-50 text-sm">
              <button
                onClick={() => signOut()}
                className="w-full text-left px-4 py-2 hover:bg-pink-500/20 text-pink-400 rounded-lg"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[9999] bg-pink-600 text-white px-6 py-3 rounded-lg shadow-lg font-semibold text-base animate-fade-in-out">
          For this feature you need to be registered first
        </div>
      )}
    </>
  );
};

export default GlobalHeader;