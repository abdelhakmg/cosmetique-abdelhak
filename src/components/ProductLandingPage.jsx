import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ArrowRight, CheckCircle, ShieldCheck, Truck, Star, Clock, Sparkles } from 'lucide-react';

// قائمة الولايات وتكلفة الشحن
const WILAYAS = [
  { code: '01', name: 'أدرار', shipping: 800 },
  { code: '02', name: 'الشلف', shipping: 600 },
  { code: '03', name: 'الأغواط', shipping: 600 },
  { code: '04', name: 'أم البواقي', shipping: 600 },
  { code: '05', name: 'باتنة', shipping: 600 },
  { code: '06', name: 'بجاية', shipping: 600 },
  { code: '07', name: 'بسكرة', shipping: 600 },
  { code: '08', name: 'بشار', shipping: 800 },
  { code: '09', name: 'البليدة', shipping: 500 },
  { code: '10', name: 'البويرة', shipping: 600 },
  { code: '11', name: 'تمنراست', shipping: 900 },
  { code: '12', name: 'تبسة', shipping: 600 },
  { code: '13', name: 'تلمسان', shipping: 600 },
  { code: '14', name: 'تيارت', shipping: 600 },
  { code: '15', name: 'تيزي وزو', shipping: 600 },
  { code: '16', name: 'الجزائر العاصمة', shipping: 400 },
  { code: '17', name: 'الجلفة', shipping: 600 },
  { code: '18', name: 'جيجل', shipping: 600 },
  { code: '19', name: 'سطيف', shipping: 600 },
  { code: '20', name: 'سعيدة', shipping: 600 },
  { code: '21', name: 'سكيكدة', shipping: 600 },
  { code: '22', name: 'سيدي بلعباس', shipping: 600 },
  { code: '23', name: 'عنابة', shipping: 600 },
  { code: '24', name: 'قالمة', shipping: 600 },
  { code: '25', name: 'قسنطينة', shipping: 600 },
  { code: '26', name: 'المدية', shipping: 600 },
  { code: '27', name: 'مستغانم', shipping: 600 },
  { code: '28', name: 'المسيلة', shipping: 600 },
  { code: '29', name: 'معسكر', shipping: 600 },
  { code: '30', name: 'ورقلة', shipping: 700 },
  { code: '31', name: 'وهران', shipping: 600 },
  { code: '32', name: 'البيض', shipping: 700 },
  { code: '33', name: 'إليزي', shipping: 900 },
  { code: '34', name: 'برج بوعريريج', shipping: 600 },
  { code: '35', name: 'بومرداس', shipping: 500 },
  { code: '36', name: 'الطارف', shipping: 600 },
  { code: '37', name: 'تندوف', shipping: 900 },
  { code: '38', name: 'تيسمسيلت', shipping: 600 },
  { code: '39', name: 'الوادي', shipping: 700 },
  { code: '40', name: 'خنشلة', shipping: 600 },
  { code: '41', name: 'سوق أهراس', shipping: 600 },
  { code: '42', name: 'تيبازة', shipping: 500 },
  { code: '43', name: 'ميلة', shipping: 600 },
  { code: '44', name: 'عين الدفلى', shipping: 600 },
  { code: '45', name: 'النعامة', shipping: 700 },
  { code: '46', name: 'عين تموشنت', shipping: 600 },
  { code: '47', name: 'غرداية', shipping: 700 },
  { code: '48', name: 'غليزان', shipping: 600 },
  { code: '49', name: 'المغير', shipping: 700 },
  { code: '50', name: 'المنيعة', shipping: 800 },
  { code: '51', name: 'أولاد جلال', shipping: 700 },
  { code: '52', name: 'برج باجي مختار', shipping: 1000 },
  { code: '53', name: 'بني عباس', shipping: 800 },
  { code: '54', name: 'تيميمون', shipping: 800 },
  { code: '55', name: 'تقرت', shipping: 700 },
  { code: '56', name: 'جانت', shipping: 1000 },
  { code: '57', name: 'إين صالح', shipping: 900 },
  { code: '58', name: 'إين قزام', shipping: 1000 }
];

