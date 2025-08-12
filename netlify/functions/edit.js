import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Método no permitido' };
  }

  const { id, alias, titulo, url_destino } = JSON.parse(event.body);

  const { data: updatedLink, error } = await supabase
    .from('enlaces')
    .update({ alias, titulo, url_destino })
    .eq('id', id);

  if (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error al editar el enlace.', details: error.message }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify(updatedLink),
  };
};