const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = "https://slqwuwrnlfsnibhcoiwt.supabase.co";
const supabaseKey = "sb_publishable_rJ9tj97-p8QD4ag8Y0WdDg_wXQL_IP2";
const supabase = createClient(supabaseUrl, supabaseKey);

async function upsertHero() {
  const imageUrl = "https://slqwuwrnlfsnibhcoiwt.supabase.co/storage/v1/object/public/website/Header%202.png";
  
  const heroData = {
    id: 'hero',
    title1: "Quiet",
    title2: "riot.",
    title3: "tailored.",
    background_image: imageUrl,
    metadata_top_left: "FW26 / 2026 — EDITORIAL 04",
    metadata_top_center: "| NEW DROP • LIVE NOW |",
    metadata_top_right: "EU • NY • TYO • LDN",
    side_text_left: "FW26 — VOL. 04 / QUIET RIOT",
    side_text_right: "LENSED IN MARRAKECH — SPRING 2026",
    description_chapter: "— CHAPTER FOUR",
    description_text: "HEAVYWEIGHT KNITS, RAW-EDGE DENIM, AND OBSIDIAN LEATHERS."
  };

  const { data, error } = await supabase
    .from('settings')
    .upsert(heroData);

  if (error) {
    console.error("Error upserting hero:", error);
  } else {
    console.log("Successfully UPSERTED hero background image & settings!");
  }
}

upsertHero();
