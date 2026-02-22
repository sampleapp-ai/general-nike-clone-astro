import { Facebook, Instagram, Twitter } from "lucide-react";
import { storeConfig } from "../lib/constants";

export default function StoreFooter() {
  const { brandName, theme } = storeConfig;

  const footerLinks: Record<string, string[]> = {
    "Customer Service": [
      "Help Center",
      "Order Lookup",
      "Returns & Exchanges",
      "Shipping Info",
      "Contact Us",
    ],
    [`About ${brandName}`]: [
      "Our Story",
      "Careers",
      "Press",
      "Sustainability",
    ],
    "Quick Links": [
      "Gift Cards",
      "Store Locator",
      "Rewards Program",
      "Mobile App",
    ],
  };

  return (
    <footer style={{ backgroundColor: theme.footerBg, color: theme.footerText }}>
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-semibold text-sm mb-4">{title}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-xs opacity-60 hover:opacity-100 transition-opacity"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="font-semibold text-sm mb-4">Stay Connected</h4>
            <p className="text-xs opacity-60 mb-4">
              Sign up for exclusive deals and updates from {brandName}.
            </p>
            <button
              className="w-full border px-4 py-2 text-sm transition-colors mb-4"
              style={{ borderColor: theme.footerText }}
            >
              Sign Up
            </button>
            <div className="flex items-center gap-3 mt-4">
              {[Facebook, Instagram, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-8 h-8 rounded-full flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity"
                  style={{ backgroundColor: `${theme.footerText}20` }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t" style={{ borderColor: `${theme.footerText}15` }}>
        <div className="max-w-7xl mx-auto px-4 py-4">
          <p className="text-center text-xs opacity-50">
            &copy; 2026 {brandName}. All rights reserved. This is a demo
            storefront.
          </p>
        </div>
      </div>
    </footer>
  );
}
