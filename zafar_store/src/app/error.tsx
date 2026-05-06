'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Supabase Fetch Error:', error);
  }, [error]);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#FAFAFA] text-center px-6">
      <h2 className="font-serif italic text-4xl mb-4 text-zinc-950">System Error.</h2>
      <p className="font-body-md text-zinc-500 mb-8 max-w-md">
        We encountered an issue loading the collection data from the database. Please ensure your connection is active.
      </p>
      <div className="flex gap-4">
        <button
          onClick={() => reset()}
          className="bg-zinc-950 text-white font-ui-mono text-[10px] tracking-[0.2em] px-8 py-4 uppercase hover:bg-zinc-800 transition-colors"
        >
          Try Again
        </button>
        <Link
          href="/"
          className="border border-zinc-200 text-zinc-950 font-ui-mono text-[10px] tracking-[0.2em] px-8 py-4 uppercase hover:bg-zinc-100 transition-colors"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
