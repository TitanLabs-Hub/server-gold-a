import { NextApiRequest, NextApiResponse } from 'next';
import { sql } from '@vercel/postgres';

interface DataRecord {
  timestamp: string;
  numbers: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
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
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}