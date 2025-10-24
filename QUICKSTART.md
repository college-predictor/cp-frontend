# 🚀 Quick Start Guide - Backend API Integration

## ✅ What's Been Set Up

Your College Predictor frontend is now fully integrated with backend API support! Here's what you have:

### 📦 Complete API Infrastructure
- HTTP client with authentication
- TypeScript type safety
- Error handling
- Services for colleges, exams, and courses
- React hooks for easy data fetching
- Utility functions

### 📄 Files Created

```
lib/
├── api/
│   ├── client.ts          # HTTP client
│   ├── config.ts          # API endpoints
│   ├── types.ts           # TypeScript types
│   ├── utils.ts           # Helper functions
│   ├── index.ts           # Main exports
│   ├── README.md          # API documentation
│   └── services/
│       ├── colleges.ts    # College API
│       ├── exams.ts       # Exam API
│       └── courses.ts     # Course API
└── hooks/
    └── useApi.ts          # React hooks

app/colleges/page.tsx      # ✅ Updated to use API
.env.local                 # ✅ Added API_URL
```

## 🎯 Getting Started

### Step 1: Configure Your Backend URL

Open `.env.local` and update the API URL:

```bash
NEXT_PUBLIC_API_URL="http://your-backend-url:8080/api"
# For local development:
NEXT_PUBLIC_API_URL="http://localhost:8080/api"
```

### Step 2: Start Your Backend Server

Make sure your backend is running and accessible at the configured URL.

### Step 3: Test the Integration

```bash
npm run dev
```

Navigate to `http://localhost:3000/colleges` - you should see data from your backend!

## 🔥 Quick Examples

### Option 1: Using Services (Direct API Calls)

```typescript
import { collegeService } from '@/lib/api';

const response = await collegeService.getColleges({
  state: 'Delhi',
  sortBy: 'ranking'
});

if (response.success) {
  console.log(response.data.data); // Array of colleges
}
```

### Option 2: Using Hooks (Recommended)

```typescript
import { useColleges } from '@/lib/hooks/useApi';

function MyComponent() {
  const { data, loading, error } = useColleges({ state: 'Delhi' });
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return <div>{data.map(college => ...)}</div>;
}
```

## 📋 Backend API Requirements

Your backend should implement these endpoints:

### Colleges
- `GET /api/colleges` - List colleges (with filters)
- `GET /api/colleges/:id` - Get college details

### Exams
- `GET /api/exams` - List exams
- `GET /api/exams/:id` - Get exam details

### Courses
- `GET /api/courses` - List courses
- `GET /api/courses/:id` - Get course details

### Response Format

All responses should follow this structure:

```json
{
  "success": true,
  "data": {
    "data": [...items],
    "total": 100,
    "page": 1,
    "limit": 20,
    "totalPages": 5
  }
}
```

## 🔐 Authentication

The API client automatically handles authentication:

```typescript
// After login
localStorage.setItem('authToken', 'your-jwt-token');

// All subsequent API calls will include:
// Authorization: Bearer your-jwt-token

// After logout
localStorage.removeItem('authToken');
```

## 🛠️ Apply to Other Pages

Update your other pages (exams, courses, etc.) using the same pattern:

```typescript
// app/exams/page.tsx
'use client';

import { useExams } from '@/lib/hooks/useApi';

export default function ExamsPage() {
  const { data: exams, loading, error } = useExams();
  
  // Your component logic...
}
```

## 📚 Documentation

- **API Documentation**: See `lib/api/README.md`
- **Usage Examples**: See `USAGE_EXAMPLES.md`
- **Full Summary**: See `API_INTEGRATION_SUMMARY.md`

## ✨ Features

✅ Automatic authentication  
✅ Loading states  
✅ Error handling  
✅ TypeScript support  
✅ Filter & search  
✅ Pagination  
✅ Sorting  
✅ Retry logic  
✅ Debouncing  

## 🐛 Common Issues

**Problem**: CORS error  
**Solution**: Enable CORS on your backend for your frontend domain

**Problem**: 401 Unauthorized  
**Solution**: Ensure authentication token is set in localStorage

**Problem**: Network error  
**Solution**: Check backend is running and API URL is correct

## 💡 Pro Tips

1. **Use hooks** for cleaner code
2. **Handle errors gracefully** with user-friendly messages
3. **Show loading states** for better UX
4. **Debounce search inputs** to reduce API calls
5. **Use TypeScript** for autocomplete and type safety

## 🚀 Next Steps

1. ✅ Backend integration is complete
2. 🔄 Test with your backend API
3. 📱 Apply to other pages (exams, courses, etc.)
4. 🔐 Implement login/logout
5. 🎨 Add more features as needed

## Need Help?

Check the documentation files:
- `lib/api/README.md` - Detailed API docs
- `USAGE_EXAMPLES.md` - More code examples
- `API_INTEGRATION_SUMMARY.md` - Complete overview

---

**You're all set!** 🎉 Your frontend is now ready to fetch data from the backend.
