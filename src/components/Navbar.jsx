import React from 'react';
import { useStore } from '../context/StoreContext';
import { ShoppingBag, Search, Sparkles, Phone, ShieldCheck } from 'lucide-react';

export default function Navbar({ onOpenCart }) {
  const { settings, searchQuery, setSearchQuery } = useStore();

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-rose-100 shadow-sm font-sans">
      {/* الشريط الإشهاري العلوي يقرأ النص والسمات من الداشبورد تلقائياً */}
      <div className="bg-rose-600 text-white text-xs py-2 px-4 text-center font-bold flex items-center justify-between max-w-7xl mx-auto">
        <div className="hidden sm:flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-yellow-300" />
          <span>ضمان الجودة والدفع عند الاستلام</span>
        </div>
        <div className="mx-auto sm:mx-0 flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-yellow-300 animate-pulse" />
          <span>{settings.topAnnouncement || 'توصيل سريع لـ 58 ولاية'}</span>
        </div>
        <div className="hidden md:flex items-center gap-1">
          <Phone className="w-3.5 h-3.5" />
          <span>{settings.phone}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between gap-4">
          
          {/* اسم وماركة المتجر يقرأ من الداشبورد */}
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="bg-gradient-to-tr from-rose-600 to-pink-500 text-white p-2.5 rounded-2xl shadow-md shadow-rose-200">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xl md:text-2xl font-black text-gray-900 tracking-tight block">
                {settings.storeName || 'Cosmetique Abdelhak'}
              </span>
              <span className="text-[10px] text-gray-400 font-bold tracking-widest block -mt-1">
                BEAUTY & CARE STORE
              </span>
            </div>
          </div>

          {/* حقل البحث الذكي */}
          <div className="hidden md:flex flex-1 max-w-md relative">
            <input
              type="text"
              placeholder="ابحثي عن منتجك المفضّل..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-2xl pl-4 pr-10 py-2.5 text-sm focus:outline-none focus:border-rose-500 focus:bg-white transition"
            />
            <Search className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" />
          </div>

          {/* زر السلة */}
          <button
            onClick={onOpenCart}
            className="bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold px-4 py-2.5 rounded-2xl flex items-center gap-2 transition active:scale-95 border border-rose-100"
          >
            <ShoppingBag className="w-5 h-5" />
            <span className="text-sm hidden sm:inline">سلة التسوق</span>
          </button>
        </div>
      </div>
    </header>
  );
}
