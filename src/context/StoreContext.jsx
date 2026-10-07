import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../firebase';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';

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
  adminPassword: '1234',
  pixelId: '',
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
    originalPrice: 4200,
    stock: 15,
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
    originalPrice: 5500,
    stock: 8,
    category: 'عطور',
    description: 'عطر ساحر برائحة الورود الطبيعية والمسك الفاخر يدوم طويلاً.',
    images: [
      'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=600'
    ],
    rating: 4.8
  }
];

export function StoreProvider({ children }) {
  const [categories, setCategories] = useState(INITIAL_CATEGORIES);
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [wilayas, setWilayas] = useState(INITIAL_WILAYAS);
  const [settings, setSettings] = useState(INITIAL_SETTINGS);
  const [banners, setBanners] = useState(INITIAL_BANNERS);
  const [orders, setOrders] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState('الكل');
  const [searchQuery, setSearchQuery] = useState('');

  // 🔄 الاستماع المباشر للتغييرات في Firebase Firestore (المزامنة اللحظية)
  useEffect(() => {
    const unsub = onSnapshot(doc(db, "store", "data"), (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data.categories) setCategories(data.categories);
        if (data.products) setProducts(data.products);
        if (data.wilayas) setWilayas(data.wilayas);
        if (data.settings) setSettings(data.settings);
        if (data.banners) setBanners(data.banners);
        if (data.orders) setOrders(data.orders);
      } else {
        // إذا كانت قاعدة البيانات فارغة أول مرة، يتم رفع البيانات الافتراضية
        setDoc(doc(db, "store", "data"), {
          categories: INITIAL_CATEGORIES,
          products: INITIAL_PRODUCTS,
          wilayas: INITIAL_WILAYAS,
          settings: INITIAL_SETTINGS,
          banners: INITIAL_BANNERS,
          orders: []
        });
      }
    });

    return () => unsub();
  }, []);

  // 💾 دالة الحفظ المباشر في Firebase
  const saveToFirebase = async (newData) => {
    try {
      await setDoc(doc(db, "store", "data"), newData, { merge: true });
    } catch (error) {
      console.error("خطأ أثناء المزامنة مع Firebase:", error);
    }
  };

  // --- التصنيفات (Categories) ---
  const addCategory = (name, image) => {
    const updated = [...categories, { id: Date.now().toString(), name, image }];
    setCategories(updated);
    saveToFirebase({ categories: updated });
  };

  const deleteCategory = (id) => {
    const updated = categories.filter((c) => c.id !== id);
    setCategories(updated);
    saveToFirebase({ categories: updated });
  };

  // --- المنتجات (Products) ---
  const addProduct = (pData) => {
    const updated = [{ ...pData, id: Date.now().toString() }, ...products];
    setProducts(updated);
    saveToFirebase({ products: updated });
  };

  const updateProduct = (id, updatedData) => {
    const updated = products.map((p) => p.id === id ? { ...p, ...updatedData } : p);
    setProducts(updated);
    saveToFirebase({ products: updated });
  };

  const deleteProduct = (id) => {
    const updated = products.filter((p) => p.id !== id);
    setProducts(updated);
    saveToFirebase({ products: updated });
  };

  // --- البانرات (Banners) ---
  const addBanner = (bData) => {
    const updated = [{ ...bData, id: Date.now().toString() }, ...banners];
    setBanners(updated);
    saveToFirebase({ banners: updated });
  };

  const deleteBanner = (id) => {
    const updated = banners.filter((b) => b.id !== id);
    setBanners(updated);
    saveToFirebase({ banners: updated });
  };

  // --- الولائات (Wilayas) ---
  const addWilaya = (wData) => {
    const updated = [...wilayas, wData];
    setWilayas(updated);
    saveToFirebase({ wilayas: updated });
  };

  const deleteWilaya = (code) => {
    const updated = wilayas.filter((w) => w.code !== code);
    setWilayas(updated);
    saveToFirebase({ wilayas: updated });
  };

  // --- الإعدادات (Settings) ---
  const updateSettings = (newS) => {
    const updated = { ...settings, ...newS };
    setSettings(updated);
    saveToFirebase({ settings: updated });
  };

  // --- الطلبات (Orders) ---
  const createOrder = (orderData) => {
    const newOrder = {
      ...orderData,
      id: Date.now().toString(),
      date: new Date().toLocaleDateString('ar-DZ') + ' ' + new Date().toLocaleTimeString('ar-DZ', { hour: '2-digit', minute: '2-digit' }),
      status: 'قيد الانتظار'
    };
    const updated = [newOrder, ...orders];
    setOrders(updated);
    saveToFirebase({ orders: updated });
  };

  const updateOrderStatus = (orderId, newStatus) => {
    const updated = orders.map((o) => o.id === orderId ? { ...o, status: newStatus } : o);
    setOrders(updated);
    saveToFirebase({ orders: updated });
  };

  const deleteOrder = (orderId) => {
    const updated = orders.filter((o) => o.id !== orderId);
    setOrders(updated);
    saveToFirebase({ orders: updated });
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
