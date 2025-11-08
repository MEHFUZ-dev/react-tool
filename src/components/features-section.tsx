'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { 
  Zap, 
  Palette, 
  Shield, 
  Smartphone, 
  Code, 
  Layers,
  Sparkles,
  Rocket
} from 'lucide-react'
import { Card } from '@/components/ui/card'

const initialFeatures = [
  {
    id: 1,
    icon: Zap,
    title: "Lightning Fast",
    description: "Turbopack powered",
    color: "from-yellow-400 to-orange-500"
  },
  {
    id: 2,
    icon: Palette,
    title: "Beautiful UI",
    description: "ShadCN components",
    color: "from-purple-400 to-pink-500"
  },
  {
    id: 3,
    icon: Shield,
    title: "Modern Stack",
    description: "Latest technologies",
    color: "from-blue-400 to-cyan-500"
  }
]

export function FeaturesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [features, setFeatures] = useState(initialFeatures)
  const [draggedItem, setDraggedItem] = useState<number | null>(null)

  const handleDragStart = (id: number) => {
    setDraggedItem(id)
  }

  const handleDragEnd = () => {
    setDraggedItem(null)
  }

  const handleDrop = (targetId: number) => {
    if (draggedItem && draggedItem !== targetId) {
      const newFeatures = [...features]
      const draggedIndex = newFeatures.findIndex(f => f.id === draggedItem)
      const targetIndex = newFeatures.findIndex(f => f.id === targetId)
      
      // Swap positions
      const temp = newFeatures[draggedIndex]
      newFeatures[draggedIndex] = newFeatures[targetIndex]
      newFeatures[targetIndex] = temp
      
      setFeatures(newFeatures)
    }
  }

  return (
    <section id="features" className="py-24 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50" ref={ref}>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="h-8 w-8 text-purple-600 mr-2" />
            <span className="text-purple-600 font-semibold text-lg">Features</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Why Choose <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Our Platform</span>
          </h2>
          <p className="text-xl text-black max-w-3xl mx-auto">
            Interactive features that make development faster and more enjoyable. 
            Click to animate, drag to reorder!
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-8 max-w-4xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              drag
              dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
              dragElastic={0.1}
              onDragStart={() => handleDragStart(feature.id)}
              onDragEnd={handleDragEnd}
              whileHover={{ 
                y: -10,
                scale: 1.05,
                rotate: [0, -2, 2, 0],
                transition: { duration: 0.3 }
              }}
              whileTap={{ 
                scale: 0.95,
                y: -20,
                rotate: [0, 10, -10, 0],
                transition: { duration: 0.2 }
              }}
              whileDrag={{ 
                scale: 1.1, 
                rotate: 5,
                zIndex: 10,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
              }}
              className="group cursor-grab active:cursor-grabbing"
              style={{ width: '280px' }}
              onDrop={() => handleDrop(feature.id)}
            >
              <Card className="p-8 h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-300 bg-white/80 backdrop-blur-sm">
                <div className="flex flex-col items-center text-center">
                  <div className={`p-4 rounded-2xl bg-gradient-to-r ${feature.color} shadow-lg group-hover:scale-110 transition-transform duration-300 mb-4`}>
                    <feature.icon className="h-12 w-12 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed text-sm">
                    {feature.description}
                  </p>
                  
                  <motion.div
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    className="h-1 bg-gradient-to-r from-purple-600 to-pink-600 mt-4 rounded-full"
                  />
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16"
        >
          <Card className="inline-block p-8 bg-gradient-to-r from-purple-600 to-pink-600 border-0 shadow-2xl">
            <div className="flex items-center space-x-4 text-white">
              <Rocket className="h-12 w-12" />
              <div className="text-left">
                <h3 className="text-2xl font-bold mb-2">Ready to Launch?</h3>
                <p className="text-purple-100">Start building your next project today</p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
