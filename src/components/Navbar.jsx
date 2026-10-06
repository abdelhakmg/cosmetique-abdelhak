React Navbar Component
Below is the implementation of the Navbar component for the e-commerce application.import React from 'react';

import { ShoppingBag, Search, Phone } from 'lucide-react';

import { useStore } from '../context/StoreContext';

export const Navbar = () => {

  const { cart, setIsCartOpen, searchQuery, setSearchQuery, selectedCategory, setSelectedCategory, categories } = useStore();

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (

    <header className="sticky top-0 z-40 bg-white shadow-sm border-b border-rose-100">

      <div className="bg-rose-600 text-white text-xs sm:text-sm py-2 px-4 text-center font-medium">

        <div className="container mx-auto flex items-center justify-between">

          <span className="truncate">✨ توصيل سريع لجميع الولايات الجزائرية الـ 58 🇩🇿 | الدفع عند الاستلام</span>

          <a href="tel:0600000000" className="hidden md:flex items-center gap-1 hover:underline">

            <Phone size={14} /> <span>0600000000</span>

          </a>

        </div>

      </div>

      <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-4">

        <div className="flex items-center gap-2">

          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-rose-500 to-amber-400 flex items-center justify-center text-white font-bold text-xl shadow-md">

            C

          </div>

          <div className="flex flex-col">

            <span className="font-extrabold text-xl tracking-tight text-gray-900 leading-none">Cos Abdelhak</span>

            <span className="text-[10px] text-rose-500 font-semibold tracking-wider">BEAUTY & GIFTS</span>

          </div>

        </div>

        <div className="flex-1 max-w-lg hidden sm:block relative">

          <input

            type="text"

            placeholder="ابحث عن هدايا، عطور، مكياج، أو إكسسوارات..."

            value={searchQuery}

            onChange={(e) => setSearchQuery(e.target.value)}

            className="w-full pl-4 pr-10 py-2 rounded-full border border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-400 text-sm bg-rose-50/30"

          />

          <Search className="absolute right-3 top-2.5 text-rose-400" size={18} />

        </div>

        <div className="flex items-center gap-3">

          <button 

            onClick={() => setIsCartOpen(true)}

            className="relative bg-rose-50 p-2.5 rounded-full text-rose-600 hover:bg-rose-100 transition-colors flex items-center gap-2"

          >

            <ShoppingBag size={22} />

            {totalCartCount > 0 && (

              <span className="absolute -top-1 -right-1 bg-rose-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center animate-pulse">

                {totalCartCount}

              </span>

            )}

            <span className="hidden md:inline text-sm font-bold text-rose-700">السلة</span>

          </button>

        </div>

      </div>

      <div className="bg-rose-50/50 border-t border-rose-100 overflow-x-auto">

        <div className="container mx-auto px-4 flex items-center gap-2 py-2 text-sm whitespace-nowrap">

          <button

            onClick={() => setSelectedCategory('all')}

            className={`px-4 py-1.5 rounded-full font-medium transition-all ${

              selectedCategory === 'all'

                ? 'bg-rose-600 text-white shadow-sm'

                : 'bg-white text-gray-600 hover:bg-rose-100'

            }`}

          >

            الكل

          </button>

          {categories.map((cat) => (

            <button

              key={cat.id}

              onClick={() => setSelectedCategory(cat.id)}

              className={`px-4 py-1.5 rounded-full font-medium transition-all ${

                selectedCategory === cat.id

                  ? 'bg-rose-600 text-white shadow-sm'

                  : 'bg-white text-gray-600 hover:bg-rose-100'

              }`}

            >

              {cat.name}

            </button>

          ))}

        </div>

      </div>

    </header>

  );

};

