import type { APIRoute } from "astro";
import Stripe from "stripe";

function getStripe() {
  return new Stripe(import.meta.env.STRIPE_SECRET_KEY || "", {
    apiVersion: "2026-01-28.clover",
    typescript: true,
  });
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const { items, total, subtotal, tax, uiMode } = await request.json();

    if (!items || !Array.isArray(items) || items.length === 0) {
      return new Response(JSON.stringify({ error: "No items provided" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (!import.meta.env.STRIPE_SECRET_KEY) {
      return new Response(
        JSON.stringify({ error: "Server configuration error" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const stripe = getStripe();

    const lineItems = items.map(
      (item: {
        name: string;
        subtitle: string;
        color: string;
        size: string;
        price: number;
        quantity: number;
        image: string;
      }) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
            description: `${item.subtitle} - ${item.color} - Size: ${item.size}`,
            images: [item.image],
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      })
    );

    const origin = request.headers.get("origin") || "http://localhost:4321";

    if (uiMode === "hosted") {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: lineItems,
        mode: "payment",
        success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}/checkout?canceled=true`,
        metadata: {
          subtotal: subtotal.toFixed(2),
          tax: tax.toFixed(2),
          total: total.toFixed(2),
        },
      });

      return new Response(
        JSON.stringify({
          sessionId: session.id,
          url: session.url,
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const session = await stripe.checkout.sessions.create({
      ui_mode: "custom",
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      return_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      metadata: {
        subtotal: subtotal.toFixed(2),
        tax: tax.toFixed(2),
        total: total.toFixed(2),
      },
    });

    return new Response(
      JSON.stringify({
        clientSecret: session.client_secret,
        sessionId: session.id,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Failed to create checkout session";
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
