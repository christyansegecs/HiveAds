
// src/lib/services/logs.service.ts
import { api } from '../api'

export interface Log {
  id: string
  userId: string
  action: string
  resource?: string
  resourceId?: string
  details?: Record<string, unknown>
  ip?: string
  createdAt: string
}

export interface LogFilters {
  userId?: string
  action?: string
  resource?: string
  startDate?: string
  endDate?: string
  limit?: number
}

export interface LogStats {
  totalLogs: number
  byAction: Record<string, number>
  byResource: Record<string, number>
}

export const logsService = {
  async getMyLogs(limit = 50): Promise<Log[]> {
    return api.get<Log[]>(`/logs/mine?limit=${limit}`)
  },

  // Admin
  async getAll(filters?: LogFilters): Promise<Log[]> {
    const params = new URLSearchParams()
    if (filters?.userId) params.append('userId', filters.userId)
    if (filters?.action) params.append('action', filters.action)
    if (filters?.resource) params.append('resource', filters.resource)
    if (filters?.startDate) params.append('startDate', filters.startDate)
    if (filters?.endDate) params.append('endDate', filters.endDate)
    if (filters?.limit) params.append('limit', String(filters.limit))
    
    const query = params.toString()
    return api.get<Log[]>(`/logs${query ? `?${query}` : ''}`)
  },

  async exportCsv(): Promise<Blob> {
    const response = await fetch('https://hiveads-hiveads-back.ji8osz.easypanel.host/api/logs/export', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('hive_access_token')}`,
      },
    })
    return response.blob()
  },

  async getStats(days = 7): Promise<LogStats> {
    return api.get<LogStats>(`/logs/stats?days=${days}`)
  },
}