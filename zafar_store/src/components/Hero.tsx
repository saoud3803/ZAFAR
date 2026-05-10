"use client";

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface HeroProps {
  heroSettings: any;
}

const Hero = ({ heroSettings }: HeroProps) => {
  if (!heroSettings) return null;

  return (
    <section className="relative w-full h-screen min-h-[700px] lg:min-h-[900px] overflow-hidden bg-[#0a0a0a] text-white font-ui-mono">

      {/* ─── Background Image ─── */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroSettings.background_image || "/hero-bg.png"}
          alt="Zafar Collection"
          className="w-full h-full object-cover object-center lg:object-[70%_center] opacity-75"
        />
        {/* Mobile gradient: soft bottom fade */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/80 via-[#0a0a0a]/30 to-[#0a0a0a]/20 lg:hidden" />
        {/* Desktop gradient: cinematic left-to-right */}
        <div className="absolute inset-0 hidden lg:block bg-gradient-to-r from-[#0a0a0a] from-[30%] via-[#0a0a0a]/75 via-[55%] to-transparent" />
        {/* Desktop top/bottom vignette */}
        <div className="absolute inset-0 hidden lg:block bg-gradient-to-b from-[#0a0a0a]/40 via-transparent to-[#0a0a0a]/50" />
      </div>

      {/* ══════════════════════════════════════════
          MOBILE LAYOUT  (< lg) — DO NOT TOUCH
      ══════════════════════════════════════════ */}
      <div className="lg:hidden relative z-10 flex flex-col items-start justify-center w-full h-full px-8">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] }}
          className="font-serif italic text-[100px] sm:text-[140px] leading-[0.7] text-[#F4F0EF] tracking-tighter"
          style={{ textShadow: '0 10px 30px rgba(0,0,0,0.5)' }}
        >
          {heroSettings.title1}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.25, 1, 0.5, 1] }}
          className="font-serif italic text-[120px] sm:text-[160px] leading-[0.6] text-[#D1BFA5] tracking-tighter pl-12 sm:pl-24"
          style={{ textShadow: '0 10px 30px rgba(0,0,0,0.5)' }}
        >
          {heroSettings.title2}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.25, 1, 0.5, 1] }}
          className="font-serif text-[80px] sm:text-[110px] leading-[0.7] text-white tracking-tight mt-6"
          style={{ textShadow: '0 10px 30px rgba(0,0,0,0.5)' }}
        >
          {heroSettings.title3}
        </motion.div>
      </div>
      {/* Mobile CTA */}
      <div className="lg:hidden absolute bottom-12 w-full px-8 flex justify-center z-20">
        <Link
          href="/collections/new-drop"
          className="group flex items-center justify-between px-8 py-4 bg-white text-black font-ui-mono text-[10px] tracking-[0.2em] w-[220px] transition-all hover:bg-[#D1BFA5]"
        >
          <span>SHOP NEW DROP</span>
          <ArrowRight strokeWidth={1} className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* ══════════════════════════════════════════
          DESKTOP LAYOUT  (≥ lg)
      ══════════════════════════════════════════ */}
      <div className="hidden lg:flex relative z-10 flex-col justify-between w-full h-full max-w-[1440px] mx-auto px-20 py-12">

        {/* Top bar — editorial metadata */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.1 }}
          className="flex items-center gap-6 text-[10px] tracking-[0.25em] text-white/40 font-ui-mono"
        >
          <span>SS'26</span>
          <span className="w-12 h-px bg-white/20 block" />
          <span>NEW COLLECTION</span>
        </motion.div>

        {/* Centre — main typography block */}
        <div className="flex flex-col max-w-[58%]">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] }}
            className="font-serif italic text-[130px] xl:text-[160px] 2xl:text-[190px] leading-[0.75] text-[#F4F0EF] tracking-tighter"
            style={{ textShadow: '0 8px 40px rgba(0,0,0,0.6)' }}
          >
            {heroSettings.title1}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.15, ease: [0.25, 1, 0.5, 1] }}
            className="font-serif italic text-[150px] xl:text-[185px] 2xl:text-[215px] leading-[0.65] text-[#D1BFA5] tracking-tighter pl-20 xl:pl-28"
            style={{ textShadow: '0 8px 40px rgba(0,0,0,0.6)' }}
          >
            {heroSettings.title2}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.25, 1, 0.5, 1] }}
            className="font-serif text-[90px] xl:text-[115px] 2xl:text-[135px] leading-[0.75] text-white tracking-tight mt-4"
            style={{ textShadow: '0 8px 40px rgba(0,0,0,0.6)' }}
          >
            {heroSettings.title3}
          </motion.div>
        </div>

        {/* Bottom bar — CTA + tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6, ease: [0.25, 1, 0.5, 1] }}
          className="flex items-end justify-between"
        >
          {/* Left: CTA */}
          <div className="flex items-center gap-6">
            <Link
              href="/collections/new-drop"
              className="group flex items-center justify-between px-8 py-4 bg-white text-black font-ui-mono text-[10px] tracking-[0.2em] w-[220px] transition-all hover:bg-[#D1BFA5]"
            >
              <span>SHOP NEW DROP</span>
              <ArrowRight strokeWidth={1} className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/collections/men"
              className="group flex items-center gap-3 text-[10px] tracking-[0.2em] text-white/50 hover:text-white transition-colors"
            >
              <span>EXPLORE ALL</span>
              <ArrowRight strokeWidth={1} className="w-3 h-3 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Right: editorial label */}
          <div className="text-right text-[10px] tracking-[0.2em] text-white/30 font-ui-mono">
            <p>LUXURY STREETWEAR</p>
            <p className="mt-1">MAROC — EST. 2024</p>
          </div>
        </motion.div>
      </div>

    </section>
  );
};

export default Hero;
