-- ============================================================
-- TABLE: orders
-- ============================================================
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email TEXT NOT NULL,
    full_name TEXT NOT NULL,
    address TEXT NOT NULL,
    city TEXT NOT NULL,
    country TEXT NOT NULL,
    zip_code TEXT NOT NULL,
    status TEXT DEFAULT 'Pending' NOT NULL,
    total NUMERIC NOT NULL,
    cart_items JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- RLS
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Allow anyone to create an order
CREATE POLICY "Enable insert access for all users" ON public.orders FOR INSERT WITH CHECK (true);

-- Allow reading orders (required for admin dashboard)
-- NOTE: In production, replace this with a service_role key on the server side.
CREATE POLICY "Enable read access for all users" ON public.orders FOR SELECT USING (true);

-- Allow updating order status (for admin dashboard)
CREATE POLICY "Enable update for all users" ON public.orders FOR UPDATE USING (true) WITH CHECK (true);

-- ============================================================
-- MIGRATION — Run this if the orders table already exists:
-- ============================================================
-- Add SELECT policy (if missing):
-- CREATE POLICY "Enable read access for all users" ON public.orders FOR SELECT USING (true);

-- Add UPDATE policy (for status changes):
-- CREATE POLICY "Enable update for all users" ON public.orders FOR UPDATE USING (true) WITH CHECK (true);
