
// src/lib/services/wallet.service.ts
import { api } from '../api'

export interface Wallet {
  id: string
  balance: number
  createdAt: string
}

export interface WalletBalance {
  balance: number
}

export interface Transaction {
  id: string
  type: 'credit' | 'purchase' | 'debit'
  amount: number
  description: string
  referenceId?: string
  createdAt: string
}

export const walletService = {
  async getWallet(): Promise<Wallet> {
    return api.get<Wallet>('/wallet')
  },

  async getBalance(): Promise<WalletBalance> {
    return api.get<WalletBalance>('/wallet/balance')
  },

  async getTransactions(limit = 50): Promise<Transaction[]> {
    return api.get<Transaction[]>(`/wallet/transactions?limit=${limit}`)
  },

  async addCredits(amount: number, description: string): Promise<void> {
    return api.post('/wallet/add-credits', { amount, description })
  },
}