export default function ProductLandingPage({ product, onBack }) {
  const { createOrder } = useStore();
  
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedWilaya, setSelectedWilaya] = useState(WILAYAS[15].name); // الجزائر العاصمة
  const [baladiya, setBaladiya] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const currentWilayaObj = WILAYAS.find(w => w.name === selectedWilaya) || WILAYAS[15];
  const shippingFee = currentWilayaObj.shipping;
  const oldPrice = product.price ? product.price * 1.3 : 0;
  const productTotal = product.price * quantity;
  const grandTotal = productTotal + shippingFee;

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    if (!fullName || !phone || !baladiya) {
      alert('يرجى ملا جميع البيانات المطلوب إدخالها');
      return;
    }

    createOrder({
      fullName,
      phone,
      wilaya: selectedWilaya,
      baladiya,
      quantity,
      productName: product.name,
      grandTotal
    });

    setOrderSuccess(true);
  };

  if (orderSuccess) {
    return (
      <div className="min-h-screen bg-rose-50/50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-3xl shadow-xl max-w-lg w-full text-center border border-rose-100">
          <div className="bg-green-100 text-green-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
            <CheckCircle className="w-10 h-10"/>
          </div>
          <h2 className="text-2xl font-black text-gray-800 mb-2">تم تسجيل طلبك بنجاح!</h2>
          <p className="text-gray-600 text-sm mb-6 leading-relaxed">
            شكراً لك أخي/أختي <b>{fullName}</b>.<br />
            سيتصل بك فريقنا قريباً على الرقم <b>{phone}</b> لتأكيد الطلبية قبل شحنها لـ <b>{selectedWilaya}</b>.
          </p>
          <button
            onClick={onBack}
            className="w-full bg-rose-600 text-white font-bold py-3.5 rounded-2xl hover:bg-rose-700 transition shadow-md"
          >
            العودة للتصفح
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-5xl mx-auto">
        
        {/* زر العودة */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-rose-600 font-bold mb-6 transition"
        >
          <ArrowRight className="w-5 h-5"/> العودة إلى المنتجات
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100">
          
          {/* قسم العرض والصور */}
          <div>
            <div className="relative rounded-2xl overflow-hidden mb-4 border border-gray-100 shadow-inner">
              <img src={product.image} alt={product.name} className="w-full h-80 md:h-96 object-cover" />
              <span className="absolute top-4 right-4 bg-rose-600 text-white text-xs font-black px-3.5 py-1.5 rounded-full shadow-lg flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5"/> عرض محدود
              </span>
            </div>

            <h1 className="text-2xl md:text-3xl font-black text-gray-900 mb-3">{product.name}</h1>
            
            <div className="flex items-center gap-3 mb-6 bg-rose-50/60 p-3 rounded-2xl border border-rose-100 w-fit">
              <span className="text-3xl font-black text-rose-600">{product.price} د.ج</span>
              <span className="text-sm text-gray-400 line-through">{Math.round(oldPrice)} د.ج</span>
              <span className="text-xs bg-rose-600 text-white font-bold px-2 py-1 rounded-lg">خصم 30%</span>
            </div>

            <p className="text-gray-600 text-sm leading-relaxed mb-6 bg-gray-50 p-4 rounded-2xl border border-gray-100">
              {product.description || 'منتج أصلي ذو جودة عالية ومضمون 100%. التوصيل مجرب وسريع إلى غاية باب المنزل مع إمكانية المعاينة قبل الدفع.'}
            </p>

            <div className="space-y-3 border-t border-gray-100 pt-5">
              <div className="flex items-center gap-3 text-xs font-bold text-gray-700">
                <Truck className="w-5 h-5 text-rose-600 shrink-0"/> الدفع يداً بيد عند استلام الطلبية والمعاينة.
              </div>
              <div className="flex items-center gap-3 text-xs font-bold text-gray-700">
                <ShieldCheck className="w-5 h-5 text-rose-600 shrink-0"/> ضمان الجودة مع إمكانية التبديل في حال وجود خلل.
              </div>
              <div className="flex items-center gap-3 text-xs font-bold text-gray-700">
                <Clock className="w-5 h-5 text-rose-600 shrink-0"/> توصيل سريع خلال 24 - 48 ساعة فقط.
              </div>
            </div>
          </div>

          {/* استمارة الطلب للجزائر */}
          <div className="bg-gray-50/80 p-6 rounded-3xl border border-gray-200">
            <div className="text-center mb-6">
              <h3 className="text-xl font-black text-gray-900 mb-1">أدخلي معلوماتك لشراء المنتج</h3>
              <p className="text-xs text-rose-600 font-semibold">التوصيل متوفر لجميع 58 ولاية</p>
            </div>
            
            <form onSubmit={handleSubmitOrder} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">الاسم واللقب *</label>
                <input
                  type="text"
                  required
                  placeholder="مثال: ياسمين بن زهرة"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded-2xl px-4 py-3 text-sm focus:border-rose-500 focus:ring-2 focus:ring-rose-100 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">رقم الهاتف *</label>
                <input
                  type="tel"
                  required
                  placeholder="06XXXXXXXX / 07XXXXXXXX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded-2xl px-4 py-3 text-sm focus:border-rose-500 focus:ring-2 focus:ring-rose-100 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">الولاية *</label>
                  <select
                    value={selectedWilaya}
                    onChange={(e) => setSelectedWilaya(e.target.value)}
                    className="w-full bg-white border border-gray-300 rounded-2xl px-3 py-3 text-sm focus:border-rose-500 focus:outline-none"
                  >
                    {WILAYAS.map((w) => (
                      <option key={w.code} value={w.name}>{w.code} - {w.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">البلدية *</label>
                  <input
                    type="text"
                    required
                    placeholder="اسم البلدية"
                    value={baladiya}
                    onChange={(e) => setBaladiya(e.target.value)}
                    className="w-full bg-white border border-gray-300 rounded-2xl px-4 py-3 text-sm focus:border-rose-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">الكمية المطلوبة</label>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-11 h-11 bg-white border border-gray-300 rounded-xl font-bold text-lg active:scale-95"
                  >-</button>
                  <span className="font-bold text-lg px-2">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-11 h-11 bg-white border border-gray-300 rounded-xl font-bold text-lg active:scale-95"
                  >+</button>
                </div>
              </div>

              {/* حساب التكلفة السلس */}
              <div className="bg-white p-4 rounded-2xl border border-gray-200 space-y-2 text-xs">
                <div className="flex justify-between text-gray-600">
                  <span>سعر المنتج ({quantity}):</span>
                  <span className="font-bold">{productTotal} د.ج</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>شحن إلى ({selectedWilaya}):</span>
                  <span className="font-bold">{shippingFee} د.ج</span>
                </div>
                <div className="border-t pt-2 flex justify-between text-base font-black text-rose-600">
                  <span>المبلغ الإجمالي عند الدفع:</span>
                  <span>{grandTotal} د.ج</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-rose-600 text-white font-black py-4 rounded-2xl hover:bg-rose-700 transition shadow-lg shadow-rose-200 text-base active:scale-95"
              >
                تأكيد الطلبية الآن 🛒
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
