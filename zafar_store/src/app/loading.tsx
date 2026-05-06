export default function Loading() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#FAFAFA]">
      <div className="w-12 h-12 border-[1px] border-zinc-200 border-t-zinc-950 rounded-full animate-spin"></div>
      <p className="mt-8 font-ui-mono text-[10px] tracking-[0.3em] uppercase text-zinc-400">Loading Collection</p>
    </div>
  );
}
