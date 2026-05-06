"use client";

import React from 'react';
import Link from 'next/link';
import { useCartStore } from '@/store/useCartStore';

interface ProductCardProps {
  id: string;
  slug?: string;
  name: string;
  price: string;
  category: string;
  image: string;
  hoverImage?: string;
  index: number;
}

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const ProductCard: React.FC<ProductCardProps> = ({
  id, slug, name, price, category, image, hoverImage, index
}) => {
  const label = `${LETTERS[index % 26]} · ${String(index + 1).padStart(2, '0')}`;
  const href = slug ? `/product/${slug}` : `/product/${id}`;

  return (
    <Link href={href} className="group flex-shrink-0 w-[220px] sm:w-[250px] md:w-[280px] block">
      {/* Image container — portrait 3:4 */}
      <div className="relative w-full aspect-[3/4] overflow-hidden bg-zinc-100">
        {/* Main image */}
        <img
          src={image || '/placeholder.jpg'}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105"
        />
        {/* Hover image */}
        {hoverImage && (
          <img
            src={hoverImage}
            alt={`${name} alt`}
            className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          />
        )}

        {/* Top-right label */}
        <div className="absolute top-3 right-3">
          <span className="font-mono text-[10px] tracking-widest text-white/80">{label}</span>
        </div>

        {/* Bottom name overlay */}
        <div className="absolute bottom-0 left-0 right-0 px-3 pb-3 pt-10 bg-gradient-to-t from-black/50 to-transparent">
          <p className="font-mono text-[9px] tracking-[0.15em] text-white/70 uppercase">
            {name.toUpperCase()} / {category}
          </p>
        </div>
      </div>

      {/* Below card info */}
      <div className="pt-3 pb-1">
        <div className="flex items-center justify-between mb-1">
          <span className="font-mono text-[9px] tracking-widest text-zinc-400 uppercase">{category}</span>
          <span className="font-mono text-[11px] text-zinc-700 tracking-wider">€ {price}</span>
        </div>
        <h3 className="font-serif text-[15px] text-zinc-900 leading-snug group-hover:opacity-70 transition-opacity duration-300">
          {name}
        </h3>
      </div>
    </Link>
  );
};

export default ProductCard;
