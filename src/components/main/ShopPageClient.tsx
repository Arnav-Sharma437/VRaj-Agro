'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { Search, PackageOpen } from 'lucide-react';
import ProductCard from '@/components/main/ProductCard';
import { ICategory, IProduct } from '@/types';

interface ShopPageClientProps {
  initialCategories: ICategory[];
  initialProducts: IProduct[];
}

export default function ShopPageClient({ initialCategories, initialProducts }: ShopPageClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [whatsappNumber, setWhatsappNumber] = useState<string>('');

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const res = await fetch('/api/contact-info');
        if (res.ok) {
          const data = await res.json();
          setWhatsappNumber(data.whatsapp || '919300311126');
        }
      } catch (err) {
        console.error('Failed to fetch contact number inside ShopPage', err);
      }
    };
    fetchContact();
  }, []);

  // Filter products based on search query and category selection
  const filteredProducts = useMemo(() => {
    return initialProducts.filter((product) => {
      const matchesCategory =
        selectedCategory === 'all' ||
        (typeof product.category === 'object' && product.category && product.category.slug === selectedCategory) ||
        (typeof product.category === 'string' && product.category === selectedCategory);

      const matchesSearch =
        searchQuery.trim() === '' ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.short_description &&
          product.short_description.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (product.full_description &&
          product.full_description.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesSearch;
    });
  }, [initialProducts, selectedCategory, searchQuery]);

  return (
    <div className="bg-gray-50 min-h-screen pb-16">
      {/* 1. Page Banner */}
      <div className="bg-[#cc0000] h-[200px] w-full flex flex-col justify-center items-center px-4 relative overflow-hidden">
        {/* Subtle decorative grid background */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-wide text-center relative z-10">
          Our Products
        </h1>
        <div className="flex items-center gap-2 text-white/80 text-sm mt-3 relative z-10 font-medium">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <span>&gt;</span>
          <span className="text-white font-bold">Products</span>
        </div>
      </div>

      {/* 2. Filters Section (Sticky) */}
      <div className="sticky top-[72px] z-30 bg-white border-b border-gray-200 shadow-sm transition-all py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Search Input (Left) */}
          <div className="relative w-full md:max-w-xs shrink-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-50 border border-gray-300 rounded-lg pl-10 pr-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:bg-white focus:border-[#cc0000] focus:ring-1 focus:ring-[#cc0000] transition-all"
            />
          </div>

          {/* Category Filter Tabs (Right, Scrollable) */}
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none py-1 -mx-4 px-4 md:mx-0 md:px-0">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all duration-300 ${
                selectedCategory === 'all'
                  ? 'bg-[#cc0000] text-white shadow-sm'
                  : 'bg-white text-[#1a1a1a] border border-gray-300 hover:border-[#cc0000] hover:text-[#cc0000]'
              }`}
            >
              All Products
            </button>
            {initialCategories.map((cat) => (
              <button
                key={cat._id}
                onClick={() => setSelectedCategory(cat.slug || '')}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all duration-300 ${
                  selectedCategory === cat.slug
                    ? 'bg-[#cc0000] text-white shadow-sm'
                    : 'bg-white text-[#1a1a1a] border border-gray-300 hover:border-[#cc0000] hover:text-[#cc0000]'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Products Catalog */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        {filteredProducts.length === 0 ? (
          /* Empty State */
          <div className="flex flex-col items-center justify-center text-center py-20 bg-white rounded-2xl border border-gray-200 shadow-sm px-6 max-w-xl mx-auto mt-8">
            <div className="p-4 rounded-full bg-red-50 text-[#cc0000] mb-4">
              <PackageOpen size={40} />
            </div>
            <h3 className="text-xl font-bold text-gray-900">No products found</h3>
            <p className="text-[#444444] text-sm mt-2 max-w-sm">
              We couldn&apos;t find any products matching your search criteria. Try adjusting your search query or choosing a different category.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="mt-6 inline-flex items-center justify-center bg-[#cc0000] hover:bg-[#aa0000] text-white px-5 py-2.5 rounded text-sm font-bold uppercase tracking-wider transition-all"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          /* Products Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div key={product._id} className="h-full">
                <ProductCard product={product} whatsappNumber={whatsappNumber} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
