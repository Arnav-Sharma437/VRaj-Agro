'use client';

import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { IProduct } from '@/types';

export default function FeaturedProducts() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [whatsappNumber, setWhatsappNumber] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        // Fetch products and contact info concurrently
        const [prodRes, contactRes] = await Promise.all([
          fetch('/api/products?featured=true'),
          fetch('/api/contact-info')
        ]);

        if (prodRes.ok) {
          const prodData = await prodRes.json();
          setProducts(prodData);
        }
        if (contactRes.ok) {
          const contactData = await contactRes.json();
          setWhatsappNumber(contactData.whatsapp || '');
        }
      } catch (err) {
        console.error('Failed to fetch initial data for FeaturedProducts', err);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12">
            <div className="h-8 w-56 bg-gray-200 animate-pulse rounded mx-auto mb-3" />
            <div className="h-4 w-72 bg-gray-250 animate-pulse rounded mx-auto" />
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-4 space-y-4 animate-pulse">
                <div className="aspect-[4/3] bg-gray-200 rounded-xl w-full" />
                <div className="h-4 bg-gray-200 rounded w-1/3" />
                <div className="h-5 bg-gray-250 rounded w-3/4" />
                <div className="h-4 bg-gray-200 rounded w-full" />
                <div className="h-10 bg-gray-200 rounded-xl w-full mt-4" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // If no featured products exist, show nothing or custom empty state
  if (products.length === 0) {
    return (
      <section className="py-16 bg-white border-t border-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-12">
          <h2 className="text-3xl font-extrabold text-[#2d6a4f] mb-4">Featured Products</h2>
          <p className="text-gray-500 max-w-md mx-auto text-sm md:text-base">
            No featured products yet. Please check back later or browse all products in our shop.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white border-t border-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#2d6a4f] tracking-tight">
            Featured Products
          </h2>
          <p className="text-sm md:text-base text-gray-500 font-medium">
            Discover our handpicked premium selection of high-yield crops, seeds, and equipment.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {products.map((product) => (
            <ProductCard
              key={product._id || product.slug}
              product={product}
              whatsappNumber={whatsappNumber}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
