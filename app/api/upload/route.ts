import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

interface DataRecord {
  timestamp: string;
  numbers: string;
}

export async function POST(request: Request) {
  try {
    const { data } = await request.json() as { data: DataRecord[] };
    
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

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error uploading data:', error);
    return NextResponse.json(
      { error: 'Failed to upload data' },
      { status: 500 }
    );
  }
}