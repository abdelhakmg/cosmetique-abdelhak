import React, { createContext, useContext, useState, useEffect } from 'react';
import { DEMO_PRODUCTS, CATEGORIES } from '../data/products';

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('cos_products');
    return saved ? JSON.parse(saved) : DEMO_PRODUCTS;
  });

  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('cos_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('cos_orders');
    return saved ? JSON.parse(saved) : [];
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [lastCreatedOrder, setLastCreatedOrder] = useState(null);

  useEffect(() => {
    localStorage.setItem('cos_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('cos_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('cos_orders', JSON.stringify(orders));
  }, [orders]);

  const addToCart = (product, quantity = 1, selectedVariants = {}) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) => item.id === product.id && JSON.stringify(item.selectedVariants) === JSON.stringify(selectedVariants)
      );

      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantity;
        return updated;
      }

      return [...prevCart, { ...product, quantity, selectedVariants }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (index) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const updateCartQuantity = (index, newQty) => {
    if (newQty <= 0) {
      removeFromCart(index);
      return;
    }
    setCart((prev) => {
      const updated = [...prev];
      updated[index].quantity = newQty;
      return updated;
    });
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

  const cartSubtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    
      {children}
    
  );
};

export const useStore = () => useContext(StoreContext);
