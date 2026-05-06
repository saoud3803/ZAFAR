"use client";

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeroProps {
  heroSettings: any;
}

const Hero = ({ heroSettings }: HeroProps) => {
  if (!heroSettings) return null;

  return (
    <section className="relative w-full h-screen min-h-[800px] overflow-hidden bg-[#0a0a0a] text-white flex items-center justify-center font-ui-mono">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroSettings.background_image || "/hero-bg.png"} 
          alt="Zafar Collection" 
          className="w-full h-full object-cover object-[center_right] opacity-70"
        />
        {/* Gradient overlay to ensure text readability on the left */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent"></div>
      </div>

      {/* Removed small metadata and side texts for ultra-minimalist look */}

      {/* --- Main Left Typography --- */}
      <div className="relative z-10 flex flex-col items-start justify-center w-full h-full max-w-[1440px] px-8 md:px-20 mx-auto">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] }}
          className="font-serif italic text-[100px] sm:text-[140px] md:text-[180px] leading-[0.7] text-[#F4F0EF] tracking-tighter"
          style={{ textShadow: '0 10px 30px rgba(0,0,0,0.5)' }}
        >
          {heroSettings.title1}
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.25, 1, 0.5, 1] }}
          className="font-serif italic text-[120px] sm:text-[160px] md:text-[200px] leading-[0.6] text-[#D1BFA5] tracking-tighter pl-12 sm:pl-24"
          style={{ textShadow: '0 10px 30px rgba(0,0,0,0.5)' }}
        >
          {heroSettings.title2}
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.25, 1, 0.5, 1] }}
          className="font-serif text-[80px] sm:text-[110px] md:text-[140px] lg:text-[160px] leading-[0.7] text-white tracking-tight mt-6"
          style={{ textShadow: '0 10px 30px rgba(0,0,0,0.5)' }}
        >
          {heroSettings.title3}
        </motion.div>
      </div>

      {/* --- Minimal Bottom Area for Buttons --- */}
      <div className="absolute bottom-12 w-full px-8 flex justify-center z-20">
        <div className="flex flex-col sm:flex-row gap-4">
          <button className="group flex items-center justify-between px-8 py-4 bg-white text-black font-ui-mono text-[10px] tracking-[0.2em] w-[220px] transition-all hover:bg-[#D1BFA5]">
            <span>SHOP NEW DROP</span>
            <ArrowRight strokeWidth={1} className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
