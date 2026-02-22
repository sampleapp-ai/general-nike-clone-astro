import { useState, useEffect } from "react";
import { storeConfig } from "../lib/constants";

export default function TopBar() {
  const { deals, brandName, theme } = storeConfig;
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (deals.length <= 1) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % deals.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [deals.length]);

  return (
    <div
      className="text-xs py-2 overflow-hidden"
      style={{ backgroundColor: theme.topBarBg, color: theme.topBarText }}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-center gap-2">
          <span className="font-bold mr-2 hidden md:inline shrink-0">
            {brandName.toUpperCase()} DEALS
          </span>

          <div className="hidden xl:flex items-center gap-4 overflow-x-auto">
            {deals.map((deal, idx) => (
              <div key={idx} className="flex items-center shrink-0">
                <span
                  className="font-semibold"
                  style={{ color: theme.topBarHighlight }}
                >
                  {deal.highlight}
                </span>
                <span className="ml-1 opacity-70">{deal.text}</span>
                {idx < deals.length - 1 && (
                  <span className="mx-3 opacity-30">|</span>
                )}
              </div>
            ))}
          </div>

          <div className="xl:hidden flex items-center justify-center">
            <span
              className="font-semibold"
              style={{ color: theme.topBarHighlight }}
            >
              {deals[activeIndex]?.highlight}
            </span>
            <span className="ml-1 opacity-70">
              {deals[activeIndex]?.text}
            </span>
          </div>

          <button className="ml-4 opacity-60 hover:opacity-100 text-xs hidden md:inline shrink-0">
            See All
          </button>
        </div>
      </div>
    </div>
  );
}
