'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface ProductGalleryProps {
  images: string[];
  name: string;
}

export default function ProductGallery({ images, name }: ProductGalleryProps) {
  const [activeIdx, setActiveIdx] = useState(0);

  // Fallback image if none exist
  const galleryImages = images && images.length > 0
    ? images
    : ['https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=600'];

  return (
    <div className="space-y-4">
      {/* Main Large Image */}
      <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-gray-50 border border-gray-200 shadow-sm group">
        <Image
          src={galleryImages[activeIdx]}
          alt={`${name} Image Preview`}
          fill
          className="object-cover transition-all duration-500 group-hover:scale-[1.02]"
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority
        />
      </div>

      {/* Thumbnail Rows */}
      {galleryImages.length > 1 && (
        <div className="flex gap-3 overflow-x-auto scrollbar-none py-1">
          {galleryImages.map((imgUrl, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIdx(idx)}
              className={`relative h-20 w-24 shrink-0 rounded-xl overflow-hidden border-2 bg-gray-50 focus:outline-none transition-all duration-300 ${
                activeIdx === idx
                  ? 'border-[#cc0000] scale-[0.98] shadow-sm'
                  : 'border-gray-200 hover:border-[#cc0000]/60'
              }`}
            >
              <Image
                src={imgUrl}
                alt={`${name} Thumbnail ${idx + 1}`}
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
