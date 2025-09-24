'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Hero from "@/components/Hero" 
import Features from "@/components/Features"
import AIChefAssistant from "@/components/Categories"
import Footer from "@/components/Footer"

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Show loading while checking authentication
  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F2E6EE] via-[#977DFF] to-[#0033FF] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="relative">
      {/* Beautiful Gradient Background using the color variants */}
      <div className="fixed inset-0 bg-gradient-to-br from-[#F2E6EE] via-[#977DFF] to-[#0033FF] z-0"></div>
      

      
      {/* Subtle Floating Particles */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/40 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Content Sections - Clean Layout */}
      <div className="relative z-10">
        <Hero />
        <Features />
        <AIChefAssistant />
        <Footer />
      </div>

      {/* Global Styles */}
      <style jsx global>{`
        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 6px;
        }

        ::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
        }

        ::-webkit-scrollbar-thumb {
          background: linear-gradient(45deg, #977DFF, #0033FF);
          border-radius: 3px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(45deg, #8B5CF6, #0600AB);
        }
      `}</style>
    </main>
  )
}
