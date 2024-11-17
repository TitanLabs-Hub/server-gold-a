import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Handle preflight requests
  if (request.method === 'OPTIONS') {
    const response = new NextResponse(null, { status: 204 });
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-API-Key');
    response.headers.set('Access-Control-Max-Age', '86400');
    return response;
  }

  // Check for API key in headers
  const apiKey = request.headers.get('x-api-key');
  const requiredApiKey = process.env.API_KEY;

  if (!apiKey || !requiredApiKey || apiKey !== requiredApiKey) {
    // Instead of returning a response body, we'll redirect to a 401 error page
    return NextResponse.redirect(new URL('/api/unauthorized', request.url));
  }

  const response = NextResponse.next();

  // Add CORS headers to all responses
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-API-Key');

  return response;
}

export const config = {
  matcher: '/api/:path*',
}