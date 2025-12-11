
// src/app/(app)/configuracoes/page.tsx
'use client'

import { useState, useEffect, useCallback } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { apiKeysService, type ApiKey, type CreateApiKeyData } from '@/lib/services/api-keys.service'
import { logsService, type Log } from '@/lib/services/logs.service'

export default function ConfiguracoesPage() {

  const { user, logout } = useAuth()
  const [tab, setTab] = useState<'geral' | 'api-keys' | 'logs'>('geral')
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([])
  const [logs, setLogs] = useState<Log[]>([])
  const [loading, setLoading] = useState(false)
  const [showCreateKey, setShowCreateKey] = useState(false)
  const [newKeyName, setNewKeyName] = useState('')

  const fetchApiKeys = useCallback(async () => {
    setLoading(true)
    try {
      const data = await apiKeysService.getAll()
      setApiKeys(data)
    } catch {
      // silently fail
    } finally {
      setLoading(false)
    }
  }, [])

  const fetchLogs = useCallback(async () => {
    setLoading(true)
    try {
      const data = await logsService.getMyLogs(50)
      setLogs(data)
    } catch {
      // silently fail
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (tab === 'api-keys') fetchApiKeys()
    if (tab === 'logs') fetchLogs()
  }, [tab, fetchApiKeys, fetchLogs])

  const handleCreateKey = async () => {
    if (!newKeyName.trim()) return
    try {
      const newKey = await apiKeysService.create({
        name: newKeyName,
        permissions: ['profiles:read', 'profiles:write'],
      })
      setApiKeys((prev) => [...prev, newKey])
      setNewKeyName('')
      setShowCreateKey(false)
      alert(`API Key criada: ${newKey.key}`)
    } catch (err: any) {
      alert(err.message || 'Erro ao criar API Key')
    }
  }

  const handleRevokeKey = async (id: string) => {
    if (!confirm('Revogar esta API Key?')) return
    try {
      await apiKeysService.revoke(id)
      setApiKeys((prev) => prev.map((k) => (k.id === id ? { ...k, isActive: false } : k)))
    } catch (err: any) {
      alert(err.message || 'Erro ao revogar')
    }
  }

  const handleDeleteKey = async (id: string) => {
    if (!confirm('Excluir esta API Key permanentemente?')) return
    try {
      await apiKeysService.delete(id)
      setApiKeys((prev) => prev.filter((k) => k.id !== id))
    } catch (err: any) {
      alert(err.message || 'Erro ao excluir')
    }
  }

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return '-'
    return new Date(dateStr).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }


  return (
    <div className="flex h-full flex-col">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-[20px] leading-[24px] font-semibold tracking-[-0.03em] text-[#101828]">
            Configurações
          </h1>
          <p className="mt-1 text-[16px] leading-[24px] tracking-[0.01em] text-[#475467]">
            Ajuste preferências gerais da aplicação e da sua conta.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-6 flex gap-2 border-b border-slate-200">
        {(['geral', 'api-keys', 'logs'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 text-sm font-medium ${tab === t
                ? 'border-b-2 border-slate-900 text-slate-900'
                : 'text-slate-500 hover:text-slate-700'
              }`}
          >
            {t === 'geral' ? 'Geral' : t === 'api-keys' ? 'API Keys' : 'Logs'}
          </button>
        ))}
      </div>

      {/* Conteúdo */}
      <div className="mt-6 flex-1 overflow-auto">
        {tab === 'geral' && (
          <div className="space-y-6">
            <div className="rounded-2xl border border-slate-100 bg-white p-6">
              <h3 className="text-sm font-semibold text-slate-800">Informações da conta</h3>
              <div className="mt-4 space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500">Nome</span>
                  <span className="text-slate-800">{user?.name || '-'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">E-mail</span>
                  <span className="text-slate-800">{user?.email || '-'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Plano</span>
                  <span className="text-slate-800">{user?.plan?.name || 'Free'}</span>
                </div>
              </div>
            </div>
            <button
              onClick={logout}
              className="rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white hover:bg-red-600"
            >
              Sair da conta
            </button>
          </div>
        )}

        {tab === 'api-keys' && (
          <div className="space-y-4">
            <div className="flex justify-between">
              <h3 className="text-sm font-semibold text-slate-800">Suas API Keys</h3>
              <button
                onClick={() => setShowCreateKey(true)}
                className="rounded-lg bg-[#2D2D2D] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#111111]"
              >
                + Nova Key
              </button>
            </div>

            {showCreateKey && (
              <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 p-3">
                <input
                  value={newKeyName}
                  onChange={(e) => setNewKeyName(e.target.value)}
                  placeholder="Nome da API Key"
                  className="flex-1 rounded border border-slate-200 px-3 py-1.5 text-sm"
                />
                <button
                  onClick={handleCreateKey}
                  className="rounded bg-green-500 px-3 py-1.5 text-xs font-semibold text-white"
                >
                  Criar
                </button>
                <button
                  onClick={() => setShowCreateKey(false)}
                  className="rounded bg-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700"
                >
                  Cancelar
                </button>
              </div>
            )}

            {loading ? (
              <div className="py-8 text-center text-slate-500">Carregando...</div>
            ) : apiKeys.length === 0 ? (
              <div className="py-8 text-center text-slate-500">Nenhuma API Key criada</div>
            ) : (
              <div className="space-y-2">
                {apiKeys.map((key) => (
                  <div
                    key={key.id}
                    className="flex items-center justify-between rounded-lg border border-slate-100 bg-white p-4"
                  >
                    <div>
                      <p className="text-sm font-medium text-slate-800">{key.name}</p>
                      <p className="mt-1 font-mono text-xs text-slate-500">{key.key}</p>
                      <p className="mt-1 text-[10px] text-slate-400">
                        Último uso: {formatDate(key.lastUsedAt)}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${key.isActive ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                          }`}
                      >
                        {key.isActive ? 'Ativa' : 'Revogada'}
                      </span>
                      {key.isActive && (
                        <button
                          onClick={() => handleRevokeKey(key.id)}
                          className="text-xs text-orange-500 hover:underline"
                        >
                          Revogar
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteKey(key.id)}
                        className="text-xs text-red-500 hover:underline"
                      >
                        Excluir
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {tab === 'logs' && (
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-slate-800">Histórico de atividades</h3>
            {loading ? (
              <div className="py-8 text-center text-slate-500">Carregando...</div>
            ) : logs.length === 0 ? (
              <div className="py-8 text-center text-slate-500">Nenhum log encontrado</div>
            ) : (
              <div className="space-y-2">
                {logs.map((log) => (
                  <div
                    key={log.id}
                    className="flex items-center justify-between rounded-lg border border-slate-100 bg-white p-3"
                  >
                    <div>
                      <p className="text-sm text-slate-800">{log.action}</p>
                      <p className="text-[10px] text-slate-400">
                        {log.resource} • {formatDate(log.createdAt)}
                      </p>
                    </div>
                    <span className="text-xs text-slate-500">{log.ip}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
