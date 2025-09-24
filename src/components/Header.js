'use client';

import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import { useAuthModal } from "../app/providers";
import { LogIn } from 'lucide-react';

export default function Header() {
  const { data: session } = useSession();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const { openAuthModal } = useAuthModal();

  return (
    <header className="w-full bg-[#f9f7f4]/80 backdrop-blur-md shadow-sm py-4 px-8 flex justify-between items-center border-b border-neutral-200 z-50">
      {/* Left: Logo + Nav Group */}
      <div className="flex items-center gap-8">
        <div className="text-xl font-semibold text-black flex items-center gap-2">
          <span role="img" aria-label="logo">🍽️</span>
          <span>FoodBot</span>
        </div>
        <nav className="hidden md:flex items-center gap-2 bg-white/80 rounded-full shadow border border-neutral-200 px-2 py-1">
          <a href="/recipe" className="px-4 py-2 rounded-full font-bold text-gray-900 bg-gray-100 shadow-inner">Explore Recipes</a>
          <a href="#how-ai-works" className="px-4 py-2 rounded-full text-gray-500 hover:text-gray-900 transition">How AI Works</a>
          <a href="#contact" className="px-4 py-2 rounded-full text-gray-500 hover:text-gray-900 transition">Contact Us</a>
          <a href="/recipe" className="ml-2 px-5 py-2 rounded-full bg-gray-900 text-white font-bold shadow hover:bg-gray-800 transition">Explore Recipes</a>
        </nav>
      </div>
      {/* Right: New Account + Login */}
      <div className="flex items-center gap-6">
        <button
          onClick={openAuthModal}
          className="text-gray-700 hover:text-gray-900 font-medium transition"
        >
          New Account
        </button>
        <button
          onClick={openAuthModal}
          className="flex items-center gap-2 text-gray-700 hover:text-gray-900 font-medium transition"
        >
          <LogIn className="w-5 h-5" />
          Login
        </button>
      </div>
    </header>
  );
}
