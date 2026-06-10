import React from 'react';

interface ProductDetailPageProps {
  params: {
    slug: string;
  };
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-4 font-sans">Product Detail</h1>
      <p className="text-gray-600">
        Viewing product details for slug: <span className="font-semibold text-green-750">{params.slug}</span>
      </p>
    </div>
  );
}
