import React from 'react';
import { useStore } from '../context/StoreContext';
import { Sparkles } from 'lucide-react';

export default function CategoryCircles() {
  const { categories, selectedCategory, setSelectedCategory } = useStore();

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-black text-gray-900 flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-rose-600" /> تصفحي حسب الفئة
        </h3>
      </div>

      {/* شريط الدوائر السلس */}
      <div className="flex items-center gap-4 overflow-x-auto pb-3 no-scrollbar">
        {/* زر عرض الكل */}
        <div
          onClick={() => setSelectedCategory('الكل')}
          className="flex flex-col items-center gap-2 cursor-pointer shrink-0 group"
        >
          <div
            className={`w-16 h-16 rounded-full flex items-center justify-center font-bold text-xs border-2 transition duration-300 shadow-sm ${
              selectedCategory === 'الكل'
                ? 'border-rose-600 bg-rose-600 text-white scale-105'
                : 'border-rose-200 bg-rose-50 text-rose-600 group-hover:border-rose-400'
            }`}
          >
            الكل
          </div>
          <span className="text-xs font-bold text-gray-700">جميع المنتجات</span>
        </div>

        {/* الفئات الديناميكية */}
        {categories.map((cat) => (
          <div
            key={cat.id}
            onClick={() => setSelectedCategory(cat.name)}
            className="flex flex-col items-center gap-2 cursor-pointer shrink-0 group"
          >
            <div
              className={`w-16 h-16 rounded-full overflow-hidden border-2 p-0.5 transition duration-300 shadow-sm ${
                selectedCategory === cat.name
                  ? 'border-rose-600 ring-2 ring-rose-300 scale-105'
                  : 'border-gray-200 group-hover:border-rose-400'
              }`}
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover rounded-full group-hover:scale-110 transition duration-500"
              />
            </div>
            <span
              className={`text-xs font-bold transition ${
                selectedCategory === cat.name ? 'text-rose-600' : 'text-gray-700'
              }`}
            >
              {cat.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
