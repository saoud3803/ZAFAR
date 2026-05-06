-- ============================================================
-- TABLE: products
-- ============================================================
CREATE TABLE IF NOT EXISTS public.products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    price NUMERIC NOT NULL,
    category TEXT NOT NULL,
    images TEXT[] NOT NULL,
    description TEXT,
    colors TEXT[],
    sizes TEXT[],
    best_seller BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- RLS
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable read access for all users" ON public.products FOR SELECT USING (true);
CREATE POLICY "Enable insert for seeding" ON public.products FOR ALL USING (true) WITH CHECK (true);

-- ============================================================
-- MIGRATIONS
-- ============================================================
-- Add slug column (if missing):
-- ALTER TABLE products ADD COLUMN IF NOT EXISTS slug TEXT UNIQUE;

-- Convert id to UUID (if previously TEXT):
-- ALTER TABLE products DROP CONSTRAINT products_pkey;
-- ALTER TABLE products ALTER COLUMN id TYPE uuid USING gen_random_uuid();
-- ALTER TABLE products ALTER COLUMN id SET DEFAULT gen_random_uuid();
-- ALTER TABLE products ADD PRIMARY KEY (id);

-- Remove formatted_price (if still present):
-- ALTER TABLE products DROP COLUMN IF EXISTS formatted_price;

-- Add best_seller flag (if missing):
-- ALTER TABLE products ADD COLUMN IF NOT EXISTS best_seller BOOLEAN DEFAULT FALSE;
