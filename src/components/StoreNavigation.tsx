import { Menu } from "lucide-react";
import { storeConfig } from "../lib/constants";

export default function StoreNavigation() {
  const { navItems, theme } = storeConfig;

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center overflow-x-auto scrollbar-hide">
          <button className="p-3 hover:bg-gray-100 shrink-0 touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center">
            <Menu size={20} />
          </button>

          <div className="flex items-center gap-1">
            {navItems.map((item, idx) => (
              <a
                key={idx}
                href={item.href}
                className={`whitespace-nowrap px-2 py-3 text-sm hover:underline shrink-0 touch-manipulation min-h-[44px] flex items-center ${
                  item.sale ? "font-semibold" : "text-gray-800"
                }`}
                style={item.sale ? { color: theme.primaryColor } : undefined}
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
