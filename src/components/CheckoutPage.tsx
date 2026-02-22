import { useStore } from "@nanostores/react";
import { storeConfig } from "../lib/constants";
import { $cartItems, $subtotal } from "../stores/cart";
import { CheckCircle2, Package, Truck, CreditCard } from "lucide-react";
import { motion } from "framer-motion";

export default function CheckoutPage() {
  const { featuredProduct, shippingCost, orderDetails, theme } = storeConfig;
  const items = useStore($cartItems);
  const cartSubtotal = useStore($subtotal);

  const subtotal = items.length > 0 ? cartSubtotal : featuredProduct.price;
  const total = subtotal + shippingCost;

  return (
    <div className="bg-white">
      <main className="mx-auto px-4 py-8 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <CheckCircle2 className="w-10 h-10 text-emerald-600" />
          </motion.div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">
            Order Confirmed!
          </h1>
          <p className="text-gray-600">
            Your groceries are on the way. We&apos;ll notify you when your
            delivery is near.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="bg-gray-50 rounded-xl p-6 mb-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-900">
              Order Summary
            </h2>
            <span className="text-sm text-gray-500">
              #{orderDetails.orderId}
            </span>
          </div>

          {items.length > 0 ? (
            items.map((item) => (
              <div key={`${item.id}-${item.size}`} className="flex gap-4 pb-4 border-b border-gray-200">
                <div className="w-20 h-20 bg-white rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    {item.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {item.subtitle} &times; {item.quantity}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="flex gap-4 pb-4 border-b border-gray-200">
              <div className="w-20 h-20 bg-white rounded-lg overflow-hidden flex-shrink-0">
                <img
                  src={featuredProduct.image}
                  alt={featuredProduct.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">
                  {featuredProduct.name}
                </p>
                <p className="text-xs text-gray-500">
                  {featuredProduct.category}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">
                  ${featuredProduct.price.toFixed(2)}
                </p>
              </div>
            </div>
          )}

          <div className="pt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Subtotal</span>
              <span className="text-gray-900">
                ${subtotal.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Delivery</span>
              <span className="text-gray-900">
                ${shippingCost.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between text-sm font-medium pt-2 border-t border-gray-200">
              <span className="text-gray-900">Total</span>
              <span className="text-gray-900">${total.toFixed(2)}</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8"
        >
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-center gap-3 mb-3">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${theme.primaryColor}20` }}
              >
                <CreditCard
                  className="w-4 h-4"
                  style={{ color: theme.primaryColor }}
                />
              </div>
              <span className="text-sm font-medium text-gray-900">
                Payment Method
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-10 h-6 bg-gradient-to-r from-blue-600 to-blue-800 rounded flex items-center justify-center">
                <span className="text-white text-[8px] font-bold">VISA</span>
              </div>
              <span className="text-sm text-gray-600">
                &bull;&bull;&bull;&bull; 4242
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-2">Paid with Stripe</p>
          </div>

          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                <Truck className="w-4 h-4 text-emerald-600" />
              </div>
              <span className="text-sm font-medium text-gray-900">
                Estimated Delivery
              </span>
            </div>
            <p className="text-sm text-gray-900 font-medium">
              {orderDetails.estimatedDelivery}
            </p>
            <p className="text-xs text-gray-500 mt-2">Same-day delivery</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="bg-gray-50 rounded-xl p-6 mb-8"
        >
          <h3 className="text-sm font-medium text-gray-900 mb-4">
            Order Status
          </h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Order Placed
                </p>
                <p className="text-xs text-gray-500">Just now</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                <Package className="w-3 h-3 text-gray-400" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Being Prepared</p>
                <p className="text-xs text-gray-400">Pending</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                <Truck className="w-3 h-3 text-gray-400" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Out for Delivery</p>
                <p className="text-xs text-gray-400">Pending</p>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="text-center">
          <a
            href="/"
            className="inline-block text-white px-6 py-3 rounded-sm text-sm font-medium"
            style={{ backgroundColor: theme.primaryColor }}
          >
            Continue Shopping
          </a>
        </div>
      </main>
    </div>
  );
}
