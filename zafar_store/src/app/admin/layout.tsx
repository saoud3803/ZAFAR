"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard, Package, ShoppingCart, Settings,
  LogOut, Menu, X, ChevronLeft, Search, Bell, Store
} from 'lucide-react';

const navItems = [
  { label: 'Tableau de bord', href: '/admin', icon: LayoutDashboard },
  { label: 'Produits', href: '/admin/products', icon: Package },
  { label: 'Commandes', href: '/admin/orders', icon: ShoppingCart },
  { label: 'Paramètres', href: '/admin/settings', icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  if (pathname === '/admin/login') return <>{children}</>;

  const handleLogout = async () => {
    setLoggingOut(true);
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className={`flex items-center gap-3 px-4 py-5 ${collapsed ? 'justify-center' : ''}`}>
        <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-[10px] flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-500/30">
          <span className="font-bold text-white text-xs tracking-wider">ZF</span>
        </div>
        {!collapsed && (
          <div>
            <p className="text-[#1d1d1f] text-[13px] font-semibold tracking-tight">Zafar Admin</p>
            <p className="text-[#6e6e73] text-[10px]">Panel de contrôle</p>
          </div>
        )}
      </div>

      <nav className="flex-1 px-2 py-2 space-y-0.5">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              title={collapsed ? item.label : undefined}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] transition-all duration-200 ${collapsed ? 'justify-center' : ''} ${
                isActive
                  ? 'bg-white/80 text-blue-600 shadow-sm shadow-black/10 font-medium'
                  : 'text-[#6e6e73] hover:text-[#1d1d1f] hover:bg-white/50'
              }`}
            >
              <item.icon className="w-4 h-4 flex-shrink-0" strokeWidth={isActive ? 2 : 1.5} />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="px-2 py-4 space-y-0.5 border-t border-white/30">
        <Link
          href="/"
          target="_blank"
          title={collapsed ? 'Voir la boutique' : undefined}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] text-[#6e6e73] hover:text-[#1d1d1f] hover:bg-white/50 transition-all duration-200 ${collapsed ? 'justify-center' : ''}`}
        >
          <Store className="w-4 h-4 flex-shrink-0" strokeWidth={1.5} />
          {!collapsed && <span>Voir la boutique</span>}
        </Link>
        <button
          onClick={handleLogout}
          disabled={loggingOut}
          title={collapsed ? 'Déconnexion' : undefined}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] text-[#6e6e73] hover:text-red-500 hover:bg-red-50/60 transition-all duration-200 disabled:opacity-50 ${collapsed ? 'justify-center' : ''}`}
        >
          <LogOut className="w-4 h-4 flex-shrink-0" strokeWidth={1.5} />
          {!collapsed && <span>{loggingOut ? 'Déconnexion...' : 'Déconnexion'}</span>}
        </button>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={`hidden lg:flex w-full items-center gap-3 px-3 py-2.5 rounded-xl text-[12px] text-[#6e6e73] hover:text-[#1d1d1f] hover:bg-white/50 transition-all duration-200 ${collapsed ? 'justify-center' : ''}`}
        >
          <ChevronLeft className={`w-4 h-4 flex-shrink-0 transition-transform duration-300 ${collapsed ? 'rotate-180' : ''}`} strokeWidth={1.5} />
          {!collapsed && <span>Réduire</span>}
        </button>
      </div>
    </div>
  );

  const sidebarWidth = collapsed ? 'lg:ml-[68px]' : 'lg:ml-60';

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#dce8ff] via-[#eeeaff] to-[#e4f0ff] text-[#1d1d1f] flex">
      {/* Desktop Sidebar */}
      <aside className={`hidden lg:flex flex-col fixed inset-y-0 left-0 z-50 bg-white/40 backdrop-blur-3xl border-r border-white/60 transition-all duration-300 ${collapsed ? 'w-[68px]' : 'w-60'}`}>
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar */}
      {mobileOpen && (
        <>
          <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden" onClick={() => setMobileOpen(false)} />
          <aside className="fixed inset-y-0 left-0 z-50 w-60 bg-white/70 backdrop-blur-3xl border-r border-white/60 flex flex-col lg:hidden shadow-2xl">
            <div className="absolute top-4 right-4">
              <button onClick={() => setMobileOpen(false)} className="text-[#6e6e73] hover:text-[#1d1d1f] w-7 h-7 flex items-center justify-center rounded-full bg-black/5">
                <X className="w-4 h-4" />
              </button>
            </div>
            <SidebarContent />
          </aside>
        </>
      )}

      {/* Main */}
      <div className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${sidebarWidth}`}>
        {/* Header */}
        <header className="h-14 bg-white/35 backdrop-blur-2xl border-b border-white/50 flex items-center px-5 gap-4 sticky top-0 z-30">
          <button onClick={() => setMobileOpen(true)} className="lg:hidden text-[#6e6e73] hover:text-[#1d1d1f] transition-colors">
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex-1 max-w-sm">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#aeaeb2]" strokeWidth={1.5} />
              <input
                type="text"
                placeholder="Rechercher..."
                className="w-full bg-white/50 border border-white/60 text-[#1d1d1f] text-[13px] pl-9 pr-4 py-2 rounded-xl focus:outline-none focus:border-blue-400/50 focus:bg-white/70 transition-all placeholder:text-[#aeaeb2]"
              />
            </div>
          </div>

          <div className="flex-1" />

          <div className="flex items-center gap-2">
            <button className="relative p-2 text-[#6e6e73] hover:text-[#1d1d1f] transition-colors rounded-xl hover:bg-white/60">
              <Bell className="w-4 h-4" strokeWidth={1.5} />
            </button>
            <div className="flex items-center gap-3 pl-2 border-l border-white/40">
              <div className="text-right hidden sm:block">
                <p className="text-[13px] font-medium text-[#1d1d1f]">Admin User</p>
                <p className="text-[10px] text-[#6e6e73]">admin@zafar.ma</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0 shadow-md shadow-blue-500/30">
                <span className="text-white text-xs font-bold">Z</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-5 lg:p-7">
          {children}
        </main>
      </div>
    </div>
  );
}
