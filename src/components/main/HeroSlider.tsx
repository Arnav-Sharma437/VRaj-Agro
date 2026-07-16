'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { MessageSquare, Award, Flame } from 'lucide-react'
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
        backgroundImage: `linear-gradient(rgba(17, 17, 17, 0.85), rgba(17, 17, 17, 0.85)), url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }
    : {
        background: 'radial-gradient(circle at 75% 30%, #4d0000 0%, #111111 75%)',
      }

  const whatsappMsg = encodeURIComponent("Hello, I would like to enquire about your machinery.")

  return (
    <div
      style={backgroundStyle}
      className="relative w-full h-[90vh] md:h-screen flex items-center justify-center overflow-hidden px-6 sm:px-12 md:px-16 lg:px-24"
    >
      {/* High-tech geometric grid overlay */}
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:40px_40px] z-0" />
      
      {/* Ambient background glows */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-[#cc0000]/10 blur-[120px] top-1/2 left-1/4 -translate-y-1/2 z-0 animate-pulse duration-[6000ms]" />
      <div className="absolute w-[400px] h-[400px] rounded-full bg-[#f5a623]/5 blur-[100px] top-1/3 right-1/4 z-0" />

      {/* Content Container (2-Column Grid) */}
      <div className="relative z-10 w-full max-w-7xl flex flex-col lg:flex-row items-center justify-between gap-12">
        
        {/* Left Column (55%): Text Content */}
        <div className="w-full lg:w-[55%] text-left text-white space-y-6">
          {/* 1. Red Pill Badge */}
          <motion.div
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#cc0000]/20 to-[#f5a623]/10 border border-[#cc0000]/40 text-[#cc0000] text-xs font-bold uppercase tracking-widest shadow-lg shadow-black/50"
          >
            <span className="h-2 w-2 rounded-full bg-[#cc0000] animate-ping shrink-0" />
            <span>TRUSTED SINCE 1998 • BILASPUR, INDIA</span>
          </motion.div>

          {/* 2. Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
            className="text-4xl sm:text-5xl lg:text-7xl font-black uppercase tracking-tight leading-[1.05] text-white"
          >
            Quality <span className="bg-gradient-to-r from-[#cc0000] to-[#f5a623] bg-clip-text text-transparent">Agricultural</span> & <br />
            <span className="text-[#cc0000]">Construction</span> Machinery
          </motion.h1>

          {/* 3. Red Underline Accent */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.5, ease: 'easeInOut' }}
            style={{ originX: 0 }}
            className="w-24 h-1.5 bg-[#cc0000] rounded-full"
          />

          {/* 4. Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-white/70 text-sm sm:text-base md:text-lg max-w-xl font-medium leading-relaxed"
          >
            Manufacturer of premium concrete mixer machines, chaff cutters, threshers & agricultural equipment. Serving India since 1998.
          </motion.p>

          {/* 5. Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex flex-col sm:flex-row gap-4 pt-2"
          >
            <Link
              href="/shop"
              className="inline-flex items-center justify-center bg-gradient-to-r from-[#cc0000] to-[#990000] hover:from-[#aa0000] hover:to-[#880000] text-white px-8 py-4 rounded-xl font-bold transition-all duration-300 hover:-translate-y-0.5 shadow-xl hover:shadow-[#cc0000]/20 text-sm uppercase tracking-wider text-center"
            >
              Explore Products
            </Link>
            <a
              href={`https://wa.me/${whatsapp}?text=${whatsappMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-white/5 border border-white/10 text-white px-8 py-4 rounded-xl font-bold hover:bg-white hover:text-[#1a1a1a] transition-all duration-300 hover:-translate-y-0.5 text-sm uppercase tracking-wider text-center"
            >
              <MessageSquare size={16} className="fill-current" />
              <span>WhatsApp Us</span>
            </a>
          </motion.div>
        </div>

        {/* Right Column (45%): Premium High-Tech Interactive Showcase */}
        <div className="hidden lg:flex w-full lg:w-[45%] h-full items-center justify-center relative">
          {/* Ambient background glows inside card shadow area */}
          <div className="absolute w-72 h-72 rounded-full bg-[#cc0000]/15 blur-[80px] -top-10 -right-10 animate-pulse duration-[8000ms] z-0" />
          <div className="absolute w-60 h-60 rounded-full bg-[#f5a623]/10 blur-[60px] -bottom-10 -left-10 z-0" />

          {/* Main glass card container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="relative z-10 bg-black/45 backdrop-blur-md border border-white/10 p-8 rounded-3xl shadow-2xl w-full max-w-md overflow-hidden group hover:border-[#cc0000]/30 transition-all duration-500"
          >
            {/* Glow border overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#cc0000]/10 to-[#f5a623]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            
            {/* Grid pattern overlay */}
            <div className="absolute inset-0 opacity-5 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

            {/* Floating machine image with high-end shadow */}
            <div className="relative z-10 w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-slate-900">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=500&h=400&fit=crop"
                alt="Vraj Agro Machinery Showcase"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                <div className="text-left">
                  <span className="text-[9px] font-black uppercase tracking-widest text-[#f5a623]">PREMIUM MACHINERY</span>
                  <h4 className="text-white font-extrabold text-sm uppercase tracking-wide mt-0.5">Heavy Duty Mixer</h4>
                </div>
                <span className="text-[10px] font-bold text-white bg-[#cc0000] px-2.5 py-1 rounded-full uppercase tracking-wider">
                  Best Seller
                </span>
              </div>
            </div>

            {/* Specs stats below image */}
            <div className="relative z-10 grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-white/10 text-center">
              <div>
                <span className="text-[10px] text-white/50 block font-bold uppercase tracking-wider">CAPACITY</span>
                <span className="text-xs font-black text-white block mt-1">10/7 CFT</span>
              </div>
              <div className="border-x border-white/10">
                <span className="text-[10px] text-white/50 block font-bold uppercase tracking-wider">ENGINE</span>
                <span className="text-xs font-black text-white block mt-1">8 HP / EL</span>
              </div>
              <div>
                <span className="text-[10px] text-white/50 block font-bold uppercase tracking-wider">WARRANTY</span>
                <span className="text-xs font-black text-[#f5a623] block mt-1">1 YEAR</span>
              </div>
            </div>

            {/* Floating tech label chips hovering around the card */}
            <motion.div
              animate={{ y: [-5, 5, -5] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-4 -left-6 bg-white/95 text-[#1a1a1a] px-3.5 py-1.5 rounded-xl shadow-lg border border-gray-200 text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 z-20"
            >
              <Award size={12} className="text-[#cc0000] shrink-0" />
              <span>ISO 9001 CERTIFIED</span>
            </motion.div>

            <motion.div
              animate={{ y: [5, -5, 5] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -bottom-2 -right-4 bg-gradient-to-r from-[#cc0000] to-[#aa0000] text-white px-4 py-2 rounded-xl shadow-lg text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 z-20"
            >
              <Flame size={12} className="text-[#f5a623] shrink-0" />
              <span>25+ YEARS LEGACY</span>
            </motion.div>
          </motion.div>
        </div>

      </div>
    </div>
  )
}
