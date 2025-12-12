
// src/contexts/AuthContext.tsx
'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { authService, type User } from '@/lib/services/auth.service'
import { api } from '@/lib/api'

interface AuthContextValue {
  isAuthenticated: boolean
  user: User | null
  loading: boolean
  login: (email: string, password: string, keepSignedIn: boolean) => Promise<void>
  register: (email: string, password: string, name: string) => Promise<void>
  logout: () => Promise<void>
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {

  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  // Verifica autenticação ao carregar
  useEffect(() => {
    const checkAuth = async () => {
      if (typeof window === 'undefined') return

      const token = api.getAccessToken()
      if (!token) {
        setLoading(false)
        return
      }

      try {
        const userData = await authService.getMe()
        setUser(userData)
        setIsAuthenticated(true)
      } catch {
        api.clearTokens()
        setIsAuthenticated(false)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  const refreshUser = useCallback(async () => {
    try {
      const userData = await authService.getMe()
      setUser(userData)
    } catch {
      // Silently fail
    }
  }, [])

  const login = useCallback(
    async (email: string, password: string, keepSignedIn: boolean) => {
      if (!email || !password) {
        throw new Error('Informe e-mail e senha')
      }

      await authService.login({ email, password }, keepSignedIn)
      const userData = await authService.getMe()

      setUser(userData)
      setIsAuthenticated(true)

      // Depois de logar, pede pro Electron aumentar a janela
      if (
        typeof window !== 'undefined' &&
        (window as any).electronAPI?.windowControls?.setSize
      ) {
        (window as any).electronAPI.windowControls.setSize(1200, 800, 1024, 600)
      }

      router.push('/perfis')
    },
    [router],
  )

  const register = useCallback(
    async (email: string, password: string, name: string) => {
      if (!email || !password || !name) {
        throw new Error('Preencha todos os campos')
      }
      await authService.register({ email, password, name })
      const userData = await authService.getMe()

      setUser(userData)

      setIsAuthenticated(true)

      if (
        typeof window !== 'undefined' &&
        (window as any).electronAPI?.windowControls?.setSize
      ) {
        (window as any).electronAPI.windowControls.setSize(1200, 800, 1024, 600)
      }

      router.push('/perfis')
    },
    [router],
  )

  const logout = useCallback(async () => {
    const refreshToken = api.getRefreshToken()

    try {
      if (refreshToken) {
        await authService.logout(refreshToken)
      }
    } catch {
      // Continua mesmo se falhar
    }
    api.clearTokens()
    setIsAuthenticated(false)
    setUser(null)

    // Ao deslogar, volta a janela pro tamanho da tela de login
    if (
      typeof window !== 'undefined' &&
      (window as any).electronAPI?.windowControls?.setSize
    ) {
      (window as any).electronAPI.windowControls.setSize(464, 628, 464, 628)
    }

    router.push('/login')
  }, [router])

  const value: AuthContextValue = {
    isAuthenticated,
    user,
    loading,
    login,
    register,
    logout,
    refreshUser,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}