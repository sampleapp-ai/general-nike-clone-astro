import { useState, useEffect } from "react";
import { storeConfig } from "../lib/constants";

export default function HeroBanner() {
  const { heroSlides, theme } = storeConfig;
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    if (heroSlides.length <= 1) return;
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [heroSlides.length]);

  const slide = heroSlides[activeSlide];
  if (!slide) return null;

  return (
    <section className="relative overflow-hidden">
      <div
        className="min-h-[300px] md:min-h-[400px] flex items-center transition-colors duration-700"
        style={{ background: slide.bgGradient || theme.heroGradient }}
      >
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center gap-8 py-8">
          <div className="flex-1 text-center md:text-left">
            {slide.title && (
              <p className="text-xs uppercase tracking-wider text-white/70 mb-2">
                {slide.title}
              </p>
            )}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              {slide.heading}
            </h2>
            <p className="text-lg text-white/80 mb-6 max-w-md">
              {slide.subtitle}
            </p>
            <button
              className="px-6 py-3 rounded-sm text-sm font-semibold transition-colors"
              style={{
                backgroundColor: "white",
                color: theme.primaryColor,
              }}
            >
              {slide.cta}
            </button>
          </div>
          {slide.image && (
            <div className="flex-1 flex justify-center">
              <img
                src={slide.image}
                alt={slide.heading}
                className="max-h-[250px] md:max-h-[300px] object-contain rounded-lg shadow-lg"
              />
            </div>
          )}
        </div>
      </div>

      {heroSlides.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {heroSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveSlide(idx)}
              className={`w-2 h-2 rounded-full transition-all ${
                idx === activeSlide ? "bg-white w-6" : "bg-white/40"
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
