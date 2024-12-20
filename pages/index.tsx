import React from 'react';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="flex">
        {/* Navigation Sidebar */}
        <nav className="w-64 bg-gray-900 min-h-screen p-6 fixed left-0 overflow-y-auto">
          <h2 className="text-xl font-bold mb-6 text-blue-400">API Documentation</h2>
          <ul className="space-y-4">
            <li>
              <a href="#system" className="text-gray-300 hover:text-blue-400">System</a>
              <ul className="ml-4 mt-2 space-y-2">
                <li><a href="#health-check" className="text-gray-400 hover:text-blue-400 text-sm">Health Check</a></li>
              </ul>
            </li>
            <li>
              <a href="#registration" className="text-gray-300 hover:text-blue-400">Registration</a>
              <ul className="ml-4 mt-2 space-y-2">
                <li><a href="#submit-registration" className="text-gray-400 hover:text-blue-400 text-sm">Submit Form</a></li>
                <li><a href="#get-registrations" className="text-gray-400 hover:text-blue-400 text-sm">Get Registrations</a></li>
              </ul>
            </li>
            <li>
              <a href="#data-records" className="text-gray-300 hover:text-blue-400">Data Records</a>
              <ul className="ml-4 mt-2 space-y-2">
                <li><a href="#upload-endpoint" className="text-gray-400 hover:text-blue-400 text-sm">Upload Data</a></li>
                <li><a href="#get-data-endpoint" className="text-gray-400 hover:text-blue-400 text-sm">Get Data</a></li>
              </ul>
            </li>
          </ul>
        </nav>

        {/* Main Content */}
        <div className="ml-64 p-8 flex-1">
          {/* System Section */}
          <section id="system" className="mb-12">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
              System API
            </h1>

            {/* Health Check */}
            <section id="health-check" className="bg-gray-800 rounded-xl p-6 shadow-xl border border-gray-700 mb-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-blue-500 text-white rounded-md text-sm font-medium">GET</span>
                <h3 className="text-xl font-bold text-blue-400">/api/health</h3>
              </div>
              <p className="text-gray-400 mb-4">Check the health status of the API and its dependencies</p>
              
              <div className="bg-gray-900 rounded-lg p-4 mb-4">
                <h4 className="text-sm font-semibold text-gray-400 mb-2">Headers Required</h4>
                <pre className="text-sm text-gray-300 overflow-x-auto">
{`{
  "x-api-key": "your-api-key-here"
}`}
                </pre>
              </div>

              <div className="bg-gray-900 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-gray-400 mb-2">Response (Healthy)</h4>
                <pre className="text-sm text-gray-300 overflow-x-auto">
{`{
  "status": "healthy",
  "timestamp": "2024-02-20T12:00:00.000Z",
  "database": {
    "status": "connected",
    "type": "PostgreSQL"
  },
  "version": "1.0.0",
  "environment": "production"
}`}
                </pre>
              </div>
              <div className="bg-gray-900 rounded-lg p-4 mt-4">
                <h4 className="text-sm font-semibold text-gray-400 mb-2">Response (Unhealthy)</h4>
                <pre className="text-sm text-gray-300 overflow-x-auto">
{`{
  "status": "unhealthy",
  "timestamp": "2024-02-20T12:00:00.000Z",
  "database": {
    "status": "disconnected",
    "error": "Connection refused"
  }
}`}
                </pre>
              </div>
            </section>
          </section>

          {/* Registration Section */}
          <section id="registration" className="mb-12">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
              Registration API
            </h1>

            {/* Submit Registration */}
            <section id="submit-registration" className="bg-gray-800 rounded-xl p-6 shadow-xl border border-gray-700 mb-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-green-500 text-white rounded-md text-sm font-medium">POST</span>
                <h3 className="text-xl font-bold text-blue-400">/api/registration</h3>
              </div>
              <p className="text-gray-400 mb-4">Submit a new registration form</p>
              <div className="bg-gray-900 rounded-lg p-4">
                <pre className="text-sm text-gray-300 overflow-x-auto">
{`{
  "firstName": "John",
  "lastName": "Doe",
  "streetAddress": "123 Main St",
  "streetAddressLine2": "Apt 4B",
  "city": "New York",
  "stateProvince": "NY",
  "postalCode": "10001",
  "phoneNumber": "(555) 123-4567",
  "email": "john@example.com",
  "hearAboutUs": "Social Media",
  "otherSource": "",
  "feedback": "Great service!",
  "suggestions": "More online options would be nice",
  "willingToRecommend": "Yes",
  "references": [
    {
      "fullName": "Jane Smith",
      "address": "456 Park Ave",
      "contactNumber": "(555) 987-6543"
    },
    {
      "fullName": "Bob Wilson",
      "address": "789 Broadway",
      "contactNumber": "(555) 456-7890"
    }
  ]
}`}
                </pre>
              </div>
            </section>

            {/* Get Registrations */}
            <section id="get-registrations" className="bg-gray-800 rounded-xl p-6 shadow-xl border border-gray-700 mb-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-blue-500 text-white rounded-md text-sm font-medium">GET</span>
                <h3 className="text-xl font-bold text-blue-400">/api/registration</h3>
              </div>
              <p className="text-gray-400 mb-4">Retrieve all registrations with their references</p>
              <div className="bg-gray-900 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-gray-400 mb-2">Response</h4>
                <pre className="text-sm text-gray-300 overflow-x-auto">
{`{
  "success": true,
  "data": [
    {
      "id": 1,
      "firstName": "John",
      "lastName": "Doe",
      "streetAddress": "123 Main St",
      "streetAddressLine2": "Apt 4B",
      "city": "New York",
      "stateProvince": "NY",
      "postalCode": "10001",
      "phoneNumber": "(555) 123-4567",
      "email": "john@example.com",
      "hearAboutUs": "Social Media",
      "otherSource": "",
      "feedback": "Great service!",
      "suggestions": "More online options would be nice",
      "willingToRecommend": "Yes",
      "references": [
        {
          "fullName": "Jane Smith",
          "address": "456 Park Ave",
          "contactNumber": "(555) 987-6543"
        }
      ]
    }
  ]
}`}
                </pre>
              </div>
            </section>
          </section>

          {/* Data Records Section */}
          <section id="data-records" className="mb-12">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
              Data Records API
            </h2>

            {/* Upload Endpoint */}
            <section id="upload-endpoint" className="bg-gray-800 rounded-xl p-6 shadow-xl border border-gray-700 mb-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-green-500 text-white rounded-md text-sm font-medium">POST</span>
                <h3 className="text-xl font-bold text-blue-400">/api/upload</h3>
              </div>
              <p className="text-gray-400 mb-4">Upload data records in batches for processing</p>
              <div className="bg-gray-900 rounded-lg p-4">
                <pre className="text-sm text-gray-300 overflow-x-auto">
{`{
  "data": [
    {
      "timestamp": "2024-01-01T12:00:00Z",
      "numbers": "1,2,3,4,5"
    }
  ]
}`}
                </pre>
              </div>
            </section>

            {/* Get Data Endpoint */}
            <section id="get-data-endpoint" className="bg-gray-800 rounded-xl p-6 shadow-xl border border-gray-700">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-blue-500 text-white rounded-md text-sm font-medium">GET</span>
                <h3 className="text-xl font-bold text-blue-400">/api/data</h3>
              </div>
              <p className="text-gray-400 mb-4">Retrieve paginated records from the database</p>
              <div className="bg-gray-900 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-gray-400 mb-2">Query Parameters</h4>
                <ul className="grid grid-cols-2 gap-4 mb-4">
                  <li className="bg-gray-800 p-3 rounded-lg">
                    <span className="text-blue-400 font-mono">page</span>
                    <p className="text-sm text-gray-500">Default: 1</p>
                  </li>
                  <li className="bg-gray-800 p-3 rounded-lg">
                    <span className="text-blue-400 font-mono">pageSize</span>
                    <p className="text-sm text-gray-500">Default: 10</p>
                  </li>
                </ul>
              </div>
            </section>
          </section>
        </div>
      </div>
    </main>
  );
}