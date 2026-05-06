const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = "https://slqwuwrnlfsnibhcoiwt.supabase.co";
const supabaseKey = "sb_publishable_rJ9tj97-p8QD4ag8Y0WdDg_wXQL_IP2";
const supabase = createClient(supabaseUrl, supabaseKey);

const mockProducts = [
  {
    id: "prod-1",
    name: "Structured Leather Tote",
    price: 850,
    formatted_price: "$850.00",
    category: "Accessories",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAD-u-zHCkHf3jK4Csp6nfyF38ZSJKi3OAZjjVuzW3cNvKYzQHMzITIoYPSB-MTCrwUR-poRYLsp-icl2jTx8lwGXns8wajH2XXkDmiKhi0qEG8EDXRj8r65M8My5-wZMJV2pJNNh9qp7_DiqS0ABCztsqRM5-4C1uc6RLi4Fbo8BhKlQrsHhwluNALkZoqdtUxHnBUcSFmkoF9hhUXxsGsCWLgNav56alCJ2H2IS9nH-M1tAUSvUNqE1xm_x-XvKqT09MBW4-Ia4Q",
    ],
    description: "Architectural tote crafted from heavy-grade calfskin.",
    colors: ["Noir", "Bone"],
    sizes: ["OS"]
  },
  {
    id: "prod-2",
    name: "Heavyweight Box Tee",
    price: 120,
    formatted_price: "$120.00",
    category: "T-SHIRTS",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBiX-gH5aZyLbfNusx3r13cwyv_99uvvfBOSyIgYKordHjd0eJmjs0798wQrdlSXM2UO-n2PiUWQoFGYDfczPTDXt1Z9aYWpSnhp_xHY9UEIc762rXDAMTGV8d3NXmCFuxz5jVL6HLvyjJ3tBRtUfosDN6oM_8rE1t3YEq3QjFm8SIyoE0iOyhG7spRHz4Z_3Q-8QITwbZXysWktmQ-3IBPH06XDUBqoYs1tSLEnLExUZ6xceoB7m00NGYFoHUOCEO4gTzgY1_91bY"
    ],
    description: "The ultimate heavyweight T-shirt with signature Zafar calligraphy.",
    colors: ["Sand", "Off-White", "Vintage Black"],
    sizes: ["S", "M", "L", "XL"]
  }
];

async function seed() {
  const { data, error } = await supabase.from('products').upsert(mockProducts);
  if (error) {
    console.error("Error inserting products:", error);
  } else {
    console.log("Successfully inserted products!", data);
  }
}

seed();
