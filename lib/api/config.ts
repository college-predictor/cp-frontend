// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/';

export const apiConfig = {
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
};

// API endpoints
export const endpoints = {
  colleges: {
    list: 'api/v1/colleges',
    detail: (id: number | string) => `/v1/colleges/${id}`,
    search: '/v1/colleges/search',
    filter: '/v1/colleges/filter',
  },
  exams: {
    list: '/v1/exams',
    detail: (id: number | string) => `/v1/exams/${id}`,
  },
  courses: {
    list: '/courses',
    detail: (id: number | string) => `/courses/${id}`,
  },
  predictor: {
    predict: '/predictor/predict',
  },
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    logout: '/auth/logout',
  },
};

export default apiConfig;
