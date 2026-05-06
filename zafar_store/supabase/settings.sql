-- ============================================================
-- TABLE: settings (Hero section)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.settings (
    id TEXT PRIMARY KEY,
    title1 TEXT,
    title2 TEXT,
    title3 TEXT,
    background_image TEXT,
    metadata_top_left TEXT,
    metadata_top_center TEXT,
    metadata_top_right TEXT,
    side_text_left TEXT,
    side_text_right TEXT,
    description_chapter TEXT,
    description_text TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- RLS
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable read access for all users" ON public.settings FOR SELECT USING (true);
CREATE POLICY "Enable insert for seeding" ON public.settings FOR ALL USING (true) WITH CHECK (true);
