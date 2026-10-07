import React from 'react';
import { useStore } from '../context/StoreContext';
import { ShoppingBag, ArrowLeft, Star, Tag } from 'lucide-react';

export default function ProductCard({ product, onSelectProduct }) {
  const { addToCart } = useStore();

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition overflow-hidden flex flex-col justify-between group">
      
      {/* صورة المنتج */}
      <div className="relative aspect-square overflow-hidden bg-gray-50 cursor-pointer" onClick={() => onSelectProduct(product)}>
        <img 
          src={product.images?.[0] || product.image} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
        />

        {product.category && (
          <span className="absolute top-2 right-2 bg-white/90 backdrop-blur-md text-gray-700 font-bold text-[10px] px-2.5 py-1 rounded-full shadow-sm">
            {product.category}
          </span>
        )}

        {/* شارة التخفيض فقط إذا وُجد سعر سابق */}
        {product.originalPrice && product.originalPrice > product.price && (
          <span className="absolute top-2 left-2 bg-rose-600 text-white font-black text-[10px] px-2 py-0.5 rounded-full flex items-center gap-0.5 shadow-sm">
            <Tag className="w-3 h-3" />
            خصم {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
          </span>
        )}
      </div>

      {/* المحتوى والتفاصيل */}
      <div className="p-3.5 flex-1 flex flex-col justify-between text-right">
        <div>
          <h3 className="font-bold text-xs text-gray-900 line-clamp-1 cursor-pointer hover:text-rose-600" onClick={() => onSelectProduct(product)}>
            {product.name}
          </h3>
          <p className="text-[11px] text-gray-400 line-clamp-1 mt-0.5">{product.description}</p>
        </div>

        <div className="mt-3">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-1">
              <span className="text-[11px] font-bold text-amber-500">{product.rating || 4.9}</span>
              <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
            </div>

            <div className="flex items-baseline gap-1.5">
              {/* إظهار السعر السابق فقط في حالة إدخاله */}
              {product.originalPrice && (
                <span className="text-[10px] text-gray-400 line-through font-bold">
                  {product.originalPrice} د.ج
                </span>
              )}
              <span className="text-sm font-black text-rose-600">
                {product.price} د.ج
              </span>
            </div>
          </div>

          {/* زرين الشراء: اطلبي الآن + السلة */}
          <div className="grid grid-cols-2 gap-1.5 text-xs font-bold">
            <button
              onClick={() => onSelectProduct(product)}
              className="bg-rose-600 hover:bg-rose-700 text-white py-2 rounded-xl transition flex items-center justify-center gap-1 shadow-sm shadow-rose-100"
            >
              <span>اطلبي الآن</span>
              <ArrowLeft className="w-3 h-3" />
            </button>

            <button
              onClick={() => {
                addToCart(product);
                alert('تمت إضافة المنتج للسلة بنجاح! 🛒');
              }}
              className="bg-rose-50 hover:bg-rose-100 text-rose-600 py-2 rounded-xl transition flex items-center justify-center gap-1"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>السلة</span>
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
