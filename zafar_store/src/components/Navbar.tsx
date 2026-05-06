"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '@/store/useCartStore';
import { Search, User, ShoppingBag, Menu, X, ArrowRight } from 'lucide-react';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const cartCount = useCartStore((state) => state.getCartCount());
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'T-SHIRTS', href: '/collections', hasDropdown: true },
    { name: 'BEST SELLERS', href: '/collections/best-sellers', hasDropdown: false },
    { name: 'LOOKBOOK', href: '/lookbook', hasDropdown: false },
  ];

  // Mega Menu Content
  const renderMegaMenu = () => {
    if (!hoveredCategory || hoveredCategory !== 'T-SHIRTS') return null;

    let imageSrc = "https://slqwuwrnlfsnibhcoiwt.supabase.co/storage/v1/object/public/website/Header%202.png";
    let title = "Quiet Riot. Tailored.";
    let description = "A curated selection of our finest heavyweight cotton garments. Engineered for perfect drape and uncompromising structure.";
    let subcategories = [
      { name: 'For Men', href: '/collections/men' },
      { name: 'For Women', href: '/collections/women' },
      { name: 'All T-Shirts', href: '/collections' },
      { name: 'NEW DROP', href: '/collections/new-drop' }
    ];

    return (
      <motion.div
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -5 }}
        transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
        className="absolute top-[104px] left-0 w-full bg-[#FAFAFA] border-b border-zinc-200 shadow-sm z-40 overflow-hidden"
        onMouseEnter={() => setHoveredCategory(hoveredCategory)}
        onMouseLeave={() => setHoveredCategory(null)}
      >
        <div className="max-w-[1440px] mx-auto px-12 py-24 flex gap-24">
          
          {/* Minimal Links Column */}
          <div className="flex flex-col space-y-8 min-w-[240px] pt-4">
            <h3 className="font-ui-mono text-zinc-400 text-[9px] tracking-[0.2em] uppercase mb-4">Categories</h3>
            {subcategories.map((item, idx) => (
              <motion.div 
                key={item.name}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.1 + (idx * 0.05) }}
              >
                <Link 
                  href={item.href} 
                  className="group relative inline-flex font-body-md text-zinc-500 hover:text-zinc-950 transition-colors duration-500 text-lg"
                  onClick={() => setHoveredCategory(null)}
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-zinc-950 transition-all duration-500 ease-out group-hover:w-full"></span>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Featured Editorial Block */}
          <div className="flex-1 flex gap-16">
            <div className="w-[400px] h-[500px] overflow-hidden bg-zinc-100 relative group">
              <img 
                src={imageSrc} 
                alt={title} 
                className="w-full h-full object-cover object-[center_top] transition-transform duration-[1.5s] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            </div>
            
            <div className="flex flex-col justify-center max-w-[340px]">
              <motion.h4 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="font-serif italic text-4xl md:text-5xl mb-6 text-zinc-950 leading-tight tracking-tight"
              >
                {title}
              </motion.h4>
              
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="font-body-md text-zinc-500 mb-10 leading-relaxed text-sm"
              >
                {description}
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Link 
                  href="/collections"
                  className="group inline-flex items-center gap-3 font-ui-mono text-[10px] tracking-[0.2em] uppercase text-zinc-950"
                  onClick={() => setHoveredCategory(null)}
                >
                  <span className="relative">
                    Shop Collection
                    <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-zinc-950 transition-transform duration-500 origin-left scale-x-100 group-hover:scale-x-0"></span>
                  </span>
                  <ArrowRight className="w-3 h-3 transform group-hover:translate-x-2 transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]" strokeWidth={1.5} />
                </Link>
              </motion.div>
            </div>
          </div>

        </div>
      </motion.div>
    );
  };

  return (
    <>
      {/* Premium Announcement Bar — Fixed */}
      <div className="fixed top-0 left-0 w-full bg-[#111] text-white py-2.5 px-4 text-center z-[60]">
        <span className="font-ui-mono text-[10px] tracking-[0.2em] font-light">
          FW26 COLLECTION LIVE NOW — WORLDWIDE SHIPPING
        </span>
      </div>
      
      {/* Main Navbar */}
      <nav 
        className={`fixed w-full z-50 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] top-[36px] bg-[#FAFAFA] border-b border-zinc-200 ${
          isScrolled ? 'shadow-[0_8px_30px_rgba(0,0,0,0.08)]' : ''
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-8 lg:px-12 h-[104px] flex items-center justify-between">
          
          {/* Navigation Links (Left) */}
          <div className="hidden lg:flex items-center space-x-10 flex-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (pathname.startsWith(link.href) && link.href !== '/collections');
              return (
                <div 
                  key={link.name}
                  className="relative h-[104px] flex items-center"
                  onMouseEnter={() => link.hasDropdown && setHoveredCategory(link.name)}
                  onMouseLeave={() => setHoveredCategory(null)}
                >
                  <Link 
                    href={link.href}
                    className={`font-ui-mono tracking-[0.15em] uppercase text-[11px] transition-colors duration-500 relative group overflow-hidden py-2 ${
                      isActive ? 'text-zinc-950 font-medium' : 'text-zinc-500 hover:text-zinc-950'
                    }`}
                  >
                    {link.name}
                    {/* Elegant underline animation */}
                    <span 
                      className={`absolute bottom-0 left-0 w-full h-[1px] bg-zinc-950 transform origin-left transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                        isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                      }`}
                    />
                  </Link>
                </div>
              );
            })}
          </div>
          
          {/* Center Brand Logo */}
          <div className="absolute left-1/2 transform -translate-x-1/2 flex justify-center">
            <Link 
              href="/" 
              className="font-headline-lg text-[40px] md:text-[48px] font-medium tracking-[0.25em] text-zinc-950 ml-[0.25em]" // ml offsets tracking for perfect centering
              onClick={() => setHoveredCategory(null)}
            >
              ZAFAR
            </Link>
          </div>
          
          {/* Trailing Icons (Right) */}
          <div className="flex items-center justify-end space-x-8 flex-1 text-zinc-950">
            <button aria-label="search" className="hidden sm:block hover:text-zinc-500 transition-colors duration-500 group">
              <Search strokeWidth={1} className="w-5 h-5 group-hover:scale-110 transition-transform duration-500" />
            </button>
            <button aria-label="person" className="hidden sm:block hover:text-zinc-500 transition-colors duration-500 group">
              <User strokeWidth={1} className="w-5 h-5 group-hover:scale-110 transition-transform duration-500" />
            </button>
            <Link href="/checkout" aria-label="shopping_bag" className="relative hover:text-zinc-500 transition-colors duration-500 group flex items-center">
              <ShoppingBag strokeWidth={1} className="w-5 h-5 group-hover:scale-110 transition-transform duration-500" />
              {mounted && cartCount > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-zinc-950 text-white text-[9px] font-ui-mono w-4 h-4 flex items-center justify-center rounded-full border border-[#FAFAFA]">
                  {cartCount}
                </span>
              )}
            </Link>
            
            {/* Mobile Menu Toggle */}
            <div className="lg:hidden flex items-center ml-2">
              <button onClick={() => setIsMobileMenuOpen(true)} className="text-zinc-950">
                <Menu strokeWidth={1} className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mega Menu Dropdown */}
      <AnimatePresence>
        {hoveredCategory && renderMegaMenu()}
      </AnimatePresence>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] lg:hidden"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
              className="fixed top-0 right-0 w-[90vw] max-w-[450px] h-full bg-[#FAFAFA] z-[110] shadow-2xl flex flex-col lg:hidden overflow-y-auto"
            >
              <div className="flex justify-end p-8 border-b border-zinc-200">
                <button onClick={() => setIsMobileMenuOpen(false)} className="text-zinc-950 hover:text-zinc-500 transition-colors">
                  <X strokeWidth={1} className="w-8 h-8" />
                </button>
              </div>
              <div className="flex flex-col px-12 py-12 space-y-10 flex-grow">
                {navLinks.map((link) => (
                  <Link 
                    key={link.name}
                    href={link.href}
                    className="font-headline-md text-3xl tracking-wide text-zinc-950 hover:text-zinc-500 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
              <div className="p-12 bg-zinc-100 flex justify-between items-center">
                <button className="flex flex-col items-center gap-2 text-zinc-600 hover:text-zinc-950 transition-colors">
                  <Search strokeWidth={1} className="w-6 h-6" />
                  <span className="font-ui-mono text-[10px] tracking-widest uppercase">Search</span>
                </button>
                <button className="flex flex-col items-center gap-2 text-zinc-600 hover:text-zinc-950 transition-colors">
                  <User strokeWidth={1} className="w-6 h-6" />
                  <span className="font-ui-mono text-[10px] tracking-widest uppercase">Account</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
