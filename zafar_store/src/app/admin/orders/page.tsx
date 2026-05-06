"use client";

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { MapPin, Mail, Clock, ChevronDown, Loader2 } from 'lucide-react';

const STATUS_OPTIONS = ['Pending', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled'];
const statusStyles: Record<string, string> = {
  Pending:   'bg-amber-100 text-amber-700',
  Confirmed: 'bg-blue-100 text-blue-700',
  Shipped:   'bg-violet-100 text-violet-700',
  Delivered: 'bg-emerald-100 text-emerald-700',
  Cancelled: 'bg-red-100 text-red-600',
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 3000); };

  const fetchOrders = async () => {
    const { data } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
    setOrders(data || []); setLoading(false);
  };
  useEffect(() => { fetchOrders(); }, []);

  const updateStatus = async (orderId: string, newStatus: string) => {
    setUpdatingId(orderId);
    const { error } = await supabase.from('orders').update({ status: newStatus }).eq('id', orderId);
    if (!error) { setOrders(prev => prev.map(o => o.id === orderId ? {...o, status: newStatus} : o)); showToast(`Statut mis à jour : ${newStatus}`); }
    setUpdatingId(null);
  };

  return (
    <div className="space-y-6">
      {toast && <div className="fixed top-6 right-6 z-[100] bg-emerald-500 text-white text-xs font-mono tracking-wider px-4 py-3 rounded-xl shadow-lg">✓ {toast}</div>}

      <div>
        <h1 className="text-xl font-bold text-zinc-900">Commandes</h1>
        <p className="text-gray-400 text-sm mt-0.5">{orders.length} commande{orders.length !== 1 ? 's' : ''} au total</p>
      </div>

      {loading ? (
        <div className="py-20 flex justify-center"><Loader2 className="w-6 h-6 text-gray-300 animate-spin" /></div>
      ) : orders.length === 0 ? (
        <div className="bg-white border border-gray-100 rounded-xl shadow-sm py-20 text-center space-y-3">
          <p className="text-gray-400 text-sm">Aucune commande pour le moment</p>
          <code className="block text-[10px] text-gray-400 bg-gray-50 border border-gray-100 rounded px-4 py-2 mx-auto w-fit font-mono">
            CREATE POLICY "Enable read" ON public.orders FOR SELECT USING (true);
          </code>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order: any) => {
            const items = Array.isArray(order.cart_items) ? order.cart_items : [];
            return (
              <div key={order.id} className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
                {/* Header */}
                <div className="px-6 py-4 border-b border-gray-100 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-[10px] font-mono text-gray-400 bg-gray-100 px-2 py-0.5 rounded">
                        #{order.id.slice(0,8).toUpperCase()}
                      </span>
                    </div>
                    <p className="font-semibold text-zinc-900">{order.full_name}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="flex items-center gap-1 text-[10px] text-gray-400"><Mail className="w-3 h-3" />{order.email}</span>
                      <span className="flex items-center gap-1 text-[10px] text-gray-400"><Clock className="w-3 h-3" />
                        {new Date(order.created_at).toLocaleDateString('fr-MA', { day: '2-digit', month: 'short', year: 'numeric' })}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-bold text-zinc-900">{order.total} MAD</span>
                    <div className="relative">
                      <select
                        value={order.status}
                        disabled={updatingId === order.id}
                        onChange={(e) => updateStatus(order.id, e.target.value)}
                        className={`appearance-none text-[10px] font-mono tracking-widest pl-3 pr-7 py-1.5 rounded-full cursor-pointer focus:outline-none disabled:opacity-50 border-0 ${statusStyles[order.status] || statusStyles.Pending}`}
                      >
                        {STATUS_OPTIONS.map(s => <option key={s} value={s} className="bg-white text-zinc-900 text-xs">{s.toUpperCase()}</option>)}
                      </select>
                      <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-2.5 h-2.5 pointer-events-none opacity-50" />
                    </div>
                  </div>
                </div>

                {/* Address */}
                <div className="px-6 py-3 border-b border-gray-50 bg-gray-50/50 flex items-center gap-2">
                  <MapPin className="w-3 h-3 text-gray-400 flex-shrink-0" />
                  <span className="text-xs text-gray-500">{order.address}, {order.city}, {order.zip_code} — {order.country}</span>
                </div>

                {/* Items */}
                {items.length > 0 && (
                  <div className="px-6 py-4">
                    <p className="text-[10px] font-mono tracking-widest text-gray-400 mb-3">ARTICLES COMMANDÉS</p>
                    <div className="space-y-2">
                      {items.map((item: any, idx: number) => (
                        <div key={idx} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            {item.product?.images?.[0] && <img src={item.product.images[0]} alt={item.product.name} className="w-8 h-10 object-cover rounded-lg bg-gray-100 flex-shrink-0" />}
                            <div>
                              <p className="text-sm text-zinc-900 font-medium">{item.product?.name}</p>
                              <p className="text-[10px] text-gray-400">{item.selectedColor} / {item.selectedSize} × {item.quantity}</p>
                            </div>
                          </div>
                          <span className="text-sm font-semibold text-zinc-900">{(item.product?.price * item.quantity)} MAD</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
