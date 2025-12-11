
// src/lib/services/config.service.ts
import { api } from '../api'

export interface Config {
  key: string
  value: unknown
}

export const configService = {
  async getAll(): Promise<Config[]> {
    return api.get<Config[]>('/config')
  },

  async get(key: string): Promise<Config> {
    return api.get<Config>(`/config/${key}`)
  },

  async set(key: string, value: unknown): Promise<Config> {
    return api.post<Config>(`/config/${key}`, { value })
  },

  async delete(key: string): Promise<void> {
    return api.delete(`/config/${key}`)
  },
}