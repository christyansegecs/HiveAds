
// src/lib/services/plans.service.ts
import { api } from '../api'

export interface Plan {
  id: string
  name: string
  maxProfiles: number
  maxAutomations: number
  maxDevices: number
}

export interface UserLimits {
  maxProfiles: number
  maxAutomations: number
  maxDevices: number
  currentProfiles: number
  canCreateProfile: boolean
}

export interface CreatePlanData {
  name: string
  maxProfiles: number
  maxAutomations: number
  maxDevices: number
}

export const plansService = {
  async getAll(): Promise<Plan[]> {
    return api.get<Plan[]>('/plans')
  },

  async getById(id: string): Promise<Plan> {
    return api.get<Plan>(`/plans/${id}`)
  },

  async create(data: CreatePlanData): Promise<Plan> {
    return api.post<Plan>('/plans', data)
  },

  async update(id: string, data: Partial<CreatePlanData>): Promise<Plan> {
    return api.patch<Plan>(`/plans/${id}`, data)
  },

  async delete(id: string): Promise<void> {
    return api.delete(`/plans/${id}`)
  },

  // Limites do usuário
  async getUserLimits(): Promise<UserLimits> {
    return api.get<UserLimits>('/plans/user/limits')
  },

  async upgrade(planId: string): Promise<void> {
    return api.post(`/plans/user/upgrade/${planId}`)
  },

  async downgrade(): Promise<void> {
    return api.post('/plans/user/downgrade')
  },
}