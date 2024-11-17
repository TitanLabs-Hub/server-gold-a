# API Authentication

## API Key Authentication

All API endpoints are protected with API key authentication. You must include your API key in the request headers to access the API.

### Request Headers

Include the API key in the `X-API-Key` header:

```http
X-API-Key: your-api-key-here
```

### Example Request

```javascript
const response = await fetch('https://your-api.com/api/registration', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-API-Key': process.env.API_KEY
  },
  body: JSON.stringify(data)
});
```

### Error Response

If an invalid or missing API key is provided, the API will respond with:

```json
{
  "error": "Unauthorized - Invalid API Key"
}
```

Status Code: 401 Unauthorized

### Security Best Practices

1. Keep your API key secure and never expose it in client-side code
2. Store the API key in environment variables
3. Rotate API keys periodically
4. Use HTTPS for all API requests
5. Monitor API usage for suspicious activity