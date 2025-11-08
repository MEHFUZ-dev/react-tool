'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion'

interface TrailPoint {
  id: number
  x: number
  y: number
  timestamp: number
}

interface Bubble {
  id: number
  x: number
  y: number
  size: number
  color: string
  opacity: number
}

const bubbleColors = [
  'rgba(168, 85, 247, 0.8)', // Purple
  'rgba(236, 72, 153, 0.8)', // Pink
  'rgba(59, 130, 246, 0.8)', // Blue
  'rgba(16, 185, 129, 0.8)', // Green
  'rgba(245, 158, 11, 0.8)', // Yellow
  'rgba(139, 92, 246, 0.8)', // Violet
]

// Create smooth curved path from trail points
const createSmoothPath = (points: TrailPoint[]): string => {
  if (points.length < 2) return ''
  
  let path = `M ${points[0].x},${points[0].y}`
  
  for (let i = 1; i < points.length; i++) {
    const current = points[i]
    const previous = points[i - 1]
    
    if (i === 1) {
      path += ` L ${current.x},${current.y}`
    } else {
      // Create smooth curves using quadratic bezier
      const midX = (previous.x + current.x) / 2
      const midY = (previous.y + current.y) / 2
      path += ` Q ${previous.x},${previous.y} ${midX},${midY}`
    }
  }
  
  return path
}

export function CursorTrail() {
  const [trail, setTrail] = useState<TrailPoint[]>([])
  const [bubbles, setBubbles] = useState<Bubble[]>([])
  const lastBubbleTime = useRef(0)
  const animationFrame = useRef<number | undefined>(undefined)

  // Smooth cursor position with spring animation
  const cursorX = useMotionValue(0)
  const cursorY = useMotionValue(0)
  const springX = useSpring(cursorX, { stiffness: 500, damping: 28 })
  const springY = useSpring(cursorY, { stiffness: 500, damping: 28 })

  const updateTrail = useCallback((x: number, y: number) => {
    const now = Date.now()
    setTrail(prev => {
      const newTrail = [
        ...prev,
        { id: now, x, y, timestamp: now }
      ].slice(-30) // Keep more points for smoother trail
      
      return newTrail
    })
  }, [])

  const createBubble = useCallback((x: number, y: number) => {
    const now = Date.now()
    if (now - lastBubbleTime.current > 100) { // More frequent bubbles
      const newBubble: Bubble = {
        id: now + Math.random(),
        x: x + (Math.random() - 0.5) * 40,
        y: y + (Math.random() - 0.5) * 40,
        size: Math.random() * 30 + 15,
        color: bubbleColors[Math.floor(Math.random() * bubbleColors.length)],
        opacity: Math.random() * 0.5 + 0.3,
      }

      setBubbles(prev => [...prev.slice(-12), newBubble])
      lastBubbleTime.current = now
    }
  }, [])

  useEffect(() => {
    let isMoving = false

    const handleMouseMove = (e: MouseEvent) => {
      // Update spring values for smooth cursor movement
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)

      if (!isMoving) {
        isMoving = true
        
        const animate = () => {
          updateTrail(springX.get(), springY.get())
          createBubble(springX.get(), springY.get())
          
          animationFrame.current = requestAnimationFrame(animate)
        }
        
        animate()
      }
    }

    const handleMouseStop = () => {
      isMoving = false
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current)
      }
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseStop)

    // Clean up old trail points more frequently for smoother performance
    const trailCleanup = setInterval(() => {
      const now = Date.now()
      setTrail(prev => prev.filter(point => now - point.timestamp < 800))
    }, 50)

    // Clean up old bubbles
    const bubbleCleanup = setInterval(() => {
      setBubbles(prev => prev.slice(-12))
    }, 1500)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseStop)
      clearInterval(trailCleanup)
      clearInterval(bubbleCleanup)
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current)
      }
    }
  }, [cursorX, cursorY, springX, springY, updateTrail, createBubble])

  return (
    <div className="fixed inset-0 pointer-events-none z-20 overflow-hidden">
      {/* Cursor trail */}
      <svg className="absolute inset-0 w-full h-full">
        <defs>
          <linearGradient id="trailGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(168, 85, 247, 0.8)" />
            <stop offset="50%" stopColor="rgba(236, 72, 153, 0.6)" />
            <stop offset="100%" stopColor="rgba(59, 130, 246, 0.4)" />
          </linearGradient>
        </defs>
        
        {trail.length > 2 && (
          <motion.path
            d={createSmoothPath(trail)}
            stroke="url(#trailGradient)"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.8 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          />
        )}
      </svg>

      {/* Main cursor */}
      <motion.div
        className="fixed w-6 h-6 rounded-full pointer-events-none z-30"
        style={{
          x: springX,
          y: springY,
          translateX: -12,
          translateY: -12,
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.9) 0%, rgba(236, 72, 153, 0.7) 50%, transparent 100%)',
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
            className="absolute rounded-full pointer-events-none"
            style={{
              left: bubble.x - bubble.size / 2,
              top: bubble.y - bubble.size / 2,
              width: bubble.size,
              height: bubble.size,
              background: `radial-gradient(circle, ${bubble.color} 0%, transparent 70%)`,
              opacity: bubble.opacity,
            }}
            initial={{
              scale: 0,
              opacity: 0,
            }}
            animate={{
              scale: [0, 1.2, 1],
              opacity: [0, bubble.opacity, 0],
              y: [0, -80],
              x: [0, (Math.random() - 0.5) * 100],
            }}
            exit={{
              scale: 0,
              opacity: 0,
            }}
            transition={{
              duration: 3,
              ease: "easeOut",
            }}
          />
        ))}
      </AnimatePresence>

      {/* Glow effect around cursor */}
      <motion.div
        className="fixed rounded-full pointer-events-none"
        style={{
          x: springX,
          y: springY,
          translateX: -25,
          translateY: -25,
          width: 50,
          height: 50,
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.2) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  )
}
