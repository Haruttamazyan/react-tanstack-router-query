import { AxiosError } from 'axios';
import { z } from 'zod';

export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public code: string,
    public body: Record<string,string>
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export function handleApiError(error: unknown): never {
  if (error instanceof AxiosError) {
    throw new ApiError(
      error.response?.data?.message || error.response?.statusText,
      error.response?.status || 500,
      error.response?.data?.code || 'UNKNOWN_ERROR',
      error.response?.data || {}
    );
  }
  
  if (error instanceof z.ZodError) {
    throw new ApiError(
      'Invalid data received from server',
      400,
      'VALIDATION_ERROR',
      {}
    );
  }

  throw new ApiError(
    'An unexpected error occurred',
    500,
    'UNKNOWN_ERROR',
    {}
  );
}