'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, PackageOpen, ArrowRight, ChevronRight } from 'lucide-react';
import ProductCard from '@/components/main/ProductCard';
import { ICategory, IProduct } from '@/types';
import {
  MAIN_CATEGORIES_INFO,
  SUB_CATEGORIES,
  getSubCategoriesOf,
  getCategoryInfo,
  getSubCategoryInfo
} from '@/lib/categories-data';

interface ShopPageClientProps {
  initialCategories: ICategory[];
  initialProducts: IProduct[];
}

// Fallback logic to resolve subcategories for products if unpopulated in DB
export function getProductSubCategory(product: IProduct): string {
  if (product.sub_category) {
    return product.sub_category;
  }

  const name = product.name.toLowerCase();
  const catSlug = typeof product.category === 'object' && product.category ? product.category.slug : '';

  if (catSlug === 'concrete-mixers') {
    if (name.includes('diesel')) return 'diesel-concrete-mixers';
    if (name.includes('electric') || name.includes('electrical')) return 'electric-concrete-mixers';
    if (name.includes('hydraulic')) return 'hydraulic-concrete-mixers';
    if (name.includes('lift')) return 'lift-type-concrete-mixers';
    return 'hand-operated-concrete-mixers';
  }

  if (catSlug === 'tractor-trolleys') {
    if (name.includes('hydraulic') || name.includes('tipping')) return 'hydraulic-tipping-trolleys';
    if (name.includes('non-tipping') || name.includes('non tipping')) return 'non-tipping-trolleys';
    if (name.includes('double axle') || name.includes('double-axle')) return 'double-axle-trolleys';
    return 'single-axle-trolleys';
  }

  if (catSlug === 'agricultural-plows') {
    if (name.includes('disc')) return 'disc-plows';
    if (name.includes('mouldboard') || name.includes('mb')) return 'mouldboard-plows';
    if (name.includes('chisel')) return 'chisel-plows';
    return 'rotavators-cultivators';
  }

  if (catSlug === 'threshers-harvesters') {
    if (name.includes('crop') || name.includes('multi')) return 'multi-crop-threshers';
    if (name.includes('paddy')) return 'paddy-threshers';
    if (name.includes('maize') || name.includes('sheller')) return 'maize-shellers';
    return 'straw-reapers-harvesters';
  }

  return '';
}

