import { NextApiRequest, NextApiResponse } from 'next';
import { sql } from '@vercel/postgres';

interface DataRecord {
  timestamp: string;
  numbers: string;
}

async function ensureDataTableExists() {
  try {
    const tableCheck = await sql`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'data_records'
      );
    `;

    if (!tableCheck.rows[0].exists) {
      await sql`
        CREATE TABLE data_records (
          id SERIAL PRIMARY KEY,
          timestamp TIMESTAMP WITH TIME ZONE NOT NULL,
          numbers TEXT NOT NULL,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );

        CREATE INDEX idx_timestamp ON data_records(timestamp);
      `;
    }
  } catch (error) {
    console.error('Error checking/creating data_records table:', error);
    throw new Error('Failed to initialize data_records table');
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', '*');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    try {
      await ensureDataTableExists();

      const page = parseInt(req.query.page as string || '1');
      const pageSize = parseInt(req.query.pageSize as string || '10');
      const offset = (page - 1) * pageSize;

      // Get total count
      const countResult = await sql`
        SELECT COUNT(*) as total FROM data_records
      `;
      const total = parseInt(countResult.rows[0].total.toString());

      // Get paginated data
      const result = await sql<DataRecord>`
        SELECT timestamp, numbers
        FROM data_records
        ORDER BY timestamp DESC
        LIMIT ${pageSize}
        OFFSET ${offset}
      `;

      res.json({
        data: result.rows,
        count: total
      });
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'Failed to fetch data' });
    }
  } else if (req.method === 'POST') {
    try {
      await ensureDataTableExists();

      const { data } = req.body as { data: DataRecord[] };
      
      // Process data in batches of 100
      const BATCH_SIZE = 100;
      
      for (let i = 0; i < data.length; i += BATCH_SIZE) {
        const batch = data.slice(i, i + BATCH_SIZE);
        
        for (const record of batch) {
          await sql`
            INSERT INTO data_records (timestamp, numbers)
            VALUES (${record.timestamp}, ${record.numbers})
          `;
        }
      }

      res.json({ success: true });
    } catch (error) {
      console.error('Error uploading data:', error);
      res.status(500).json({ error: 'Failed to upload data' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}