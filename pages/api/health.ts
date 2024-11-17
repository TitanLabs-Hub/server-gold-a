import { NextApiRequest, NextApiResponse } from 'next';
import { sql } from '@vercel/postgres';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', '*');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ 
      status: 'error',
      message: 'Method not allowed' 
    });
  }

  try {
    // Test database connection
    await sql`SELECT 1`;

    // Return success response with additional system information
    res.status(200).json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      database: {
        status: 'connected',
        type: 'PostgreSQL'
      },
      version: '1.0.0',
      environment: process.env.NODE_ENV || 'production'
    });
  } catch (error) {
    // If database check fails, return error response
    console.error('Health check failed:', error);
    res.status(503).json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      database: {
        status: 'disconnected',
        error: error instanceof Error ? error.message : 'Unknown database error'
      }
    });
  }
}