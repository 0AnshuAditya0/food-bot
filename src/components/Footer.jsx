'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { ArrowUp, Send, Mail, Phone, MapPin, Instagram, Twitter, MessageCircle, ExternalLink } from 'lucide-react';

const Footer = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(true);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Reset form
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      message: ''
    });
    setIsSubmitting(false);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <footer className="relative bg-gradient-to-br from-[#0033FF] via-[#0600AB] to-[#00033D] overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#0033FF]/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#0600AB]/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-r from-[#0033FF]/10 to-[#00033D]/10"></div>
      </div>
      
      {/* Noise Texture */}
      <div 
        className="absolute inset-0 opacity-[0.02] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundSize: '128px 128px'
        }}
      />

      <motion.div 
        className="relative z-10 max-w-7xl mx-auto px-6 py-16"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="grid lg:grid-cols-3 gap-12">
          
          {/* Left Section - Branding & Navigation */}
          <motion.div className="lg:col-span-1 space-y-8" variants={itemVariants}>
            {/* Logo & Brand */}
            <div>
              <motion.div 
                className="flex items-center gap-3 mb-6"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <span className="text-4xl">🍽️</span>
                <div>
                  <h3 className="text-2xl font-black text-white">FOODBOT</h3>
                  <p className="text-pink-400 text-sm uppercase tracking-wider">Discord Bot</p>
                </div>
              </motion.div>
              <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
                Transform your Discord server into a culinary adventure. Food games, smart suggestions, and meal discovery for your community.
              </p>
            </div>

            {/* Navigation Links */}
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h4 className="text-white font-bold mb-4">Navigation</h4>
                <ul className="space-y-3">
                  {['Dashboard', 'Features', 'Commands', 'Support'].map((item, index) => (
                    <motion.li key={item} variants={itemVariants}>
                      <a 
                        href={`/${item.toLowerCase()}`}
                        className="text-gray-400 text-sm hover:text-pink-400 transition-colors duration-300 flex items-center gap-2 group"
                      >
                        <span>{item}</span>
                        <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-white font-bold mb-4">Features</h4>
                <ul className="space-y-3">
                  {['Food Games', 'Meal Planner', 'Recipe Search', 'Nutrition Info'].map((item, index) => (
                    <motion.li key={item} variants={itemVariants}>
                      <a 
                        href={`/features#${item.toLowerCase().replace(' ', '-')}`}
                        className="text-gray-400 text-sm hover:text-pink-400 transition-colors duration-300"
                      >
                        {item}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-3">
              <motion.div 
                className="flex items-center gap-3 text-gray-400 text-sm"
                variants={itemVariants}
              >
                <Mail className="w-4 h-4 text-pink-400" />
                <span>support@foodbot.com</span>
              </motion.div>
              <motion.div 
                className="flex items-center gap-3 text-gray-400 text-sm"
                variants={itemVariants}
              >
                <MessageCircle className="w-4 h-4 text-pink-400" />
                <span>Discord Support Server</span>
              </motion.div>
            </div>

            {/* Social Links */}
            <motion.div className="flex gap-4" variants={itemVariants}>
              {[
                { icon: Instagram, href: '#', label: 'Instagram' },
                { icon: Twitter, href: '#', label: 'Twitter' },
                { icon: MessageCircle, href: '#', label: 'Discord' }
              ].map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  className="w-10 h-10 bg-white/10 hover:bg-pink-600 rounded-lg flex items-center justify-center transition-all duration-300 group"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Section - Contact Form */}
          <motion.div className="lg:col-span-2" variants={itemVariants}>
            <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl">📧</span>
                <h3 className="text-2xl font-bold text-white">Get in Touch</h3>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Fields */}
                <div className="grid md:grid-cols-2 gap-4">
                  <motion.div variants={itemVariants}>
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-400 transition-all duration-300"
                      required
                    />
                  </motion.div>
                  <motion.div variants={itemVariants}>
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-400 transition-all duration-300"
                      required
                    />
                  </motion.div>
                </div>

                {/* Email Field */}
                <motion.div variants={itemVariants}>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-400 transition-all duration-300"
                    required
                  />
                </motion.div>

                {/* Phone Field */}
                <motion.div variants={itemVariants}>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number (Optional)"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-400 transition-all duration-300"
                  />
                </motion.div>

                {/* Message Field */}
                <motion.div variants={itemVariants}>
                  <textarea
                    name="message"
                    placeholder="Tell us how we can help you..."
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-400 transition-all duration-300 resize-none"
                    required
                  />
                </motion.div>

                {/* Submit Button */}
                <motion.div variants={itemVariants}>
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-gradient-to-r from-pink-600 to-pink-700 hover:from-pink-700 hover:to-pink-800 disabled:from-gray-600 disabled:to-gray-700 text-white font-bold px-8 py-3 rounded-lg transition-all duration-300 flex items-center gap-2 relative overflow-hidden group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="relative z-10">
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </span>
                    {!isSubmitting && (
                      <Send className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
                    )}
                    {isSubmitting && (
                      <motion.div
                        className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full relative z-10"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </motion.button>
                </motion.div>
              </form>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div 
          className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4"
          variants={itemVariants}
        >
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <span>© 2024 FoodBot. All rights reserved.</span>
            <span className="hidden md:inline">•</span>
            <a href="/privacy" className="hover:text-pink-400 transition-colors">Privacy Policy</a>
            <span>•</span>
            <a href="/terms" className="hover:text-pink-400 transition-colors">Terms of Service</a>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <span>Made with</span>
            <motion.span 
              className="text-pink-400 text-lg"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ❤️
            </motion.span>
            <span>for Discord communities</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <motion.button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-pink-600 to-pink-700 hover:from-pink-700 hover:to-pink-800 text-white rounded-full shadow-lg hover:shadow-pink-500/25 flex items-center justify-center z-50 transition-all duration-300"
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <ArrowUp className="w-5 h-5" />
        </motion.button>
      )}

      {/* Floating Food Emojis */}
      {['🍕', '🍔', '🌮'].map((emoji, index) => (
        <motion.div
          key={index}
          className="absolute text-6xl opacity-5 pointer-events-none select-none"
          style={{
            top: `${20 + index * 30}%`,
            right: `${10 + index * 15}%`,
          }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 4 + index,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.5
          }}
        >
          {emoji}
        </motion.div>
      ))}
    </footer>
  );
};

export default Footer;