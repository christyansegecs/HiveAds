
// src/lib/services/users.service.ts
import { api } from '../api'

export interface User {
  id: string
  email: string
  name: string
  plan?: {
    id: string
    name: string
    maxProfiles: number
  }
  createdAt?: string
}

export interface UserLog {
  id: string
  userId: string
  action: string
  ip?: string
  userAgent?: string
  createdAt: string
}

export interface UpdateUserData {
  name?: string
  email?: string
}

export const usersService = {
  async getAll(): Promise<User[]> {
    return api.get<User[]>('/users')
  },

  async getById(id: string): Promise<User> {
    return api.get<User>(`/users/${id}`)
  },

  async getLogs(id: string): Promise<UserLog[]> {
    return api.get<UserLog[]>(`/users/${id}/logs`)
  },

  async update(id: string, data: UpdateUserData): Promise<User> {
    return api.patch<User>(`/users/${id}`, data)
  },

  async delete(id: string): Promise<void> {
    return api.delete(`/users/${id}`)
  },
}