'use client'

import React, { useState } from 'react'

interface ProductGalleryProps {
  images: string[]
  name: string
  placeholderImage?: string
}

export default function ProductGallery({ images, name, placeholderImage }: ProductGalleryProps) {
  const [activeIdx, setActiveIdx] = useState(0)

  const fallback = placeholderImage || 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=600'
  const galleryImages = images && images.length > 0
    ? images
    : [fallback]

  return (
    <div className="sticky top-4">
      {/* Main Image */}
      <div className="w-full overflow-hidden rounded-2xl bg-gray-50 border border-gray-200">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={galleryImages[activeIdx]}
          alt={name}
          className="w-full rounded-2xl object-cover max-h-[420px]"
        />
      </div>

      {/* Thumbnail row */}
      {galleryImages.length > 1 && (
        <div className="flex gap-2 mt-3 overflow-x-auto scrollbar-none py-1">
          {galleryImages.map((imgUrl, idx) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={idx}
              src={imgUrl}
              alt={`${name} Thumbnail ${idx + 1}`}
              onClick={() => setActiveIdx(idx)}
              className={`w-16 h-16 rounded-lg object-cover cursor-pointer border-2 transition-all ${
                activeIdx === idx
                  ? 'border-[#cc0000]'
                  : 'border-transparent'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
