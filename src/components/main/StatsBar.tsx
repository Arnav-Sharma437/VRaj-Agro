'use client'

import React, { useState, useEffect, useRef } from 'react'
import AnimateOnScroll from '@/components/ui/AnimateOnScroll'

interface CounterProps {
  target: number
  duration?: number
}

function Counter({ target, duration = 2000 }: CounterProps) {
  const [count, setCount] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!hasStarted) return

    let start = 0
    const end = target
    if (start === end) return

    const stepTime = Math.max(Math.floor(duration / end), 10)
    const timer = setInterval(() => {
      start += Math.ceil(end / (duration / stepTime))
      if (start >= end) {
        clearInterval(timer)
        setCount(end)
      } else {
        setCount(start)
      }
    }, stepTime)

    return () => clearInterval(timer)
  }, [hasStarted, target, duration])

  return <span ref={ref}>{count}</span>
}

export default function StatsBar() {
  const stats = [
    { value: 25, label: 'Years Experience' },
    { value: 500, label: 'Happy Clients' },
    { value: 50, label: 'Products' },
    { value: 10, label: 'States Served' },
  ]

  return (
    <section className="bg-[#1a1a1a] text-white py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <AnimateOnScroll direction="up">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-0 text-center">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className={`flex flex-col justify-center space-y-2 py-4 ${
                  idx < stats.length - 1 ? 'md:border-r md:border-gray-800' : ''
                } ${
                  idx % 2 === 0 ? 'border-r border-gray-800 md:border-r-0' : ''
                } ${
                  idx < 2 ? 'border-b border-gray-800 md:border-b-0' : ''
                }`}
              >
                <span className="text-4xl md:text-5xl font-extrabold text-[#f5a623] tracking-tight">
                  <Counter target={stat.value} />+
                </span>
                <span className="text-xs md:text-sm text-gray-400 font-bold uppercase tracking-wider max-w-[150px] mx-auto leading-relaxed">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  )
}
