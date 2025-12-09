
// src/components/layout/AppWindow.tsx
'use client'

import type { ReactNode } from 'react'
import { Sidebar } from './Sidebar'

interface AppWindowProps {
  children: ReactNode
}

export function AppWindow({ children }: AppWindowProps) {

  return (
    <div
      className="
        flex
        h-full w-full
        overflow-hidden
        rounded-[18px]         /* corner radius 18 (igual Figma) */
        bg-white
        shadow-[0_18px_45px_rgba(15,23,42,0.12)]
      "
    >
      {/* Sidebar encostada no conteúdo */}
      <Sidebar />

      {/* Corpo principal da aplicação */}
      <main className="flex flex-1 flex-col bg-[#F7F8FA] px-10 pt-8 pb-6 overflow-hidden">
        {children}
      </main>
    </div>
  )
}
