import React from 'react';
import { signIn } from 'next-auth/react';
import { LogIn } from 'lucide-react';

const LoginPromptCard = ({ message = 'Please log in to continue', buttonText = 'Login', onLogin }) => (
  <div className="max-w-xs mx-auto bg-white/90 rounded-2xl shadow-2xl p-8 flex flex-col items-center justify-center border border-pink-200">
    <div className="mb-4">
      <LogIn className="w-10 h-10 text-pink-500 mb-2" />
      <h2 className="text-xl font-bold text-gray-800 text-center">{message}</h2>
    </div>
    <button
      onClick={onLogin || (() => signIn('discord'))}
      className="mt-4 px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg font-semibold shadow hover:from-pink-600 hover:to-purple-600 transition-all"
    >
      {buttonText}
    </button>
  </div>
);

export default LoginPromptCard; 