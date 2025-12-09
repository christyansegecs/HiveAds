
// desktop-app\middleware.ts
import { NextRequest, NextResponse } from 'next/server'

const PUBLIC_PATHS = ['/login', '/_next', '/api', '/favicon.ico']

function isPublicPath(pathname: string) {
  return PUBLIC_PATHS.some((p) => pathname.startsWith(p))
}

export function middleware(req: NextRequest) {

  const { nextUrl, cookies } = req
  const token = cookies.get('auth-token')?.value
  const isPublic = isPublicPath(nextUrl.pathname)

  if (!token && !isPublic) {
    const url = new URL('/login', req.url)
    return NextResponse.redirect(url)
  }

  if (token && nextUrl.pathname === '/login') {
    const url = new URL('/', req.url)
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}