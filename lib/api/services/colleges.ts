// College API Service
import { apiClient } from '../client';
import { endpoints } from '../config';
import type { College, CollegeFilters, ApiResponse, PaginatedResponse, CollegeListResponse, FilterOptions } from '../types';


export const collegeService = {
  /**
   * Get all colleges with optional filters
   */
  async getColleges(filters?: CollegeFilters): Promise<ApiResponse<CollegeListResponse>> {
    const params: Record<string, string | number | boolean | undefined> = {};
    
    if (filters) {
      if (filters.search) params.search = filters.search;
      if (filters.state && filters.state !== 'All States') params.state = filters.state;
      if (filters.type && filters.type !== 'All Types') params.type = filters.type;
      if (filters.category && filters.category !== 'All Categories') params.category = filters.category;
      if (filters.sortBy) params.sortBy = filters.sortBy;
      if (filters.page) params.page = filters.page;
      if (filters.limit) params.limit = filters.limit;
    }

    // Map backend response to frontend types
    return apiClient.get<ApiResponse<CollegeListResponse>>(endpoints.colleges.list, { params });
  },

  /**
   * Get a single college by ID
   */
  async getCollegeById(id: number | string): Promise<ApiResponse<College>> {
    return apiClient.get<ApiResponse<College>>(endpoints.colleges.detail(id));
  },

  /**
   * Search colleges
   */
  async searchColleges(query: string): Promise<ApiResponse<College[]>> {
    return apiClient.get<ApiResponse<College[]>>(endpoints.colleges.search, {
      params: { q: query }
    });
  },

  /**
   * Get featured colleges
   */
  async getFeaturedColleges(): Promise<ApiResponse<College[]>> {
    return apiClient.get<ApiResponse<College[]>>(endpoints.colleges.list, {
      params: { featured: true }
    });
  },

  async getFilterOptions(): Promise<ApiResponse<FilterOptions>> {
    return apiClient.get<ApiResponse<FilterOptions>>(endpoints.colleges.filter);
  }
};

export default collegeService;