export default function ShopPageClient({ initialCategories, initialProducts }: ShopPageClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Read URL search params
  const categoryQuery = searchParams.get('category') || '';
  const subCategoryQuery = searchParams.get('sub') || '';

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

  // Determine current UI View State (H)
  const viewState = searchQuery.trim() !== ''
    ? 'search'
    : categoryQuery
      ? (subCategoryQuery ? 'products' : 'subcategories')
      : 'main';

  // Navigation helper updates the URL search params to support browser history
  const handleNavigate = (cat?: string, sub?: string) => {
    const params = new URLSearchParams();
    if (cat) params.set('category', cat);
    if (sub) params.set('sub', sub);
    
    const queryStr = params.toString();
    router.push(queryStr ? `/shop?${queryStr}` : '/shop', { scroll: false });
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

      const prodCatSlug = typeof product.category === 'object' && product.category
        ? product.category.slug
        : '';
      const matchesCategory = categoryQuery === '' || prodCatSlug === categoryQuery;

      const resolvedSubCat = getProductSubCategory(product);
      const matchesSubCategory = subCategoryQuery === '' || resolvedSubCat === subCategoryQuery;

      return matchesCategory && matchesSubCategory && matchesSearch;
    });
  }, [initialProducts, categoryQuery, subCategoryQuery, searchQuery]);

  // Compute product counts for main categories
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: initialProducts.length };
    MAIN_CATEGORIES_INFO.forEach((cat) => {
      counts[cat.slug] = initialProducts.filter((p) => {
        const prodCatSlug = typeof p.category === 'object' && p.category ? p.category.slug : '';
        return prodCatSlug === cat.slug;
      }).length;
    });
    return counts;
  }, [initialProducts]);

  // Compute product counts for subcategories
  const subCategoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    SUB_CATEGORIES.forEach((sub) => {
      counts[sub.slug] = initialProducts.filter((p) => {
        const prodCatSlug = typeof p.category === 'object' && p.category ? p.category.slug : '';
        const resolvedSub = getProductSubCategory(p);
        return prodCatSlug === sub.categorySlug && resolvedSub === sub.slug;
      }).length;
    });
    return counts;
  }, [initialProducts]);

  // Resolve active category and subcategory info objects
  const activeCategoryInfo = useMemo(() => {
    return categoryQuery ? getCategoryInfo(categoryQuery) : undefined;
  }, [categoryQuery]);

  const activeSubCategoryInfo = useMemo(() => {
    return (categoryQuery && subCategoryQuery) ? getSubCategoryInfo(categoryQuery, subCategoryQuery) : undefined;
  }, [categoryQuery, subCategoryQuery]);

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
              <button 
                onClick={() => { setSearchQuery(''); handleNavigate(categoryQuery); }} 
                className={`hover:text-[#cc0000] transition-colors uppercase ${!subCategoryQuery ? 'text-gray-900 font-extrabold' : ''}`}
              >
                {activeCategoryInfo?.name || categoryQuery.replace(/-/g, ' ')}
              </button>
            </>
          )}
          {subCategoryQuery && (
            <>
              <ChevronRight size={14} className="text-gray-400" />
              <span className="text-gray-900 font-extrabold uppercase truncate">
                {activeSubCategoryInfo?.name || subCategoryQuery.replace(/-/g, ' ')}
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
              Select a main category to browse the catalogue
            </p>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {MAIN_CATEGORIES_INFO.map((cat) => {
                // Find matching category object to get count
                const matchedCategory = initialCategories.find(c => c.slug === cat.slug);
                const count = categoryCounts[cat.slug] || 0;
                
                return (
                  <button
                    key={cat.slug}
                    onClick={() => handleNavigate(cat.slug)}
                    className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white text-left shadow-md hover:shadow-xl hover:border-[#cc0000] transition-all duration-300 cursor-pointer h-full"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 w-full shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={matchedCategory?.image || cat.imageFile}
                        alt={cat.name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <h2 className="mb-2 font-display text-lg font-bold text-gray-900 group-hover:text-[#cc0000] transition-colors leading-tight">
                        {cat.name}
                      </h2>
                      <p className="mb-4 flex-1 text-sm text-gray-500 leading-relaxed line-clamp-3">
                        {cat.description}
                      </p>
                      <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
                        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#cc0000]">
                          BROWSE CATALOGUE <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
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

        {/* VIEW 2: Subcategory/Inner Cards List */}
        {viewState === 'subcategories' && activeCategoryInfo && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-gray-200 pb-3">
              <h2 className="text-xl font-bold text-gray-900 uppercase">
                {activeCategoryInfo.name} Sub-Categories
              </h2>
              <p className="text-sm text-gray-500 font-medium mt-1 md:mt-0">
                Select a sub-category under <strong className="text-gray-900">{activeCategoryInfo.name}</strong>
              </p>
            </div>
            
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {getSubCategoriesOf(categoryQuery).map((sub) => {
                const count = subCategoryCounts[sub.slug] || 0;
                return (
                  <button
                    key={sub.slug}
                    onClick={() => handleNavigate(categoryQuery, sub.slug)}
                    className="group flex items-center justify-between rounded-2xl border border-gray-200 bg-white p-5 text-left shadow-sm hover:border-[#cc0000] hover:shadow-md transition-all duration-200 cursor-pointer"
                  >
                    <div>
                      <span className="block font-display text-base font-bold text-gray-900 group-hover:text-[#cc0000] transition-colors leading-tight">
                        {sub.name}
                      </span>
                      <span className="block text-[11px] font-semibold text-gray-400 mt-1">
                        {count} Products Available
                      </span>
                    </div>
                    <ArrowRight className="h-5 w-5 shrink-0 text-[#cc0000] opacity-70 transition-all group-hover:translate-x-1 group-hover:opacity-100" />
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* VIEW 3: Products Grid & Search Results */}
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
