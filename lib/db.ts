import { sql } from '@vercel/postgres';
import { RegistrationData } from '../types/registration';

export async function createRegistration(data: RegistrationData) {
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

export async function createReferences(registrationId: number, references: RegistrationData['references']) {
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