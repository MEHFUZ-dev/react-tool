'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
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

const features = [
  {
    icon: Zap,
    title: "Turbopack Speed",
    description: "Experience lightning-fast development with Next.js 14 and Turbopack bundling.",
    color: "from-yellow-400 to-orange-500"
  },
  {
    icon: Palette,
    title: "Beautiful Design",
    description: "Crafted with Tailwind CSS and ShadCN/UI for stunning, accessible components.",
    color: "from-purple-400 to-pink-500"
  },
  {
    icon: Shield,
    title: "Type Safety",
    description: "Built with TypeScript for robust, error-free development experience.",
    color: "from-blue-400 to-cyan-500"
  },
  {
    icon: Smartphone,
    title: "Mobile First",
    description: "Responsive design that works perfectly on all devices and screen sizes.",
    color: "from-green-400 to-emerald-500"
  },
  {
    icon: Code,
    title: "Modern Stack",
    description: "Leveraging the latest technologies including React 18, Framer Motion, and more.",
    color: "from-indigo-400 to-purple-500"
  },
  {
    icon: Layers,
    title: "Component Library",
    description: "Extensive collection of reusable components built with best practices.",
    color: "from-pink-400 to-rose-500"
  }
]

export function FeaturesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="features" className="py-24 bg-white" ref={ref}>
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
            Why Choose <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">FullStack Hub</span>
          </h2>
          <p className="text-xl text-black max-w-3xl mx-auto">
            Make informed technology decisions with real-time data, comprehensive comparisons, 
            and expert insights from the developer community.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group"
            >
              <Card className="p-8 h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-white to-gray-50">
                <div className="flex items-center mb-6">
                  <div className={`p-3 rounded-2xl bg-gradient-to-r ${feature.color} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-purple-600 transition-colors duration-300">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
                
                <motion.div
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  className="h-1 bg-gradient-to-r from-purple-600 to-pink-600 mt-6 rounded-full"
                />
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
