import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { LayoutDashboard, ShoppingBag, FolderPlus, MapPin, Settings, Package, Plus, Trash2, ArrowRight } from 'lucide-react';

export default function AdminDashboard({ onClose }) {
  const {
    products, addProduct, deleteProduct,
    categories, addCategory, deleteCategory,
    wilayas, addWilaya, deleteWilaya,
    settings, updateSettings,
    orders
  } = useStore();

  const [activeTab, setActiveTab] = useState('products'); // 'products', 'categories', 'settings', 'wilayas', 'orders'

  // 1. نموذج إضافة منتج مع صور متعددة
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productCategory, setProductCategory] = useState(categories[0]?.name || 'كوسمتيك');
  const [productDescription, setProductDescription] = useState('');
  const [productImages, setProductImages] = useState(['', '']); // صورتين أو أكثر

  const handleAddProduct = (e) => {
    e.preventDefault();
    const validImages = productImages.filter(img => img.trim() !== '');
    if (!productName || !productPrice || validImages.length === 0) {
      alert('يرجى إدخال اسم المنتج، السعر، وصورة واحدة على الأقل');
      return;
    }

    addProduct({
      name: productName,
      price: Number(productPrice),
      category: productCategory,
      description: productDescription,
      images: validImages,
      rating: 4.9
    });

    setProductName('');
    setProductPrice('');
    setProductDescription('');
    setProductImages(['', '']);
    alert('تمت إضافة المنتج بنجاح مع صوره!');
  };

  // 2. نموذج إضافة تصنيف دائري جديد
  const [catName, setCatName] = useState('');
  const [catImage, setCatImage] = useState('');

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (!catName || !catImage) {
      alert('يرجى كتابة اسم الفئة ووضع رابط الصورة الدائرية');
      return;
    }
    addCategory(catName, catImage);
    setCatName('');
    setCatImage('');
    alert('تمت إضافة الفئة الجديدة بنجاح!');
  };

  // 3. نموذج تعديل إعدادات وروابط الصفحات
  const [settingsForm, setSettingsForm] = useState({ ...settings });

  const handleSaveSettings = (e) => {
    e.preventDefault();
    updateSettings(settingsForm);
    alert('تم حفظ وتحديث إعدادات المتجر ومعلومات التواصل بنجاح!');
  };

  // 4. نموذج إضافة ولاية وسعر الشحن
  const [wilayaCode, setWilayaCode] = useState('');
  const [wilayaName, setWilayaName] = useState('');
  const [wilayaHome, setWilayaHome] = useState('');
  const [wilayaDesk, setWilayaDesk] = useState('');

  const handleAddWilaya = (e) => {
    e.preventDefault();
    if (!wilayaCode || !wilayaName || !wilayaHome) {
      alert('يرجى ملء رمز واسم الولاية وسعر الشحن');
      return;
    }
    addWilaya({
      code: wilayaCode,
      name: wilayaName,
      home: Number(wilayaHome),
      desk: Number(wilayaDesk || wilayaHome)
    });
    setWilayaCode('');
    setWilayaName('');
    setWilayaHome('');
    setWilayaDesk('');
    alert('تمت إضافة الولاية وسعر الشحن بنجاح!');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
        
        {/* هيدر اللوحة */}
        <div className="bg-gray-900 text-white p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <LayoutDashboard className="w-6 h-6 text-rose-500" />
            <div>
              <h1 className="text-xl font-bold">لوحة التحكم الشاملة</h1>
              <p className="text-xs text-gray-400">إدارة كافة إعدادات متجر {settings.storeName}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition"
          >
            <ArrowRight className="w-4 h-4" /> العودة للمتجر
          </button>
        </div>

        {/* أزرار التبويبات */}
        <div className="flex flex-wrap border-b border-gray-200 bg-gray-50 text-xs md:text-sm font-bold">
          <button
            onClick={() => setActiveTab('products')}
            className={`py-3.5 px-4 flex-1 text-center border-b-2 transition flex items-center justify-center gap-1.5 ${
              activeTab === 'products' ? 'border-rose-600 text-rose-600 bg-white' : 'text-gray-500 border-transparent'
            }`}
          >
            <ShoppingBag className="w-4 h-4" /> المنتجات ({products.length})
          </button>

          <button
            onClick={() => setActiveTab('categories')}
            className={`py-3.5 px-4 flex-1 text-center border-b-2 transition flex items-center justify-center gap-1.5 ${
              activeTab === 'categories' ? 'border-rose-600 text-rose-600 bg-white' : 'text-gray-500 border-transparent'
            }`}
          >
            <FolderPlus className="w-4 h-4" /> الفئات الدائرية ({categories.length})
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`py-3.5 px-4 flex-1 text-center border-b-2 transition flex items-center justify-center gap-1.5 ${
              activeTab === 'settings' ? 'border-rose-600 text-rose-600 bg-white' : 'text-gray-500 border-transparent'
            }`}
          >
            <Settings className="w-4 h-4" /> معلومات التواصل والموقع
          </button>

          <button
            onClick={() => setActiveTab('wilayas')}
            className={`py-3.5 px-4 flex-1 text-center border-b-2 transition flex items-center justify-center gap-1.5 ${
              activeTab === 'wilayas' ? 'border-rose-600 text-rose-600 bg-white' : 'text-gray-500 border-transparent'
            }`}
          >
            <MapPin className="w-4 h-4" /> الولايات والشحن ({wilayas.length})
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`py-3.5 px-4 flex-1 text-center border-b-2 transition flex items-center justify-center gap-1.5 ${
              activeTab === 'orders' ? 'border-rose-600 text-rose-600 bg-white' : 'text-gray-500 border-transparent'
            }`}
          >
            <Package className="w-4 h-4" /> الطلبات ({orders.length})
          </button>
        </div>

        {/* 1. تبويب المنتجات (صور متعددة) */}
        {activeTab === 'products' && (
          <div className="p-6 space-y-8">
            <div className="bg-rose-50/50 border border-rose-100 p-6 rounded-2xl">
              <h3 className="text-base font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Plus className="w-5 h-5 text-rose-600" /> إضافة منتج مع صور متعددة
              </h3>
              <form onSubmit={handleAddProduct} className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-bold mb-1">اسم المنتج *</label>
                  <input
                    type="text"
                    required
                    placeholder="اسم المنتج"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    className="w-full border rounded-xl p-3 focus:border-rose-600"
                  />
                </div>

                <div>
                  <label className="block font-bold mb-1">السعر (د.ج) *</label>
                  <input
                    type="number"
                    required
                    placeholder="مثال: 3500"
                    value={productPrice}
                    onChange={(e) => setProductPrice(e.target.value)}
                    className="w-full border rounded-xl p-3 focus:border-rose-600"
                  />
                </div>

                <div>
                  <label className="block font-bold mb-1">اختر الفئة</label>
                  <select
                    value={productCategory}
                    onChange={(e) => setProductCategory(e.target.value)}
                    className="w-full border rounded-xl p-3 bg-white focus:border-rose-600"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold mb-1">صورة رئيسية للمنتج (URL) *</label>
                  <input
                    type="url"
                    required
                    placeholder="https://..."
                    value={productImages[0] || ''}
                    onChange={(e) => {
                      const newImgs = [...productImages];
                      newImgs[0] = e.target.value;
                      setProductImages(newImgs);
                    }}
                    className="w-full border rounded-xl p-3 focus:border-rose-600"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block font-bold mb-1">صور إضافية للمنتج (اختياري)</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <input
                      type="url"
                      placeholder="رابط الصورة الثانية (https://...)"
                      value={productImages[1] || ''}
                      onChange={(e) => {
                        const newImgs = [...productImages];
                        newImgs[1] = e.target.value;
                        setProductImages(newImgs);
                      }}
                      className="w-full border rounded-xl p-2.5"
                    />
                    <input
                      type="url"
                      placeholder="رابط الصورة الثالثة (https://...)"
                      value={productImages[2] || ''}
                      onChange={(e) => {
                        const newImgs = [...productImages];
                        newImgs[2] = e.target.value;
                        setProductImages(newImgs);
                      }}
                      className="w-full border rounded-xl p-2.5"
                    />
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block font-bold mb-1">الوصف</label>
                  <textarea
                    rows="2"
                    placeholder="وصف تفصيلي للمنتج..."
                    value={productDescription}
                    onChange={(e) => setProductDescription(e.target.value)}
                    className="w-full border rounded-xl p-3 focus:border-rose-600"
                  />
                </div>

                <div className="md:col-span-2">
                  <button type="submit" className="bg-rose-600 text-white font-bold py-3 px-6 rounded-xl hover:bg-rose-700">
                    حفظ المنتج
                  </button>
                </div>
              </form>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {products.map((p) => (
                <div key={p.id} className="border rounded-2xl overflow-hidden bg-white p-3 flex gap-3 items-center justify-between">
                  <img src={p.images?.[0] || p.image} alt={p.name} className="w-16 h-16 object-cover rounded-xl shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-xs truncate">{p.name}</h4>
                    <span className="text-rose-600 font-bold text-xs">{p.price} د.ج</span>
                    <span className="text-[10px] text-gray-400 block">({p.images?.length || 1} صور)</span>
                  </div>
                  <button onClick={() => deleteProduct(p.id)} className="text-red-500 p-2 hover:bg-red-50 rounded-lg">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 2. تبويب الفئات الدائرية */}
        {activeTab === 'categories' && (
          <div className="p-6 space-y-6">
            <div className="bg-rose-50/50 border border-rose-100 p-6 rounded-2xl">
              <h3 className="text-base font-bold text-gray-800 mb-4">إضافة فئة دائرية جديدة (هدايا، كوسمتيك، علب...)</h3>
              <form onSubmit={handleAddCategory} className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-bold mb-1">اسم الفئة *</label>
                  <input
                    type="text"
                    required
                    placeholder="مثال: علب هدايا"
                    value={catName}
                    onChange={(e) => setCatName(e.target.value)}
                    className="w-full border rounded-xl p-3"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">رابط صورة الفئة الدائرية (URL) *</label>
                  <input
                    type="url"
                    required
                    placeholder="https://..."
                    value={catImage}
                    onChange={(e) => setCatImage(e.target.value)}
                    className="w-full border rounded-xl p-3"
                  />
                </div>
                <div className="md:col-span-2">
                  <button type="submit" className="bg-rose-600 text-white font-bold py-2.5 px-6 rounded-xl">
                    إضافة الفئة الدائرية
                  </button>
                </div>
              </form>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {categories.map((c) => (
                <div key={c.id} className="border p-3 rounded-2xl flex flex-col items-center gap-2 bg-white text-center">
                  <img src={c.image} alt={c.name} className="w-16 h-16 rounded-full object-cover border" />
                  <span className="font-bold text-xs">{c.name}</span>
                  <button onClick={() => deleteCategory(c.id)} className="text-red-500 text-xs flex items-center gap-1 hover:underline">
                    <Trash2 className="w-3 h-3" /> حذف
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. تبويب الإعدادات والروابط */}
        {activeTab === 'settings' && (
          <form onSubmit={handleSaveSettings} className="p-6 space-y-4 text-xs">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold mb-1">اسم المتجر</label>
                <input
                  type="text"
                  value={settingsForm.storeName}
                  onChange={(e) => setSettingsForm({ ...settingsForm, storeName: e.target.value })}
                  className="w-full border rounded-xl p-3"
                />
              </div>
              <div>
                <label className="block font-bold mb-1">رقم الهاتف للاتصال</label>
                <input
                  type="text"
                  value={settingsForm.phone}
                  onChange={(e) => setSettingsForm({ ...settingsForm, phone: e.target.value })}
                  className="w-full border rounded-xl p-3"
                />
              </div>
              <div>
                <label className="block font-bold mb-1">رقم الواتساب (الصيغة الدولية 213...)</label>
                <input
                  type="text"
                  value={settingsForm.whatsapp}
                  onChange={(e) => setSettingsForm({ ...settingsForm, whatsapp: e.target.value })}
                  className="w-full border rounded-xl p-3"
                />
              </div>
              <div>
                <label className="block font-bold mb-1">رابط صفحة الإنستغرام</label>
                <input
                  type="url"
                  value={settingsForm.instagram}
                  onChange={(e) => setSettingsForm({ ...settingsForm, instagram: e.target.value })}
                  className="w-full border rounded-xl p-3"
                />
              </div>
              <div>
                <label className="block font-bold mb-1">رابط صفحة الفيسبوك</label>
                <input
                  type="url"
                  value={settingsForm.facebook}
                  onChange={(e) => setSettingsForm({ ...settingsForm, facebook: e.target.value })}
                  className="w-full border rounded-xl p-3"
                />
              </div>
              <div>
                <label className="block font-bold mb-1">البريد الإلكتروني للإشعارات</label>
                <input
                  type="email"
                  value={settingsForm.email}
                  onChange={(e) => setSettingsForm({ ...settingsForm, email: e.target.value })}
                  className="w-full border rounded-xl p-3"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block font-bold mb-1">نص الشريط الترويجي الإشهاري بأعلى الموقع</label>
                <input
                  type="text"
                  value={settingsForm.topAnnouncement}
                  onChange={(e) => setSettingsForm({ ...settingsForm, topAnnouncement: e.target.value })}
                  className="w-full border rounded-xl p-3"
                />
              </div>
            </div>
            <button type="submit" className="bg-rose-600 text-white font-bold py-3 px-8 rounded-xl">
              حفظ وتحديث كل المعلومات
            </button>
          </form>
        )}

        {/* 4. تبويب الولايات وأسعار الشحن */}
        {activeTab === 'wilayas' && (
          <div className="p-6 space-y-6">
            <div className="bg-rose-50/50 border border-rose-100 p-6 rounded-2xl">
              <h3 className="text-base font-bold text-gray-800 mb-4">إضافة ولاية جديدة وسعر شحنها</h3>
              <form onSubmit={handleAddWilaya} className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                <input
                  type="text"
                  placeholder="رمز الولاية (مثال: 59)"
                  value={wilayaCode}
                  onChange={(e) => setWilayaCode(e.target.value)}
                  className="border rounded-xl p-2.5"
                />
                <input
                  type="text"
                  placeholder="اسم الولاية"
                  value={wilayaName}
                  onChange={(e) => setWilayaName(e.target.value)}
                  className="border rounded-xl p-2.5"
                />
                <input
                  type="number"
                  placeholder="سعر التوصيل للمنزل"
                  value={wilayaHome}
                  onChange={(e) => setWilayaHome(e.target.value)}
                  className="border rounded-xl p-2.5"
                />
                <input
                  type="number"
                  placeholder="سعر المكتب (اختياري)"
                  value={wilayaDesk}
                  onChange={(e) => setWilayaDesk(e.target.value)}
                  className="border rounded-xl p-2.5"
                />
                <div className="col-span-2 md:col-span-4">
                  <button type="submit" className="bg-rose-600 text-white font-bold py-2.5 px-6 rounded-xl">
                    إضافة الولاية
                  </button>
                </div>
              </form>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
              {wilayas.map((w) => (
                <div key={w.code} className="border p-3 rounded-xl flex justify-between items-center bg-white">
                  <div>
                    <span className="font-bold text-rose-600">{w.code} - {w.name}</span>
                    <p className="text-[11px] text-gray-500">منزل: {w.home} د.ج | مكتب: {w.desk} د.ج</p>
                  </div>
                  <button onClick={() => deleteWilaya(w.code)} className="text-red-500 hover:bg-red-50 p-1.5 rounded-lg">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 5. تبويب الطلبيات */}
        {activeTab === 'orders' && (
          <div className="p-6">
            <h3 className="text-base font-bold mb-4">قائمة الطلبيات المسجلة ({orders.length})</h3>
            {orders.length === 0 ? (
              <p className="text-xs text-gray-500 text-center py-8">لا توجد طلبات مسجلة حالياً</p>
            ) : (
              <div className="space-y-3">
                {orders.map((o) => (
                  <div key={o.id} className="border p-4 rounded-xl text-xs space-y-1 bg-gray-50">
                    <div className="flex justify-between font-bold text-rose-600">
                      <span>الزبون: {o.fullName} ({o.phone})</span>
                      <span>الإجمالي: {o.grandTotal} د.ج</span>
                    </div>
                    <div>المحتوى: <b>{o.productName}</b> (الكمية: {o.quantity})</div>
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
