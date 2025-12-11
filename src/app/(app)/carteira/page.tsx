// src/app/(app)/carteira/page.tsx
'use client'

import { useWallet } from '@/lib/hooks/useWallet'

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)
}

const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export default function CarteiraPage() {

  const { wallet, transactions, balance, loading, error, refresh } = useWallet()

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-[20px] leading-[24px] font-semibold tracking-[-0.03em] text-[#101828]">
            Carteira
          </h1>
          <p className="mt-1 text-[16px] leading-[24px] tracking-[0.01em] text-[#475467]">
            Visualize e acompanhe os saldos e transações da sua conta.
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

      {/* Saldo */}
      <div className="mt-6 rounded-2xl border border-[#f0f0f0] bg-[#f7f7f9] px-6 py-5">
        <span className="text-[12px] leading-[12px] font-semibold tracking-[-0.01em] text-[#888888]">
          Saldo disponível
        </span>
        <div className="mt-3">
          <span className="text-[28px] leading-[32px] font-semibold tracking-[-0.01em] text-[#181818]">
            {loading ? '...' : formatCurrency(balance)}
          </span>
        </div>
      </div>

      {/* Transações */}
      <div className="mt-6 flex-1 overflow-hidden rounded-2xl border border-slate-100 bg-white">
        <div className="border-b border-slate-100 px-4 py-3">
          <h2 className="text-sm font-semibold text-slate-700">
            Histórico de transações
          </h2>
        </div>
        <div className="max-h-[400px] overflow-auto">
          {loading ? (
            <div className="px-4 py-8 text-center text-slate-500">
              Carregando...
            </div>
          ) : error ? (
            <div className="px-4 py-8 text-center text-red-500">{error}</div>
          ) : transactions.length === 0 ? (
            <div className="px-4 py-8 text-center text-slate-500">
              Nenhuma transação encontrada
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 text-xs text-slate-500">
                  <th className="px-4 py-3 text-left">Data</th>
                  <th className="px-4 py-3 text-left">Descrição</th>
                  <th className="px-4 py-3 text-left">Tipo</th>
                  <th className="px-4 py-3 text-right">Valor</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx) => (
                  <tr key={tx.id} className="border-t border-slate-100">
                    <td className="px-4 py-3 text-slate-600">
                      {formatDate(tx.createdAt)}
                    </td>
                    <td className="px-4 py-3 text-slate-800">
                      {tx.description}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                          tx.type === 'credit'
                            ? 'bg-green-50 text-green-600'
                            : 'bg-red-50 text-red-600'
                        }`}
                      >
                        {tx.type === 'credit' ? 'Crédito' : 'Débito'}
                      </span>
                    </td>
                    <td
                      className={`px-4 py-3 text-right font-medium ${
                        tx.amount > 0
                          ? 'text-green-600'
                          : 'text-red-600'
                      }`}
                    >
                      {tx.amount > 0 ? '+' : ''}
                      {formatCurrency(tx.amount)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  )
}
