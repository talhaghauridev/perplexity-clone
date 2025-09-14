import { env } from '@/env';

export const buildQueryString = (params: Record<string, any>): string => {
  return Object.entries(params)
    .filter(([_, value]) => value !== undefined)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');
};

export const createUrlWithQuery = (baseUrl: string, params?: Record<string, any>): string => {
  if (!params) return baseUrl;
  const queryString = buildQueryString(params);
  return queryString ? `${baseUrl}?${queryString}` : baseUrl;
};

export const tryCatchWrapper = <T, Args extends any[]>(fn: (...args: Args) => Promise<T>) => {
  return async (...args: Args): Promise<T> => {
    try {
      return await fn(...args);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || error.message || 'An unknown error occurred';
      throw new Error(errorMessage);
    }
  };
};

export const API_URL = env.NEXT_PUBLIC_API_URL;
