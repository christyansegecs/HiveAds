
// src/lib/hooks/usePlans.ts
'use client'

import { useState, useEffect, useCallback } from 'react'
import { plansService, type Plan, type UserLimits } from '../services/plans.service'

export function usePlans() {
  const [plans, setPlans] = useState<Plan[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchPlans = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await plansService.getAll()
      setPlans(data)
    } catch (err: any) {
      setError(err.message || 'Erro ao carregar planos')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchPlans()
  }, [fetchPlans])

  return { plans, loading, error, refresh: fetchPlans }
}

export function useUserLimits() {
  const [limits, setLimits] = useState<UserLimits | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchLimits = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await plansService.getUserLimits()
      setLimits(data)
    } catch (err: any) {
      setError(err.message || 'Erro ao carregar limites')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchLimits()
  }, [fetchLimits])

  const upgrade = async (planId: string) => {
    await plansService.upgrade(planId)
    await fetchLimits()
  }

  return { limits, loading, error, refresh: fetchLimits, upgrade }
}