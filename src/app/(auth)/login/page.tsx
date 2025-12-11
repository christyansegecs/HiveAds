
// desktop-app\src\app\(auth)\login\page.tsx
'use client'

import { useState, useEffect } from 'react'
import { AppWindowLogin } from '@/components/layout/AppWindowLogin'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

const isElectron =
  typeof window !== 'undefined' &&
  !!(window as any).electronAPI?.windowControls

export default function LoginPage() {

  const { login } = useAuth()
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [keepSignedIn, setKeepSignedIn] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (typeof document === 'undefined') return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      await login(email, password)
    } catch (err: any) {
      setError(err.message ?? 'Erro ao entrar')
      setLoading(false)
    }
  }

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
    <AppWindowLogin>
      <div className="no-drag flex h-full flex-col items-center">
        <div
          className="
          flex
          h-1
          items-center
          gap-[7px]
          self-start
          rounded-full
        "
        >
          <button
            type="button"
            onClick={handleClose}
            className="h-[10px] w-[10px] rounded-full bg-[#ff5f57]"
            aria-label="Fechar janela"
          />
          <button
            type="button"
            onClick={handleMinimize}
            className="h-[10px] w-[10px] rounded-full bg-[#febc2e]"
            aria-label="Minimizar janela"
          />
          <button
            type="button"
            onClick={handleToggleMaximize}
            className="h-[10px] w-[10px] rounded-full bg-[#28c840]"
            aria-label="Maximizar ou restaurar janela"
          />
        </div>
        {/* Logo + título */}
        <div className="flex flex-col items-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl">
            <Image
              src="/logo-hive.svg"
              alt="Hive Logo"
              width={120}
              height={120}
              className="rounded-xl"
            />
          </div>

          <div className="text-center">
            <h1 className="text-[27px] tracking-tight leading-[26x] font-semibold text-slate-900">
              Acesse sua conta
            </h1>

            <p className="mt-1  text-[18px] leading-7 text-slate-600">
              Insira suas credenciais para gerenciar seus perfis.
            </p>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="mt-5 flex w-full flex-col gap-4 text-[14px] leading-[16px] text-slate-600"
        >
          {/* E-mail */}
          <div className="mt-2 mx-3 flex flex-col gap-1.5">
            <div className="flex h-12 items-center gap-3 rounded-lg border border-slate-200 bg-white px-4">
              <Image
                src="/icons/mail-01.svg"
                alt="Ícone de e-mail"
                width={18}
                height={18}
                className="shrink-0"
              />

              <input
                type="email"
                placeholder="Insira seu e-mail"
                className="
                  flex-1 border-0 bg-transparent
                  text-[16px] leading-[24px] text-slate-600
                  placeholder:text-slate-500
                  outline-none
                "
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* Senha */}
          <div className="mt-1 mx-3 flex flex-col gap-1.5">
            <div className="flex h-12 items-center gap-3 rounded-lg border border-slate-200 bg-white px-4">
              <Image
                src="/icons/lock-01.svg"
                alt="Ícone de senha"
                width={14}
                height={14}
                className="shrink-0"
              />

              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                className="
                  flex-1 border-0 bg-transparent
                  text-[16px] leading-[24px] text-slate-600
                  placeholder:text-slate-500
                  outline-none font-bold
                "
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="shrink-0 p-1"
                aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
              >
                <Image
                  src="/icons/eye-01.svg"
                  alt=""
                  width={16}
                  height={16}
                />
              </button>
            </div>
          </div>
          <div className="relative mx-3">
            {error && (
              <p
                className="
        absolute
        -top-2          /* sobe ~2px (ajusta se quiser mais/menos) */
        left-0
        text-[12px]
        leading-[16px]
        text-[#F04438]  /* vermelho mais “UI” */
      "
              >
                {error}
              </p>
            )}
          </div>

          {/* Linha: Manter conectado / Esqueci a senha */}
          <div className="flex items-center justify-between">
            <label
              htmlFor="keep-signed-in"
              className="inline-flex items-center mx-3 gap-2 text-[15px] font-[500] leading-[24px] text-slate-700"
            >
              <input
                id="keep-signed-in"
                type="checkbox"
                checked={keepSignedIn}
                onChange={(e) => setKeepSignedIn(e.target.checked)}
                className="peer sr-only"
              />

              <span
                className="inline-flex h-4 w-4 items-center justify-center
                  rounded-[4px] border border-[#D1D5DB] bg-white
                  peer-focus-visible:outline peer-focus-visible:outline-2
                  peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[#FFB21A]
                  peer-checked:border-[#FFB21A] peer-checked:bg-[#FFB21A]
                  transition-colors"
              >
                <svg
                  viewBox="0 0 16 16"
                  className="h-3 w-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity"
                  aria-hidden="true"
                >
                  <path
                    d="M12.8 4.3a.75.75 0 0 0-1.1-1L6.5 8.8 4.3 6.6a.75.75 0 0 0-1 1l2.75 2.75a.75.75 0 0 0 1.1 0l5.65-6.05z"
                    fill="currentColor"
                  />
                </svg>
              </span>

              <span>Manter conectado</span>
            </label>

            <button
              type="button"
              className="text-[15px] mx-3 leading-[24px] font-semibold text-[#FFA500] hover:text-[#E68F00]"
              onClick={() => {
                router.push('/recover-password')
              }}
            >
              Esqueci a senha
            </button>
          </div>

          {/* Botão principal */}
          <button
            type="submit"
            disabled={loading}
            className="
              mt-1
              mx-3
              h-13
              rounded-lg
              bg-[#111111]
              text-[17px] leading-[24px]
              font-semibold text-white
              hover:bg-black
              disabled:opacity-60
            "
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>

          {/* Divider "Ou entre com" */}
          <div className="mt-1 mb-2 flex items-center gap-3">
            <span className="h-px flex-1 bg-[#E5E7EB]" />
            <span className="text-[13px] leading-[14px] tracking-[0.02em] text-[#818898]">
              Ou entre com
            </span>
            <span className="h-px flex-1 bg-[#E5E7EB]" />
          </div>

          {/* Botões sociais */}
          <div className="flex gap-4">
            {/* Google */}
            <button
              type="button"
              className="
                flex-1
                flex items-center justify-center
                rounded-[10px]
                border border-[#D1D5DB]
                bg-white
                hover:bg-[#F9FAFB]
                transition-colors
                py-[12px]
              "
            >
              <Image
                src="/icons/google.svg" // ajuste o caminho se for diferente
                alt="Entrar com Google"
                width={24}
                height={24}
              />
            </button>

            {/* Apple */}
            <button
              type="button"
              className="
                flex-1
                flex items-center justify-center
                rounded-[10px]
                border border-[#D1D5DB]
                bg-white
                py-3
                hover:bg-[#F9FAFB]
                transition-colors
              "
            >
              <Image
                src="/icons/apple.svg"
                alt="Entrar com Apple"
                width={24}
                height={24}
              />
            </button>
          </div>

          {/* CTA inferior */}
          <div className="mt-1 text-center text-[15px] leading-[20px] text-[#475467]">
            <span>Ainda não possui uma conta? </span>
            <button
              type="button"
              className="font-semibold text-[15px] leading-[20px] text-[#FF9D1C] hover:underline"
              onClick={() => {
                router.push('/signup')
              }}
            >
              Crie agora mesmo
            </button>
          </div>
        </form>
      </div>
    </AppWindowLogin>
  )
}