import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
const privatePaths = ['/about', '/me']
const authPaths = ['/login', '/register']

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl
    const accessToken = request.cookies.get('accessToken')?.value

    if(privatePaths.some((path) => pathname.startsWith(path)) && !accessToken) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    if(authPaths.some((path) => pathname.startsWith(path)) && accessToken) {
        return NextResponse.redirect(new URL('/me', request.url))
    }
  return NextResponse.next()
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/about/:path*', '/me/:path*', '/home/:path*', '/login/:path*', '/register/:path*'],
}