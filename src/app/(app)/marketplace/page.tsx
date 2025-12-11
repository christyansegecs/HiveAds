
// src/app/(app)/marketplace/page.tsx
'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useMarketplace } from '@/lib/hooks/useMarketplace'

export default function MarketplacePage() {

  const [filter, setFilter] = useState<string>('')
  const { products, loading, error, refresh, purchaseProduct } = useMarketplace(
    filter ? { type: filter } : undefined
  )
  const [purchasing, setPurchasing] = useState<string | null>(null)

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value)
  }

  const handlePurchase = async (productId: string) => {
    if (!confirm('Confirma a compra deste produto?')) return

    setPurchasing(productId)
    try {
      await purchaseProduct(productId)
      alert('Compra realizada com sucesso!')
    } catch (err: any) {
      alert(err.message || 'Erro ao realizar compra')
    } finally {
      setPurchasing(null)
    }
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-[20px] leading-[24px] font-semibold tracking-[-0.03em] text-[#101828]">
            MarketPlace
          </h1>
          <p className="mt-1 text-[16px] leading-[24px] tracking-[0.01em] text-[#475467]">
            Descubra recursos, plugins e serviços para ampliar seus resultados.
          </p>
        </div>
        <button
          onClick={refresh}
          disabled={loading}
          className="flex h-10 items-center justify-center rounded-lg border border-[#D0D5DD] bg-white px-4 hover:bg-[#F9FAFB] disabled:opacity-50"
        >
          🔄
        </button>
      </div>

      {/* Filtros */}
      <div className="mt-6 flex items-center gap-3">
        <div className="flex h-10 flex-1 max-w-xs items-center gap-2 rounded-lg border border-[#D0D5DD] bg-white pl-[14px] pr-[10px]">
          <Image src="/icons/icon-search.svg" alt="Buscar" width={15} height={15} />
          <input
            placeholder="Buscar produto..."
            className="flex-1 border-none bg-transparent text-[14px] text-[#667085] outline-none placeholder:text-[#667085]"
          />
        </div>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="h-10 rounded-lg border border-[#D0D5DD] bg-white px-3 text-sm text-slate-600"
        >
          <option value="">Todos os tipos</option>
          <option value="script">Scripts</option>
          <option value="extension">Extensões</option>
          <option value="service">Serviços</option>
        </select>
      </div>

      {/* Grid de produtos */}
      <div className="mt-6 flex-1 overflow-auto">
        {loading ? (
          <div className="flex h-40 items-center justify-center text-slate-500">Carregando...</div>
        ) : error ? (
          <div className="flex h-40 items-center justify-center text-red-500">{error}</div>
        ) : products.length === 0 ? (
          <div className="flex h-40 items-center justify-center text-slate-500">
            Nenhum produto encontrado
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <div
                key={product.id}
                className="flex flex-col rounded-2xl border border-slate-100 bg-white p-4"
              >
                {product.imageUrl && (
                  <div className="mb-3 h-32 overflow-hidden rounded-lg bg-slate-100">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
                <h3 className="text-sm font-semibold text-slate-800">{product.name}</h3>
                <p className="mt-1 line-clamp-2 text-xs text-slate-500">{product.description}</p>
                <div className="mt-2 flex items-center gap-2">
                  <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-600">
                    {product.type}
                  </span>
                  <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-600">
                    {product.category}
                  </span>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-lg font-semibold text-slate-900">
                    {formatCurrency(product.price)}
                  </span>
                  <button
                    onClick={() => handlePurchase(product.id)}
                    disabled={purchasing === product.id}
                    className="rounded-lg bg-[#2D2D2D] px-4 py-2 text-xs font-semibold text-white hover:bg-[#111111] disabled:opacity-50"
                  >
                    {purchasing === product.id ? 'Comprando...' : 'Comprar'}
                  </button>
                </div>
                <p className="mt-2 text-[10px] text-slate-400">
                  Por: {product.seller.name}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
