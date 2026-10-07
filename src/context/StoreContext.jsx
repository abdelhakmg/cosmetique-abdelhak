import React, { createContext, useContext, useState, useEffect } from 'react';

const StoreContext = createContext();

const INITIAL_PRODUCTS = [
  {
    id: '1',
    name: 'سيروم العناية بالبشرة الإحترافي',
    price: 3200,
    category: 'العناية بالبشرة',
    description: 'سيروم مغذي ومجدد لخلايا البشرة يمنحك نضارة فورية وإشراقة تدوم طويلاً.',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=600',
    rating: 4.9
  },
  {
    id: '2',
    name: 'مجموعة المكياج المتكاملة',
    price: 5800,
    category: 'المكياج',
    description: 'تشكيلة راقية ومميزة من مستحضرات التجميل العصرية لتألق يومي ساحر.',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=600',
    rating: 4.8
  }
];

// بانرات إشهارية افتراضية
const INITIAL_BANNERS = [
  {
    id: 'b1',
    title: 'أفضل تخفيضات الموسم!',
    subtitle: 'استفيدي من خصم يصل إلى 35% على منتجات العناية بالبشرة المختارة.',
    badge: 'وداعاً للصيف !',
    image: 'https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'b2',
    title: 'عروض حصرية لفترة محدودة',
    subtitle: 'توصيل مجاني لجميع الولايات عند الشراء بقيمة 6000 د.ج أو أكثر.',
    badge: 'عرض خاص 🏷️',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=1200'
  }
];

export function StoreProvider({ children }) {
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [banners, setBanners] = useState(() => {
    const saved = localStorage.getItem('banners');
    return saved ? JSON.parse(saved) : INITIAL_BANNERS;
  });

  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('orders');
    return saved ? JSON.parse(saved) : [];
  });

  const [selectedCategory, setSelectedCategory] = useState('الكل');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('banners', JSON.stringify(banners));
  }, [banners]);

  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  // إضافة وحذف المنتجات والبانرات
  const addBanner = (newBanner) => {
    setBanners((prev) => [{ ...newBanner, id: Date.now().toString() }, ...prev]);
  };

  const deleteBanner = (id) => {
    setBanners((prev) => prev.filter((b) => b.id !== id));
  };

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
        products,
        setProducts,
        banners,
        addBanner,
        deleteBanner,
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
