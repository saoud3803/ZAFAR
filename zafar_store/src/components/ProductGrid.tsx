"use client";

import React, { useRef, useState, useCallback } from 'react';
import ProductCard from './ProductCard';
import { Product } from '@/lib/data';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
}

const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const CARD_WIDTH = typeof window !== 'undefined' && window.innerWidth < 640 ? 236 : typeof window !== 'undefined' && window.innerWidth < 768 ? 266 : 296; // card width + gap

  const scroll = useCallback((direction: 'left' | 'right') => {
    const container = scrollRef.current;
    if (!container) return;
    const scrollAmount = 296; // card width + gap
    container.scrollBy({ left: direction === 'right' ? scrollAmount : -scrollAmount, behavior: 'smooth' });
  }, []);

  const handleScroll = useCallback(() => {
    const container = scrollRef.current;
    if (!container) return;
    const idx = Math.round(container.scrollLeft / 296);
    setCurrentIndex(Math.min(idx, products.length - 1));
  }, [products.length]);

  if (products.length === 0) {
    return (
      <div className="py-24 text-center font-mono text-[10px] tracking-widest text-zinc-400 uppercase">
        Aucun produit disponible
      </div>
    );
  }

  return (
    <section className="py-16">
      {/* Section Header */}
      <div className="flex items-end justify-between mb-8 px-1">
        <div>
          <p className="font-mono text-[9px] tracking-[0.25em] text-zinc-400 uppercase mb-1">Collection</p>
          <h2 className="font-serif italic text-3xl text-zinc-900 leading-none">New Drop</h2>
        </div>
        <a href="/collections" className="font-mono text-[10px] tracking-widest text-zinc-400 hover:text-zinc-900 transition-colors uppercase border-b border-zinc-300 pb-0.5">
          Tout voir →
        </a>
      </div>

      {/* Scrollable Cards */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex gap-4 overflow-x-auto pb-6 scrollbar-hide snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {products.map((product, idx) => (
          <div key={product.id} className="snap-start">
            <ProductCard
              id={product.id}
              slug={(product as any).slug}
              name={product.name}
              price={String(product.price)}
              category={product.category}
              image={product.images[0]}
              hoverImage={product.images[1]}
              index={idx}
            />
          </div>
        ))}
      </div>

      {/* Bottom controls */}
      <div className="flex items-center justify-between mt-4 px-1">
        {/* Arrows */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => scroll('left')}
            className="w-9 h-9 border border-zinc-300 rounded flex items-center justify-center text-zinc-500 hover:border-zinc-900 hover:text-zinc-900 transition-all duration-200"
          >
            <ChevronLeft className="w-4 h-4" strokeWidth={1.5} />
          </button>
          <button
            onClick={() => scroll('right')}
            className="w-9 h-9 border border-zinc-300 rounded flex items-center justify-center text-zinc-500 hover:border-zinc-900 hover:text-zinc-900 transition-all duration-200"
          >
            <ChevronRight className="w-4 h-4" strokeWidth={1.5} />
          </button>
        </div>

        {/* Progress bar */}
        <div className="flex-1 mx-6 h-[1px] bg-zinc-200 relative">
          <div
            className="absolute left-0 top-0 h-full bg-zinc-900 transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / products.length) * 100}%` }}
          />
        </div>

        {/* Counter */}
        <span className="font-mono text-[10px] tracking-widest text-zinc-400">
          {String(currentIndex + 1).padStart(2, '0')} / {String(products.length).padStart(2, '0')}
        </span>
      </div>
    </section>
  );
};

export default ProductGrid;
