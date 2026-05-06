"use client";

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Plus, Pencil, Trash2, X, Check, Loader2, Star, Upload } from 'lucide-react';

interface Product {
  id: string; slug: string; name: string; price: number;
  category: string; images: string[]; description: string;
  colors: string[]; sizes: string[]; best_seller: boolean;
}

const emptyForm = { slug: '', name: '', price: '', category: 'T-SHIRTS', images: '', description: '', colors: '', sizes: '', best_seller: false };

function generateSlug(name: string) {
  return name.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchProducts = async () => {
    setLoading(true);
    const { data } = await supabase.from('products').select('*').order('created_at', { ascending: false });
    if (data) setProducts(data);
    setLoading(false);
  };

  useEffect(() => { fetchProducts(); }, []);

  const openAdd = () => { setForm(emptyForm); setEditingId(null); setShowForm(true); };
  const openEdit = (p: Product) => {
    setForm({ slug: p.slug, name: p.name, price: String(p.price), category: p.category, images: p.images.join(', '), description: p.description || '', colors: p.colors.join(', '), sizes: p.sizes.join(', '), best_seller: p.best_seller });
    setEditingId(p.id); setShowForm(true);
  };

  const handleNameChange = (name: string) => setForm(prev => ({ ...prev, name, slug: prev.slug && prev.slug !== generateSlug(prev.name) ? prev.slug : generateSlug(name) }));

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (!file) return;
    setUploading(true);
    const fileName = `products/${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
    const { data, error } = await supabase.storage.from('website').upload(fileName, file, { upsert: true });
    if (error) { showToast(`Upload error: ${error.message}`, 'error'); }
    else { const { data: u } = supabase.storage.from('website').getPublicUrl(data.path); setForm(prev => ({ ...prev, images: prev.images ? `${prev.images}, ${u.publicUrl}` : u.publicUrl })); showToast('Image uploadée !'); }
    setUploading(false); e.target.value = '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setSaving(true);
    const payload = { slug: form.slug.trim() || generateSlug(form.name), name: form.name.trim(), price: parseFloat(form.price), category: form.category, images: form.images.split(',').map(s => s.trim()).filter(Boolean), description: form.description.trim(), colors: form.colors.split(',').map(s => s.trim()).filter(Boolean), sizes: form.sizes.split(',').map(s => s.trim()).filter(Boolean), best_seller: form.best_seller };
    const { error } = editingId ? await supabase.from('products').update(payload).eq('id', editingId) : await supabase.from('products').insert(payload);
    if (error) showToast(`Erreur: ${error.message}`, 'error');
    else { showToast(editingId ? 'Produit mis à jour !' : 'Produit ajouté !'); setShowForm(false); fetchProducts(); }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Supprimer ce produit ?')) return;
    setDeletingId(id);
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (error) showToast(`Erreur: ${error.message}`, 'error');
    else { showToast('Produit supprimé.'); fetchProducts(); }
    setDeletingId(null);
  };

  const inp = "w-full bg-gray-50 border border-gray-200 text-zinc-900 text-sm px-3 py-2.5 rounded-lg focus:outline-none focus:border-zinc-400 transition-colors placeholder:text-gray-400";
  const lbl = "block text-[10px] font-mono tracking-widest text-gray-400 mb-1.5 uppercase";

  return (
    <div className="space-y-6">
      {toast && (
        <div className={`fixed top-6 right-6 z-[100] flex items-center gap-2 px-4 py-3 rounded-xl font-mono text-xs tracking-wider shadow-lg ${toast.type === 'success' ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'}`}>
          {toast.type === 'success' ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
          {toast.message}
        </div>
      )}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-zinc-900">Produits</h1>
          <p className="text-gray-400 text-sm mt-0.5">{products.length} articles dans le catalogue</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 bg-zinc-900 text-white text-xs font-mono tracking-widest px-4 py-2.5 rounded-lg hover:bg-zinc-700 transition-colors">
          <Plus className="w-4 h-4" /> Ajouter un produit
        </button>
      </div>

      <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="py-20 flex justify-center"><Loader2 className="w-6 h-6 text-gray-300 animate-spin" /></div>
        ) : products.length === 0 ? (
          <div className="py-20 text-center text-sm text-gray-400">Aucun produit. Ajoutez le premier !</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-50 bg-gray-50/50">
                  <th className="px-6 py-3 text-left text-[10px] font-mono tracking-widest text-gray-400">PRODUIT</th>
                  <th className="px-6 py-3 text-left text-[10px] font-mono tracking-widest text-gray-400 hidden md:table-cell">CATÉGORIE</th>
                  <th className="px-6 py-3 text-left text-[10px] font-mono tracking-widest text-gray-400">PRIX</th>
                  <th className="px-6 py-3 text-left text-[10px] font-mono tracking-widest text-gray-400 hidden lg:table-cell">BEST SELLER</th>
                  <th className="px-6 py-3 text-right text-[10px] font-mono tracking-widest text-gray-400">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {product.images[0] ? (
                          <img src={product.images[0]} alt={product.name} className="w-10 h-12 object-cover rounded-lg bg-gray-100 flex-shrink-0" />
                        ) : (
                          <div className="w-10 h-12 rounded-lg bg-gray-100 flex-shrink-0 flex items-center justify-center text-gray-300 text-xs">IMG</div>
                        )}
                        <div>
                          <p className="text-sm font-semibold text-zinc-900">{product.name}</p>
                          <p className="text-[10px] text-gray-400 font-mono mt-0.5">{product.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 hidden md:table-cell">
                      <span className="text-[10px] font-mono tracking-widest text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{product.category}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-bold text-zinc-900">{product.price} MAD</span>
                    </td>
                    <td className="px-6 py-4 hidden lg:table-cell">
                      {product.best_seller ? (
                        <span className="flex items-center gap-1 text-[10px] font-mono text-amber-500 bg-amber-50 px-2 py-1 rounded-full w-fit">
                          <Star className="w-3 h-3 fill-amber-400" /> OUI
                        </span>
                      ) : <span className="text-gray-300 text-sm">—</span>}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => openEdit(product)} className="p-2 text-gray-400 hover:text-zinc-900 hover:bg-gray-100 rounded-lg transition-colors">
                          <Pencil className="w-4 h-4" strokeWidth={1.5} />
                        </button>
                        <button onClick={() => handleDelete(product.id)} disabled={deletingId === product.id} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50">
                          {deletingId === product.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" strokeWidth={1.5} />}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 sticky top-0 bg-white z-10">
              <h2 className="font-semibold text-zinc-900">{editingId ? 'Modifier le produit' : 'Nouveau produit'}</h2>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-zinc-900 transition-colors"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><label className={lbl}>Nom *</label><input className={inp} placeholder="Essential Black Tee" value={form.name} onChange={e => handleNameChange(e.target.value)} required /></div>
                <div><label className={lbl}>Slug (URL)</label><input className={inp} placeholder="auto-généré" value={form.slug} onChange={e => setForm({...form, slug: e.target.value})} required /></div>
                <div><label className={lbl}>Prix (MAD) *</label><input className={inp} type="number" placeholder="450" value={form.price} onChange={e => setForm({...form, price: e.target.value})} required /></div>
                <div><label className={lbl}>Catégorie</label>
                  <select className={inp} value={form.category} onChange={e => setForm({...form, category: e.target.value})}>
                    <option value="T-SHIRTS">T-SHIRTS</option>
                    <option value="ACCESSORIES">ACCESSORIES</option>
                    <option value="ESSENTIALS">ESSENTIALS</option>
                  </select>
                </div>
              </div>
              <div>
                <label className={lbl}>Images</label>
                <div className="flex gap-2">
                  <input className={`${inp} flex-1`} placeholder="https://..." value={form.images} onChange={e => setForm({...form, images: e.target.value})} />
                  <label className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-zinc-700 text-xs font-mono tracking-widest px-3 py-2.5 rounded-lg cursor-pointer transition-colors flex-shrink-0">
                    {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                    {uploading ? '...' : 'Upload'}
                    <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                  </label>
                </div>
                {form.images && (
                  <div className="flex gap-2 mt-2 overflow-x-auto">
                    {form.images.split(',').map(u => u.trim()).filter(Boolean).map((url, i) => (
                      <img key={i} src={url} alt="" className="w-14 h-18 object-cover rounded-lg flex-shrink-0 bg-gray-100" onError={e => (e.currentTarget.style.display='none')} />
                    ))}
                  </div>
                )}
              </div>
              <div><label className={lbl}>Description</label><textarea className={inp} rows={3} value={form.description} onChange={e => setForm({...form, description: e.target.value})} /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className={lbl}>Couleurs (virgule)</label><input className={inp} placeholder="Black, White" value={form.colors} onChange={e => setForm({...form, colors: e.target.value})} /></div>
                <div><label className={lbl}>Tailles (virgule)</label><input className={inp} placeholder="S, M, L, XL" value={form.sizes} onChange={e => setForm({...form, sizes: e.target.value})} /></div>
              </div>
              <div className="flex items-center gap-3">
                <button type="button" onClick={() => setForm({...form, best_seller: !form.best_seller})} className={`w-10 h-6 rounded-full transition-colors duration-200 relative ${form.best_seller ? 'bg-amber-400' : 'bg-gray-200'}`}>
                  <span className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 ${form.best_seller ? 'translate-x-5' : 'translate-x-1'}`} />
                </button>
                <span className="text-sm text-gray-500">Marquer comme Best Seller</span>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowForm(false)} className="flex-1 border border-gray-200 text-gray-500 text-sm py-3 rounded-lg hover:border-gray-400 transition-colors">Annuler</button>
                <button type="submit" disabled={saving} className="flex-1 bg-zinc-900 text-white text-sm py-3 rounded-lg hover:bg-zinc-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
                  {saving ? <><Loader2 className="w-4 h-4 animate-spin" /> Enregistrement...</> : (editingId ? 'Mettre à jour' : 'Ajouter le produit')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
