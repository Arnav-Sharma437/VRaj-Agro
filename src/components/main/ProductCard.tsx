'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { IProduct } from '@/types';

interface ProductCardProps {
  product: IProduct;
  whatsappNumber?: string;
}

export default function ProductCard({ product, whatsappNumber }: ProductCardProps) {
  const router = useRouter();
  const [localWhatsapp, setLocalWhatsapp] = useState<string>('');

  useEffect(() => {
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

  const price = product.price || 0;
  const discountPercent = product.discount_percent || 0;
  const showPrice = product.show_price || false;

  const discountedPrice = price && discountPercent
    ? Math.round(price - (price * discountPercent / 100))
    : price;

  const handleCardClick = () => {
    router.push(`/product/${product.slug}`);
  };

  return (
    <div
      onClick={handleCardClick}
      className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:translate-y-[-4px] transition-all duration-[300ms] h-full cursor-pointer"
    >
      {/* IMAGE AREA (h-[210px], relative) */}
      <div className="relative h-[210px] w-full overflow-hidden block">
        {/* Badges */}
        <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
          {product.is_featured && (
            <span className="bg-[#f5a623] text-black text-[10px] font-bold px-2 py-0.5 rounded">
              FEATURED
            </span>
          )}
          {showPrice && price > 0 && discountPercent > 0 && (
            <span className="bg-green-600 text-white text-[10px] font-bold px-2 py-0.5 rounded">
              {discountPercent}% OFF
            </span>
          )}
        </div>

        {product.images && product.images.length > 0 ? (
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="w-full h-full object-cover"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
        ) : (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center">
            {/* Machinery SVG icon */}
            <svg className="w-12 h-12 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
            </svg>
          </div>
        )}
      </div>

      {/* CARD BODY (p-4, flex-1, flex flex-col gap-2) */}
      <div className="p-4 flex-1 flex flex-col gap-2">
        {/* Category pill */}
        <span className="bg-[#cc0000] text-white text-[10px] font-bold px-3 py-1 rounded-full w-fit">
          {categoryName}
        </span>

        {/* Product name */}
        <h3 className="text-[15px] font-bold text-[#1a1a1a] line-clamp-2 leading-snug">
          {product.name}
        </h3>

        {/* Description */}
        {product.short_description && (
          <p className="text-[12px] text-[#666] line-clamp-2">
            {product.short_description}
          </p>
        )}

        {/* Price row */}
        {showPrice && price > 0 && (
          <div className="flex items-baseline">
            <span className="text-[18px] font-black text-[#1a1a1a]">
              ₹{discountedPrice.toLocaleString('en-IN')}
            </span>
            {discountPercent > 0 && (
              <span className="text-[13px] text-gray-400 line-through ml-2">
                ₹{price.toLocaleString('en-IN')}
              </span>
            )}
          </div>
        )}

        {/* Buttons (mt-auto, flex flex-col gap-2 pt-3) */}
        <div className="mt-auto flex flex-col gap-2 pt-3">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="bg-[#cc0000] hover:bg-[#aa0000] text-white rounded-xl py-2.5 w-full font-bold text-[12px] flex items-center justify-center gap-2"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            ENQUIRE ON WHATSAPP
          </a>
          <button
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/product/${product.slug}`);
            }}
            className="border-2 border-[#cc0000] text-[#cc0000] hover:bg-red-50 rounded-xl py-2 w-full font-bold text-[12px] text-center"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}
