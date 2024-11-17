import { NextApiRequest, NextApiResponse } from 'next';
import { sql } from '@vercel/postgres';
import { RegistrationData } from '../../../types/registration';
import { ensureTablesExist } from '../../../lib/db/init';
import { createRegistration, createReferences, getAllRegistrations } from '../../../lib/db/registration';

function validateRegistrationData(data: any): data is RegistrationData {
  if (!data || typeof data !== 'object') return false;

  const requiredFields = [
    'firstName',
    'lastName',
    'streetAddress',
    'city',
    'stateProvince',
    'postalCode',
    'phoneNumber',
    'email',
    'hearAboutUs',
    'willingToRecommend'
  ];

  for (const field of requiredFields) {
    if (!data[field] || typeof data[field] !== 'string') {
      throw new Error(`Missing or invalid required field: ${field}`);
    }
  }

  if (data.references !== undefined && !Array.isArray(data.references)) {
    throw new Error('References must be an array');
  }

  if (Array.isArray(data.references)) {
    for (const ref of data.references) {
      if (!ref.fullName || !ref.address || !ref.contactNumber) {
        throw new Error('Invalid reference data: missing required fields');
      }
    }
  }

  return true;
}

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
      // Validate input data
      if (!validateRegistrationData(req.body)) {
        return res.status(400).json({
          error: 'Invalid registration data',
          details: 'Missing or invalid required fields'
        });
      }

      const data: RegistrationData = req.body;

      await sql`BEGIN`;
      try {
        const registrationId = await createRegistration(data);
        if (data.references && data.references.length > 0) {
          await createReferences(registrationId, data.references);
        }
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