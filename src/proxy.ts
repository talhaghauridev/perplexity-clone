import { NextRequest, NextResponse } from 'next/server';
import { STORAGE_KEYS } from './constants/storage-keys';

const protectedRoutes = new Set(['/profile']);

const protectedPrefixes = new Set([]);

const authRoutes = new Set([
  '/sign-in',
  '/sign-up',
  '/forgot-password',
  '/reset-password',
  '/verify-email',
]);

function isProtectedRoute(pathname: string): boolean {
  if (protectedRoutes.has(pathname)) {
    return true;
  }

  for (const prefix of protectedPrefixes) {
    if (pathname.startsWith(prefix)) {
      return true;
    }
  }

  return false;
}

function isAuthRoute(pathname: string): boolean {
  return authRoutes.has(pathname);
}

export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(STORAGE_KEYS.AUTH.ACCESS_TOKEN)?.value;

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-current-path', pathname);
  requestHeaders.set('x-url', request.url);

  if (isAuthRoute(pathname) && token) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (!isProtectedRoute(pathname)) {
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  if (!token && isProtectedRoute(pathname)) {
    const loginUrl = new URL('/sign-in', request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
