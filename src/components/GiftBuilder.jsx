import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Gift, Check, ShoppingBag, Sparkles, MessageSquare, Palette } from 'lucide-react';

export default function GiftBuilder({ onOrderGift }) {
  const { products } = useStore();
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [boxColor, setBoxColor] = useState('وردي فاخر 🌸');
  const [noteMessage, setNoteMessage] = useState('');
  const boxPrice = 800;

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
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 my-6 bg-gradient-to-r from-rose-50 via-pink-50 to-rose-50 rounded-3xl border border-rose-200 shadow-sm font-sans">
      <div className="text-center max-w-2xl mx-auto mb-6">
        <span className="inline-flex items-center gap-1.5 bg-rose-600 text-white text-xs font-black px-4 py-1.5 rounded-full mb-2 shadow-md">
          <Gift className="w-4 h-4" /> قسم خاص ومميز
        </span>
        <h2 className="text-xl md:text-2xl font-black text-gray-900 mb-1">🎁 صممي هديتك الخاصة بنفسك</h2>
        <p className="text-xs text-gray-600">
          اختاري المنتجات المفضلة، لون العلبة، واكتبي رسالة إهداء وسنقوم بتغليفها وإرسالها بحب!
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

      {/* خيارات التخصيص والرسالة */}
      <div className="bg-white rounded-3xl p-6 border border-rose-200 max-w-xl mx-auto shadow-sm space-y-4">
        
        {/* اختيار لون العلبة */}
        <div>
          <label className="block text-xs font-bold text-gray-700 mb-2 flex items-center gap-1.5">
            <Palette className="w-4 h-4 text-rose-600" /> اختاري لون علبة الهدية:
          </label>
          <div className="grid grid-cols-3 gap-2 text-xs">
            {['وردي فاخر 🌸', 'أسود ملكي 🖤', 'ذهبي براق ✨'].map((color) => (
              <button
                key={color}
                type="button"
                onClick={() => setBoxColor(color)}
                className={`py-2 px-3 rounded-xl border font-bold text-[11px] transition ${
                  boxColor === color ? 'bg-rose-600 text-white border-rose-600 shadow-sm' : 'bg-gray-50 text-gray-700 border-gray-200'
                }`}
              >
                {color}
              </button>
            ))}
          </div>
        </div>

        {/* كتابة رسالة الإهداء */}
        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1 flex items-center gap-1.5">
            <MessageSquare className="w-4 h-4 text-rose-600" /> كرت الرسالة والإهداء (اختياري):
          </label>
          <input
            type="text"
            placeholder="مثال: إلى صديقتي الغالية مريم بمناسبة عيد ميلادك..."
            value={noteMessage}
            onChange={(e) => setNoteMessage(e.target.value)}
            className="w-full border border-gray-200 rounded-xl p-2.5 text-xs text-right focus:outline-none focus:border-rose-600 bg-gray-50/50"
          />
        </div>

        {/* محتويات الهدية */}
        <div className="border-t pt-3">
          <h3 className="font-bold text-gray-800 text-xs mb-2 text-center">محتويات علبة هديتك ({selectedProducts.length} منتجات)</h3>
          {selectedProducts.length === 0 ? (
            <p className="text-xs text-gray-400 text-center my-2">اضغطي على المنتجات في الأعلى لتصميم هديتك</p>
          ) : (
            <div className="flex flex-wrap justify-center gap-1.5 mb-3">
              {selectedProducts.map((p) => (
                <span key={p.id} className="bg-rose-50 text-rose-700 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-rose-100">
                  {p.name}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="border-t pt-2 flex items-center justify-between text-xs font-bold text-gray-700">
          <span>سعر العلبة والتغليف: {boxPrice} د.ج</span>
          <span className="text-sm text-rose-600 font-black">المجموع النهائي: {grandTotal} د.ج</span>
        </div>

        <button
          disabled={selectedProducts.length === 0}
          onClick={() => {
            if (onOrderGift) {
              const productListNames = selectedProducts.map((p) => p.name).join(' + ');
              onOrderGift({
                name: `علبة هدية مخصصة (${selectedProducts.length} منتجات)`,
                price: grandTotal,
                image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=600',
                description: `علبة هدية (${boxColor}) تحتوي على: [${productListNames}] - رسالة الإهداء: [${noteMessage || 'لا توجد رسالة'}]`,
                giftDetails: {
                  boxColor,
                  noteMessage: noteMessage || 'لا توجد رسالة',
                  items: selectedProducts.map(p => p.name)
                }
              });
            }
          }}
          className={`w-full py-3.5 rounded-xl font-black text-xs flex items-center justify-center gap-2 transition ${
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
