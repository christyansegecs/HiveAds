
// src/lib/hooks/useWallet.ts
'use client'

import { useState, useEffect, useCallback } from 'react'
import { walletService, type Wallet, type Transaction } from '../services/wallet.service'

export function useWallet() {
  
  const [wallet, setWallet] = useState<Wallet | null>(null)
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchWallet = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const [walletData, transactionsData] = await Promise.all([
        walletService.getWallet(),
        walletService.getTransactions(),
      ])
      setWallet(walletData)
      setTransactions(transactionsData)
    } catch (err: any) {
      setError(err.message || 'Erro ao carregar carteira')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchWallet()
  }, [fetchWallet])

  return {
    wallet,
    transactions,
    balance: wallet?.balance ?? 0,
    loading,
    error,
    refresh: fetchWallet,
  }
}