import React, { createContext, useContext, useState, useEffect } from 'react';

const StoreContext = createContext();

// 1. التصنيفات الافتراضية مع صور دائرية
const INITIAL_CATEGORIES = [
  { id: '1', name: 'هدايا', image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=300' },
  { id: '2', name: 'كوسمتيك', image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=300' },
  { id: '3', name: 'عطور', image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=300' },
  { id: '4', name: 'مواد تجميل', image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=300' },
  { id: '5', name: 'علب', image: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&q=80&w=300' }
];

// 2. قائمة الولايات الافتراضية واسعار الشحن
const INITIAL_WILAYAS = [
  { code: '01', name: 'أدرار', home: 1000, desk: 600 },
  { code: '02', name: 'الشلف', home: 700, desk: 400 },
  { code: '03', name: 'الأغواط', home: 800, desk: 500 },
  { code: '09', name: 'البليدة', home: 600, desk: 350 },
  { code: '16', name: 'الجزائر العاصمة', home: 500, desk: 300 },
  { code: '25', name: 'قسنطينة', home: 700, desk: 400 },
  { code: '31', name: 'وهران', home: 700, desk: 400 },
  { code: '32', name: 'البيض', home: 900, desk: 550 }
];

// 3. معلومات المتجر وصفحات التواصل الافتراضية
const INITIAL_SETTINGS = {
  storeName: 'Cosmetique Abdelhak',
  phone: '0550000000',
  whatsapp: '213550000000',
  instagram: 'https://instagram.com',
  facebook: 'https://facebook.com',
  email: 'contact@cosmetique-abdelhak.dz',
  topAnnouncement: 'توصيل سريع لجميع الولايات 🇩🇿 - الدفع يداً بيد عند الاستلام'
};

// 4. منتجات افتراضية مع دعم صور متعددة
const INITIAL_PRODUCTS = [
  {
    id: '1',
    name: 'سيروم العناية بالبشرة الإحترافي',
    price: 3200,
    category: 'كوسمتيك',
    description: 'سيروم مغذي ومجدد لخلايا البشرة يمنحك نضارة فورية وإشراقة تدوم طويلاً.',
    images: [
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1608248597261-2856417537b8?auto=format&fit=crop&q=80&w=600'
    ],
    rating: 4.9
  },
  {
    id: '2',
    name: 'عطر نسائي فاخر',
    price: 4500,
    category: 'عطور',
    description: 'عطر ساحر برائحة الورود الطبيعية والمسك الفاخر يدوم طويلاً.',
    images: [
      'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=600'
    ],
    rating: 4.8
  }
];

export function StoreProvider({ children }) {
  // الحالات المسجلة بـ LocalStorage للحفاظ على التغيرات
  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem('app_categories');
    return saved ? JSON.parse(saved) : INITIAL_CATEGORIES;
  });

  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('app_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [wilayas, setWilayas] = useState(() => {
    const saved = localStorage.getItem('app_wilayas');
    return saved ? JSON.parse(saved) : INITIAL_WILAYAS;
  });

  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('app_settings');
    return saved ? JSON.parse(saved) : INITIAL_SETTINGS;
  });

  const [banners, setBanners] = useState(() => {
    const saved = localStorage.getItem('app_banners');
    return saved ? JSON.parse(saved) : [];
  });

  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('app_orders');
    return saved ? JSON.parse(saved) : [];
  });

  const [selectedCategory, setSelectedCategory] = useState('الكل');
  const [searchQuery, setSearchQuery] = useState('');

  // حفظ التغييرات تلقائياً
  useEffect(() => localStorage.setItem('app_categories', JSON.stringify(categories)), [categories]);
  useEffect(() => localStorage.setItem('app_products', JSON.stringify(products)), [products]);
  useEffect(() => localStorage.setItem('app_wilayas', JSON.stringify(wilayas)), [wilayas]);
  useEffect(() => localStorage.setItem('app_settings', JSON.stringify(settings)), [settings]);
  useEffect(() => localStorage.setItem('app_banners', JSON.stringify(banners)), [banners]);
  useEffect(() => localStorage.setItem('app_orders', JSON.stringify(orders)), [orders]);

  // دالة إضافة/حذف تصنيف
  const addCategory = (name, image) => {
    const newCat = { id: Date.now().toString(), name, image };
    setCategories((prev) => [...prev, newCat]);
  };

  const deleteCategory = (id) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
  };

  // دالة إضافة/تعديل/حذف منتج
  const addProduct = (productData) => {
    const newProd = { ...productData, id: Date.now().toString() };
    setProducts((prev) => [newProd, ...prev]);
  };

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  // دالة إضافة/حذف ولاية
  const addWilaya = (wilayaData) => {
    setWilayas((prev) => [...prev, wilayaData]);
  };

  const deleteWilaya = (code) => {
    setWilayas((prev) => prev.filter((w) => w.code !== code));
  };

  // دالة تحديث الإعدادات
  const updateSettings = (newSettings) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  // دالة إنشاء طلبية
  const createOrder = (orderData) => {
    const newOrder = {
      ...orderData,
      id: Date.now().toString(),
      date: new Date().toLocaleDateString('ar-DZ'),
      status: 'قيد الانتظار'
    };
    setOrders((prev) => [newOrder, ...prev]);
  };

  return (
    <StoreContext.Provider
      value={{
        categories,
        addCategory,
        deleteCategory,
        products,
        addProduct,
        deleteProduct,
        wilayas,
        addWilaya,
        deleteWilaya,
        settings,
        updateSettings,
        banners,
        setBanners,
        orders,
        createOrder,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export const useStore = () => useContext(StoreContext);
