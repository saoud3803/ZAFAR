const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = "https://slqwuwrnlfsnibhcoiwt.supabase.co";
const supabaseKey = "sb_publishable_rJ9tj97-p8QD4ag8Y0WdDg_wXQL_IP2";
const supabase = createClient(supabaseUrl, supabaseKey);

// Products conformes au nouveau schéma : id (auto UUID), slug, name, price, category, images, description, colors, sizes
const products = [
  {
    slug: "zafar-essential-black-tee",
    name: "Essential Black Tee",
    price: 450,
    category: "T-SHIRTS",
    images: [
      "https://slqwuwrnlfsnibhcoiwt.supabase.co/storage/v1/object/public/website/Header%202.png",
    ],
    description: "Le T-shirt essentiel ZAFAR. Coton heavyweight 280g, coupe boxy oversized. Broderie calligraphie arabique au dos.\n\nFabriqué au Portugal. Lavage à 30°C.",
    colors: ["Black", "White", "Vintage Sand"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"]
  },
  {
    slug: "zafar-quiet-riot-white-tee",
    name: "Quiet Riot White Tee",
    price: 480,
    category: "T-SHIRTS",
    images: [
      "https://slqwuwrnlfsnibhcoiwt.supabase.co/storage/v1/object/public/website/Header%202.png",
    ],
    description: "Édition limitée FW26. T-shirt signature en coton organique heavyweight avec imprimé graphique exclusif 'Quiet Riot'.\n\nFabriqué au Portugal. Lavage à 30°C.",
    colors: ["Off-White", "Cream"],
    sizes: ["S", "M", "L", "XL"]
  },
  {
    slug: "zafar-calligraphy-drop-tee",
    name: "Calligraphy Drop Tee",
    price: 520,
    category: "T-SHIRTS",
    images: [
      "https://slqwuwrnlfsnibhcoiwt.supabase.co/storage/v1/object/public/website/Header%202.png",
    ],
    description: "La pièce iconique de la collection. Coupe drop-shoulder oversize avec calligraphie ZAFAR brodée à la main.\n\nÉdition limitée. Fabriqué au Maroc.",
    colors: ["Washed Black", "Stone Grey"],
    sizes: ["S", "M", "L", "XL", "XXL"]
  },
  {
    slug: "zafar-arabic-script-tee-sand",
    name: "Arabic Script Tee — Sand",
    price: 390,
    category: "T-SHIRTS",
    images: [
      "https://slqwuwrnlfsnibhcoiwt.supabase.co/storage/v1/object/public/website/Header%202.png",
    ],
    description: "T-shirt coupe droite en coton combed ring-spun. Script arabe imprimé en sérigraphie à l'encre eau.\n\nFabriqué au Portugal.",
    colors: ["Sand", "Warm Beige"],
    sizes: ["XS", "S", "M", "L", "XL"]
  }
];

async function importProducts() {
  console.log("Suppression des anciens produits...");
  const { error: deleteError } = await supabase
    .from('products')
    .delete()
    .neq('slug', 'dummy-never-matches');

  if (deleteError) {
    console.error("Erreur lors de la suppression:", deleteError);
    return;
  }

  console.log("Insertion des nouveaux produits...");
  const { data, error } = await supabase
    .from('products')
    .insert(products)
    .select();

  if (error) {
    console.error("Erreur lors de l'insertion:", error);
  } else {
    console.log(`✅ ${data.length} produits importés avec succès dans Supabase !`);
    data.forEach(p => console.log(`  → [${p.id}] ${p.name} (${p.slug}) — ${p.price} MAD`));
  }
}

importProducts();
