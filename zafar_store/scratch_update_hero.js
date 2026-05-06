const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = "https://slqwuwrnlfsnibhcoiwt.supabase.co";
const supabaseKey = "sb_publishable_rJ9tj97-p8QD4ag8Y0WdDg_wXQL_IP2";
const supabase = createClient(supabaseUrl, supabaseKey);

async function updateHero() {
  const imageUrl = "https://slqwuwrnlfsnibhcoiwt.supabase.co/storage/v1/object/public/website/Header%202.png";
  
  const { data, error } = await supabase
    .from('settings')
    .update({ 
      background_image: imageUrl,
      title1: "Quiet",
      title2: "riot.",
      title3: "tailored."
    })
    .eq('id', 'hero');

  if (error) {
    console.error("Error updating hero:", error);
  } else {
    console.log("Successfully updated hero background image to Supabase URL!");
  }
}

updateHero();
