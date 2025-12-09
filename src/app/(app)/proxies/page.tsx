
// src/app/(app)/proxies/page.tsx

export default function ProxiesPage() {
    
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-[20px] leading-[24px] font-semibold tracking-[-0.03em] text-[#101828]">
            Proxies
          </h1>
          <p className="mt-1 text-[16px] leading-[24px] tracking-[0.01em] text-[#475467]">
            Área para controle e gerenciamento dos seus proxies.
          </p>
        </div>
      </div>

      <div className="mt-6 flex flex-1 items-center justify-center">
        <div className="flex max-w-md flex-col items-center gap-3 rounded-2xl border border-dashed border-slate-200 bg-white/70 px-8 py-10 text-center">
          <span className="text-sm font-semibold text-slate-700">
            Tela de Proxies em construção
          </span>
          <p className="text-xs text-slate-500">
            Endpoint: <code className="font-mono text-[11px]">/proxies</code>
          </p>
        </div>
      </div>
    </div>
  )
}
