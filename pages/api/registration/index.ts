import { NextApiRequest, NextApiResponse } from 'next';
import { sql } from '@vercel/postgres';
import { RegistrationData } from '../../../types/registration';

async function createRegistration(data: RegistrationData) {
  const registration = await sql`
    INSERT INTO registrations (
      first_name,
      last_name,
      street_address,
      street_address_line2,
      city,
      state_province,
      postal_code,
      phone_number,
      email,
      hear_about_us,
      other_source,
      feedback,
      suggestions,
      willing_to_recommend
    ) VALUES (
      ${data.firstName},
      ${data.lastName},
      ${data.streetAddress},
      ${data.streetAddressLine2 || null},
      ${data.city},
      ${data.stateProvince},
      ${data.postalCode},
      ${data.phoneNumber},
      ${data.email},
      ${data.hearAboutUs},
      ${data.otherSource || null},
      ${data.feedback || null},
      ${data.suggestions || null},
      ${data.willingToRecommend}
    )
    RETURNING id
  `;
  
  return registration.rows[0].id;
}

async function createReferences(registrationId: number, references: RegistrationData['references']) {
  for (let i = 0; i < references.length; i++) {
    const ref = references[i];
    await sql`
      INSERT INTO references (
        registration_id,
        full_name,
        address,
        contact_number,
        reference_order
      ) VALUES (
        ${registrationId},
        ${ref.fullName},
        ${ref.address},
        ${ref.contactNumber},
        ${i + 1}
      )
    `;
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
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
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({
        error: 'Failed to process registration',
        details: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  } else if (req.method === 'GET') {
    try {
      const registrations = await sql`
        SELECT r.*, 
               array_agg(json_build_object(
                 'fullName', ref.full_name,
                 'address', ref.address,
                 'contactNumber', ref.contact_number,
                 'referenceOrder', ref.reference_order
               )) as references
        FROM registrations r
        LEFT JOIN references ref ON r.id = ref.registration_id
        GROUP BY r.id
        ORDER BY r.created_at DESC
      `;

      res.json({
        success: true,
        data: registrations.rows
      });
    } catch (error) {
      console.error('Error fetching registrations:', error);
      res.status(500).json({
        error: 'Failed to fetch registrations',
        details: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}