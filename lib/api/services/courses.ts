// Course API Service
import { apiClient } from '../client';
import { endpoints } from '../config';
import type { Course, ApiResponse, PaginatedResponse } from '../types';

export const courseService = {
  /**
   * Get all courses
   */
  async getCourses(params?: { 
    category?: string; 
    page?: number; 
    limit?: number;
  }): Promise<ApiResponse<PaginatedResponse<Course>>> {
    return apiClient.get<ApiResponse<PaginatedResponse<Course>>>(
      endpoints.courses.list,
      { params }
    );
  },

  /**
   * Get a single course by ID
   */
  async getCourseById(id: number | string): Promise<ApiResponse<Course>> {
    return apiClient.get<ApiResponse<Course>>(endpoints.courses.detail(id));
  },

  /**
   * Search courses
   */
  async searchCourses(query: string): Promise<ApiResponse<Course[]>> {
    return apiClient.get<ApiResponse<Course[]>>(endpoints.courses.list, {
      params: { q: query }
    });
  },
};

export default courseService;
