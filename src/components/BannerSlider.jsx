import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { ChevronRight, ChevronLeft } from 'lucide-react';

export default function BannerSlider() {
  const { banners } = useStore();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!banners || banners.length === 0) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [banners]);

  if (!banners || banners.length === 0) return null;

  const currentBanner = banners[currentIndex];

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % banners.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2">
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-rose-500 to-pink-600 text-white min-h-[280px] md:min-h-[340px] flex items-center shadow-lg">
        
        {/* الخلفية والصورة الإشهارية */}
        <div className="absolute inset-0 z-0">
          <img
            src={currentBanner.image}
            alt={currentBanner.title}
            className="w-full h-full object-cover opacity-35 transition-all duration-700 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-rose-900/80 via-rose-900/40 to-transparent" />
        </div>

        {/* النصوص والأزرار الإشهارية */}
        <div className="relative z-10 p-6 md:p-12 max-w-xl text-right">
          {currentBanner.badge && (
            <span className="inline-block bg-yellow-400 text-rose-950 font-black text-xs px-3.5 py-1.5 rounded-full mb-3 shadow-md">
              {currentBanner.badge}
            </span>
          )}
          <h2 className="text-2xl md:text-4xl font-black mb-3 leading-tight drop-shadow-sm">
            {currentBanner.title}
          </h2>
          <p className="text-sm md:text-base text-rose-100 font-medium mb-6 leading-relaxed">
            {currentBanner.subtitle}
          </p>
          <a
            href="#products"
            className="inline-block bg-white text-rose-600 hover:bg-rose-50 font-black px-6 py-3 rounded-2xl shadow-md transition duration-200 active:scale-95 text-sm"
          >
            لا تفوّت الفرصة ! 🛒
          </a>
        </div>

        {/* أزرار التنقل بين الصور */}
        {banners.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute right-4 z-20 bg-white/20 hover:bg-white/40 backdrop-blur-md p-2 rounded-full text-white transition"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute left-4 z-20 bg-white/20 hover:bg-white/40 backdrop-blur-md p-2 rounded-full text-white transition"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* مؤشر النقاط بالأسفل */}
            <div className="absolute bottom-4 right-1/2 translate-x-1/2 z-20 flex gap-2">
              {banners.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    idx === currentIndex ? 'w-8 bg-yellow-400' : 'w-2.5 bg-white/50'
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
