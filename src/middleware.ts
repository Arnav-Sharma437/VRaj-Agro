import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const pathname = req.nextUrl.pathname;

    // 1. If someone visits /admin/* or /admin
    if (pathname.startsWith('/admin')) {
      if (!token) {
        // Rewrite to 404 page content
        return NextResponse.rewrite(new URL('/404', req.url));
      }
    }

    // 2. Protect /bdis87oanxje1/* (require session) except /bdis87oanxje1/login
    if (pathname.startsWith('/bdis87oanxje1') && pathname !== '/bdis87oanxje1/login') {
      if (!token) {
        return NextResponse.redirect(new URL('/bdis87oanxje1/login', req.url));
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: () => {
        // Return true to handle authorization manually in the middleware function,
        // which avoids exposing the secret URL via NextAuth's default redirect.
        return true;
      },
    },
  }
);

export const config = {
  matcher: ['/admin/:path*', '/bdis87oanxje1/:path*'],
};
