
// src/lib/services/api-keys.service.ts
import { api } from '../api'

export interface ApiKey {
  id: string
  name: string
  key: string
  permissions: string[]
  lastUsedAt?: string
  expiresAt?: string
  isActive: boolean
}

export interface CreateApiKeyData {
  name: string
  permissions: string[]
  expiresAt?: string
}

export const apiKeysService = {
  async getAll(): Promise<ApiKey[]> {
    return api.get<ApiKey[]>('/api-keys')
  },

  async create(data: CreateApiKeyData): Promise<ApiKey> {
    return api.post<ApiKey>('/api-keys', data)
  },

  async revoke(id: string): Promise<void> {
    return api.post(`/api-keys/${id}/revoke`)
  },

  async regenerate(id: string): Promise<ApiKey> {
    return api.post<ApiKey>(`/api-keys/${id}/regenerate`)
  },

  async delete(id: string): Promise<void> {
    return api.delete(`/api-keys/${id}`)
  },
}