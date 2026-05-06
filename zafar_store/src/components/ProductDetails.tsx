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
          <div className="mb-spacing-stack-md border-b-[0.5px] border-outline-variant pb-8">
            <h1 className="font-headline-md text-on-surface mb-2 uppercase tracking-tight">{product.name}</h1>
            <p className="font-ui-mono text-on-surface-variant">{product.formattedPrice}</p>
          </div>
          
          {/* Color Variant Selector */}
          <div className="mb-spacing-stack-md">
            <span className="block font-label-caps text-on-surface mb-4">COLOR: {typeof selectedColor === 'string' ? selectedColor.toUpperCase() : 'DEFAULT'}</span>
            <div className="flex space-x-3">
              {product.colors.map((colorStr) => {
                const colorName = typeof colorStr === 'string' ? colorStr : "Default";
                const bgColor = colorName.toLowerCase() === 'black' ? 'bg-zinc-950' : colorName.toLowerCase() === 'white' ? 'bg-white' : 'bg-zinc-200';
                
                return (
                  <button 
                    key={colorName}
                    onClick={() => setSelectedColor(colorName as any)}
                    aria-label={colorName} 
                    className={`w-8 h-8 rounded-full ${bgColor} border border-outline ${selectedColor === colorName ? 'ring-1 ring-offset-2 ring-primary' : ''}`}
                  ></button>
                );
              })}
            </div>
          </div>
          
          {/* Size Selector */}
          <div className="mb-spacing-stack-md">
            <div className="flex justify-between items-center mb-4">
              <span className="block font-label-caps text-on-surface">SIZE</span>
              <a className="font-ui-mono text-on-surface-variant underline decoration-[0.5px] underline-offset-4 hover:text-on-surface transition-colors" href="#">SIZE GUIDE</a>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {product.sizes.map((size) => (
                <button 
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`py-3 border-[0.5px] text-center font-ui-mono transition-colors ${
                    selectedSize === size 
                      ? 'border-on-surface bg-zinc-100 text-on-surface font-bold dark:bg-zinc-800' 
                      : 'border-outline-variant text-on-surface hover:border-on-surface'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          
          {/* Add to Bag Action */}
          <div className="mb-spacing-stack-md">
            <button 
              onClick={handleAddToBag}
              className="w-full bg-primary text-on-primary py-5 font-label-caps hover:bg-zinc-800 transition-colors duration-300"
            >
              ADD TO BAG
            </button>
          </div>
          
          {/* Accordion Details */}
          <div className="border-t-[0.5px] border-outline-variant">
            <details className="group border-b-[0.5px] border-outline-variant" open>
              <summary className="flex justify-between items-center py-5 cursor-pointer list-none">
                <span className="font-label-caps text-on-surface">DETAILS</span>
                <span className="material-symbols-outlined transition duration-300 group-open:rotate-180 text-on-surface-variant">expand_more</span>
              </summary>
              <div className="pb-5 font-body-md text-on-surface-variant">
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
