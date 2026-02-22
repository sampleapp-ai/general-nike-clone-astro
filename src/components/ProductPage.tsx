import { useState } from "react";
import { storeConfig } from "../lib/constants";
import { addToCart } from "../stores/cart";
import { Star, Leaf, Clock, Minus, Plus } from "lucide-react";

export default function ProductPage() {
  const { featuredProduct, products, theme } = storeConfig;
  const [quantity, setQuantity] = useState(1);

  const otherProducts = products.filter((p) => p.id !== featuredProduct.id);

  const handleAddToCart = () => {
    addToCart({
      id: featuredProduct.id,
      name: featuredProduct.name,
      subtitle: featuredProduct.category,
      price: featuredProduct.price,
      size: "default",
      quantity,
      color: "",
      image: featuredProduct.image,
      arrivalDate: "Today, 4:00 - 5:00 PM",
    });
    window.location.href = "/cart";
  };

  return (
    <div className="bg-white">
      <main className="max-w-7xl mx-auto px-4 py-4 overflow-x-hidden">
        <nav className="flex items-center gap-2 text-xs text-gray-500 mb-4">
          <a href="/" className="hover:underline">
            Home
          </a>
          <span>/</span>
          <a href="#" className="hover:underline">
            {featuredProduct.category}
          </a>
          <span>/</span>
          <span className="text-gray-700">{featuredProduct.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="relative">
            <div className="aspect-square bg-gray-50 rounded-lg overflow-hidden relative">
              <img
                src={featuredProduct.image}
                alt={featuredProduct.name}
                className="w-full h-full object-cover"
              />
              {featuredProduct.discount && (
                <span
                  className="absolute top-4 left-4 text-white text-xs px-3 py-1 rounded-full font-medium"
                  style={{ backgroundColor: theme.primaryColor }}
                >
                  {featuredProduct.discount}
                </span>
              )}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-2">
              <Leaf size={16} style={{ color: theme.primaryColor }} />
              <span
                className="text-xs font-medium"
                style={{ color: theme.primaryColor }}
              >
                Fresh Daily
              </span>
            </div>

            <h1 className="text-xl font-semibold text-gray-900 mb-1">
              {featuredProduct.name}
            </h1>
            <p className="text-sm text-gray-500 mb-3">
              {featuredProduct.brand} &middot; {featuredProduct.category}
            </p>

            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    size={16}
                    className={
                      i <= 4
                        ? "fill-yellow-400 text-yellow-400"
                        : "fill-gray-300 text-gray-300"
                    }
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">4.7</span>
              <a href="#" className="text-sm text-gray-600 underline">
                (89 reviews)
              </a>
            </div>

            <div className="flex items-center gap-2 mb-6">
              <span className="text-2xl font-semibold text-gray-900">
                ${featuredProduct.price.toFixed(2)}
              </span>
              {featuredProduct.originalPrice && (
                <>
                  <span
                    className="text-sm font-medium"
                    style={{ color: theme.primaryColor }}
                  >
                    ({featuredProduct.discount})
                  </span>
                  <span className="text-sm text-gray-400 line-through">
                    ${featuredProduct.originalPrice.toFixed(2)}
                  </span>
                </>
              )}
            </div>

            <div className="mb-6">
              <span className="text-sm text-gray-700 mb-3 block">
                Quantity:
              </span>
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-gray-300 rounded">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 touch-manipulation"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="w-10 text-center text-sm">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 touch-manipulation"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              className="w-full text-white py-3 mb-3 text-sm font-medium transition-colors touch-manipulation rounded-sm"
              style={{ backgroundColor: theme.primaryColor }}
            >
              Add to Cart
            </button>

            <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
              <Clock size={14} />
              <span>Delivery available today</span>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-3">
                About this product
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {featuredProduct.description}
              </p>
            </div>

            <div className="border-t border-gray-200 pt-6 mt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-3">
                Product Details
              </h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>
                  <strong>Made fresh</strong> — Baked in-store daily
                </li>
                <li>
                  <strong>Organic flour</strong> — Sourced from local farms
                </li>
                <li>
                  <strong>48-hour fermentation</strong> — For the perfect
                  tangy flavor
                </li>
              </ul>
            </div>
          </div>
        </div>

        <section className="mb-12">
          <h2 className="text-xl font-medium text-gray-900 mb-4">
            Frequently bought together
          </h2>
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {otherProducts.map((product) => (
              <div
                key={product.id}
                className="min-w-[150px] w-[150px] shrink-0 group"
              >
                <div className="relative aspect-square bg-gray-50 mb-2 rounded-lg overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-xs font-medium text-gray-900">
                  {product.name}
                </p>
                <p className="text-xs text-gray-500">{product.category}</p>
                <span className="text-xs font-medium text-gray-900">
                  ${product.price.toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
