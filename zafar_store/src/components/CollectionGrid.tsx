"use client";

import React from 'react';
import ProductCard from './ProductCard';
import { Product } from '@/lib/data';
import { motion } from 'framer-motion';

interface CollectionGridProps {
  title: string;
  products: Product[];
}

const CollectionGrid: React.FC<CollectionGridProps> = ({ title, products }) => {
  return (
    <section className="mb-32">
      {/* Editorial Header */}
      <div className="relative w-full h-[60vh] min-h-[500px] mb-24 flex flex-col items-center justify-center text-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://slqwuwrnlfsnibhcoiwt.supabase.co/storage/v1/object/public/website/Header%202.png" 
            alt="Collection Campaign" 
            className="w-full h-full object-cover object-[center_top] opacity-80"
          />
          <div className="absolute inset-0 bg-white/30 backdrop-blur-[2px]"></div>
        </div>
        
        <div className="relative z-10 px-8 max-w-4xl mx-auto flex flex-col items-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
            className="font-serif italic text-[60px] md:text-[100px] lg:text-[120px] leading-[0.8] tracking-tighter text-zinc-950 mb-6 uppercase"
          >
            {title}
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="w-12 h-[1px] bg-zinc-950 mb-6"
          ></motion.div>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="font-body-md text-zinc-500 max-w-lg mx-auto leading-relaxed"
          >
            A curated selection of our finest heavyweight cotton garments. Engineered for perfect drape and uncompromising structure.
          </motion.p>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="font-ui-mono text-[10px] tracking-widest uppercase mt-8 text-zinc-400"
          >
            [{products.length} PIECES]
          </motion.span>
        </div>
      </div>
      
      {products.length === 0 ? (
        <div className="py-32 text-center font-ui-mono text-zinc-400 tracking-widest text-[10px] uppercase">
          No products found in this collection.
        </div>
      ) : (
        <div className="px-6 md:px-12 max-w-[1440px] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
            {products.map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.25, 1, 0.5, 1] }}
                className="group"
              >
                <ProductCard 
                  id={product.id}
                  slug={(product as any).slug}
                  name={product.name}
                  price={product.formattedPrice}
                  category={product.category}
                  image={product.images[0]}
                  hoverImage={product.images[1]}
                  index={idx}
                />
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default CollectionGrid;
