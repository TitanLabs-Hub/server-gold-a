import { sql } from '@vercel/postgres';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      await sql`
        CREATE TABLE IF NOT EXISTS registrations (
          id SERIAL PRIMARY KEY,
          first_name VARCHAR(100) NOT NULL,
          last_name VARCHAR(100) NOT NULL,
          street_address VARCHAR(255) NOT NULL,
          street_address_line2 VARCHAR(255),
          city VARCHAR(100) NOT NULL,
          state_province VARCHAR(100) NOT NULL,
          postal_code VARCHAR(20) NOT NULL,
          phone_number VARCHAR(20) NOT NULL,
          email VARCHAR(255) NOT NULL,
          hear_about_us VARCHAR(100) NOT NULL,
          other_source TEXT,
          feedback TEXT,
          suggestions TEXT,
          willing_to_recommend VARCHAR(10),
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS references (
          id SERIAL PRIMARY KEY,
          registration_id INTEGER REFERENCES registrations(id),
          full_name VARCHAR(200) NOT NULL,
          address TEXT NOT NULL,
          contact_number VARCHAR(20) NOT NULL,
          reference_order INTEGER NOT NULL
        );
      `;

      res.json({
        success: true,
        message: 'Registration tables initialized successfully'
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