// Exam API Service
import { apiClient } from '../client';
import { endpoints } from '../config';
import type { Exam, ApiResponse, PaginatedResponse } from '../types';

export const examService = {
  /**
   * Get all exams
   */
  async getExams(params?: { page?: number; limit?: number; featured?: boolean }): Promise<ApiResponse<PaginatedResponse<Exam>>> {
    return apiClient.get<ApiResponse<PaginatedResponse<Exam>>>(
      endpoints.exams.list,
      { params }
    );
  },

  /**
   * Get a single exam by ID
   */
  async getExamById(id: number | string): Promise<ApiResponse<Exam>> {
    return apiClient.get<ApiResponse<Exam>>(endpoints.exams.detail(id));
  },

  /**
   * Get featured exams
   */
  async getFeaturedExams(): Promise<ApiResponse<Exam[]>> {
    return apiClient.get<ApiResponse<Exam[]>>(endpoints.exams.list, {
      params: { featured: true }
    });
  },
};

export default examService;
