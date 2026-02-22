import { Search, ShoppingBag, Menu, X, User } from "lucide-react";
import { useState } from "react";
import { useStore } from "@nanostores/react";
import { $cartCount } from "../stores/cart";
import { storeConfig } from "../lib/constants";

export default function StoreHeader({
  isCartDisabled = false,
}: {
  isCartDisabled?: boolean;
}) {
  const itemCount = useStore($cartCount);
  const { brandName, theme } = storeConfig;
  const [searchValue, setSearchValue] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header
      className="border-b border-gray-100"
      style={{ backgroundColor: theme.headerBg, color: theme.headerText }}
    >
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <button
            className="lg:hidden p-2 touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <a href="/" className="flex items-center gap-2 shrink-0">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm"
              style={{ backgroundColor: theme.primaryColor }}
            >
              {brandName.charAt(0)}
            </div>
            <span
              className="text-xl font-semibold tracking-tight"
              style={{ color: theme.headerText }}
            >
              {brandName}
            </span>
          </a>

          <div className="hidden lg:flex flex-1 max-w-xl mx-4">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder={`Search ${brandName}...`}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-sm focus:border-gray-400 focus:ring-0 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex items-center gap-1 sm:gap-2 md:gap-4 shrink-0">
            <div className="hidden lg:flex items-center gap-2 border border-gray-300 rounded px-3 py-1.5">
              <span className="text-xs text-gray-600 whitespace-nowrap">
                Shop more
                <br />
                at {brandName}
              </span>
              <button
                className="text-white text-xs px-4 py-1 h-7 rounded-sm touch-manipulation"
                style={{ backgroundColor: theme.primaryColor }}
              >
                Sign In
              </button>
            </div>

            <button className="lg:hidden p-2 touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center">
              <User size={22} className="text-gray-700" />
            </button>

            <a
              href="/cart"
              className={`relative p-2 touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center${isCartDisabled ? " pointer-events-none opacity-50" : ""}`}
            >
              <ShoppingBag size={22} />
              {itemCount > 0 && (
                <span
                  className="absolute -top-0.5 -right-0.5 text-white text-[10px] min-w-[16px] h-4 rounded-full flex items-center justify-center px-1"
                  style={{ backgroundColor: theme.primaryColor }}
                >
                  {itemCount}
                </span>
              )}
            </a>
          </div>
        </div>

        <div className="lg:hidden mt-3">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder={`Search ${brandName}...`}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-sm focus:outline-none"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
