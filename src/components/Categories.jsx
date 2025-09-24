"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Send, ChefHat, Sparkles, Users, Clock, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Simple markdown renderer for chat messages
const MarkdownRenderer = ({ text }) => {
  // Convert markdown to HTML-like structure
  const formatText = (text) => {
    if (!text) return '';
    
    return text
      // Bold text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      // Bullet points
      .replace(/^•\s/gm, '• ')
      // Line breaks
      .replace(/\n/g, '<br />')
      // Split into paragraphs
      .split('<br /><br />')
      .map((paragraph, index) => (
        <p key={index} 
           className="mb-2 last:mb-0"
           dangerouslySetInnerHTML={{ __html: paragraph }} />
      ));
  };

  return <div className="markdown-content">{formatText(text)}</div>;
};

const AIChefAssistant = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [suggestedPrompts, setSuggestedPrompts] = useState([]);
  const [dietaryOptions, setDietaryOptions] = useState([]);
  const messagesContainerRef = useRef(null);

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    // Only scroll to bottom when new messages are added
    if (messages.length > 0) {
      scrollToBottom();
    }
  }, [messages]);

  useEffect(() => {
    // Load suggested prompts on component mount
    fetchSuggestedPrompts();
    
    // Add welcome message
    const welcomeMessage = {
      id: Date.now(),
      text: "Hello! I'm your AI Chef Assistant 👨‍🍳\n\nI can help you with:\n• **Recipe Creation** from available ingredients\n• **Ingredient Substitutions** when you're missing items\n• **Dietary Guidance** for any restrictions\n• **Cooking Tips** and meal planning\n\nWhat would you like to cook today?",
      sender: 'ai',
      timestamp: new Date().toISOString()
    };
    setMessages([welcomeMessage]);
  }, []);

  const fetchSuggestedPrompts = async () => {
    try {
      const response = await fetch('/api/chat');
      const data = await response.json();
      if (data.success) {
        setSuggestedPrompts(data.suggestedPrompts);
        setDietaryOptions(data.dietaryOptions);
      }
    } catch (error) {
      console.error('Error fetching prompts:', error);
    }
  };

  const sendMessage = async (message) => {
    if (!message.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      text: message,
      sender: 'user',
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      const data = await response.json();

      if (data.success) {
        const aiMessage = {
          id: Date.now() + 1,
          text: data.message,
          sender: 'ai',
          timestamp: data.timestamp
        };
        setMessages(prev => [...prev, aiMessage]);
      } else {
        // Handle error
        const errorMessage = {
          id: Date.now() + 1,
          text: 'Sorry, I encountered an error. Please try again.',
          sender: 'ai',
          timestamp: new Date().toISOString(),
          isError: true
        };
        setMessages(prev => [...prev, errorMessage]);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = {
        id: Date.now() + 1,
        text: 'Sorry, I encountered an error. Please try again.',
        sender: 'ai',
        timestamp: new Date().toISOString(),
        isError: true
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(inputMessage);
  };

  const handleSuggestedPrompt = (prompt) => {
    sendMessage(prompt);
  };

  const features = [
    {
      icon: Zap,
      title: "Instant Recipe Creation",
      description: "Transform any list of ingredients into complete recipes with cooking instructions, nutritional information, and timing."
    },
    {
      icon: Sparkles,
      title: "Smart Substitutions",
      description: "Don't have an ingredient? AI suggests the best alternatives while maintaining flavor and nutrition balance."
    },
    {
      icon: Clock,
      title: "Timing Optimization",
      description: "Get perfectly synchronized cooking steps to have everything ready at the same time, every time."
    },
    {
      icon: Users,
      title: "Personalized Suggestions",
      description: "AI learns your preferences, dietary restrictions, and cooking skill level to provide tailored recommendations."
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-[#977DFF] via-[#0033FF] to-[#0600AB] px-4 overflow-hidden relative flex items-center justify-center min-h-screen">
      {/* Beautiful Animated Border - More Concentrated */}
      <div className="absolute inset-8 rounded-3xl border-4 border-transparent bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 bg-clip-border animate-pulse">
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#977DFF] via-[#0033FF] to-[#0600AB] m-1"></div>
      </div>
      
      {/* Glowing Border Effect - More Concentrated */}
      <div className="absolute inset-8 rounded-3xl bg-gradient-to-r from-orange-400/30 via-pink-500/30 to-purple-600/30 blur-2xl animate-pulse"></div>
      
      {/* Corner Decorations - Adjusted Position */}
      <div className="absolute top-12 left-12 w-8 h-8 border-l-2 border-t-2 border-orange-400 rounded-tl-lg"></div>
      <div className="absolute top-12 right-12 w-8 h-8 border-r-2 border-t-2 border-pink-500 rounded-tr-lg"></div>
      <div className="absolute bottom-12 left-12 w-8 h-8 border-l-2 border-b-2 border-purple-600 rounded-bl-lg"></div>
      <div className="absolute bottom-12 right-12 w-8 h-8 border-r-2 border-b-2 border-orange-400 rounded-br-lg"></div>
      
      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/6 w-96 h-96 bg-[#977DFF]/15 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/6 w-80 h-80 bg-[#0033FF]/12 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-3/4 left-1/2 w-64 h-64 bg-[#0600AB]/15 rounded-full blur-3xl animate-pulse delay-500"></div>
        
        {/* Additional floating elements */}
        <div className="absolute top-1/3 right-1/4 w-4 h-4 bg-orange-400/60 rounded-full animate-bounce"></div>
        <div className="absolute bottom-1/3 left-1/4 w-3 h-3 bg-pink-500/60 rounded-full animate-bounce delay-1000"></div>
        <div className="absolute top-2/3 right-1/3 w-2 h-2 bg-purple-600/60 rounded-full animate-bounce delay-500"></div>
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto h-full flex flex-col justify-center p-8">
        {/* Title with enhanced styling */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-400/20 to-pink-500/20 backdrop-blur-md rounded-full px-6 py-3 mb-6 border border-orange-400/30">
            <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
            <span className="text-orange-400 text-sm font-medium">AI-Powered Intelligence</span>
            <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse delay-500"></div>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-4 relative">
            Your Personal <span className="bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">AI Chef</span>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-orange-400 to-pink-500 rounded-full"></div>
          </h2>
          <p className="text-white/80 text-lg max-w-2xl mx-auto leading-relaxed">
            Experience cooking like never before with an AI assistant that understands your taste, dietary needs, and cooking style.
          </p>
        </div>

        <div className="flex gap-8 h-[600px]">
          {/* Left Panel - Chat Interface */}
          <div className="flex-1 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-6 flex flex-col shadow-2xl shadow-purple-500/20">
            {/* Chat Header with Clear Button */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                  <ChefHat className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">AI Chef Assistant</h3>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-white/60 text-sm">Online</span>
                  </div>
                </div>
              </div>
              
              {/* Clear Chat Button */}
              <button
                onClick={() => {
                  setMessages([{
                    id: Date.now(),
                    text: "Hello! I'm your AI Chef Assistant 👨‍🍳\n\nI can help you with:\n• **Recipe Creation** from available ingredients\n• **Ingredient Substitutions** when you're missing items\n• **Dietary Guidance** for any restrictions\n• **Cooking Tips** and meal planning\n\nWhat would you like to cook today?",
                    sender: 'ai',
                    timestamp: new Date().toISOString()
                  }]);
                }}
                disabled={messages.length <= 1}
                className="px-3 py-1.5 bg-gradient-to-r from-red-500/20 to-pink-500/20 hover:from-red-500/30 hover:to-pink-500/30 border border-red-400/30 rounded-lg text-red-300 text-xs font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 shadow-lg"
                title="Clear chat history"
              >
                Clear Chat
              </button>
            </div>

            {/* Messages */}
            <div 
              ref={messagesContainerRef}
              className="flex-1 overflow-y-auto space-y-4 mb-4 scroll-smooth"
            >
              <AnimatePresence>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-3 shadow-lg ${
                        message.sender === 'user'
                          ? 'bg-gradient-to-r from-orange-400 to-pink-500 text-white'
                          : message.isError
                          ? 'bg-red-500/20 text-red-200 border border-red-400/30'
                          : 'bg-purple-200/20 text-white border border-purple-300/30'
                      }`}
                    >
                      {message.sender === 'user' ? (
                        <p className="text-sm leading-relaxed">{message.text}</p>
                      ) : (
                        <div className="text-sm leading-relaxed">
                          <MarkdownRenderer text={message.text} />
                        </div>
                      )}
                      <p className="text-xs opacity-60 mt-2">
                        {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Typing Indicator */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-purple-200/20 border border-purple-300/30 rounded-2xl px-4 py-3 shadow-lg">
                    <div className="flex items-center gap-2">
                      <span className="text-white/80 text-sm">AI is thinking</span>
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Input Field */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <textarea
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSubmit(e);
                    }
                  }}
                  placeholder="Ask about recipes, ingredients, or cooking tips... (Shift+Enter for new line)"
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 pr-12 text-white placeholder-white/60 focus:outline-none focus:border-orange-400/50 transition-colors resize-none min-h-[48px] max-h-32 shadow-lg"
                  disabled={isLoading}
                  rows={1}
                  style={{
                    minHeight: '48px',
                    maxHeight: '128px',
                    overflowY: 'auto'
                  }}
                />
                <button
                  type="submit"
                  disabled={isLoading || !inputMessage.trim()}
                  className="absolute right-2 top-2 w-10 h-10 bg-gradient-to-r from-orange-400 to-pink-500 hover:from-orange-500 hover:to-pink-600 disabled:bg-gray-500 rounded-lg flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                >
                  <Send className="w-5 h-5 text-white" />
                </button>
              </div>

              {/* Suggested Prompts */}
              <div className="flex flex-wrap gap-2">
                {suggestedPrompts.slice(0, 3).map((prompt, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestedPrompt(prompt)}
                    disabled={isLoading}
                    className="bg-gradient-to-r from-orange-400/20 to-pink-500/20 hover:from-orange-400/30 hover:to-pink-500/30 border border-orange-400/30 rounded-full px-4 py-2 text-white text-sm transition-all duration-300 disabled:opacity-50 hover:scale-105 shadow-lg"
                  >
                    "{prompt}"
                  </button>
                ))}
              </div>
            </form>
          </div>

          {/* Right Panel - Features */}
          <div className="w-80 space-y-4">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg">
                    <feature.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-sm mb-1">{feature.title}</h4>
                    <p className="text-white/70 text-xs leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Custom styles for markdown content */}
      <style jsx>{`
        .markdown-content strong {
          font-weight: 600;
          color: #fbbf24;
        }
        .markdown-content p {
          margin-bottom: 0.5rem;
        }
        .markdown-content p:last-child {
          margin-bottom: 0;
        }
      `}</style>
    </section>
  );
};

export default AIChefAssistant;