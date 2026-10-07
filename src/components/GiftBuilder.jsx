import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Gift, Check, ShoppingBag } from 'lucide-react';

export default function GiftBuilder({ onOrderGift }) {
  const { products } = useStore();
  const [selectedProducts, setSelectedProducts] = useState([]);
  const boxPrice = 800; // سعر علبة الهدية الفاخرة والتغليف

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
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 my-6 bg-gradient-to-r from-rose-50 via-pink-50 to-rose-50 rounded-3xl border border-rose-200 shadow-sm">
      <div className="text-center max-w-2xl mx-auto mb-6">
        <span className="inline-flex items-center gap-1.5 bg-rose-600 text-white text-xs font-black px-4 py-1.5 rounded-full mb-2 shadow-md">
          <Gift className="w-4 h-4" /> قسم خاص ومميز
        </span>
        <h2 className="text-xl md:text-2xl font-black text-gray-900 mb-1">🎁 صممي هديتك الخاصة بنفسك</h2>
        <p className="text-xs text-gray-600">
          اختاري المنتجات المفضلة لديك وسنقوم بتجميعها وتغليفها داخل علبة هدايا راقية ومميزة!
        </p>
      </div>

      {/* قائمة المنتجات لاختيار الهدية */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-6">
        {products.map((p) => {
          const isSelected = selectedProducts.some((item) => item.id === p.id);
          return (
            <div
              key={p.id}
              onClick={() => toggleSelect(p)}
              className={`bg-white rounded-2xl p-2.5 border cursor-pointer transition flex flex-col justify-between text-center relative ${
                isSelected ? 'border-rose-600 ring-2 ring-rose-400 bg-rose-50/20 scale-95' : 'border-gray-200 hover:border-rose-300'
              }`}
            >
              {isSelected && (
                <div className="absolute top-2 right-2 bg-rose-600 text-white rounded-full p-1 shadow">
                  <Check className="w-3 h-3" />
                </div>
              )}
              <img src={p.images?.[0] || p.image} alt={p.name} className="w-full h-20 object-cover rounded-xl mb-2" />
              <h4 className="font-bold text-[11px] text-gray-800 line-clamp-1">{p.name}</h4>
              <span className="text-rose-600 font-black text-xs mt-1">{p.price} د.ج</span>
            </div>
          );
        })}
      </div>

      {/* ملخص الهدية والأزرار */}
      <div className="bg-white rounded-2xl p-5 border border-rose-200 max-w-xl mx-auto shadow-sm text-center">
        <h3 className="font-bold text-gray-800 text-xs mb-2">محتويات هديتك ({selectedProducts.length} منتجات)</h3>
        {selectedProducts.length === 0 ? (
          <p className="text-xs text-gray-400 my-2">اضغطي على المنتجات في الأعلى لتضمينها في الهدية</p>
        ) : (
          <div className="flex flex-wrap justify-center gap-1.5 mb-3">
            {selectedProducts.map((p) => (
              <span key={p.id} className="bg-rose-50 text-rose-700 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-rose-100">
                {p.name}
              </span>
            ))}
          </div>
        )}

        <div className="border-t pt-2 flex items-center justify-between text-xs font-bold text-gray-700 mb-3">
          <span>سعر العلبة والتغليف: {boxPrice} د.ج</span>
          <span className="text-sm text-rose-600 font-black">المجموع النهائي: {grandTotal} د.ج</span>
        </div>

        <button
          disabled={selectedProducts.length === 0}
          onClick={() => {
            if (onOrderGift) {
              onOrderGift({
                name: `علبة هدية مخصصة (${selectedProducts.length} منتجات)`,
                price: grandTotal,
                image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=600',
                description: `علبة هدية فاخرة تحتوي على: ${selectedProducts.map((p) => p.name).join(' + ')}`
              });
            }
          }}
          className={`w-full py-3 rounded-xl font-black text-xs flex items-center justify-center gap-2 transition ${
            selectedProducts.length > 0
              ? 'bg-rose-600 text-white hover:bg-rose-700 shadow-md shadow-rose-200 cursor-pointer'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          <ShoppingBag className="w-4 h-4" /> اطلبي هديتك المصممة الآن
        </button>
      </div>
    </section>
  );
}
