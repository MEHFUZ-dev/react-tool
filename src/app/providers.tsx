'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState, useEffect } from 'react'
import { initLenis } from '@/lib/lenis'

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient())

  useEffect(() => {
    // Initialize Lenis smooth scrolling
    const lenis = initLenis()
    
    return () => {
      // Cleanup if needed
      if (lenis) {
        lenis.destroy()
      }
    }
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}
