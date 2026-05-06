import React from 'react';

const Newsletter = () => {
  return (
    <section className="max-w-[1440px] mx-auto px-spacing-margin-edge py-spacing-section-gap flex flex-col items-center justify-center text-center">
      <h4 className="font-headline-md text-primary mb-6 uppercase">THE ARCHIVE</h4>
      <p className="font-body-md text-on-surface-variant mb-12 max-w-md">
        Join our inner circle for exclusive access to editorial releases and private collections.
      </p>
      <form className="w-full max-w-lg flex flex-col items-center gap-8">
        <input 
          className="w-full bg-transparent border-0 border-b border-outline text-center font-ui-mono text-on-surface placeholder:text-outline-variant focus:ring-0 focus:border-primary transition-colors pb-4 uppercase" 
          placeholder="ENTER EMAIL ADDRESS" 
          required 
          type="email"
        />
        <button 
          className="bg-primary text-on-primary font-label-caps px-12 py-4 hover:bg-zinc-800 transition-colors border-[0.5px] border-primary w-max" 
          type="submit"
        >
          JOIN
        </button>
      </form>
    </section>
  );
};

export default Newsletter;
