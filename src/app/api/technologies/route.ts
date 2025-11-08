import { NextRequest, NextResponse } from 'next/server'

// Technology data - in a real app, this would come from a database
const technologies = [
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
  }
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const limit = searchParams.get('limit')
    
    let filteredTechnologies = technologies
    
    // Filter by category if provided
    if (category && category !== 'all') {
      filteredTechnologies = technologies.filter(tech => tech.category === category)
    }
    
    // Limit results if provided
    if (limit) {
      const limitNum = parseInt(limit)
      filteredTechnologies = filteredTechnologies.slice(0, limitNum)
    }
    
    return NextResponse.json({
      success: true,
      data: filteredTechnologies,
      total: technologies.length
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch technologies' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // In a real app, you would save to database
    // For now, just return success
    return NextResponse.json({
      success: true,
      message: 'Technology data received',
      data: body
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to process request' },
      { status: 500 }
    )
  }
}
