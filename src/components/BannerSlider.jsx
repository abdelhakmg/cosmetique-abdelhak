import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { ChevronRight, ChevronLeft, Sparkles } from 'lucide-react';
import { db } from '../firebase';
import { doc, onSnapshot } from 'firebase/firestore';

const DEFAULT_BANNER = {
  id: 'def',
  title: 'أفضل تخفيضات الموسم على منتجات التجميل !',
  subtitle: 'استفيدي من خصومات تصل حتى 35% مع توصيل سريع لجميع 58 ولاية جزائرية.',
  badge: 'عرض خاص ومحدود 🔥',
  image: 'https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&q=80&w=1200'
};

export default function BannerSlider() {
  const { banners: contextBanners } = useStore();
  const [firestoreBanners, setFirestoreBanners] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // الاستماع المباشر للتغييرات في Firebase
  useEffect(() => {
    const unsub = onSnapshot(doc(db, "settings", "banners"), (docSnap) => {
      if (docSnap.exists() && docSnap.data().items) {
        setFirestoreBanners(docSnap.data().items);
      }
    });

    return () => unsub();
  }, []);

  // تحديد البانرات المعروضة: نفضل Firebase أولاً ثم Context ثم الافتراضي
  const rawBanners = firestoreBanners || contextBanners;
  const activeBanners = rawBanners && rawBanners.length > 0 ? rawBanners : [DEFAULT_BANNER];

  useEffect(() => {
    if (activeBanners.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % activeBanners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [activeBanners]);

  const currentBanner = activeBanners[currentIndex] || DEFAULT_BANNER;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-rose-600 to-pink-600 text-white min-h-[280px] md:min-h-[340px] flex items-center shadow-lg border border-rose-200">
        
        {/* الصورة الإشهارية والخلفية */}
        <div className="absolute inset-0 z-0">
          <img
            src={currentBanner.image}
            alt={currentBanner.title}
            className="w-full h-full object-cover opacity-30 transition-all duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-rose-950/80 via-rose-900/40 to-transparent" />
        </div>

        {/* النصوص والأزرار الإشهارية */}
        <div className="relative z-10 p-6 md:p-12 max-w-2xl text-right">
          {currentBanner.badge && (
            <span className="inline-flex items-center gap-1 bg-yellow-400 text-rose-950 font-black text-xs px-3.5 py-1.5 rounded-full mb-3 shadow-md">
              <Sparkles className="w-3.5 h-3.5" /> {currentBanner.badge}
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
            className="inline-block bg-white text-rose-600 hover:bg-rose-50 font-black px-6 py-3 rounded-2xl shadow-md transition duration-200 text-sm active:scale-95"
          >
            تصفحي العروض الآن 🛒
          </a>
        </div>

        {/* أسهم ومؤشرات التنقل */}
        {activeBanners.length > 1 && (
          <>
            <button
              onClick={() => setCurrentIndex((prev) => (prev - 1 + activeBanners.length) % activeBanners.length)}
              className="absolute right-4 z-20 bg-white/20 hover:bg-white/40 p-2 rounded-full text-white backdrop-blur-md"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
            <button
              onClick={() => setCurrentIndex((prev) => (prev + 1) % activeBanners.length)}
              className="absolute left-4 z-20 bg-white/20 hover:bg-white/40 p-2 rounded-full text-white backdrop-blur-md"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          </>
        )}
      </div>
    </section>
  );
}
