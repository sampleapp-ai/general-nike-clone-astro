import HeroBanner from "./HeroBanner";
import { storeConfig } from "../lib/constants";
import { Plus } from "lucide-react";

export default function HomePage() {
  const { products, categories, theme } = storeConfig;

  return (
    <div className="bg-white">
      <HeroBanner />

      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Popular This Week
          </h2>
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {products.map((product) => (
              <a
                key={product.id}
                href={product.isFeatured ? "/product" : "#"}
                className="min-w-[180px] w-[180px] shrink-0 group cursor-pointer"
              >
                <div className="relative aspect-square bg-gray-50 mb-2 rounded-lg overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <button className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                    <Plus size={16} className="text-gray-500" />
                  </button>
                  {product.discount && (
                    <span
                      className="absolute top-2 left-2 text-white text-[10px] px-2 py-0.5 rounded-full font-medium"
                      style={{ backgroundColor: theme.primaryColor }}
                    >
                      {product.discount}
                    </span>
                  )}
                </div>
                <p className="text-xs font-medium text-gray-900">
                  {product.name}
                </p>
                <p className="text-xs text-gray-500">{product.category}</p>
                <div className="flex items-center gap-1 mt-1">
                  <span className="text-sm font-semibold text-gray-900">
                    ${product.price.toFixed(2)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-xs text-gray-400 line-through">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Shop by Aisle
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <div
                key={cat.name}
                className="relative aspect-square rounded-lg overflow-hidden group cursor-pointer"
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <p className="text-white font-semibold text-lg">
                    {cat.name}
                  </p>
                  <p className="text-white/70 text-xs">Shop now</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div
            className="rounded-lg p-8 md:p-12 text-center text-white"
            style={{ background: theme.heroGradient }}
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-3">
              Fresh Savings Every Week
            </h3>
            <p className="text-white/80 mb-6 max-w-md mx-auto">
              Sign up for Fresh Market rewards and get exclusive deals on
              organic produce, bakery items, and more.
            </p>
            <button
              className="bg-white px-6 py-3 rounded-full text-sm font-semibold transition-colors"
              style={{ color: theme.primaryColor }}
            >
              Join Fresh Rewards
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
