
// src/lib/services/marketplace.service.ts
import { api } from '../api'

export interface ProductSeller {
  id: string
  name: string
}

export interface Product {
  id: string
  name: string
  description: string
  price: number
  type: 'script' | 'extension' | 'service'
  category: string
  imageUrl?: string
  downloadUrl?: string
  seller: ProductSeller
}

export interface CreateProductData {
  name: string
  description: string
  price: number
  type: Product['type']
  category: string
  imageUrl?: string
  downloadUrl?: string
}

export interface Order {
  id: string
  productId: string
  amount: number
  status: 'pending' | 'completed' | 'cancelled'
  createdAt: string
  product?: Product
}

export interface ProductFilters {
  type?: string
  category?: string
  sellerId?: string
}

export const marketplaceService = {
  async getProducts(filters?: ProductFilters): Promise<Product[]> {
    const params = new URLSearchParams()
    if (filters?.type) params.append('type', filters.type)
    if (filters?.category) params.append('category', filters.category)
    if (filters?.sellerId) params.append('sellerId', filters.sellerId)
    
    const query = params.toString()
    return api.get<Product[]>(`/marketplace/products${query ? `?${query}` : ''}`)
  },

  async getMyProducts(): Promise<Product[]> {
    return api.get<Product[]>('/marketplace/products/mine')
  },

  async getProductById(id: string): Promise<Product> {
    return api.get<Product>(`/marketplace/products/${id}`)
  },

  async createProduct(data: CreateProductData): Promise<Product> {
    return api.post<Product>('/marketplace/products', data)
  },

  async updateProduct(id: string, data: Partial<CreateProductData>): Promise<Product> {
    return api.patch<Product>(`/marketplace/products/${id}`, data)
  },

  async deleteProduct(id: string): Promise<void> {
    return api.delete(`/marketplace/products/${id}`)
  },

  // Pedidos
  async purchaseProduct(productId: string): Promise<Order> {
    return api.post<Order>(`/marketplace/orders/${productId}`)
  },

  async getMyOrders(): Promise<Order[]> {
    return api.get<Order[]>('/marketplace/orders')
  },

  async getOrderById(id: string): Promise<Order> {
    return api.get<Order>(`/marketplace/orders/${id}`)
  },

  async getMySales(): Promise<Order[]> {
    return api.get<Order[]>('/marketplace/sales')
  },
}