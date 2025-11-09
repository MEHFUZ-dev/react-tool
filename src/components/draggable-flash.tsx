'use client'

import { motion, useMotionValue, useTransform, useAnimation } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { Zap } from 'lucide-react'

interface DraggableFlashProps {
  className?: string
  size?: number
  containerRef?: React.RefObject<HTMLElement | null>
}

export function DraggableFlash({ className = "", size = 64, containerRef }: DraggableFlashProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [bubbles, setBubbles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([])
  const flashRef = useRef<HTMLDivElement>(null)
  const controls = useAnimation()
  
  // Motion values for dragging
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  
  // Transform values for rotation and scale during drag
  const rotate = useTransform(x, [-100, 100], [-15, 15])
  const scale = useTransform([x, y], (values: number[]) => {
    const [latestX, latestY] = values
    const distance = Math.sqrt(latestX * latestX + latestY * latestY)
    return Math.max(1, Math.min(1.3, 1 + distance / 200))
  })

  // Auto-return to original position after 2-3 seconds
  useEffect(() => {
    let returnTimer: NodeJS.Timeout | undefined
    
    if (isDragging) {
      // Clear any existing timer when starting to drag
      if (returnTimer) clearTimeout(returnTimer)
    } else {
      // Set timer to return to original position
      returnTimer = setTimeout(() => {
        controls.start({
          x: 0,
          y: 0,
          transition: {
            type: "spring",
            stiffness: 200,
            damping: 20,
            duration: 0.8
          }
        })
      }, 2500) // 2.5 seconds delay
    }

    return () => {
      if (returnTimer) clearTimeout(returnTimer)
    }
  }, [isDragging, controls])

  // Track mouse position for bubble trail
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        setMousePosition({ x: e.clientX, y: e.clientY })
        
        // Add new bubble to trail
        const newBubble = {
          id: Date.now() + Math.random(),
          x: e.clientX,
          y: e.clientY,
          delay: Math.random() * 0.3
        }
        
        setBubbles(prev => [...prev.slice(-8), newBubble]) // Keep only last 8 bubbles
      }
    }

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
    }
  }, [isDragging])

  // Clear bubbles when not dragging
  useEffect(() => {
    if (!isDragging) {
      const clearTimer = setTimeout(() => {
        setBubbles([])
      }, 500)
      return () => clearTimeout(clearTimer)
    }
  }, [isDragging])

  const handleDragStart = () => {
    setIsDragging(true)
    // Prevent text selection during drag
    document.body.classList.add('no-select')
    document.body.style.userSelect = 'none'
    ;(document.body.style as any).webkitUserSelect = 'none'
    ;(document.body.style as any).mozUserSelect = 'none'
  }

  const handleDragEnd = () => {
    setIsDragging(false)
    // Re-enable text selection after drag
    document.body.classList.remove('no-select')
    document.body.style.userSelect = ''
    ;(document.body.style as any).webkitUserSelect = ''
    ;(document.body.style as any).mozUserSelect = ''
  }

  // Get container bounds for drag constraints
  const getConstraints = () => {
    if (containerRef?.current) {
      const container = containerRef.current.getBoundingClientRect()
      return {
        left: -container.width / 2 + size / 2,
        right: container.width / 2 - size / 2,
        top: -container.height / 2 + size / 2,
        bottom: container.height / 2 - size / 2,
      }
    }
    return {
      left: -200,
      right: 200,
      top: -200,
      bottom: 200,
    }
  }

  return (
    <>
      {/* Bubble Trail */}
      {bubbles.map((bubble) => (
        <motion.div
          key={bubble.id}
          initial={{ 
            scale: 0, 
            opacity: 0.8,
            x: bubble.x - (typeof window !== 'undefined' ? window.innerWidth / 2 : 0),
            y: bubble.y - (typeof window !== 'undefined' ? window.innerHeight / 2 : 0)
          }}
          animate={{ 
            scale: [0, 1, 0], 
            opacity: [0.8, 0.4, 0],
            y: bubble.y - (typeof window !== 'undefined' ? window.innerHeight / 2 : 0) - 50
          }}
          transition={{ 
            duration: 1.2,
            delay: bubble.delay,
            ease: "easeOut"
          }}
          className="fixed pointer-events-none z-40"
          style={{
            left: '50%',
            top: '50%',
          }}
        >
          <div className="w-3 h-3 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full blur-sm" />
        </motion.div>
      ))}

      {/* Main Flash Symbol */}
      <motion.div
        ref={flashRef}
        drag
        dragConstraints={getConstraints()}
        dragElastic={0.1}
        dragMomentum={false}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        animate={controls}
        style={{ x, y, rotate, scale }}
        whileHover={{ 
          scale: 1.1,
          transition: { duration: 0.2 }
        }}
        whileTap={{ 
          scale: 0.95,
          transition: { duration: 0.1 }
        }}
        className={`relative cursor-grab active:cursor-grabbing z-30 select-none ${className}`}
        onMouseDown={(e: React.MouseEvent) => e.preventDefault()}
      >
        {/* Glow Effect */}
        <motion.div
          animate={isDragging ? {
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.6, 0.3],
          } : {}}
          transition={{
            duration: 1,
            repeat: isDragging ? Infinity : 0,
            ease: "easeInOut"
          }}
          className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full blur-lg opacity-30"
          style={{ width: size * 1.5, height: size * 1.5, left: -size * 0.25, top: -size * 0.25 }}
        />
        
        {/* Flash Icon */}
        <motion.div
          animate={isDragging ? {
            rotate: [0, 10, -10, 0],
          } : {}}
          transition={{
            duration: 0.5,
            repeat: isDragging ? Infinity : 0,
            ease: "easeInOut"
          }}
          className="relative z-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg"
          style={{ width: size, height: size }}
        >
          <Zap 
            className="text-white drop-shadow-lg" 
            size={size * 0.5}
            fill="currentColor"
          />
        </motion.div>

        {/* Sparkle Effects */}
        {isDragging && (
          <>
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                  x: [0, (Math.random() - 0.5) * 100],
                  y: [0, (Math.random() - 0.5) * 100],
                  rotate: [0, 360]
                }}
                transition={{
                  duration: 1.5,
                  delay: i * 0.1,
                  repeat: Infinity,
                  ease: "easeOut"
                }}
                className="absolute w-2 h-2 bg-yellow-400 rounded-full"
                style={{
                  left: size / 2,
                  top: size / 2,
                }}
              />
            ))}
          </>
        )}
      </motion.div>

      {/* Drag Instructions */}
      {!isDragging && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 text-center"
        >
          <p className="text-sm text-gray-500 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full border border-gray-200">
            Drag me around! ✨
          </p>
        </motion.div>
      )}
    </>
  )
}
