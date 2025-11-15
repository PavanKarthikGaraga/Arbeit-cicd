import { NextResponse } from 'next/server';

export async function middleware(request) {
    // Check if it's a business route
    if (request.nextUrl.pathname.startsWith('/business') || 
        request.nextUrl.pathname.startsWith('/api/business')) {
        
        // Frontend-only: do not validate JWT on edge. Backend enforces auth.
        // If needed, you can optionally check presence of cookie and just redirect.
        const accessToken = request.cookies.get('accessToken');
        if (!accessToken) return NextResponse.redirect(new URL('/Bauth', request.url));
        return NextResponse.next();
    }

    // For non-business routes
    return NextResponse.next();
}

export const config = {
    matcher: [
        '/business/:path*',
        '/api/business/:path*'
    ]
}; 