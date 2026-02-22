import { useState, useEffect } from "react";
import { useStore } from "@nanostores/react";
import { storeConfig } from "../lib/constants";
import { $cartItems, $isLoaded, removeFromCart, updateQuantity } from "../stores/cart";
import { Minus, Plus, Info, Clock } from "lucide-react";

export default function CartPage() {
  const { products, theme, shippingCost } = storeConfig;
  const items = useStore($cartItems);
  const isLoaded = useStore($isLoaded);
  const [promoCode, setPromoCode] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = subtotal + shippingCost;

  const otherProducts = products.filter(
    (p) => !items.find((item) => item.id === p.id)
  ).slice(0, 4);

  if (!mounted || !isLoaded) {
    return (
      <div className="bg-white">
        <main className="max-w-7xl mx-auto px-4 py-12 text-center">
          <div className="text-gray-600">Loading cart...</div>
        </main>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="bg-white">
        <main className="max-w-7xl mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-medium text-gray-900 mb-4">
            Your Cart is Empty
          </h1>
          <p className="text-gray-600 mb-6">
            Looks like you haven&apos;t added anything to your cart yet.
          </p>
          <a
            href="/"
            className="inline-block text-white px-6 py-3 rounded-sm text-sm font-medium"
            style={{ backgroundColor: theme.primaryColor }}
          >
            Continue Shopping
          </a>
        </main>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <main className="max-w-7xl mx-auto px-4 py-6 overflow-x-hidden">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:flex-[2]">
            <h1 className="text-2xl font-medium text-gray-900 mb-4">
              Your Cart
            </h1>

            <div className="flex items-center gap-2 text-sm text-gray-600 mb-4 p-3 bg-green-50 rounded-lg">
              <Clock size={16} style={{ color: theme.primaryColor }} />
              <span>
                Delivery available{" "}
                <strong className="text-gray-900">
                  Today, 4:00 - 5:00 PM
                </strong>
              </span>
            </div>

            {items.map((item) => (
              <div key={`${item.id}-${item.size}`} className="border-t border-gray-200 py-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="w-24 h-24 bg-gray-50 rounded-lg shrink-0 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">
                          {item.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {item.subtitle}
                        </p>
                      </div>

                      <div className="flex sm:flex-col sm:items-end justify-between sm:justify-start gap-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500">Qty</span>
                          <div className="flex items-center border border-gray-300 rounded">
                            <button
                              onClick={() =>
                                updateQuantity(item.id, Math.max(1, item.quantity - 1), item.size)
                              }
                              className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 touch-manipulation"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="w-8 text-center text-sm">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1, item.size)}
                              className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 touch-manipulation"
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                        </div>
                        <div className="text-right">
                          <p
                            className="text-sm font-medium"
                            style={{ color: theme.primaryColor }}
                          >
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 mt-4 text-xs">
                      <button className="text-gray-600 underline hover:text-gray-900 touch-manipulation">
                        Save for later
                      </button>
                      <button
                        onClick={() => removeFromCart(item.id, item.size)}
                        className="text-gray-600 underline hover:text-gray-900 touch-manipulation"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {otherProducts.length > 0 && (
              <div className="border-t border-gray-200 py-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">
                  Don&apos;t forget these items
                </h2>
                <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                  {otherProducts.map((product) => (
                    <div
                      key={product.id}
                      className="min-w-[120px] w-[120px] shrink-0 group"
                    >
                      <div className="relative aspect-square bg-gray-50 mb-2 rounded-lg overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <p className="text-[10px] font-medium text-gray-900">
                        {product.name}
                      </p>
                      <p className="text-[10px] text-gray-500">
                        {product.category}
                      </p>
                      <p className="text-[10px] font-medium text-gray-900">
                        ${product.price.toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="w-full lg:flex-1">
            <div className="lg:sticky lg:top-4 bg-gray-50 lg:bg-transparent p-4 lg:p-0 rounded-lg lg:rounded-none mb-4 lg:mb-0">
              <div className="space-y-2 mb-4 lg:mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-900">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 flex items-center gap-1">
                    Delivery <Info size={12} className="text-gray-400" />
                  </span>
                  <span className="text-gray-900">
                    ${shippingCost.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-medium pt-2 border-t border-gray-200">
                  <span className="text-gray-900">Estimated total</span>
                  <span className="text-gray-900">${total.toFixed(2)}</span>
                </div>
              </div>

              <div className="mb-6">
                <label className="text-sm text-gray-700">Promo code</label>
                <div className="flex mt-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Enter code"
                    className="flex-1 border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-gray-500 rounded-l-sm"
                  />
                  <button
                    className="text-white px-4 py-2 text-sm font-medium rounded-r-sm"
                    style={{ backgroundColor: theme.primaryColor }}
                  >
                    Apply
                  </button>
                </div>
              </div>

              <a
                href="/checkout"
                className="w-full text-white py-3 text-sm font-medium transition-colors mb-3 rounded-sm block text-center"
                style={{ backgroundColor: theme.primaryColor }}
              >
                Checkout
              </a>

              <a
                href="/checkout/stripe"
                className="w-full px-6 py-3 bg-[#635BFF] hover:bg-[#5851DB] text-white rounded-sm font-medium transition-colors flex items-center justify-center mb-3"
              >
                <span className="text-sm font-bold">stripe</span>
              </a>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <button className="border border-gray-300 py-2.5 flex items-center justify-center hover:border-gray-500 transition-colors rounded-sm">
                  <span className="text-blue-800 font-bold text-sm">
                    PayPal
                  </span>
                </button>
                <button className="border border-gray-300 py-2.5 flex items-center justify-center hover:border-gray-500 transition-colors rounded-sm">
                  <span className="text-green-700 font-bold text-sm">
                    EBT
                  </span>
                </button>
              </div>

              <div className="text-center">
                <a
                  href="/"
                  className="text-sm text-gray-600 underline hover:text-gray-900"
                >
                  Continue shopping
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
