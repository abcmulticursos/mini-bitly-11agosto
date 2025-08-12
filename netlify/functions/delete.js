import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Método no permitido' };
  }

  const { id } = JSON.parse(event.body);

  const { error } = await supabase
    .from('enlaces')
    .delete()
    .eq('id', id);

  if (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error al eliminar el enlace.', details: error.message }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Enlace eliminado.' }),
  };
};