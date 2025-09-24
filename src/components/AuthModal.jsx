import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, LogIn, UserPlus, Eye, EyeOff } from 'lucide-react';
import { signIn } from 'next-auth/react';

const SocialIcons = () => (
  <div className="flex items-center justify-center gap-4 mt-4">
    <button
      onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
      className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-pink-200 shadow hover:bg-pink-50 transition"
      title="Sign in with Google"
      type="button"
    >
      <svg className="w-5 h-5" viewBox="0 0 24 24">
        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
      </svg>
    </button>
    <button
      onClick={() => signIn('discord', { callbackUrl: '/dashboard' })}
      className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-pink-200 shadow hover:bg-pink-50 transition"
      title="Sign in with Discord"
      type="button"
    >
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
      </svg>
    </button>
  </div>
);

export default function AuthModal({ isOpen, onClose, initialView = 'login' }) {
  const [view, setView] = useState(initialView); // 'login' or 'signup'
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [signupForm, setSignupForm] = useState({ email: '', name: '', password: '' });
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const flipVariants = {
    login: { rotateY: 0 },
    signup: { rotateY: 180 },
  };

  const WaveSVG = ({ position = 'top' }) => (
    <svg
      className={`absolute left-0 w-full h-24 ${position === 'top' ? 'top-0' : 'bottom-0'} z-0`}
      viewBox="0 0 400 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      <path
        d="M0 40 Q100 80 200 40 T400 40 V80 H0 Z"
        fill="url(#gradient)"
      />
      <defs>
        <linearGradient id="gradient" x1="0" y1="0" x2="400" y2="0" gradientUnits="userSpaceOnUse">
          <stop stopColor="#e83e8c" />
          <stop offset="1" stopColor="#c2185b" />
        </linearGradient>
      </defs>
    </svg>
  );

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const result = await signIn('credentials', {
        email: loginForm.email,
        password: loginForm.password,
        redirect: false,
        callbackUrl: '/dashboard',
      });
      if (result?.error) {
        setError(result.error || 'Invalid email or password.');
      } else if (result?.url) {
        window.location.href = result.url;
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(signupForm),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Signup failed.');
      } else {
        setSuccess('Signup successful! You can now log in.');
        setSignupForm({ email: '', name: '', password: '' });
        setTimeout(() => setView('login'), 1200);
      }
    } catch (err) {
      setError('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="absolute inset-0" onClick={onClose} />
      <motion.div
        className="relative w-full max-w-sm h-[520px] [perspective:1200px]"
        initial={false}
        animate={view}
        variants={flipVariants}
        transition={{ duration: 0.7, ease: [0.4, 0.2, 0.2, 1] }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Login Card */}
        <motion.div
          className="absolute w-full h-full bg-white rounded-3xl shadow-2xl p-8 flex flex-col justify-center items-center [backface-visibility:hidden] overflow-hidden"
          style={{ zIndex: view === 'login' ? 2 : 1 }}
          animate={{ rotateY: 0 }}
        >
          <WaveSVG position="top" />
          <WaveSVG position="bottom" />
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-pink-500 z-10">
            <X className="w-5 h-5" />
          </button>
          <div className="flex flex-col items-center mb-6 z-10">
            <LogIn className="w-10 h-10 text-pink-500 mb-2" />
            <h2 className="text-3xl font-extrabold text-gray-800 mb-1 tracking-tight">Log In</h2>
          </div>
          <form onSubmit={handleLogin} className="w-full space-y-4 z-10">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={loginForm.email}
              onChange={e => setLoginForm(f => ({ ...f, email: e.target.value }))}
              required
              className="w-full px-4 py-2 rounded-lg border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white/80"
            />
            <div className="relative">
              <input
                type={showLoginPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                value={loginForm.password}
                onChange={e => setLoginForm(f => ({ ...f, password: e.target.value }))}
                required
                minLength={6}
                className="w-full px-4 py-2 rounded-lg border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400 pr-12 bg-white/80"
              />
              <button
                type="button"
                tabIndex={-1}
                onClick={() => setShowLoginPassword(v => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-pink-400 hover:text-pink-600 focus:outline-none"
                aria-label={showLoginPassword ? 'Hide password' : 'Show password'}
              >
                {showLoginPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="remember-login" className="accent-pink-500" />
              <label htmlFor="remember-login" className="text-sm text-gray-500">Remember Me</label>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 bg-gradient-to-r from-pink-500 to-pink-700 text-white rounded-full font-bold shadow hover:from-pink-600 hover:to-pink-700 transition-all disabled:opacity-60 text-lg"
            >
              {loading ? 'Logging in...' : 'Log In'}
            </button>
          </form>
          {error && <div className="mt-4 text-red-500 text-center z-10">{error}</div>}
          <div className="mt-6 text-center text-sm text-gray-600 z-10">
            Don&apos;t have an account?{' '}
            <button onClick={() => { setError(''); setSuccess(''); setView('signup'); }} className="text-pink-500 hover:underline font-semibold">Sign up</button>
          </div>
          <div className="flex items-center my-4 z-10">
            <div className="flex-grow h-px bg-pink-200" />
            <span className="mx-3 text-gray-400 text-sm">or log in with</span>
            <div className="flex-grow h-px bg-pink-200" />
          </div>
          <SocialIcons />
        </motion.div>
        {/* Signup Card (flipped) */}
        <motion.div
          className="absolute w-full h-full bg-white rounded-3xl shadow-2xl p-8 flex flex-col justify-center items-center [backface-visibility:hidden] overflow-hidden"
          style={{ transform: 'rotateY(180deg)', zIndex: view === 'signup' ? 2 : 1 }}
          animate={{ rotateY: 180 }}
        >
          <WaveSVG position="top" />
          <WaveSVG position="bottom" />
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-pink-500 z-10">
            <X className="w-5 h-5" />
          </button>
          <div className="flex flex-col items-center mb-6 z-10">
            <UserPlus className="w-10 h-10 text-pink-500 mb-2" />
            <h2 className="text-3xl font-extrabold text-gray-800 mb-1 tracking-tight">Sign Up</h2>
          </div>
          <form onSubmit={handleSignup} className="w-full space-y-4 z-10">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={signupForm.email}
              onChange={e => setSignupForm(f => ({ ...f, email: e.target.value }))}
              required
              className="w-full px-4 py-2 rounded-lg border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white/80"
            />
            <input
              type="text"
              name="name"
              placeholder="Username"
              value={signupForm.name}
              onChange={e => setSignupForm(f => ({ ...f, name: e.target.value }))}
              required
              className="w-full px-4 py-2 rounded-lg border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white/80"
            />
            <div className="relative">
              <input
                type={showSignupPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                value={signupForm.password}
                onChange={e => setSignupForm(f => ({ ...f, password: e.target.value }))}
                required
                minLength={6}
                className="w-full px-4 py-2 rounded-lg border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400 pr-12 bg-white/80"
              />
              <button
                type="button"
                tabIndex={-1}
                onClick={() => setShowSignupPassword(v => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-pink-400 hover:text-pink-600 focus:outline-none"
                aria-label={showSignupPassword ? 'Hide password' : 'Show password'}
              >
                {showSignupPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="remember-signup" className="accent-pink-500" />
              <label htmlFor="remember-signup" className="text-sm text-gray-500">Remember Me</label>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 bg-gradient-to-r from-pink-500 to-pink-700 text-white rounded-full font-bold shadow hover:from-pink-600 hover:to-pink-700 transition-all disabled:opacity-60 text-lg"
            >
              {loading ? 'Signing up...' : 'Sign Up'}
            </button>
          </form>
          {error && <div className="mt-4 text-red-500 text-center z-10">{error}</div>}
          {success && <div className="mt-4 text-green-600 text-center z-10">{success}</div>}
          <div className="mt-6 text-center text-sm text-gray-600 z-10">
            Already have an account?{' '}
            <button onClick={() => { setError(''); setSuccess(''); setView('login'); }} className="text-pink-500 hover:underline font-semibold">Log in</button>
          </div>
          <div className="flex items-center my-4 z-10">
            <div className="flex-grow h-px bg-pink-200" />
            <span className="mx-3 text-gray-400 text-sm">or sign up with</span>
            <div className="flex-grow h-px bg-pink-200" />
          </div>
          <SocialIcons />
        </motion.div>
      </motion.div>
    </div>
  );
} 