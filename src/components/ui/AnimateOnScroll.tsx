'use client'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

interface AnimateOnScrollProps {
  children: React.ReactNode
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right'
}

export default function AnimateOnScroll({ children, delay = 0, direction = 'up' }: AnimateOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  
  const variants = {
    hidden: {
      opacity: 0,
      y: direction === 'up' ? 40 : direction === 'down' ? -40 : 0,
      x: direction === 'left' ? 40 : direction === 'right' ? -40 : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: { duration: 0.6, delay, ease: 'easeOut' as const }
    }
  }
  
  return (
    <motion.div ref={ref} variants={variants} initial="hidden" animate={isInView ? 'visible' : 'hidden'}>
      {children}
    </motion.div>
  )
}
