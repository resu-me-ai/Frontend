// API client configuration
// Base API client for NestJS backend HTTP requests (CRUD: jobs, resumes, subscriptions, auth)

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL ?? 'http://localhost:3000/api/v1';

export const apiClient = {
  baseURL: API_BASE_URL,
  
  async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    return response.json();
  },
};

