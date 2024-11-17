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
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Max-Age': '86400'
      }
    });
  }

  // Get API key from either header format
  const apiKey = request.headers.get('x-api-key') || 
                request.headers.get('authorization')?.replace('Bearer ', '');
                
  const expectedApiKey = 'XfwtZdtgUsPHenrYDdS0rK7Xwk77Oel6LhTtSITSSiSnPvmMfMMSeNrBiZORrmiancGuAO8UWfCqXFhufCa4ZU4oGVgKk6aO4KqeWYjQVMVkeovm1TT2yVIAOz0RWVyQ';

  if (!apiKey || apiKey !== expectedApiKey) {
    return NextResponse.rewrite(new URL('/api/unauthorized', request.url));
  }

  const response = NextResponse.next();
  
  // Add CORS headers to all responses
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', '*');
  
  return response;
}

export const config = {
  matcher: '/api/:path*'
}