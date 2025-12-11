
// desktop-app\src\app\(app)\perfis\page.tsx
'use client'

import { useState } from 'react'
import Image from 'next/image'
import { IconSquareButton } from '@/components/ui/IconSquareButton'
import { useProfiles } from '@/lib/hooks/useProfiles'
import { useUserLimits } from '@/lib/hooks/usePlans'
import { useAuth } from '@/contexts/AuthContext'


export default function PerfisPage() {

  const { user } = useAuth()
  const { profiles, loading, error, refresh, deleteProfile, duplicateProfile } = useProfiles()
  const { limits } = useUserLimits()
  const [search, setSearch] = useState('')

  const filteredProfiles = profiles.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  )

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return '-'
    const date = new Date(dateStr)
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })
  }

  return (
    <div className="flex h-full flex-col">
      {/* HEADER */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-[20px] leading-[24px] font-semibold tracking-[-0.03em] text-[#101828]">
            Bem vindo, {user?.name?.split(' ')[0] || 'Usuário'}
          </h1>

          <p className="mt-1 text-[16px] leading-[24px] tracking-[0.01em] text-[#475467]">
            Controle e gerencie sobre seus perfis e proxies ativos.
          </p>
        </div>

        {/* AÇÕES HEADER DIREITA */}
        <div className="flex items-center gap-3">
          {/* Botão refresh */}
          <button
            type="button"

            onClick={refresh}
            disabled={loading}
            className="flex h-10 items-center justify-center rounded-lg border border-[#D0D5DD] bg-white px-4 hover:bg-[#F9FAFB] disabled:opacity-50"
          >
            <Image
              src="/icons/icon-refresh.svg"
              alt="Atualizar"
              width={17}
              height={15}
              className={`shrink-0 ${loading ? 'animate-spin' : ''}`}
            />
          </button>

          {/* Botão primário: Novo Perfil */}
          <button
            type="button"
            className="flex h-10 items-center gap-2 rounded-lg bg-[#2D2D2D] px-4 text-[14px] font-semibold leading-[20px] text-[#F2F2F2] hover:bg-[#111111]"
          >
            <Image
              src="/icons/icon-plus.svg"
              alt="Novo perfil"
              width={12}
              height={12}
              className="shrink-0"
            />
            <span>Novo Perfil</span>
          </button>
        </div>
      </div>

      {/* CARDS DE MÉTRICA */}
      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
        <div className="flex flex-col rounded-2xl border border-[#f0f0f0] bg-[#f7f7f9] px-5 py-4">
          <span className="text-[12px] leading-[12px] font-semibold tracking-[-0.01em] text-[#888888]">
            Perfis ativos
          </span>
          <div className="mt-3 flex items-baseline gap-1">
            <span className="text-[18px] leading-[22px] font-semibold tracking-[-0.01em] text-[#181818]">
              {limits?.currentProfiles ?? profiles.length}
            </span>
            <span className="text-[18px] leading-[22px] font-semibold tracking-[-0.01em] text-[#181818]">
              /{limits?.maxProfiles ?? '∞'}
            </span>
          </div>
        </div>
        <div className="flex flex-col rounded-2xl border border-[#f0f0f0] bg-[#f7f7f9] px-5 py-4">
          <span className="text-[12px] leading-[12px] font-semibold tracking-[-0.01em] text-[#888888]">
            Automações
          </span>
          <div className="mt-3 flex items-baseline gap-1">
            <span className="text-[18px] leading-[22px] font-semibold tracking-[-0.01em] text-[#181818]">
              0
            </span>
            <span className="text-[18px] leading-[22px] font-semibold tracking-[-0.01em] text-[#181818]">
              /{limits?.maxAutomations ?? '∞'}
            </span>
          </div>
        </div>
        <div className="flex flex-col rounded-2xl border border-[#f0f0f0] bg-[#f7f7f9] px-5 py-4">
          <span className="text-[12px] leading-[12px] font-semibold tracking-[-0.01em] text-[#888888]">
            Dispositivos
          </span>
          <div className="mt-3 flex items-baseline gap-1">
            <span className="text-[18px] leading-[22px] font-semibold tracking-[-0.01em] text-[#181818]">
              1
            </span>
            <span className="text-[18px] leading-[22px] font-semibold tracking-[-0.01em] text-[#181818]">
              /{limits?.maxDevices ?? '∞'}
            </span>
          </div>
        </div>
        <div className="flex flex-col rounded-2xl border border-[#f0f0f0] bg-[#f7f7f9] px-5 py-4">
          <span className="text-[12px] leading-[12px] font-semibold tracking-[-0.01em] text-[#888888]">
            Plano atual
          </span>
          <div className="mt-3 flex items-baseline gap-1">
            <span className="text-[18px] leading-[22px] font-semibold tracking-[-0.01em] text-[#181818]">
              {user?.plan?.name ?? 'Free'}
            </span>
          </div>
        </div>
      </div>

      {/* TOOLBAR LISTA */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex min-w-[260px] flex-1 items-center gap-3">
          {/* INPUT BUSCA */}
          <div className="flex h-10 flex-1 items-center gap-2 rounded-lg border border-[#D0D5DD] bg-white pl-[14px] pr-[10px]">
            <Image
              src="/icons/icon-search.svg"
              alt="Buscar"
              width={15}
              height={15}
              className="shrink-0"
            />

            <input
              placeholder="Pesquisar Perfil"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 border-none bg-transparent text-[14px] font-medium leading-[20px] text-[#667085] outline-none placeholder:text-[#667085]"
            />
          </div>

          {/* Botão Filtros */}
          <button
            type="button"
            className="flex h-10 items-center gap-2 rounded-lg border border-[#D0D5DD] bg-white px-4 text-[14px] font-medium leading-[20px] text-[#344054] hover:bg-[#F9FAFB]"
          >
            <Image
              src="/icons/icon-filter.svg"
              alt="Filtros"
              width={16}
              height={16}
              className="shrink-0"
            />
            <span>Filtros</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          {/* Botão ABRIR */}
          <button
            type="button"
            className="flex h-9 items-center gap-2 rounded-md border border-[#D0D5DD] bg-white px-3 text-[14px] font-semibold leading-[20px] text-[#344054] hover:bg-[#F9FAFB]"
          >
            <Image
              src="/icons/icon-play.svg"
              alt="Abrir"
              width={9}
              height={11}
              className="shrink-0"
            />
            <span>Abrir</span>
          </button>

          <IconSquareButton icon="/icons/icon-stop.svg" alt="Parar" />
          <IconSquareButton icon="/icons/icon-upload.svg" alt="Upload" />
          <IconSquareButton icon="/icons/icon-download.svg" alt="Download" />
          <IconSquareButton icon="/icons/icon-trash.svg" alt="Excluir" />
        </div>
      </div>

      {/* TABELA */}
      <div className="mt-4 flex-1 overflow-hidden rounded-2xl border border-slate-100 bg-white">
        <div className="max-h-full overflow-auto">
          <table className="w-full min-w-[800px] border-collapse text-sm">
            <thead>
              <tr className="bg-slate-50 text-xs text-slate-500">
                <th className="w-10 px-4 py-3 text-left">
                  <input type="checkbox" className="h-4 w-4" />
                </th>
                <th className="px-4 py-3 text-left">Perfil</th>
                <th className="px-4 py-3 text-left">Grupo</th>
                <th className="px-4 py-3 text-left">Conta</th>
                <th className="px-4 py-3 text-left">Browser</th>
                <th className="px-4 py-3 text-left">S.O.</th>
                <th className="px-4 py-3 text-left">IP</th>
                <th className="px-4 py-3 text-left">Último acesso</th>
                <th className="px-4 py-3 text-right">Ações</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={9} className="px-4 py-8 text-center text-slate-500">
                    Carregando perfis...
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan={9} className="px-4 py-8 text-center text-red-500">
                    {error}
                  </td>
                </tr>
              ) : filteredProfiles.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-4 py-8 text-center text-slate-500">
                    Nenhum perfil encontrado
                  </td>
                </tr>
              ) : (
                filteredProfiles.map((profile) => (
                  <tr
                    key={profile.id}
                    className="border-t border-slate-100 hover:bg-slate-50/70"
                  >
                    <td className="px-4 py-3">
                      <input type="checkbox" className="h-4 w-4" />
                    </td>
                    <td className="px-4 py-3 align-top">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-slate-800">
                          {profile.name}
                        </span>
                        <span className="text-[11px] text-slate-400">
                          ID {profile.id.slice(0, 8)}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 align-top text-sm text-slate-600">
                      {profile.tags?.join(', ') || '-'}
                    </td>
                    <td className="px-4 py-3 align-top">
                      <span className="text-lg">📘</span>
                    </td>
                    <td className="px-4 py-3 align-top">
                      <span className="text-lg">🌐</span>
                    </td>
                    <td className="px-4 py-3 align-top text-sm text-slate-600">
                      {profile.fingerprint?.timezone || '-'}
                    </td>
                    <td className="px-4 py-3 align-top text-sm text-slate-600">
                      {profile.proxy || '-'}
                    </td>
                    <td className="px-4 py-3 align-top text-sm text-slate-600">
                      {formatDate(profile.lastActivity)}
                    </td>
                    <td className="px-4 py-3 align-top text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          className={`rounded-xl px-3 py-1 text-xs font-medium ${profile.status === 'running'
                            ? 'bg-red-50 text-red-500'
                            : 'bg-slate-900 text-white'
                            }`}
                        >
                          {profile.status === 'running' ? 'Fechar' : 'Abrir'}
                        </button>
                        <button
                          type="button"
                          onClick={() => duplicateProfile(profile.id)}
                          className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                          title="Duplicar"
                        >
                          📋
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            if (confirm('Tem certeza que deseja excluir este perfil?')) {
                              deleteProfile(profile.id)
                            }
                          }}
                          className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-red-500"
                          title="Excluir"
                        >
                          🗑
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Paginação */}
        <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50 px-4 py-3 text-xs text-slate-500">
          <span>{filteredProfiles.length} perfil(is) encontrado(s)</span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-40"
              disabled
            >
              Anterior
            </button>
            <button
              type="button"
              className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50"
            >
              Próximo
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}