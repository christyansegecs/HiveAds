
// src/contexts/AuthContext.tsx
'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import { useRouter, usePathname } from 'next/navigation'

interface AuthContextValue {
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {

  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  // carrega do localStorage (mock)
  useEffect(() => {
    if (typeof window === 'undefined') return
    const stored = window.localStorage.getItem('hive_auth')
    setIsAuthenticated(stored === 'true')
  }, [])

  const login = useCallback(
    async (email: string, password: string) => {
      // aqui depois entra a chamada real para API Nest
      if (!email || !password) {
        throw new Error('Informe e-mail e senha')
      }

      // MOCK: login sempre funciona
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('hive_auth', 'true')
      }

      setIsAuthenticated(true)

      // 🔹 AQUI: depois de logar, pede pro Electron aumentar a janela
      if (
        typeof window !== 'undefined' &&
        (window as any).electronAPI?.windowControls?.setSize
      ) {
        (window as any).electronAPI.windowControls.setSize(1200, 800, 1024, 600)
      }


      // depois de logar, vai para /perfis
      router.push('/perfis')
    },
    [router],
  )

  const logout = useCallback(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem('hive_auth')
    }

    setIsAuthenticated(false)

    // ao deslogar, volta a janela pro tamanho da tela de login
    if (
      typeof window !== 'undefined' &&
      (window as any).electronAPI?.windowControls?.setSize
    ) {
      (window as any).electronAPI.windowControls.setSize(
        464,
        628,
        464,
        628
      )
    }

    router.push('/login')
  }, [router])

  const value: AuthContextValue = {
    isAuthenticated,
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}