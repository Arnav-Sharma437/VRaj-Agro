'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { Play, X } from 'lucide-react'
import { IVideo } from '@/types'
import AnimateOnScroll from '@/components/ui/AnimateOnScroll'

export default function VideoSection() {
  const [videos, setVideos] = useState<IVideo[]>([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState<{ isOpen: boolean; videoUrl: string }>({
    isOpen: false,
    videoUrl: '',
  })

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await fetch('/api/videos')
        if (res.ok) {
          const data = await res.json()
          setVideos(data)
        }
      } catch (err) {
        console.error('Failed to fetch videos', err)
      } finally {
        setLoading(false)
      }
    }
    fetchVideos()
  }, [])

  // Helper to extract YouTube ID and build dynamic embed URL with autoplay
  const getEmbedUrl = (url: string) => {
    if (!url) return ''
    let videoId = ''
    if (url.includes('youtube.com/watch')) {
      const urlParams = new URLSearchParams(url.split('?')[1])
      videoId = urlParams.get('v') || ''
    } else if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1]?.split('?')[0] || ''
    } else if (url.includes('youtube.com/embed/')) {
      videoId = url.split('youtube.com/embed/')[1]?.split('?')[0] || ''
    }

    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}?autoplay=1`
    }
    return url
  }

  const isYouTubeUrl = (url: string) => {
    return url.includes('youtube.com') || url.includes('youtu.be')
  }

  if (loading) {
    return (
      <section className="py-16 bg-[#ffffff] border-t border-gray-100 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-12">
            <div className="h-8 w-60 bg-gray-250 animate-pulse rounded mx-auto mb-3" />
            <div className="h-1 bg-red-650 w-16 mx-auto mb-3" />
            <div className="h-4 w-72 bg-gray-200 animate-pulse rounded mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-4 animate-pulse">
                <div className="aspect-video bg-gray-200 rounded-xl w-full" />
                <div className="h-5 bg-gray-250 rounded w-2/3" />
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (videos.length === 0) {
    return null
  }

  return (
    <section className="py-16 bg-[#ffffff] border-t border-gray-100 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header with Red Underline */}
        <AnimateOnScroll direction="up">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <h2 className="text-3xl md:text-4xl font-black text-[#1a1a1a] tracking-tight uppercase">
              Customer Success Stories
            </h2>
            <div className="w-20 h-1 bg-[#cc0000] mx-auto rounded" />
            <p className="text-xs md:text-sm text-gray-500 font-bold uppercase tracking-wider">
              Watch our concrete mixers and agricultural machinery in action across farms and job sites.
            </p>
          </div>
        </AnimateOnScroll>

        {/* Video Cards Grid - 1 col mobile, 2 col tablet, 3 col desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video, idx) => (
            <AnimateOnScroll key={video._id} delay={idx * 0.1} direction="up">
              <div
                onClick={() =>
                  setModal({
                    isOpen: true,
                    videoUrl: video.uploaded_video_url || video.video_url || '',
                  })
                }
                className="group cursor-pointer space-y-4 flex flex-col h-full"
              >
                {/* Thumbnail with overlay & play button */}
                <div className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-md group-hover:shadow-xl transition-all duration-300 bg-gray-100 border border-gray-200">
                  <Image
                    src={
                      video.thumbnail ||
                      'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=400'
                    }
                    alt={video.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />

                  {/* Dark hover overlay */}
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center transition-colors duration-300 group-hover:bg-black/55">
                    {/* Play button wrapper */}
                    <div className="w-16 h-16 bg-[#cc0000] hover:bg-[#aa0000] text-white rounded-full flex items-center justify-center shadow-lg transform transition-transform duration-300 group-hover:scale-115">
                      <Play size={24} className="fill-current ml-1" />
                    </div>
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-bold text-[#1a1a1a] group-hover:text-[#cc0000] transition-colors duration-300 text-xs md:text-sm leading-snug line-clamp-2 uppercase tracking-wide">
                  {video.title}
                </h3>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>

      {/* Video Popup Modal Player Overlay */}
      {modal.isOpen && (
        <div
          onClick={() => setModal({ isOpen: false, videoUrl: '' })}
          className="fixed inset-0 z-[9999] bg-black/80 flex items-center justify-center p-4 transition-opacity duration-300"
        >
          {/* Modal Container */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-gray-800"
          >
            {/* Close Button */}
            <button
              onClick={() => setModal({ isOpen: false, videoUrl: '' })}
              className="absolute top-4 right-4 z-[10000] p-2 bg-black/60 hover:bg-red-650 text-white rounded-full transition-colors focus:outline-none"
              aria-label="Close video player"
            >
              <X size={20} />
            </button>

            {/* Video Content */}
            <div className="w-full h-full flex items-center justify-center">
              {isYouTubeUrl(modal.videoUrl) ? (
                <iframe
                  src={getEmbedUrl(modal.videoUrl)}
                  allow="autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-none"
                />
              ) : (
                <video
                  src={modal.videoUrl}
                  controls
                  autoPlay
                  className="w-full h-full object-contain"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
