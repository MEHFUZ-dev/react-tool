'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Mail, MessageCircle, Send, MapPin, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

type FormData = z.infer<typeof formSchema>

const contactInfo = [
  {
    icon: Mail,
    title: "Email Us",
    description: "hello@nextlevel.dev",
    color: "from-blue-400 to-cyan-500"
  },
  {
    icon: Phone,
    title: "Call Us",
    description: "+1 (555) 123-4567",
    color: "from-green-400 to-emerald-500"
  },
  {
    icon: MapPin,
    title: "Visit Us",
    description: "San Francisco, CA",
    color: "from-purple-400 to-pink-500"
  }
]

export function ContactSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<FormData>({
    resolver: zodResolver(formSchema)
  })

  const onSubmit = async (data: FormData) => {
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000))
    console.log('Form submitted:', data)
    reset()
  }

  return (
    <section id="contact" className="py-24 bg-white" ref={ref}>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center mb-4">
            <MessageCircle className="h-8 w-8 text-purple-600 mr-2" />
            <span className="text-purple-600 font-semibold text-lg">Contact</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gray-900">Ready to Choose Your </span>
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Tech Stack?</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get personalized recommendations and expert guidance for your next project. 
            Let's help you make the right technology decisions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="p-8 shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      {...register('name')}
                      className="border-gray-200 focus:border-purple-500 focus:ring-purple-500"
                      placeholder="Your name"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm">{errors.name.message}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      {...register('email')}
                      className="border-gray-200 focus:border-purple-500 focus:ring-purple-500"
                      placeholder="your@email.com"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    {...register('subject')}
                    className="border-gray-200 focus:border-purple-500 focus:ring-purple-500"
                    placeholder="What's this about?"
                  />
                  {errors.subject && (
                    <p className="text-red-500 text-sm">{errors.subject.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    {...register('message')}
                    className="border-gray-200 focus:border-purple-500 focus:ring-purple-500 min-h-[120px]"
                    placeholder="Tell us about your project..."
                  />
                  {errors.message && (
                    <p className="text-red-500 text-sm">{errors.message.message}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 text-lg group"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                  <motion.div
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <Send className="ml-2 h-5 w-5" />
                  </motion.div>
                </Button>
              </form>
            </Card>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="group"
              >
                <Card className="p-6 border-0 shadow-lg hover:shadow-2xl transition-all duration-300 bg-white/80 backdrop-blur-sm">
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-2xl bg-gradient-to-r ${info.color} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <info.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-purple-600 transition-colors duration-300">
                        {info.title}
                      </h3>
                      <p className="text-gray-600">{info.description}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="mt-12"
            >
              <Card className="p-8 bg-gradient-to-r from-purple-600 to-pink-600 border-0 shadow-2xl text-white">
                <h3 className="text-2xl font-bold mb-4">Ready to get started?</h3>
                <p className="text-purple-100 mb-6">
                  Join thousands of developers who are already building amazing 
                  projects with our modern tech stack.
                </p>
                <Button 
                  variant="secondary" 
                  className="bg-white text-purple-600 hover:bg-gray-100"
                >
                  Schedule a Call
                </Button>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
