import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Truck, ShieldCheck, Clock, ArrowRight, CheckCircle2 } from 'lucide-react';

// قائمة الـ 58 ولاية جزائرية بالكامل
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
  { code: '11', name: 'تمنراست', home: 1200, desk: 800 },
  { code: '12', name: 'تبسة', home: 700, desk: 400 },
  { code: '13', name: 'تلمسان', home: 700, desk: 400 },
  { code: '14', name: 'تيارت', home: 700, desk: 400 },
  { code: '15', name: 'تيزي وزو', home: 700, desk: 400 },
  { code: '16', name: 'الجزائر العاصمة', home: 500, desk: 300 },
  { code: '17', name: 'الجلفة', home: 800, desk: 500 },
  { code: '18', name: 'جيجل', home: 700, desk: 400 },
  { code: '19', name: 'سطيف', home: 700, desk: 400 },
  { code: '20', name: 'سعيدة', home: 700, desk: 400 },
  { code: '21', name: 'سكيكدة', home: 700, desk: 400 },
  { code: '22', name: 'سيدي بلعباس', home: 700, desk: 400 },
  { code: '23', name: 'عنابة', home: 700, desk: 400 },
  { code: '24', name: 'قالمة', home: 700, desk: 400 },
  { code: '25', name: 'قسنطينة', home: 700, desk: 400 },
  { code: '26', name: 'المدية', home: 700, desk: 400 },
  { code: '27', name: 'مستغانم', home: 700, desk: 400 },
  { code: '28', name: 'المسيلة', home: 700, desk: 400 },
  { code: '29', name: 'معسكر', home: 700, desk: 400 },
  { code: '30', name: 'ورقلة', home: 900, desk: 600 },
  { code: '31', name: 'وهران', home: 700, desk: 400 },
  { code: '32', name: 'البيض', home: 900, desk: 550 },
  { code: '33', name: 'إليزي', home: 1200, desk: 800 },
  { code: '34', name: 'برج بوعريريج', home: 700, desk: 400 },
  { code: '35', name: 'بومرداس', home: 600, desk: 350 },
  { code: '36', name: 'الطارف', home: 700, desk: 400 },
  { code: '37', name: 'تندوف', home: 1200, desk: 800 },
  { code: '38', name: 'تيسمسيلت', home: 700, desk: 400 },
  { code: '39', name: 'الوادي', home: 900, desk: 600 },
  { code: '40', name: 'خنشلة', home: 700, desk: 400 },
  { code: '41', name: 'سوق أهراس', home: 700, desk: 400 },
  { code: '42', name: 'تيبازة', home: 600, desk: 350 },
  { code: '43', name: 'ميلة', home: 700, desk: 400 },
  { code: '44', name: 'عين الدفلى', home: 700, desk: 400 },
  { code: '45', name: 'النعامة', home: 900, desk: 600 },
  { code: '46', name: 'عين تموشنت', home: 700, desk: 400 },
  { code: '47', name: 'غرداية', home: 900, desk: 600 },
  { code: '48', name: 'غليزان', home: 700, desk: 400 },
  { code: '49', name: 'المغير', home: 900, desk: 600 },
  { code: '50', name: 'المنيعة', home: 1000, desk: 700 },
  { code: '51', name: 'أولاد جلال', home: 900, desk: 600 },
  { code: '52', name: 'برج باجي مختار', home: 1300, desk: 900 },
  { code: '53', name: 'بني عباس', home: 1000, desk: 700 },
  { code: '54', name: 'تيميمون', home: 1000, desk: 700 },
  { code: '55', name: 'تقرت', home: 900, desk: 600 },
  { code: '56', name: 'جانت', home: 1300, desk: 900 },
  { code: '57', name: 'عين صالح', home: 1200, desk: 800 },
  { code: '58', name: 'عين قزام', home: 1300, desk: 900 }
];

export default function ProductLandingPage({ product, onBack }) {
  const { createOrder } = useStore();

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedWilaya, setSelectedWilaya] = useState(WILAYAS[15].name); // الجزائر العاصمة
  const [shippingType, setShippingType] = useState('home');
  const [baladiya, setBaladiya] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const currentWilaya = WILAYAS.find((w) => w.name === selectedWilaya) || WILAYAS[15];
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
      <div className="min-h-screen bg-rose-50/50 flex items-center justify-center p-4">
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
      {/* الشريط العلوي الهيدر باللون الوردي */}
      <div className="bg-rose-600 text-white text-center py-2.5 text-sm font-bold flex items-center justify-center gap-2 shadow-sm">
        <Truck className="w-4 h-4" /> التوصيل متوفر لجميع 58 ولاية
      </div>

      <div className="max-w-5xl mx-auto px-4 pt-4">
        <button
          onClick={onBack}
          className="flex items-center gap-1 text-sm font-bold text-rose-600 hover:underline mb-4 transition"
        >
          <ArrowRight className="w-4 h-4" /> العودة للصفحة الرئيسية
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100">
          
          {/* قسم استمارة الشراء المباشر */}
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
                    {WILAYAS.map((w) => (
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

              {/* أزرار زيادة ونقصان الكمية */}
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

            {/* ملخص الطلبية */}
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

          {/* قسم صورة المنتج والوصف والشعارات */}
          <div className="flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-black text-gray-900 text-center mb-3">{product.name}</h2>
              <div className="relative rounded-2xl overflow-hidden border border-gray-100 bg-gray-50 mb-4">
                <img src={product.image} alt={product.name} className="w-full h-64 md:h-72 object-contain p-2" />
              </div>
              <div className="text-2xl font-black text-rose-600 text-center mb-4">
                {product.price} <span className="text-sm font-bold text-gray-500">د.ج</span>
              </div>

              {/* مربع الوصف الوردي */}
              <div className="bg-rose-600 text-white text-center py-2 font-bold rounded-t-2xl text-sm">
                وصف المنتج
              </div>
              <div className="border border-t-0 border-rose-100 rounded-b-2xl p-4 text-xs text-gray-600 leading-relaxed bg-rose-50/20 text-center mb-6">
                {product.description || 'منتج أصلي ذو جودة عالية ومضمون 100%. التوصيل مجرب وسريع إلى غاية باب المنزل مع إمكانية المعاينة قبل الدفع.'}
              </div>
            </div>

            {/* أيقونات الضمان والتوصيل */}
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
              سيتم التواصل معكم لتأكيد الطلب عبر الرقم المدخل
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
