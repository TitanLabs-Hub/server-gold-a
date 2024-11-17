import { NextApiRequest, NextApiResponse } from 'next';
import { sql } from '@vercel/postgres';
import { RegistrationData } from '../../../types/registration';
import { ensureTablesExist } from '../../../lib/db/init';
import { createRegistration, createReferences, getAllRegistrations } from '../../../lib/db/registration';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', '*');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // Ensure tables exist before proceeding with any operation
    await ensureTablesExist();

    if (req.method === 'POST') {
      const data: RegistrationData = req.body;

      await sql`BEGIN`;
      try {
        const registrationId = await createRegistration(data);
        await createReferences(registrationId, data.references);
        await sql`COMMIT`;

        res.json({
          success: true,
          message: 'Registration submitted successfully',
          registrationId
        });
      } catch (error) {
        await sql`ROLLBACK`;
        throw error;
      }
    } else if (req.method === 'GET') {
      const registrations = await getAllRegistrations();
      res.json({
        success: true,
        data: registrations
      });
    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('API error:', error);
    res.status(500).json({
      error: 'Failed to process registration',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}