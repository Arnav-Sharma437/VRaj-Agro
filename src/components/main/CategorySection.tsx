'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ICategory } from '@/types';

// Fallback categories list to display if DB is empty
const fallbackCategories = [
  { name: 'Seeds', slug: 'seeds', image: 'https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&q=80&w=400' },
  { name: 'Fertilizers', slug: 'fertilizers', image: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?auto=format&fit=crop&q=80&w=400' },
  { name: 'Pesticides', slug: 'pesticides', image: 'https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?auto=format&fit=crop&q=80&w=400' },
  { name: 'Equipments', slug: 'equipments', image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=400' }
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
      <section className="py-16 bg-[#f8fffe]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12">
            <div className="h-8 w-48 bg-gray-200 animate-pulse rounded mx-auto mb-3" />
            <div className="h-4 w-64 bg-gray-250 animate-pulse rounded mx-auto" />
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-4 space-y-4 animate-pulse">
                <div className="aspect-square bg-gray-200 rounded-xl w-full" />
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
    <section className="py-16 bg-[#f8fffe]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#2d6a4f] tracking-tight">
            Shop by Category
          </h2>
          <p className="text-sm md:text-base text-gray-500 font-medium">
            Explore our wide range of premium products tailored for your farm&apos;s needs.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {list.map((category) => (
            <Link
              key={category.slug}
              href={`/shop?category=${category.slug}`}
              className="group flex flex-col bg-white rounded-2xl border border-gray-100 p-4 hover:shadow-lg hover:border-green-100 hover:scale-105 transition-all duration-300"
            >
              <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-gray-100 mb-4">
                <Image
                  src={category.image || 'https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?auto=format&fit=crop&q=80&w=400'}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
              <h3 className="text-center font-bold text-gray-900 group-hover:text-[#2d6a4f] transition-colors duration-300 text-sm md:text-base">
                {category.name}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
