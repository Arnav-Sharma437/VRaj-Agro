'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { MessageSquare, Award } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface SlideItem {
  subtitle: string
  title: string
  highlightTitle: string
  desc: string
  image: string
  badge: string
  specs: { label: string; value: string }[]
}

const slides: SlideItem[] = [
  {
    subtitle: "TRUSTED SINCE 1998 • CONSTRUCTION SOLUTIONS",
    title: "Heavy-Duty Concrete Mixers",
    highlightTitle: "Concrete Mixers",
    desc: "Premium quality concrete mixer machines engineered for long-lasting field performance and high efficiency on severe job sites.",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=600&fit=crop",
    badge: "Best Seller",
    specs: [
      { label: 'CAPACITY', value: '10/7 CFT' },
      { label: 'ENGINE', value: '8 HP / EL' },
      { label: 'WARRANTY', value: '1 YEAR' }
    ]
  },
  {
    subtitle: "ADVANCED TECHNOLOGY • AGRICULTURAL INNOVATION",
    title: "High-Efficiency Chaff Cutters",
    highlightTitle: "Chaff Cutters",
    desc: "Modern automated chaff cutting machinery designed to maximize output, ensure perfect livestock feed, and optimize operations.",
    image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&h=600&fit=crop",
    badge: "Field Proven",
    specs: [
      { label: 'OUTPUT', value: '1.5 Ton/Hr' },
      { label: 'BLADES', value: '3 carbon steel' },
      { label: 'WARRANTY', value: '1 YEAR' }
    ]
  },
  {
    subtitle: "MAXIMUM CAPACITY • HEAVY INDUSTRIAL HAULING",
    title: "Robust Tractor Trolleys",
    highlightTitle: "Tractor Trolleys",
    desc: "Heavy-duty steel tipper trolley systems engineered for seamless material transport and demanding agricultural logistics.",
    image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800&h=600&fit=crop",
    badge: "Heavy Duty",
    specs: [
      { label: 'CAPACITY', value: '5-15 Tons' },
      { label: 'STEEL', value: 'High Tensile' },
      { label: 'AXLES', value: 'Double/Single' }
    ]
  }
]

