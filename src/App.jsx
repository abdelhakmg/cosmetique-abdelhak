import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import Footer from './components/Footer';

export default function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans" dir="rtl">
      {/* Navbar */}
      <Navbar onOpenCart={() => setIsCartOpen(true)} />

      {/* Hero Section */}
      <Hero />

      {/* Products Grid */}
      <ProductGrid />

      {/* Drawer & Modal */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onCheckout={() => setIsCheckoutOpen(true)}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
