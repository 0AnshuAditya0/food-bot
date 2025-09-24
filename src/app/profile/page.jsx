'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { 
  User, 
  Mail, 
  Calendar, 
  Shield, 
  LogOut, 
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  Settings,
  Heart,
  Clock
} from 'lucide-react';

export default function Profile() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [userStats, setUserStats] = useState(null);

  // Authentication check
  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      router.push('/auth/signin');
    }
  }, [session, status, router]);

  // Fetch user stats
  useEffect(() => {
    if (session) {
      fetchUserStats();
    }
  }, [session]);

  const fetchUserStats = async () => {
    try {
      const response = await fetch('/api/recipes');
      if (response.ok) {
        const data = await response.json();
        setUserStats({
          totalRecipes: data.recipes?.length || 0,
          favoriteRecipes: data.recipes?.filter(r => r.isFavorite)?.length || 0
        });
      }
    } catch (error) {
      console.error('Error fetching user stats:', error);
    }
  };

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

  // Don't render if not authenticated
  if (!session) {
    return null;
  }

  const getProviderIcon = (provider) => {
    switch (provider) {
      case 'google':
        return (
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
        );
      case 'discord':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
          </svg>
        );
      default:
        return <User className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#271539] via-[#501f5a] to-[#e783b5]">
      {/* Navigation Bar - TOP */}
      <nav className="bg-white/10 backdrop-blur-sm border-b border-white/20 px-8 py-4">
        <div className="max-w-4xl mx-auto">
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
                className="text-white/80 hover:text-white transition-all duration-200 font-medium hover:scale-105"
              >
                My Favorites
              </button>
              <button 
                onClick={() => router.push('/profile')}
                className="text-white font-medium bg-[#e783b5]/20 px-4 py-2 rounded-lg hover:bg-[#e783b5]/30 transition-all duration-200 hover:scale-105"
              >
                Profile
              </button>
            </div>
            <button 
              onClick={() => signOut({ callbackUrl: '/' })}
              className="flex items-center gap-2 px-4 py-2 bg-[#c2649b] hover:bg-[#915ba4] text-white rounded-xl transition-all duration-200 hover:scale-105 shadow-sm"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </div>
      </nav>

      {/* Header */}
      <header className="bg-white/10 backdrop-blur-sm border-b border-white/20 px-8 py-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push('/dashboard')}
              className="p-2 bg-white/10 hover:bg-white/20 rounded-xl transition-all duration-200 hover:scale-105"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
            <h1 className="text-2xl font-bold text-white">Profile Settings</h1>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-8 py-8">
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 mb-8"
        >
          <div className="flex items-center gap-6 mb-8">
            <div className="relative">
              <Image
                src={session.user.image || "/default-food.png"}
                alt="Profile"
                width={80}
                height={80}
                className="rounded-full border-4 border-[#e783b5] shadow-lg"
              />
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">{session.user.name}</h2>
              <div className="flex items-center gap-4 text-white/70">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  {session.user.email}
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Member since {new Date(session.user.lastLogin).toLocaleDateString()}
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          {userStats && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white/10 rounded-xl p-6 border border-white/20">
                <div className="flex items-center gap-3 mb-2">
                  <Heart className="w-5 h-5 text-[#e783b5]" />
                  <span className="text-white/70">Total Recipes</span>
                </div>
                <p className="text-2xl font-bold text-white">{userStats.totalRecipes}</p>
              </div>
              <div className="bg-white/10 rounded-xl p-6 border border-white/20">
                <div className="flex items-center gap-3 mb-2">
                  <Clock className="w-5 h-5 text-[#e783b5]" />
                  <span className="text-white/70">Favorite Recipes</span>
                </div>
                <p className="text-2xl font-bold text-white">{userStats.favoriteRecipes}</p>
              </div>
            </div>
          )}
        </motion.div>

        {/* Linked Accounts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 mb-8"
        >
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Linked Accounts
          </h3>
          
          <div className="space-y-4">
            {session.user.providers?.map((provider) => (
              <div key={provider} className="flex items-center justify-between p-4 bg-white/10 rounded-xl border border-white/20">
                <div className="flex items-center gap-3">
                  {getProviderIcon(provider)}
                  <div>
                    <p className="text-white font-medium capitalize">{provider}</p>
                    <p className="text-white/60 text-sm">Connected</p>
                  </div>
                </div>
                <CheckCircle className="w-5 h-5 text-green-400" />
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-blue-500/20 border border-blue-500/30 rounded-xl">
            <p className="text-blue-200 text-sm">
              💡 <strong>Tip:</strong> You can sign in with any of your linked accounts. 
              Your recipes and preferences will be shared across all linked accounts.
            </p>
          </div>
        </motion.div>

        {/* Account Security */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20"
        >
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Account Security
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-white/10 rounded-xl border border-white/20">
              <div>
                <p className="text-white font-medium">Email Verification</p>
                <p className="text-white/60 text-sm">Your email is verified through your authentication provider</p>
              </div>
              <CheckCircle className="w-5 h-5 text-green-400" />
            </div>
            
            <div className="flex items-center justify-between p-4 bg-white/10 rounded-xl border border-white/20">
              <div>
                <p className="text-white font-medium">Two-Factor Authentication</p>
                <p className="text-white/60 text-sm">Protected by your authentication provider's security</p>
              </div>
              <CheckCircle className="w-5 h-5 text-green-400" />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 