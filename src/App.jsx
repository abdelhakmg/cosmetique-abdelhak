import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BannerSlider from './components/BannerSlider';
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

  if (isAdminOpen) {
    return <AdminDashboard onClose={() => setIsAdminOpen(false)} />;
  }

  if (selectedProduct) {
    return (
      <ProductLandingPage
        product={selectedProduct}
        onBack={() => setSelectedProduct(null)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Navbar onOpenCart={() => setIsCartOpen(true)} />
      
      <main className="flex-1">
        <Hero />
        {/* عرض البانر الإشهاري الكبير في الصفحة الرئيسية */}
        <BannerSlider />
        <ProductGrid onSelectProduct={(product) => setSelectedProduct(product)} />
      </main>

      <Footer />

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
