// desktop-app/src/app/(auth)/recover-password/page.tsx
'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { AppWindowLogin } from '@/components/layout/AppWindowLogin'

const isElectron =
  typeof window !== 'undefined' &&
  !!(window as any).electronAPI?.windowControls

export default function RecoverPasswordPage() {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [verificationCode, setVerificationCode] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isSendingCode, setIsSendingCode] = useState(false)
  const [loading, setLoading] = useState(false)
  const [feedback, setFeedback] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (typeof document === 'undefined') return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [])

  const handleSendCode = async () => {
    setError(null)
    setFeedback(null)
    setIsSendingCode(true)

    try {
      // Integração de envio de código deve ser adicionada aqui.
      await new Promise((resolve) => setTimeout(resolve, 600))
      setFeedback('Código de verificação enviado para seu e-mail.')
    } catch (err: any) {
      setError(err.message ?? 'Não foi possível enviar o código.')
    } finally {
      setIsSendingCode(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setFeedback(null)
    setLoading(true)

    try {
      // Integração real de redefinição de senha deve ser adicionada aqui.
      await new Promise((resolve) => setTimeout(resolve, 800))
      setFeedback('Senha atualizada com sucesso!')
      setEmail('')
      setVerificationCode('')
      setNewPassword('')
    } catch (err: any) {
      setError(err.message ?? 'Não foi possível atualizar a senha.')
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    if (!isElectron) return
      ; (window as any).electronAPI?.windowControls?.close()
  }

  const handleMinimize = () => {
    if (!isElectron) return
      ; (window as any).electronAPI?.windowControls?.minimize()
  }

  const handleToggleMaximize = () => {
    if (!isElectron) return
      ; (window as any).electronAPI?.windowControls?.toggleMaximize()
  }

  return (
    <AppWindowLogin>
      <div className="no-drag flex h-full flex-col items-center">
        {/* Semáforo da janela */}
        <div className="flex h-1 items-center gap-[7px] self-start rounded-full">
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
            <h1 className="mt-1 text-[27px] font-semibold leading-[26px] tracking-tight text-slate-900">
              Recuperar senha
            </h1>

            <p className="mt-2 text-[18px] leading-7 text-slate-600">
              Preencha os dados abaixo para recuperar sua conta
            </p>
          </div>
        </div>
        <form
          onSubmit={handleSubmit}
          className="mt-6 flex w-full flex-col gap-5 text-[14px] leading-[16px] text-slate-600"
        >
          {/* Email */}
          <div className="mt-1 mx-3 flex flex-col gap-2">
            <label className="text-[15px] font-semibold leading-[24px] text-[#344054]">
              Email
            </label>
            <div className="flex h-10 items-center gap-2 rounded-lg border border-[#D0D5DD] bg-white px-[14px]">
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
                className="flex-1 border-0 bg-transparent text-[15px] leading-5 text-[#101828] placeholder:text-[#667085] outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* Código de verificação */}
          <div className="flex mx-3 flex-col gap-1">
            <label className="text-[15px] font-semibold leading-[24px] text-[#344054]">
              Código de verificação
            </label>

            {/* Frame 384px x 40px com gap 6px */}
            <div className="flex h-10 w-full items-stretch gap-[6px]">
              {/* Input do código */}
              <div className="flex flex-1 items-center rounded-lg border border-[#D0D5DD] bg-white px-[14px]">
                <input
                  type="text"
                  placeholder="Insira o código de verificação"
                  className="w-full border-0 bg-transparent text-[15px] leading-5 text-[#101828] placeholder:text-[#667085] outline-none"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                />
              </div>

              {/* Botão "Obter código" */}
              <button
                type="button"
                onClick={handleSendCode}
                disabled={!email || isSendingCode}
                className="
                  flex items-center justify-center
                  rounded-lg border border-[#D0D5DD] bg-white
                  px-4
                  text-[14px] font-semibold leading-5 text-[#344054]
                  transition-colors
                  hover:bg-[#F9FAFB]
                  disabled:cursor-not-allowed disabled:opacity-60
                "
              >
                {isSendingCode ? 'Enviando...' : 'Obter código'}
              </button>
            </div>
          </div>

          {/* Nova senha */}
          <div className="flex mx-3 flex-col gap-2">
            <label className="text-[15px] font-semibold leading-[24px] text-[#344054]">
              Nova Senha
            </label>
            <div className="flex h-10 items-center gap-2 rounded-lg border border-[#D0D5DD] bg-white px-[14px]">
              <Image
                src="/icons/lock-01.svg"
                alt="Ícone de nova senha"
                width={14}
                height={14}
                className="shrink-0"
              />

              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                className="flex-1 border-0 bg-transparent text-[14px] leading-5 text-[#101828] placeholder:text-[#667085] outline-none"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="shrink-0 p-1"
                aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
              >
                <Image src="/icons/eye-01.svg" alt="" width={16} height={16} />
              </button>
            </div>
          </div>

          {error && (
            <p className="text-[12px] leading-[16px] text-red-500">{error}</p>
          )}

          {feedback && !error && (
            <p className="text-[12px] leading-[16px] text-emerald-600">
              {feedback}
            </p>
          )}



          {/* CTA principal */}
          <button
            type="submit"
            disabled={loading}
            className="mt-1 mx-3 h-13 rounded-lg bg-[#111111] text-[17px] font-semibold leading-[24px] text-white hover:bg-black disabled:opacity-60"
          >
            {loading ? 'Atualizando...' : 'Entrar'}
          </button>

          {/* Link para login */}
          <div className="flex items-center justify-center text-[15px] leading-[24px] text-[#475467]">
            <span>Já possui uma conta?&nbsp;</span>
            <button
              type="button"
              className="font-semibold text-[#FFA500] hover:text-[#E68F00]"
              onClick={() => router.push('/login')}
            >
              Ir para login
            </button>
          </div>
        </form>
      </div>
    </AppWindowLogin>
  )
}
