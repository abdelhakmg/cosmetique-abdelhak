import React, { createContext, useContext, useState, useEffect } from 'react';

const StoreContext = createContext();

const DEFAULT_PRODUCTS = [
  {
    id: '1',
    name: 'سيروم العناية بالبشرة',
    description: 'سيروم مغذي ومجدد للبشرة لمظهر نضر ومشرق',
    price: 3500,
    category: 'العناية بالبشرة',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=600',
    rating: 4.9
  },
  {
    id: '2',
    name: 'أحمر شفاه فاخر',
    description: 'أحمر شفاه يدوم طويلاً بلمسة مطفية وجذابة',
    price: 1800,
    category: 'مكياج',
    image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&q=80&w=600',
    rating: 4.8
  },
  {
    id: '3',
    name: 'عطر نسائي راقي',
    description: 'عطر مميز بنفحات الزهور الفواحة والمسك',
    price: 5200,
    category: 'العطور',
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=600',
    rating: 5.0
  }
];

const DEFAULT_CATEGORIES = ['الكل', 'العناية بالبشرة', 'مكياج', 'العطور', 'العناية بالشعر'];

export const StoreProvider = ({ children }) => {
  const [products] = useState(() => {
    try {
      const saved = localStorage.getItem('cos_products');
      return saved ? JSON.parse(saved) : DEFAULT_PRODUCTS;
    } catch {
      return DEFAULT_PRODUCTS;
    }
  });

  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('cos_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('cos_orders');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [categories] = useState(DEFAULT_CATEGORIES);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('الكل');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [lastCreatedOrder, setLastCreatedOrder] = useState(null);

  useEffect(() => {
    localStorage.setItem('cos_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('cos_orders', JSON.stringify(orders));
  }, [orders]);

  const addToCart = (product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateCartQuantity = (id, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const clearCart = () => setCart([]);

  const createOrder = (orderData) => {
    const newOrder = {
      id: `ORD-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'NEW',
      items: [...cart],
      ...orderData
    };
    setOrders((prev) => [newOrder, ...prev]);
    setLastCreatedOrder(newOrder);
    clearCart();
    setIsCheckoutOpen(false);
    return newOrder;
  };

  const cartSubtotal = cart.reduce((sum, item) => sum + Number(item.price || 0) * item.quantity, 0);

  return (
    <StoreContext.Provider
      value={{
        products,
        categories,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        orders,
        createOrder,
        lastCreatedOrder,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        cartSubtotal
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);
