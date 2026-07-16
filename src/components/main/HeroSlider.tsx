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
      className="relative w-full h-[90vh] md:h-screen flex items-center justify-center overflow-hidden px-4 sm:px-8 md:px-16 lg:px-24"
    >
      {/* Premium Side Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent z-0" />

      {/* Content Container (2-Column Grid) */}
      <div className="relative z-10 w-full max-w-7xl flex flex-col md:flex-row items-center justify-between gap-12">
        {/* Left Column (60%): Text Content Wrapped in Glassmorphism Card */}
        <div className="w-full md:w-[60%] lg:w-[65%] text-left text-white bg-black/40 backdrop-blur-md border border-white/10 p-6 sm:p-10 md:p-12 rounded-3xl shadow-2xl space-y-6">
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
            className="text-4xl sm:text-5xl lg:text-7xl font-black uppercase tracking-tight leading-[1.1] text-white"
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
        </div>

        {/* Right Column (40%): Floating Showcase (hidden on mobile) */}
        <div className="hidden md:flex md:w-[45%] lg:w-[40%] items-center justify-center">
          <div style={{ position: 'relative', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {/* Main floating machine image */}
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              style={{ position: 'relative', zIndex: 2 }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=500&h=400&fit=crop"
                alt="Machinery"
                style={{
                  width: '380px',
                  height: '300px',
                  objectFit: 'cover',
                  borderRadius: '24px',
                  boxShadow: '0 32px 64px rgba(0,0,0,0.5)',
                  border: '3px solid rgba(255,255,255,0.1)',
                }}
              />
            </motion.div>

            {/* Floating badge 1 — top left of image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              style={{
                position: 'absolute',
                top: '10%',
                left: '0%',
                background: 'rgba(255,255,255,0.95)',
                borderRadius: '16px',
                padding: '12px 16px',
                boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                zIndex: 3,
              }}
            >
              <div style={{ fontSize: '11px', color: '#666', fontWeight: 600 }}>ESTABLISHED</div>
              <div style={{ fontSize: '22px', fontWeight: 900, color: '#cc0000', lineHeight: 1.1 }}>1998</div>
              <div style={{ fontSize: '11px', color: '#333' }}>Bilaspur, India</div>
            </motion.div>

            {/* Floating badge 2 — bottom right of image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.3, duration: 0.5 }}
              style={{
                position: 'absolute',
                bottom: '10%',
                right: '0%',
                background: '#cc0000',
                borderRadius: '16px',
                padding: '12px 16px',
                boxShadow: '0 8px 32px rgba(204,0,0,0.4)',
                zIndex: 3,
              }}
            >
              <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.8)', fontWeight: 600 }}>HAPPY CLIENTS</div>
              <div style={{ fontSize: '22px', fontWeight: 900, color: '#fff', lineHeight: 1.1 }}>500+</div>
              <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.8)' }}>Across India</div>
            </motion.div>

            {/* Floating badge 3 — top right */}
            <motion.div
              animate={{ y: [-5, 5, -5] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              style={{
                position: 'absolute',
                top: '5%',
                right: '5%',
                background: '#f5a623',
                borderRadius: '12px',
                padding: '10px 14px',
                zIndex: 3,
              }}
            >
              <div style={{ fontSize: '11px', color: '#1a1a1a', fontWeight: 700 }}>⭐ TRUSTED</div>
              <div style={{ fontSize: '13px', fontWeight: 900, color: '#1a1a1a', lineHeight: 1.1 }}>QUALITY</div>
            </motion.div>

            {/* Decorative circles */}
            <div style={{
              position: 'absolute',
              width: '300px', height: '300px',
              borderRadius: '50%',
              border: '1px solid rgba(255,255,255,0.1)',
              top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 1,
            }} />
            <div style={{
              position: 'absolute',
              width: '450px', height: '450px',
              borderRadius: '50%',
              border: '1px solid rgba(255,255,255,0.05)',
              top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 1,
            }} />
          </div>
        </div>
      </div>

      {/* 7. Scroll Down Indicator */}
      <div className="hidden md:flex flex-col absolute bottom-8 left-1/2 -translate-x-1/2 z-10 items-center gap-1">
        <span className="text-[10px] font-bold tracking-widest uppercase text-white/40">Scroll Down</span>
        <ArrowDown size={20} className="text-white/40 animate-bounce" />
      </div>
    </div>
  )
}
