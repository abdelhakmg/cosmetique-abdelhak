import React, { useContext } from 'react';
import { StoreContext } from '../context/StoreContext';
import ProductCard from './ProductCard';

export default function ProductGrid() {
  const { products, selectedCategory, searchQuery } = useContext(StoreContext);

  // تصفية المنتجات حسب التصنيف وحقل البحث
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      !selectedCategory || selectedCategory === 'الكل' || product.category === selectedCategory;
    const matchesSearch =
      !searchQuery ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" id="products">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">منتجاتنا المميزة</h2>
          <p className="text-gray-500 text-sm mt-1">تصفح أحدث التشكيلات والعروض خاصة بنا</p>
        </div>
        <span className="text-sm text-gray-500 font-medium">
          {filteredProducts.length} منتج
        </span>
      </div>

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-gray-200">
          <p className="text-gray-500 text-lg">لا توجد منتجات تطابق بحثك حالياً.</p>
        </div>
      )}
    </section>
  );
}
