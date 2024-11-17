import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Handle preflight requests
  if (request.method === 'OPTIONS') {
    const response = new NextResponse(null, { status: 204 });
    addCorsHeaders(response);
    return response;
  }

  // Check for API key in headers
  const apiKey = request.headers.get('x-api-key');
  const requiredApiKey = process.env.API_KEY;

  if (!apiKey || !requiredApiKey || apiKey !== requiredApiKey) {
    const response = new NextResponse(null, { status: 401 });
    addCorsHeaders(response);
    return response;
  }

  const response = NextResponse.next();
  addCorsHeaders(response);
  return response;
}

function addCorsHeaders(response: NextResponse) {
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-API-Key');
  response.headers.set('Access-Control-Max-Age', '86400');
}

export const config = {
  matcher: '/api/:path*',
}