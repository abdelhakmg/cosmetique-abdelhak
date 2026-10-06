import React, { useState, useContext } from 'react';
import { X, CheckCircle2 } from 'lucide-react';
import { StoreContext } from '../context/StoreContext';
import algeriaWilayas from '../data/algeriaWilayas';

export default function CheckoutModal({ isOpen, onClose }) {
  const { cart, getCartTotal, clearCart } = useContext(StoreContext);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    wilayaCode: '',
    address: '',
    deliveryType: 'home', // 'home' أو 'office'
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const selectedWilaya = algeriaWilayas.find(
    (w) => String(w.code) === String(formData.wilayaCode)
  );

  const shippingCost = selectedWilaya
    ? formData.deliveryType === 'home'
      ? selectedWilaya.homeFee
      : selectedWilaya.deskFee
    : 0;

  const totalAmount = getCartTotal() + shippingCost;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      clearCart();
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 left-4 text-gray-400 hover:text-gray-600 p-1"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <div className="p-8 text-center space-y-4">
            <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto" />
            <h3 className="text-2xl font-bold text-gray-800">تم تسجيل طلبك بنجاح!</h3>
            <p className="text-gray-600">
              شكراً لتسوقك من **Cos Abdelhak**. سنتصل بك قريباً لتأكيد الطلب والشحن.
            </p>
            <button
              onClick={() => {
                setIsSubmitted(false);
                onClose();
              }}
              className="bg-pink-600 text-white px-6 py-2.5 rounded-xl font-medium hover:bg-pink-700"
            >
              العودة للمتجر
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <h3 className="text-xl font-bold text-gray-800 mb-4">معلومات إتمام الطلب</h3>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">الاسم الكامل *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:outline-none"
                placeholder="عبد الحق..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">رقم الهاتف *</label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:outline-none"
                placeholder="06XXXXXXXX"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">الولاية *</label>
              <select
                required
                value={formData.wilayaCode}
                onChange={(e) => setFormData({ ...formData, wilayaCode: e.target.value })}
                className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:outline-none"
              >
                <option value="">اختر الولاية</option>
                {algeriaWilayas.map((w) => (
                  <option key={w.code} value={w.code}>
                    {w.code} - {w.name}
                  </option>
                ))}
              </select>
            </div>

            {formData.wilayaCode && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">نوع الشحن</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, deliveryType: 'home' })}
                    className={`py-2 px-3 rounded-xl border text-sm font-medium ${
                      formData.deliveryType === 'home'
                        ? 'border-pink-600 bg-pink-50 text-pink-600'
                        : 'border-gray-200 text-gray-600'
                    }`}
                  >
                    للمنزل ({selectedWilaya?.homeFee} د.ج)
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, deliveryType: 'office' })}
                    className={`py-2 px-3 rounded-xl border text-sm font-medium ${
                      formData.deliveryType === 'office'
                        ? 'border-pink-600 bg-pink-50 text-pink-600'
                        : 'border-gray-200 text-gray-600'
                    }`}
                  >
                    للأجانس ({selectedWilaya?.deskFee} د.ج)
                  </button>
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">العنوان التفصيلي</label>
              <textarea
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                rows="2"
                className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:outline-none"
                placeholder="الحي، الشارع..."
              />
            </div>

            {/* ملخص السعر */}
            <div className="bg-gray-50 p-4 rounded-xl space-y-2 text-sm border">
              <div className="flex justify-between text-gray-600">
                <span>مجموع المنتجات:</span>
                <span>{getCartTotal()} د.ج</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>تكلفة الشحن:</span>
                <span>{shippingCost} د.ج</span>
              </div>
              <div className="flex justify-between font-bold text-base text-gray-900 border-t pt-2">
                <span>الإجمالي:</span>
                <span className="text-pink-600">{totalAmount} د.ج</span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-pink-600 hover:bg-pink-700 text-white py-3 rounded-xl font-bold transition-colors"
            >
              تأكيد الطلب
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
