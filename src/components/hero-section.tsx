'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, Zap, Rocket, Play } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const floatingIcons = [
  { icon: Sparkles, delay: 0, x: 100, y: 50 },
  { icon: Zap, delay: 0.5, x: -80, y: 100 },
  { icon: Rocket, delay: 1, x: 120, y: -80 },
]

export function HeroSection() {
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-purple-50 via-white to-pink-50">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {floatingIcons.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: 0.1, 
              scale: 1,
              x: [0, item.x, 0],
              y: [0, item.y, 0],
              rotate: [0, 360]
            }}
            transition={{ 
              delay: item.delay,
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute"
            style={{ 
              left: `${20 + index * 30}%`, 
              top: `${30 + index * 20}%` 
            }}
          >
            <item.icon className="h-24 w-24 text-purple-300" />
          </motion.div>
        ))}
      </div>

      {/* Gradient Orbs */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      <div className="absolute top-40 right-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Badge className="mb-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0">
            <Sparkles className="h-4 w-4 mr-2" />
            Next-Level Technology
          </Badge>
        </motion.div>

        <motion.h1 
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
            FullStack
          </span>
          <br />
          <span className="text-gray-900 font-bold">Tech Hub</span>
        </motion.h1>

        <motion.p 
          className="text-xl md:text-2xl text-gray-800 text-center mb-12 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Discover, compare, and master full stack technologies. Your ultimate guide 
          to choosing the perfect tech stack for any project.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-6 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Rocket className="mr-2 h-5 w-5" />
            Explore Technologies
          </Button>
          
          <Button 
            variant="outline" 
            size="lg"
            className="border-2 border-purple-600 text-gray-900 hover:bg-purple-600 hover:text-white px-8 py-6 text-lg font-semibold rounded-full backdrop-blur-sm transition-all duration-300 bg-white/80"
          >
            <Play className="mr-2 h-5 w-5" />
            Compare Stacks
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
        >
          {[
            { icon: Zap, title: "Lightning Fast", desc: "Turbopack powered" },
            { icon: Sparkles, title: "Beautiful UI", desc: "ShadCN components" },
            { icon: Rocket, title: "Modern Stack", desc: "Latest technologies" },
          ].map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -10, scale: 1.05 }}
              whileTap={{ 
                scale: 0.8,
                y: -80,
                rotate: [0, 20, -20, 0],
                transition: { 
                  duration: 0.6,
                  type: "spring",
                  stiffness: 200,
                  damping: 8
                }
              }}
              className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-purple-100 shadow-lg cursor-pointer"
            >
              <feature.icon className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
