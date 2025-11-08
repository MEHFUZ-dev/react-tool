'use client'

import { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Bubble {
  id: number
  x: number
  y: number
  size: number
  color: string
  delay: number
}

const colors = [
  'rgba(236, 72, 153, 0.6)', // Pink
  'rgba(219, 39, 119, 0.6)', // Hot Pink
  'rgba(244, 114, 182, 0.6)', // Light Pink
  'rgba(190, 24, 93, 0.6)',  // Deep Pink
  'rgba(251, 146, 60, 0.5)', // Pink-Orange
  'rgba(236, 72, 153, 0.5)', // Pink variant
]

export function CursorBubbles() {
  const [bubbles, setBubbles] = useState<Bubble[]>([])
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const createBubble = useCallback((x: number, y: number) => {
    const newBubble: Bubble = {
      id: Date.now() + Math.random(),
      x: x + (Math.random() - 0.5) * 40,
      y: y + (Math.random() - 0.5) * 40,
      size: Math.random() * 30 + 10,
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: Math.random() * 0.5,
    }

    setBubbles(prev => [...prev.slice(-15), newBubble]) // Keep only last 15 bubbles
  }, [])

  useEffect(() => {
    let lastTime = 0
    const throttleDelay = 100 // Create bubble every 100ms

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
      
      const currentTime = Date.now()
      if (currentTime - lastTime > throttleDelay) {
        createBubble(e.clientX, e.clientY)
        lastTime = currentTime
      }
    }

    const handleMouseEnter = () => {
      document.addEventListener('mousemove', handleMouseMove)
    }

    const handleMouseLeave = () => {
      document.removeEventListener('mousemove', handleMouseMove)
    }

    document.addEventListener('mouseenter', handleMouseEnter)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mousemove', handleMouseMove)

    return () => {
      document.removeEventListener('mouseenter', handleMouseEnter)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mousemove', handleMouseMove)
    }
  }, [createBubble])

  // Remove bubbles after animation
  useEffect(() => {
    const timer = setInterval(() => {
      setBubbles(prev => prev.filter(bubble => Date.now() - bubble.id < 3000))
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {/* Cursor follower */}
      <motion.div
        className="fixed w-4 h-4 rounded-full bg-gradient-to-r from-pink-400 to-pink-500 opacity-60 mix-blend-screen"
        style={{
          left: mousePosition.x - 8,
          top: mousePosition.y - 8,
        }}
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 0.3,
          ease: "easeOut"
        }}
      />

      {/* Animated bubbles */}
      <AnimatePresence>
        {bubbles.map((bubble) => (
          <motion.div
            key={bubble.id}
            className="absolute rounded-full mix-blend-screen"
            style={{
              left: bubble.x - bubble.size / 2,
              top: bubble.y - bubble.size / 2,
              width: bubble.size,
              height: bubble.size,
              background: `radial-gradient(circle, ${bubble.color} 0%, transparent 70%)`,
            }}
            initial={{
              scale: 0,
              opacity: 0,
            }}
            animate={{
              scale: [0, 1.2, 1],
              opacity: [0, 0.8, 0],
              y: [0, -50, -100],
              x: [0, (Math.random() - 0.5) * 100],
            }}
            exit={{
              scale: 0,
              opacity: 0,
            }}
            transition={{
              duration: 2.5,
              delay: bubble.delay,
              ease: "easeOut",
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}
