import React from 'react';
import { useStore } from '../context/StoreContext';
import { Sparkles } from 'lucide-react';

export default function CategoryCircles() {
  const { categories, selectedCategory, setSelectedCategory } = useStore();

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base md:text-lg font-black text-gray-900 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-rose-600 fill-rose-600" /> تصفحي حسب الفئات
        </h3>
      </div>

      <div className="flex items-center gap-5 md:gap-7 overflow-x-auto pb-4 pt-1 no-scrollbar justify-start">
        <div
          onClick={() => setSelectedCategory('الكل')}
          className="flex flex-col items-center gap-2 cursor-pointer shrink-0 group"
        >
          <div
            className={`w-20 h-20 md:w-22 md:h-22 rounded-full flex items-center justify-center font-black text-xs md:text-sm border-2 transition duration-300 shadow-sm ${
              selectedCategory === 'الكل'
                ? 'border-rose-600 bg-rose-600 text-white scale-105 shadow-rose-200'
                : 'border-rose-200 bg-rose-50 text-rose-600 group-hover:border-rose-400 group-hover:scale-105'
            }`}
          >
            الكل
          </div>
          <span className="text-xs font-black text-gray-800">جميع المنتجات</span>
        </div>

        {categories && categories.map((cat) => (
          <div
            key={cat.id}
            onClick={() => setSelectedCategory(cat.name)}
            className="flex flex-col items-center gap-2 cursor-pointer shrink-0 group"
          >
            <div
              className={`w-20 h-20 md:w-22 md:h-22 rounded-full overflow-hidden border-2 p-1 bg-white transition duration-300 shadow-sm ${
                selectedCategory === cat.name
                  ? 'border-rose-600 ring-2 ring-rose-300 scale-105 shadow-rose-200'
                  : 'border-gray-200 group-hover:border-rose-400 group-hover:scale-105'
              }`}
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover rounded-full group-hover:scale-110 transition duration-500"
              />
            </div>
            <span
              className={`text-xs font-black transition ${
                selectedCategory === cat.name ? 'text-rose-600' : 'text-gray-800'
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
