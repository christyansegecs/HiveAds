
// src/lib/api.ts
const API_BASE_URL = 'https://hiveads-hiveads-back.ji8osz.easypanel.host/api'

const ACCESS_TOKEN_KEY = 'hive_access_token'
const REFRESH_TOKEN_KEY = 'hive_refresh_token'
const KEEP_SIGNED_IN_KEY = 'hive_keep_signed_in'

type RequestOptions = {
  method?: 'GET' | 'POST' | 'PATCH' | 'DELETE'
  body?: unknown
  headers?: Record<string, string>
  skipAuth?: boolean
}

class ApiClient {
  private baseUrl: string

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  private getTokenStorage(preferPersist?: boolean): Storage | null {
    if (typeof window === 'undefined') return null

    const keepSignedIn = preferPersist ?? window.localStorage.getItem(KEEP_SIGNED_IN_KEY) === 'true'
    return keepSignedIn ? window.localStorage : window.sessionStorage
  }

  private getFallbackStorage(storage: Storage | null): Storage | null {
    if (typeof window === 'undefined' || !storage) return null
    return storage === window.localStorage ? window.sessionStorage : window.localStorage
  }

  getAccessToken(): string | null {
    if (typeof window === 'undefined') return null
    const storage = this.getTokenStorage()
    const fallbackStorage = this.getFallbackStorage(storage)
    return storage?.getItem(ACCESS_TOKEN_KEY) ?? fallbackStorage?.getItem(ACCESS_TOKEN_KEY) ?? null
  }

  getRefreshToken(): string | null {
    if (typeof window === 'undefined') return null
    const storage = this.getTokenStorage()
    const fallbackStorage = this.getFallbackStorage(storage)
    return storage?.getItem(REFRESH_TOKEN_KEY) ?? fallbackStorage?.getItem(REFRESH_TOKEN_KEY) ?? null
  }

  setTokens(accessToken: string, refreshToken: string, keepSignedIn?: boolean) {
    if (typeof window === 'undefined') return

    const storage = this.getTokenStorage(keepSignedIn)
    const fallbackStorage = this.getFallbackStorage(storage)

    if (keepSignedIn !== undefined) {
      window.localStorage.setItem(KEEP_SIGNED_IN_KEY, keepSignedIn ? 'true' : 'false')
    }

    storage?.setItem(ACCESS_TOKEN_KEY, accessToken)
    storage?.setItem(REFRESH_TOKEN_KEY, refreshToken)

    fallbackStorage?.removeItem(ACCESS_TOKEN_KEY)
    fallbackStorage?.removeItem(REFRESH_TOKEN_KEY)
  }

  clearTokens() {
    if (typeof window === 'undefined') return
    window.localStorage.removeItem(KEEP_SIGNED_IN_KEY)
    window.localStorage.removeItem(ACCESS_TOKEN_KEY)
    window.localStorage.removeItem(REFRESH_TOKEN_KEY)
    window.sessionStorage.removeItem(ACCESS_TOKEN_KEY)
    window.sessionStorage.removeItem(REFRESH_TOKEN_KEY)
  }

  private async refreshAccessToken(): Promise<string | null> {
    const refreshToken = this.getRefreshToken()
    if (!refreshToken) return null

    try {
      const res = await fetch(`${this.baseUrl}/auth/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken }),
      })

      if (!res.ok) {
        this.clearTokens()
        return null
      }

      const data = await res.json()
      this.setTokens(data.accessToken, data.refreshToken)
      return data.accessToken
    } catch {
      this.clearTokens()
      return null
    }
  }

  async request<T = unknown>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const { method = 'GET', body, headers = {}, skipAuth = false } = options

    const requestHeaders: Record<string, string> = {
      'Content-Type': 'application/json',
      ...headers,
    }

    if (!skipAuth) {
      const token = this.getAccessToken()
      if (token) {
        requestHeaders['Authorization'] = `Bearer ${token}`
      }
    }

    let res = await fetch(`${this.baseUrl}${endpoint}`, {
      method,
      headers: requestHeaders,
      body: body ? JSON.stringify(body) : undefined,
    })

    // Se der 401 ele tenta refresh e refaz a requisição
    if (res.status === 401 && !skipAuth) {
      const newToken = await this.refreshAccessToken()
      if (newToken) {
        requestHeaders['Authorization'] = `Bearer ${newToken}`
        res = await fetch(`${this.baseUrl}${endpoint}`, {
          method,
          headers: requestHeaders,
          body: body ? JSON.stringify(body) : undefined,
        })
      }
    }

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}))
      throw new ApiError(res.status, errorData.message || 'Erro na requisição', errorData)
    }

    // Algumas rotas podem retornar 204 No Content
    if (res.status === 204) {
      return {} as T
    }

    return res.json()
  }

  // Métodos de conveniência
  get<T = unknown>(endpoint: string, options?: Omit<RequestOptions, 'method' | 'body'>) {
    return this.request<T>(endpoint, { ...options, method: 'GET' })
  }

  post<T = unknown>(endpoint: string, body?: unknown, options?: Omit<RequestOptions, 'method' | 'body'>) {
    return this.request<T>(endpoint, { ...options, method: 'POST', body })
  }

  patch<T = unknown>(endpoint: string, body?: unknown, options?: Omit<RequestOptions, 'method' | 'body'>) {
    return this.request<T>(endpoint, { ...options, method: 'PATCH', body })
  }

  delete<T = unknown>(endpoint: string, options?: Omit<RequestOptions, 'method' | 'body'>) {
    return this.request<T>(endpoint, { ...options, method: 'DELETE' })
  }
}

export class ApiError extends Error {
  status: number
  data: unknown

  constructor(status: number, message: string, data?: unknown) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.data = data
  }
}

export const api = new ApiClient(API_BASE_URL)