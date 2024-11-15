import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

interface DataRecord {
  timestamp: string;
  numbers: string;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = parseInt(searchParams.get('pageSize') || '10');
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

    return NextResponse.json({
      data: result.rows,
      count: total
    });
  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch data' },
      { status: 500 }
    );
  }
}