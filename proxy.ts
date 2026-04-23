import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const url = request.nextUrl.pathname;

  // better-auth typically sets a cookie that includes "session_token"
  const allCookies = request.cookies.getAll();

  console.log("=== MIDDLEWARE RAN FOR:", url, "===");
  console.log("COOKIES FOUND:", allCookies.map(c => c.name));
  const hasSession = allCookies.some(cookie => cookie.name.includes('session_token'));

  const isLoginPage = url === '/login';

  if (!hasSession && !isLoginPage) {
    console.log("no");
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (hasSession && isLoginPage) {
    console.log("good");
    return NextResponse.redirect(new URL('/', request.url)); 
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (your Next.js proxy routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
