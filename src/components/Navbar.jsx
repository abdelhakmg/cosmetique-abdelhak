import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ShoppingBag, Menu, X, PhoneCall, Sparkles, ShieldCheck } from 'lucide-react';

export default function Navbar({ onOpenAdmin, onOpenCart }) {
  const { cart, categories, settings } = useStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [logoClicks, setLogoClicks] = useState(0);

  // حساب إجمالي عدد القطع في السلة
  const cartItemsCount = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);

  // فتح لوحة التحكم بعد 3 ضغطات متتالية على اللوجو
  const handleLogoClick = () => {
    const newClicks = logoClicks + 1;
    if (newClicks === 3) {
      onOpenAdmin();
      setLogoClicks(0);
    } else {
      setLogoClicks(newClicks);
      setTimeout(() => setLogoClicks(0), 1500);
    }
  };

  return (
    <>
      {/* شريط الإشعارات العلوي */}
      <div className="bg-rose-600 text-white text-[11px] font-bold py-1.5 px-4 text-center flex items-center justify-center gap-2 shadow-inner">
        <Sparkles className="w-3.5 h-3.5 animate-pulse" />
        <span>{settings.topAnnouncement || 'توصيل سريع لجميع 58 ولاية - الدفع يداً بيد عند الاستلام'}</span>
      </div>

      <header className="bg-white border-b border-gray-100 sticky top-0 z-40 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          
          {/* الجانب الأيمن: زر القائمة الجانبية + سلة التسوق مع العداد */}
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setIsMenuOpen(true)}
              className="p-2 rounded-xl text-gray-700 hover:bg-rose-50 hover:text-rose-600 transition"
              aria-label="القائمة الجانبية"
            >
              <Menu className="w-6 h-6" />
            </button>

            <button 
              onClick={onOpenCart}
              className="relative p-2 rounded-xl text-gray-700 hover:bg-rose-50 hover:text-rose-600 transition"
            >
              <ShoppingBag className="w-6 h-6" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-600 text-white font-black text-[10px] w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-bounce">
                  {cartItemsCount}
                </span>
              )}
            </button>
          </div>

          {/* المنتصف: اللوجو (اضغط 3 مرات لفتح اللوحة) */}
          <div 
            onClick={handleLogoClick} 
            className="cursor-pointer select-none text-center"
            title="Cosmetique Abdelhak"
          >
            {settings.logoUrl ? (
              <img src={settings.logoUrl} alt={settings.storeName} className="h-10 object-contain mx-auto" />
            ) : (
              <div>
                <h1 className="text-lg md:text-xl font-black text-gray-900 tracking-tight flex items-center gap-1">
                  {settings.storeName || 'Cosmetique Abdelhak'}
                  <Sparkles className="w-4 h-4 text-rose-500 fill-rose-500" />
                </h1>
                <p className="text-[9px] text-gray-400 font-medium">عالم الفخامة والعناية بالجمال</p>
              </div>
            )}
          </div>

          {/* الجانب الأيسر: اتصل بنا */}
          <a 
            href={`tel:${settings.phone || '0550875580'}`}
            className="hidden sm:flex items-center gap-1.5 bg-rose-50 text-rose-600 text-xs font-bold px-3 py-2 rounded-xl hover:bg-rose-100 transition"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>اتصل بنا</span>
          </a>
        </div>
      </header>

      {/* القائمة الجانبية للزبون (Drawer) */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)} />
          <div className="relative w-4/5 max-w-xs bg-white h-full shadow-2xl flex flex-col justify-between p-6 z-10 text-right font-sans">
            <div>
              <div className="flex items-center justify-between border-b pb-4 mb-4">
                <h2 className="font-bold text-gray-900 text-sm">القائمة الرئيسية</h2>
                <button onClick={() => setIsMenuOpen(false)} className="p-1.5 rounded-lg bg-gray-100 text-gray-500">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-2 text-xs font-bold text-gray-700">
                <a href="#products-section" onClick={() => setIsMenuOpen(false)} className="block p-3 rounded-xl hover:bg-rose-50 hover:text-rose-600">
                  تصفح جميع المنتجات
                </a>
                <a href="#gift-section" onClick={() => setIsMenuOpen(false)} className="block p-3 rounded-xl hover:bg-rose-50 hover:text-rose-600 flex items-center justify-between">
                  <span>صممي هديتك بنفسك 🎁</span>
                  <span className="text-[10px] bg-rose-100 text-rose-600 px-2 py-0.5 rounded-full">حصري</span>
                </a>

                <div className="pt-4 border-t">
                  <span className="text-[10px] text-gray-400 font-bold block mb-2">الأقسام والفئات</span>
                  {categories.map((c) => (
                    <a 
                      key={c.id} 
                      href="#products-section" 
                      onClick={() => setIsMenuOpen(false)}
                      className="block p-2.5 rounded-xl hover:bg-gray-50 text-gray-600"
                    >
                      • {c.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="border-t pt-4 text-xs space-y-2 text-gray-500">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>التوصيل والمعاينة لـ 58 ولاية</span>
              </div>
              <p className="text-[10px] text-gray-400">جميع الحقوق محفوظة © Cosmetique Abdelhak</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
