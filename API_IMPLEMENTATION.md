# API Implementation Guide

## Response Format

All API endpoints return a consistent response structure:

```typescript
{
  status: boolean,  // true for success, false for error
  data: object,     // Response data (null on error)
  message?: string  // Optional error message
}
```

## Example Success Response

```json
{
  "status": true,
  "data": {
    "id": 1,
    "name": "IIT Delhi",
    "established": 1961
  }
}
```

## Example Error Response

```json
{
  "status": false,
  "data": null,
  "message": "Failed to fetch college data"
}
```

## Implemented API Routes

### Basic Information
- `GET /api/colleges/[id]` - Basic college details
- `GET /api/colleges/[id]/ratings` - College ratings
- `GET /api/colleges/[id]/fees` - Fee structure

### Placement Data
- `GET /api/colleges/[id]/placements` - Overall placement statistics
- `GET /api/colleges/[id]/placements/branches` - Branch-wise placement data

## Remaining Endpoints to Implement

You need to create similar route files for:

1. `/api/colleges/[id]/admissions/route.ts`
2. `/api/colleges/[id]/academics/route.ts`
3. `/api/colleges/[id]/departments/route.ts`
4. `/api/colleges/[id]/infrastructure/route.ts`
5. `/api/colleges/[id]/campus-experience/route.ts`
6. `/api/colleges/[id]/clubs/route.ts`
7. `/api/colleges/[id]/events/route.ts`
8. `/api/colleges/[id]/reviews/route.ts`
9. `/api/colleges/[id]/gallery/route.ts`
10. `/api/colleges/[id]/alumni/route.ts`
11. `/api/colleges/[id]/scholarships/route.ts`
12. `/api/colleges/[id]/funding/route.ts`
13. `/api/colleges/[id]/news/route.ts`
14. `/api/colleges/[id]/startups/route.ts`
15. `/api/colleges/[id]/social-media/route.ts`
16. `/api/colleges/[id]/nearby-places/route.ts`

## Template for New Endpoints

```typescript
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const collegeId = params.id;

    // TODO: Replace with actual database call
    // const data = await db.yourTable.findByCollegeId(collegeId);

    const data = {
      // Your mock data here
    };

    return NextResponse.json({
      status: true,
      data
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      {
        status: false,
        message: 'Failed to fetch data',
        data: null
      },
      { status: 500 }
    );
  }
}
```

## Testing

Start your development server:
```bash
npm run dev
```

Test an endpoint:
```bash
curl http://localhost:3000/api/colleges/1
```

Expected response:
```json
{
  "status": true,
  "data": {
    "id": 1,
    "name": "Indian Institute of Technology Delhi",
    ...
  }
}
```

## Integration with Frontend

The frontend component (`app/colleges/[id]/page.tsx`) has been updated to:

1. Handle the `{ status, data }` response format
2. Extract data from `result.data`
3. Check `result.status` before processing
4. Show proper error messages
5. Display loading and error states

## Next Steps

1. Create the remaining API route files following the template
2. Replace mock data with actual database calls
3. Add proper error handling and validation
4. Implement authentication/authorization if needed
5. Add rate limiting and caching for production
