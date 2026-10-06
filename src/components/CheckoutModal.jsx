import React, { useState } from 'react';
import { X, CheckCircle2 } from 'lucide-react';
import { useStore } from '../context/StoreContext';

const wilayasList = [
  { code: 1, name: 'Adrar - أدرار' },
  { code: 2, name: 'Chlef - الشلف' },
  { code: 3, name: 'Laghouat - الأغواط' },
  { code: 4, name: 'Oum El Bouaghi - أم البواقي' },
  { code: 5, name: 'Batna - باتنة' },
  { code: 6, name: 'Béjaïa - بجاية' },
  { code: 7, name: 'Biskra - بسكرة' },
  { code: 8, name: 'Béchar - بشار' },
  { code: 9, name: 'Blida - البليدة' },
  { code: 10, name: 'Bouira - البويرة' },
  { code: 11, name: 'Tamanrasset - تمنراست' },
  { code: 12, name: 'Tébessa - تبسة' },
  { code: 13, name: 'Tlemcen - تلمسان' },
  { code: 14, name: 'Tiaret - تيارت' },
  { code: 15, name: 'Tizi Ouzou - تيزي وزو' },
  { code: 16, name: 'Alger - الجزائر' },
  { code: 17, name: 'Djelfa - الجلفة' },
  { code: 18, name: 'Jijel - جيجل' },
  { code: 19, name: 'Sétif - سطيف' },
  { code: 20, name: 'Saïda - سعيدة' },
  { code: 21, name: 'Skikda - سكيكدة' },
  { code: 22, name: 'Sidi Bel Abbès - سيدي بلعباس' },
  { code: 23, name: 'Annaba - عنابة' },
  { code: 24, name: 'Guelma - قالمة' },
  { code: 25, name: 'Constantine - قسنطينة' },
  { code: 26, name: 'Médéa - المدية' },
  { code: 27, name: 'Mostaganem - مستغانم' },
  { code: 28, name: 'M\'Sila - المسيلة' },
  { code: 29, name: 'Mascara - معسكر' },
  { code: 30, name: 'Ouargla - ورقلة' },
  { code: 31, name: 'Oran - وهران' },
  { code: 32, name: 'El Bayadh - البيض' },
  { code: 33, name: 'Illizi - إليزي' },
  { code: 34, name: 'Bordj Bou Arreridj - برج بوعريريج' },
  { code: 35, name: 'Boumerdès - بومرداس' },
  { code: 36, name: 'El Tarf - الطارف' },
  { code: 37, name: 'Tindouf - تندوف' },
  { code: 38, name: 'Tissemsilt - تسمسيلت' },
  { code: 39, name: 'El Oued - الوادي' },
  { code: 40, name: 'Khenchela - خنشلة' },
  { code: 41, name: 'Souk Ahras - سوق أهراس' },
  { code: 42, name: 'Tipaza - تيبازة' },
  { code: 43, name: 'Mila - ميلة' },
  { code: 44, name: 'Aïn Defla - عين الدفلى' },
  { code: 45, name: 'Naâma - النعامة' },
  { code: 46, name: 'Aïn Témouchent - عين تموشنت' },
  { code: 47, name: 'Ghardaïa - غرداية' },
  { code: 48, name: 'Relizane - غليزان' },
  { code: 49, name: 'El M\'Ghair - المغير' },
  { code: 50, name: 'El Meniaa - المنيعة' },
  { code: 51, name: 'Ouled Djellal - أولاد جلال' },
  { code: 52, name: 'Bordj Baji Mokhtar - برج باجي مختار' },
  { code: 53, name: 'Béni Abbès - بني عباس' },
  { code: 54, name: 'Timimoun - تيميمون' },
  { code: 55, name: 'Touggourt - تقرت' },
  { code: 56, name: 'Djanet - جانت' },
  { code: 57, name: 'In Salah - عين صالح' },
  { code: 58, name: 'In Guezzam - عين قزام' }
];

export default function CheckoutModal({ isOpen, onClose }) {
  const { cart, getCartTotal, clearCart } = useStore();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    wilayaCode: '',
    address: '',
    deliveryType: 'home'
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      clearCart();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 relative">
        <button onClick={onClose} className="absolute top-4 left-4 text-gray-400 hover:text-gray-600">
          <X className="w-6 h-6" />
        </button>

        {isSubmitted ? (
          <div className="text-center py-8">
            <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-800 mb-2">تم إرسال طلبك بنجاح!</h3>
            <p className="text-gray-600 mb-6">سنتصل بك قريباً لتأكيد الطلب والشحن.</p>
            <button
              onClick={() => { setIsSubmitted(false); onClose(); }}
              className="bg-rose-600 text-white px-6 py-2 rounded-xl font-medium hover:bg-rose-700"
            >
              إغلاق
            </button>
          </div>
        ) : (
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-4">إتمام الطلب</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">الاسم الكامل</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full border border-gray-300 rounded-xl p-2.5 text-sm"
                  placeholder="أدخل اسمك الكافي"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">رقم الهاتف</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full border border-gray-300 rounded-xl p-2.5 text-sm"
                  placeholder="06XXXXXXXX"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">الولاية</label>
                <select
                  required
                  value={formData.wilayaCode}
                  onChange={(e) => setFormData({ ...formData, wilayaCode: e.target.value })}
                  className="w-full border border-gray-300 rounded-xl p-2.5 text-sm"
                >
                  <option value="">اختر الولاية</option>
                  {wilayasList.map((w) => (
                    <option key={w.code} value={w.code}>
                      {w.code} - {w.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">العنوان التفصيلي</label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full border border-gray-300 rounded-xl p-2.5 text-sm"
                  placeholder="البلدية، الحي..."
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-rose-600 text-white py-3 rounded-xl font-medium hover:bg-rose-700 transition"
                >
                  تأكيد الطلب ({getCartTotal ? getCartTotal() : 0} د.ج)
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
