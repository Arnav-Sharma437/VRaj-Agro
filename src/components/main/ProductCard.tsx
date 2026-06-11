'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MessageCircle } from 'lucide-react';
import { IProduct } from '@/types';

interface ProductCardProps {
  product: IProduct;
  whatsappNumber?: string;
}

export default function ProductCard({ product, whatsappNumber }: ProductCardProps) {
  const [localWhatsapp, setLocalWhatsapp] = useState<string>('');

  useEffect(() => {
    // If whatsappNumber is not passed from parent, fetch it
    if (!whatsappNumber) {
      const fetchContact = async () => {
        try {
          const res = await fetch('/api/contact-info');
          if (res.ok) {
            const data = await res.json();
            setLocalWhatsapp(data.whatsapp || '');
          }
        } catch (err) {
          console.error('Error fetching contact info inside ProductCard', err);
        }
      };
      fetchContact();
    }
  }, [whatsappNumber]);

  const targetWhatsapp = whatsappNumber || localWhatsapp;
  const cleanNumber = targetWhatsapp.replace(/[^0-9]/g, '');
  const message = encodeURIComponent(`Hello, I am interested in ${product.name}. Please share more details.`);
  const whatsappUrl = cleanNumber
    ? `https://wa.me/${cleanNumber}?text=${message}`
    : '#';

  const categoryName = typeof product.category === 'object' && product.category
    ? product.category.name
    : 'Agriculture';

  return (
    <div className="group flex flex-col bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-lg hover:border-green-100 transition-all duration-300 h-full">
      {/* Product Image Link */}
      <Link href={`/product/${product.slug}`} className="relative aspect-[4/3] w-full overflow-hidden bg-gray-50 block">
        <Image
          src={product.images && product.images.length > 0 ? product.images[0] : 'https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?auto=format&fit=crop&q=80&w=400'}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 50vw, 25vw"
        />
      </Link>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2.5">
          {/* Category Badge */}
          <div>
            <span className="inline-block bg-[#f0fff4] text-[#2d6a4f] text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider border border-[#d3f9d8]">
              {categoryName}
            </span>
          </div>

          {/* Title */}
          <Link href={`/product/${product.slug}`} className="block">
            <h3 className="font-extrabold text-gray-900 group-hover:text-[#2d6a4f] transition-colors duration-300 text-base md:text-lg leading-snug line-clamp-1">
              {product.name}
            </h3>
          </Link>

          {/* Description */}
          <p className="text-gray-500 text-xs md:text-sm leading-relaxed line-clamp-2">
            {product.short_description}
          </p>
        </div>

        {/* Buttons */}
        <div className="space-y-2 pt-2">
          {cleanNumber ? (
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-[#2d6a4f] hover:bg-[#1b4332] text-white py-2.5 rounded-xl text-xs md:text-sm font-bold shadow-sm transition-all duration-300"
            >
              <MessageCircle size={16} className="fill-current" />
              <span>Enquire on WhatsApp</span>
            </a>
          ) : (
            <div className="h-10 w-full bg-gray-55 animate-pulse rounded-xl" />
          )}
          <Link
            href={`/product/${product.slug}`}
            className="block text-center border border-gray-200 hover:border-[#2d6a4f] hover:text-[#2d6a4f] text-gray-750 py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all duration-300"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
