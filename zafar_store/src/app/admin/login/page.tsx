"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Eye, EyeOff, Loader2 } from 'lucide-react';

export default function AdminLoginPage() {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });
    if (res.ok) { router.push('/admin'); router.refresh(); }
    else { setError('Mot de passe incorrect.'); setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="w-14 h-14 bg-zinc-900 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <span className="font-mono text-white text-lg font-black tracking-wider">ZF</span>
          </div>
          <h1 className="text-2xl font-bold text-zinc-900 tracking-wider">ZAFAR</h1>
          <p className="text-gray-400 text-sm mt-1">Panneau d'administration</p>
        </div>

        {/* Card */}
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
              <Lock className="w-4 h-4 text-gray-400" strokeWidth={1.5} />
            </div>
            <div>
              <p className="font-semibold text-zinc-900 text-sm">Accès sécurisé</p>
              <p className="text-[10px] text-gray-400 font-mono tracking-widest">ADMIN ONLY</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[10px] font-mono tracking-widest text-gray-400 mb-2 uppercase">Mot de passe</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required
                  autoFocus
                  className="w-full bg-gray-50 border border-gray-200 text-zinc-900 text-sm px-4 py-3 rounded-lg focus:outline-none focus:border-zinc-400 transition-colors pr-12 placeholder:text-gray-300"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-zinc-900 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" strokeWidth={1.5} /> : <Eye className="w-4 h-4" strokeWidth={1.5} />}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-xs text-red-500 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading || !password}
              className="w-full bg-zinc-900 text-white text-sm font-mono tracking-widest py-3 rounded-lg hover:bg-zinc-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Connexion...</> : 'Accéder au dashboard'}
            </button>
          </form>
        </div>

        <p className="text-center text-[10px] text-gray-300 mt-6 font-mono tracking-widest">
          © 2026 ZAFAR CLOTHING — PRIVATE
        </p>
      </div>
    </div>
  );
}