export default function HeroSlider() {
  const [current, setCurrent] = useState(0)
  const [whatsapp, setWhatsapp] = useState('918871822944')

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const res = await fetch('/api/contact-info')
        if (res.ok) {
          const data = await res.json()
          if (data?.whatsapp) {
            setWhatsapp(data.whatsapp.replace(/[^0-9]/g, ''))
          }
        }
      } catch (err) {
        console.error('Failed to fetch contact info inside HeroSlider', err)
      }
    }
    fetchContact()
  }, [])

  // Auto-play slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  const whatsappMsg = encodeURIComponent("Hello, I would like to enquire about your machinery.")
  const activeSlide = slides[current]

  return (
    <div className="relative w-full h-[90vh] md:h-screen flex items-center justify-center overflow-hidden bg-[#111111] px-6 sm:px-12 md:px-16 lg:px-24">
      
      {/* High-tech geometric grid overlay */}
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:40px_40px] z-0 pointer-events-none" />
      
      {/* Ambient background glows */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-[#cc0000]/10 blur-[120px] top-1/2 left-1/4 -translate-y-1/2 z-0 animate-pulse duration-[6000ms] pointer-events-none" />
      <div className="absolute w-[400px] h-[400px] rounded-full bg-[#f5a623]/5 blur-[100px] top-1/3 right-1/4 z-0 pointer-events-none" />

      {/* Ken Burns Background Slider */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, scale: 1 }}
            animate={{ opacity: 0.15, scale: 1.05 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 6, ease: "easeOut" }}
            style={{
              backgroundImage: `url(${activeSlide.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
            className="w-full h-full absolute inset-0 bg-[#111111]"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Content Grid */}
      <div className="relative z-10 w-full max-w-7xl flex flex-col lg:flex-row items-center justify-between gap-12">
        
        {/* Left Column (55%): Text Content */}
        <div className="w-full lg:w-[55%] text-left text-white space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              {/* 1. Pill Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#cc0000]/20 to-[#f5a623]/10 border border-[#cc0000]/40 text-[#cc0000] text-xs font-bold uppercase tracking-widest shadow-lg shadow-black/50">
                <span className="h-2 w-2 rounded-full bg-[#cc0000] animate-ping shrink-0" />
                <span>{activeSlide.subtitle}</span>
              </div>

              {/* 2. Main Heading */}
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black uppercase tracking-tight leading-[1.05] text-white">
                {activeSlide.title.split(activeSlide.highlightTitle)[0]}
                <span className="bg-gradient-to-r from-[#cc0000] to-[#f5a623] bg-clip-text text-transparent">
                  {activeSlide.highlightTitle}
                </span>
                {activeSlide.title.split(activeSlide.highlightTitle)[1]}
              </h1>

              {/* 3. Underline Accent */}
              <div className="w-24 h-1.5 bg-[#cc0000] rounded-full" />

              {/* 4. Description */}
              <p className="text-white/70 text-sm sm:text-base md:text-lg max-w-xl font-medium leading-relaxed">
                {activeSlide.desc}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* 5. Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-2">
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
          </div>
        </div>

        {/* Right Column (45%): Specs Showcase */}
        <div className="hidden lg:flex w-full lg:w-[45%] h-full items-center justify-center relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, scale: 0.95, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95, x: -20 }}
              transition={{ duration: 0.5 }}
              className="relative z-10 bg-black/45 backdrop-blur-md border border-white/10 p-7 rounded-3xl shadow-2xl w-full max-w-md overflow-hidden group hover:border-[#cc0000]/30 transition-all duration-500"
            >
              {/* Glow border overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#cc0000]/10 to-[#f5a623]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

              {/* Floating machine image with shadow */}
              <div className="relative z-10 w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-slate-900">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={activeSlide.image}
                  alt={activeSlide.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                  <div className="text-left">
                    <span className="text-[9px] font-black uppercase tracking-widest text-[#f5a623]">PREMIUM MACHINERY</span>
                    <h4 className="text-white font-extrabold text-sm uppercase tracking-wide mt-0.5">{activeSlide.highlightTitle}</h4>
                  </div>
                  <span className="text-[10px] font-bold text-white bg-[#cc0000] px-2.5 py-1 rounded-full uppercase tracking-wider">
                    {activeSlide.badge}
                  </span>
                </div>
              </div>

              {/* Specs stats below image */}
              <div className="relative z-10 grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-white/10 text-center">
                {activeSlide.specs.map((spec, sIdx) => (
                  <div key={sIdx} className={sIdx === 1 ? "border-x border-white/10" : ""}>
                    <span className="text-[10px] text-white/50 block font-bold uppercase tracking-wider">{spec.label}</span>
                    <span className="text-xs font-black text-white block mt-1">{spec.value}</span>
                  </div>
                ))}
              </div>

              {/* Inset badge info */}
              <div className="absolute top-4 left-4 bg-white/95 text-[#1a1a1a] px-3 py-1 rounded-lg shadow-lg border border-gray-200 text-[9px] font-black uppercase tracking-widest flex items-center gap-1.5 z-20">
                <Award size={10} className="text-[#cc0000] shrink-0" />
                <span>ISO 9001 QUALITY</span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>

      {/* Progress Bar Indicators at the bottom */}
      <div className="absolute bottom-8 left-6 right-6 md:left-24 md:right-auto z-20 flex gap-3">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className="group flex flex-col gap-1 text-left focus:outline-none"
          >
            <span className="text-[10px] font-black tracking-wider text-white/40 group-hover:text-white transition-colors uppercase">
              0{idx + 1}
            </span>
            <div className="w-16 h-1 bg-white/20 rounded-full overflow-hidden relative">
              {current === idx && (
                <motion.div
                  key={idx} // resets animation on slide change
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 6, ease: 'linear' }}
                  className="absolute inset-0 bg-[#cc0000]"
                />
              )}
            </div>
          </button>
        ))}
      </div>

    </div>
  )
}
