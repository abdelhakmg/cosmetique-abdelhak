import React, { useState } from 'react';
import Navbar from './components/Navbar';
import CategoryCircles from './components/CategoryCircles';
import BannerSlider from './components/BannerSlider';
import GiftBuilder from './components/GiftBuilder';
import ProductGrid from './components/ProductGrid';
import Testimonials from './components/Testimonials';
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
        {/* 1. الفئات الدائرية في أعلى الموقع بحجم مميز */}
        <CategoryCircles />

        {/* 2. البانر الإشهاري المتحرك */}
        <BannerSlider />

        {/* 3. قسم صمم هديتك بنفسك */}
        <GiftBuilder onOrderGift={(giftProduct) => setSelectedProduct(giftProduct)} />

        {/* 4. عرض المنتجات والتصفية */}
        <ProductGrid onSelectProduct={(product) => setSelectedProduct(product)} />

        {/* 5. قسم آراء وتقييمات الزبائن */}
        <Testimonials />
      </main>

      <Footer />

      <div className="text-center py-2.5 bg-gray-900 text-gray-400 text-xs">
        <button 
          onClick={() => setIsAdminOpen(true)}
          className="hover:text-white underline font-mono font-bold"
        >
          ⚙️ لوحة التحكم الشاملة لـ Cosmetique Abdelhak
        </button>
      </div>

      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        onCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      <CheckoutModal 
        isOpen={isCheckoutOpen} 
        onClose={() => setIsCheckoutOpen(false)} 
      />
    </div>
  );
}
