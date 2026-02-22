import { useState, useEffect, useMemo } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  CheckoutProvider,
  PaymentElement,
  useCheckout,
} from "@stripe/react-stripe-js/checkout";
import { useStore } from "@nanostores/react";
import { $cartItems, $subtotal } from "../stores/cart";
import { storeConfig } from "../lib/constants";

const stripePromise = loadStripe(
  import.meta.env.PUBLIC_STRIPE_PUBLISHABLE_KEY ||
    "pk_test_51ShiIxLlwE3MW2ahqcf5GHv1wxm1JqfHXhwa4dCYBFPMpJQinJk2UvulkAcRHuvgrpUxrU4H5SgxgVDNdLkUjEKT008AdnSHev"
);

const validateEmail = async (email: string, checkout: any) => {
  const updateResult = await checkout.updateEmail(email);
  const isValid = updateResult.type !== "error";

  return { isValid, message: !isValid ? updateResult.error.message : null };
};

interface EmailInputProps {
  checkout: any;
  email: string;
  setEmail: (email: string) => void;
  error: string | null;
  setError: (error: string | null) => void;
}

const EmailInput = ({
  checkout,
  email,
  setEmail,
  error,
  setError,
}: EmailInputProps) => {
  const handleBlur = async () => {
    if (!email) {
      return;
    }

    const { isValid, message } = await validateEmail(email, checkout);
    if (!isValid) {
      setError(message);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setEmail(e.target.value);
  };

  return (
    <>
      <label className="block mb-2 text-sm font-medium">
        Email
        <input
          id="email"
          type="email"
          value={email}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`w-full mt-1 px-4 py-3 border rounded-lg focus:outline-none focus:border-black transition-colors ${
            error ? "border-red-500" : "border-gray-300"
          }`}
        />
      </label>
      {error && (
        <div id="email-errors" className="text-sm text-red-600 mt-1">
          {error}
        </div>
      )}
    </>
  );
};

interface CheckoutFormProps {
  total: number;
}

const CheckoutForm = ({ total }: CheckoutFormProps) => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const checkoutState = useCheckout();

  if (checkoutState.type === "loading") {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  if (checkoutState.type === "error") {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-red-800">Error: {checkoutState.error.message}</p>
      </div>
    );
  }

  const { checkout } = checkoutState;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    if (!email) {
      setEmailError("Email is required");
      setIsSubmitting(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address");
      setIsSubmitting(false);
      return;
    }

    const result = await checkout.confirm();

    if (result.type === "error") {
      setMessage(result.error.message);
      setIsSubmitting(false);
    }
  };

  const formattedAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(total);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <EmailInput
        checkout={checkout}
        email={email}
        setEmail={setEmail}
        error={emailError}
        setError={setEmailError}
      />
      <div>
        <h4 className="text-lg font-medium mb-4">Payment</h4>
        <PaymentElement id="payment-element" />
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        id="submit"
        className="w-full px-8 py-4 bg-[#3F6FD8] hover:bg-[#2d5fc7] disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-full font-medium transition-colors flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
        ) : (
          `Pay ${formattedAmount} now`
        )}
      </button>
      {message && (
        <div
          id="payment-message"
          className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-800"
        >
          {message}
        </div>
      )}
    </form>
  );
};

