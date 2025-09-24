'use client';

import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { AlertTriangle, ArrowLeft, Home } from 'lucide-react';
import Link from 'next/link';

export default function AuthError() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  const getErrorMessage = (error) => {
    switch (error) {
      case 'Configuration':
        return 'There is a problem with the server configuration. Please try again later.';
      case 'AccessDenied':
        return 'You do not have permission to sign in.';
      case 'Verification':
        return 'The verification link has expired or has already been used.';
      case 'Default':
      default:
        return 'An error occurred during authentication. Please try again.';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#271539] via-[#501f5a] to-[#e783b5] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-red-500/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-red-500/30">
              <AlertTriangle className="w-8 h-8 text-red-400" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Authentication Error</h1>
          <p className="text-white/70">Something went wrong during sign in</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-2xl"
        >
          <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-xl">
            <p className="text-red-200 text-sm">
              {getErrorMessage(error)}
            </p>
          </div>

          <div className="space-y-4">
            <Link
              href="/auth/signin"
              className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-[#e783b5] hover:bg-[#c2649b] text-white rounded-xl transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
            >
              <ArrowLeft className="w-4 h-4" />
              Try Again
            </Link>

            <Link
              href="/"
              className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all duration-200 font-medium border border-white/20"
            >
              <Home className="w-4 h-4" />
              Go Home
            </Link>
          </div>

          <div className="mt-6 pt-6 border-t border-white/20">
            <p className="text-white/50 text-sm text-center">
              If this problem persists, please contact support
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 