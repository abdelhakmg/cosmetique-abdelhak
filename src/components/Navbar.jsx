import React from 'react';
import { ShoppingBag, Search, Phone, Menu, Heart } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const Navbar = () => {
  const { cart, setIsCartOpen, searchQuery, setSearchQuery, selectedCategory, setSelectedCategory, categories } = useStore();

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
