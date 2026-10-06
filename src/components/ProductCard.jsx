import React from 'react';
import { ShoppingCart, Star } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export default function ProductCard({ product }) {
  const { addToCart } = useStore();

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border border-gray-100 flex flex-col justify-between">
      {/* صورة المنتج */}
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
        />
        {product.category && (
          <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-xs font-medium px-2.5 py-1 rounded-full text-pink-600 border border-pink-100">
            {product.category}
          </span>
        )}
      </div>

      {/* تفاصيل المنتج */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-semibold text-gray-800 text-lg line-clamp-1 mb-1">
            {product.name}
          </h3>
          <p className="text-gray-500 text-xs line-clamp-2 mb-3">
            {product.description}
          </p>
        </div>

        <div>
          {/* التقييم والسعر */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-xl font-bold text-gray-900">
              {product.price} <span className="text-sm font-normal text-pink-600">د.ج</span>
            </span>
            <div className="flex items-center gap-1 text-amber-500 text-sm">
              <Star className="w-4 h-4 fill-amber-500" />
              <span>{product.rating || '4.8'}</span>
            </div>
          </div>

          {/* زر الإضافة للسلة */}
          <button
            onClick={() => addToCart(product)}
            className="w-full bg-pink-600 hover:bg-pink-700 text-white py-2.5 px-4 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors active:scale-95"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>إضافة للسلة</span>
          </button>
        </div>
      </div>
    </div>
  );
}
