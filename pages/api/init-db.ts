import { sql } from '@vercel/postgres';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      // Drop existing table if it exists
      await sql`DROP TABLE IF EXISTS data_records;`;

      // Create the data_records table
      await sql`
        CREATE TABLE data_records (
          id SERIAL PRIMARY KEY,
          timestamp TIMESTAMP WITH TIME ZONE NOT NULL,
          numbers TEXT NOT NULL,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
      `;

      // Create index on timestamp
      await sql`
        CREATE INDEX idx_timestamp ON data_records(timestamp);
      `;

      res.json({
        success: true,
        message: 'Database initialized successfully'
      });
    } catch (error) {
      console.error('Database initialization error:', error);
      res.status(500).json({
        error: 'Failed to initialize database',
        details: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}