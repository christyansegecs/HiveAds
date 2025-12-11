
// src/lib/api.ts
const API_BASE_URL = 'https://hiveads-hiveads-back.ji8osz.easypanel.host/api'

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

  private getAccessToken(): string | null {
    if (typeof window === 'undefined') return null
    return localStorage.getItem('hive_access_token')
  }

  private getRefreshToken(): string | null {
    if (typeof window === 'undefined') return null
    return localStorage.getItem('hive_refresh_token')
  }

  setTokens(accessToken: string, refreshToken: string) {
    if (typeof window === 'undefined') return
    localStorage.setItem('hive_access_token', accessToken)
    localStorage.setItem('hive_refresh_token', refreshToken)
  }

  clearTokens() {
    if (typeof window === 'undefined') return
    localStorage.removeItem('hive_access_token')
    localStorage.removeItem('hive_refresh_token')
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