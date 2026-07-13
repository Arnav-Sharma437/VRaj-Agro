'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowDown, MessageSquare } from 'lucide-react'
import { motion } from 'framer-motion'
import { IBanner } from '@/types'

export default function HeroSlider() {
  const [bgImage, setBgImage] = useState<string | null>(null)
  const [whatsapp, setWhatsapp] = useState('918871822944')

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await fetch('/api/banners')
        if (res.ok) {
          const data: IBanner[] = await res.json()
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

  useEffect(() => {
    fetch('/api/contact-info')
      .then(r => r.json())
      .then(data => {
        if (data?.whatsapp) {
          setWhatsapp(data.whatsapp.replace(/[^0-9]/g, ''))
        }
      })
      .catch(err => console.error(err))
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

  const whatsappMsg = encodeURIComponent("Hello, I would like to enquire about your machinery.")

  return (
    <div
      style={backgroundStyle}
      className="relative w-full h-[90vh] md:h-screen flex items-center justify-start overflow-hidden px-4 sm:px-8 md:px-16 lg:px-24"
    >
      {/* Premium Side Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-transparent z-0" />

      {/* Content Container */}
      <div className="relative z-10 max-w-4xl text-left text-white space-y-6">
        {/* 1. Red Pill Badge */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="inline-block px-4 py-1.5 rounded-full bg-[#cc0000]/20 border border-[#cc0000] text-[#cc0000] text-xs font-bold uppercase tracking-widest shadow-sm"
        >
          TRUSTED SINCE 1998 • BILASPUR, INDIA
        </motion.div>

        {/* 2. Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
          className="text-4xl sm:text-5xl md:text-7xl font-black uppercase tracking-tight leading-[1.1] text-white"
        >
          Quality Agricultural & <br />
          Construction Machinery
        </motion.h1>

        {/* 3. Red Underline Accent */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.7, ease: 'easeInOut' }}
          style={{ originX: 0 }}
          className="w-24 h-1 bg-[#cc0000]"
        />

        {/* 4. Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="text-white/70 text-sm sm:text-base md:text-lg max-w-xl font-medium leading-relaxed"
        >
          Manufacturer of premium concrete mixer machines, chaff cutters, threshers & agricultural equipment. Serving India since 1998.
        </motion.p>

        {/* 5. Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="flex flex-col sm:flex-row gap-4 pt-2"
        >
          <Link
            href="/shop"
            className="inline-flex items-center justify-center bg-[#cc0000] hover:bg-[#aa0000] text-white px-8 py-4 rounded-xl font-bold transition-all duration-300 hover:-translate-y-0.5 shadow-lg text-sm uppercase tracking-wider"
          >
            Explore Products
          </Link>
          <a
            href={`https://wa.me/${whatsapp}?text=${whatsappMsg}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-white/10 border border-white/20 text-white px-8 py-4 rounded-xl font-bold hover:bg-white hover:text-[#1a1a1a] transition-all duration-300 hover:-translate-y-0.5 text-sm uppercase tracking-wider"
          >
            <MessageSquare size={16} className="fill-current" />
            <span>WhatsApp Us</span>
          </a>
        </motion.div>

        {/* 6. Stats Row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          className="flex gap-4 md:gap-8 pt-8 border-t border-white/10 mt-12 max-w-2xl"
        >
          <div className="pr-4 md:pr-8 border-r border-white/10">
            <span className="text-xl md:text-2xl font-black text-[#f5a623] block">25+</span>
            <span className="text-[10px] text-white/50 uppercase font-bold tracking-widest mt-1 block">Years</span>
          </div>
          <div className="pr-4 md:pr-8 border-r border-white/10">
            <span className="text-xl md:text-2xl font-black text-[#f5a623] block">500+</span>
            <span className="text-[10px] text-white/50 uppercase font-bold tracking-widest mt-1 block">Clients</span>
          </div>
          <div className="pr-4 md:pr-8 border-r border-white/10">
            <span className="text-xl md:text-2xl font-black text-[#f5a623] block">50+</span>
            <span className="text-[10px] text-white/50 uppercase font-bold tracking-widest mt-1 block">Products</span>
          </div>
          <div>
            <span className="text-xl md:text-2xl font-black text-[#f5a623] block">10+</span>
            <span className="text-[10px] text-white/50 uppercase font-bold tracking-widest mt-1 block">States</span>
          </div>
        </motion.div>
      </div>

      {/* 7. Scroll Down Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1">
        <span className="text-[10px] font-bold tracking-widest uppercase text-white/40">Scroll Down</span>
        <ArrowDown size={20} className="text-white/40 animate-bounce" />
      </div>
    </div>
  )
}
