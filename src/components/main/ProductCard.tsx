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
            setLocalWhatsapp(data.whatsapp || '919300311126');
          }
        } catch (err) {
          console.error('Error fetching contact info inside ProductCard', err);
        }
      };
      fetchContact();
    }
  }, [whatsappNumber]);

  const targetWhatsapp = whatsappNumber || localWhatsapp || '919300311126';
  const cleanNumber = targetWhatsapp.replace(/[^0-9]/g, '');
  const message = encodeURIComponent(`Hello, I am interested in ${product.name}. Please share more details.`);
  const whatsappUrl = `https://wa.me/${cleanNumber}?text=${message}`;

  const categoryName = typeof product.category === 'object' && product.category
    ? product.category.name
    : 'Machine';

  return (
    <div className="group flex flex-col bg-white rounded border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 h-full relative">
      {/* Yellow Featured Badge (Top-left) */}
      {product.is_featured && (
        <span className="absolute top-3 left-3 z-30 bg-[#f5a623] text-[#1a1a1a] text-[10px] font-black uppercase px-2.5 py-1 rounded tracking-wider shadow-sm">
          Featured
        </span>
      )}

      {/* Product Image (Top, full width) */}
      <Link href={`/product/${product.slug}`} className="relative aspect-[4/3] w-full overflow-hidden bg-gray-50 block">
        <Image
          src={product.images && product.images.length > 0 ? product.images[0] : 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=400'}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-103"
          sizes="(max-width: 768px) 50vw, 25vw"
        />
      </Link>

      {/* Card Body */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          {/* Red Category Badge */}
          <div>
            <span className="inline-block bg-[#cc0000] text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
              {categoryName}
            </span>
          </div>

          {/* Title */}
          <Link href={`/product/${product.slug}`} className="block">
            <h3 className="font-extrabold text-[#1a1a1a] group-hover:text-[#cc0000] transition-colors duration-300 text-sm md:text-base leading-snug line-clamp-1">
              {product.name}
            </h3>
          </Link>

          {/* Description */}
          <p className="text-[#444444] text-xs leading-relaxed line-clamp-2">
            {product.short_description}
          </p>
        </div>

        {/* Buttons */}
        <div className="space-y-2 pt-2">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full bg-[#cc0000] hover:bg-[#aa0000] text-white py-2.5 rounded text-xs font-bold uppercase tracking-wider shadow-sm transition-all duration-300"
          >
            <MessageCircle size={14} className="fill-current" />
            <span>Enquire on WhatsApp</span>
          </a>
          <Link
            href={`/product/${product.slug}`}
            className="block text-center border border-gray-250 hover:border-[#cc0000] hover:text-[#cc0000] text-gray-700 py-2 rounded text-xs font-bold uppercase tracking-wider transition-all duration-300"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
