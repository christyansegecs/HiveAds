
// src/lib/hooks/useMarketplace.ts

'use client'

import { useState, useEffect, useCallback } from 'react'
import { marketplaceService, type Product, type ProductFilters, type Order } from '../services/marketplace.service'

export function useMarketplace(filters?: ProductFilters) {

  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await marketplaceService.getProducts(filters)
      setProducts(data)
    } catch (err: any) {
      setError(err.message || 'Erro ao carregar produtos')
    } finally {
      setLoading(false)
    }
  }, [filters])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  const purchaseProduct = async (productId: string): Promise<Order> => {
    return marketplaceService.purchaseProduct(productId)
  }

  return {
    products,
    loading,
    error,
    refresh: fetchProducts,
    purchaseProduct,
  }
}

export function useMyOrders() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await marketplaceService.getMyOrders()
      setOrders(data)
    } catch (err: any) {
      setError(err.message || 'Erro ao carregar pedidos')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchOrders()
  }, [fetchOrders])

  return { orders, loading, error, refresh: fetchOrders }
}