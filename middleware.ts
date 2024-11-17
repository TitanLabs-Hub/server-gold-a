import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Handle preflight requests
  if (request.method === 'OPTIONS') {
    return new NextResponse(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-API-Key',
        'Access-Control-Max-Age': '86400',
      },
    });
  }

  // Check for API key in headers or Authorization Bearer token
  const apiKey = request.headers.get('x-api-key') || 
                 request.headers.get('authorization')?.replace('Bearer ', '');
  const requiredApiKey = process.env.API_KEY;

  if (!apiKey || !requiredApiKey || apiKey !== requiredApiKey) {
    // Instead of returning a response body, redirect to the unauthorized endpoint
    return NextResponse.rewrite(new URL('/api/unauthorized', request.url));
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