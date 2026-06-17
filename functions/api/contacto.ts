export const onRequestPost = async (context: {
  request: Request;
  env: { GOOGLE_SHEET_SCRIPT_URL: string };
}) => {
  try {
    const { nombre, email, telefono, mensaje } = await context.request.json() as {
      nombre: string;
      email: string;
      telefono?: string; // Opcional
      mensaje?: string;
    };

    // Validación estricta solo para lo obligatorio
    if (!nombre || !email) {
      return new Response(
        JSON.stringify({ error: 'Nombre y Email son campos obligatorios.' }), 
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (!context.env.GOOGLE_SHEET_SCRIPT_URL) {
      return new Response(
        JSON.stringify({ error: 'Configuración faltante en el servidor.' }), 
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const queryParams = new URLSearchParams();
    queryParams.append('nombre', nombre);
    queryParams.append('email', email);
    queryParams.append('telefono', telefono || ''); // Envía cadena vacía si no hay teléfono
    queryParams.append('mensaje', mensaje || '');

    const urlConParametros = `${context.env.GOOGLE_SHEET_SCRIPT_URL}?${queryParams.toString()}`;

    const response = await fetch(urlConParametros, { method: 'GET', redirect: 'follow' });
    const respuestaTexto = await response.text();
    
    let resultadoGoogle;
    try {
      resultadoGoogle = JSON.parse(respuestaTexto);
    } catch (e) {
      return new Response(
        JSON.stringify({ error: 'Respuesta inválida de Google Sheets.' }), 
        { status: 502, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(JSON.stringify({ success: true }), { 
      status: 200, 
      headers: { 'Content-Type': 'application/json' } 
    });

  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: 'Error interno.', detalles: error.message }), 
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};