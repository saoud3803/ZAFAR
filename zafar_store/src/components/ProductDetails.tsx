"use client";

import React, { useState } from 'react';
import { Product } from '@/lib/data';
import { useCartStore } from '@/store/useCartStore';

interface ProductDetailsProps {
  product: Product;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToBag = () => {
    addItem({
      product,
      quantity: 1,
      selectedSize,
      selectedColor: typeof selectedColor === 'string' ? selectedColor : 'Default',
    });
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 pt-8">
      {/* Left: Image Gallery (Scrollable) */}
      <div className="w-full md:w-2/3 flex flex-col space-y-4">
        {product.images.map((img, idx) => (
          <div key={idx} className="w-full aspect-[3/4] bg-surface-container overflow-hidden">
            <img 
              alt={`${product.name} - View ${idx + 1}`} 
              className="w-full h-full object-cover" 
              src={img}
            />
          </div>
        ))}
      </div>
      
      {/* Right: Sticky Info Panel */}
      <div className="w-full md:w-1/3 relative">
        <div className="sticky top-[120px] flex flex-col pt-8 pb-16">
          
          {/* Product Header */}
          <div className="mb-12">
            <h1 className="font-serif text-[48px] md:text-[56px] leading-[1.1] text-zinc-900 tracking-tight mb-4 capitalize">
              {product.name.toLowerCase()}
            </h1>
            <p className="font-ui-mono text-[10px] tracking-[0.2em] text-zinc-500 uppercase">
              {product.category || 'OUTERWEAR'} / FW26 — QUIET RIOT
            </p>
          </div>
          
          {/* Price */}
          <div className="flex items-baseline gap-4 mb-12">
            <span className="font-serif text-[32px] md:text-[40px] text-zinc-950">{product.formattedPrice}</span>
            <span className="font-serif text-[20px] md:text-[24px] text-zinc-400 line-through">
              {product.price ? `${product.price + 200} MAD` : '€ 1,490'}
            </span>
            <span className="font-ui-mono text-[10px] tracking-[0.15em] text-[#B89B72]">
              — SAVE 200
            </span>
          </div>
          
          {/* Color Variant Selector */}
          <div className="mb-10">
            <div className="flex justify-between items-end mb-4">
              <span className="block font-ui-mono text-[10px] tracking-[0.2em] text-zinc-500 uppercase">
                COLOR <span className="mx-2">•</span> <span className="text-zinc-900">{typeof selectedColor === 'string' ? selectedColor : 'DEFAULT'}</span>
              </span>
              <span className="block font-ui-mono text-[10px] tracking-[0.2em] text-zinc-900 uppercase">
                3 OF 4 LEFT
              </span>
            </div>
            <div className="flex space-x-4 ml-1">
              {product.colors.map((colorStr) => {
                const colorName = typeof colorStr === 'string' ? colorStr : "Default";
                let bgColorClass = "bg-zinc-200";
                if (colorName.toLowerCase() === 'black' || colorName.toLowerCase() === 'obsidian') bgColorClass = 'bg-[#111]';
                else if (colorName.toLowerCase() === 'white' || colorName.toLowerCase() === 'cream') bgColorClass = 'bg-[#F4F0EF]';
                else if (colorName.toLowerCase() === 'beige') bgColorClass = 'bg-[#D1BFA5]';
                else if (colorName.toLowerCase() === 'taupe' || colorName.toLowerCase() === 'brown') bgColorClass = 'bg-[#B09A7D]';

                const isSelected = selectedColor === colorName;
                
                return (
                  <button 
                    key={colorName}
                    onClick={() => setSelectedColor(colorName as any)}
                    aria-label={colorName} 
                    className={`relative w-9 h-9 rounded-full flex items-center justify-center`}
                  >
                    {isSelected && (
                      <span className="absolute inset-0 rounded-full border border-zinc-900 w-11 h-11 -left-1 -top-1 pointer-events-none"></span>
                    )}
                    <span className={`w-9 h-9 rounded-full ${bgColorClass} border border-zinc-200 shadow-sm`}></span>
                  </button>
                );
              })}
            </div>
          </div>
          
          {/* Size Selector */}
          <div className="mb-12">
            <div className="flex justify-between items-end mb-4">
              <span className="block font-ui-mono text-[10px] tracking-[0.2em] text-zinc-500 uppercase">
                SIZE <span className="mx-2">•</span> <span className="text-zinc-900">{selectedSize}</span>
              </span>
              <a className="font-ui-mono text-[10px] tracking-[0.2em] text-zinc-900 uppercase border-b border-zinc-900 pb-[1px] hover:text-zinc-500 hover:border-zinc-500 transition-colors" href="#">
                SIZE GUIDE
              </a>
            </div>
            <div className="grid grid-cols-6 gap-2">
              {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size) => {
                const isAvailable = product.sizes.includes(size);
                const isSelected = selectedSize === size;

                return (
                  <button 
                    key={size}
                    onClick={() => isAvailable && setSelectedSize(size)}
                    disabled={!isAvailable}
                    className={`py-3.5 flex items-center justify-center font-ui-mono text-[11px] tracking-widest transition-all ${
                      isSelected 
                        ? 'bg-[#111] text-white border border-[#111]' 
                        : !isAvailable 
                          ? 'bg-transparent text-zinc-400 border border-zinc-200 line-through decoration-zinc-300' 
                          : 'bg-transparent text-zinc-900 border border-zinc-200 hover:border-zinc-400'
                    }`}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>
          
          {/* Add to Bag Action */}
          <div className="mb-10">
            <button 
              onClick={handleAddToBag}
              className="w-full bg-[#111] text-white py-5 font-ui-mono text-[11px] tracking-[0.2em] uppercase hover:bg-zinc-800 transition-colors duration-300"
            >
              ADD TO BAG
            </button>
          </div>
          
          {/* Accordion Details */}
          <div className="border-t border-zinc-200">
            <details className="group border-b border-zinc-200" open>
              <summary className="flex justify-between items-center py-5 cursor-pointer list-none">
                <span className="font-ui-mono text-[10px] tracking-[0.2em] uppercase text-zinc-900">DETAILS</span>
                <span className="transition duration-300 group-open:rotate-180 text-zinc-500 text-lg font-light">+</span>
              </summary>
              <div className="pb-5 font-body-md text-zinc-500 leading-relaxed text-[13px]">
                <p className="whitespace-pre-line">{product.description}</p>
              </div>
            </details>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
