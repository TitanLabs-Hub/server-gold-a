import { NextApiRequest, NextApiResponse } from 'next';
import { sql } from '@vercel/postgres';

interface DataRecord {
  timestamp: string;
  numbers: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
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