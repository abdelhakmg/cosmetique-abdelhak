import React from 'react';
import { useStore } from '../context/StoreContext';
import { Sparkles } from 'lucide-react';

export default function CategoryCircles() {
  const { categories, selectedCategory, setSelectedCategory } = useStore();

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg md:text-xl font-black text-gray-900 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-rose-600 fill-rose-600" /> تصفحي حسب الفئات المميزة
        </h3>
      </div>

      {/* دوائر الفئات بحجم متوسط وجذاب تلفت الانتباه مباشرة */}
      <div className="flex items-center gap-6 md:gap-8 overflow-x-auto pb-4 pt-2 no-scrollbar justify-start md:justify-center">
        
        {/* زر جميع المنتجات */}
        <div
          onClick={() => setSelectedCategory('الكل')}
          className="flex flex-col items-center gap-2.5 cursor-pointer shrink-0 group"
        >
          <div
            className={`w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center font-black text-sm md:text-base border-4 transition duration-300 shadow-md ${
              selectedCategory === 'الكل'
                ? 'border-rose-600 bg-rose-600 text-white scale-110 shadow-rose-200'
                : 'border-white bg-rose-50 text-rose-600 group-hover:border-rose-300 group-hover:scale-105'
            }`}
          >
            الكل
          </div>
          <span className="text-xs md:text-sm font-black text-gray-800">جميع المنتجات</span>
        </div>

        {/* عرض الفئات الدائرية مع الصور */}
        {categories && categories.map((cat) => (
          <div
            key={cat.id}
            onClick={() => setSelectedCategory(cat.name)}
            className="flex flex-col items-center gap-2.5 cursor-pointer shrink-0 group"
          >
            <div
              className={`w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-4 p-1 bg-white transition duration-300 shadow-md ${
                selectedCategory === cat.name
                  ? 'border-rose-600 ring-4 ring-rose-200 scale-110 shadow-rose-200'
                  : 'border-white group-hover:border-rose-400 group-hover:scale-105'
              }`}
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover rounded-full group-hover:scale-110 transition duration-500"
              />
            </div>
            <span
              className={`text-xs md:text-sm font-black transition ${
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
