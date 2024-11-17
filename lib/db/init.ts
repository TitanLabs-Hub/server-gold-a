import { sql } from '@vercel/postgres';

export async function ensureTablesExist() {
  try {
    await sql`
      DO $$ 
      BEGIN
        -- Create registrations table if it doesn't exist
        IF NOT EXISTS (SELECT FROM pg_tables WHERE tablename = 'registrations') THEN
          CREATE TABLE registrations (
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
        END IF;

        -- Create references table if it doesn't exist
        IF NOT EXISTS (SELECT FROM pg_tables WHERE tablename = 'references') THEN
          CREATE TABLE references (
            id SERIAL PRIMARY KEY,
            registration_id INTEGER,
            full_name VARCHAR(200) NOT NULL,
            address TEXT NOT NULL,
            contact_number VARCHAR(20) NOT NULL,
            reference_order INTEGER NOT NULL
          );

          -- Add foreign key constraint if it doesn't exist
          IF NOT EXISTS (
            SELECT 1 FROM pg_constraint WHERE conname = 'references_registration_id_fkey'
          ) THEN
            ALTER TABLE references
            ADD CONSTRAINT references_registration_id_fkey
            FOREIGN KEY (registration_id) REFERENCES registrations(id)
            ON DELETE CASCADE;
          END IF;
        END IF;
      END $$;
    `;

    return { success: true };
  } catch (error) {
    console.error('Database initialization error:', error);
    throw new Error(
      `Database initialization failed: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}