// src/lib/services/profiles.service.ts
import { api } from '../api'

export interface Fingerprint {
  userAgent?: string
  timezone?: string
  screenWidth?: number
  screenHeight?: number
}

export interface Profile {
  id: string
  name: string
  status: 'idle' | 'running' | 'stopped'
  proxy?: string
  tags?: string[]
  lastActivity?: string
  fingerprint?: Fingerprint
}

export interface CreateProfileData {
  name: string
  proxy?: string
  tags?: string[]
  fingerprint?: Fingerprint
}

export interface UpdateProfileData extends Partial<CreateProfileData> {}

export interface ProfileSession {
  id: string
  profileId: string
  deviceId: string
  startedAt: string
  endedAt?: string
}

export interface ProfileEvent {
  id: string
  profileId: string
  type: string
  message: string
  createdAt: string
}

export const profilesService = {
  async getAll(): Promise<Profile[]> {
    return api.get<Profile[]>('/profiles')
  },

  async getById(id: string): Promise<Profile> {
    return api.get<Profile>(`/profiles/${id}`)
  },

  async create(data: CreateProfileData): Promise<Profile> {
    return api.post<Profile>('/profiles', data)
  },

  async update(id: string, data: UpdateProfileData): Promise<Profile> {
    return api.patch<Profile>(`/profiles/${id}`, data)
  },

  async updateStatus(id: string, status: Profile['status']): Promise<Profile> {
    return api.patch<Profile>(`/profiles/${id}/status`, { status })
  },

  async duplicate(id: string): Promise<Profile> {
    return api.post<Profile>(`/profiles/${id}/duplicate`)
  },

  async delete(id: string): Promise<void> {
    return api.delete(`/profiles/${id}`)
  },

  // Sessões
  async startSession(id: string, deviceId: string): Promise<ProfileSession> {
    return api.post<ProfileSession>(`/profiles/${id}/session/start`, { deviceId })
  },

  async endSession(id: string): Promise<void> {
    return api.post(`/profiles/${id}/session/end`)
  },

  async getSessions(id: string): Promise<ProfileSession[]> {
    return api.get<ProfileSession[]>(`/profiles/${id}/sessions`)
  },

  async getActiveSessions(): Promise<ProfileSession[]> {
    return api.get<ProfileSession[]>('/profiles/sessions/active')
  },

  // Eventos e logs
  async getEvents(id: string): Promise<ProfileEvent[]> {
    return api.get<ProfileEvent[]>(`/profiles/${id}/events`)
  },

  async reportCrash(id: string): Promise<void> {
    return api.post(`/profiles/${id}/crash`)
  },
}
