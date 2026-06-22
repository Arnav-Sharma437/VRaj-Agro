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
          setWhatsappNumber(data.whatsapp || '918871822944');
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

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: initialProducts.length };
    initialCategories.forEach((cat) => {
      const slug = cat.slug || '';
      if (slug) {
        counts[slug] = initialProducts.filter((product) => 
          (typeof product.category === 'object' && product.category && product.category.slug === slug) ||
          (typeof product.category === 'string' && product.category === slug)
        ).length;
      }
    });
    return counts;
  }, [initialProducts, initialCategories]);

  return (
    <div className="bg-gray-50 min-h-screen pb-16">
      {/* 1. Page Banner */}
      <div className="bg-[#cc0000] h-[140px] md:h-[180px] w-full flex flex-col justify-center items-center px-4 relative overflow-hidden">
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

      {/* 2. Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 flex flex-col md:flex-row gap-6 md:gap-8">
        
        {/* Left column: Sticky Sidebar (hidden on mobile) */}
        <aside className="hidden md:block w-56 shrink-0">
          <div className="sticky top-[90px]">
            <h2 className="text-xs font-bold text-gray-500 mb-3 uppercase tracking-wider">
              FILTER BY CATEGORY
            </h2>
            <div className="space-y-1">
              {/* All Products button */}
              <button
                onClick={() => setSelectedCategory('all')}
                className={`w-full flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-205 ${
                  selectedCategory === 'all'
                    ? 'bg-[#cc0000] text-white shadow-sm'
                    : 'bg-white hover:bg-gray-50 text-[#1a1a1a]'
                }`}
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-lg">
                  📦
                </span>
                <span className={`text-sm font-semibold text-left transition-colors ${selectedCategory === 'all' ? 'text-white' : 'text-[#1a1a1a]'}`}>
                  All Products
                </span>
                <span className={`text-xs ml-auto transition-colors ${selectedCategory === 'all' ? 'text-white' : 'text-gray-400'}`}>
                  {categoryCounts['all'] || 0}
                </span>
              </button>

              {/* Individual Category buttons */}
              {initialCategories.map((cat) => {
                const isActive = selectedCategory === cat.slug;
                return (
                  <button
                    key={cat._id}
                    onClick={() => setSelectedCategory(cat.slug || '')}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-205 ${
                      isActive
                        ? 'bg-[#cc0000] text-white shadow-sm'
                        : 'bg-white hover:bg-gray-50 text-[#1a1a1a]'
                    }`}
                  >
                    {cat.image ? (
                      <img
                        src={cat.image}
                        alt={cat.name}
                        className="w-10 h-10 rounded-lg object-cover shrink-0"
                      />
                    ) : (
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-lg">
                        🚜
                      </span>
                    )}
                    <span className={`text-sm font-semibold truncate text-left transition-colors ${isActive ? 'text-white' : 'text-[#1a1a1a]'}`}>
                      {cat.name}
                    </span>
                    <span className={`text-xs ml-auto transition-colors ${isActive ? 'text-white' : 'text-gray-400'}`}>
                      {categoryCounts[cat.slug || ''] || 0}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

        {/* Right column: Search, Mobile Filters, and Products Grid */}
        <div className="flex-1 space-y-6">
          {/* Search bar container */}
          <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-5 shadow-sm">
            <div className="relative w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-50 border border-gray-300 rounded-xl pl-11 pr-4 py-3 text-sm text-gray-900 focus:outline-none focus:bg-white focus:border-[#cc0000] focus:ring-1 focus:ring-[#cc0000] transition-all"
              />
            </div>
          </div>

          {/* Mobile Category Filters (Visible only on mobile/tablet) */}
          <div className="md:hidden">
            <div className="flex overflow-x-auto gap-2 pb-3 px-0 scrollbar-hide">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-semibold border transition-all ${
                  selectedCategory === 'all'
                    ? 'bg-[#cc0000] text-white border-[#cc0000]'
                    : 'bg-white text-[#1a1a1a] border-gray-200'
                }`}
              >
                All Products ({categoryCounts['all'] || 0})
              </button>
              {initialCategories.map((cat) => {
                const isActive = selectedCategory === cat.slug;
                return (
                  <button
                    key={cat._id}
                    onClick={() => setSelectedCategory(cat.slug || '')}
                    className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-semibold border transition-all ${
                      isActive
                        ? 'bg-[#cc0000] text-white border-[#cc0000]'
                        : 'bg-white text-[#1a1a1a] border-gray-200'
                    }`}
                  >
                    {cat.name} ({categoryCounts[cat.slug || ''] || 0})
                  </button>
                );
              })}
            </div>
          </div>

          {/* Products Grid */}
          <div>
            {filteredProducts.length === 0 ? (
              /* Empty State */
              <div className="flex flex-col items-center justify-center text-center py-16 bg-white rounded-2xl border border-gray-200 shadow-sm px-6 max-w-xl mx-auto">
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
                  className="mt-6 inline-flex items-center justify-center bg-[#cc0000] hover:bg-[#aa0000] text-white px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              /* Grid Layout: 2 columns on mobile, 3 columns on desktop */
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5">
                {filteredProducts.map((product) => (
                  <div key={product._id} className="h-full">
                    <ProductCard product={product} whatsappNumber={whatsappNumber} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
