import React from 'react';
import Link from 'next/link';
import { IProduct } from '@/types';

interface ProductCardProps {
  product: IProduct;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-white flex flex-col h-full">
      <div className="h-48 bg-gray-200 flex items-center justify-center relative">
        {product.images && product.images.length > 0 ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
        ) : (
          <span className="text-gray-400 font-semibold">{product.name}</span>
        )}
      </div>
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-bold text-lg text-gray-900">{product.name}</h3>
          <p className="text-sm text-gray-500 mt-1 line-clamp-2">{product.short_description}</p>
        </div>
        <div className="mt-4">
          <Link href={`/product/${product.slug}`} className="block text-center bg-green-700 hover:bg-green-800 text-white font-medium py-2 rounded-md transition-colors text-sm">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
