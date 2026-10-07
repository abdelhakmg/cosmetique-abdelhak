import React, { useState } from 'react';
import Navbar from './components/Navbar';
import CategoryCircles from './components/CategoryCircles';
import BannerSlider from './components/BannerSlider';
import GiftBuilder from './components/GiftBuilder';
import ProductGrid from './components/ProductGrid';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import Footer from './components/Footer';
import AdminDashboard from './components/AdminDashboard';
import ProductLandingPage from './components/ProductLandingPage';
import LiveWidgets from './components/LiveWidgets';

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
      {/* تمرير فتح اللوحة بعد 3 ضغطات وفتح السلة */}
      <Navbar 
        onOpenCart={() => setIsCartOpen(true)} 
        onOpenAdmin={() => setIsAdminOpen(true)}
        onGoHome={() => setSelectedProduct(null)}
      />
      
      <main className="flex-1">
        <CategoryCircles />
        <BannerSlider />
        <GiftBuilder onOrderGift={(giftProduct) => setSelectedProduct(giftProduct)} />
        <ProductGrid onSelectProduct={(product) => setSelectedProduct(product)} />
      </main>

      <Footer />

      {/* عناصر الواتساب والإشعارات الحية */}
      <LiveWidgets />

      {/* مودال السلة والدفع */}
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
