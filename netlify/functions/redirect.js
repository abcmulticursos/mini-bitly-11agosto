import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

exports.handler = async (event, context) => {
  const { path } = event;
  const alias = path.substring(1); // Obtiene el alias de la URL

  // 1. Si no hay alias, muestra la página principal
  if (!alias) {
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'text/html',
      },
      body: '<h1>¡Bienvenido a tu acortador de URLs!</h1><p>Agrega un alias en la URL para ser redirigido.</p>',
    };
  }

  // 2. Busca el enlace en Supabase para obtener su URL de destino y su contador de clics
  const { data, error } = await supabase
    .from('enlaces')
    .select('url_destino, clicks')
    .eq('alias', alias)
    .single();

  if (error || !data) {
    return {
      statusCode: 404,
      body: 'No se encontró el alias del enlace.',
    };
  }

  // 3. Incrementa el contador de clics y actualiza Supabase
  const newClicks = data.clicks + 1;
  await supabase
    .from('enlaces')
    .update({ clicks: newClicks })
    .eq('alias', alias);

  // 4. Redirige al usuario al enlace de destino
  return {
    statusCode: 301,
    headers: {
      Location: data.url_destino,
    },
  };
};
