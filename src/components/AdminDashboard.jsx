import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { LayoutDashboard, ShoppingBag, FolderPlus, MapPin, Settings, Package, Plus, Trash2, Edit3, Image, ArrowRight, CheckCircle2, Truck, XCircle, Gift } from 'lucide-react';

export default function AdminDashboard({ onClose }) {
  const {
    products, addProduct, updateProduct, deleteProduct,
    categories, addCategory, deleteCategory,
    wilayas, addWilaya, deleteWilaya,
    settings, updateSettings,
    banners, addBanner, deleteBanner,
    orders, updateOrderStatus, deleteOrder
  } = useStore();

  const [activeTab, setActiveTab] = useState('products');

  // المنتجات
  const [editingProductId, setEditingProductId] = useState(null);
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productCategory, setProductCategory] = useState(categories[0]?.name || 'كوسمتيك');
  const [productDescription, setProductDescription] = useState('');
  const [productImages, setProductImages] = useState(['', '']);

  const startEditProduct = (p) => {
    setEditingProductId(p.id);
    setProductName(p.name);
    setProductPrice(p.price);
    setProductCategory(p.category || 'كوسمتيك');
    setProductDescription(p.description || '');
    setProductImages(p.images && p.images.length > 0 ? [...p.images] : [p.image || '', '']);
  };

  const resetProductForm = () => {
    setEditingProductId(null);
    setProductName('');
    setProductPrice('');
    setProductDescription('');
    setProductImages(['', '']);
  };

  const handleSaveProduct = (e) => {
    e.preventDefault();
    const validImages = productImages.filter((img) => img.trim() !== '');
    if (!productName || !productPrice || validImages.length === 0) {
      alert('يرجى إدخال اسم المنتج، السعر، وصورة واحدة على الأقل');
      return;
    }

    const pData = {
      name: productName,
      price: Number(productPrice),
      category: productCategory,
      description: productDescription,
      images: validImages,
      rating: 4.9
    };

    if (editingProductId) {
      updateProduct(editingProductId, pData);
      alert('تم تعديل المنتج بنجاح!');
    } else {
      addProduct(pData);
      alert('تمت إضافة المنتج بنجاح!');
    }
    resetProductForm();
  };

  // البانرات الإشهارية
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
    alert('تمت إضافة الإعلان بنجاح!');
  };

  // الفئات
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
    alert('تمت إضافة الفئة بنجاح!');
  };

  // الإعدادات
  const [settingsForm, setSettingsForm] = useState({ ...settings });

  const handleSaveSettings = (e) => {
    e.preventDefault();
    updateSettings(settingsForm);
    alert('تم حفظ إعدادات المتجر بنجاح!');
  };

  // الولايات
  const [wilayaCode, setWilayaCode] = useState('');
  const [wilayaName, setWilayaName] = useState('');
  const [wilayaHome, setWilayaHome] = useState('');
  const [wilayaDesk, setWilayaDesk] = useState('');

  const handleAddWilaya = (e) => {
    e.preventDefault();
    if (!wilayaCode || !wilayaName || !wilayaHome) {
      alert('يرجى ملء كافة الخانات');
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
    alert('تمت إضافة الولاية بنجاح!');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8 font-sans text-gray-800">
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
        
        <div className="bg-gray-900 text-white p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <LayoutDashboard className="w-6 h-6 text-rose-500" />
            <div>
              <h1 className="text-xl font-bold">لوحة التحكم الإدارية الشاملة</h1>
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
            onClick={() => setActiveTab('banners')}
            className={`py-3.5 px-4 flex-1 text-center border-b-2 transition flex items-center justify-center gap-1.5 ${
              activeTab === 'banners' ? 'border-rose-600 text-rose-600 bg-white' : 'text-gray-500 border-transparent'
            }`}
          >
            <Image className="w-4 h-4" /> البانرات ({banners.length})
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`py-3.5 px-4 flex-1 text-center border-b-2 transition flex items-center justify-center gap-1.5 ${
              activeTab === 'orders' ? 'border-rose-600 text-rose-600 bg-white' : 'text-gray-500 border-transparent'
            }`}
          >
            <Package className="w-4 h-4" /> الطلبات ({orders.length})
          </button>

          <button
            onClick={() => setActiveTab('categories')}
            className={`py-3.5 px-4 flex-1 text-center border-b-2 transition flex items-center justify-center gap-1.5 ${
              activeTab === 'categories' ? 'border-rose-600 text-rose-600 bg-white' : 'text-gray-500 border-transparent'
            }`}
          >
            <FolderPlus className="w-4 h-4" /> الفئات ({categories.length})
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`py-3.5 px-4 flex-1 text-center border-b-2 transition flex items-center justify-center gap-1.5 ${
              activeTab === 'settings' ? 'border-rose-600 text-rose-600 bg-white' : 'text-gray-500 border-transparent'
            }`}
          >
            <Settings className="w-4 h-4" /> اللوجو والمعلومات
          </button>

          <button
            onClick={() => setActiveTab('wilayas')}
            className={`py-3.5 px-4 flex-1 text-center border-b-2 transition flex items-center justify-center gap-1.5 ${
              activeTab === 'wilayas' ? 'border-rose-600 text-rose-600 bg-white' : 'text-gray-500 border-transparent'
            }`}
          >
            <MapPin className="w-4 h-4" /> الولايات ({wilayas.length})
          </button>
        </div>

        {/* المنتجات */}
        {activeTab === 'products' && (
          <div className="p-6 space-y-8">
            <div className="bg-rose-50/50 border border-rose-100 p-6 rounded-2xl">
              <h3 className="text-base font-bold text-gray-800 mb-4 flex items-center gap-2">
                {editingProductId ? <Edit3 className="w-5 h-5 text-rose-600" /> : <Plus className="w-5 h-5 text-rose-600" />}
                {editingProductId ? 'تعديل بيانات المنتج الحالية' : 'إضافة منتج جديد'}
              </h3>
              
              <form onSubmit={handleSaveProduct} className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
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
                    placeholder="3500"
                    value={productPrice}
                    onChange={(e) => setProductPrice(e.target.value)}
                    className="w-full border rounded-xl p-3 focus:border-rose-600"
                  />
                </div>

                <div>
                  <label className="block font-bold mb-1">الفئة</label>
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
                  <label className="block font-bold mb-1">صورة رئيسية (URL) *</label>
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
                  <label className="block font-bold mb-1">وصف المنتج</label>
                  <textarea
                    rows="2"
                    placeholder="تفاصيل المنتج..."
                    value={productDescription}
                    onChange={(e) => setProductDescription(e.target.value)}
                    className="w-full border rounded-xl p-3 focus:border-rose-600"
                  />
                </div>

                <div className="md:col-span-2 flex gap-3">
                  <button type="submit" className="bg-rose-600 text-white font-bold py-3 px-6 rounded-xl hover:bg-rose-700">
                    {editingProductId ? 'حفظ والتعديل' : 'إضافة المنتج'}
                  </button>
                  {editingProductId && (
                    <button type="button" onClick={resetProductForm} className="bg-gray-200 text-gray-700 font-bold py-3 px-6 rounded-xl">
                      إلغاء
                    </button>
                  )}
                </div>
              </form>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {products.map((p) => (
                <div key={p.id} className="border rounded-2xl overflow-hidden bg-white p-3 flex flex-col justify-between shadow-sm">
                  <div className="flex gap-3 items-center mb-3">
                    <img src={p.images?.[0] || p.image} alt={p.name} className="w-16 h-16 object-cover rounded-xl shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-xs truncate">{p.name}</h4>
                      <span className="text-rose-600 font-black text-xs">{p.price} د.ج</span>
                      <span className="text-[10px] text-gray-400 block">({p.images?.length || 1} صور)</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center border-t pt-2 text-xs font-bold">
                    <button onClick={() => startEditProduct(p)} className="text-blue-600 hover:bg-blue-50 px-3 py-1.5 rounded-lg flex items-center gap-1">
                      <Edit3 className="w-3.5 h-3.5" /> تعديل
                    </button>
                    <button onClick={() => deleteProduct(p.id)} className="text-red-500 hover:bg-red-50 px-3 py-1.5 rounded-lg flex items-center gap-1">
                      <Trash2 className="w-3.5 h-3.5" /> حذف
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* البانرات */}
        {activeTab === 'banners' && (
          <div className="p-6 space-y-6">
            <div className="bg-rose-50/50 border border-rose-100 p-6 rounded-2xl">
              <h3 className="text-base font-bold text-gray-800 mb-4">إضافة بانر إشهاري جديد</h3>
              <form onSubmit={handleAddBanner} className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-bold mb-1">عنوان الإعلان *</label>
                  <input
                    type="text"
                    required
                    placeholder="مثال: أفضل تخفيضات الموسم"
                    value={bannerTitle}
                    onChange={(e) => setBannerTitle(e.target.value)}
                    className="w-full border rounded-xl p-3"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">شارة علوية</label>
                  <input
                    type="text"
                    placeholder="مثال: خصم 30%"
                    value={bannerBadge}
                    onChange={(e) => setBannerBadge(e.target.value)}
                    className="w-full border rounded-xl p-3"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block font-bold mb-1">رابط صورة الإعلان *</label>
                  <input
                    type="url"
                    required
                    placeholder="https://..."
                    value={bannerImage}
                    onChange={(e) => setBannerImage(e.target.value)}
                    className="w-full border rounded-xl p-3"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block font-bold mb-1">الوصف الشارح</label>
                  <input
                    type="text"
                    placeholder="مثال: استفيدي من خصم مميز وتوصيل سريع"
                    value={bannerSubtitle}
                    onChange={(e) => setBannerSubtitle(e.target.value)}
                    className="w-full border rounded-xl p-3"
                  />
                </div>
                <div className="md:col-span-2">
                  <button type="submit" className="bg-rose-600 text-white font-bold py-3 px-6 rounded-xl">
                    نشر الإعلان
                  </button>
                </div>
              </form>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {banners.map((b) => (
                <div key={b.id} className="border rounded-2xl overflow-hidden flex bg-white shadow-sm">
                  <img src={b.image} alt={b.title} className="w-32 h-32 object-cover shrink-0" />
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      {b.badge && <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded-full">{b.badge}</span>}
                      <h4 className="font-bold text-xs text-gray-800 mt-1">{b.title}</h4>
                      <p className="text-[11px] text-gray-500 line-clamp-1">{b.subtitle}</p>
                    </div>
                    <button onClick={() => deleteBanner(b.id)} className="text-xs text-red-600 font-bold flex items-center gap-1 hover:underline mt-2">
                      <Trash2 className="w-3.5 h-3.5" /> حذف الإعلان
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* الطلبيات التفصيلية */}
        {activeTab === 'orders' && (
          <div className="p-6">
            <h3 className="text-base font-bold mb-4">قائمة الطلبات المباشرة التفصيلية ({orders.length})</h3>
            {orders.length === 0 ? (
              <p className="text-xs text-gray-500 text-center py-8">لا توجد طلبات مسجلة حالياً</p>
            ) : (
              <div className="space-y-4">
                {orders.map((o) => (
                  <div key={o.id} className="border p-4 rounded-2xl text-xs space-y-3 bg-white shadow-sm">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b pb-2">
                      <div>
                        <span className="font-bold text-sm text-gray-900 block">{o.fullName} ({o.phone})</span>
                        <span className="text-[10px] text-gray-400">{o.date}</span>
                      </div>
                      <span className={`px-3 py-1 rounded-full font-bold text-[11px] ${
                        o.status === 'مؤكد' ? 'bg-blue-100 text-blue-700' :
                        o.status === 'جاري التوصيل' ? 'bg-amber-100 text-amber-700' :
                        o.status === 'تم الاستلام' ? 'bg-emerald-100 text-emerald-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        الحالة: {o.status || 'قيد الانتظار'}
                      </span>
                    </div>

                    {/* تفاصيل المنتج المطلوبة */}
                    <div className="bg-rose-50/50 p-3 rounded-xl border border-rose-100 space-y-1 text-gray-800">
                      <div className="font-bold text-rose-600 text-xs flex items-center gap-1">
                        <ShoppingBag className="w-3.5 h-3.5" /> تفاصيل الطلبية: {o.productName}
                      </div>
                      <div>العنوان: <b>{o.wilaya} - {o.baladiya}</b> ({o.shippingType})</div>
                      <div className="text-rose-600 font-black text-sm pt-1">المبلغ الإجمالي: {o.grandTotal} د.ج</div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between border-t pt-3 gap-2">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <button
                          onClick={() => updateOrderStatus(o.id, 'مؤكد')}
                          className="bg-blue-50 text-blue-600 hover:bg-blue-100 font-bold px-3 py-1.5 rounded-xl flex items-center gap-1"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" /> مؤكد
                        </button>
                        <button
                          onClick={() => updateOrderStatus(o.id, 'جاري التوصيل')}
                          className="bg-amber-50 text-amber-600 hover:bg-amber-100 font-bold px-3 py-1.5 rounded-xl flex items-center gap-1"
                        >
                          <Truck className="w-3.5 h-3.5" /> جاري التوصيل
                        </button>
                        <button
                          onClick={() => updateOrderStatus(o.id, 'تم الاستلام')}
                          className="bg-emerald-50 text-emerald-600 hover:bg-emerald-100 font-bold px-3 py-1.5 rounded-xl flex items-center gap-1"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" /> تم الاستلام
                        </button>
                      </div>

                      <button
                        onClick={() => {
                          if (window.confirm('هل أنت تأكد من حذف الطلب؟')) {
                            deleteOrder(o.id);
                          }
                        }}
                        className="text-red-500 hover:bg-red-50 font-bold px-3 py-1.5 rounded-xl flex items-center gap-1"
                      >
                        <XCircle className="w-3.5 h-3.5" /> حذف الطلب
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* الفئات */}
        {activeTab === 'categories' && (
          <div className="p-6 space-y-6">
            <div className="bg-rose-50/50 border border-rose-100 p-6 rounded-2xl">
              <h3 className="text-base font-bold text-gray-800 mb-4">إضافة فئة دائرية جديدة</h3>
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
                  <label className="block font-bold mb-1">رابط صورة الفئة *</label>
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
                    إضافة الفئة
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

        {/* الإعدادات واللوجو */}
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
                <label className="block font-bold mb-1">رابط صورة لوجو المتجر (URL)</label>
                <input
                  type="url"
                  placeholder="https://... (اختياري)"
                  value={settingsForm.logoUrl || ''}
                  onChange={(e) => setSettingsForm({ ...settingsForm, logoUrl: e.target.value })}
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
                <label className="block font-bold mb-1">رابط الإنستغرام</label>
                <input
                  type="url"
                  value={settingsForm.instagram}
                  onChange={(e) => setSettingsForm({ ...settingsForm, instagram: e.target.value })}
                  className="w-full border rounded-xl p-3"
                />
              </div>

              <div>
                <label className="block font-bold mb-1">رابط الفيسبوك</label>
                <input
                  type="url"
                  value={settingsForm.facebook}
                  onChange={(e) => setSettingsForm({ ...settingsForm, facebook: e.target.value })}
                  className="w-full border rounded-xl p-3"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block font-bold mb-1">نص الشريط العلوي</label>
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

        {/* الولايات */}
        {activeTab === 'wilayas' && (
          <div className="p-6 space-y-6">
            <div className="bg-rose-50/50 border border-rose-100 p-6 rounded-2xl">
              <h3 className="text-base font-bold text-gray-800 mb-4">إضافة ولاية جديدة</h3>
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
                  placeholder="سعر المنزل"
                  value={wilayaHome}
                  onChange={(e) => setWilayaHome(e.target.value)}
                  className="border rounded-xl p-2.5"
                />
                <input
                  type="number"
                  placeholder="سعر المكتب"
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

      </div>
    </div>
  );
}
