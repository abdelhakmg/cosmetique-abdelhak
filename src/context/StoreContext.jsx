import React, { createContext, useContext, useState, useEffect } from 'react';

const StoreContext = createContext();

const INITIAL_CATEGORIES = [
  { id: '1', name: 'هدايا', image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=300' },
  { id: '2', name: 'كوسمتيك', image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=300' },
  { id: '3', name: 'عطور', image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=300' },
  { id: '4', name: 'مواد تجميل', image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=300' },
  { id: '5', name: 'علب', image: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&q=80&w=300' }
];

const INITIAL_WILAYAS = [
  { code: '01', name: 'أدرار', home: 1000, desk: 600 },
  { code: '02', name: 'الشلف', home: 700, desk: 400 },
  { code: '09', name: 'البليدة', home: 600, desk: 350 },
  { code: '16', name: 'الجزائر العاصمة', home: 500, desk: 300 },
  { code: '25', name: 'قسنطينة', home: 700, desk: 400 },
  { code: '31', name: 'وهران', home: 700, desk: 400 }
];

const INITIAL_SETTINGS = {
  storeName: 'Cosmetique Abdelhak',
  logoUrl: '',
  phone: '0550875580',
  whatsapp: '213550875580',
  instagram: 'https://instagram.com',
  facebook: 'https://facebook.com',
  email: 'contact@cosmetique-abdelhak.dz',
  topAnnouncement: 'توصيل سريع لجميع 58 ولاية 🇩🇿 - الدفع يداً بيد عند الاستلام'
};

const INITIAL_BANNERS = [
  {
    id: 'b1',
    title: 'أفضل تخفيضات الموسم على منتجات التجميل !',
    subtitle: 'استفيدي من خصومات تصل حتى 35% مع توصيل سريع لجميع 58 ولاية جزائرية.',
    badge: 'عرض خاص ومحدود 🔥',
    image: 'https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&q=80&w=1200'
  }
];

const INITIAL_PRODUCTS = [
  {
    id: '1',
    name: 'سيروم العناية بالبشرة الإحترافي',
    price: 3200,
    category: 'كوسمتيك',
    description: 'سيروم مغذي ومجدد لخلايا البشرة يمنحك نضارة فورية وإشراقة تدوم طويلاً.',
    images: [
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=600'
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
    return saved ? JSON.parse(saved) : INITIAL_BANNERS;
  });

  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('app_orders');
    return saved ? JSON.parse(saved) : [];
  });

  const [selectedCategory, setSelectedCategory] = useState('الكل');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => localStorage.setItem('app_categories', JSON.stringify(categories)), [categories]);
  useEffect(() => localStorage.setItem('app_products', JSON.stringify(products)), [products]);
  useEffect(() => localStorage.setItem('app_wilayas', JSON.stringify(wilayas)), [wilayas]);
  useEffect(() => localStorage.setItem('app_settings', JSON.stringify(settings)), [settings]);
  useEffect(() => localStorage.setItem('app_banners', JSON.stringify(banners)), [banners]);
  useEffect(() => localStorage.setItem('app_orders', JSON.stringify(orders)), [orders]);

  const addCategory = (name, image) => setCategories((prev) => [...prev, { id: Date.now().toString(), name, image }]);
  const deleteCategory = (id) => setCategories((prev) => prev.filter((c) => c.id !== id));

  const addProduct = (pData) => setProducts((prev) => [{ ...pData, id: Date.now().toString() }, ...prev]);
  const updateProduct = (id, updatedData) => setProducts((prev) => prev.map((p) => p.id === id ? { ...p, ...updatedData } : p));
  const deleteProduct = (id) => setProducts((prev) => prev.filter((p) => p.id !== id));

  const addBanner = (bData) => setBanners((prev) => [{ ...bData, id: Date.now().toString() }, ...prev]);
  const deleteBanner = (id) => setBanners((prev) => prev.filter((b) => b.id !== id));

  const addWilaya = (wData) => setWilayas((prev) => [...prev, wData]);
  const deleteWilaya = (code) => setWilayas((prev) => prev.filter((w) => w.code !== code));

  const updateSettings = (newS) => setSettings((prev) => ({ ...prev, ...newS }));

  const createOrder = (orderData) => {
    const newOrder = {
      ...orderData,
      id: Date.now().toString(),
      date: new Date().toLocaleDateString('ar-DZ') + ' ' + new Date().toLocaleTimeString('ar-DZ', { hour: '2-digit', minute: '2-digit' }),
      status: 'قيد الانتظار'
    };
    setOrders((prev) => [newOrder, ...prev]);
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders((prev) => prev.map((o) => o.id === orderId ? { ...o, status: newStatus } : o));
  };

  const deleteOrder = (orderId) => {
    setOrders((prev) => prev.filter((o) => o.id !== orderId));
  };

  return (
    <StoreContext.Provider
      value={{
        categories, addCategory, deleteCategory,
        products, setProducts, addProduct, updateProduct, deleteProduct,
        wilayas, addWilaya, deleteWilaya,
        settings, updateSettings,
        banners, addBanner, deleteBanner,
        orders, createOrder, updateOrderStatus, deleteOrder,
        selectedCategory, setSelectedCategory,
        searchQuery, setSearchQuery
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export const useStore = () => useContext(StoreContext);
