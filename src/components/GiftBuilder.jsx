import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Gift, Check, Sparkles, AlertCircle } from 'lucide-react';

export default function GiftBuilder({ onOrderGift }) {
  const { products } = useStore();
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [boxColor, setBoxColor] = useState('وردي فاخر 🌸');
  const [cardMessage, setCardMessage] = useState('');

  const toggleProduct = (product) => {
    if (selectedProducts.find(p => p.id === product.id)) {
      setSelectedProducts(selectedProducts.filter(p => p.id !== product.id));
    } else {
      setSelectedProducts([...selectedProducts, product]);
    }
  };

  const boxPrice = 800; // سعر العلبة والتغليف
  const productsTotal = selectedProducts.reduce((sum, p) => sum + p.price, 0);
  const grandTotal = selectedProducts.length > 0 ? productsTotal + boxPrice : 0;

  const handleOrder = () => {
    if (selectedProducts.length === 0) return;

    const customGiftProduct = {
      name: `علبة هدايا مخصصة (${selectedProducts.map(p => p.name).join(' + ')}) - لون العلبة: ${boxColor}`,
      price: grandTotal,
      image: selectedProducts[0]?.images?.[0] || selectedProducts[0]?.image,
      description: `علبة هدايا تحتوي على: ${selectedProducts.map(p => p.name).join('، ')}. رسالة الإهداء: "${cardMessage || 'بدون رسالة'}"`
    };

    onOrderGift(customGiftProduct);
  };

  return (
    <div id="gift-section" className="bg-rose-50/50 border border-rose-100 rounded-3xl p-4 md:p-8 my-8 text-right font-sans">
      <div className="text-center max-w-lg mx-auto mb-6">
        <span className="bg-rose-600 text-white text-[10px] font-bold px-3 py-1 rounded-full inline-flex items-center gap-1 shadow-sm mb-2">
          <Gift className="w-3.5 h-3.5" /> قسم خاص ومميز
        </span>
        <h2 className="text-xl md:text-2xl font-black text-gray-900">صممي هديتك الخاصة بنفسك 🎁</h2>
        <p className="text-xs text-gray-500 mt-1">اختاري المنتجات المفضلة، لون العلبة، واكتبي رسالة إهداء وسنقوم بتغليفها وإرسالها بحب!</p>
      </div>

      {/* اختيار المنتجات */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
        {products.map((p) => {
          const isSelected = selectedProducts.some(sp => sp.id === p.id);
          return (
            <div
              key={p.id}
              onClick={() => toggleProduct(p)}
              className={`border-2 rounded-2xl p-3 bg-white cursor-pointer transition flex flex-col justify-between ${
                isSelected ? 'border-rose-600 bg-rose-50/20 shadow-md' : 'border-gray-100 hover:border-gray-200'
              }`}
            >
              <div className="relative aspect-square rounded-xl overflow-hidden mb-2 bg-gray-50">
                <img src={p.images?.[0] || p.image} alt={p.name} className="w-full h-full object-cover" />
                {isSelected && (
                  <div className="absolute top-2 right-2 bg-rose-600 text-white p-1 rounded-full shadow">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
              <div>
                <h4 className="font-bold text-xs text-gray-800 line-clamp-1">{p.name}</h4>
                <span className="text-xs font-black text-rose-600 block mt-0.5">{p.price} د.ج</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* خيارات العلبة والرسالة */}
      <div className="max-w-md mx-auto space-y-4 bg-white p-5 rounded-2xl border border-rose-100 shadow-sm text-xs">
        <div>
          <label className="block font-bold text-gray-700 mb-2">اختاري لون علبة الهدية:</label>
          <div className="grid grid-cols-3 gap-2 text-center font-bold">
            {['وردي فاخر 🌸', 'أسود ملكي 🖤', 'ذهبي براق ✨'].map((color) => (
              <button
                key={color}
                onClick={() => setBoxColor(color)}
                className={`py-2 px-1 rounded-xl border transition ${
                  boxColor === color ? 'bg-rose-600 text-white border-rose-600' : 'bg-gray-50 text-gray-700 border-gray-200'
                }`}
              >
                {color}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block font-bold text-gray-700 mb-1">كرت الرسالة والإهداء (اختياري):</label>
          <input
            type="text"
            placeholder="مثال: إلى صديقتي الغالية مريم بمناسبة عيد ميلادك..."
            value={cardMessage}
            onChange={(e) => setCardMessage(e.target.value)}
            className="w-full border rounded-xl p-3 bg-gray-50 focus:outline-none focus:border-rose-600"
          />
        </div>

        {/* المجموع والتلميح الناصح */}
        <div className="border-t pt-3 space-y-2">
          <div className="flex justify-between font-bold text-gray-600">
            <span>محتويات الهدية ({selectedProducts.length} منتجات):</span>
            <span>{productsTotal} د.ج</span>
          </div>
          <div className="flex justify-between font-bold text-gray-600">
            <span>سعر العلبة والتغليف:</span>
            <span>{selectedProducts.length > 0 ? boxPrice : 0} د.ج</span>
          </div>
          <div className="flex justify-between font-black text-rose-600 text-sm pt-1 border-t">
            <span>المجموع النهائي:</span>
            <span>{grandTotal} د.ج</span>
          </div>

          {/* التلميح الناصح لتشغيل الزر */}
          {selectedProducts.length === 0 && (
            <div className="bg-amber-50 text-amber-800 p-2.5 rounded-xl text-[11px] font-bold flex items-center justify-center gap-1.5 border border-amber-200">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>اضغطي على المنتجات في الأعلى لتصممي علبتك وتفعيل الطلب</span>
            </div>
          )}

          <button
            onClick={handleOrder}
            disabled={selectedProducts.length === 0}
            className={`w-full py-3.5 rounded-xl font-black transition text-xs shadow-md ${
              selectedProducts.length > 0 
                ? 'bg-rose-600 hover:bg-rose-700 text-white shadow-rose-200' 
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            {selectedProducts.length > 0 ? 'اطلبي هديتك المصممة الآن 🎁' : 'اطلبي هديتك المصممة الآن'}
          </button>
        </div>
      </div>
    </div>
  );
}
