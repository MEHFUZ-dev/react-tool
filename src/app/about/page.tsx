'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  ArrowLeft, 
  Zap, 
  Target, 
  Users, 
  Lightbulb, 
  Code, 
  Globe,
  Heart,
  Star,
  Rocket
} from 'lucide-react'

const features = [
  {
    icon: Target,
    title: "Our Mission",
    description: "To simplify technology decision-making for developers and teams by providing comprehensive, up-to-date comparisons of modern tech stacks."
  },
  {
    icon: Lightbulb,
    title: "Innovation First",
    description: "We stay ahead of the curve, constantly updating our database with the latest technologies, frameworks, and best practices in the industry."
  },
  {
    icon: Users,
    title: "Community Driven",
    description: "Built by developers, for developers. Our platform grows stronger with every user interaction and feedback from the community."
  },
  {
    icon: Globe,
    title: "Global Impact",
    description: "Helping developers worldwide make informed decisions that shape the future of technology and drive innovation forward."
  }
]

const stats = [
  { number: "50+", label: "Technologies Covered" },
  { number: "10K+", label: "Developers Helped" },
  { number: "99%", label: "Accuracy Rate" },
  { number: "24/7", label: "Always Updated" }
]

const team = [
  {
    name: "Tech Hub Team",
    role: "Full Stack Developers",
    description: "Passionate developers dedicated to creating the best technology comparison platform."
  }
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link 
              href="/"
              className="inline-flex items-center text-purple-600 hover:text-purple-700 transition-colors duration-200 mb-8"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
          </motion.div>

          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <Badge className="mb-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0">
              <Heart className="h-4 w-4 mr-2" />
              About Tech Hub
            </Badge>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                Empowering Developers
              </span>
              <br />
              <span className="text-gray-900">Worldwide</span>
            </h1>
            
            <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-8">
              Tech Hub is your ultimate companion for navigating the ever-evolving landscape of 
              modern technologies. We provide detailed comparisons, insights, and recommendations 
              to help you make the best decisions for your projects.
            </p>

            <div className="flex items-center justify-center gap-2 mb-8">
              <Zap className="h-6 w-6 text-purple-600" fill="currentColor" />
              <span className="text-lg font-semibold text-gray-800">
                Making Technology Choices Simple
              </span>
            </div>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center border border-purple-100 shadow-lg"
              >
                <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Features Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
              What Makes Us Different
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                    <CardHeader>
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-4">
                        <feature.icon className="h-6 w-6 text-white" />
                      </div>
                      <CardTitle className="text-xl text-gray-900">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-gray-600 text-base leading-relaxed">
                        {feature.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Team Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
              Built with <Heart className="inline h-6 w-6 text-red-500" fill="currentColor" /> by Developers
            </h2>
            
            <div className="max-w-2xl mx-auto">
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg text-center">
                <CardHeader>
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Code className="h-10 w-10 text-white" />
                  </div>
                  <CardTitle className="text-2xl text-gray-900">{team[0].name}</CardTitle>
                  <CardDescription className="text-purple-600 font-semibold text-lg">
                    {team[0].role}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    {team[0].description}
                  </p>
                </CardContent>
              </Card>
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-center"
          >
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-8 md:p-12 text-white">
              <Rocket className="h-12 w-12 mx-auto mb-6" />
              <h3 className="text-3xl font-bold mb-4">Ready to Explore?</h3>
              <p className="text-xl mb-8 opacity-90">
                Join thousands of developers who trust Tech Hub for their technology decisions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/register">
                  <Button 
                    size="lg"
                    className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-6 text-lg font-semibold rounded-full"
                  >
                    Get Started Free
                  </Button>
                </Link>
                <Link href="/">
                  <Button 
                    variant="outline"
                    size="lg"
                    className="border-2 border-white text-white hover:bg-white hover:text-purple-600 px-8 py-6 text-lg font-semibold rounded-full"
                  >
                    Explore Technologies
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
