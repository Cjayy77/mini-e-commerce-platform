const { createClient }  = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Supabase URL or Key is missing in .env file');
    process.exit(1);
}
const supabase = createClient(supabaseUrl, supabaseKey);

console.log('Supabaseclient initialized sucessfully');

module.exports = supabase;