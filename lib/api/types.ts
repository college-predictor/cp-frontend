// API Types and Interfaces

export interface College {
  id: number;
  name: string;
  shortName: string;
  location: string;
  state: string;
  rating: number;
  reviews: number;
  type: 'Public' | 'Private' | 'Deemed';
  category: string;
  established: number;
  fees: string;
  placement: string;
  ranking: number;
  featured: boolean;
  courses: number;
  students: number;
  image?: string;
  description?: string;
  website?: string;
  email?: string;
  phone?: string;
}

export interface CollegeFilters {
  search?: string;
  state?: string;
  type?: string;
  category?: string;
  sortBy?: 'ranking' | 'rating' | 'fees' | 'placement';
  page?: number;
  limit?: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

export interface CollegeListResponse {
  colleges: College[];
  total: number;
  page: number;
  size: number;
}

export interface FilterOptions {
  states?: string[];
  types?: string[];
  categories?: string[];
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface Exam {
  id: number;
  name: string;
  shortName: string;
  description: string;
  examDate: string;
  applicationDeadline: string;
  eligibility: string;
  type: string;
  level: string;
  conductedBy: string;
  featured: boolean;
}

export interface Course {
  id: number;
  name: string;
  description: string;
  duration: string;
  type: string;
  category: string;
  eligibility: string;
  averageFees: string;
  averageSalary: string;
}
