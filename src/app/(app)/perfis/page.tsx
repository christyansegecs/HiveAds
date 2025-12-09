
// desktop-app\src\app\(app)\perfis\page.tsx
'use client'

import Image from 'next/image'
import { IconSquareButton } from '@/components/ui/IconSquareButton'

const profiles = [
  {
    id: '4921',
    name: 'Facebook Farm - 04',
    group: 'Contingência',
    account: 'facebook',
    browser: 'chrome',
    os: 'Windows',
    ip: '191.242.10.55',
    lastAccess: '18/11 16:34',
    status: 'fechar',
  },
  {
    id: '4921',
    name: 'Google Ads - Search US',
    group: 'Scale - Black Friday',
    account: 'facebook',
    browser: 'edge',
    os: 'macOS',
    ip: '104.22.15.99',
    lastAccess: '18/11 16:35',
    status: 'abrir',
  },
  {
    id: '4921',
    name: 'Facebook Farm - 04',
    group: 'Contingência - Nutra',
    account: 'google',
    browser: 'chrome',
    os: 'Windows',
    ip: '10.0.0.1',
    lastAccess: '10/09 12:18',
    status: 'abrir',
  },
  {
    id: '4921',
    name: 'Facebook Farm - 04',
    group: 'Dropshipping Genérico',
    account: 'tiktok',
    browser: 'chrome',
    os: 'Windows',
    ip: '172.16.254.1',
    lastAccess: '12/09 14:57',
    status: 'abrir',
  },
]

export default function PerfisPage() {

  return (
    <div className="flex h-full flex-col">
      {/* HEADER */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-[20px] leading-[24px] font-semibold tracking-[-0.03em] text-[#101828]">
            Bem vindo, Felipe Y.
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
            className="flex h-10 items-center justify-center rounded-lg border border-[#D0D5DD] bg-white px-4 hover:bg-[#F9FAFB]"
          >
            <Image
              src="/icons/icon-refresh.svg"
              alt="Atualizar"
              width={17}
              height={15}
              className="shrink-0"
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
        {Array.from({ length: 4 }).map((_, idx) => (
          <div
            key={idx}
            className="flex flex-col rounded-2xl border border-[#f0f0f0] bg-[#f7f7f9] px-5 py-4"
          >
            <span className="text-[12px] leading-[12px] font-semibold tracking-[-0.01em] text-[#888888]">
              Perfis ativos
            </span>

            <div className="mt-3 flex items-baseline gap-1">
              <span className="text-[18px] leading-[22px] font-semibold tracking-[-0.01em] text-[#181818]">
                12
              </span>
              <span className="text-[18px] leading-[22px] font-semibold tracking-[-0.01em] text-[#181818]">
                /50
              </span>
            </div>
          </div>
        ))}
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
              {profiles.map((profile, idx) => (
                <tr
                  key={`${profile.id}-${idx}`}
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
                        ID {profile.id}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 align-top text-sm text-slate-600">
                    {profile.group}
                  </td>
                  <td className="px-4 py-3 align-top">
                    <span className="text-lg">
                      {profile.account === 'facebook' && '📘'}
                      {profile.account === 'google' && '🟦'}
                      {profile.account === 'tiktok' && '🎵'}
                    </span>
                  </td>
                  <td className="px-4 py-3 align-top">
                    <span className="text-lg">
                      {profile.browser === 'chrome' && '🌐'}
                      {profile.browser === 'edge' && '🌀'}
                    </span>
                  </td>
                  <td className="px-4 py-3 align-top text-sm text-slate-600">
                    {profile.os}
                  </td>
                  <td className="px-4 py-3 align-top text-sm text-slate-600">
                    {profile.ip}
                  </td>
                  <td className="px-4 py-3 align-top text-sm text-slate-600">
                    {profile.lastAccess}
                  </td>
                  <td className="px-4 py-3 align-top text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        className={`rounded-xl px-3 py-1 text-xs font-medium ${
                          profile.status === 'fechar'
                            ? 'bg-red-50 text-red-500'
                            : 'bg-slate-900 text-white'
                        }`}
                      >
                        {profile.status === 'fechar' ? 'Fechar' : 'Abrir'}
                      </button>
                      <button
                        type="button"
                        className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                      >
                        ✏️
                      </button>
                      <button
                        type="button"
                        className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-red-500"
                      >
                        🗑
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Paginação */}
        <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50 px-4 py-3 text-xs text-slate-500">
          <span>Página 1 de 10</span>
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