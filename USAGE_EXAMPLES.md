# Example Usage - Integrating API in Other Pages

## Example 1: Exams Page

```typescript
'use client';

import { useState, useEffect } from 'react';
import { examService, Exam, ApiError } from '@/lib/api';

export default function ExamsPage() {
  const [exams, setExams] = useState<Exam[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExams = async () => {
      try {
        setLoading(true);
        const response = await examService.getExams({ page: 1, limit: 20 });
        
        if (response.success) {
          setExams(response.data.data);
        }
      } catch (err) {
        setError(err instanceof ApiError ? err.message : 'Failed to fetch exams');
      } finally {
        setLoading(false);
      }
    };

    fetchExams();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {exams.map(exam => (
        <div key={exam.id}>{exam.name}</div>
      ))}
    </div>
  );
}
```

## Example 2: Using React Hooks (Simpler)

```typescript
'use client';

import { useExams } from '@/lib/hooks/useApi';

export default function ExamsPage() {
  const { data: exams, loading, error, refetch } = useExams({ page: 1, limit: 20 });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error} <button onClick={refetch}>Retry</button></div>;

  return (
    <div>
      {exams.map(exam => (
        <div key={exam.id}>{exam.name}</div>
      ))}
    </div>
  );
}
```

## Example 3: College Detail Page

```typescript
'use client';

import { useCollege } from '@/lib/hooks/useApi';

export default function CollegeDetailPage({ params }: { params: { id: string } }) {
  const { data: college, loading, error } = useCollege(params.id);

  if (loading) return <div>Loading college details...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!college) return <div>College not found</div>;

  return (
    <div>
      <h1>{college.name}</h1>
      <p>{college.location}</p>
      <p>Rating: {college.rating}</p>
      <p>Fees: {college.fees}</p>
      <p>Placement: {college.placement}</p>
    </div>
  );
}
```

## Example 4: Search with Debounce

```typescript
'use client';

import { useState, useEffect } from 'react';
import { collegeService, debounce } from '@/lib/api';

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);

  // Create debounced search function
  useEffect(() => {
    const debouncedSearch = debounce(async (query: string) => {
      if (query.length >= 3) {
        const response = await collegeService.searchColleges(query);
        if (response.success) {
          setResults(response.data);
        }
      }
    }, 500);

    debouncedSearch(searchQuery);
  }, [searchQuery]);

  return (
    <div>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search colleges..."
      />
      {/* Display results */}
    </div>
  );
}
```

## Example 5: Authenticated Request (Predictor)

```typescript
'use client';

import { apiClient, endpoints, setAuthToken } from '@/lib/api';

export default function PredictorPage() {
  const handlePredict = async (examData: any) => {
    try {
      // Ensure user is logged in
      const token = localStorage.getItem('authToken');
      if (!token) {
        alert('Please login first');
        return;
      }

      const response = await apiClient.post(endpoints.predictor.predict, {
        rank: examData.rank,
        category: examData.category,
        preferences: examData.preferences
      });

      if (response.success) {
        console.log('Predictions:', response.data);
      }
    } catch (error) {
      console.error('Prediction failed:', error);
    }
  };

  return <div>{/* Your predictor form */}</div>;
}
```

## Example 6: Retry Failed Requests

```typescript
import { collegeService, retryApiCall } from '@/lib/api';

async function fetchWithRetry() {
  try {
    const response = await retryApiCall(
      () => collegeService.getColleges(),
      3, // max retries
      1000 // delay in ms
    );
    
    return response;
  } catch (error) {
    console.error('Failed after retries:', error);
  }
}
```

## Example 7: Custom Filter Component

```typescript
'use client';

import { useState } from 'react';
import { useColleges } from '@/lib/hooks/useApi';

export default function FilteredColleges() {
  const [filters, setFilters] = useState({
    state: '',
    type: '',
    category: '',
    sortBy: 'ranking' as const
  });

  const { data, loading, error } = useColleges(filters);

  return (
    <div>
      <select onChange={(e) => setFilters({ ...filters, state: e.target.value })}>
        <option value="">All States</option>
        <option value="Delhi">Delhi</option>
        <option value="Maharashtra">Maharashtra</option>
      </select>

      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {data && data.map(college => (
        <div key={college.id}>{college.name}</div>
      ))}
    </div>
  );
}
```

## Best Practices

1. **Always handle loading and error states**
2. **Use hooks for simpler component logic**
3. **Debounce search inputs to reduce API calls**
4. **Use TypeScript types for better development experience**
5. **Implement retry logic for critical operations**
6. **Cache responses when appropriate (consider React Query or SWR for advanced caching)**
