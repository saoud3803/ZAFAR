"use client";

import React from 'react';
import { motion } from 'framer-motion';

const EditorialSection = () => {
  return (
    <section className="max-w-[1440px] mx-auto px-spacing-margin-edge pb-spacing-section-gap">
      <div className="mb-spacing-stack-md">
        <h2 className="font-headline-lg text-primary uppercase text-center mb-16">DEFINING THE NEW BRUTALISM.</h2>
      </div>
      
      <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
        {/* Campaign Images with hover effects */}
        {[
          "https://lh3.googleusercontent.com/aida-public/AB6AXuBiX-gH5aZyLbfNusx3r13cwyv_99uvvfBOSyIgYKordHjd0eJmjs0798wQrdlSXM2UO-n2PiUWQoFGYDfczPTDXt1Z9aYWpSnhp_xHY9UEIc762rXDAMTGV8d3NXmCFuxz5jVL6HLvyjJ3tBRtUfosDN6oM_8rE1t3YEq3QjFm8SIyoE0iOyhG7spRHz4Z_3Q-8QITwbZXysWktmQ-3IBPH06XDUBqoYs1tSLEnLExUZ6xceoB7m00NGYFoHUOCEO4gTzgY1_91bY",
          "https://lh3.googleusercontent.com/aida-public/AB6AXuCFEJ9O4dicgVifpSKqaSrMKEM8bf3UHNF81EHXrPfmGOemwrZvNN73uV6MrWvKTGqsKn_3P9QoeSKVblC5YVAH9AnO1op2erxLz8cAK_EwJB6pltwxLWhAHgkr__EE-DAi0pRDNw7Pm_zWw6bJtYOgZqNWwbsxyrdmfQ2IL6Ft1jFFe3zyyz6RHpXgbJQ_yXj3ECoNuaRZbzKqbi3IVwqeE65IveB9U6Zr6QG4yrianCZz1IDTrUBdvlVacyZpHwokf82V3QbLncw",
          "https://lh3.googleusercontent.com/aida-public/AB6AXuCkInaHgxU3RcB5k6LlJFVDppnk_SpTBmW7by56yEot-p4TJbVAsYnZTC17EKIb36MPmaUov9uLoEWhcrH7vr_YsST8h6wTR2Az7r1fq3VgCwva8y153RkY8-USDENbB_aqkZCVcXTdlzHQ7-XNd7i6fXjX6K0dGMWsfbwsy5tcXWxaOBRYcCHy2Z1nUqx7CJPy410I4iKUbZOUHcSiK-4S_SkY6sGttLs1a697eKUvc9HCap4B2e5VW4OxahY1azr5Wl5wWeftP1I",
          "https://lh3.googleusercontent.com/aida-public/AB6AXuDNi8Tq405ZOAXPKQFH-IKitMvRzXWdaUWpHXu3UMbpsIjky_xmWaeUkr6ujh37BeMWSEdy1wkMD3jdMAvzkMeqr8j1t7gbXAdP6LSOiZpn4niC6fq9gxMFT60_3xvj8wRSd1AkFJYpEpE-krSjTjUh0jFxuaxFzBhQiqhyxZjmP1-AbYXD0l2hjaKyOJiTuZvm6wddJD4wDEG1T5B3kj15jDb3YKADVx1MWjpnCTno3ypckBzbTKzE4AGygzP4qwyEhWlzJkIImpo",
          "https://lh3.googleusercontent.com/aida-public/AB6AXuAhExf4IgSlJyD6eVisJWbAwCiTUYLo-qIgn10mU0huiNbCgTAHuGjGMLWwDDDJscX7aHbCkUnwaJXg63fpjJXHsQrtd99kMmmJPHcmgNs-pIh8KflwcyN3j2YbQrskTi14XzEc06zNBra8IQyXtyVJaJg6yx74hcqbl1x0hAVTXYR1pDrZfw6wlBH9PSIHBIZbbAp0m4hdQdZUp9EaQSOnPwpjxs5wxALjonIxeDmCzcjvOEy4_UnG98PmPJrJw2_DiBo2aHd8qg0"
        ].map((src, idx) => (
          <motion.div 
            key={idx} 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="break-inside-avoid relative group overflow-hidden border-[0.5px] border-outline-variant"
          >
            <img 
              alt={`Campaign ${idx + 1}`} 
              className="w-full h-auto object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out transform group-hover:scale-105" 
              src={src}
            />
            <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-500"></div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default EditorialSection;
