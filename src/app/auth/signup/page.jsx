'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Eye, EyeOff, ArrowRight, Sparkles, Check, Zap, Crown, Gift } from 'lucide-react';
import { signIn } from 'next-auth/react';

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', name: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Signup failed.');
      } else {
        setSuccess('Account created successfully! Welcome to FoodBot! 🎉');
        setForm({ email: '', name: '', password: '' });
        setTimeout(() => router.push('/auth/signin'), 2000);
      }
    } catch (err) {
      setError('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  // Password strength checker
  const getPasswordStrength = () => {
    const password = form.password;
    if (password.length < 6) return { strength: 'weak', color: 'bg-red-400', width: '25%', text: 'Weak' };
    if (password.length < 8) return { strength: 'fair', color: 'bg-yellow-400', width: '50%', text: 'Fair' };
    if (password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/)) {
      return { strength: 'strong', color: 'bg-green-400', width: '100%', text: 'Strong' };
    }
    return { strength: 'good', color: 'bg-blue-400', width: '75%', text: 'Good' };
  };

  const passwordStrength = getPasswordStrength();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-800 to-purple-900 relative overflow-hidden flex items-center justify-center p-4 pt-28">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
      </div>

      {/* Floating Food Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ 
            y: [0, -25, 0],
            rotate: [0, 8, 0]
          }}
          transition={{ 
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-32 left-16 text-6xl opacity-20"
        >
          🍰
        </motion.div>
        <motion.div
          animate={{ 
            y: [0, 20, 0],
            rotate: [0, -5, 0]
          }}
          transition={{ 
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5
          }}
          className="absolute top-48 right-20 text-5xl opacity-20"
        >
          🥘
        </motion.div>
        <motion.div
          animate={{ 
            y: [0, -15, 0],
            rotate: [0, 3, 0]
          }}
          transition={{ 
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3
          }}
          className="absolute bottom-32 left-1/4 text-4xl opacity-20"
        >
          🍜
        </motion.div>
        <motion.div
          animate={{ 
            y: [0, 18, 0],
            rotate: [0, -4, 0]
          }}
          transition={{ 
            duration: 4.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
          className="absolute bottom-40 right-1/4 text-5xl opacity-20"
        >
          🍕
        </motion.div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo and Title */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <motion.div 
            className="flex items-center justify-center mb-6"
            whileHover={{ scale: 1.1, rotate: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-tr from-pink-500 via-purple-500 to-indigo-500 rounded-full flex items-center justify-center shadow-2xl border-4 border-white/20 backdrop-blur-sm">
                <span className="text-4xl">🍽️</span>
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center animate-pulse">
                <Crown className="w-4 h-4 text-white" />
              </div>
            </div>
          </motion.div>
          <motion.h1 
            className="text-5xl font-black text-white mb-3 tracking-tight"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Join the Family!
          </motion.h1>
          <motion.p 
            className="text-white/90 text-xl font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Your culinary journey starts here
          </motion.p>
        </motion.div>

        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.4, type: "spring" }}
          className="backdrop-blur-xl bg-gradient-to-br from-white/20 to-white/10 rounded-3xl p-8 border border-white/30 shadow-2xl relative overflow-hidden"
        >
          {/* Card Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-purple-500/10 rounded-3xl"></div>
          <div className="relative z-10">
            
            {/* Error/Success Messages */}
            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mb-6 p-4 bg-red-500/30 border border-red-400/50 rounded-2xl text-red-100 text-sm backdrop-blur-sm font-medium"
              >
                {error}
              </motion.div>
            )}

            {success && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mb-6 p-4 bg-green-500/30 border border-green-400/50 rounded-2xl text-green-100 text-sm backdrop-blur-sm flex items-center gap-2 font-medium"
              >
                <Check className="w-5 h-5 flex-shrink-0" />
                {success}
              </motion.div>
            )}

            {/* Social Sign Up */}
            <div className="space-y-4 mb-8">
              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
                className="w-full group relative flex items-center justify-center gap-3 px-6 py-5 bg-white hover:bg-gray-50 text-gray-800 rounded-2xl transition-all duration-300 font-bold shadow-xl hover:shadow-2xl border border-gray-200 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <svg className="w-6 h-6 relative z-10" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span className="relative z-10">Sign up with Google</span>
                <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300 relative z-10" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => signIn('discord', { callbackUrl: '/dashboard' })}
                className="w-full group relative flex items-center justify-center gap-3 px-6 py-5 bg-[#5865F2] hover:bg-[#4752C4] text-white rounded-2xl transition-all duration-300 font-bold shadow-xl hover:shadow-2xl overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400/30 to-blue-400/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <svg className="w-6 h-6 relative z-10" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
                </svg>
                <span className="relative z-10">Sign up with Discord</span>
                <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300 relative z-10" />
              </motion.button>
            </div>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/30"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="px-6 text-white/80 text-sm font-bold bg-gradient-to-br from-purple-900 via-pink-800 to-purple-900 rounded-full border border-white/20">
                  or create your account
                </span>
              </div>
            </div>

            {/* Sign Up Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-white font-bold text-sm">Email Address</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-4 rounded-2xl bg-white/20 border-2 border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-4 focus:ring-pink-400/50 focus:border-pink-400 backdrop-blur-sm transition-all duration-300 font-medium"
                />
              </div>

              <div className="space-y-2">
                <label className="text-white font-bold text-sm">Username</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Choose a cool username"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-4 rounded-2xl bg-white/20 border-2 border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-4 focus:ring-pink-400/50 focus:border-pink-400 backdrop-blur-sm transition-all duration-300 font-medium"
                />
              </div>

              <div className="space-y-2">
                <label className="text-white font-bold text-sm">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="Create a strong password"
                    value={form.password}
                    onChange={handleChange}
                    required
                    minLength={6}
                    className="w-full px-5 py-4 rounded-2xl bg-white/20 border-2 border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-4 focus:ring-pink-400/50 focus:border-pink-400 backdrop-blur-sm transition-all duration-300 pr-14 font-medium"
                  />
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </motion.button>
                </div>
                
                {/* Password Strength Indicator */}
                {form.password && (
                  <div className="mt-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-white/70 font-medium">Password strength</span>
                      <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                        passwordStrength.strength === 'weak' ? 'text-red-200 bg-red-500/30' :
                        passwordStrength.strength === 'fair' ? 'text-yellow-200 bg-yellow-500/30' :
                        passwordStrength.strength === 'good' ? 'text-blue-200 bg-blue-500/30' : 'text-green-200 bg-green-500/30'
                      }`}>
                        {passwordStrength.text}
                      </span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
                      <div 
                        className={`h-2 rounded-full transition-all duration-500 ${passwordStrength.color}`}
                        style={{ width: passwordStrength.width }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>

              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full py-5 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600 text-white font-black text-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3 relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                {loading ? (
                  <>
                    <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                    <span className="relative z-10">Creating Your Account...</span>
                  </>
                ) : (
                  <>
                    <span className="relative z-10">Create Account</span>
                    <Zap className="w-5 h-5 relative z-10" />
                  </>
                )}
              </motion.button>
            </form>

            {/* Sign In Link */}
            <div className="mt-8 text-center">
              <p className="text-white/80 font-medium">
                Already have an account?{' '}
                <Link href="/auth/signin" className="text-pink-300 hover:text-pink-200 font-bold transition-colors underline decoration-2 underline-offset-2">
                  Sign in here
                </Link>
              </p>
            </div>

            {/* Benefits */}
            <div className="mt-8 pt-6 border-t border-white/30">
              <h3 className="text-white/90 font-bold mb-4 text-center text-sm flex items-center justify-center gap-2">
                <Gift className="w-4 h-4" />
                What you'll get for FREE:
              </h3>
              <div className="grid grid-cols-1 gap-3">
                <div className="flex items-center gap-3 text-white/80 text-sm font-medium">
                  <div className="w-3 h-3 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full flex-shrink-0"></div>
                  Save unlimited recipes to your personal collection
                </div>
                <div className="flex items-center gap-3 text-white/80 text-sm font-medium">
                  <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-indigo-400 rounded-full flex-shrink-0"></div>
                  Get personalized AI-powered food recommendations
                </div>
                <div className="flex items-center gap-3 text-white/80 text-sm font-medium">
                  <div className="w-3 h-3 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full flex-shrink-0"></div>
                  Access to premium cooking features and tips
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-8"
        >
          <p className="text-white/60 text-sm font-medium">
            Join 10,000+ food lovers • Free forever
          </p>
        </motion.div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}