
// desktop-app/src/app/(auth)/signup/page.tsx
'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import {
  AppWindowLogin,
  DEFAULT_WINDOW_SIZE,
} from '@/components/layout/AppWindowLogin'

const isElectron =
  typeof window !== 'undefined' &&
  !!(window as any).electronAPI?.windowControls

const SIGNUP_WINDOW_SIZE = {
  width: 480,
  height: 820,
}

export default function SignupPage() {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [verificationCode, setVerificationCode] = useState('')
  const [password, setPassword] = useState('')
  const [referralCode, setReferralCode] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isSendingCode, setIsSendingCode] = useState(false)
  const [loading, setLoading] = useState(false)
  const [acceptedTerms, setAcceptedTerms] = useState(false)
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

    useEffect(() => {
    if (!isElectron) return

    const { width, height } = SIGNUP_WINDOW_SIZE

    ;(window as any).electronAPI?.windowControls?.setSize(
      width,
      height,
      width,
      height,
    )

    return () => {
      const { width: defaultWidth, height: defaultHeight } = DEFAULT_WINDOW_SIZE
      ;(window as any).electronAPI?.windowControls?.setSize(
        defaultWidth,
        defaultHeight,
        defaultWidth,
        defaultHeight,
      )
    }
  }, [])

  const handleSendCode = async () => {
    setError(null)
    setFeedback(null)
    setIsSendingCode(true)

    try {
      // TODO: Integração real de envio de código
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
    if (!acceptedTerms) return

    setError(null)
    setFeedback(null)
    setLoading(true)

    try {
      // TODO: Integração real de criação de conta
      await new Promise((resolve) => setTimeout(resolve, 800))
      setFeedback('Conta criada com sucesso!')
      setEmail('')
      setVerificationCode('')
      setPassword('')
      setReferralCode('')
      setAcceptedTerms(false)
    } catch (err: any) {
      setError(err.message ?? 'Não foi possível criar a conta.')
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    if (!isElectron) return
    ;(window as any).electronAPI?.windowControls?.close()
  }

  const handleMinimize = () => {
    if (!isElectron) return
    ;(window as any).electronAPI?.windowControls?.minimize()
  }

  const handleToggleMaximize = () => {
    if (!isElectron) return
    ;(window as any).electronAPI?.windowControls?.toggleMaximize()
  }

  return (
    <AppWindowLogin size={SIGNUP_WINDOW_SIZE}>
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
              Criar nova conta
            </h1>

            <p className="mt-2 text-[18px] leading-7 text-slate-600">
              Preencha os dados abaixo para criar sua conta
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

            <div className="flex h-10 w-full items-stretch gap-[6px]">
              <div className="flex flex-1 items-center rounded-lg border border-[#D0D5DD] bg-white px-[14px]">
                <input
                  type="text"
                  placeholder="Insira o código de verificação"
                  className="w-full border-0 bg-transparent text-[15px] leading-5 text-[#101828] placeholder:text-[#667085] outline-none"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                />
              </div>

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

          {/* Senha */}
          <div className="flex mx-3 flex-col gap-2">
            <label className="text-[15px] font-semibold leading-[24px] text-[#344054]">
              Senha
            </label>
            <div className="flex h-10 items-center gap-2 rounded-lg border border-[#D0D5DD] bg-white px-[14px]">
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
                className="flex-1 border-0 bg-transparent text-[14px] leading-5 text-[#101828] placeholder:text-[#667085] outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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

          {/* Código de referência */}
          <div className="flex mx-3 flex-col gap-2">
            <label className="text-[15px] font-semibold leading-[24px] text-[#344054]">
              Código de referência
            </label>
            <div className="flex h-10 items-center rounded-lg border border-[#D0D5DD] bg-white px-[14px]">
              <input
                type="text"
                placeholder="(Opcional)"
                className="flex-1 border-0 bg-transparent text-[14px] leading-5 text-[#101828] placeholder:text-[#667085] outline-none"
                value={referralCode}
                onChange={(e) => setReferralCode(e.target.value)}
              />
            </div>
          </div>

          {/* Aceite de termos */}
          <div className="mx-3 mt-1 flex items-start gap-2 text-[14px] leading-[20px] text-[#475467]">
            <input
              id="terms"
              type="checkbox"
              checked={acceptedTerms}
              onChange={(e) => setAcceptedTerms(e.target.checked)}
              className="mt-[3px] h-4 w-4 rounded-[4px] border border-[#D1D5DB]"
            />
            <label htmlFor="terms" className="cursor-pointer">
              Li e concordo com os termos de serviço e política de privacidade
            </label>
          </div>

          {error && (
            <p className="mx-3 text-[12px] leading-[16px] text-red-500">
              {error}
            </p>
          )}

          {feedback && !error && (
            <p className="mx-3 text-[12px] leading-[16px] text-emerald-600">
              {feedback}
            </p>
          )}

          {/* CTA principal */}
          <button
            type="submit"
            disabled={loading || !acceptedTerms}
            className="mt-1 mx-3 h-13 rounded-lg bg-[#111111] text-[17px] font-semibold leading-[24px] text-white hover:bg-black disabled:opacity-60"
          >
            {loading ? 'Criando conta...' : 'Criar conta'}
          </button>

          {/* Divider "Ou cadastre-se com" */}
          <div className="mt-1 mb-2 flex items-center gap-3">
            <span className="h-px flex-1 bg-[#E5E7EB]" />
            <span className="text-[13px] leading-[14px] tracking-[0.02em] text-[#818898]">
              Ou cadastre-se com
            </span>
            <span className="h-px flex-1 bg-[#E5E7EB]" />
          </div>

          {/* Botões sociais */}
          <div className="flex gap-4">
            {/* Google */}
            <button
              type="button"
              className="flex flex-1 items-center justify-center rounded-[10px] border border-[#D1D5DB] bg-white py-[12px] transition-colors hover:bg-[#F9FAFB]"
            >
              <Image
                src="/icons/google.svg"
                alt="Cadastrar com Google"
                width={24}
                height={24}
              />
            </button>

            {/* Apple */}
            <button
              type="button"
              className="flex flex-1 items-center justify-center rounded-[10px] border border-[#D1D5DB] bg-white py-3 transition-colors hover:bg-[#F9FAFB]"
            >
              <Image
                src="/icons/apple.svg"
                alt="Cadastrar com Apple"
                width={24}
                height={24}
              />
            </button>
          </div>

          {/* Link para login */}
          <div className="mt-4 flex items-center justify-center text-[15px] leading-[24px] text-[#475467]">
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
