'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { ICategory } from '@/types'
import AnimateOnScroll from '@/components/ui/AnimateOnScroll'

// Fallback categories list to display if DB is empty
const fallbackCategories = [
  { name: 'Concrete Mixers', slug: 'concrete-mixers', image: '' },
  { name: 'Tractor Trolleys', slug: 'tractor-trolleys', image: '' },
  { name: 'Agricultural Plows', slug: 'agricultural-plows', image: '' },
  { name: 'Threshers & Harvesters', slug: 'threshers-harvesters', image: '' }
]

function getCategoryImage(name: string, existingImage: string) {
  if (existingImage) return existingImage
  const n = name.toLowerCase()
  if (n.includes('concrete') || n.includes('mixer')) return 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=300&fit=crop'
  if (n.includes('water') || n.includes('tanker')) return 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop'
  if (n.includes('chaff') || n.includes('cutter')) return 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=300&fit=crop'
  if (n.includes('thresh')) return 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400&h=300&fit=crop'
  if (n.includes('hand') || n.includes('trolley')) return 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&h=300&fit=crop'
  if (n.includes('tractor') || n.includes('trolley')) return 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=300&fit=crop'
  if (n.includes('equipment') || n.includes('machinery') || n.includes('plow')) return 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=400&h=300&fit=crop'
  return 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop'
}

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
      <section className="py-20 bg-gray-50 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-12">
            <div className="h-8 w-60 bg-gray-200 animate-pulse rounded mx-auto mb-3" />
            <div className="h-1 bg-red-650 w-16 mx-auto mb-3" />
            <div className="h-4 w-72 bg-gray-200 animate-pulse rounded mx-auto" />
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-150 p-4 space-y-4 animate-pulse shadow-sm">
                <div className="aspect-[16/10] bg-gray-200 rounded w-full" />
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
    <section className="py-20 bg-gray-50 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header with Red Underline Accent */}
        <AnimateOnScroll direction="up">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <h2 className="text-3xl md:text-4xl font-black text-[#1a1a1a] tracking-tight uppercase">
              Our Product Categories
            </h2>
            <div className="w-16 h-1 bg-[#cc0000] mx-auto rounded" />
            <p className="text-xs md:text-sm text-gray-500 font-bold uppercase tracking-wider">
              Explore our robust machinery built for agriculture and construction.
            </p>
          </div>
        </AnimateOnScroll>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayList.map((category, idx) => (
            <AnimateOnScroll key={category.slug} delay={idx * 0.1} direction="up">
              <Link
                href={`/shop?category=${category.slug}`}
                className="group flex flex-col h-full bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm transition-all duration-300 hover:border-[#cc0000]/60 hover:shadow-xl"
              >
                {/* Image Aspect 16:10 */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={getCategoryImage(category.name, category.image || '')}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Info Container */}
                <div className="flex flex-col flex-1 p-6">
                  <h3 className="mb-2 font-bold text-base md:text-lg text-[#1a1a1a] group-hover:text-[#cc0000] uppercase tracking-wide transition-colors duration-300">
                    {category.name}
                  </h3>
                  
                  <p className="text-gray-500 text-xs leading-relaxed mb-4 flex-1">
                    Heavy-duty industrial {category.name.toLowerCase()} built for reliability, optimal output, and severe job site operations.
                  </p>

                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#cc0000] uppercase tracking-wider mt-auto group-hover:translate-x-1.5 transition-transform duration-300">
                    <span>View All</span>
                    <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            </AnimateOnScroll>
          ))}
        </div>

        {/* Mobile View More Toggle */}
        {isMobile && list.length > 4 && (
          <div className="text-center mt-10">
            <button
              onClick={() => setShowAll(!showAll)}
              className="border border-[#cc0000] text-[#cc0000] hover:bg-[#cc0000] hover:text-white font-bold px-8 py-3 rounded-xl transition-all duration-300 text-sm shadow-sm"
            >
              {showAll ? 'View Less' : 'View More'}
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
