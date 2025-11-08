import { NextRequest, NextResponse } from 'next/server'

interface AnalyticsEvent {
  event: string
  technology?: string
  category?: string
  timestamp: string
  userAgent?: string
}

// In-memory storage for demo (use database in production)
let analyticsData: AnalyticsEvent[] = []

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const analyticsEvent: AnalyticsEvent = {
      event: body.event,
      technology: body.technology,
      category: body.category,
      timestamp: new Date().toISOString(),
      userAgent: request.headers.get('user-agent') || 'Unknown'
    }
    
    // Store the event (in production, save to database)
    analyticsData.push(analyticsEvent)
    
    // Keep only last 1000 events for demo
    if (analyticsData.length > 1000) {
      analyticsData = analyticsData.slice(-1000)
    }
    
    return NextResponse.json({
      success: true,
      message: 'Analytics event recorded'
    })
    
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to record analytics' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const event = searchParams.get('event')
    const technology = searchParams.get('technology')
    
    let filteredData = analyticsData
    
    if (event) {
      filteredData = filteredData.filter(item => item.event === event)
    }
    
    if (technology) {
      filteredData = filteredData.filter(item => item.technology === technology)
    }
    
    // Generate some stats
    const stats = {
      totalEvents: filteredData.length,
      popularTechnologies: getPopularTechnologies(filteredData),
      eventTypes: getEventTypes(filteredData),
      recentActivity: filteredData.slice(-10)
    }
    
    return NextResponse.json({
      success: true,
      data: stats
    })
    
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch analytics' },
      { status: 500 }
    )
  }
}

function getPopularTechnologies(data: AnalyticsEvent[]) {
  const techCount: Record<string, number> = {}
  
  data.forEach(event => {
    if (event.technology) {
      techCount[event.technology] = (techCount[event.technology] || 0) + 1
    }
  })
  
  return Object.entries(techCount)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 10)
    .map(([tech, count]) => ({ technology: tech, views: count }))
}

function getEventTypes(data: AnalyticsEvent[]) {
  const eventCount: Record<string, number> = {}
  
  data.forEach(event => {
    eventCount[event.event] = (eventCount[event.event] || 0) + 1
  })
  
  return Object.entries(eventCount)
    .map(([event, count]) => ({ event, count }))
}
