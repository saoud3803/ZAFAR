"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { Plus, Pencil, Trash2, X, Check, Loader2, Star, ImagePlus } from 'lucide-react';

interface Product {
  id: string; slug: string; name: string; price: number;
  category: string; images: string[]; description: string;
  colors: string[]; sizes: string[]; best_seller: boolean;
}

const emptyForm = { slug: '', name: '', price: '', category: 'T-shirt Men', images: [] as string[], description: '', colors: '', sizes: '', best_seller: false };

function generateSlug(name: string) {
  return name.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

const AVAILABLE_COLORS = ['Black', 'White', 'Beige', 'Obsidian', 'Cream', 'Taupe', 'Brown', 'Grey'];
const AVAILABLE_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [uploadingCount, setUploadingCount] = useState(0);
  const [dragOver, setDragOver] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
    setForm({
      slug: p.slug || '',
      name: p.name || '',
      price: String(p.price || 0),
      category: p.category || 'T-SHIRTS',
      images: p.images || [],
      description: p.description || '',
      colors: (p.colors || []).join(', '),
      sizes: (p.sizes || []).join(', '),
      best_seller: !!p.best_seller
    });
    setEditingId(p.id); setShowForm(true);
  };

  const handleNameChange = (name: string) => setForm(prev => ({ ...prev, name, slug: prev.slug && prev.slug !== generateSlug(prev.name) ? prev.slug : generateSlug(name) }));

  const uploadFiles = useCallback(async (files: File[]) => {
    if (!files.length) return;
    setUploadingCount(prev => prev + files.length);
    const results = await Promise.all(
      files.map(async (file) => {
        const ext = file.name.split('.').pop();
        const fileName = `products/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
        const { data, error } = await supabase.storage.from('website').upload(fileName, file, { upsert: true });
        if (error) { showToast(`Erreur: ${error.message}`, 'error'); return null; }
        const { data: u } = supabase.storage.from('website').getPublicUrl(data.path);
        return u.publicUrl;
      })
    );
    const urls = results.filter(Boolean) as string[];
    if (urls.length) {
      setForm(prev => ({ ...prev, images: [...prev.images, ...urls] }));
      showToast(`${urls.length} image${urls.length > 1 ? 's' : ''} uploadée${urls.length > 1 ? 's' : ''} !`);
    }
    setUploadingCount(prev => prev - files.length);
    if (fileInputRef.current) fileInputRef.current.value = '';
  }, []);

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    uploadFiles(files);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const files = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith('image/'));
    uploadFiles(files);
  };

  const removeImage = (url: string) => {
    setForm(prev => ({ ...prev, images: prev.images.filter(u => u !== url) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setSaving(true);
    const payload = { slug: form.slug.trim() || generateSlug(form.name), name: form.name.trim(), price: parseFloat(form.price), category: form.category, images: form.images, description: form.description.trim(), colors: form.colors.split(',').map(s => s.trim()).filter(Boolean), sizes: form.sizes.split(',').map(s => s.trim()).filter(Boolean), best_seller: form.best_seller };
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

  const inp = "w-full bg-white/50 border border-white/60 text-[#1d1d1f] text-[13px] px-3 py-2.5 rounded-xl focus:outline-none focus:border-blue-400/60 focus:bg-white/70 transition-all placeholder:text-[#aeaeb2]";
  const lbl = "block text-[11px] font-medium text-[#6e6e73] mb-1.5 tracking-wide";

  return (
    <div className="space-y-5">
      {toast && (
        <div className={`fixed top-6 right-6 z-[100] flex items-center gap-2 px-4 py-3 rounded-2xl text-[13px] font-medium shadow-xl backdrop-blur-xl border ${
          toast.type === 'success'
            ? 'bg-emerald-500/90 text-white border-emerald-400/50 shadow-emerald-500/30'
            : 'bg-red-500/90 text-white border-red-400/50 shadow-red-500/30'
        }`}>
          {toast.type === 'success' ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
          {toast.message}
        </div>
      )}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[22px] font-semibold text-[#1d1d1f] tracking-tight">Produits</h1>
          <p className="text-[#6e6e73] text-[13px] mt-0.5">{products.length} articles dans le catalogue</p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 bg-blue-500 text-white text-[13px] font-medium px-4 py-2.5 rounded-xl hover:bg-blue-600 transition-colors shadow-lg shadow-blue-500/30"
        >
          <Plus className="w-4 h-4" /> Ajouter un produit
        </button>
      </div>

      <div className="bg-white/60 backdrop-blur-xl border border-white/70 rounded-2xl shadow-lg shadow-black/5 overflow-hidden">
        {loading ? (
          <div className="py-20 flex justify-center"><Loader2 className="w-6 h-6 text-[#aeaeb2] animate-spin" /></div>
        ) : products.length === 0 ? (
          <div className="py-20 text-center text-[13px] text-[#6e6e73]">Aucun produit. Ajoutez le premier !</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-black/[0.06] bg-black/[0.02]">
                  <th className="px-6 py-3 text-left text-[11px] font-medium text-[#6e6e73] tracking-wide">PRODUIT</th>
                  <th className="px-6 py-3 text-left text-[11px] font-medium text-[#6e6e73] tracking-wide hidden md:table-cell">CATÉGORIE</th>
                  <th className="px-6 py-3 text-left text-[11px] font-medium text-[#6e6e73] tracking-wide">PRIX</th>
                  <th className="px-6 py-3 text-left text-[11px] font-medium text-[#6e6e73] tracking-wide hidden lg:table-cell">BEST SELLER</th>
                  <th className="px-6 py-3 text-right text-[11px] font-medium text-[#6e6e73] tracking-wide">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/[0.04]">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-black/[0.02] transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {(product.images && product.images.length > 0 && product.images[0]) ? (
                          <img src={product.images[0]} alt={product.name} className="w-10 h-12 object-cover rounded-xl bg-black/5 flex-shrink-0" />
                        ) : (
                          <div className="w-10 h-12 rounded-xl bg-black/5 flex-shrink-0 flex items-center justify-center text-[#aeaeb2] text-[10px]">IMG</div>
                        )}
                        <div>
                          <p className="text-[13px] font-medium text-[#1d1d1f]">{product.name}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 hidden md:table-cell">
                      <span className="text-[11px] font-medium text-[#6e6e73] bg-black/5 px-2.5 py-1 rounded-full">{product.category}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-[13px] font-semibold text-[#1d1d1f]">{product.price} MAD</span>
                    </td>
                    <td className="px-6 py-4 hidden lg:table-cell">
                      {product.best_seller ? (
                        <span className="flex items-center gap-1 text-[11px] font-medium text-amber-600 bg-amber-100/80 px-2.5 py-1 rounded-full w-fit">
                          <Star className="w-3 h-3 fill-amber-500" /> OUI
                        </span>
                      ) : <span className="text-[#d1d1d6] text-sm">—</span>}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-1.5">
                        <button onClick={() => openEdit(product)} className="p-2 text-[#6e6e73] hover:text-[#1d1d1f] hover:bg-white/60 rounded-xl transition-all">
                          <Pencil className="w-4 h-4" strokeWidth={1.5} />
                        </button>
                        <button onClick={() => handleDelete(product.id)} disabled={deletingId === product.id} className="p-2 text-[#6e6e73] hover:text-red-500 hover:bg-red-50/70 rounded-xl transition-all disabled:opacity-50">
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
        <div className="fixed inset-0 bg-black/30 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white/80 backdrop-blur-2xl border border-white/70 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl shadow-black/20">
            <div className="flex items-center justify-between px-6 py-4 border-b border-black/[0.06] sticky top-0 bg-white/80 backdrop-blur-2xl z-10 rounded-t-3xl">
              <h2 className="font-semibold text-[#1d1d1f] text-[15px]">{editingId ? 'Modifier le produit' : 'Nouveau produit'}</h2>
              <button onClick={() => setShowForm(false)} className="text-[#6e6e73] hover:text-[#1d1d1f] transition-colors w-7 h-7 flex items-center justify-center rounded-full hover:bg-black/5">
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div><label className={lbl}>Nom *</label><input className={inp} placeholder="Essential Black Tee" value={form.name} onChange={e => handleNameChange(e.target.value)} required /></div>
                <div><label className={lbl}>Prix (MAD) *</label><input className={inp} type="number" placeholder="450" value={form.price} onChange={e => setForm({...form, price: e.target.value})} required /></div>
                <div><label className={lbl}>Catégorie</label>
                  <select className={inp} value={form.category} onChange={e => setForm({...form, category: e.target.value})}>
                    <option value="T-shirt Men">T-shirt Men</option>
                    <option value="T-shirt Women">T-shirt Women</option>
                    <option value="Tableau">Tableau</option>
                  </select>
                </div>
              </div>
              <div>
                <label className={lbl}>Images</label>
                {/* Drop zone */}
                <div
                  onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`relative flex flex-col items-center justify-center gap-2 w-full rounded-2xl border-2 border-dashed py-7 cursor-pointer transition-all duration-200 select-none ${
                    dragOver
                      ? 'border-blue-400 bg-blue-50/60 scale-[1.01]'
                      : 'border-white/60 bg-white/30 hover:border-blue-300 hover:bg-white/50'
                  }`}
                >
                  {uploadingCount > 0 ? (
                    <>
                      <Loader2 className="w-6 h-6 text-blue-400 animate-spin" />
                      <p className="text-[12px] text-[#6e6e73]">Upload en cours…</p>
                    </>
                  ) : (
                    <>
                      <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                        <ImagePlus className="w-5 h-5 text-blue-400" strokeWidth={1.5} />
                      </div>
                      <div className="text-center">
                        <p className="text-[13px] font-medium text-[#1d1d1f]">Glissez vos images ici</p>
                        <p className="text-[11px] text-[#aeaeb2] mt-0.5">ou cliquez pour sélectionner — JPG, PNG, WEBP</p>
                      </div>
                    </>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFileInputChange}
                    className="hidden"
                  />
                </div>

                {/* Image preview grid */}
                {form.images.length > 0 && (
                  <div className="grid grid-cols-4 gap-2 mt-3">
                    {form.images.map((url, i) => (
                      <div key={url} className="relative group aspect-square rounded-xl overflow-hidden bg-black/5">
                        <img src={url} alt="" className="w-full h-full object-cover" />
                        {i === 0 && (
                          <span className="absolute top-1 left-1 text-[9px] font-bold bg-blue-500 text-white px-1.5 py-0.5 rounded-md tracking-wide">
                            COVER
                          </span>
                        )}
                        <button
                          type="button"
                          onClick={() => removeImage(url)}
                          className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div><label className={lbl}>Description</label><textarea className={inp} rows={3} value={form.description} onChange={e => setForm({...form, description: e.target.value})} /></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={lbl}>Couleurs</label>
                  <div className="flex flex-wrap gap-2">
                    {AVAILABLE_COLORS.map(color => {
                      const isSelected = form.colors.split(',').map(c => c.trim()).includes(color);
                      return (
                        <button
                          key={color} type="button"
                          onClick={() => {
                            const currentColors = form.colors.split(',').map(c => c.trim()).filter(Boolean);
                            const newColors = isSelected ? currentColors.filter(c => c !== color) : [...currentColors, color];
                            setForm({...form, colors: newColors.join(', ')});
                          }}
                          className={`px-3 py-1.5 text-[12px] rounded-xl border transition-all duration-150 ${isSelected ? 'bg-blue-500 text-white border-blue-500 shadow-md shadow-blue-500/25' : 'bg-white/50 text-[#6e6e73] border-white/60 hover:border-blue-300 hover:bg-white/70'}`}
                        >
                          {color}
                        </button>
                      );
                    })}
                  </div>
                </div>
                <div>
                  <label className={lbl}>Tailles</label>
                  <div className="flex flex-wrap gap-2">
                    {AVAILABLE_SIZES.map(size => {
                      const isSelected = form.sizes.split(',').map(c => c.trim()).includes(size);
                      return (
                        <button
                          key={size} type="button"
                          onClick={() => {
                            const currentSizes = form.sizes.split(',').map(c => c.trim()).filter(Boolean);
                            const newSizes = isSelected ? currentSizes.filter(c => c !== size) : [...currentSizes, size];
                            setForm({...form, sizes: newSizes.join(', ')});
                          }}
                          className={`px-3 py-1.5 text-[12px] rounded-xl border transition-all duration-150 font-mono ${isSelected ? 'bg-blue-500 text-white border-blue-500 shadow-md shadow-blue-500/25' : 'bg-white/50 text-[#6e6e73] border-white/60 hover:border-blue-300 hover:bg-white/70'}`}
                        >
                          {size}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div>
                <label className={lbl}>Best Seller</label>
                <button
                  type="button"
                  onClick={() => setForm({...form, best_seller: !form.best_seller})}
                  className={`flex items-center gap-3 w-full px-4 py-3 rounded-2xl border-2 transition-all duration-200 ${
                    form.best_seller
                      ? 'border-amber-400/60 bg-amber-50/70 text-amber-700'
                      : 'border-white/50 bg-white/30 text-[#6e6e73] hover:border-white/70 hover:bg-white/50'
                  }`}
                >
                  <Star className={`w-5 h-5 ${form.best_seller ? 'fill-amber-400 text-amber-400' : 'text-[#d1d1d6]'}`} />
                  <span className="text-[13px] font-medium">
                    {form.best_seller ? 'Best Seller ✓' : 'Marquer comme Best Seller'}
                  </span>
                  <div className={`ml-auto w-10 h-6 rounded-full transition-colors duration-200 relative flex-shrink-0 ${
                    form.best_seller ? 'bg-amber-400' : 'bg-black/10'
                  }`}>
                    <span className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-200 ${
                      form.best_seller ? 'translate-x-5' : 'translate-x-1'
                    }`} />
                  </div>
                </button>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowForm(false)} className="flex-1 border border-white/60 bg-white/40 hover:bg-white/60 text-[#6e6e73] text-[13px] py-3 rounded-xl transition-all">Annuler</button>
                <button type="submit" disabled={saving} className="flex-1 bg-blue-500 text-white text-[13px] font-medium py-3 rounded-xl hover:bg-blue-600 transition-colors disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-blue-500/30">
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
