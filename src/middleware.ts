import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(request: NextRequest){
    const path = request.nextUrl.pathname
    const isPublicPath = path === '/login' || path === '/signup'

    // Note to self: Extract the token from cookies. If not present, default to an empty string.
   // Optional chaining (?.) prevents errors if the cookie is not found (undefined).
  // The || '' ensures token is always a string (either the token value or an empty string).
    const token = request.cookies.get('token')?.value || '';
    console.log('Path:', path);
    console.log('Token:', token, 'Is Public Path:', isPublicPath);

    // console.log("token in middleware", token);

    //
    if (token && isPublicPath) {
        // console.log("fired in public")
        return NextResponse.redirect(new URL('/', request.nextUrl));
    }

    if(!isPublicPath && !token){
        // console.log("fired in private")
        return NextResponse.redirect(new URL('/login', request.nextUrl))
    }

    // If token exists, proceed with the request
    return NextResponse.next();
}

export const config = {
    matcher: [
        '/',
        '/profile',
        '/login',
        '/signup',
        
      ]
      
}