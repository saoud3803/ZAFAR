const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = "https://slqwuwrnlfsnibhcoiwt.supabase.co";
const supabaseKey = "sb_publishable_rJ9tj97-p8QD4ag8Y0WdDg_wXQL_IP2";
const supabase = createClient(supabaseUrl, supabaseKey);

const mockProducts = [
  {
    slug: "structured-leather-tote",
    name: "Structured Leather Tote",
    price: 850,
    category: "Accessories",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAD-u-zHCkHf3jK4Csp6nfyF38ZSJKi3OAZjjVuzW3cNvKYzQHMzITIoYPSB-MTCrwUR-poRYLsp-icl2jTx8lwGXns8wajH2XXkDmiKhi0qEG8EDXRj8r65M8My5-wZMJV2pJNNh9qp7_DiqS0ABCztsqRM5-4C1uc6RLi4Fbo8BhKlQrsHhwluNALkZoqdtUxHnBUcSFmkoF9hhUXxsGsCWLgNav56alCJ2H2IS9nH-M1tAUSvUNqE1xm_x-XvKqT09MBW4-Ia4Q",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBiX-gH5aZyLbfNusx3r13cwyv_99uvvfBOSyIgYKordHjd0eJmjs0798wQrdlSXM2UO-n2PiUWQoFGYDfczPTDXt1Z9aYWpSnhp_xHY9UEIc762rXDAMTGV8d3NXmCFuxz5jVL6HLvyjJ3tBRtUfosDN6oM_8rE1t3YEq3QjFm8SIyoE0iOyhG7spRHz4Z_3Q-8QITwbZXysWktmQ-3IBPH06XDUBqoYs1tSLEnLExUZ6xceoB7m00NGYFoHUOCEO4gTzgY1_91bY"
    ],
    description: "Architectural tote crafted from heavy-grade calfskin. Features reinforced edges and a minimal geometric silhouette.",
    colors: ["Noir", "Bone"],
    sizes: ["OS"]
  },
  {
    slug: "heavyweight-box-tee",
    name: "Heavyweight Box Tee",
    price: 120,
    category: "T-SHIRTS",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBiX-gH5aZyLbfNusx3r13cwyv_99uvvfBOSyIgYKordHjd0eJmjs0798wQrdlSXM2UO-n2PiUWQoFGYDfczPTDXt1Z9aYWpSnhp_xHY9UEIc762rXDAMTGV8d3NXmCFuxz5jVL6HLvyjJ3tBRtUfosDN6oM_8rE1t3YEq3QjFm8SIyoE0iOyhG7spRHz4Z_3Q-8QITwbZXysWktmQ-3IBPH06XDUBqoYs1tSLEnLExUZ6xceoB7m00NGYFoHUOCEO4gTzgY1_91bY"
    ],
    description: "The ultimate heavyweight T-shirt with signature Zafar calligraphy.",
    colors: ["Sand", "Off-White", "Vintage Black"],
    sizes: ["S", "M", "L", "XL"]
  }
];

const heroData = {
  id: 'hero',
  title1: "Quiet",
  title2: "riot.",
  title3: "tailored.",
  background_image: "https://slqwuwrnlfsnibhcoiwt.supabase.co/storage/v1/object/public/website/Header%202.png",
  metadata_top_left: "FW26 / 2026 — EDITORIAL 04",
  metadata_top_center: "| NEW DROP • LIVE NOW |",
  metadata_top_right: "EU • NY • TYO • LDN",
  side_text_left: "FW26 — VOL. 04 / QUIET RIOT",
  side_text_right: "LENSED IN MARRAKECH — SPRING 2026",
  description_chapter: "— CHAPTER FOUR",
  description_text: "HEAVYWEIGHT KNITS, RAW-EDGE DENIM, AND OBSIDIAN LEATHERS."
};

async function importData() {
  // 1. Insert Products (using upsert on slug to avoid duplicates if possible, or just insert if table is empty)
  // We will first delete all products to avoid duplicate slug constraint errors, since this is a seed.
  await supabase.from('products').delete().neq('slug', 'dummy');

  const { data: prodData, error: prodError } = await supabase.from('products').insert(mockProducts);
  if (prodError) {
    console.error("Error inserting products:", prodError);
  } else {
    console.log("Successfully inserted products!");
  }

  // 2. Upsert Hero settings
  const { data: heroDataRes, error: heroError } = await supabase.from('settings').upsert(heroData);
  if (heroError) {
    console.error("Error inserting hero settings:", heroError);
  } else {
    console.log("Successfully inserted hero settings!");
  }
}

importData();
