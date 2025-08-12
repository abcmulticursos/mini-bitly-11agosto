import { createClient } from '@supabase/supabase-js';

exports.handler = async (event, context) => {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Variables de entorno de Supabase no configuradas." }),
    };
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseKey);
    const { data, error } = await supabase.from('enlaces').select('*').limit(1);

    if (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ message: "La conexión a Supabase falló.", details: error.message }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "¡Conexión a Supabase exitosa!", data: data }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error al intentar crear el cliente de Supabase.", details: err.message }),
    };
  }
};