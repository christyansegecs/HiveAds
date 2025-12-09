
// src/app/(app)/layout.tsx
'use client'

import type { ReactNode } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { AppWindow } from '@/components/layout/AppWindow'

export default function AppLayout({ children }: { children: ReactNode }) {
  
  const { isAuthenticated } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/login')
    }
  }, [isAuthenticated, router, pathname])

  if (!isAuthenticated) {
    // evita piscar conteúdo protegido
    return null
  }

  return <AppWindow>{children}</AppWindow>
}
