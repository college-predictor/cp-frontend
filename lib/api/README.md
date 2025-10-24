# API Integration Guide

This directory contains the API client and service layer for the College Predictor application.

## Structure

```
lib/api/
├── client.ts         # HTTP client with error handling
├── config.ts         # API configuration and endpoints
├── types.ts          # TypeScript interfaces and types
├── index.ts          # Main exports
└── services/
    ├── colleges.ts   # College-related API calls
    ├── exams.ts      # Exam-related API calls
    └── courses.ts    # Course-related API calls
```

## Configuration

Set the backend API URL in your `.env.local` file:

```bash
NEXT_PUBLIC_API_URL="http://localhost:8080/api"
```

For production, update this to your production API URL.

## Usage

### Import the services

```typescript
import { collegeService, examService, courseService } from '@/lib/api';
```

### Fetch colleges

```typescript
// Get all colleges with filters
const response = await collegeService.getColleges({
  search: 'IIT',
  state: 'Delhi',
  type: 'Public',
  category: 'Engineering',
  sortBy: 'ranking',
  page: 1,
  limit: 20
});

if (response.success) {
  const colleges = response.data.data;
  const total = response.data.total;
}
```

### Get a specific college

```typescript
const response = await collegeService.getCollegeById(1);
if (response.success) {
  const college = response.data;
}
```

### Error Handling

The API client automatically handles errors and returns them in a structured format:

```typescript
try {
  const response = await collegeService.getColleges();
  // handle success
} catch (error) {
  if (error instanceof ApiError) {
    console.error(`API Error (${error.status}):`, error.message);
  } else {
    console.error('Unexpected error:', error);
  }
}
```

## Authentication

The API client automatically includes authentication tokens from localStorage in all requests. Tokens are stored under the `authToken` key.

To set a token after login:

```typescript
localStorage.setItem('authToken', 'your-jwt-token');
```

To clear the token after logout:

```typescript
localStorage.removeItem('authToken');
```

## API Response Format

All API responses follow this structure:

```typescript
{
  success: boolean;
  data: T; // Your data
  message?: string; // Optional message
  error?: string; // Error message if failed
}
```

For paginated responses:

```typescript
{
  success: boolean;
  data: {
    data: T[]; // Array of items
    total: number; // Total count
    page: number; // Current page
    limit: number; // Items per page
    totalPages: number; // Total pages
  }
}
```

## Adding New Services

To add a new API service:

1. Add the endpoint to `config.ts`:

```typescript
export const endpoints = {
  // ... existing endpoints
  newService: {
    list: '/new-service',
    detail: (id: number | string) => `/new-service/${id}`,
  },
};
```

2. Create a new service file in `services/`:

```typescript
import { apiClient } from '../client';
import { endpoints } from '../config';

export const newService = {
  async getItems() {
    return apiClient.get(endpoints.newService.list);
  },
};
```

3. Export it from `index.ts`:

```typescript
export { newService } from './services/newService';
```

## Backend API Requirements

Your backend API should:

1. Accept the following query parameters for college listing:
   - `search`: Search query
   - `state`: State filter
   - `type`: Type filter (Public/Private/Deemed)
   - `category`: Category filter
   - `sortBy`: Sort field (ranking/rating/fees/placement)
   - `page`: Page number
   - `limit`: Items per page

2. Return responses in the format described above

3. Support CORS for your frontend domain

4. Accept `Authorization: Bearer <token>` header for protected routes
