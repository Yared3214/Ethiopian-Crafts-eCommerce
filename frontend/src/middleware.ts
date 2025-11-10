// /app/middleware.ts

import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// Define protected and public routes
const protectedRoutes = ['/dashboard', '/admin-dashboard'];
const publicRoutes = ['/signin', '/signup',];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  // Get the user cookie
  const userCookie = (await cookies()).get('user')?.value; 
  const userData = userCookie ? JSON.parse(userCookie) : null; // Parse user data

  // Redirect if not authenticated on protected routes
  if (isProtectedRoute && !userData) {
    return NextResponse.redirect(new URL('/signin', req.nextUrl));
  }

  // Redirect if authenticated and trying to access public routes
  if (isPublicRoute && userData) {
    return NextResponse.redirect(new URL('/dashboard', req.nextUrl));
  }

  return NextResponse.next();
}

// Configure routes that middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
