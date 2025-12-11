
// src/lib/hooks/useProfiles.ts
'use client'

import { useState, useEffect, useCallback } from 'react'
import { profilesService, type Profile, type CreateProfileData } from '../services/profiles.service'

export function useProfiles() {

  const [profiles, setProfiles] = useState<Profile[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchProfiles = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await profilesService.getAll()
      setProfiles(data)
    } catch (err: any) {
      setError(err.message || 'Erro ao carregar perfis')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchProfiles()
  }, [fetchProfiles])

  const createProfile = async (data: CreateProfileData) => {
    const newProfile = await profilesService.create(data)
    setProfiles((prev) => [...prev, newProfile])
    return newProfile
  }

  const updateProfile = async (id: string, data: Partial<CreateProfileData>) => {
    const updated = await profilesService.update(id, data)
    setProfiles((prev) => prev.map((p) => (p.id === id ? updated : p)))
    return updated
  }

  const deleteProfile = async (id: string) => {
    await profilesService.delete(id)
    setProfiles((prev) => prev.filter((p) => p.id !== id))
  }

  const duplicateProfile = async (id: string) => {
    const duplicated = await profilesService.duplicate(id)
    setProfiles((prev) => [...prev, duplicated])
    return duplicated
  }

  return {
    profiles,
    loading,
    error,
    refresh: fetchProfiles,
    createProfile,
    updateProfile,
    deleteProfile,
    duplicateProfile,
  }
}