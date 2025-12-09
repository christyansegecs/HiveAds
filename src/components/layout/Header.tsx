
// desktop-app\src\components\layout\Header.tsx
'use client'

import { useEffect, useState } from 'react'
import { getAppVersion, pingElectron } from '@/lib/ipc'

export function Header() {

  const [version, setVersion] = useState<string | null>(null)
  const [pingResult, setPingResult] = useState<string | null>(null)

  useEffect(() => {
    getAppVersion().then((v) => v && setVersion(v))
    pingElectron().then((res) => res && setPingResult(res))
  }, [])

  return (
    <header className="flex h-14 items-center justify-between border-b border-slate-800 bg-slate-900/70 px-4">
      <div className="flex items-center gap-2">
        <h1 className="text-sm font-semibold text-slate-100">
          Dashboard
        </h1>
        {pingResult && (
          <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs text-emerald-300">
            IPC: {pingResult}
          </span>
        )}
      </div>

      <div className="flex items-center gap-4 text-xs text-slate-400">
        {version && <span>App v{version}</span>}
        <span className="rounded-md bg-slate-800 px-2 py-1">
          Usuário: demo
        </span>
      </div>
    </header>
  )
}