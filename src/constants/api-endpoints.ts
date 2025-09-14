import { API_URL } from '@/utils/api-utils';

export const API_BASE_URL = `${API_URL}/api/v1`;

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    VERIFY_EMAIL: '/auth/verify-email',
    SOCIAL_LOGIN: '/auth/social-login',
    RESEND_EMAIL: '/auth/resend-email',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    REFRESH_TOKEN: '/auth/refresh-token',
    UPLOAD_IMAGE: '/auth/upload-image',
    GOOGLE_LOGIN_URL: '/auth/google/url',
  },

  USERS: {
    CURRENT_USER: '/users/profile',
    PROFILE: (userId: string) => `/users/${userId}`,
    UPDATE_PROFILE: '/users/me',
  },
};
