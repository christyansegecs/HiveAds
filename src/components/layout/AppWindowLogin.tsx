
// src/components/layout/AppWindowLogin.tsx
'use client'

import type { ReactNode } from 'react'

interface AppWindowLoginProps {
  children: ReactNode
}

export function AppWindowLogin({ children }: AppWindowLoginProps) {
  return (
    <div className="flex h-full w-full items-center justify-center bg-transparent">
      {/* Frame externo = "Login" do Figma */}
      <div
        className="
          drag-region
          flex
          w-[464px]
          h-[628px]
          flex-col
          rounded-[24px]
          bg-[#FFFEF8D9] shadow-[0_12px_50px_0_rgba(0,0,0,0.4)]
          p-2
        "
        style={{ clipPath: 'inset(0 round 24px)' }}
      >
        {/* Overlay interno com radius 16px */}
        <div
          className="
            flex-1
            overflow-hidden
            rounded-[16px]
          "
          style={{
            // topo levemente quente, mas MUITO sutil
            backgroundImage:
              'linear-gradient(180deg, #FFFAF3 0%, #FFFFFF 45%)',
          }}
        >
          {/* Padding interno ~16px nas laterais e topo */}
          <div className="no-drag flex h-full flex-col px-4 pt-4 pb-8">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
