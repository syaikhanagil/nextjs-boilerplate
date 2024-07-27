import { getToken } from 'next-auth/jwt';
import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  async function middleware(req) {
    const token = await getToken({ req });

    if (!token) {
      const previousPage = req.nextUrl.pathname;
      return NextResponse.redirect(
        new URL(`/login?redirect=${encodeURIComponent(previousPage)}`, req.url),
      );
    }

    // if (req.nextUrl.pathname === '/login-successful') {
    //   const role = token.user.roleId;
    //   if (Number(role) === 1) {
    //     return NextResponse.redirect(new URL('/admin', req.url));
    //   }
    //   if (Number(role) === 2) {
    //     return NextResponse.redirect(new URL('/mentor', req.url));
    //   }
    //   if (Number(role) === 3) {
    //     return NextResponse.redirect(new URL('/dashboard', req.url));
    //   }
    // }

    // const pathname = req.nextUrl.pathname;
    // const role = token.user.roleId ?? 0;

    // if (!token) {
    //   let from = req.nextUrl.pathname;

    //   if (req.nextUrl.search) {
    //     from += req.nextUrl.search;
    //   }

    //   return NextResponse.redirect(
    //     new URL(`/signin?from=${encodeURIComponent(from)}`, req.url)
    //   );
    // }

    // const userType = token?.user?.type;
    // const pathname = req.nextUrl.pathname;
    // const dashboardUrl = new URL('/dashboard', req.url);
    // const accountLink = `/dashboard/users/${token?.user?.id}`;
    // const accountUrl = new URL(accountLink, req.url);

    // if (pathname.startsWith('/signin') ?? pathname.startsWith('/signup')) {
    //   return NextResponse.redirect(
    //     userType === 'regular' ? accountUrl : dashboardUrl
    //   );
    // }

    // if (pathname.startsWith('/account/change-password')) {
    //   return NextResponse.redirect(
    //     new URL(`${accountLink}/change-password`, req.url)
    //   );
    // }

    // if (
    //   pathname.startsWith('/account') ||
    //   (userType === 'regular' && pathname === '/dashboard')
    // ) {
    //   return NextResponse.redirect(accountUrl);
    // }

    // if (req.nextUrl.pathname === '/TataCaraJoin') {
    //   return NextResponse.redirect(
    //     new URL('/diamond-starter-tutorial#registering-app', req.url)
    //   );
    // }
  },
  {
    callbacks: {
      authorized: async (params) => {
        return !!params;
      },
    },
  },
);

export const config = {
  matcher: ['/', '/dashboard', '/dashboard/:path*'],
};
