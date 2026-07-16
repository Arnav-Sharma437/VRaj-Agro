'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { MessageSquare } from 'lucide-react'
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
    <div className="relative w-full h-[90vh] md:h-screen flex flex-col md:flex-row overflow-hidden bg-[#111111]">
      
      {/* Left Column (50%): Text content with solid premium dark charcoal background */}
      <div className="w-full md:w-1/2 h-full flex items-center px-6 sm:px-12 md:px-16 lg:px-24 z-10 bg-[#111111] relative">
        {/* Red industrial accent sidebar block */}
        <div className="absolute left-0 top-0 w-2 h-full bg-[#cc0000] hidden md:block" />
        
        {/* On Mobile: background image underlay with dark overlay for readability */}
        <div 
          style={backgroundStyle} 
          className="absolute inset-0 bg-cover bg-center md:hidden"
        />
        <div className="absolute inset-0 bg-black/80 md:hidden z-0" />
        
        <div className="relative z-10 w-full space-y-6 text-left text-white">
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
            className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-[1.1] text-white"
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
              className="inline-flex items-center justify-center bg-[#cc0000] hover:bg-[#aa0000] text-white px-8 py-4 rounded-xl font-bold transition-all duration-300 hover:-translate-y-0.5 shadow-lg text-sm uppercase tracking-wider text-center"
            >
              Explore Products
            </Link>
            <a
              href={`https://wa.me/${whatsapp}?text=${whatsappMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-white/10 border border-white/20 text-white px-8 py-4 rounded-xl font-bold hover:bg-white hover:text-[#1a1a1a] transition-all duration-300 hover:-translate-y-0.5 text-sm uppercase tracking-wider text-center"
            >
              <MessageSquare size={16} className="fill-current" />
              <span>WhatsApp Us</span>
            </a>
          </motion.div>
        </div>
      </div>
      
      {/* Right Column (50%): Premium full-screen banner image (hidden on mobile) */}
      <div 
        style={backgroundStyle}
        className="hidden md:block w-1/2 h-full bg-cover bg-center relative"
      >
        {/* Dark overlay grid overlay matching the split layout */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#111111] via-transparent to-transparent z-10 w-32" />
        <div className="absolute inset-0 bg-black/10 z-0" />
      </div>

    </div>
  )
}
