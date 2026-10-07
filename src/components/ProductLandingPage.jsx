import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Truck, ShieldCheck, Clock, ArrowRight, CheckCircle2, ChevronRight, ChevronLeft } from 'lucide-react';

export default function ProductLandingPage({ product, onBack }) {
  const { createOrder, wilayas, settings } = useStore();

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedWilaya, setSelectedWilaya] = useState(wilayas[0]?.name || 'الجزائر العاصمة');
  const [shippingType, setShippingType] = useState('home');
  const [baladiya, setBaladiya] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [orderSuccess, setOrderSuccess] = useState(false);

  // صور المنتج والشريط المتغير
  const productImages = product.images && product.images.length > 0 ? product.images : [product.image];
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  const currentWilaya = wilayas.find((w) => w.name === selectedWilaya) || wilayas[0] || { home: 600, desk: 400 };
  const shippingFee = shippingType === 'home' ? currentWilaya.home : currentWilaya.desk;
  const productTotal = product.price * quantity;
  const grandTotal = productTotal + shippingFee;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fullName || !phone || !baladiya) {
      alert('يرجى ملء كافة الخانات المطلوبة');
      return;
    }

    createOrder({
      fullName,
      phone,
      wilaya: selectedWilaya,
      baladiya,
      shippingType: shippingType === 'home' ? 'توصيل للمنزل' : 'توصيل للمكتب',
      quantity,
      productName: product.name,
      grandTotal
    });

    setOrderSuccess(true);
  };

  if (orderSuccess) {
    return (
      <div className="min-h-screen bg-rose-50/50 flex items-center justify-center p-4 font-sans">
        <div className="bg-white p-8 rounded-3xl shadow-xl max-w-md w-full text-center border border-rose-100">
          <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto mb-4 animate-bounce" />
          <h2 className="text-2xl font-black text-gray-800 mb-2">تم تسجيل طلبك بنجاح!</h2>
          <p className="text-gray-600 text-sm mb-6 leading-relaxed">
            شكراً لك <b>{fullName}</b>.<br />سيتم التواصل معكم لتأكيد الطلب عبر الرقم المدخل قريباً.
          </p>
          <button
            onClick={onBack}
            className="w-full bg-rose-600 text-white font-bold py-3.5 rounded-2xl hover:bg-rose-700 transition shadow-lg shadow-rose-200"
          >
            العودة للمتجر
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans pb-12">
      <div className="bg-rose-600 text-white text-center py-2.5 text-sm font-bold flex items-center justify-center gap-2 shadow-sm">
        <Truck className="w-4 h-4" /> التوصيل متوفر لجميع 58 ولاية والدفع عند الاستلام
      </div>

      <div className="max-w-5xl mx-auto px-4 pt-4">
        <button
          onClick={onBack}
          className="flex items-center gap-1 text-sm font-bold text-rose-600 hover:underline mb-4 transition"
        >
          <ArrowRight className="w-4 h-4" /> العودة للصفحة الرئيسية
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100">
          
          {/* استمارة الطلب المباشر */}
          <div className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">أكتب إسمك</label>
                  <input
                    type="text"
                    required
                    placeholder="يرجى إدخال الاسم الكامل"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full border border-rose-200 rounded-xl px-3 py-2.5 text-xs text-right focus:outline-none focus:border-rose-600 bg-rose-50/20"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">رقم الهاتف</label>
                  <input
                    type="tel"
                    required
                    placeholder="أدخل رقم هاتف صالح"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full border border-rose-200 rounded-xl px-3 py-2.5 text-xs text-right focus:outline-none focus:border-rose-600 bg-rose-50/20"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">اختر ولايتك</label>
                  <select
                    value={selectedWilaya}
                    onChange={(e) => setSelectedWilaya(e.target.value)}
                    className="w-full border border-rose-200 rounded-xl px-2 py-2.5 text-xs focus:outline-none focus:border-rose-600 bg-rose-50/20"
                  >
                    {wilayas.map((w) => (
                      <option key={w.code} value={w.name}>
                        {w.code} - {w.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">اختر التوصيل</label>
                  <select
                    value={shippingType}
                    onChange={(e) => setShippingType(e.target.value)}
                    className="w-full border border-rose-200 rounded-xl px-2 py-2.5 text-xs focus:outline-none focus:border-rose-600 bg-rose-50/20"
                  >
                    <option value="home">توصيل للمنزل ({currentWilaya.home} د.ج)</option>
                    <option value="desk">توصيل للمكتب ({currentWilaya.desk} د.ج)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">اختر بلديتك</label>
                <input
                  type="text"
                  required
                  placeholder="يرجى كتابة اسم البلدية"
                  value={baladiya}
                  onChange={(e) => setBaladiya(e.target.value)}
                  className="w-full border border-rose-200 rounded-xl px-3 py-2.5 text-xs text-right focus:outline-none focus:border-rose-600 bg-rose-50/20"
                />
              </div>

              <div className="flex justify-center items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 bg-rose-600 text-white font-bold text-lg rounded-xl hover:bg-rose-700 transition active:scale-95"
                >
                  +
                </button>
                <span className="w-14 py-2 bg-gray-50 text-center font-black border border-gray-200 rounded-xl text-base">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 bg-gray-200 text-gray-700 font-bold text-lg rounded-xl hover:bg-gray-300 transition active:scale-95"
                >
                  -
                </button>
              </div>

              <button
                type="submit"
                className="w-full bg-rose-600 hover:bg-rose-700 text-white font-black py-3.5 rounded-xl transition shadow-lg shadow-rose-200 text-base mt-2 active:scale-95"
              >
                تأكيد الطلب 🛒
              </button>
            </form>

            <div className="border border-rose-100 rounded-2xl p-4 bg-rose-50/30 space-y-3 mt-4">
              <h4 className="font-bold text-center text-sm text-gray-800">ملخص الطلبية</h4>
              <div className="flex justify-between text-xs text-gray-600">
                <span>إجمالي سعر القطع:</span>
                <span className="font-bold">{productTotal} د.ج</span>
              </div>
              <div className="flex justify-between text-xs text-gray-600">
                <span>سعر الشحن ({selectedWilaya}):</span>
                <span className="font-bold">{shippingFee} د.ج</span>
              </div>
              <div className="border-t border-rose-100 pt-2 flex justify-between text-sm font-black text-gray-900">
                <span>السعر الإجمالي:</span>
                <span className="text-rose-600 text-base">{grandTotal} د.ج</span>
              </div>
            </div>
          </div>

          {/* قسم صورة المنتج والوصف والمشغل المتغير للصور */}
          <div className="flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-black text-gray-900 text-center mb-3">{product.name}</h2>
              
              {/* مشغل صور المنتج المتغير */}
              <div className="relative rounded-2xl overflow-hidden border border-gray-100 bg-gray-50 mb-3 group">
                <img
                  src={productImages[currentImgIndex]}
                  alt={product.name}
                  className="w-full h-64 md:h-72 object-contain p-2 transition duration-300"
                />
                
                {productImages.length > 1 && (
                  <>
                    <button
                      onClick={() => setCurrentImgIndex((prev) => (prev - 1 + productImages.length) % productImages.length)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-1.5 rounded-full shadow text-gray-800"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setCurrentImgIndex((prev) => (prev + 1) % productImages.length)}
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-1.5 rounded-full shadow text-gray-800"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>

              {/* المصغرات أسفل الصورة الرئيسية */}
              {productImages.length > 1 && (
                <div className="flex justify-center gap-2 mb-4">
                  {productImages.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt=""
                      onClick={() => setCurrentImgIndex(idx)}
                      className={`w-12 h-12 rounded-xl object-cover border-2 cursor-pointer transition ${
                        idx === currentImgIndex ? 'border-rose-600 scale-105' : 'border-gray-200 opacity-60'
                      }`}
                    />
                  ))}
                </div>
              )}

              <div className="text-2xl font-black text-rose-600 text-center mb-4">
                {product.price} <span className="text-sm font-bold text-gray-500">د.ج</span>
              </div>

              <div className="bg-rose-600 text-white text-center py-2 font-bold rounded-t-2xl text-sm">
                وصف المنتج
              </div>
              <div className="border border-t-0 border-rose-100 rounded-b-2xl p-4 text-xs text-gray-600 leading-relaxed bg-rose-50/20 text-center mb-6">
                {product.description || 'منتج أصلي ذو جودة عالية ومضمون 100%. التوصيل مجرب وسريع إلى غاية باب المنزل مع إمكانية المعاينة قبل الدفع.'}
              </div>
            </div>

            <div className="border border-rose-200 rounded-2xl p-4 flex justify-around text-center text-xs font-bold gap-2 bg-white shadow-sm">
              <div className="flex flex-col items-center">
                <ShieldCheck className="w-7 h-7 text-rose-600 mb-1" />
                <span>جودة عالية</span>
              </div>
              <div className="flex flex-col items-center">
                <Truck className="w-7 h-7 text-rose-600 mb-1" />
                <span>توصيل سريع</span>
              </div>
              <div className="flex flex-col items-center">
                <Clock className="w-7 h-7 text-rose-600 mb-1" />
                <span>الدفع عند الاستلام</span>
              </div>
            </div>

            <div className="mt-4 text-center bg-rose-100 text-rose-700 text-xs font-bold py-2.5 rounded-xl border border-rose-200">
              سيتم التواصل معكم لتأكيد الطلب عبر الرقم المدخل ({settings.phone})
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
