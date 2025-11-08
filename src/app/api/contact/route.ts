import { NextRequest, NextResponse } from 'next/server'

interface ContactFormData {
  name: string
  email: string
  company?: string
  message: string
  techStack?: string[]
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json()
    
    // Validate required fields
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Name, email, and message are required fields' 
        },
        { status: 400 }
      )
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Please provide a valid email address' 
        },
        { status: 400 }
      )
    }
    
    // In a real application, you would:
    // 1. Save to database
    // 2. Send email notification
    // 3. Add to CRM system
    // 4. Send auto-reply email
    
    // For now, just log the contact form data
    console.log('Contact form submission:', {
      name: body.name,
      email: body.email,
      company: body.company || 'Not provided',
      message: body.message,
      techStack: body.techStack || [],
      timestamp: new Date().toISOString()
    })
    
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    return NextResponse.json({
      success: true,
      message: 'Thank you for your message! We\'ll get back to you soon.',
      data: {
        id: `contact_${Date.now()}`,
        status: 'received',
        estimatedResponse: '24-48 hours'
      }
    })
    
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to process your message. Please try again later.' 
      },
      { status: 500 }
    )
  }
}

// Handle GET requests (for testing)
export async function GET() {
  return NextResponse.json({
    success: true,
    message: 'Contact API is working',
    endpoints: {
      POST: '/api/contact - Submit contact form',
      fields: {
        required: ['name', 'email', 'message'],
        optional: ['company', 'techStack']
      }
    }
  })
}
