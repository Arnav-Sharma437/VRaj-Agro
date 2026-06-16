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
          setWhatsappNumber(contactData.whatsapp || '918871822944');
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
      <section className="py-16 bg-[#f5f5f5] border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12">
            <div className="h-8 w-56 bg-gray-200 animate-pulse rounded mx-auto mb-3" />
            <div className="h-1 bg-red-650 w-16 mx-auto mb-3" />
            <div className="h-4 w-72 bg-gray-250 animate-pulse rounded mx-auto" />
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded border border-gray-250 p-4 space-y-4 animate-pulse">
                <div className="aspect-[4/3] bg-gray-200 rounded w-full" />
                <div className="h-4 bg-gray-200 rounded w-1/3" />
                <div className="h-5 bg-gray-255 rounded w-3/4" />
                <div className="h-4 bg-gray-200 rounded w-full" />
                <div className="h-10 bg-gray-200 rounded w-full mt-4" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // If no featured products exist, hide section completely
  if (products.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-[#f5f5f5] border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Red Underline */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <h2 className="text-3xl md:text-4xl font-black text-[#1a1a1a] tracking-tight uppercase">
            Our Featured Products
          </h2>
          <div className="w-20 h-1 bg-[#cc0000] mx-auto rounded" />
          <p className="text-xs md:text-sm text-gray-500 font-bold uppercase tracking-wider">
            Premium machinery engineered for durability, performance, and maximum efficiency.
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
