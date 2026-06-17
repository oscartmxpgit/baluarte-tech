import Stripe from 'stripe';

export const onRequestPost = async (context: {
  request: Request;
  env: { STRIPE_SECRET_KEY: string };
}) => {
  try {
    const stripe = new Stripe(context.env.STRIPE_SECRET_KEY, {
      apiVersion: '2023-10-16',
      httpClient: Stripe.createFetchHttpClient(),
    });

    const { items } = await context.request.json() as {
      items: Array<{ id: string; cantidad: number }>;
    };

    const lineItems = items.map(item => ({
      price: item.id,
      quantity: item.cantidad,
    }));

    const urlOrigen = new URL(context.request.url).origin;
    
    // Capturamos el ID del primer producto para pasarlo a la URL de éxito
    const productoId = items[0].id; 

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${urlOrigen}/success?producto=${productoId}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${urlOrigen}/cart-page`,
    });

    return new Response(JSON.stringify({ url: session.url }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: 'Error al procesar la sesión', detalles: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};