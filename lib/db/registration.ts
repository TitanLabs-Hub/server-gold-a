import { sql } from '@vercel/postgres';
import { RegistrationData } from '../../types/registration';

export async function createRegistration(data: RegistrationData) {
  try {
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
  } catch (error) {
    console.error('Error creating registration:', error);
    throw new Error(
      `Failed to create registration: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

export async function createReferences(registrationId: number, references: RegistrationData['references']) {
  try {
    // Ensure references is an array and has items
    if (!Array.isArray(references) || references.length === 0) {
      return; // Skip if no references
    }

    for (let i = 0; i < references.length; i++) {
      const ref = references[i];
      if (!ref.fullName || !ref.address || !ref.contactNumber) {
        throw new Error('Invalid reference data: missing required fields');
      }

      await sql`
        INSERT INTO registration_references (
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
  } catch (error) {
    console.error('Error creating references:', error);
    throw new Error(
      `Failed to create references: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

export async function getAllRegistrations() {
  try {
    const registrations = await sql`
      SELECT r.*, 
             COALESCE(
               array_agg(
                 CASE WHEN ref.id IS NOT NULL 
                   THEN json_build_object(
                     'fullName', ref.full_name,
                     'address', ref.address,
                     'contactNumber', ref.contact_number,
                     'referenceOrder', ref.reference_order
                   )
                   ELSE NULL
                 END
               ) FILTER (WHERE ref.id IS NOT NULL),
               ARRAY[]::json[]
             ) as references
      FROM registrations r
      LEFT JOIN registration_references ref ON r.id = ref.registration_id
      GROUP BY r.id
      ORDER BY r.created_at DESC
    `;

    return registrations.rows;
  } catch (error) {
    console.error('Error fetching registrations:', error);
    throw new Error(
      `Failed to fetch registrations: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}