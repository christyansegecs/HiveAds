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
          <h1 className="text-[22px] leading-[26px] font-semibold tracking-[-0.02em] text-[#1C2432]">
            Bem vindo, {user?.name?.split(' ')[0] || 'Usuário'}
          </h1>

          <p className="mt-1 text-[16px] leading-[24px] tracking-[0.01em] text-[#606A7B]">
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
            className="flex h-11 items-center justify-center rounded-xl border border-[#D8DDE6] bg-white px-4 text-[#1F2937] shadow-[0px_8px_20px_rgba(15,23,42,0.08)] transition hover:bg-[#F6F7FB] disabled:opacity-50"
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
            className="flex h-11 items-center gap-2 rounded-xl bg-[#1F2937] px-4 text-[14px] font-semibold leading-[20px] text-[#F2F2F2] shadow-[0px_8px_22px_rgba(17,24,39,0.2)] transition hover:bg-[#0F172A]"
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

      {/* CARDS DE MÉTRICA */}
      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
        <div className="flex flex-col rounded-xl border border-[#E6E9EF] bg-white px-5 py-4 shadow-[0px_12px_30px_rgba(16,24,40,0.04)]">
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
            <div className="mt-3 flex items-baseline gap-1">
              <span className="text-[18px] leading-[22px] font-semibold tracking-[-0.01em] text-[#181818]">
                {limits?.currentProfiles ?? profiles.length}
              </span>
              <span className="text-[18px] leading-[22px] font-semibold tracking-[-0.01em] text-[#181818]">
                /{limits?.maxProfiles ?? '∞'}
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col rounded-xl border border-[#E6E9EF] bg-white px-5 py-4 shadow-[0px_12px_30px_rgba(16,24,40,0.04)]">
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
            <div className="mt-3 flex items-baseline gap-1">
              <span className="text-[18px] leading-[22px] font-semibold tracking-[-0.01em] text-[#181818]">
                0
              </span>
              <span className="text-[18px] leading-[22px] font-semibold tracking-[-0.01em] text-[#181818]">
                /{limits?.maxAutomations ?? '∞'}
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col rounded-xl border border-[#E6E9EF] bg-white px-5 py-4 shadow-[0px_12px_30px_rgba(16,24,40,0.04)]">
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
            <div className="mt-3 flex items-baseline gap-1">
              <span className="text-[18px] leading-[22px] font-semibold tracking-[-0.01em] text-[#181818]">
                1
              </span>
              <span className="text-[18px] leading-[22px] font-semibold tracking-[-0.01em] text-[#181818]">
                /{limits?.maxDevices ?? '∞'}
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col rounded-xl border border-[#E6E9EF] bg-white px-5 py-4 shadow-[0px_12px_30px_rgba(16,24,40,0.04)]">
          <span className="text-[12px] leading-[12px] font-semibold tracking-[-0.01em] text-[#888888]">
            Plano atual
          </span>
          <div className="mt-3 flex items-baseline gap-1">
            <span className="text-[18px] leading-[22px] font-semibold tracking-[-0.01em] text-[#181818]">
              {user?.plan?.name ?? 'Free'}
            </span>
            <div className="mt-3 flex items-baseline gap-1">
              <span className="text-[18px] leading-[22px] font-semibold tracking-[-0.01em] text-[#181818]">
                {user?.plan?.name ?? 'Free'}
              </span>
            </div>
          </div>
        </div>

      {/* LISTA DE PERFIS */}
      <div className="mt-6 flex flex-1 flex-col overflow-hidden rounded-[26px] border border-[#EDEDED] bg-white shadow-[0px_20px_60px_rgba(0,0,0,0.04)]">
        {/* TOOLBAR LISTA */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#F3F4F6] bg-[#FBFBFC] px-6 py-5">
          <div className="flex min-w-[260px] flex-1 items-center gap-3">
            {/* INPUT BUSCA */}
            <div className="flex h-11 flex-1 items-center gap-2 rounded-xl border border-[#E7E9EE] bg-white pl-[14px] pr-[12px] shadow-[0px_2px_10px_rgba(16,24,40,0.03)]">
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
                className="flex-1 border-none bg-transparent text-[14px] font-medium leading-[20px] text-[#6F7785] outline-none placeholder:text-[#9AA1AE]"
              />
            </div>

            {/* Botão Filtros */}
            <button
              type="button"
              className="flex h-11 items-center gap-2 rounded-xl border border-[#E7E9EE] bg-white px-4 text-[14px] font-semibold leading-[20px] text-[#303742] transition hover:bg-[#F4F6F8]"
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
              className="flex h-10 items-center gap-2 rounded-lg border border-[#E7E9EE] bg-white px-3 text-[14px] font-semibold leading-[20px] text-[#303742] transition hover:bg-[#F4F6F8]"
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
        <div className="flex-1 overflow-hidden">
          <div className="max-h-full overflow-auto px-6 py-5">
            <table className="w-full min-w-[800px] border-collapse text-sm">
              <thead>
                <tr className="text-[12px] font-semibold text-[#6F7785]">
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
                    <td colSpan={9} className="px-4 py-8 text-center text-[#8A94A6]">
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
                    <td colSpan={9} className="px-4 py-8 text-center text-[#8A94A6]">
                      Nenhum perfil encontrado
                    </td>
                  </tr>
                ) : (
                  filteredProfiles.map((profile) => (
                    <tr
                      key={profile.id}
                      className="border-t border-[#F0F2F5] hover:bg-[#F8FAFC]"
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
                            className={`rounded-xl px-3 py-1 text-xs font-semibold shadow-[0px_2px_10px_rgba(16,24,40,0.06)] ${profile.status === 'running'
                              ? 'bg-[#FFF1F0] text-[#D92D20]'
                              : 'bg-[#111827] text-white'
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
          <div className="flex items-center justify-center gap-3 border-t border-[#F3F4F6] bg-[#FBFBFC] px-6 py-4 text-xs text-[#6F7785]">
            <button
              type="button"
              className="flex h-9 w-16 items-center justify-center rounded-lg border border-[#E7E9EE] bg-white text-xs font-semibold text-[#303742] shadow-[0px_2px_10px_rgba(16,24,40,0.03)] disabled:opacity-40"
              disabled
            >
              Anterior
            </button>
            <button
              type="button"
              className="flex h-9 w-16 items-center justify-center rounded-lg border border-[#E7E9EE] bg-white text-xs font-semibold text-[#303742] shadow-[0px_2px_10px_rgba(16,24,40,0.03)]"
            >
              Próximo
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
