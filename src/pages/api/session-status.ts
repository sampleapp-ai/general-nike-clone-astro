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
    const { session_id } = await request.json();

    if (!session_id) {
      return new Response(
        JSON.stringify({ error: "session_id is required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
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

    const session = await stripe.checkout.sessions.retrieve(session_id, {
      expand: ["payment_intent"],
    });

    const paymentIntent = session.payment_intent as Stripe.PaymentIntent | null;

    return new Response(
      JSON.stringify({
        status: session.status,
        payment_status: session.payment_status,
        payment_intent_id: paymentIntent?.id || null,
        payment_intent_status: paymentIntent?.status || null,
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
        : "Failed to retrieve session status";
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
