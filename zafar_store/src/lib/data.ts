import { supabase } from './supabase';
import { CATEGORY_MAP } from './categories';

export interface Product {
  id: string;
  name: string;
  price: number;
  formattedPrice: string;
  description: string;
  images: string[];
  colors: string[];
  sizes: string[];
  best_seller: boolean;
  category: string;
  inStock: boolean;
}

export const getProducts = async (): Promise<Product[]> => {
  const { data, error } = await supabase.from('products').select('*');
  
  if (error) {
    console.error("Error fetching products:", error);
    return [];
  }
  
  return data.map(p => ({
    id: p.id,
    name: p.name,
    price: p.price,
    formattedPrice: `${p.price} MAD`,
    description: p.description || "",
    images: p.images || [],
    colors: p.colors || [],
    sizes: p.sizes || [],
    best_seller: p.best_seller || false,
    category: p.category,
    inStock: true
  }));
};

export const getProductById = async (id: string): Promise<Product | null> => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();
    
  if (error || !data) {
    console.error("Error fetching product:", error);
    return null;
  }
  
  return {
    id: data.id,
    name: data.name,
    price: data.price,
    formattedPrice: `${data.price} MAD`,
    description: data.description || "",
    images: data.images || [],
    colors: data.colors || [],
    sizes: data.sizes || [],
    best_seller: data.best_seller || false,
    category: data.category,
    inStock: true
  };
};

export const getProductBySlug = async (slug: string): Promise<Product | null> => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !data) return null;

  return {
    id: data.id,
    name: data.name,
    price: data.price,
    formattedPrice: `${data.price} MAD`,
    description: data.description || '',
    images: data.images || [],
    colors: data.colors || [],
    sizes: data.sizes || [],
    best_seller: data.best_seller || false,
    category: data.category,
    inStock: true,
  };
};

export const getProductsByCategory = async (slug: string): Promise<Product[]> => {
  const dbCategories = CATEGORY_MAP[slug.toLowerCase()];
  if (!dbCategories?.length) return [];

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .in('category', dbCategories)
    .order('created_at', { ascending: false });

  if (error || !data) return [];

  return data.map(p => ({
    id: p.id,
    name: p.name,
    price: p.price,
    formattedPrice: `${p.price} MAD`,
    description: p.description || '',
    images: p.images || [],
    colors: p.colors || [],
    sizes: p.sizes || [],
    best_seller: p.best_seller || false,
    category: p.category,
    inStock: true,
  }));
};

export const getBestSellers = async (): Promise<Product[]> => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('best_seller', true)
    .order('created_at', { ascending: false });

  if (error || !data) return [];

  return data.map(p => ({
    id: p.id,
    name: p.name,
    price: p.price,
    formattedPrice: `${p.price} MAD`,
    description: p.description || '',
    images: p.images || [],
    colors: p.colors || [],
    sizes: p.sizes || [],
    best_seller: p.best_seller || false,
    category: p.category,
    inStock: true,
  }));
};

export const getHeroSettings = async () => {
  const { data, error } = await supabase
    .from('settings')
    .select('*')
    .eq('id', 'hero')
    .single();
    
  if (error || !data) {
    console.error("Error fetching hero settings:", error);
    return null;
  }
  
  return data;
};

