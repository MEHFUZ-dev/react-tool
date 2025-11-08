'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Code2, 
  Database, 
  Server, 
  Smartphone, 
  Globe, 
  Zap, 
  TrendingUp, 
  Users, 
  Star,
  GitBranch,
  Download,
  Clock
} from 'lucide-react'

interface Technology {
  id: string
  name: string
  category: 'frontend' | 'backend' | 'database' | 'mobile' | 'devops'
  description: string
  logo: string
  popularity: number
  githubStars: string
  npmDownloads: string
  learningCurve: 'Easy' | 'Medium' | 'Hard'
  jobMarket: number
  pros: string[]
  cons: string[]
  usedBy: string[]
  color: string
}

const technologies: Technology[] = [
  {
    id: 'react',
    name: 'React',
    category: 'frontend',
    description: 'A JavaScript library for building user interfaces',
    logo: '⚛️',
    popularity: 95,
    githubStars: '220k',
    npmDownloads: '20M/week',
    learningCurve: 'Medium',
    jobMarket: 92,
    pros: ['Virtual DOM', 'Large ecosystem', 'Strong community', 'Flexible'],
    cons: ['Steep learning curve', 'Rapid changes', 'JSX complexity'],
    usedBy: ['Facebook', 'Netflix', 'Airbnb', 'Instagram'],
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'vue',
    name: 'Vue.js',
    category: 'frontend',
    description: 'The Progressive JavaScript Framework',
    logo: '💚',
    popularity: 88,
    githubStars: '206k',
    npmDownloads: '4M/week',
    learningCurve: 'Easy',
    jobMarket: 78,
    pros: ['Easy to learn', 'Great documentation', 'Flexible', 'Small size'],
    cons: ['Smaller ecosystem', 'Less job opportunities', 'Language barriers'],
    usedBy: ['GitLab', 'Adobe', 'Nintendo', 'BMW'],
    color: 'from-green-500 to-emerald-500'
  },
  {
    id: 'angular',
    name: 'Angular',
    category: 'frontend',
    description: 'Platform for building mobile and desktop web applications',
    logo: '🅰️',
    popularity: 82,
    githubStars: '93k',
    npmDownloads: '3M/week',
    learningCurve: 'Hard',
    jobMarket: 85,
    pros: ['Full framework', 'TypeScript support', 'Enterprise ready', 'CLI tools'],
    cons: ['Complex', 'Large bundle size', 'Steep learning curve'],
    usedBy: ['Google', 'Microsoft', 'Deutsche Bank', 'Samsung'],
    color: 'from-red-500 to-pink-500'
  },
  {
    id: 'nodejs',
    name: 'Node.js',
    category: 'backend',
    description: 'JavaScript runtime built on Chrome\'s V8 JavaScript engine',
    logo: '🟢',
    popularity: 94,
    githubStars: '104k',
    npmDownloads: 'Runtime',
    learningCurve: 'Medium',
    jobMarket: 89,
    pros: ['JavaScript everywhere', 'Fast I/O', 'Large ecosystem', 'Scalable'],
    cons: ['Single-threaded', 'Callback hell', 'Rapid changes'],
    usedBy: ['Netflix', 'Uber', 'LinkedIn', 'PayPal'],
    color: 'from-green-600 to-lime-500'
  },
  {
    id: 'python',
    name: 'Python/Django',
    category: 'backend',
    description: 'High-level Python web framework',
    logo: '🐍',
    popularity: 91,
    githubStars: '76k',
    npmDownloads: 'N/A',
    learningCurve: 'Easy',
    jobMarket: 87,
    pros: ['Rapid development', 'Clean syntax', 'Great for AI/ML', 'Stable'],
    cons: ['Slower than compiled languages', 'GIL limitations'],
    usedBy: ['Instagram', 'Spotify', 'Dropbox', 'Pinterest'],
    color: 'from-yellow-500 to-orange-500'
  },
  {
    id: 'mongodb',
    name: 'MongoDB',
    category: 'database',
    description: 'Document-oriented NoSQL database',
    logo: '🍃',
    popularity: 86,
    githubStars: '25k',
    npmDownloads: '1M/week',
    learningCurve: 'Medium',
    jobMarket: 76,
    pros: ['Flexible schema', 'Horizontal scaling', 'JSON-like documents'],
    cons: ['Memory usage', 'No ACID transactions', 'Learning curve'],
    usedBy: ['Facebook', 'Google', 'eBay', 'Adobe'],
    color: 'from-green-700 to-green-500'
  },
  {
    id: 'nextjs',
    name: 'Next.js',
    category: 'frontend',
    description: 'React framework for production',
    logo: '▲',
    popularity: 93,
    githubStars: '120k',
    npmDownloads: '5M/week',
    learningCurve: 'Medium',
    jobMarket: 88,
    pros: ['Server-side rendering', 'File-based routing', 'API routes', 'Performance'],
    cons: ['Learning curve', 'Opinionated', 'Build complexity'],
    usedBy: ['Vercel', 'TikTok', 'Twitch', 'Hulu'],
    color: 'from-black to-gray-600'
  },
  {
    id: 'svelte',
    name: 'Svelte',
    category: 'frontend',
    description: 'Cybernetically enhanced web apps',
    logo: '🔥',
    popularity: 79,
    githubStars: '76k',
    npmDownloads: '500k/week',
    learningCurve: 'Easy',
    jobMarket: 65,
    pros: ['No virtual DOM', 'Small bundle size', 'Easy to learn', 'Fast'],
    cons: ['Smaller ecosystem', 'Less jobs', 'Newer framework'],
    usedBy: ['The New York Times', 'Apple', 'Spotify', 'Reuters'],
    color: 'from-orange-500 to-red-500'
  },
  {
    id: 'express',
    name: 'Express.js',
    category: 'backend',
    description: 'Fast, unopinionated web framework for Node.js',
    logo: '🚂',
    popularity: 92,
    githubStars: '64k',
    npmDownloads: '25M/week',
    learningCurve: 'Easy',
    jobMarket: 90,
    pros: ['Minimalist', 'Flexible', 'Large ecosystem', 'Fast development'],
    cons: ['No structure', 'Security concerns', 'Callback hell'],
    usedBy: ['IBM', 'Accenture', 'Uber', 'Fox Sports'],
    color: 'from-gray-700 to-gray-500'
  },
  {
    id: 'fastapi',
    name: 'FastAPI',
    category: 'backend',
    description: 'Modern, fast web framework for building APIs with Python',
    logo: '⚡',
    popularity: 85,
    githubStars: '70k',
    npmDownloads: 'N/A',
    learningCurve: 'Medium',
    jobMarket: 78,
    pros: ['Fast performance', 'Auto documentation', 'Type hints', 'Modern Python'],
    cons: ['Newer framework', 'Smaller community', 'Python limitations'],
    usedBy: ['Microsoft', 'Uber', 'Netflix', 'Explosion AI'],
    color: 'from-teal-500 to-cyan-500'
  },
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    category: 'database',
    description: 'Advanced open source relational database',
    logo: '🐘',
    popularity: 89,
    githubStars: '15k',
    npmDownloads: '2M/week',
    learningCurve: 'Medium',
    jobMarket: 84,
    pros: ['ACID compliant', 'Advanced features', 'Reliable', 'Extensible'],
    cons: ['Complex setup', 'Memory usage', 'Learning curve'],
    usedBy: ['Apple', 'Fujitsu', 'Red Hat', 'Sun Microsystems'],
    color: 'from-blue-600 to-indigo-600'
  },
  {
    id: 'mysql',
    name: 'MySQL',
    category: 'database',
    description: 'Popular open source relational database',
    logo: '🐬',
    popularity: 87,
    githubStars: '10k',
    npmDownloads: '1.5M/week',
    learningCurve: 'Easy',
    jobMarket: 82,
    pros: ['Easy to use', 'Fast', 'Reliable', 'Wide support'],
    cons: ['Limited features', 'Licensing issues', 'Storage engines'],
    usedBy: ['Facebook', 'Twitter', 'YouTube', 'GitHub'],
    color: 'from-orange-600 to-yellow-500'
  },
  {
    id: 'redis',
    name: 'Redis',
    category: 'database',
    description: 'In-memory data structure store',
    logo: '🔴',
    popularity: 83,
    githubStars: '65k',
    npmDownloads: '3M/week',
    learningCurve: 'Medium',
    jobMarket: 75,
    pros: ['Very fast', 'Multiple data types', 'Pub/Sub', 'Caching'],
    cons: ['Memory only', 'Single-threaded', 'Persistence complexity'],
    usedBy: ['Twitter', 'GitHub', 'Weibo', 'Pinterest'],
    color: 'from-red-600 to-red-400'
  },
  {
    id: 'reactnative',
    name: 'React Native',
    category: 'mobile',
    description: 'Build mobile apps using React',
    logo: '📱',
    popularity: 88,
    githubStars: '116k',
    npmDownloads: '1M/week',
    learningCurve: 'Medium',
    jobMarket: 81,
    pros: ['Cross-platform', 'React knowledge', 'Hot reload', 'Native performance'],
    cons: ['Platform differences', 'Bridge overhead', 'Debugging complexity'],
    usedBy: ['Facebook', 'Instagram', 'Airbnb', 'Tesla'],
    color: 'from-blue-500 to-purple-500'
  },
  {
    id: 'flutter',
    name: 'Flutter',
    category: 'mobile',
    description: 'Google\'s UI toolkit for mobile, web, and desktop',
    logo: '🦋',
    popularity: 84,
    githubStars: '163k',
    npmDownloads: 'N/A',
    learningCurve: 'Medium',
    jobMarket: 76,
    pros: ['Cross-platform', 'Fast development', 'Custom widgets', 'Hot reload'],
    cons: ['Large app size', 'Dart language', 'Newer ecosystem'],
    usedBy: ['Google', 'Alibaba', 'BMW', 'Square'],
    color: 'from-blue-400 to-cyan-400'
  },
  {
    id: 'docker',
    name: 'Docker',
    category: 'devops',
    description: 'Platform for developing, shipping, and running applications',
    logo: '🐳',
    popularity: 91,
    githubStars: '68k',
    npmDownloads: 'N/A',
    learningCurve: 'Medium',
    jobMarket: 86,
    pros: ['Containerization', 'Consistent environments', 'Scalable', 'DevOps friendly'],
    cons: ['Learning curve', 'Resource overhead', 'Security concerns'],
    usedBy: ['Google', 'VMware', 'ING', 'PayPal'],
    color: 'from-blue-600 to-blue-400'
  },
  {
    id: 'kubernetes',
    name: 'Kubernetes',
    category: 'devops',
    description: 'Container orchestration platform',
    logo: '☸️',
    popularity: 87,
    githubStars: '107k',
    npmDownloads: 'N/A',
    learningCurve: 'Hard',
    jobMarket: 83,
    pros: ['Auto-scaling', 'Self-healing', 'Load balancing', 'Rolling updates'],
    cons: ['Complex', 'Steep learning curve', 'Resource intensive'],
    usedBy: ['Google', 'Microsoft', 'Red Hat', 'IBM'],
    color: 'from-indigo-600 to-purple-600'
  },
  {
    id: 'aws',
    name: 'AWS',
    category: 'devops',
    description: 'Amazon Web Services cloud platform',
    logo: '☁️',
    popularity: 94,
    githubStars: 'N/A',
    npmDownloads: 'N/A',
    learningCurve: 'Hard',
    jobMarket: 92,
    pros: ['Comprehensive services', 'Scalable', 'Reliable', 'Global reach'],
    cons: ['Complex pricing', 'Vendor lock-in', 'Learning curve'],
    usedBy: ['Netflix', 'Airbnb', 'Slack', 'Adobe'],
    color: 'from-orange-500 to-yellow-400'
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    category: 'frontend',
    description: 'Typed superset of JavaScript',
    logo: '🔷',
    popularity: 90,
    githubStars: '98k',
    npmDownloads: '45M/week',
    learningCurve: 'Medium',
    jobMarket: 89,
    pros: ['Type safety', 'Better IDE support', 'Refactoring', 'Large codebase friendly'],
    cons: ['Compilation step', 'Learning curve', 'Configuration complexity'],
    usedBy: ['Microsoft', 'Slack', 'Asana', 'Lyft'],
    color: 'from-blue-600 to-blue-800'
  },
  {
    id: 'graphql',
    name: 'GraphQL',
    category: 'backend',
    description: 'Query language for APIs',
    logo: '🔗',
    popularity: 82,
    githubStars: '20k',
    npmDownloads: '8M/week',
    learningCurve: 'Medium',
    jobMarket: 74,
    pros: ['Flexible queries', 'Type system', 'Single endpoint', 'Real-time'],
    cons: ['Learning curve', 'Caching complexity', 'Over-fetching'],
    usedBy: ['Facebook', 'GitHub', 'Pinterest', 'Coursera'],
    color: 'from-pink-500 to-purple-500'
  }
]

