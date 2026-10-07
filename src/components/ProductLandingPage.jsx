import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ArrowRight, ShieldCheck, Truck, Clock, ShoppingBag } from 'lucide-react';

export default function ProductLandingPage({ product, onBack }) {
  const store = useStore();
  
  // حماية في حال عدم وجود بيانات الولايات
  const wilayasList = store?.wilayas || [
    { code: '01', name: 'أدرار', home: 1000, desk: 600 }
  ];

  const [selectedImage, setSelectedImage] = useState(product?.images?.[0] || product?.image || '');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedWilaya, setSelectedWilaya] = useState(wilayasList[0]?.name || 'أدرار');
  const [shippingType, setShippingType] = useState('home');
  const [baladiya, setBaladiya] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!product) return null;

  const currentWilaya = wilayasList.find(w => w.name === selectedWilaya) || wilayasList[0];
  const shippingCost = shippingType === 'home' ? (currentWilaya?.home || 1000) : (currentWilaya?.desk || 600);
  const grandTotal = ((product?.price || 0) * quantity) + shippingCost;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fullName || !phone || !baladiya) {
      alert('يرجى ملء كافة الحقول المطلوبة');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      if (store?.addOrder) {
        store.addOrder({
          fullName,
          phone,
          wilaya: selectedWilaya,
          baladiya,
          shippingType: shippingType === 'home' ? 'توصيل للمنزل' : 'توصيل للمكتب',
          productName: product.name,
          quantity,
          grandTotal,
          date: new Date().toLocaleDateString('ar-DZ')
        });
      }
      setIsSubmitting(false);
      alert('تم استقبال طلبك بنجاح! سيتم الإتصال بكم لتأكيد الطلب.');
      if (onBack) onBack();
    }, 600);
  };

  const scrollToCheckout = () => {
    document.getElementById('checkout-form-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24 text-right font-sans">
      
      {/* هيدر العودة */}
      <div className="bg-white border-b p-4 sticky top-0 z-30 flex items-center justify-between">
        <button onClick={onBack} className="flex items-center gap-1 text-xs font-bold text-gray-600 hover:text-rose-600">
          <ArrowRight className="w-4 h-4" /> العودة للمتجر
        </button>
        <span className="text-xs font-black text-rose-600 truncate max-w-[200px]">{product.name}</span>
      </div>

      <div className="max-w-xl mx-auto p-4 space-y-6">

        {/* 1. عنوان المنتج + السعر والسعر المشطوب */}
        <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm text-center">
          <h1 className="text-xl font-black text-gray-900 mb-2">{product.name}</h1>
          
          <div className="flex items-center justify-center gap-3">
            {product.originalPrice && (
              <span className="text-sm font-bold text-gray-400 line-through">
                {product.originalPrice} د.ج
              </span>
            )}
            <span className="text-2xl font-black text-rose-600">
              {product.price} د.ج
            </span>
          </div>
        </div>

        {/* 2. معرض الصور */}
        <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm space-y-3">
          <div className="aspect-square rounded-2xl overflow-hidden bg-gray-50">
            <img src={selectedImage || product.image} alt={product.name} className="w-full h-full object-cover" />
          </div>

          {product.images && product.images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-1">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition shrink-0 ${
                    selectedImage === img ? 'border-rose-600 scale-95' : 'border-transparent'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 3. الوصف وشارات الثقة */}
        <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm space-y-4">
          <div>
            <h3 className="font-bold text-xs text-rose-600 mb-1">وصف المنتج</h3>
            <p className="text-xs text-gray-600 leading-relaxed">{product.description || 'منتج عالي الجودة ومضمون لضمان العناية الكاملة والجمال المثالي.'}</p>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-3 border-t text-center text-[10px] font-bold text-gray-700">
            <div className="p-2 bg-rose-50/50 rounded-xl flex flex-col items-center gap-1">
              <ShieldCheck className="w-5 h-5 text-rose-600" />
              <span>جودة عالية</span>
            </div>
            <div className="p-2 bg-rose-50/50 rounded-xl flex flex-col items-center gap-1">
              <Truck className="w-5 h-5 text-rose-600" />
              <span>توصيل سريع</span>
            </div>
            <div className="p-2 bg-rose-50/50 rounded-xl flex flex-col items-center gap-1">
              <Clock className="w-5 h-5 text-rose-600" />
              <span>الدفع عند الاستلام</span>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-100 text-amber-800 p-3 rounded-2xl text-xs text-center font-bold">
            سيتم الإتصال بكم لتأكيد الطلب
          </div>
        </div>

        {/* 4. استمارة الشراء (الفورم) */}
        <div id="checkout-form-section" className="bg-white p-6 rounded-3xl border border-rose-100 shadow-md space-y-4">
          <h2 className="text-base font-black text-gray-900 text-center flex items-center justify-center gap-1.5">
            <ShoppingBag className="w-5 h-5 text-rose-600" />
            استمارة الطلب السريع
          </h2>

          <form onSubmit={handleSubmit} className="space-y-3 text-xs">
            <div>
              <label className="block font-bold mb-1">الاسم الكامل *</label>
              <input
                type="text"
                required
                placeholder="يرجى إدخال الاسم الكامل"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full border rounded-xl p-3 focus:outline-none focus:border-rose-600 bg-gray-50"
              />
            </div>

            <div>
              <label className="block font-bold mb-1">رقم الهاتف *</label>
              <input
                type="tel"
                required
                placeholder="أدخل رقم هاتف صالح"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full border rounded-xl p-3 focus:outline-none focus:border-rose-600 bg-gray-50 text-left font-mono"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block font-bold mb-1">الولاية *</label>
                <select
                  value={selectedWilaya}
                  onChange={(e) => setSelectedWilaya(e.target.value)}
                  className="w-full border rounded-xl p-3 bg-gray-50 focus:outline-none focus:border-rose-600 font-bold"
                >
                  {wilayasList.map((w, index) => (
                    <option key={index} value={w.name}>{w.code ? `${w.code} - ` : ''}{w.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold mb-1">نوع التوصيل</label>
                <select
                  value={shippingType}
                  onChange={(e) => setShippingType(e.target.value)}
                  className="w-full border rounded-xl p-3 bg-gray-50 focus:outline-none focus:border-rose-600 font-bold"
                >
                  <option value="home">توصيل للمنزل ({currentWilaya?.home || 1000} د.ج)</option>
                  <option value="desk">توصيل للمكتب ({currentWilaya?.desk || 600} د.ج)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-bold mb-1">البلدية والعنوان *</label>
              <input
                type="text"
                required
                placeholder="يرجى كتابة اسم البلدية"
                value={baladiya}
                onChange={(e) => setBaladiya(e.target.value)}
                className="w-full border rounded-xl p-3 focus:outline-none focus:border-rose-600 bg-gray-50"
              />
            </div>

            {/* الكمية */}
            <div>
              <label className="block font-bold mb-1">الكمية المطلوبة</label>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="bg-gray-200 text-gray-800 w-10 h-10 rounded-xl font-bold text-lg"
                >
                  -
                </button>
                <span className="font-bold text-sm">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="bg-rose-600 text-white w-10 h-10 rounded-xl font-bold text-lg"
                >
                  +
                </button>
              </div>
            </div>

            {/* ملخص الحساب */}
            <div className="bg-rose-50/50 p-4 rounded-2xl space-y-1.5 border border-rose-100 font-bold">
              <div className="flex justify-between text-gray-600">
                <span>سعر القطع:</span>
                <span>{product.price * quantity} د.ج</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>سعر الشحن ({currentWilaya?.name}):</span>
                <span>{shippingCost} د.ج</span>
              </div>
              <div className="flex justify-between text-rose-600 text-sm border-t pt-1.5 font-black">
                <span>المبلغ الإجمالي:</span>
                <span>{grandTotal} د.ج</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-rose-600 hover:bg-rose-700 text-white font-black py-4 rounded-2xl transition text-sm shadow-lg shadow-rose-200"
            >
              {isSubmitting ? 'جاري تسجيل الطلب...' : 'تأكيد الطلب الآن 🛒'}
            </button>
          </form>
        </div>

      </div>

      {/* 5. زر الشراء المنبثق المثبت بالأسفل (Sticky Bar) */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t p-3 z-40 flex items-center justify-between gap-3 shadow-lg max-w-xl mx-auto">
        <div>
          <span className="text-[10px] text-gray-400 block font-bold">السعر الكلي</span>
          <span className="text-base font-black text-rose-600">{grandTotal} د.ج</span>
        </div>

        <button
          onClick={scrollToCheckout}
          className="flex-1 bg-rose-600 hover:bg-rose-700 text-white font-black py-3 px-4 rounded-2xl transition text-xs shadow-md shadow-rose-200 text-center"
        >
          اضغط هنا للطلب 🛒
        </button>
      </div>

    </div>
  );
}
