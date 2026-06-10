import React from 'react';
import Link from 'next/link';
import { ICategory } from '@/types';

interface CategorySectionProps {
  categories: ICategory[];
}

export const CategorySection: React.FC<CategorySectionProps> = ({ categories }) => {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link key={category.slug} href={`/shop?category=${category.slug}`} className="group block border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="h-48 bg-gray-200 flex items-center justify-center">
                {category.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={category.image} alt={category.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                ) : (
                  <span className="text-gray-400 font-semibold">{category.name}</span>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg text-gray-900 group-hover:text-green-700 transition-colors">{category.name}</h3>
                {category.description && <p className="text-sm text-gray-500 mt-1 line-clamp-2">{category.description}</p>}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