const categories = [
  { id: 'all', name: 'All Technologies', icon: Globe },
  { id: 'frontend', name: 'Frontend', icon: Code2 },
  { id: 'backend', name: 'Backend', icon: Server },
  { id: 'database', name: 'Database', icon: Database },
  { id: 'mobile', name: 'Mobile', icon: Smartphone },
  { id: 'devops', name: 'DevOps', icon: Zap },
]

export function TechComparison() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedTechs, setSelectedTechs] = useState<string[]>([])
  const [showAll, setShowAll] = useState(false)

  const filteredTechnologies = selectedCategory === 'all' 
    ? technologies 
    : technologies.filter(tech => tech.category === selectedCategory)
  
  const displayedTechnologies = showAll ? filteredTechnologies : filteredTechnologies.slice(0, 6)

  const toggleTechSelection = (techId: string) => {
    setSelectedTechs(prev => 
      prev.includes(techId) 
        ? prev.filter(id => id !== techId)
        : prev.length < 3 ? [...prev, techId] : prev
    )
  }

  const selectedTechData = technologies.filter(tech => selectedTechs.includes(tech.id))

  return (
    <section className="py-24 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0">
            <TrendingUp className="h-4 w-4 mr-2" />
            Technology Comparison
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Compare <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Tech Stacks</span>
          </h2>
          <p className="text-xl text-black max-w-3xl mx-auto">
            Discover, compare, and master full stack technologies. Your ultimate guide to choosing the perfect tech stack for any project.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className={`${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-100'
                } transition-all duration-300`}
              >
                <Icon className="h-4 w-4 mr-2" />
                {category.name}
              </Button>
            )
          })}
        </motion.div>


        {/* Technology Cards */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 ${showAll ? 'min-h-screen' : ''}`}
        >
          {displayedTechnologies.map((tech, index) => (
            <motion.div
              key={tech.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card 
                className={`bg-white border-gray-200 hover:border-gray-400 hover:shadow-lg transition-all duration-300 cursor-pointer group relative overflow-hidden ${
                  selectedTechs.includes(tech.id) ? 'border-gray-400 shadow-md' : ''
                }`}
                onClick={() => toggleTechSelection(tech.id)}
              >
                {/* Animated Background Video Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500">
                  <div className={`w-full h-full bg-gradient-to-br ${tech.color} animate-pulse`}></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/10 to-transparent animate-bounce"></div>
                </div>
                
                {/* Floating Animation Elements */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <motion.div
                    className="w-2 h-2 bg-purple-400 rounded-full"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </div>
                
                <CardHeader className="relative z-10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <motion.span 
                        className="text-3xl group-hover:scale-110 transition-transform duration-300"
                        whileHover={{ rotate: [0, -10, 10, 0] }}
                        transition={{ duration: 0.5 }}
                      >
                        {tech.logo}
                      </motion.span>
                      <div>
                        <CardTitle className="text-gray-900 group-hover:text-purple-700 transition-colors duration-300">{tech.name}</CardTitle>
                        <CardDescription className="text-gray-600">
                          {tech.description}
                        </CardDescription>
                      </div>
                    </div>
                    {selectedTechs.includes(tech.id) && (
                      <Star className="h-5 w-5 text-yellow-500 fill-current" />
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Popularity Bar */}
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Popularity</span>
                        <span className="text-gray-900">{tech.popularity}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`bg-gradient-to-r ${tech.color} h-2 rounded-full transition-all duration-500`}
                          style={{ width: `${tech.popularity}%` }}
                        />
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <GitBranch className="h-4 w-4 text-gray-500" />
                        <span className="text-gray-700">{tech.githubStars}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Download className="h-4 w-4 text-gray-500" />
                        <span className="text-gray-700">{tech.npmDownloads}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span className="text-gray-700">{tech.learningCurve}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-gray-500" />
                        <span className="text-gray-700">{tech.jobMarket}%</span>
                      </div>
                    </div>

                    {/* Used By */}
                    <div>
                      <p className="text-gray-600 text-sm mb-2">Used by:</p>
                      <div className="flex flex-wrap gap-1">
                        {tech.usedBy.slice(0, 3).map((company) => (
                          <Badge key={company} variant="secondary" className="text-xs">
                            {company}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Compare Stack / Explore Technologies Button */}
        {filteredTechnologies.length > 6 && (
          <div className="text-center mb-12">
            <button
              onClick={() => setShowAll(!showAll)}
              className="group relative bg-white border-2 border-purple-600 hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 text-purple-600 hover:text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center gap-2 mx-auto overflow-hidden"
            >
              {showAll ? (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                  <span className="group-hover:hidden">Compare Stack</span>
                  <span className="hidden group-hover:inline">Less Technologies</span>
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                  <span className="group-hover:hidden">Compare Stack</span>
                  <span className="hidden group-hover:inline">Explore Technologies ({filteredTechnologies.length - 6} more)</span>
                </>
              )}
            </button>
          </div>
        )}

        {/* Comparison Section */}
        {selectedTechs.length > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gray-50 rounded-2xl p-8 border border-gray-200"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Side-by-Side Comparison
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {selectedTechData.map((tech) => (
                <div key={tech.id} className="space-y-4">
                  <div className="text-center">
                    <span className="text-2xl">{tech.logo}</span>
                    <h4 className="text-lg font-semibold text-gray-900 mt-2">{tech.name}</h4>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <h5 className="text-green-600 font-medium mb-2">Pros:</h5>
                      <ul className="text-sm text-gray-700 space-y-1">
                        {tech.pros.map((pro, index) => (
                          <li key={index}>• {pro}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h5 className="text-red-600 font-medium mb-2">Cons:</h5>
                      <ul className="text-sm text-gray-700 space-y-1">
                        {tech.cons.map((con, index) => (
                          <li key={index}>• {con}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {selectedTechs.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Zap className="h-16 w-16 text-purple-500 mx-auto mb-4" />
            <p className="text-xl text-black">
              Click on technologies to compare them side-by-side
            </p>
            <p className="text-black mt-2">
              Select up to 3 technologies for detailed comparison
            </p>
          </motion.div>
        )}
      </div>
    </section>
  )
}
