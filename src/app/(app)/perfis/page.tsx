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
    <div className="h-full w-full bg-[#F1F2F4] p-4">
      <div className="flex h-full flex-col rounded-[32px] border border-[#E4E6EB] bg-white px-8 py-7 shadow-[0px_22px_70px_rgba(0,0,0,0.06)]">
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
        </div>

        {/* CARDS DE MÉTRICA */}
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
          <div className="flex flex-col rounded-2xl border border-[#E7E9EF] bg-white px-5 py-4 shadow-[0px_12px_30px_rgba(16,24,40,0.04)]">
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

          <div className="flex flex-col rounded-2xl border border-[#E7E9EF] bg-white px-5 py-4 shadow-[0px_12px_30px_rgba(16,24,40,0.04)]">
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

          <div className="flex flex-col rounded-2xl border border-[#E7E9EF] bg-white px-5 py-4 shadow-[0px_12px_30px_rgba(16,24,40,0.04)]">
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

          <div className="flex flex-col rounded-2xl border border-[#E7E9EF] bg-white px-5 py-4 shadow-[0px_12px_30px_rgba(16,24,40,0.04)]">
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

        {/* LISTA DE PERFIS */}
        <div className="mt-7 flex flex-1 flex-col overflow-hidden rounded-[26px] border border-[#E6E8EE] bg-white shadow-[0px_18px_50px_rgba(0,0,0,0.04)]">
          <div className="flex flex-col gap-4 bg-white px-7 py-6">
            <div className="flex items-center justify-between">
              <span className="text-[16px] font-semibold leading-[21px] text-[#1B2331]">Lista de perfis</span>

              <div className="flex items-center gap-2">
                <IconSquareButton icon="/icons/icon-stop.svg" alt="Parar" />
                <IconSquareButton icon="/icons/icon-upload.svg" alt="Upload" />
                <IconSquareButton icon="/icons/icon-download.svg" alt="Download" />
                <IconSquareButton icon="/icons/icon-trash.svg" alt="Excluir" />
              </div>
            </div>

            {/* TOOLBAR LISTA */}
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#E6E8EE] bg-white px-4 py-3">
            <div className="flex min-w-[260px] flex-1 items-center gap-3">
              {/* INPUT BUSCA */}
              <div className="flex h-11 flex-1 items-center gap-2 rounded-xl border border-[#E3E6EE] bg-white pl-[14px] pr-[12px]">
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
                  className="flex-1 border-none bg-transparent text-[14px] font-medium leading-[20px] text-[#4B5563] outline-none placeholder:text-[#99A1AE]"
                />
              </div>

              {/* Botão Filtros */}
              <button
                type="button"
                className="flex h-11 items-center gap-2 rounded-xl border border-[#E3E6EE] bg-white px-4 text-[14px] font-semibold leading-[20px] text-[#1F2937] transition hover:bg-[#F5F6FA]"
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
                className="flex h-10 items-center gap-2 rounded-lg bg-[#111827] px-3 text-[14px] font-semibold leading-[20px] text-white shadow-[0px_8px_18px_rgba(17,24,39,0.12)] transition hover:bg-black"
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

          <div className="flex items-center justify-between gap-3 px-1 text-[13px] font-medium text-[#4B5563]">
            <span className="text-[#6B7280]">Quantidade</span>
            <div className="flex h-8 items-center rounded-full border border-[#E4E7EC] bg-white px-3 shadow-[0px_4px_12px_rgba(16,24,40,0.03)]">
              <span className="text-[#111827]">50</span>
            </div>
          </div>
        </div>

        {/* TABELA */}
        <div className="flex-1 overflow-hidden">
          <div className="max-h-full overflow-auto px-7 py-5">
            <table className="w-full min-w-[800px] border-collapse text-sm">
              <thead>
                <tr className="bg-[#F4F6F9] text-[12px] font-semibold text-[#4C5461]">
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
              <tbody className="divide-y divide-[#ECEFF5]">
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
                      className="transition hover:bg-[#F7F9FC]"
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
          <div className="flex items-center justify-between gap-3 border-t border-[#E7E9EF] bg-[#F9FAFB] px-6 py-4 text-xs text-[#525D70]">
            <span className="text-[13px] font-medium text-[#4B5563]">Página 1 de 10</span>
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="flex h-9 w-20 items-center justify-center rounded-lg border border-[#E3E7EF] bg-white text-xs font-semibold text-[#1F2937] shadow-[0px_4px_12px_rgba(16,24,40,0.04)] disabled:opacity-40"
                disabled
              >
                Anterior
              </button>
              <button
                type="button"
                className="flex h-9 w-20 items-center justify-center rounded-lg border border-[#E3E7EF] bg-white text-xs font-semibold text-[#1F2937] shadow-[0px_4px_12px_rgba(16,24,40,0.04)]"
              >
                Próximo
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
