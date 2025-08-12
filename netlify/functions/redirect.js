import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

exports.handler = async (event, context) => {
  const alias = event.path.split('/').pop();

  if (!alias) {
    return {
      statusCode: 404,
      body: JSON.stringify({ error: 'Alias no proporcionado.' }),
    };
  }

  const { data, error } = await supabase
    .from('enlaces')
    .select('url_destino')
    .eq('alias', alias)
    .single();

  if (error || !data) {
    return {
      statusCode: 404,
      body: JSON.stringify({ error: 'Enlace no encontrado.' }),
    };
  }

  return {
    statusCode: 301,
    headers: {
      Location: data.url_destino,
    },
  };
};