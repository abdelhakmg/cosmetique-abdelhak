import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Truck, ShieldCheck, Clock, ArrowRight, CheckCircle2 } from 'lucide-react';

const WILAYAS = [
  { code: '01', name: 'أدرار', home: 1000, desk: 600 },
  { code: '02', name: 'الشلف', home: 700, desk: 400 },
  { code: '03', name: 'الأغواط', home: 800, desk: 500 },
  { code: '04', name: 'أم البواقي', home: 700, desk: 400 },
  { code: '05', name: 'باتنة', home: 700, desk: 400 },
  { code: '06', name: 'بجاية', home: 700, desk: 400 },
  { code: '07', name: 'بسكرة', home: 800, desk: 500 },
  { code: '08', name: 'بشار', home: 1000, desk: 600 },
  { code: '09', name: 'البليدة', home: 600, desk: 350 },
  { code: '10', name: 'البويرة', home: 700, desk: 400 },
  { code: '16', name: 'الجزائر العاصمة', home: 500, desk: 300 },
  { code: '25', name: 'قسنطينة', home: 700, desk: 400 },
  { code: '31', name: 'وهران', home: 700, desk: 400 },
  { code: '32', name: 'البيض', home: 900, desk: 550 }
];

export default function ProductLandingPage({ product, onBack }) {
  const { createOrder } = useStore();

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedWilaya, setSelectedWilaya] = useState(WILAYAS[10].name);
  const [shippingType, setShippingType] = useState('home'); // home or desk
  const [baladiya, setBaladiya] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [orderSuccess, setOrderSuccess] = useState(false);

  // حساب أسعار الطلبية
  const currentWilaya = WILAYAS.find((w) => w.name === selectedWilaya) || WILAYAS[10];
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
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-md max-w-md w-full text-center border border-gray-200">
          <CheckCircle2 className="w-16 h-16 text-emerald-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">تم تسجيل طلبك بنجاح!</h2>
          <p className="text-gray-600 text-sm mb-6">
            شكراً لك <b>{fullName}</b>. سيتم التواصل معكم لتأكيد الطلب عبر الرقم المدخل قريباً.
          </p>
          <button
            onClick={onBack}
            className="w-full bg-amber-800 text-white font-bold py-3 rounded-xl hover:bg-amber-900 transition"
          >
            العودة للمتجر
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 font-sans pb-12">
      {/* الشريط العلوي الهيدر */}
      <div className="bg-amber-800 text-white text-center py-2 text-sm font-bold flex items-center justify-center gap-2 shadow-sm">
        <Truck className="w-4 h-4" /> توصيل إلى كل الولايات
      </div>

      <div className="max-w-5xl mx-auto px-4 pt-4">
        <button
          onClick={onBack}
          className="flex items-center gap-1 text-sm font-bold text-amber-900 hover:underline mb-4"
        >
          <ArrowRight className="w-4 h-4" /> الصفحة الرئيسية
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-200">
          
          {/* قسم استمارة الشراء المباشر (اليمين/اليسار حسب الشاشة) */}
          <div className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">أكتب إسمك</label>
                  <input
                    type="text"
                    required
                    placeholder="يرجى إدخال الاسم الكامل"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full border border-rose-300 rounded-xl px-3 py-2.5 text-xs text-right focus:outline-none focus:border-amber-800 bg-rose-50/20"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">رقم الهاتف</label>
                  <input
                    type="tel"
                    required
                    placeholder="أدخل رقم هاتف صالح"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full border border-rose-300 rounded-xl px-3 py-2.5 text-xs text-right focus:outline-none focus:border-amber-800 bg-rose-50/20"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">اختر ولايتك</label>
                  <select
                    value={selectedWilaya}
                    onChange={(e) => setSelectedWilaya(e.target.value)}
                    className="w-full border border-rose-300 rounded-xl px-2 py-2.5 text-xs focus:outline-none focus:border-amber-800 bg-rose-50/20"
                  >
                    {WILAYAS.map((w) => (
                      <option key={w.code} value={w.name}>
                        {w.code} - {w.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">اختر التوصيل</label>
                  <select
                    value={shippingType}
                    onChange={(e) => setShippingType(e.target.value)}
                    className="w-full border border-rose-300 rounded-xl px-2 py-2.5 text-xs focus:outline-none focus:border-amber-800 bg-rose-50/20"
                  >
                    <option value="home">توصيل للمنزل ({currentWilaya.home} د.ج)</option>
                    <option value="desk">توصيل للمكتب ({currentWilaya.desk} د.ج)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">اختر بلديتك</label>
                <input
                  type="text"
                  required
                  placeholder="يرجى اختيار البلدية"
                  value={baladiya}
                  onChange={(e) => setBaladiya(e.target.value)}
                  className="w-full border border-rose-300 rounded-xl px-3 py-2.5 text-xs text-right focus:outline-none focus:border-amber-800 bg-rose-50/20"
                />
              </div>

              {/* أزرار زيادة ونقصان الكمية */}
              <div className="flex justify-center items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 bg-amber-900 text-white font-bold text-lg rounded-lg"
                >
                  +
                </button>
                <span className="w-12 py-2 bg-gray-100 text-center font-bold border rounded-lg text-sm">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 bg-gray-300 text-gray-700 font-bold text-lg rounded-lg"
                >
                  -
                </button>
              </div>

              <button
                type="submit"
                className="w-full bg-amber-800 hover:bg-amber-900 text-white font-bold py-3.5 rounded-xl transition shadow-md text-sm mt-2"
              >
                تأكيد الطلب
              </button>
            </form>

            {/* ملخص الطلبية */}
            <div className="border border-gray-200 rounded-xl p-4 bg-gray-50/50 space-y-3 mt-4">
              <h4 className="font-bold text-center text-sm text-gray-700">ملخص الطلبية</h4>
              <div className="flex justify-between text-xs text-gray-600">
                <span>إجمالي سعر القطع:</span>
                <span className="font-bold">{productTotal} د.ج</span>
              </div>
              <div className="flex justify-between text-xs text-gray-600">
                <span>سعر الشحن:</span>
                <span className="font-bold">{shippingFee} د.ج</span>
              </div>
              <div className="border-t pt-2 flex justify-between text-sm font-black text-gray-900">
                <span>السعر الإجمالي:</span>
                <span className="text-amber-800">{grandTotal} د.ج</span>
              </div>
            </div>
          </div>

          {/* قسم صورة المنتج والوصف والشعارات */}
          <div className="flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900 text-center mb-3">{product.name}</h2>
              <div className="relative rounded-2xl overflow-hidden border border-gray-100 bg-gray-50 mb-4">
                <img src={product.image} alt={product.name} className="w-full h-64 md:h-72 object-contain p-2" />
              </div>
              <div className="text-2xl font-black text-gray-900 text-center mb-4">
                {product.price} <span className="text-sm font-normal">د.ج</span>
              </div>

              {/* مربع الوصف */}
              <div className="bg-amber-800 text-white text-center py-2 font-bold rounded-t-xl text-sm">
                الوصف
              </div>
              <div className="border border-t-0 rounded-b-xl p-4 text-xs text-gray-600 leading-relaxed bg-gray-50 text-center mb-6">
                {product.description || 'اكتشفوا نتائج المبهرة للعناية بالبشرة للوصول إلى المظهر المتألق والمثالي في راحة منزلكم.'}
              </div>
            </div>

            {/* أيقونات الضمان والتوصيل */}
            <div className="border border-gray-900 rounded-2xl p-4 flex justify-around text-center text-xs font-bold gap-2">
              <div className="flex flex-col items-center">
                <ShieldCheck className="w-8 h-8 text-amber-800 mb-1" />
                <span>جودة عالية</span>
              </div>
              <div className="flex flex-col items-center">
                <Truck className="w-8 h-8 text-amber-800 mb-1" />
                <span>توصيل سريع</span>
              </div>
              <div className="flex flex-col items-center">
                <Clock className="w-8 h-8 text-amber-800 mb-1" />
                <span>الدفع عند الاستلام</span>
              </div>
            </div>

            <div className="mt-4 text-center bg-amber-800 text-white text-xs font-bold py-2.5 rounded-xl">
              سيتم التواصل معكم لتأكيد الطلب عبر الرقم المدخل
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
