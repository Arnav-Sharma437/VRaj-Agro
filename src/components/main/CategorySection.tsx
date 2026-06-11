'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { ICategory } from '@/types';

// Fallback categories list to display if DB is empty
const fallbackCategories = [
  { name: 'Concrete Mixers', slug: 'concrete-mixers', image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=400' },
  { name: 'Tractor Trolleys', slug: 'tractor-trolleys', image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=400' },
  { name: 'Agricultural Plows', slug: 'agricultural-plows', image: 'https://images.unsplash.com/photo-1622383563227-04401ab4e5ea?auto=format&fit=crop&q=80&w=400' },
  { name: 'Threshers & Harvesters', slug: 'threshers-harvesters', image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&q=80&w=400' }
];

export default function CategorySection() {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('/api/categories');
        if (res.ok) {
          const data = await res.json();
          setCategories(data);
        }
      } catch (err) {
        console.error('Failed to fetch categories', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  if (loading) {
    return (
      <section className="py-16 bg-[#f5f5f5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12">
            <div className="h-8 w-60 bg-gray-250 animate-pulse rounded mx-auto mb-3" />
            <div className="h-1 bg-red-600 w-16 mx-auto mb-3" />
            <div className="h-4 w-72 bg-gray-200 animate-pulse rounded mx-auto" />
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-lg border border-gray-100 p-4 space-y-4 animate-pulse">
                <div className="aspect-square bg-gray-200 rounded w-full" />
                <div className="h-5 bg-gray-200 rounded w-1/2 mx-auto" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  const list = categories.length > 0 ? categories : fallbackCategories;

  return (
    <section className="py-16 bg-[#f5f5f5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Red Underline */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <h2 className="text-3xl md:text-4xl font-black text-[#1a1a1a] tracking-tight uppercase">
            Our Product Categories
          </h2>
          <div className="w-20 h-1 bg-[#cc0000] mx-auto rounded" />
          <p className="text-xs md:text-sm text-gray-500 font-bold uppercase tracking-wider">
            Explore our robust machinery built for agriculture and construction.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {list.map((category) => (
            <Link
              key={category.slug}
              href={`/shop?category=${category.slug}`}
              className="group flex flex-col bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-300"
            >
              {/* Image with Hover Overlays */}
              <div className="relative aspect-square w-full overflow-hidden bg-gray-100">
                <Image
                  src={category.image || fallbackCategories[0].image}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                
                {/* Red Semi-Transparent Overlay on Hover */}
                <div className="absolute inset-0 bg-[#cc0000]/70 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-300">
                  <div className="p-3 bg-white text-[#cc0000] rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-350 shadow-lg">
                    <ArrowRight size={24} />
                  </div>
                </div>
              </div>

              {/* Title below image */}
              <div className="p-4 bg-white flex-1 flex items-center justify-center">
                <h3 className="font-semibold text-center text-[#1a1a1a] group-hover:text-[#cc0000] uppercase tracking-wide transition-colors duration-300 text-sm md:text-base leading-snug">
                  {category.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
