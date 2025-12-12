
// src/lib/services/auth.service.ts
import { api } from '../api'

export interface AuthResponse {
  accessToken: string
  refreshToken: string
  expiresIn: string
}

export interface User {
  id: string
  email: string
  name: string
  plan?: {
    id: string
    name: string
    maxProfiles: number
  }
}

export interface RegisterData {
  email: string
  password: string
  name: string
}

export interface LoginData {
  email: string
  password: string
}

export const authService = {
  async register(data: RegisterData, keepSignedIn = true): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/register', data, { skipAuth: true })
    api.setTokens(response.accessToken, response.refreshToken, keepSignedIn)
    return response
  },

  async login(data: LoginData, keepSignedIn = false): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/login', data, { skipAuth: true })
    api.setTokens(response.accessToken, response.refreshToken, keepSignedIn)
    return response
  },

  async logout(refreshToken: string): Promise<void> {
    await api.post('/auth/logout', { refreshToken })
    api.clearTokens()
  },

  async getMe(): Promise<User> {
    return api.get<User>('/auth/me')
  },

  async refresh(refreshToken: string): Promise<AuthResponse> {
    return api.post<AuthResponse>('/auth/refresh', { refreshToken }, { skipAuth: true })
  },
}