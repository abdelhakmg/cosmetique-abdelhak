import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Plus, Trash2, ShoppingBag, Package, LogOut, Lock } from 'lucide-react';

export default function AdminDashboard({ onClose }) {
  const { products, setProducts, orders } = useStore();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('products');

  // بيانات المنتج الجديد
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    category: 'العناية بالبشرة',
    description: '',
    image: '',
    rating: 5.0
  });

  // كلمة السر الافتراضية للدخول (يمكنك تغييرها هنا)
  const ADMIN_PASSWORD = '123';

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
    } else {
      alert('كلمة المرور غير صحيحة!');
    }
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price) {
      alert('يرجى ملء الاسم والسعر على الأقل');
      return;
    }

    const itemToAdd = {
      ...newProduct,
      id: `prod-${Date.now()}`,
      price: Number(newProduct.price),
      image: newProduct.image || 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=600'
    };

    setProducts((prev) => [itemToAdd, ...prev]);
    setNewProduct({ name: '', price: '', category: 'العناية بالبشرة', description: '', image: '', rating: 5.0 });
    alert('تمت إضافة المنتج بنجاح!');
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm('هل أنت تأكد من حذف هذا المنتج؟')) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
    }
  };

  // شاشة تسجيل الدخول للوحة التحكم
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-3xl shadow-xl max-w-md w-full border border-gray-100 text-center">
          <div className="bg-rose-100 text-rose-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black text-gray-800 mb-2">لوحة التحكم الإدارية</h2>
          <p className="text-sm text-gray-500 mb-6">أدخل كلمة المرور للوصول لإدارة المتجر</p>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              placeholder="كلمة المرور (الافتراضية: 123)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 text-center text-lg focus:outline-none focus:border-rose-500"
            />
            <button
              type="submit"
              className="w-full bg-rose-600 text-white font-bold py-3 rounded-2xl hover:bg-rose-700 transition"
            >
              دخول
            </button>
          </form>
          <button onClick={onClose} className="mt-4 text-xs text-gray-400 hover:underline">العودة لللمتجر</button>
        </div>
      </div>
    );
  }

  // الشاشة الرئيسية للوحة التحكم
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* الهيدر العلوي للوحة */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-wrap justify-between items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-black text-gray-900">إدارة المتجر</h1>
            <p className="text-xs text-gray-500">التحكم بالمنتجات ومشاهدة طلبات الزبائن</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('products')}
              className={`px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 ${
                activeTab === 'products' ? 'bg-rose-600 text-white' : 'bg-gray-100 text-gray-700'
              }`}
            >
              <Package className="w-4 h-4" /> المنتجات ({products.length})
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 ${
                activeTab === 'orders' ? 'bg-rose-600 text-white' : 'bg-gray-100 text-gray-700'
              }`}
            >
              <ShoppingBag className="w-4 h-4" /> الطلبات ({orders ? orders.length : 0})
            </button>
            <button
              onClick={onClose}
              className="bg-gray-200 text-gray-700 p-2.5 rounded-xl hover:bg-gray-300"
              title="خروج"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* تبويب المنتجات */}
        {activeTab === 'products' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* نموذج إضافة منتج */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 h-fit">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Plus className="w-5 h-5 text-rose-600" /> إضافة منتج جديد
              </h3>
              <form onSubmit={handleAddProduct} className="space-y-4 text-sm">
                <div>
                  <label className="block text-gray-600 font-medium mb-1">اسم المنتج</label>
                  <input
                    type="text"
                    required
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:border-rose-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-600 font-medium mb-1">السعر (د.ج)</label>
                  <input
                    type="number"
                    required
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:border-rose-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-600 font-medium mb-1">التصنيف</label>
                  <select
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:border-rose-500"
                  >
                    <option value="العناية بالبشرة">العناية بالبشرة</option>
                    <option value="مكياج">مكياج</option>
                    <option value="العطور">العطور</option>
                    <option value="العناية بالشعر">العناية بالشعر</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-600 font-medium mb-1">رابط صورة المنتج (URL)</label>
                  <input
                    type="text"
                    placeholder="https://..."
                    value={newProduct.image}
                    onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:border-rose-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-600 font-medium mb-1">وصف المنتج</label>
                  <textarea
                    rows="3"
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:border-rose-500"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-rose-600 text-white font-bold py-3 rounded-xl hover:bg-rose-700 transition"
                >
                  حفظ ونشر المنتج
                </button>
              </form>
            </div>

            {/* قائمة المنتجات الحالية */}
            <div className="lg:col-span-2 bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-800 mb-4">قائمة المنتجات الحالية</h3>
              <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
                {products.map((item) => (
                  <div key={item.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-2xl border border-gray-100">
                    <div className="flex items-center gap-3">
                      <img src={item.image} alt="" className="w-12 h-12 rounded-xl object-cover" />
                      <div>
                        <h4 className="font-bold text-gray-800 text-sm">{item.name}</h4>
                        <p className="text-xs text-rose-600 font-bold">{item.price} د.ج | <span className="text-gray-400">{item.category}</span></p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDeleteProduct(item.id)}
                      className="text-red-500 hover:bg-red-50 p-2 rounded-xl transition"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* تبويب الطلبات الواردة */}
        {activeTab === 'orders' && (
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-800 mb-4">طلبات الزبائن الواردة</h3>
            {orders && orders.length > 0 ? (
              <div className="space-y-4">
                {orders.map((ord) => (
                  <div key={ord.id} className="border border-gray-200 p-4 rounded-2xl bg-gray-50/50">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-bold text-rose-600">{ord.id}</span>
                      <span className="text-xs text-gray-400">{new Date(ord.createdAt).toLocaleString('ar-DZ')}</span>
                    </div>
                    <div className="text-sm font-semibold text-gray-800 mb-1">
                      الزبون: {ord.fullName || ord.name} | الهاتف: {ord.phone} | الولاية: {ord.wilaya}
                    </div>
                    <div className="text-xs text-gray-600">
                      المنتجات: {ord.items ? ord.items.map(i => `${i.name} (x${i.quantity})`).join(', ') : 'تفاصيل الطلب'}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-400 py-8">لا توجد طلبات واردة حالياً</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
