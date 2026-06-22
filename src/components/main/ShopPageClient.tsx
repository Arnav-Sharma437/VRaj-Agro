'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, PackageOpen, ArrowRight, ChevronRight } from 'lucide-react';
import ProductCard from '@/components/main/ProductCard';
import { ICategory, IProduct } from '@/types';

interface ShopPageClientProps {
  initialCategories: ICategory[];
  initialProducts: IProduct[];
}

const fallbackCategoryImage = 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=400';

export default function ShopPageClient({ initialCategories, initialProducts }: ShopPageClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Read URL search params
  const categoryQuery = searchParams.get('category') || '';

  // Local state for search bar input
  const [searchQuery, setSearchQuery] = useState('');
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
        console.error('Failed to fetch contact number inside ShopPageClient', err);
      }
    };
    fetchContact();
  }, []);

  // Determine current UI View State
  const viewState = searchQuery.trim() !== ''
    ? 'search'
    : categoryQuery
      ? 'products'
      : 'main';

  // Navigation helper updates the URL search params to support browser history
  const handleNavigate = (cat?: string) => {
    const params = new URLSearchParams();
    if (cat) params.set('category', cat);
    
    const queryStr = params.toString();
    router.push(queryStr ? `/shop?${queryStr}` : '/shop', { scroll: false });
  };

  // Safe category slug resolver
  const getProductCategorySlug = (product: IProduct): string => {
    if (typeof product.category === 'object' && product.category) {
      return product.category.slug || '';
    }
    return '';
  };

  // Filter products based on URL params and search query
  const filteredProducts = useMemo(() => {
    return initialProducts.filter((product) => {
      const matchesSearch =
        searchQuery.trim() === '' ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.short_description &&
          product.short_description.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (product.full_description &&
          product.full_description.toLowerCase().includes(searchQuery.toLowerCase()));

      if (searchQuery.trim() !== '') {
        return matchesSearch;
      }

      const prodCatSlug = getProductCategorySlug(product);
      const matchesCategory = categoryQuery === '' || prodCatSlug === categoryQuery;

      return matchesCategory && matchesSearch;
    });
  }, [initialProducts, categoryQuery, searchQuery]);

  // Compute product counts for main categories dynamically from DB data
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: initialProducts.length };
    initialCategories.forEach((cat) => {
      const slug = cat.slug || '';
      if (slug) {
        counts[slug] = initialProducts.filter((p) => getProductCategorySlug(p) === slug).length;
      }
    });
    return counts;
  }, [initialProducts, initialCategories]);

  // Resolve active category info dynamically from DB data
  const activeCategoryInfo = useMemo(() => {
    return initialCategories.find(c => c.slug === categoryQuery);
  }, [categoryQuery, initialCategories]);

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      
      {/* 1. Header Banner */}
      <div className="bg-gradient-to-r from-[#1a1a1a] to-[#cc0000] py-16 w-full flex flex-col justify-center items-center px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight uppercase text-center relative z-10">
          Product Catalogue
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-center text-white/80 text-sm md:text-base relative z-10 font-medium">
          V.Raj Agro — Premium Agricultural Machinery, Tractor Trolleys & Construction Concrete Mixers
        </p>
      </div>

      {/* 2. Main Content Wrapper */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        
        {/* Dynamic Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs text-gray-500 font-bold mb-6">
          <button onClick={() => { setSearchQuery(''); handleNavigate(); }} className="hover:text-[#cc0000] transition-colors">
            SHOP
          </button>
          {categoryQuery && (
            <>
              <ChevronRight size={14} className="text-gray-400" />
              <span className="text-gray-900 font-extrabold uppercase truncate">
                {activeCategoryInfo?.name || categoryQuery.replace(/-/g, ' ')}
              </span>
            </>
          )}
        </nav>

        {/* 3. Search Bar Container */}
        <div className="bg-white rounded-2xl border border-gray-250 p-4 sm:p-5 shadow-sm mb-8 flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search products in catalogue..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-50 border border-gray-300 rounded-xl pl-11 pr-4 py-3 text-sm text-gray-900 focus:outline-none focus:bg-white focus:border-[#cc0000] focus:ring-1 focus:ring-[#cc0000] transition-all"
            />
          </div>
          {(viewState === 'products' || viewState === 'search') && (
            <p className="text-sm text-gray-500 font-medium">
              Showing <strong className="text-gray-900">{filteredProducts.length}</strong> products
            </p>
          )}
        </div>

        {/* 4. Dynamic Views */}

        {/* VIEW 1: Main Category Cards List */}
        {viewState === 'main' && (
          <div className="space-y-6">
            <p className="text-sm text-gray-500 font-bold uppercase tracking-wider mb-4">
              Select a category to browse products
            </p>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {initialCategories.map((cat) => {
                const count = categoryCounts[cat.slug || ''] || 0;
                
                return (
                  <button
                    key={cat.slug}
                    onClick={() => handleNavigate(cat.slug)}
                    className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white text-left shadow-md hover:shadow-xl hover:border-[#cc0000] transition-all duration-300 cursor-pointer h-full"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 w-full shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={cat.image || fallbackCategoryImage}
                        alt={cat.name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <h2 className="mb-2 font-display text-lg font-bold text-gray-900 group-hover:text-[#cc0000] transition-colors leading-tight">
                        {cat.name}
                      </h2>
                      <p className="mb-4 flex-1 text-sm text-gray-500 leading-relaxed line-clamp-3">
                        {cat.description || `High-quality ${cat.name} machinery manufactured by V.Raj Agro.`}
                      </p>
                      <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
                        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#cc0000]">
                          VIEW PRODUCTS <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                        </span>
                        <span className="text-[11px] font-bold text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                          {count} Products
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* VIEW 2: Products Grid & Search Results */}
        {(viewState === 'products' || viewState === 'search') && (
          <div>
            {filteredProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center text-center py-16 bg-white rounded-2xl border border-gray-200 shadow-sm px-6 max-w-xl mx-auto">
                <div className="p-4 rounded-full bg-red-50 text-[#cc0000] mb-4">
                  <PackageOpen size={40} />
                </div>
                <h3 className="text-xl font-bold text-gray-900">No products found</h3>
                <p className="text-gray-500 text-sm mt-2 max-w-sm">
                  We couldn&apos;t find any products matching your selection. Try clearing filters or using another search query.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    handleNavigate(categoryQuery || undefined);
                  }}
                  className="mt-6 inline-flex items-center justify-center bg-[#cc0000] hover:bg-[#aa0000] text-white px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5">
                {filteredProducts.map((product) => (
                  <div key={product._id} className="h-full">
                    <ProductCard product={product} whatsappNumber={whatsappNumber} />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
