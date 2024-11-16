import React from 'react';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="flex">
        {/* Navigation Sidebar */}
        <nav className="w-64 bg-gray-900 min-h-screen p-6 fixed">
          <h2 className="text-xl font-bold mb-6 text-blue-400">API Documentation</h2>
          <ul className="space-y-4">
            <li>
              <a href="#data-records" className="text-gray-300 hover:text-blue-400">Data Records</a>
              <ul className="ml-4 mt-2 space-y-2">
                <li><a href="#upload-endpoint" className="text-gray-400 hover:text-blue-400 text-sm">Upload Data</a></li>
                <li><a href="#get-data-endpoint" className="text-gray-400 hover:text-blue-400 text-sm">Get Data</a></li>
                <li><a href="#init-db-endpoint" className="text-gray-400 hover:text-blue-400 text-sm">Initialize DB</a></li>
              </ul>
            </li>
            <li>
              <a href="#registration" className="text-gray-300 hover:text-blue-400">Registration</a>
              <ul className="ml-4 mt-2 space-y-2">
                <li><a href="#submit-registration" className="text-gray-400 hover:text-blue-400 text-sm">Submit Form</a></li>
                <li><a href="#get-registrations" className="text-gray-400 hover:text-blue-400 text-sm">Get Registrations</a></li>
              </ul>
            </li>
          </ul>
        </nav>

        {/* Main Content */}
        <div className="ml-64 p-8 w-full">
          {/* Data Records Section */}
          <section id="data-records" className="mb-12">
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
              Data Records API
            </h1>
            <p className="text-gray-400 mb-8">A comprehensive REST API for managing data records and registrations</p>

            <div className="space-y-8">
              {/* Upload Endpoint */}
              <section id="upload-endpoint" className="bg-gray-800 rounded-xl p-6 shadow-xl border border-gray-700">
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

              {/* Registration Section */}
              <section id="registration" className="mt-16">
                <h2 className="text-3xl font-bold mb-6 text-blue-400">Registration API</h2>

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
  "city": "New York",
  "stateProvince": "NY",
  "postalCode": "10001",
  "phoneNumber": "(555) 123-4567",
  "email": "john@example.com",
  "hearAboutUs": "Social Media",
  "references": [
    {
      "fullName": "Jane Smith",
      "address": "456 Park Ave",
      "contactNumber": "(555) 987-6543"
    }
  ]
}`}
                    </pre>
                  </div>
                </section>

                {/* Get Registrations */}
                <section id="get-registrations" className="bg-gray-800 rounded-xl p-6 shadow-xl border border-gray-700">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 bg-blue-500 text-white rounded-md text-sm font-medium">GET</span>
                    <h3 className="text-xl font-bold text-blue-400">/api/registration</h3>
                  </div>
                  <p className="text-gray-400 mb-4">Retrieve all registrations with their references</p>
                </section>
              </section>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}