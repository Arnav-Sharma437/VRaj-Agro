'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowDown } from 'lucide-react'
import { motion } from 'framer-motion'
import { IBanner } from '@/types'

export default function HeroSlider() {
  const [bgImage, setBgImage] = useState<string | null>(null)

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await fetch('/api/banners')
        if (res.ok) {
          const data: IBanner[] = await res.json()
          // Find first active banner
          const activeBanner = data.find(b => b.is_active !== false)
          if (activeBanner) {
            setBgImage(activeBanner.image_desktop)
          }
        }
      } catch (err) {
        console.error('Failed to fetch banners', err)
      }
    }
    fetchBanners()
  }, [])

  const backgroundStyle = bgImage
    ? {
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }
    : {
        background: 'linear-gradient(135deg, #1a1a1a 0%, #cc0000 100%)',
      }

  return (
    <div
      style={backgroundStyle}
      className="relative w-full h-[85vh] md:h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50 z-0" />

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center text-white space-y-6">
        {/* Red Pill Badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-block px-4 py-1.5 rounded-full bg-[#cc0000] text-white text-xs font-bold uppercase tracking-widest shadow-md"
        >
          QUALITY MACHINERY SINCE 1998
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
          className="text-4xl md:text-6xl font-black uppercase tracking-tight leading-tight max-w-4xl mx-auto"
        >
          Premium Agricultural & <br className="hidden md:inline" />
          Construction Machinery
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto font-medium"
        >
          Trusted by farmers and builders across India
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center pt-4 px-4"
        >
          <Link
            href="/shop"
            className="inline-flex items-center justify-center bg-[#cc0000] hover:bg-[#aa0000] text-white px-8 py-3.5 rounded-xl font-bold transition-all duration-300 hover:-translate-y-0.5 shadow-lg"
          >
            Explore Products
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center border-2 border-white text-white px-8 py-3.5 rounded-xl font-bold hover:bg-white hover:text-[#1a1a1a] transition-all duration-300 hover:-translate-y-0.5"
          >
            Contact Us
          </Link>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <ArrowDown size={28} className="text-white/70 animate-bounce" />
      </div>
    </div>
  )
}
