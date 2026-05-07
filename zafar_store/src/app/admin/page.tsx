import { supabase } from '@/lib/supabase';
import { Package, ShoppingCart, TrendingUp, Clock } from 'lucide-react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

async function getDashboardStats() {
  const [productsRes, ordersRes] = await Promise.all([
    supabase.from('products').select('id', { count: 'exact', head: true }),
    supabase.from('orders').select('id, total, status, created_at, full_name, email'),
  ]);
  const totalProducts = productsRes.count || 0;
  const orders = ordersRes.data || [];
  const totalRevenue = orders.reduce((s: number, o: any) => s + (o.total || 0), 0);
  const pendingOrders = orders.filter((o: any) => o.status === 'Pending').length;
  const { data: recentOrders } = await supabase
    .from('orders').select('id, full_name, email, total, status, created_at')
    .order('created_at', { ascending: false }).limit(5);
  return { totalProducts, totalOrders: orders.length, totalRevenue, pendingOrders, recentOrders: recentOrders || [] };
}

const statusStyles: Record<string, string> = {
  Pending:   'bg-amber-100/80 text-amber-700',
  Confirmed: 'bg-blue-100/80 text-blue-700',
  Shipped:   'bg-violet-100/80 text-violet-700',
  Delivered: 'bg-emerald-100/80 text-emerald-700',
  Cancelled: 'bg-red-100/80 text-red-600',
};

export default async function AdminDashboard() {
  const stats = await getDashboardStats();

  const statCards = [
    {
      label: 'Revenu Total',
      value: `${stats.totalRevenue.toLocaleString()} MAD`,
      icon: TrendingUp,
      href: '/admin/orders',
      badge: '+0%',
      gradient: 'from-emerald-400 to-teal-500',
      shadow: 'shadow-emerald-500/25',
    },
    {
      label: 'Commandes',
      value: stats.totalOrders,
      icon: ShoppingCart,
      href: '/admin/orders',
      badge: `+${stats.totalOrders}`,
      gradient: 'from-blue-400 to-blue-600',
      shadow: 'shadow-blue-500/25',
    },
    {
      label: 'Produits',
      value: stats.totalProducts,
      icon: Package,
      href: '/admin/products',
      badge: '0%',
      gradient: 'from-violet-400 to-purple-600',
      shadow: 'shadow-violet-500/25',
    },
    {
      label: 'En Attente',
      value: stats.pendingOrders,
      icon: Clock,
      href: '/admin/orders',
      badge: stats.pendingOrders > 0 ? `−${stats.pendingOrders}` : '0',
      gradient: 'from-amber-400 to-orange-500',
      shadow: 'shadow-amber-500/25',
    },
  ];

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[22px] font-semibold text-[#1d1d1f] tracking-tight">Aperçu</h1>
          <p className="text-[#6e6e73] text-[13px] mt-0.5">Bienvenue sur votre tableau de bord.</p>
        </div>
        <Link
          href="/admin/products"
          className="bg-blue-500 text-white text-[13px] font-medium px-4 py-2 rounded-xl hover:bg-blue-600 transition-colors shadow-lg shadow-blue-500/30"
        >
          Télécharger le rapport
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {statCards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="bg-white/60 backdrop-blur-xl border border-white/70 rounded-2xl p-5 shadow-lg shadow-black/5 hover:shadow-xl hover:bg-white/70 transition-all duration-200"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-10 h-10 rounded-[12px] bg-gradient-to-br ${card.gradient} flex items-center justify-center shadow-lg ${card.shadow}`}>
                <card.icon className="w-5 h-5 text-white" strokeWidth={1.5} />
              </div>
              <span className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-black/5 text-[#6e6e73]">
                {card.badge}
              </span>
            </div>
            <div className="text-[#6e6e73] text-[11px] font-medium tracking-wide mb-1">{card.label}</div>
            <div className="text-[26px] font-semibold text-[#1d1d1f] tracking-tight leading-none">{card.value}</div>
          </Link>
        ))}
      </div>

      <div className="bg-white/60 backdrop-blur-xl border border-white/70 rounded-2xl shadow-lg shadow-black/5 overflow-hidden">
        <div className="px-6 py-4 border-b border-black/[0.06] flex items-center justify-between">
          <h2 className="font-semibold text-[#1d1d1f] text-[15px]">Commandes Récentes</h2>
          <Link href="/admin/orders" className="text-[13px] text-blue-500 hover:text-blue-600 transition-colors font-medium">
            Voir tout →
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-black/[0.06] bg-black/[0.02]">
                <th className="px-6 py-3 text-left text-[11px] font-medium text-[#6e6e73] tracking-wide">ID</th>
                <th className="px-6 py-3 text-left text-[11px] font-medium text-[#6e6e73] tracking-wide">CLIENT</th>
                <th className="px-6 py-3 text-left text-[11px] font-medium text-[#6e6e73] tracking-wide hidden md:table-cell">DATE</th>
                <th className="px-6 py-3 text-left text-[11px] font-medium text-[#6e6e73] tracking-wide">TOTAL</th>
                <th className="px-6 py-3 text-left text-[11px] font-medium text-[#6e6e73] tracking-wide">STATUT</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/[0.04]">
              {stats.recentOrders.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-16 text-center text-[13px] text-[#6e6e73]">
                    Aucune commande récente
                  </td>
                </tr>
              ) : (
                stats.recentOrders.map((order: any) => (
                  <tr key={order.id} className="hover:bg-black/[0.02] transition-colors">
                    <td className="px-6 py-4">
                      <span className="text-[11px] font-mono text-[#6e6e73] bg-black/5 px-2 py-1 rounded-lg">
                        #{order.id.slice(0, 8).toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-[13px] font-medium text-[#1d1d1f]">{order.full_name}</p>
                      <p className="text-[11px] text-[#6e6e73] mt-0.5">{order.email}</p>
                    </td>
                    <td className="px-6 py-4 hidden md:table-cell">
                      <span className="text-[12px] text-[#6e6e73]">
                        {new Date(order.created_at).toLocaleDateString('fr-MA', { day: '2-digit', month: 'short', year: 'numeric' })}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-[13px] font-semibold text-[#1d1d1f]">{order.total} MAD</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-[11px] font-medium px-2.5 py-1 rounded-full ${statusStyles[order.status] || statusStyles.Pending}`}>
                        {order.status?.toUpperCase()}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
