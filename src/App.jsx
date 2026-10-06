import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import Footer from './components/Footer';
import AdminDashboard from './components/AdminDashboard';
import ProductLandingPage from './components/ProductLandingPage';

export default function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleOpenCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  // 1. عرض لوحة التحكم الإدارية
  if (isAdminOpen) {
    return <AdminDashboard onClose={() => setIsAdminOpen(false)} />;
  }

  // 2. عرض صفحة الهبوط فور اختيار أي منتج
  if (selectedProduct) {
    return (
      <ProductLandingPage
        product={selectedProduct}
        onBack={() => setSelectedProduct(null)}
      />
    );
  }

  // 3. الشاشة الرئيسية للمتجر
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Navbar onOpenCart={() => setIsCartOpen(true)} />
      
      <main className="flex-1">
        <Hero />
        {/* تمرير دالة الاختيار هنا هي الخطوة الحاسمة */}
        <ProductGrid onSelectProduct={(product) => setSelectedProduct(product)} />
      </main>

      <Footer />

      {/* زر دخول لوحة التحكم بالأسفل */}
      <div className="text-center py-2 bg-gray-900 text-gray-400 text-xs">
        <button 
          onClick={() => setIsAdminOpen(true)}
          className="hover:text-white underline font-mono"
        >
          ⚙️ لوحة التحكم الإدارية
        </button>
      </div>

      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        onCheckout={handleOpenCheckout}
      />

      <CheckoutModal 
        isOpen={isCheckoutOpen} 
        onClose={() => setIsCheckoutOpen(false)} 
      />
    </div>
  );
}
