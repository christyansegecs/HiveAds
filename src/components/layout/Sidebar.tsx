
// src/components/layout/Sidebar.tsx
'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'

const navItems = [
  {
    id: 'perfis',
    label: 'Perfis',
    href: '/perfis',
    iconSrc: '/icons/sidebar-perfis.svg',
    iconActiveSrc: '/icons/sidebar-perfis-active.svg',
  },
  {
    id: 'proxies',
    label: 'Proxies',
    href: '/proxies',
    iconSrc: '/icons/sidebar-proxies.svg',
    iconActiveSrc: '/icons/sidebar-proxies-active.svg',
  },
  {
    id: 'extensoes',
    label: 'Extensões',
    href: '/extensoes',
    iconSrc: '/icons/sidebar-extensoes.svg',
    iconActiveSrc: '/icons/sidebar-extensoes-active.svg',
  },
  {
    id: 'automacao',
    label: 'Automação',
    href: '/automacao',
    iconSrc: '/icons/sidebar-automacao.svg',
    iconActiveSrc: '/icons/sidebar-automacao-active.svg',
  },
  {
    id: 'carteira',
    label: 'Carteira',
    href: '/carteira',
    iconSrc: '/icons/sidebar-carteira.svg',
    iconActiveSrc: '/icons/sidebar-carteira-active.svg',
  },
  {
    id: 'marketplace',
    label: 'MarketPlace',
    href: '/marketplace',
    iconSrc: '/icons/sidebar-marketplace.svg',
    iconActiveSrc: '/icons/sidebar-marketplace-active.svg',
  },
  {
    id: 'lixeira',
    label: 'Lixeira',
    href: '/lixeira',
    iconSrc: '/icons/sidebar-lixeira.svg',
    iconActiveSrc: '/icons/sidebar-lixeira-active.svg',
  },
  {
    id: 'config',
    label: 'Configurações',
    href: '/configuracoes',
    iconSrc: '/icons/sidebar-config.svg',
    iconActiveSrc: '/icons/sidebar-config-active.svg',
  },
]

export function Sidebar() {

  const pathname = usePathname()

  const isElectron =
    typeof window !== 'undefined' && (window as any).electronAPI

  const handleClose = () => {
    if (!isElectron) return
    (window as any).electronAPI?.windowControls?.close()
  }

  const handleMinimize = () => {
    if (!isElectron) return
    (window as any).electronAPI?.windowControls?.minimize()
  }

  const handleToggleMaximize = () => {
    if (!isElectron) return
    (window as any).electronAPI?.windowControls?.toggleMaximize()
  }

  return (
    <aside
      className="
        drag-region
        flex w-[82px] flex-col items-center justify-between
        bg-gradient-to-b from-[#F4F4F4] to-[#E8E3D9]
        px-3 pt-5 pb-6
      "
    >
      {/* Topo: semáforo + logo + ícones */}
      <div className="flex flex-col items-center gap-4">
        {/* Botões de janela (no-drag para permitir clique) */}
        <div className="no-drag flex items-center gap-1.5 self-start rounded-full px-2 py-1">
          <button
            type="button"
            onClick={handleClose}
            className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]"
            aria-label="Fechar janela"
          />
          <button
            type="button"
            onClick={handleMinimize}
            className="h-2.5 w-2.5 rounded-full bg-[#febc2e]"
            aria-label="Minimizar janela"
          />
          <button
            type="button"
            onClick={handleToggleMaximize}
            className="h-2.5 w-2.5 rounded-full bg-[#28c840]"
            aria-label="Maximizar ou restaurar janela"
          />
        </div>

        {/* Logo em card branco */}
        <div className="no-drag flex h-14 w-14 items-center justify-center rounded-2xl">
          <Image
            src="/logo-hive.svg"
            alt="Hive Logo"
            width={40}
            height={40}
            className="rounded-xl"
            priority
          />
        </div>

        {/* Navegação vertical */}
        <nav className="mt-4 flex flex-col items-center gap-3">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            const iconSrc = isActive ? item.iconActiveSrc : item.iconSrc;

            return (
              <Link
                key={item.id}
                href={item.href}
                className="no-drag"
                title={item.label}
              >
                <div
                  className={clsx(
                    'group flex h-11 w-11 items-center justify-center rounded-2xl transition',
                    isActive
                      ? 'bg-white shadow-[0_6px_18px_rgba(15,23,42,0.16)]'
                      : 'bg-transparent hover:bg-white/80 hover:shadow-[0_4px_14px_rgba(15,23,42,0.10)]'
                  )}
                >
                  <Image
                    src={iconSrc}
                    alt={item.label}
                    width={20}
                    height={20}
                    className={clsx(
                      'transition',
                      isActive
                        ? 'opacity-100'
                        : 'opacity-70 group-hover:opacity-100'
                    )}
                  />
                </div>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Avatar inferior */}
      <div className="no-drag flex items-center justify-center pb-1">
        <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-slate-200 bg-white">
          <span className="text-xs font-medium text-slate-600">FY</span>
        </div>
      </div>
    </aside>
  )
}