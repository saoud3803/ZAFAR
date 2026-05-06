"use client";

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useCartStore } from '@/store/useCartStore';

const checkoutSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  country: z.string().min(1, { message: "Country is required" }),
  firstName: z.string().min(2, { message: "First name is required" }),
  lastName: z.string().min(2, { message: "Last name is required" }),
  address: z.string().min(5, { message: "Address is required" }),
  city: z.string().min(2, { message: "City is required" }),
  state: z.string().min(2, { message: "State is required" }),
  zip: z.string().min(3, { message: "ZIP is required" }),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

const CheckoutFlow = () => {
  const { items, getCartTotal } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { register, handleSubmit, formState: { errors } } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const clearCart = useCartStore((state) => state.clearCart);

  const onSubmit = async (data: CheckoutFormValues) => {
    if (items.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    
    setIsSubmitting(true);
    try {
      const { supabase } = await import('@/lib/supabase');
      const { error } = await supabase.from('orders').insert({
        email: data.email,
        full_name: `${data.firstName} ${data.lastName}`,
        address: data.address,
        city: `${data.city}, ${data.state}`,
        country: data.country,
        zip_code: data.zip,
        status: 'Pending',
        total: getCartTotal(),
        cart_items: items,
      });

      if (error) throw error;

      alert("Order placed successfully via Cash on Delivery!");
      clearCart();
      window.location.href = "/";
    } catch (error) {
      console.error("Order submission failed:", error);
      alert("There was an error submitting your order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const subtotal = getCartTotal();

  if (!mounted) return null; // Avoid hydration mismatch

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Main Area: Checkout Flow */}
      <section className="flex-1 w-full max-w-[800px] mx-auto px-spacing-margin-edge py-spacing-section-gap">
        <div className="mb-spacing-stack-md">
          <a className="font-label-caps text-on-surface-variant flex items-center gap-2 hover:text-on-surface transition-colors duration-300 w-fit" href="#">
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            RETURN TO CART
          </a>
        </div>
        
        <h1 className="font-headline-lg mb-12">Checkout</h1>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-16">
          {/* Contact Information */}
          <div className="space-y-6">
            <h2 className="font-headline-md border-b-[0.5px] border-outline-variant pb-4">Contact</h2>
            <div className="space-y-1">
              <input 
                {...register("email")}
                className={`w-full bg-transparent border-b-[1px] focus:ring-0 px-0 py-4 font-ui-mono placeholder:text-outline transition-colors duration-300 ${errors.email ? 'border-error focus:border-error text-error' : 'border-outline-variant focus:border-on-surface'}`} 
                placeholder="Email Address" 
                type="email" 
              />
              {errors.email && <p className="font-ui-mono text-error text-xs mt-1">{errors.email.message}</p>}
            </div>
          </div>
          
          {/* Shipping Address */}
          <div className="space-y-6">
            <h2 className="font-headline-md border-b-[0.5px] border-outline-variant pb-4">Shipping</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2 space-y-1">
                <select 
                  {...register("country")}
                  className={`w-full bg-transparent border-b-[1px] focus:ring-0 px-0 py-4 font-ui-mono text-on-surface transition-colors duration-300 appearance-none ${errors.country ? 'border-error focus:border-error' : 'border-outline-variant focus:border-on-surface'}`}
                >
                  <option value="US">United States</option>
                  <option value="UK">United Kingdom</option>
                  <option value="CA">Canada</option>
                  <option value="FR">France</option>
                </select>
                {errors.country && <p className="font-ui-mono text-error text-xs">{errors.country.message}</p>}
              </div>
              <div className="space-y-1">
                <input {...register("firstName")} className={`w-full bg-transparent border-b-[1px] focus:ring-0 px-0 py-4 font-ui-mono placeholder:text-outline ${errors.firstName ? 'border-error focus:border-error' : 'border-outline-variant focus:border-on-surface'}`} placeholder="First name" type="text" />
                {errors.firstName && <p className="font-ui-mono text-error text-xs">{errors.firstName.message}</p>}
              </div>
              <div className="space-y-1">
                <input {...register("lastName")} className={`w-full bg-transparent border-b-[1px] focus:ring-0 px-0 py-4 font-ui-mono placeholder:text-outline ${errors.lastName ? 'border-error focus:border-error' : 'border-outline-variant focus:border-on-surface'}`} placeholder="Last name" type="text" />
                {errors.lastName && <p className="font-ui-mono text-error text-xs">{errors.lastName.message}</p>}
              </div>
              <div className="md:col-span-2 space-y-1">
                <input {...register("address")} className={`w-full bg-transparent border-b-[1px] focus:ring-0 px-0 py-4 font-ui-mono placeholder:text-outline ${errors.address ? 'border-error focus:border-error' : 'border-outline-variant focus:border-on-surface'}`} placeholder="Address" type="text" />
                {errors.address && <p className="font-ui-mono text-error text-xs">{errors.address.message}</p>}
              </div>
              <div className="space-y-1">
                <input {...register("city")} className={`w-full bg-transparent border-b-[1px] focus:ring-0 px-0 py-4 font-ui-mono placeholder:text-outline ${errors.city ? 'border-error focus:border-error' : 'border-outline-variant focus:border-on-surface'}`} placeholder="City" type="text" />
                {errors.city && <p className="font-ui-mono text-error text-xs">{errors.city.message}</p>}
              </div>
              <div className="space-y-1 flex gap-4">
                <div className="flex-1 space-y-1">
                  <input {...register("state")} className={`w-full bg-transparent border-b-[1px] focus:ring-0 px-0 py-4 font-ui-mono placeholder:text-outline ${errors.state ? 'border-error focus:border-error' : 'border-outline-variant focus:border-on-surface'}`} placeholder="State/Province" type="text" />
                  {errors.state && <p className="font-ui-mono text-error text-xs">{errors.state.message}</p>}
                </div>
                <div className="flex-1 space-y-1">
                  <input {...register("zip")} className={`w-full bg-transparent border-b-[1px] focus:ring-0 px-0 py-4 font-ui-mono placeholder:text-outline ${errors.zip ? 'border-error focus:border-error' : 'border-outline-variant focus:border-on-surface'}`} placeholder="ZIP code" type="text" />
                  {errors.zip && <p className="font-ui-mono text-error text-xs">{errors.zip.message}</p>}
                </div>
              </div>
            </div>
          </div>

          {/* Payment - COD Only */}
          <div className="space-y-6">
            <h2 className="font-headline-md border-b-[0.5px] border-outline-variant pb-4">Payment</h2>
            <div className="border-[1px] border-outline-variant p-6 space-y-4 bg-surface-container-low">
              <div className="flex items-center gap-3">
                <input 
                  checked 
                  readOnly
                  className="appearance-none w-4 h-4 border-[1px] border-outline-variant rounded-full checked:border-[4px] checked:border-on-surface focus:ring-0 cursor-pointer" 
                  id="cod" 
                  name="payment" 
                  type="radio"
                />
                <label className="font-body-md text-on-surface cursor-pointer font-medium" htmlFor="cod">Cash on Delivery (COD)</label>
              </div>
              <p className="font-ui-mono text-on-surface-variant text-sm ml-7">
                Pay with cash upon delivery of your order. No advance payment required.
              </p>
            </div>
          </div>
          
          <button disabled={isSubmitting} className="w-full bg-primary text-on-primary py-6 font-label-caps hover:bg-zinc-800 transition-all duration-300 disabled:opacity-50" type="submit">
            {isSubmitting ? "PROCESSING..." : "COMPLETE ORDER"}
          </button>
        </form>
      </section>
      
      {/* Right Sidebar: Order Summary */}
      <aside className="w-full md:w-[450px] bg-zinc-50 border-l-[0.5px] border-outline-variant lg:min-h-screen sticky top-0 overflow-y-auto hidden lg:block">
        <div className="p-spacing-margin-edge space-y-12">
          <h3 className="font-headline-md border-b-[0.5px] border-outline-variant pb-4">Order Summary</h3>
          <div className="space-y-8">
            {items.length === 0 ? (
              <p className="font-ui-mono text-on-surface-variant">Your bag is empty.</p>
            ) : (
              items.map((item, idx) => (
                <div key={`${item.product.id}-${idx}`} className="flex gap-6 group">
                  <div className="w-24 h-32 relative bg-zinc-200 overflow-hidden flex-shrink-0">
                    <img 
                      alt={item.product.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                      src={item.product.images[0]} 
                    />
                    <span className="absolute top-0 right-0 bg-primary text-on-primary w-6 h-6 flex items-center justify-center font-ui-mono text-[10px] m-1 rounded-full">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-body-md font-medium text-on-surface">{item.product.name}</h4>
                      <p className="font-ui-mono text-on-surface-variant mt-1">{item.selectedColor} / {item.selectedSize}</p>
                    </div>
                    <div className="font-ui-mono text-on-surface">${(item.product.price * item.quantity).toLocaleString()}</div>
                  </div>
                </div>
              ))
            )}
          </div>
          
          <div className="space-y-4 pt-8 border-t-[0.5px] border-outline-variant font-ui-mono">
            <div className="flex justify-between text-on-surface-variant">
              <span>Subtotal</span>
              <span>${subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-on-surface font-medium pt-4 border-t-[0.5px] border-outline-variant text-body-lg">
              <span>Total</span>
              <span>USD ${subtotal.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default CheckoutFlow;
