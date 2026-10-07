import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Gift, Check, ShoppingBag, Sparkles } from 'lucide-react';

export default function GiftBuilder({ onOrderGift }) {
  const { products } = useStore();
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [boxPrice, setBoxPrice] = useState(800); // سعر علبة الهدية الفاخرة

  const toggleSelect = (product) => {
    if (selectedProducts.find((p) => p.id === product.id)) {
      setSelectedProducts(selectedProducts.filter((p) => p.id !== product.id));
    } else {
      setSelectedProducts([...selectedProducts, product]);
    }
  };

  const productsTotal = selectedProducts.reduce((sum, p) => sum + p.price, 0);
  const grandTotal = productsTotal > 0 ? productsTotal + boxPrice : 0;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 my-6 bg-gradient-to-r from-rose-50 via-pink-50 to-rose-50 rounded-3xl border border-rose-100 shadow-sm">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <span className="inline-flex items-center gap-1.5 bg-rose-600 text-white text-xs font-black px-4 py-1.5 rounded-full mb-3 shadow-md">
          <Gift className="w-4 h-4" /> قسم خاص ومميز
        </span>
        <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-2">🎁 صممي هديتك الخاصة بنفسك</h2>
        <p className="text-xs md:text-sm text-gray-600">
          اكتشفي متعة التخصيص! اختاري المكونات والمنتجات المفضلة لديك وسنقوم بتغليفها في علبة هدايا فاخرة مع بطاقة إهداء مخصصة.
        </p>
      </div>

      {/* قائمة المنتجات القابلة للاختيار */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-8">
        {products.map((p) => {
          const isSelected = selectedProducts.some((item) => item.id === p.id);
          return (
            <div
              key={p.id}
              onClick={() => toggleSelect(p)}
              className={`bg-white rounded-2xl p-3 border cursor-pointer transition flex flex-col justify-between text-center relative ${
                isSelected ? 'border-rose-600 ring-2 ring-rose-400 bg-rose-50/20' : 'border-gray-200 hover:border-rose-300'
              }`}
            >
              {isSelected && (
                <div className="absolute top-2 right-2 bg-rose-600 text-white rounded-full p-1 shadow">
                  <Check className="w-3 h-3" />
                </div>
              )}
              <img src={p.images?.[0] || p.image} alt={p.name} className="w-full h-24 object-cover rounded-xl mb-2" />
              <h4 className="font-bold text-xs text-gray-800 line-clamp-1">{p.name}</h4>
              <span className="text-rose-600 font-black text-xs mt-1">{p.price} د.ج</span>
            </div>
          );
        })}
      </div>

      {/* ملخص الهدية المصممة */}
      <div className="bg-white rounded-2xl p-6 border border-rose-200 max-w-xl mx-auto shadow-sm text-center">
        <h3 className="font-bold text-gray-800 text-sm mb-3">محتويات علبة هديتك المصممة ({selectedProducts.length} منتجات)</h3>
        {selectedProducts.length === 0 ? (
          <p className="text-xs text-gray-400 my-4">اضغطي على المنتجات في الأعلى لإضافتها داخل العلبة</p>
        ) : (
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            {selectedProducts.map((p) => (
              <span key={p.id} className="bg-rose-50 text-rose-700 text-[11px] font-bold px-3 py-1 rounded-full border border-rose-100">
                {p.name}
              </span>
            ))}
          </div>
        )}

        <div className="border-t pt-3 flex items-center justify-between text-xs font-bold text-gray-700 mb-4">
          <span>سعر العلبة الفاخرة والتغليف: {boxPrice} د.ج</span>
          <span className="text-base text-rose-600 font-black">المجموع: {grandTotal} د.ج</span>
        </div>

        <button
          disabled={selectedProducts.length === 0}
          onClick={() => {
            if (onOrderGift) {
              onOrderGift({
                name: `علبة هدية مخصصة (${selectedProducts.length} منتجات)`,
                price: grandTotal,
                image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=600',
                description: `علبة هدية تحتوي على: ${selectedProducts.map((p) => p.name).join(' + ')}`
              });
            }
          }}
          className={`w-full py-3.5 rounded-xl font-black text-sm flex items-center justify-center gap-2 transition ${
            selectedProducts.length > 0
              ? 'bg-rose-600 text-white hover:bg-rose-700 shadow-md shadow-rose-200 cursor-pointer'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          <ShoppingBag className="w-4 h-4" /> أطلبي هديتك المصممة الآن
        </button>
      </div>
    </section>
  );
}
