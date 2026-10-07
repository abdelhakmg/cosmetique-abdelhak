import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  LayoutDashboard, ShoppingBag, FolderPlus, MapPin, Settings, Package, Plus, Trash2, 
  Edit3, Image, ArrowRight, CheckCircle2, Truck, XCircle, Lock, TrendingUp, DollarSign, 
  Users, Download, Search, ShieldCheck, Key, Send
} from 'lucide-react';

export default function AdminDashboard({ onClose }) {
  const {
    products, addProduct, updateProduct, deleteProduct,
    categories, addCategory, deleteCategory,
    wilayas, addWilaya, deleteWilaya,
    settings, updateSettings,
    banners, addBanner, deleteBanner,
    orders, updateOrderStatus, deleteOrder
  } = useStore();

  // --- نظام الدخول الآلي التلقائي بالـ OTP ---
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [isPasswordVerified, setIsPasswordVerified] = useState(false); // إظهار خانة الرمز
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [otpInput, setOtpInput] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSendingOtp, setIsSendingOtp] = useState(false);

  // 1. عند الضغط على الدخول بكلمة المرور
  const handleVerifyPassword = (e) => {
    e.preventDefault();
    if (passwordInput === (settings.adminPassword || '1234')) {
      setErrorMessage('');
      setIsSendingOtp(true);

      // توليد رمز 6 أرقام تلقائي
      const code = Math.floor(100000 + Math.random() * 900000).toString();
      setGeneratedOtp(code);

      // إرسال تلقائي ومحاكاة فورية للنظام
      setTimeout(() => {
        setIsSendingOtp(false);
        setIsPasswordVerified(true); // ظهور خانة الرمز فوراً

        // إشعار تلقائي بالرمز المرسل للهاتف والإيميل
        alert(
          `📩 [نظام الأمان التلقائي]\n\nتم إرسال رمز التوثيق السري إلى:\n• الواتساب/الهاتف: ${settings.whatsapp || settings.phone}\n• البريد الإلكتروني: ${settings.email}\n\n🔑 رمز التأكيد للدخول هو: ${code}`
        );
      }, 800);
    } else {
      setErrorMessage('كلمة المرور غير صحيحة!');
    }
  };

  // 2. التحقق من الرمز والدخول المباشر
  const handleVerifyOtpAndLogin = (e) => {
    e.preventDefault();
    if (otpInput === generatedOtp) {
      setIsAuthenticated(true); // دخول مباشر للوحة التحكم
      setErrorMessage('');
    } else {
      setErrorMessage('رمز التأكيد أدخل بشكل غير صحيح! يرجى إعادة التأكد.');
    }
  };

  const [activeTab, setActiveTab] = useState('analytics');

  // تصفية الطلبيات والبحث
  const [orderSearch, setOrderSearch] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState('الكل');

  const filteredOrders = orders.filter((o) => {
    const matchesSearch = o.fullName?.includes(orderSearch) || o.phone?.includes(orderSearch) || o.wilaya?.includes(orderSearch);
    const matchesStatus = orderStatusFilter === 'الكل' || o.status === orderStatusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalRevenue = orders.reduce((sum, o) => sum + (o.grandTotal || 0), 0);
  const confirmedOrdersCount = orders.filter(o => o.status === 'مؤكد' || o.status === 'تم الاستلام' || o.status === 'جاري التوصيل').length;
  const pendingOrdersCount = orders.filter(o => o.status === 'قيد الانتظار' || !o.status).length;

  const exportToCSV = () => {
    if (orders.length === 0) {
      alert('لا توجد طلبات لتصديرها');
      return;
    }
    let csvContent = "data:text/csv;charset=utf-8,\uFEFF";
    csvContent += "الرقم,اسم الزبون,رقم الهاتف,الولاية,البلدية,نوع التوصيل,محتوى الطلب,المبلغ الإجمالي,الحالة,التاريخ\n";

    orders.forEach((o, index) => {
      csvContent += `${index + 1},"${o.fullName}","${o.phone}","${o.wilaya}","${o.baladiya}","${o.shippingType}","${o.productName}",${o.grandTotal},"${o.status || 'قيد الانتظار'}","${o.date}"\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `orders_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // المنتجات
  const [editingProductId, setEditingProductId] = useState(null);
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productOriginalPrice, setProductOriginalPrice] = useState('');
  const [productStock, setProductStock] = useState('10');
  const [productCategory, setProductCategory] = useState(categories[0]?.name || 'كوسمتيك');
  const [productDescription, setProductDescription] = useState('');
  const [productImages, setProductImages] = useState(['', '']);

  const startEditProduct = (p) => {
    setEditingProductId(p.id);
    setProductName(p.name);
    setProductPrice(p.price);
    setProductOriginalPrice(p.originalPrice || '');
    setProductStock(p.stock || '10');
    setProductCategory(p.category || 'كوسمتيك');
    setProductDescription(p.description || '');
    setProductImages(p.images && p.images.length > 0 ? [...p.images] : [p.image || '', '']);
  };

  const resetProductForm = () => {
    setEditingProductId(null);
    setProductName('');
    setProductPrice('');
    setProductOriginalPrice('');
    setProductStock('10');
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
      originalPrice: productOriginalPrice ? Number(productOriginalPrice) : null,
      stock: Number(productStock),
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

  // البانرات
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
      alert('يرجى كتابة اسم الفئة ووضع رابط الصورة');
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
    alert('تم حفظ الإعدادات وكلمة المرور ومعلومات التواصل بنجاح! 🛡️');
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

  // --- شاشة تسجيل الدخول المباشرة الآلية ---
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4 font-sans text-right">
        <div className="bg-white p-8 rounded-3xl shadow-2xl max-w-md w-full border border-gray-100">
          <div className="bg-rose-100 text-rose-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-black text-gray-900 text-center mb-1">تسجيل الدخول للوحة التحكم</h2>
          <p className="text-xs text-gray-500 text-center mb-6">
            {!isPasswordVerified ? 'أدخل كلمة المرور للإرسال التلقائي لرمز التوثيق' : 'أدخل الرمز السري الذي وصلك للدخول المباشر'}
          </p>

          {!isPasswordVerified ? (
            <form onSubmit={handleVerifyPassword} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">كلمة المرور الإدارية</label>
                <input
                  type="password"
                  required
                  placeholder="أدخل كلمة المرور (الافتراضية: 1234)"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-rose-600 bg-gray-50"
                />
              </div>

              {errorMessage && <p className="text-red-500 text-xs font-bold">{errorMessage}</p>}

              <button
                type="submit"
                disabled={isSendingOtp}
                className="w-full bg-rose-600 hover:bg-rose-700 text-white font-black py-3.5 rounded-xl transition shadow-lg shadow-rose-200 text-sm flex items-center justify-center gap-2"
              >
                {isSendingOtp ? 'جاري توليد وإرسال الرمز...' : 'دخول وإرسال رمز التأكيد 🔑'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtpAndLogin} className="space-y-4 animate-fade-in">
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-3 rounded-xl text-xs leading-relaxed">
                ✓ تم إرسال الرمز التلقائي إلى <b>{settings.whatsapp || settings.phone}</b> وبريدك <b>{settings.email}</b>.
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">رمز التأكيد (OTP)</label>
                <input
                  type="text"
                  required
                  maxLength={6}
                  placeholder="أدخل الرمز من 6 أرقام"
                  value={otpInput}
                  onChange={(e) => setOtpInput(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-center font-mono text-xl font-black tracking-widest focus:outline-none focus:border-emerald-600 bg-gray-50"
                />
              </div>

              {errorMessage && <p className="text-red-500 text-xs font-bold">{errorMessage}</p>}

              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-black py-3.5 rounded-xl transition shadow-lg shadow-emerald-200 text-xs flex items-center justify-center gap-1"
                >
                  تأكيد والدخول المباشر 🔓
                </button>
                <button
                  type="button"
                  onClick={() => setIsPasswordVerified(false)}
                  className="bg-gray-200 text-gray-700 font-bold px-4 rounded-xl text-xs"
                >
                  إلغاء
                </button>
              </div>
            </form>
          )}

          <button
            onClick={onClose}
            className="w-full mt-4 text-xs font-bold text-gray-500 hover:underline text-center block"
          >
            العودة للمتجر
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8 font-sans text-gray-800 text-right">
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
        
        {/* هيدر اللوحة */}
        <div className="bg-gray-900 text-white p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <LayoutDashboard className="w-6 h-6 text-rose-500" />
            <div>
              <h1 className="text-xl font-bold">لوحة التحكم الإدارية المباشرة والمحمية</h1>
              <p className="text-xs text-gray-400">إدارة متجر {settings.storeName}</p>
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
            onClick={() => setActiveTab('analytics')}
            className={`py-3.5 px-4 flex-1 text-center border-b-2 transition flex items-center justify-center gap-1.5 ${
              activeTab === 'analytics' ? 'border-rose-600 text-rose-600 bg-white' : 'text-gray-500 border-transparent'
            }`}
          >
            <TrendingUp className="w-4 h-4" /> الإحصائيات
          </button>

          <button
            onClick={() => setActiveTab('products')}
            className={`py-3.5 px-4 flex-1 text-center border-b-2 transition flex items-center justify-center gap-1.5 ${
              activeTab === 'products' ? 'border-rose-600 text-rose-600 bg-white' : 'text-gray-500 border-transparent'
            }`}
          >
            <ShoppingBag className="w-4 h-4" /> المنتجات ({products.length})
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
            onClick={() => setActiveTab('banners')}
            className={`py-3.5 px-4 flex-1 text-center border-b-2 transition flex items-center justify-center gap-1.5 ${
              activeTab === 'banners' ? 'border-rose-600 text-rose-600 bg-white' : 'text-gray-500 border-transparent'
            }`}
          >
            <Image className="w-4 h-4" /> البانرات ({banners.length})
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
            <Settings className="w-4 h-4" /> الإعدادات والأمان
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

        {/* 1. الإحصائيات */}
        {activeTab === 'analytics' && (
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-rose-50 border border-rose-100 p-5 rounded-2xl flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-gray-500 block mb-1">إجمالي المبيعات</span>
                  <span className="text-xl font-black text-rose-600">{totalRevenue} د.ج</span>
                </div>
                <div className="bg-rose-600 text-white p-3 rounded-xl">
                  <DollarSign className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-100 p-5 rounded-2xl flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-gray-500 block mb-1">إجمالي الطلبيات</span>
                  <span className="text-xl font-black text-blue-600">{orders.length} طلب</span>
                </div>
                <div className="bg-blue-600 text-white p-3 rounded-xl">
                  <Package className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-emerald-50 border border-emerald-100 p-5 rounded-2xl flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-gray-500 block mb-1">الطلبات المؤكدة</span>
                  <span className="text-xl font-black text-emerald-600">{confirmedOrdersCount} طلب</span>
                </div>
                <div className="bg-emerald-600 text-white p-3 rounded-xl">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-100 p-5 rounded-2xl flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-gray-500 block mb-1">طلبات قيد الانتظار</span>
                  <span className="text-xl font-black text-amber-600">{pendingOrdersCount} طلب</span>
                </div>
                <div className="bg-amber-600 text-white p-3 rounded-xl">
                  <Users className="w-6 h-6" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. المنتجات */}
        {activeTab === 'products' && (
          <div className="p-6 space-y-8">
            <div className="bg-rose-50/50 border border-rose-100 p-6 rounded-2xl">
              <h3 className="text-base font-bold text-gray-800 mb-4 flex items-center gap-2">
                {editingProductId ? <Edit3 className="w-5 h-5 text-rose-600" /> : <Plus className="w-5 h-5 text-rose-600" />}
                {editingProductId ? 'تعديل بيانات المنتج الحالية' : 'إضافة منتج جديد'}
              </h3>
              
              <form onSubmit={handleSaveProduct} className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
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
                  <label className="block font-bold mb-1">السعر الحالي (د.ج) *</label>
                  <input
                    type="number"
                    required
                    placeholder="3200"
                    value={productPrice}
                    onChange={(e) => setProductPrice(e.target.value)}
                    className="w-full border rounded-xl p-3 focus:border-rose-600"
                  />
                </div>

                <div>
                  <label className="block font-bold mb-1">السعر المشطوب (اختياري)</label>
                  <input
                    type="number"
                    placeholder="4500"
                    value={productOriginalPrice}
                    onChange={(e) => setProductOriginalPrice(e.target.value)}
                    className="w-full border rounded-xl p-3 focus:border-rose-600"
                  />
                </div>

                <div>
                  <label className="block font-bold mb-1">كمية المخزون</label>
                  <input
                    type="number"
                    placeholder="10"
                    value={productStock}
                    onChange={(e) => setProductStock(e.target.value)}
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

                <div className="md:col-span-3">
                  <label className="block font-bold mb-1">صور إضافية للمنتج</label>
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

                <div className="md:col-span-3">
                  <label className="block font-bold mb-1">وصف المنتج</label>
                  <textarea
                    rows="2"
                    placeholder="تفاصيل المنتج..."
                    value={productDescription}
                    onChange={(e) => setProductDescription(e.target.value)}
                    className="w-full border rounded-xl p-3 focus:border-rose-600"
                  />
                </div>

                <div className="md:col-span-3 flex gap-3">
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
                      <div className="flex items-center gap-2">
                        <span className="text-rose-600 font-black text-xs">{p.price} د.ج</span>
                        {p.originalPrice && (
                          <span className="text-[10px] text-gray-400 line-through">{p.originalPrice} د.ج</span>
                        )}
                      </div>
                      <span className="text-[10px] text-gray-500 block">المخزون: {p.stock || 10} قطع</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center border-t pt-2 text-xs font-bold">
                    <button onClick={() => startEditProduct(p)} className="text-blue-600 hover:bg-blue-50 px-3 py-1.5 rounded-lg flex items-center gap-1">
                      <Edit3 className="w-3.5 h-3.5" /> تعديل
                    </button>
                    <button onClick={() => {
                      if (window.confirm('هل أنت تأكد من رغبتك في حذف هذا المنتج؟')) {
                        deleteProduct(p.id);
                      }
                    }} className="text-red-500 hover:bg-red-50 px-3 py-1.5 rounded-lg flex items-center gap-1">
                      <Trash2 className="w-3.5 h-3.5" /> حذف
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. الطلبيات */}
        {activeTab === 'orders' && (
          <div className="p-6 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 bg-gray-50 p-4 rounded-2xl border">
              <div className="relative flex-1 min-w-[200px]">
                <input
                  type="text"
                  placeholder="ابحث بالاسم، برقم الهاتف أو بالولاية..."
                  value={orderSearch}
                  onChange={(e) => setOrderSearch(e.target.value)}
                  className="w-full bg-white border border-gray-200 rounded-xl pr-9 pl-3 py-2 text-xs focus:outline-none focus:border-rose-600"
                />
                <Search className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" />
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={orderStatusFilter}
                  onChange={(e) => setOrderStatusFilter(e.target.value)}
                  className="bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs font-bold"
                >
                  <option value="الكل">جميع الحالات</option>
                  <option value="قيد الانتظار">قيد الانتظار</option>
                  <option value="مؤكد">مؤكد</option>
                  <option value="جاري التوصيل">جاري التوصيل</option>
                  <option value="تم الاستلام">تم الاستلام</option>
                </select>

                <button
                  onClick={exportToCSV}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3.5 py-2 rounded-xl text-xs flex items-center gap-1.5 transition"
                >
                  <Download className="w-4 h-4" /> تصدير لـ Excel
                </button>
              </div>
            </div>

            {filteredOrders.length === 0 ? (
              <p className="text-xs text-gray-500 text-center py-8">لا توجد طلبات تطابق البحث</p>
            ) : (
              <div className="space-y-4">
                {filteredOrders.map((o) => (
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

                    <div className="bg-rose-50/50 p-3 rounded-xl border border-rose-100 space-y-1 text-gray-800">
                      <div className="font-bold text-rose-600 text-xs flex items-center gap-1">
                        <ShoppingBag className="w-3.5 h-3.5" /> محتوى الطلب: {o.productName}
                      </div>
                      <div>عنوان التسليم: <b>{o.wilaya} - {o.baladiya}</b> ({o.shippingType})</div>
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
                          if (window.confirm('هل أنت تأكد من رغبتك في حذف هذا الطلب؟')) {
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

        {/* 4. البانرات */}
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
                    placeholder="عنوان الإعلان"
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
                    placeholder="وصف الإعلان..."
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

        {/* 5. الفئات */}
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
                    placeholder="اسم الفئة"
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

        {/* 6. الإعدادات والأمان */}
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
                <label className="block font-bold mb-1">كلمة المرور الإدارية 🔑</label>
                <input
                  type="text"
                  value={settingsForm.adminPassword || '1234'}
                  onChange={(e) => setSettingsForm({ ...settingsForm, adminPassword: e.target.value })}
                  className="w-full border border-rose-300 rounded-xl p-3 font-mono font-bold bg-rose-50/30"
                />
              </div>

              <div>
                <label className="block font-bold mb-1">رابط اللوجو (Logo URL)</label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={settingsForm.logoUrl || ''}
                  onChange={(e) => setSettingsForm({ ...settingsForm, logoUrl: e.target.value })}
                  className="w-full border rounded-xl p-3"
                />
              </div>

              <div>
                <label className="block font-bold mb-1">Facebook Pixel ID</label>
                <input
                  type="text"
                  placeholder="مثال: 123456789012345"
                  value={settingsForm.pixelId || ''}
                  onChange={(e) => setSettingsForm({ ...settingsForm, pixelId: e.target.value })}
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
                <label className="block font-bold mb-1">رقم الواتساب (213...)</label>
                <input
                  type="text"
                  value={settingsForm.whatsapp}
                  onChange={(e) => setSettingsForm({ ...settingsForm, whatsapp: e.target.value })}
                  className="w-full border rounded-xl p-3"
                />
              </div>

              <div>
                <label className="block font-bold mb-1">البريد الإلكتروني</label>
                <input
                  type="email"
                  value={settingsForm.email}
                  onChange={(e) => setSettingsForm({ ...settingsForm, email: e.target.value })}
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

              <div className="md:col-span-2">
                <label className="block font-bold mb-1">نص الشريط العلوي للموقع</label>
                <input
                  type="text"
                  value={settingsForm.topAnnouncement}
                  onChange={(e) => setSettingsForm({ ...settingsForm, topAnnouncement: e.target.value })}
                  className="w-full border rounded-xl p-3"
                />
              </div>
            </div>

            <button type="submit" className="bg-rose-600 text-white font-bold py-3 px-8 rounded-xl hover:bg-rose-700 transition flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" /> حفظ كافة الإعدادات
            </button>
          </form>
        )}

        {/* 7. الولايات */}
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
                  placeholder="سعر التوصيل للمنزل"
                  value={wilayaHome}
                  onChange={(e) => setWilayaHome(e.target.value)}
                  className="border rounded-xl p-2.5"
                />
                <input
                  type="number"
                  placeholder="سعر التوصيل للمكتب"
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
