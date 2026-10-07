import React from 'react';
import { ShoppingBag, Star } from 'lucide-react';

export default function ProductCard({ product, onSelect }) {
  const mainImg = product.images?.[0] || product.image || 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=600';

  return (
    <div
      onClick={() => onSelect && onSelect(product)}
      className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition duration-300 flex flex-col justify-between h-full group cursor-pointer"
    >
      <div className="relative h-56 overflow-hidden bg-gray-50">
        <img
          src={mainImg}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=600';
          }}
        />
        {product.category && (
          <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-bold px-2.5 py-1 rounded-full shadow-sm">
            {product.category}
          </span>
        )}
      </div>

      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-bold text-gray-800 text-sm mb-1 group-hover:text-rose-600 transition line-clamp-1">
            {product.name}
          </h3>
          <p className="text-xs text-gray-500 line-clamp-2 mb-3">{product.description}</p>
        </div>

        <div>
          <div className="flex items-center justify-between mb-3">
            <div>
              <span className="text-lg font-black text-gray-900">{product.price}</span>
              <span className="text-xs font-bold text-rose-600 mr-1"> د.ج</span>
            </div>
            <div className="flex items-center gap-1 text-amber-400 text-xs font-bold">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span>{product.rating || '4.9'}</span>
            </div>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              if (onSelect) onSelect(product);
            }}
            className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-2.5 rounded-2xl transition duration-200 flex items-center justify-center gap-2 text-xs active:scale-95 shadow-sm shadow-rose-200"
          >
            <ShoppingBag className="w-4 h-4" /> اطلبي الآن
          </button>
        </div>
      </div>
    </div>
  );
}
