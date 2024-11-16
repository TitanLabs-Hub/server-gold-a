# Registration API Documentation

## Endpoints

### Initialize Database
Creates the necessary database tables for registrations and references.

```http
POST /api/registration/init
```

#### Response
```json
{
  "success": true,
  "message": "Registration tables initialized successfully"
}
```

### Submit Registration
Submits a new registration form with references.

```http
POST /api/registration
```

#### Request Body Example
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "streetAddress": "123 Main St",
  "streetAddressLine2": "Apt 4B",
  "city": "New York",
  "stateProvince": "NY",
  "postalCode": "10001",
  "phoneNumber": "(555) 123-4567",
  "email": "john.doe@example.com",
  "hearAboutUs": "Social Media",
  "otherSource": "",
  "feedback": "Great service!",
  "suggestions": "More online options would be nice",
  "willingToRecommend": "Yes",
  "references": [
    {
      "fullName": "Jane Smith",
      "address": "456 Park Ave, New York, NY 10002",
      "contactNumber": "(555) 987-6543"
    },
    {
      "fullName": "Bob Wilson",
      "address": "789 Broadway, New York, NY 10003",
      "contactNumber": "(555) 456-7890"
    }
  ]
}
```

#### Success Response
```json
{
  "success": true,
  "message": "Registration submitted successfully",
  "registrationId": 123
}
```

#### Error Response
```json
{
  "error": "Failed to process registration",
  "details": "Error message details"
}
```

### Get All Registrations
Retrieves all registrations with their references.

```http
GET /api/registration
```

#### Success Response
```json
{
  "success": true,
  "data": [
    {
      "id": 123,
      "first_name": "John",
      "last_name": "Doe",
      "street_address": "123 Main St",
      "street_address_line2": "Apt 4B",
      "city": "New York",
      "state_province": "NY",
      "postal_code": "10001",
      "phone_number": "(555) 123-4567",
      "email": "john.doe@example.com",
      "hear_about_us": "Social Media",
      "other_source": null,
      "feedback": "Great service!",
      "suggestions": "More online options would be nice",
      "willing_to_recommend": "Yes",
      "created_at": "2024-01-20T12:00:00Z",
      "references": [
        {
          "fullName": "Jane Smith",
          "address": "456 Park Ave, New York, NY 10002",
          "contactNumber": "(555) 987-6543",
          "referenceOrder": 1
        },
        {
          "fullName": "Bob Wilson",
          "address": "789 Broadway, New York, NY 10003",
          "contactNumber": "(555) 456-7890",
          "referenceOrder": 2
        }
      ]
    }
  ]
}
```

## Database Schema

### Registrations Table
```sql
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
```

### References Table
```sql
CREATE TABLE references (
  id SERIAL PRIMARY KEY,
  registration_id INTEGER REFERENCES registrations(id),
  full_name VARCHAR(200) NOT NULL,
  address TEXT NOT NULL,
  contact_number VARCHAR(20) NOT NULL,
  reference_order INTEGER NOT NULL
);
```