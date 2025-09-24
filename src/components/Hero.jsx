'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import HeroExp from './HeroModels/HeroExp';
import { useAuthModal } from '../app/providers';

// Basic Cube Component
function Box() {
  return (
    <mesh>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color="#ec4899" />
    </mesh>
  );
}

const Hero = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const { openAuthModal } = useAuthModal();

  const handleInvite = () => {
    window.open('https://discord.com/api/oauth2/authorize?client_id=YOUR_CLIENT_ID&permissions=8&scope=bot', '_blank');
  };

  const handleFeatures = () => {
    router.push('/features');
  };

  // Animation variants for cards
  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        ease: "easeOut"
      }
    }),
    hover: {
      scale: 1.05,
      y: -5,
      transition: { duration: 0.3 }
    }
  };

  // Text animation variants
  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        ease: "easeOut"
      }
    })
  };

  return (
    <div className="relative min-h-screen overflow-hidden" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
      {/* Background Image with Fade Effect */}
      <div className="absolute inset-0">
        <Image
          src="/table.jpg"
          alt="Table Background"
          fill
          className="object-cover"
          priority
          quality={100}
          sizes="100vw"
        />
        {/* Gradient overlay for fade effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-tl from-black/30 via-transparent to-transparent"></div>
      </div>
      {/* Noise Texture Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.02] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '128px 128px'
        }}
      />
      {/* Main Content */}
      <div className="relative z-10 flex min-h-screen pt-24 px-6 max-w-7xl mx-auto">
        {/* Left Content - Glassmorphism Card (30%) */}
        <div className="w-[30%] pr-8 pt-8">
          <motion.div 
            className="max-w-lg"
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            custom={0}
          >
            {/* Small tagline */}
            <motion.div 
              className="mb-8"
              variants={textVariants}
              custom={0}
            >
              <span className="text-pink-400 text-xs uppercase tracking-wider font-medium">Discord Food Bot</span>
            </motion.div>

            {/* Main heading with enhanced typography */}
            <motion.h1 
              className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight tracking-tight"
              variants={textVariants}
              custom={1}
              style={{ fontWeight: 900 }}
            >
              EXPLORE
            </motion.h1>
            <motion.h1 
              className="text-4xl md:text-5xl font-black bg-gradient-to-r from-pink-400 via-pink-500 to-purple-500 bg-clip-text text-transparent mb-8 leading-tight tracking-tight"
              variants={textVariants}
              custom={2}
              style={{ fontWeight: 900 }}
            >
              FOOD.
            </motion.h1>

            {/* Description with improved spacing */}
            <motion.p 
              className="text-gray-200 text-base leading-relaxed font-medium"
              variants={textVariants}
              custom={3}
            >
              Food games, smart suggestions, and meal discovery for your Discord server.
            </motion.p>
          </motion.div>
        </div>

        {/* Right Content - HeroExp Component (70%) */}
        <div className="w-[70%] flex items-center justify-center">
          <figure className="w-full h-full min-h-[50vh]">
            <HeroExp />
          </figure>
        </div>
      </div>
    </div>
  );
};

export default Hero;