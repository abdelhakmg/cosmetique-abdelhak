import React from 'react';
import { ShoppingBag, Truck, ShieldCheck, Sparkles, Gift } from 'lucide-react';

const Hero = () => {
  const scrollToProducts = () => {
    const section = document.getElementById('products-section');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-rose-50/70 via-white to-white py-12 md:py-20 border-b border-rose-100/60">
      {/* Background Decorative Circles */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-rose-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-amber-200/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Main Hero Content */}
          <div className="lg:col-span-7 text-right flex flex-col items-start gap-5">
            
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 bg-rose-100/80 text-rose-700 px-3.5 py-1.5 rounded-full text-xs md:text-sm font-bold shadow-sm">
              <Sparkles className="w-4 h-4 text-rose-500 animate-pulse" />
              <span>وجهتك الأولى للجمال والإكسسوارات الهدايا</span>
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 leading-tight">
              أناقتك وجمالك يبدأ من <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-pink-500">
                Cos Abdelhak
              </span>
            </h1>

            {/* Description */}
            <p className="text-gray-600 text-sm md:text-base leading-relaxed max-w-2xl">
              اكتشفي أرقى منتجات التجميل، العناية بالبشرة، وأجمل الإكسسوارات والهدايا المصممة بعناية لتناسب ذوقك الرفيع. توصيل سريع وموثوق إلى جميع الولايات 58 مع خدمة الدفع عند الاستلام.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2 w-full sm:w-auto">
              <button
                onClick={scrollToProducts}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm md:text-base px-6 py-3.5 rounded-xl shadow-lg hover:shadow-rose-200 active:scale-95 transition-all duration-200"
              >
                <ShoppingBag className="w-5 h-5" />
                <span>تسوقي الآن</span>
              </button>

              <button
                onClick={scrollToProducts}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-white hover:bg-rose-50 text-rose-600 font-bold text-sm md:text-base px-6 py-3.5 rounded-xl border border-rose-200 shadow-sm active:scale-95 transition-all duration-200"
              >
                <Gift className="w-5 h-5 text-rose-500" />
                <span>استكشفي الهدايا</span>
              </button>
            </div>

            {/* Store Highlights / Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 w-full border-t border-rose-100/80 mt-2">
              <div className="flex items-center gap-3 bg-white/80 p-3 rounded-xl border border-rose-50 shadow-xs">
                <div className="p-2 bg-rose-100 text-rose-600 rounded-lg shrink-0">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-800">توصيل لـ 58 ولاية</h4>
                  <p className="text-[11px] text-gray-500">سريع ومضمون للبيت</p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-white/80 p-3 rounded-xl border border-rose-50 shadow-xs">
                <div className="p-2 bg-amber-100 text-amber-600 rounded-lg shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-800">الدفع عند الاستلام</h4>
                  <p className="text-[11px] text-gray-500">افحص طلبك ثم ادفع</p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-white/80 p-3 rounded-xl border border-rose-50 shadow-xs">
                <div className="p-2 bg-pink-100 text-pink-600 rounded-lg shrink-0">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-800">منتجات مضمونة</h4>
                  <p className="text-[11px] text-gray-500">جودة واختيار أصلية</p>
                </div>
              </div>
            </div>

          </div>

          {/* Hero Visual Card / Graphic */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-md aspect-4/5 rounded-3xl bg-gradient-to-tr from-rose-400 via-pink-400 to-amber-300 p-1.5 shadow-2xl rotate-1 hover:rotate-0 transition-transform duration-500">
              <div className="w-full h-full bg-white rounded-[22px] overflow-hidden relative flex flex-col justify-between p-6">
                
                {/* Visual Top Badge */}
                <div className="flex justify-between items-center z-10">
                  <span className="bg-rose-600 text-white font-black text-xs px-3 py-1.5 rounded-full shadow-md">
                    تشكيلة موسم 2026
                  </span>
                  <span className="text-xs font-bold text-gray-400">Cos Abdelhak</span>
                </div>

                {/* Hero Showcase Content */}
                <div className="my-auto text-center py-8">
                  <div className="w-24 h-24 mx-auto mb-4 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center shadow-inner">
                    <Gift className="w-12 h-12" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-1">عروض ومجموعات حصرية</h3>
                  <p className="text-xs text-gray-500">عطور، مستحضرات تجميل، وإكسسوارات فاخرة</p>
                </div>

                {/* Bottom Promo Note */}
                <div className="bg-rose-50 border border-rose-100 rounded-2xl p-3.5 text-center">
                  <p className="text-xs text-rose-700 font-bold">
                    ✨ اطلبي الآن واحصلي على توصيل سريع مع معاينة الطلب عند التسليم
                  </p>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Hero;
