const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = "https://slqwuwrnlfsnibhcoiwt.supabase.co";
const supabaseKey = "sb_publishable_rJ9tj97-p8QD4ag8Y0WdDg_wXQL_IP2";
const supabase = createClient(supabaseUrl, supabaseKey);

async function check() {
  const { data, error } = await supabase.from('products').select('*').limit(1);
  if (error) {
    console.error("Error:", error);
  } else {
    console.log("Columns:", data.length > 0 ? Object.keys(data[0]) : "No products found");
  }
}

check();
