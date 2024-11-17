# API Documentation

## Authentication

Currently, the API endpoints are open and do not require authentication. This means you can make requests directly without providing any authentication credentials.

### Example Request

```javascript
const response = await fetch('https://your-api.com/api/registration', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(data)
});
```

### Security Notice

Please be aware that the API endpoints are currently not protected. It is recommended to implement proper authentication and authorization mechanisms before deploying to production.