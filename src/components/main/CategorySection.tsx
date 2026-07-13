'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { ICategory } from '@/types'
import AnimateOnScroll from '@/components/ui/AnimateOnScroll'

// Fallback categories list to display if DB is empty
const fallbackCategories = [
  { name: 'Concrete Mixers', slug: 'concrete-mixers', image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=400' },
  { name: 'Tractor Trolleys', slug: 'tractor-trolleys', image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=400' },
  { name: 'Agricultural Plows', slug: 'agricultural-plows', image: 'https://images.unsplash.com/photo-1622383563227-04401ab4e5ea?auto=format&fit=crop&q=80&w=400' },
  { name: 'Threshers & Harvesters', slug: 'threshers-harvesters', image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&q=80&w=400' }
]

export default function CategorySection() {
  const [categories, setCategories] = useState<ICategory[]>([])
  const [loading, setLoading] = useState(true)
  const [showAll, setShowAll] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('/api/categories')
        if (res.ok) {
          const data = await res.json()
          setCategories(data)
        }
      } catch (err) {
        console.error('Failed to fetch categories', err)
      } finally {
        setLoading(false)
      }
    }
    fetchCategories()
  }, [])

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  if (loading) {
    return (
      <section className="py-16 bg-[#f5f5f5] px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-12">
            <div className="h-8 w-60 bg-gray-200 animate-pulse rounded mx-auto mb-3" />
            <div className="h-1 bg-red-600 w-16 mx-auto mb-3" />
            <div className="h-4 w-72 bg-gray-200 animate-pulse rounded mx-auto" />
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-150 p-4 space-y-4 animate-pulse shadow-sm">
                <div className="h-[160px] bg-gray-200 rounded-xl w-full" />
                <div className="h-5 bg-gray-200 rounded w-1/2 mx-auto" />
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  const list = categories.length > 0 ? categories : fallbackCategories
  const displayList = (isMobile && !showAll) ? list.slice(0, 4) : list

  return (
    <section className="py-16 bg-[#f5f5f5] px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header with Red Underline */}
        <AnimateOnScroll direction="up">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <h2 className="text-3xl md:text-4xl font-black text-[#1a1a1a] tracking-tight uppercase">
              Our Product Categories
            </h2>
            <div className="w-20 h-1 bg-[#cc0000] mx-auto rounded" />
            <p className="text-xs md:text-sm text-gray-500 font-bold uppercase tracking-wider">
              Explore our robust machinery built for agriculture and construction.
            </p>
          </div>
        </AnimateOnScroll>

        {/* Grid Container - 2 col mobile, 4 col desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {displayList.map((category, idx) => (
            <AnimateOnScroll key={category.slug} delay={idx * 0.1} direction="up">
              <Link
                href={`/shop?category=${category.slug}`}
                className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-md transition-all duration-300 hover:scale-105 hover:shadow-xl border border-gray-100"
              >
                {/* Image */}
                <div className="relative h-[160px] w-full overflow-hidden bg-gray-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={category.image || fallbackCategories[0].image}
                    alt={category.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Title */}
                <div className="p-4 bg-white flex-1 flex items-center justify-center">
                  <h3 className="font-bold text-center text-[#1a1a1a] group-hover:text-[#cc0000] uppercase tracking-wide transition-colors duration-300 text-xs md:text-sm leading-snug">
                    {category.name}
                  </h3>
                </div>
              </Link>
            </AnimateOnScroll>
          ))}
        </div>

        {/* Mobile View More Button */}
        {isMobile && list.length > 4 && (
          <div className="text-center mt-10">
            <button
              onClick={() => setShowAll(!showAll)}
              className="border border-[#cc0000] text-[#cc0000] hover:bg-[#cc0000] hover:text-white font-bold px-8 py-2.5 rounded-xl transition-all duration-300 text-sm shadow-sm"
            >
              {showAll ? 'View Less' : 'View More'}
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
