import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;

    // Define public paths
    const isPublicPath =
        path === '/login' ||
        path === '/signup' ||
        path === '/verifyemail' ||
        path === '/forgotpassword' ||
        path.startsWith('/forgotpassword/validate') ||
        path.startsWith('/forgotpassword/resetpassword');

    // Extract the token from cookies
    const token = request.cookies.get('token')?.value || '';

    console.log('Path:', path);
    console.log('Token:', token, 'Is Public Path:', isPublicPath);

    // Redirect logged-in users away from public paths
    if (token && isPublicPath) {
        return NextResponse.redirect(new URL('/', request.nextUrl));
    }

    // Redirect users without a token away from private paths
    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL('/login', request.nextUrl));
    }

    // Allow the request to proceed if no conditions are met
    return NextResponse.next();
}

export const config = {
    matcher: [
        '/',
        '/profile',
        '/login',
        '/signup',
        '/verifyemail',
        '/forgotpassword',
        '/forgotpassword/validate',
        '/forgotpassword/resetpassword',
    ],
};
