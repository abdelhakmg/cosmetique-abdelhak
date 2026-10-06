import React from 'react';
import { ShoppingBag, Search, Sparkles, PhoneCall, Gift, ShieldCheck, Truck } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export default function Navbar() {
  const { 
    cart = [], 
    searchQuery, 
    setSearchQuery, 
    selectedCategory, 
    setSelectedCategory, 
    categories = [],
    setIsCartOpen 
  } = useStore();

  const totalItems = cart ? cart.reduce((sum, item) => sum + item.quantity, 0) : 0;

  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm border-b border-gray-100">
      {/* الشريط العلوي */}
      <div className="bg-rose-600 text-white text-xs py-2 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 font-medium">
              <Truck className="w-4 h-4" /> توصيل سريع لـ 58 ولاية
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <ShieldCheck className="w-4 h-4" /> منتجات أصلية 100%
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <Gift className="w-4 h-4" /> هدايا مع كل طلبية كبيرة
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a href="tel:0600000000" className="flex items-center gap-1 font-bold hover:underline">
              <PhoneCall className="w-3.5 h-3.5" /> اتصل بنا: 0600000000
            </a>
          </div>
        </div>
      </div>

      {/* الشريط الرئيسي */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between gap-4 md:gap-8">
          
          {/* الشعار */}
          <div 
            className="flex items-center gap-3 cursor-pointer group shrink-0" 
            onClick={() => setSelectedCategory && setSelectedCategory('all')}
          >
            <div className="bg-gradient-to-tr from-rose-600 to-pink-500 text-white p-2.5 rounded-2xl shadow-md shadow-rose-200 group-hover:scale-105 transition-transform duration-300">
              <Sparkles className="w-7 h-7" />
            </div>
            <div>
              <span className="text-2xl font-black bg-gradient-to-r from-rose-600 via-pink-600 to-rose-500 bg-clip-text text-transparent tracking-tight">
                Cosmetique Abdelhak
              </span>
              <p className="text-xs text-gray-500 font-medium tracking-wide">عالم الفخامة والعناية بالجمال</p>
            </div>
          </div>

          {/* حقل البحث */}
          <div className="flex-1 max-w-xl hidden md:block">
            <div className="relative">
              <input
                type="text"
                placeholder="ابحثي عن منتجات العناية، المكياج، أو العطور..."
                value={searchQuery || ''}
                onChange={(e) => setSearchQuery && setSearchQuery(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-3 pr-11 pl-4 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-rose-400 focus:ring-4 focus:ring-rose-50 transition duration-200"
              />
              <Search className="w-5 h-5 text-gray-400 absolute right-4 top-3.5" />
            </div>
          </div>

          {/* زر السلة */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsCartOpen && setIsCartOpen(true)}
              className="relative bg-rose-50 hover:bg-rose-100 text-rose-600 px-4 py-2.5 rounded-2xl transition duration-200 flex items-center gap-2.5 font-bold text-sm border border-rose-100 active:scale-95"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2.5 bg-rose-600 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-black animate-pulse border-2 border-white">
                    {totalItems}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline">السلة</span>
            </button>
          </div>
        </div>

        {/* البحث للهاتف */}
        <div className="mt-3 md:hidden">
          <div className="relative">
            <input
              type="text"
              placeholder="ابحث عن منتج..."
              value={searchQuery || ''}
              onChange={(e) => setSearchQuery && setSearchQuery(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 pr-10 pl-4 text-sm text-gray-800 focus:outline-none focus:border-rose-400"
            />
            <Search className="w-4 h-4 text-gray-400 absolute right-3.5 top-3" />
          </div>
        </div>
      </div>

      {/* شريط التصنيفات (تم حماية وتعديل طباعة الكائنات هنا) */}
      {categories && categories.length > 0 && (
        <div className="bg-gray-50/80 border-t border-gray-100 py-2.5 px-4 overflow-x-auto scrollbar-none">
          <div className="max-w-7xl mx-auto flex items-center gap-2 min-w-max">
            {categories.map((cat, index) => {
              // معالجة إذا كان التصنيف أوبجكت أو نص عادي
              const catId = typeof cat === 'object' ? (cat.id || index) : cat;
              const catName = typeof cat === 'object' ? (cat.name || '') : cat;
              const isSelected = selectedCategory === catId || selectedCategory === catName;

              return (
                <button
                  key={catId || index}
                  onClick={() => setSelectedCategory && setSelectedCategory(catId)}
                  className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                    isSelected
                      ? 'bg-rose-600 text-white shadow-sm shadow-rose-200'
                      : 'bg-white text-gray-600 hover:bg-rose-50 hover:text-rose-600 border border-gray-200/60'
                  }`}
                >
                  {catName}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
