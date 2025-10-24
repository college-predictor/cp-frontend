// Custom hooks for API calls
'use client';

import { useState, useEffect, useCallback } from 'react';
import { collegeService, examService, courseService, ApiError } from '@/lib/api';
import type { College, CollegeFilters, Exam, Course } from '@/lib/api';

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

interface UsePaginatedApiState<T> {
  data: T[];
  total: number;
  page: number;
  totalPages: number;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

/**
 * Hook for fetching colleges with filters
 */
export function useColleges(filters?: CollegeFilters): UsePaginatedApiState<College> {
  const [data, setData] = useState<College[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await collegeService.getColleges(filters);
      
      if (response.success) {
        setData(response.data.data);
        setTotal(response.data.total);
        setPage(response.data.page);
        setTotalPages(response.data.totalPages);
      } else {
        setError(response.message || 'Failed to fetch colleges');
      }
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, total, page, totalPages, loading, error, refetch: fetchData };
}

/**
 * Hook for fetching a single college
 */
export function useCollege(id: number | string): UseApiState<College> {
  const [data, setData] = useState<College | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await collegeService.getCollegeById(id);
      
      if (response.success) {
        setData(response.data);
      } else {
        setError(response.message || 'Failed to fetch college');
      }
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}

/**
 * Hook for fetching exams
 */
export function useExams(params?: { page?: number; limit?: number }): UsePaginatedApiState<Exam> {
  const [data, setData] = useState<Exam[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await examService.getExams(params);
      
      if (response.success) {
        setData(response.data.data);
        setTotal(response.data.total);
        setPage(response.data.page);
        setTotalPages(response.data.totalPages);
      } else {
        setError(response.message || 'Failed to fetch exams');
      }
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  }, [params]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, total, page, totalPages, loading, error, refetch: fetchData };
}

/**
 * Hook for fetching courses
 */
export function useCourses(params?: { category?: string }): UsePaginatedApiState<Course> {
  const [data, setData] = useState<Course[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await courseService.getCourses(params);
      
      if (response.success) {
        setData(response.data.data);
        setTotal(response.data.total);
        setPage(response.data.page);
        setTotalPages(response.data.totalPages);
      } else {
        setError(response.message || 'Failed to fetch courses');
      }
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  }, [params]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, total, page, totalPages, loading, error, refetch: fetchData };
}
