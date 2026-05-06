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
  Pending:   'bg-amber-100 text-amber-700',
  Confirmed: 'bg-blue-100 text-blue-700',
  Shipped:   'bg-violet-100 text-violet-700',
  Delivered: 'bg-emerald-100 text-emerald-700',
  Cancelled: 'bg-red-100 text-red-600',
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
      iconBg: 'bg-emerald-50',
      iconColor: 'text-emerald-500',
      badgeColor: 'bg-emerald-100 text-emerald-600',
    },
    {
      label: 'Commandes',
      value: stats.totalOrders,
      icon: ShoppingCart,
      href: '/admin/orders',
      badge: `+${stats.totalOrders}`,
      iconBg: 'bg-blue-50',
      iconColor: 'text-blue-500',
      badgeColor: 'bg-blue-100 text-blue-600',
    },
    {
      label: 'Produits',
      value: stats.totalProducts,
      icon: Package,
      href: '/admin/products',
      badge: '0%',
      iconBg: 'bg-violet-50',
      iconColor: 'text-violet-500',
      badgeColor: 'bg-gray-100 text-gray-500',
    },
    {
      label: 'En Attente',
      value: stats.pendingOrders,
      icon: Clock,
      href: '/admin/orders',
      badge: stats.pendingOrders > 0 ? `-${stats.pendingOrders}` : '0',
      iconBg: 'bg-amber-50',
      iconColor: 'text-amber-500',
      badgeColor: stats.pendingOrders > 0 ? 'bg-red-100 text-red-500' : 'bg-gray-100 text-gray-500',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-zinc-900">Aperçu</h1>
          <p className="text-gray-400 text-sm mt-0.5">Bienvenue sur votre tableau de bord.</p>
        </div>
        <Link href="/admin/products" className="bg-zinc-900 text-white text-xs font-mono tracking-widest px-4 py-2.5 rounded-lg hover:bg-zinc-700 transition-colors">
          Télécharger le rapport
        </Link>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {statCards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-10 h-10 rounded-xl ${card.iconBg} flex items-center justify-center`}>
                <card.icon className={`w-5 h-5 ${card.iconColor}`} strokeWidth={1.5} />
              </div>
              <span className={`text-[10px] font-mono tracking-wider px-2 py-0.5 rounded-full ${card.badgeColor}`}>
                {card.badge}
              </span>
            </div>
            <div className="text-gray-400 text-xs font-mono tracking-widest mb-1">{card.label}</div>
            <div className="text-2xl font-bold text-zinc-900">{card.value}</div>
          </Link>
        ))}
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-semibold text-zinc-900">Commandes Récentes</h2>
          <Link href="/admin/orders" className="text-xs text-zinc-500 hover:text-zinc-900 transition-colors">
            Voir tout
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-50 bg-gray-50/50">
                <th className="px-6 py-3 text-left text-[10px] font-mono tracking-widest text-gray-400">ID</th>
                <th className="px-6 py-3 text-left text-[10px] font-mono tracking-widest text-gray-400">CLIENT</th>
                <th className="px-6 py-3 text-left text-[10px] font-mono tracking-widest text-gray-400 hidden md:table-cell">DATE</th>
                <th className="px-6 py-3 text-left text-[10px] font-mono tracking-widest text-gray-400">TOTAL</th>
                <th className="px-6 py-3 text-left text-[10px] font-mono tracking-widest text-gray-400">STATUT</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {stats.recentOrders.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-16 text-center text-sm text-gray-400">
                    Aucune commande récente
                  </td>
                </tr>
              ) : (
                stats.recentOrders.map((order: any) => (
                  <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <span className="text-[10px] font-mono text-gray-400 bg-gray-100 px-2 py-1 rounded">
                        #{order.id.slice(0, 8).toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-semibold text-zinc-900">{order.full_name}</p>
                      <p className="text-[10px] text-gray-400 mt-0.5">{order.email}</p>
                    </td>
                    <td className="px-6 py-4 hidden md:table-cell">
                      <span className="text-xs text-gray-400">
                        {new Date(order.created_at).toLocaleDateString('fr-MA', { day: '2-digit', month: 'short', year: 'numeric' })}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-bold text-zinc-900">{order.total} MAD</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-[10px] font-mono tracking-wider px-2.5 py-1 rounded-full ${statusStyles[order.status] || statusStyles.Pending}`}>
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
