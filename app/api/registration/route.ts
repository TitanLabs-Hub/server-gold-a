import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { RegistrationData } from './types';
import { createRegistration, createReferences } from './db';

export async function POST(request: Request) {
  try {
    const data: RegistrationData = await request.json();

    await sql`BEGIN`;
    try {
      const registrationId = await createRegistration(data);
      await createReferences(registrationId, data.references);
      await sql`COMMIT`;

      return NextResponse.json({
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
    return NextResponse.json({
      error: 'Failed to process registration',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function GET() {
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

    return NextResponse.json({
      success: true,
      data: registrations.rows
    });
  } catch (error) {
    console.error('Error fetching registrations:', error);
    return NextResponse.json({
      error: 'Failed to fetch registrations',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}