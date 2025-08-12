import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

exports.handler = async (event, context) => {
  const { data: enlaces, error } = await supabase
    .from('enlaces')
    .select('*')
    .order('id', { ascending: false });

  if (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error al obtener los enlaces.', details: error.message }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify(enlaces),
  };
};