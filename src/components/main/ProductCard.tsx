'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { MessageCircle } from 'lucide-react';
import { IProduct } from '@/types';

interface ProductCardProps {
  product: IProduct;
  whatsappNumber?: string;
}

export default function ProductCard({ product, whatsappNumber }: ProductCardProps) {
  const router = useRouter();
  const [localWhatsapp, setLocalWhatsapp] = useState<string>('');

  useEffect(() => {
    // If whatsappNumber is not passed from parent, fetch it
    if (!whatsappNumber) {
      const fetchContact = async () => {
        try {
          const res = await fetch('/api/contact-info');
          if (res.ok) {
            const data = await res.json();
            setLocalWhatsapp(data.whatsapp || '918871822944');
          }
        } catch (err) {
          console.error('Error fetching contact info inside ProductCard', err);
        }
      };
      fetchContact();
    }
  }, [whatsappNumber]);

  const targetWhatsapp = whatsappNumber || localWhatsapp || '918871822944';
  const cleanNumber = targetWhatsapp.replace(/[^0-9]/g, '');
  const message = encodeURIComponent(`Hello, I am interested in ${product.name}. Please share more details.`);
  const whatsappUrl = `https://wa.me/${cleanNumber}?text=${message}`;

  const categoryName = typeof product.category === 'object' && product.category
    ? product.category.name
    : 'Machine';

  const handleCardClick = () => {
    router.push(`/product/${product.slug}`);
  };

  return (
    <div
      onClick={handleCardClick}
      className="group flex flex-col bg-white rounded-xl border border-gray-200 overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 hover:scale-[1.01] transition-all duration-300 h-full relative cursor-pointer"
    >
      {/* Product Image (Top, full width) */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-50 block">
        {/* Badges Container (Top-left inside image container) */}
        <div className="absolute top-2 left-2 z-10 flex flex-col gap-1 items-start">
          {product.is_featured && (
            <span className="bg-[#f5a623] text-black text-xs font-bold px-2 py-1 rounded shadow-sm">
              Featured
            </span>
          )}
          {product.show_price && product.price !== undefined && product.price > 0 && product.discount_percent !== undefined && product.discount_percent > 0 && (
            <span className="bg-green-600 text-white text-xs font-bold px-2 py-1 rounded shadow-sm">
              {product.discount_percent}% OFF
            </span>
          )}
        </div>
        <Image
          src={product.images && product.images.length > 0 ? product.images[0] : 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=400'}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-103"
          sizes="(max-width: 768px) 50vw, 25vw"
        />
      </div>

      {/* Card Body */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          {/* Red Category Badge */}
          <div>
            <span className="inline-block bg-[#cc0000] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              {categoryName}
            </span>
          </div>

          {/* Title */}
          <div>
            <h3 className="font-bold text-[#1a1a1a] group-hover:text-[#cc0000] transition-colors duration-300 text-base leading-snug line-clamp-1">
              {product.name}
            </h3>
          </div>

          {/* Description */}
          <p className="text-[#444444] text-sm leading-relaxed line-clamp-2">
             {product.short_description}
          </p>
        </div>

        {/* Price Row */}
        {product.show_price && product.price !== undefined && product.price > 0 && (
          <div className="flex items-baseline gap-1 pt-1">
            <span className="font-bold text-[#1a1a1a] text-lg">
              ₹{Math.round(product.price - (product.price * (product.discount_percent || 0) / 100)).toLocaleString('en-IN')}
            </span>
            {product.discount_percent !== undefined && product.discount_percent > 0 && (
              <span className="line-through text-gray-400 text-sm ml-2">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
            )}
          </div>
        )}

        {/* Buttons */}
        <div className="space-y-2 pt-2">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center justify-center gap-2 w-full bg-[#cc0000] hover:bg-[#aa0000] text-white py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider shadow-sm transition-all duration-300"
          >
            <MessageCircle size={14} className="fill-current" />
            <span>Enquire on WhatsApp</span>
          </a>
          <button
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/product/${product.slug}`);
            }}
            className="block w-full text-center border border-[#cc0000] hover:bg-red-50 text-[#cc0000] py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-300 bg-white"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}