export default function StripeCheckout() {
  const items = useStore($cartItems);
  const cartSubtotal = useStore($subtotal);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { featuredProduct, shippingCost, theme } = storeConfig;

  const subtotal = cartSubtotal;
  const tax = subtotal * 0.0938;
  const total = subtotal + shippingCost + tax;

  const displayItems = useMemo(() => {
    return items.length > 0
      ? items
      : [
          {
            id: featuredProduct.id,
            name: featuredProduct.name,
            subtitle: featuredProduct.category,
            price: featuredProduct.price,
            size: "1",
            quantity: 1,
            color: featuredProduct.category,
            image: featuredProduct.image,
            arrivalDate: "Today, 4:00 - 5:00 PM",
          },
        ];
  }, [items, featuredProduct]);

  const displaySubtotal = items.length > 0 ? subtotal : featuredProduct.price;
  const displayTax = items.length > 0 ? tax : 0;
  const displayTotal =
    items.length > 0 ? total : featuredProduct.price + shippingCost;

  useEffect(() => {
    const fetchClientSecret = async () => {
      try {
        const response = await fetch("/api/create-checkout-session", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            items: displayItems,
            total: displayTotal,
            subtotal: displaySubtotal,
            tax: displayTax,
            uiMode: "custom",
          }),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({
            error: "Failed to create checkout session",
          }));
          throw new Error(
            errorData.error || "Failed to create checkout session"
          );
        }

        const data = await response.json();

        if (data.error) {
          throw new Error(data.error);
        }

        if (!data.clientSecret) {
          throw new Error("No client secret returned from server");
        }

        setClientSecret(data.clientSecret);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Failed to create checkout session"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchClientSecret();
  }, [displayItems, displayTotal, displaySubtotal, displayTax]);

  const appearance = {
    theme: "stripe" as const,
  };

  const elementsOptions = {
    appearance,
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="border-b border-gray-200">
        <div className="max-w-[1200px] mx-auto px-4 py-4 flex justify-between items-center">
          <a href="/" className="flex-shrink-0">
            <span
              className="text-xl font-bold"
              style={{ color: theme.primaryColor }}
            >
              {storeConfig.brandName}
            </span>
          </a>
        </div>
      </header>

      <main className="flex-1 max-w-[1200px] mx-auto px-4 py-8 w-full">
        <h1 className="text-2xl font-medium text-center mb-8">Checkout</h1>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-gray-600">Loading checkout...</div>
          </div>
        ) : error ? (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg mb-6">
            <p className="text-red-800">{error}</p>
            <a
              href="/cart"
              className="mt-4 inline-block text-sm underline hover:text-red-900"
            >
              Return to cart
            </a>
          </div>
        ) : clientSecret ? (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12">
            <div>
              <CheckoutProvider
                stripe={stripePromise}
                options={{
                  clientSecret,
                  elementsOptions,
                }}
              >
                <CheckoutForm total={displayTotal} />
              </CheckoutProvider>
            </div>

            <div className="lg:border-l lg:pl-8 border-gray-200">
              <div className="lg:sticky lg:top-8">
                <h2 className="text-lg font-medium mb-4">Order Summary</h2>

                <div className="space-y-2 text-sm mb-6">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${displaySubtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery</span>
                    <span>${shippingCost.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimated Tax</span>
                    <span>${displayTax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-medium pt-2 border-t border-gray-200">
                    <span>Total</span>
                    <span>${displayTotal.toFixed(2)}</span>
                  </div>
                </div>

                <div className="mt-8 space-y-6">
                  {displayItems.map((item) => (
                    <div
                      key={`${item.id}-${item.size}`}
                      className="flex gap-4"
                    >
                      <div className="relative w-20 h-20 flex-shrink-0 bg-gray-100 rounded overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="text-sm space-y-1">
                        <p className="font-medium">${item.price.toFixed(2)}</p>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-gray-500">{item.subtitle}</p>
                        <p className="text-gray-500">Qty: {item.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </main>

      <footer className="border-t border-gray-200 mt-16">
        <div className="max-w-[1200px] mx-auto px-4 py-6">
          <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-gray-500">
            <span>
              © 2026 {storeConfig.brandName}. All Rights Reserved
            </span>
            <div className="flex flex-wrap items-center gap-4">
              <a href="#" className="hover:text-gray-800">
                Terms of Sale
              </a>
              <a href="#" className="hover:text-gray-800">
                Terms of Use
              </a>
              <a href="#" className="hover:text-gray-800">
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
