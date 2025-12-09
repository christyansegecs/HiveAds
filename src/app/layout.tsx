
// src/app/layout.tsx
import type { Metadata } from 'next'
import './globals.css'
import { AuthProvider } from '@/contexts/AuthContext'


export const metadata: Metadata = {
  title: 'HiveAds Desktop',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className="bg-transparent antialiased">
        <AuthProvider>
          <div className="h-full w-full overflow-hidden">
            {children}
          </div>
        </AuthProvider>
      </body>
    </html>
  )
}
