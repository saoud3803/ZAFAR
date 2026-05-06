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
      {/* Logo */}
      <div className={`flex items-center gap-3 px-5 py-5 border-b border-gray-100 ${collapsed ? 'justify-center' : ''}`}>
        <div className="w-9 h-9 bg-zinc-900 rounded-lg flex items-center justify-center flex-shrink-0">
          <span className="font-mono text-white text-xs font-black tracking-wider">ZF</span>
        </div>
        {!collapsed && (
          <div>
            <p className="font-mono text-zinc-900 text-sm font-bold tracking-[0.2em]">ZAFAR</p>
            <p className="font-mono text-gray-400 text-[9px] tracking-widest">ADMIN PANEL</p>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-5 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              title={collapsed ? item.label : undefined}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 ${collapsed ? 'justify-center' : ''} ${
                isActive
                  ? 'bg-zinc-900 text-white font-semibold'
                  : 'text-gray-500 hover:text-zinc-900 hover:bg-gray-100'
              }`}
            >
              <item.icon className="w-4 h-4 flex-shrink-0" strokeWidth={isActive ? 2 : 1.5} />
              {!collapsed && <span className="font-mono tracking-wider text-xs">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="px-3 py-5 border-t border-gray-100 space-y-1">
        <Link
          href="/"
          target="_blank"
          title={collapsed ? 'Voir la boutique' : undefined}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-500 hover:text-zinc-900 hover:bg-gray-100 transition-all duration-200 ${collapsed ? 'justify-center' : ''}`}
        >
          <Store className="w-4 h-4 flex-shrink-0" strokeWidth={1.5} />
          {!collapsed && <span className="font-mono tracking-wider text-xs">Voir la boutique</span>}
        </Link>
        <button
          onClick={handleLogout}
          disabled={loggingOut}
          title={collapsed ? 'Déconnexion' : undefined}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all duration-200 disabled:opacity-50 ${collapsed ? 'justify-center' : ''}`}
        >
          <LogOut className="w-4 h-4 flex-shrink-0" strokeWidth={1.5} />
          {!collapsed && <span className="font-mono tracking-wider text-xs">{loggingOut ? 'Déconnexion...' : 'Déconnexion'}</span>}
        </button>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={`hidden lg:flex w-full items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-mono tracking-wider text-gray-400 hover:text-gray-600 transition-all duration-200 ${collapsed ? 'justify-center' : ''}`}
        >
          <ChevronLeft className={`w-4 h-4 flex-shrink-0 transition-transform duration-300 ${collapsed ? 'rotate-180' : ''}`} strokeWidth={1.5} />
          {!collapsed && <span>Réduire le menu</span>}
        </button>
      </div>
    </div>
  );

  const sidebarWidth = collapsed ? 'lg:ml-[72px]' : 'lg:ml-64';

  return (
    <div className="min-h-screen bg-gray-50 text-zinc-900 flex">
      {/* Desktop Sidebar */}
      <aside className={`hidden lg:flex flex-col fixed inset-y-0 left-0 z-50 bg-white border-r border-gray-100 shadow-sm transition-all duration-300 ${collapsed ? 'w-[72px]' : 'w-64'}`}>
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar */}
      {mobileOpen && (
        <>
          <div className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={() => setMobileOpen(false)} />
          <aside className="fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-100 flex flex-col lg:hidden shadow-xl">
            <div className="absolute top-4 right-4">
              <button onClick={() => setMobileOpen(false)} className="text-gray-400 hover:text-zinc-900">
                <X className="w-5 h-5" />
              </button>
            </div>
            <SidebarContent />
          </aside>
        </>
      )}

      {/* Main */}
      <div className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${sidebarWidth}`}>
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-100 flex items-center px-6 gap-4 sticky top-0 z-30 shadow-sm">
          <button onClick={() => setMobileOpen(true)} className="lg:hidden text-gray-400 hover:text-zinc-900 transition-colors">
            <Menu className="w-5 h-5" />
          </button>

          {/* Search */}
          <div className="flex-1 max-w-sm">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" strokeWidth={1.5} />
              <input
                type="text"
                placeholder="Rechercher..."
                className="w-full bg-gray-50 border border-gray-200 text-zinc-900 text-sm pl-9 pr-4 py-2 rounded-lg focus:outline-none focus:border-gray-400 transition-colors placeholder:text-gray-400"
              />
            </div>
          </div>

          <div className="flex-1" />

          {/* Right */}
          <div className="flex items-center gap-3">
            <button className="relative p-2 text-gray-400 hover:text-zinc-900 transition-colors rounded-lg hover:bg-gray-100">
              <Bell className="w-5 h-5" strokeWidth={1.5} />
            </button>
            <div className="flex items-center gap-3 pl-3 border-l border-gray-100">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-semibold text-zinc-900">Admin User</p>
                <p className="text-[10px] text-gray-400">admin@zafar.ma</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-zinc-900 flex items-center justify-center flex-shrink-0">
                <span className="text-white text-xs font-bold">Z</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
