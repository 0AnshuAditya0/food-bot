"use client";
import React, { useState, useEffect, useRef } from 'react';
import { ChefHat, Sparkles, Users, Gamepad2, ArrowRight, ArrowLeft, Bookmark } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const features = [
  {
    id: 'ai-recipes',
    title: 'AI Recipe Discovery',
    subtitle: 'Smart meal suggestions',
    image: '/mix-salad.png',
    icon: ChefHat,
    description: 'Discover personalized recipes powered by artificial intelligence. Get smart suggestions based on your preferences, dietary restrictions, and available ingredients.'
  },
  {
    id: 'smart-kitchen',
    title: 'Kitchen Assistant',
    subtitle: 'Step-by-step guidance',
    image: '/pasta.png',
    icon: Sparkles,
    description: 'Your personal kitchen companion with step-by-step cooking guidance, ingredient substitutions, and real-time cooking tips to perfect every dish.'
  },
  {
    id: 'social-cooking',
    title: 'Cooking Community',
    subtitle: 'Share with food lovers',
    image: '/dish.png',
    icon: Users,
    description: 'Connect with fellow food enthusiasts, share your culinary creations, and discover recipes from around the world in our vibrant cooking community.'
  },
  {
    id: 'food-gaming',
    title: 'Food Gaming',
    subtitle: 'Challenge friends',
    image: '/ramen.png',
    icon: Gamepad2,
    description: 'Turn cooking into a fun adventure with interactive food games, challenges, and competitions that make learning to cook exciting and engaging.'
  }
];

export default function OptimizedFeatures() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayRef = useRef(null);

  // Auto-rotation functionality
  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(() => {
        setDirection(1);
        setCurrentSlide((prev) => (prev + 1) % features.length);
      }, 5000); // Change every 5 seconds
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, features.length]);

  const handleNext = () => {
    setIsAutoPlaying(false); // Stop auto-play when user interacts
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % features.length);
  };

  const handlePrevious = () => {
    setIsAutoPlaying(false); // Stop auto-play when user interacts
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + features.length) % features.length);
  };

  const handleExplore = (featureId) => {
    console.log(`Exploring feature: ${featureId}`);
    // Add your navigation logic here
  };

  return (
    <div className="py-40 bg-gradient-to-br from-[#FFCCF2] via-[#977DFF] to-[#0033FF] relative overflow-hidden min-h-screen flex items-center">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#977DFF]/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#0033FF]/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-r from-[#FFCCF2]/10 to-[#0033FF]/10"></div>
      </div>

      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-16">
        <div className="flex items-center gap-20">
          
          {/* Left Side Content (40%) */}
          <div className="w-[40%] space-y-12">
            {/* Scroll Indicator */}
            <div className="flex items-center gap-4">
              <div className="w-px h-24 bg-white/30 relative">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-white rounded-full"></div>
              </div>
              <span 
                className="text-white/60 text-lg font-bold tracking-widest"
                style={{ 
                  fontFamily: 'Orbitron, monospace',
                  fontWeight: 700,
                  fontSize: '1.25rem'
                }}
              >
                FEATURES
              </span>
            </div>

            {/* Main Heading with Animation */}
            <AnimatePresence mode="wait">
              <motion.h2 
                key={currentSlide}
                className="text-7xl md:text-8xl font-black text-white leading-none tracking-tight"
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -30, scale: 0.9 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              >
                {features[currentSlide].title.toUpperCase()}
              </motion.h2>
            </AnimatePresence>

            {/* Description with Animation */}
            <AnimatePresence mode="wait">
              <motion.p 
                key={`desc-${currentSlide}`}
                className="text-white/90 text-xl leading-relaxed"
                initial={{ opacity: 0, y: 20, x: -20 }}
                animate={{ opacity: 1, y: 0, x: 0 }}
                exit={{ opacity: 0, y: -20, x: 20 }}
                transition={{ duration: 0.6, delay: 0.1, ease: "easeInOut" }}
              >
                {features[currentSlide].description}
              </motion.p>
            </AnimatePresence>

            {/* Explore Button with Animation */}
            <AnimatePresence mode="wait">
              <motion.button
                key={`btn-${currentSlide}`}
                onClick={() => handleExplore(features[currentSlide].id)}
                className="bg-[#0033FF] hover:bg-[#0600AB] text-white px-10 py-5 rounded-xl font-bold text-lg transition-all duration-300 flex items-center gap-3 group shadow-xl"
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.9 }}
                transition={{ duration: 0.6, delay: 0.2, ease: "easeInOut" }}
                whileHover={{ scale: 1.05 }}
              >
                Explore
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </AnimatePresence>
          </div>

          {/* Right Side Carousel (60%) */}
          <div className="w-[60%] relative">
            <div className="relative overflow-hidden rounded-3xl">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentSlide}
                  custom={direction}
                  initial={{ 
                    x: direction > 0 ? 300 : -300,
                    opacity: 0,
                    scale: 0.8
                  }}
                  animate={{ 
                    x: 0,
                    opacity: 1,
                    scale: 1
                  }}
                  exit={{ 
                    x: direction > 0 ? -300 : 300,
                    opacity: 0,
                    scale: 0.8
                  }}
                  transition={{ 
                    duration: 0.6,
                    ease: "easeInOut"
                  }}
                  className="relative"
                >
                  {/* Feature Card - Wider */}
                  <div className="relative bg-gradient-to-br from-[#977DFF]/20 to-[#0033FF]/20 backdrop-blur-lg border border-white/20 rounded-3xl p-8 shadow-2xl">
                    <div className="relative h-96 rounded-2xl overflow-hidden">
                      <img
                        src={features[currentSlide].image}
                        alt={features[currentSlide].title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                      
                      {/* Feature Info Overlay - Fixed z-index */}
                      <div className="absolute bottom-6 left-6 right-6 z-10">
                        <div className="flex items-center gap-4 mb-3">
                          {React.createElement(features[currentSlide].icon, {
                            className: "w-8 h-8 text-white"
                          })}
                          <h3 className="text-3xl font-bold text-white drop-shadow-lg">
                            {features[currentSlide].title}
                          </h3>
                        </div>
                        <p className="text-white/90 text-lg mb-4 drop-shadow-lg font-medium">
                          {features[currentSlide].subtitle}
                        </p>
                        {/* Rating Dots */}
                        <div className="flex gap-2">
                          {[...Array(5)].map((_, i) => (
                            <div key={i} className="w-3 h-3 bg-white/80 rounded-full drop-shadow-sm"></div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Controls */}
            <div className="flex justify-center gap-6 mt-10">
              <button
                onClick={handlePrevious}
                className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center hover:bg-white/30 transition-all duration-300"
              >
                <ArrowLeft className="w-6 h-6 text-white" />
              </button>
              <button
                onClick={handleNext}
                className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center hover:bg-white/30 transition-all duration-300"
              >
                <ArrowRight className="w-6 h-6 text-white" />
              </button>
            </div>

            {/* Auto-play indicator */}
            <div className="flex justify-center mt-6">
              <div className="flex gap-3">
                {features.map((_, index) => (
                  <div
                    key={index}
                    className={`h-3 rounded-full transition-all duration-300 ${
                      index === currentSlide 
                        ? 'bg-white w-8' 
                        : 'bg-white/40 w-3'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}