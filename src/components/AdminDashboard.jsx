import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { LayoutDashboard, ShoppingBag, Image, Plus, Trash2, ArrowRight, Package } from 'lucide-react';

export default function AdminDashboard({ onClose }) {
  const { products, setProducts, banners, addBanner, deleteBanner, orders } = useStore();
  const [activeTab, setActiveTab] = useState('products'); // 'products', 'banners', 'orders'

  // --- 1. حالة نموذج إضافة منتج جديد ---
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productCategory, setProductCategory] = useState('العناية بالبشرة');
  const [productDescription, setProductDescription] = useState('');
  const [productImage, setProductImage] = useState('');

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!productName || !productPrice || !productImage) {
      alert('يرجى ملء كافة الخانات الأساسية للمنتج (الاسم، السعر، ورابط الصورة)');
      return;
    }

    const newProduct = {
      id: Date.now().toString(),
      name: productName,
      price: Number(productPrice),
      category: productCategory,
      description: productDescription,
      image: productImage,
      rating: 4.9
    };

    setProducts([newProduct, ...products]);
    setProductName('');
    setProductPrice('');
    setProductDescription('');
    setProductImage('');
    alert('تمت إضافة المنتج بنجاح إلى المتجر!');
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm('هل أنت تأكد من رغبتك في حذف هذا المنتج؟')) {
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  // --- 2. حالة نموذج إضافة بانر إشهاري جديد ---
  const [bannerTitle, setBannerTitle] = useState('');
  const [bannerSubtitle, setBannerSubtitle] = useState('');
  const [bannerBadge, setBannerBadge] = useState('');
  const [bannerImage, setBannerImage] = useState('');

  const handleAddBanner = (e) => {
    e.preventDefault();
    if (!bannerTitle || !bannerImage) {
      alert('يرجى إدخال عنوان الإعلان ورابط الصورة');
      return;
    }

    addBanner({
      title: bannerTitle,
      subtitle: bannerSubtitle,
      badge: bannerBadge,
      image: bannerImage
    });

    setBannerTitle('');
    setBannerSubtitle('');
    setBannerBadge('');
    setBannerImage('');
    alert('تمت إضافة الإعلان بنجاح للواجهة!');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
        
        {/* هيدر لوحة التحكم */}
        <div className="bg-gray-900 text-white p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <LayoutDashboard className="w-6 h-6 text-rose-500" />
            <h1 className="text-xl font-bold">لوحة تحكم المتجر الإدارية</h1>
          </div>
          <button
            onClick={onClose}
            className="flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition"
          >
            <ArrowRight className="w-4 h-4" /> العودة للمتجر
          </button>
        </div>

        {/* أزرار التنقل بين التبويبات */}
        <div className="flex border-b border-gray-200 bg-gray-50 text-sm font-bold">
          <button
            onClick={() => setActiveTab('products')}
            className={`flex-1 py-4 text-center border-b-2 transition flex items-center justify-center gap-2 ${
              activeTab === 'products' ? 'border-rose-600 text-rose-600 bg-white' : 'text-gray-500 border-transparent'
            }`}
          >
            <ShoppingBag className="w-4 h-4" /> إدارة المنتجات ({products.length})
          </button>
          
          <button
            onClick={() => setActiveTab('banners')}
            className={`flex-1 py-4 text-center border-b-2 transition flex items-center justify-center gap-2 ${
              activeTab === 'banners' ? 'border-rose-600 text-rose-600 bg-white' : 'text-gray-500 border-transparent'
            }`}
          >
            <Image className="w-4 h-4" /> الإعلانات والبانرات ({banners ? banners.length : 0})
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`flex-1 py-4 text-center border-b-2 transition flex items-center justify-center gap-2 ${
              activeTab === 'orders' ? 'border-rose-600 text-rose-600 bg-white' : 'text-gray-500 border-transparent'
            }`}
          >
            <Package className="w-4 h-4" /> الطلبيات ({orders.length})
          </button>
        </div>

        {/* --- التبويب الأول: إدارة المنتجات (إضافة وحذف) --- */}
        {activeTab === 'products' && (
          <div className="p-6 space-y-8">
            <div className="bg-rose-50/50 border border-rose-100 p-6 rounded-2xl">
              <h3 className="text-base font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Plus className="w-5 h-5 text-rose-600" /> إضافة منتج جديد
              </h3>
              
              <form onSubmit={handleAddProduct} className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-bold mb-1 text-gray-700">اسم المنتج *</label>
                  <input
                    type="text"
                    required
                    placeholder="مثال: سيروم العناية بالبشرة"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    className="w-full border rounded-xl p-3 focus:outline-none focus:border-rose-600"
                  />
                </div>

                <div>
                  <label className="block font-bold mb-1 text-gray-700">السعر (د.ج) *</label>
                  <input
                    type="number"
                    required
                    placeholder="3500"
                    value={productPrice}
                    onChange={(e) => setProductPrice(e.target.value)}
                    className="w-full border rounded-xl p-3 focus:outline-none focus:border-rose-600"
                  />
                </div>

                <div>
                  <label className="block font-bold mb-1 text-gray-700">التصنيف</label>
                  <select
                    value={productCategory}
                    onChange={(e) => setProductCategory(e.target.value)}
                    className="w-full border rounded-xl p-3 focus:outline-none focus:border-rose-600 bg-white"
                  >
                    <option value="العناية بالبشرة">العناية بالبشرة</option>
                    <option value="المكياج">المكياج</option>
                    <option value="العطور">العطور</option>
                    <option value="العناية بالشعر">العناية بالشعر</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold mb-1 text-gray-700">رابط صورة المنتج (URL) *</label>
                  <input
                    type="url"
                    required
                    placeholder="https://..."
                    value={productImage}
                    onChange={(e) => setProductImage(e.target.value)}
                    className="w-full border rounded-xl p-3 focus:outline-none focus:border-rose-600"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block font-bold mb-1 text-gray-700">الوصف</label>
                  <textarea
                    rows="2"
                    placeholder="وصف مختصر ومميزات المنتج..."
                    value={productDescription}
                    onChange={(e) => setProductDescription(e.target.value)}
                    className="w-full border rounded-xl p-3 focus:outline-none focus:border-rose-600"
                  />
                </div>

                <div className="md:col-span-2">
                  <button
                    type="submit"
                    className="bg-rose-600 text-white font-bold py-3 px-6 rounded-xl hover:bg-rose-700 transition"
                  >
                    إضافة المنتج فوراً
                  </button>
                </div>
              </form>
            </div>

            {/* قائمة المنتجات الحالية */}
            <div>
              <h3 className="text-base font-bold text-gray-800 mb-4">المنتجات المعروضة حالياً ({products.length})</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {products.map((p) => (
                  <div key={p.id} className="border rounded-2xl overflow-hidden flex flex-col justify-between bg-white shadow-sm">
                    <img src={p.image} alt={p.name} className="w-full h-40 object-cover" />
                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] bg-rose-50 text-rose-600 font-bold px-2 py-0.5 rounded-full">{p.category}</span>
                        <h4 className="font-bold text-sm text-gray-800 mt-1">{p.name}</h4>
                        <p className="text-rose-600 font-bold text-sm mt-1">{p.price} د.ج</p>
                      </div>
                      <button
                        onClick={() => handleDeleteProduct(p.id)}
                        className="text-xs text-red-600 font-bold flex items-center gap-1 hover:underline mt-3"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> حذف المنتج
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* --- التبويب الثاني: إدارة الإعلانات والبانرات --- */}
        {activeTab === 'banners' && (
          <div className="p-6 space-y-8">
            <div className="bg-rose-50/50 border border-rose-100 p-6 rounded-2xl">
              <h3 className="text-base font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Plus className="w-5 h-5 text-rose-600" /> إضافة بانر إشهاري جديد
              </h3>
              
              <form onSubmit={handleAddBanner} className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-bold mb-1 text-gray-700">عنوان الإعلان *</label>
                  <input
                    type="text"
                    required
                    placeholder="مثال: أفضل تخفيضات نهاية الصيف"
                    value={bannerTitle}
                    onChange={(e) => setBannerTitle(e.target.value)}
                    className="w-full border rounded-xl p-3 focus:outline-none focus:border-rose-600"
                  />
                </div>

                <div>
                  <label className="block font-bold mb-1 text-gray-700">شارة علوية (اختياري)</label>
                  <input
                    type="text"
                    placeholder="مثال: خصم 30% أو عرض خاص"
                    value={bannerBadge}
                    onChange={(e) => setBannerBadge(e.target.value)}
                    className="w-full border rounded-xl p-3 focus:outline-none focus:border-rose-600"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block font-bold mb-1 text-gray-700">رابط صورة الإعلان (URL) *</label>
                  <input
                    type="url"
                    required
                    placeholder="ضع رابط صورة الإعلان الكبيرة هنا"
                    value={bannerImage}
                    onChange={(e) => setBannerImage(e.target.value)}
                    className="w-full border rounded-xl p-3 focus:outline-none focus:border-rose-600"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block font-bold mb-1 text-gray-700">الوصف أو الشرح التفصيلي</label>
                  <input
                    type="text"
                    placeholder="مثال: استفد من الخصم المميز وتوصيل سريع لكافة الولايات"
                    value={bannerSubtitle}
                    onChange={(e) => setBannerSubtitle(e.target.value)}
                    className="w-full border rounded-xl p-3 focus:outline-none focus:border-rose-600"
                  />
                </div>

                <div className="md:col-span-2">
                  <button
                    type="submit"
                    className="bg-rose-600 text-white font-bold py-3 px-6 rounded-xl hover:bg-rose-700 transition"
                  >
                    حفظ ونشر الإعلان فوراً
                  </button>
                </div>
              </form>
            </div>

            {/* قائمة البانرات الحالية */}
            <div>
              <h3 className="text-base font-bold text-gray-800 mb-4">الإعلانات النشطة حالياً ({banners ? banners.length : 0})</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {banners && banners.map((b) => (
                  <div key={b.id} className="border border-gray-200 rounded-2xl overflow-hidden flex bg-white shadow-sm">
                    <img src={b.image} alt={b.title} className="w-32 h-32 object-cover shrink-0" />
                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        {b.badge && <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded-full">{b.badge}</span>}
                        <h4 className="font-bold text-sm text-gray-800 mt-1">{b.title}</h4>
                        <p className="text-xs text-gray-500 line-clamp-1">{b.subtitle}</p>
                      </div>
                      <button
                        onClick={() => deleteBanner(b.id)}
                        className="text-xs text-red-600 font-bold flex items-center gap-1 hover:underline mt-2"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> حذف الإعلان
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* --- التبويب الثالث: الطلبيات --- */}
        {activeTab === 'orders' && (
          <div className="p-6">
            <h3 className="text-base font-bold mb-4">طلبات الشراء المسجلة</h3>
            {orders.length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-8">لا توجد طلبات مسجلة حالياً</p>
            ) : (
              <div className="space-y-3">
                {orders.map((o) => (
                  <div key={o.id} className="border p-4 rounded-xl text-xs space-y-1 bg-gray-50">
                    <div className="flex justify-between font-bold text-sm text-rose-600">
                      <span>الزبون: {o.fullName} ({o.phone})</span>
                      <span>الإجمالي: {o.grandTotal} د.ج</span>
                    </div>
                    <div>المنتج: <b>{o.productName}</b> (الكمية: {o.quantity})</div>
                    <div>العنوان: {o.wilaya} - {o.baladiya} ({o.shippingType})</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
