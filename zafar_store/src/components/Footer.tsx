import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full border-t-[0.5px] border-zinc-200 bg-zinc-50 mt-spacing-section-gap">
      <div className="grid grid-cols-12 gap-8 px-16 py-20 w-full max-w-container-max mx-auto">
        {/* Brand */}
        <div className="col-span-12 md:col-span-4 flex flex-col justify-between">
          <span className="font-serif text-xl font-bold tracking-[0.2em] text-zinc-950">ZAFAR</span>
          <span className="font-serif tracking-widest uppercase text-[10px] text-zinc-500 mt-spacing-stack-md">
            © 2024 ZAFAR. DEFINING THE NEW BRUTALISM.
          </span>
        </div>
        
        {/* Links */}
        <div className="col-span-12 md:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8">
          <div className="flex flex-col space-y-4">
            <a className="font-serif tracking-widest uppercase text-[10px] text-zinc-500 hover:text-zinc-950 transition-opacity duration-300 ease-out" href="#">INSTAGRAM</a>
            <a className="font-serif tracking-widest uppercase text-[10px] text-zinc-500 hover:text-zinc-950 transition-opacity duration-300 ease-out" href="#">TIKTOK</a>
          </div>
          <div className="flex flex-col space-y-4">
            <a className="font-serif tracking-widest uppercase text-[10px] text-zinc-500 hover:text-zinc-950 transition-opacity duration-300 ease-out" href="#">PRIVACY</a>
            <a className="font-serif tracking-widest uppercase text-[10px] text-zinc-500 hover:text-zinc-950 transition-opacity duration-300 ease-out" href="#">TERMS</a>
          </div>
          <div className="flex flex-col space-y-4">
            <a className="font-serif tracking-widest uppercase text-[10px] text-zinc-500 hover:text-zinc-950 transition-opacity duration-300 ease-out" href="#">SHIPPING</a>
            <a className="font-serif tracking-widest uppercase text-[10px] text-zinc-500 hover:text-zinc-950 transition-opacity duration-300 ease-out" href="#">CONTACT</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
