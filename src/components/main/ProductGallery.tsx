'use client'

import React, { useState, useEffect } from 'react'

interface ProductGalleryProps {
  images: string[]
  videos?: string[]
  name: string
  placeholderImage?: string
}

interface MediaItem {
  type: 'image' | 'video'
  url: string
}

export default function ProductGallery({ images, videos = [], name, placeholderImage }: ProductGalleryProps) {
  const fallback = placeholderImage || 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=600'

  const allMedia: MediaItem[] = [
    ...(videos || []).map((url) => ({ type: 'video' as const, url })),
    ...(images || []).map((url) => ({ type: 'image' as const, url })),
  ]

  if (allMedia.length === 0) {
    allMedia.push({ type: 'image', url: fallback })
  }

  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(allMedia[0] || null)

  useEffect(() => {
    const currentMedia: MediaItem[] = [
      ...(videos || []).map((url) => ({ type: 'video' as const, url })),
      ...(images || []).map((url) => ({ type: 'image' as const, url })),
    ]
    if (currentMedia.length > 0) {
      setSelectedMedia(currentMedia[0])
    } else {
      setSelectedMedia({ type: 'image', url: fallback })
    }
  }, [images, videos, fallback])

  return (
    <div className="sticky top-4">
      {/* Main Display Area */}
      <div className="w-full overflow-hidden rounded-2xl bg-gray-50 border border-gray-200">
        {selectedMedia?.type === 'image' ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={selectedMedia.url}
            alt={name}
            style={{ width: '100%', height: '400px', objectFit: 'cover', borderRadius: '16px' }}
          />
        ) : selectedMedia?.type === 'video' ? (
          <video
            key={selectedMedia.url}
            controls
            autoPlay={false}
            style={{ width: '100%', height: '400px', objectFit: 'cover', borderRadius: '16px', background: '#000' }}
          >
            <source src={selectedMedia.url} />
          </video>
        ) : null}
      </div>

      {/* Thumbnails Row */}
      {allMedia.length > 1 && (
        <div className="flex gap-2 mt-3 overflow-x-auto scrollbar-none py-1">
          {allMedia.map((media, index) => (
            <div
              key={index}
              onClick={() => setSelectedMedia(media)}
              style={{
                width: '72px',
                height: '72px',
                borderRadius: '10px',
                overflow: 'hidden',
                cursor: 'pointer',
                border: selectedMedia?.url === media.url 
                  ? '2px solid #cc0000' 
                  : '2px solid transparent',
                position: 'relative',
                flexShrink: 0,
              }}
            >
              {media.type === 'image' ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={media.url}
                  alt={`${name} Thumbnail ${index + 1}`}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                <div style={{
                  width: '100%', height: '100%', background: '#1a1a1a', 
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  position: 'relative'
                }}>
                  <video
                    src={media.url}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7 }}
                  />
                  {/* Play icon overlay on video thumbnail */}
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'rgba(0,0,0,0.4)',
                  }}>
                    <div style={{
                      width: '24px', height: '24px',
                      background: '#cc0000',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      <svg viewBox="0 0 24 24" fill="white" width="12" height="12">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
