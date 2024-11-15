import React from 'react';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
            Data Records API
          </h1>
          <p className="text-gray-400">A powerful REST API for managing data records</p>
        </header>

        <div className="space-y-8">
          {/* Upload Endpoint */}
          <section className="bg-gray-800 rounded-xl p-6 shadow-xl border border-gray-700 hover:border-blue-500 transition-colors">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-green-500 text-white rounded-md text-sm font-medium">POST</span>
              <h3 className="text-xl font-bold text-blue-400">/api/upload</h3>
            </div>
            <p className="text-gray-400 mb-4">Upload data records in batches for processing</p>
            <div className="bg-gray-900 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-500">Request Body</span>
                <span className="text-sm text-gray-500">JSON</span>
              </div>
              <pre className="text-sm text-gray-300 overflow-x-auto">
{`{
  "data": [
    {
      "timestamp": "2024-01-01T12:00:00Z",
      "numbers": "1,2,3,4,5"
    }
    // ... more records
  ]
}`}
              </pre>
            </div>
          </section>

          {/* Get Data Endpoint */}
          <section className="bg-gray-800 rounded-xl p-6 shadow-xl border border-gray-700 hover:border-blue-500 transition-colors">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-blue-500 text-white rounded-md text-sm font-medium">GET</span>
              <h3 className="text-xl font-bold text-blue-400">/api/data</h3>
            </div>
            <p className="text-gray-400 mb-4">Retrieve paginated records from the database</p>
            
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-gray-400 mb-2">Query Parameters</h4>
              <ul className="grid grid-cols-2 gap-4">
                <li className="bg-gray-900 p-3 rounded-lg">
                  <span className="text-blue-400 font-mono">page</span>
                  <p className="text-sm text-gray-500">Default: 1</p>
                </li>
                <li className="bg-gray-900 p-3 rounded-lg">
                  <span className="text-blue-400 font-mono">pageSize</span>
                  <p className="text-sm text-gray-500">Default: 10</p>
                </li>
              </ul>
            </div>

            <div className="bg-gray-900 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-500">Response</span>
                <span className="text-sm text-gray-500">JSON</span>
              </div>
              <pre className="text-sm text-gray-300 overflow-x-auto">
{`{
  "data": [
    {
      "timestamp": "2024-01-01T12:00:00Z",
      "numbers": "1,2,3,4,5"
    }
  ],
  "count": 100
}`}
              </pre>
            </div>
          </section>

          {/* Init DB Endpoint */}
          <section className="bg-gray-800 rounded-xl p-6 shadow-xl border border-gray-700 hover:border-blue-500 transition-colors">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-green-500 text-white rounded-md text-sm font-medium">POST</span>
              <h3 className="text-xl font-bold text-blue-400">/api/init-db</h3>
            </div>
            <p className="text-gray-400 mb-4">Initialize the database schema (one-time setup)</p>
            <div className="bg-gray-900 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-500">Response</span>
                <span className="text-sm text-gray-500">JSON</span>
              </div>
              <pre className="text-sm text-gray-300 overflow-x-auto">
{`{
  "success": true,
  "message": "Database initialized successfully"
}`}
              </pre>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}