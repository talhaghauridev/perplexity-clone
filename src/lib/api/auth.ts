import { API_ENDPOINTS } from '@/constants/api-endpoints';
import { env } from '@/env';
import { ApiResponse } from '@/types';
import {
  AuthResponse,
  LoginResponse,
  SocialLoginPayload,
  UploadImageResponse,
  VerifyEmailPayload,
  RegisteResponse,
  ResetPasswordPayload,
} from '@/types/auth';
import axios from '@/utils/api-client';
import { createUrlWithQuery, tryCatchWrapper } from '@/utils/api-utils';
import {
  ForgotPasswordFormValues,
  SignInFormValues,
  SignUpFormValues,
} from '@/validations/auth.validations';

export const authApi = {
  login: tryCatchWrapper(async (credentials: SignInFormValues) => {
    const response = await axios.post<LoginResponse>(API_ENDPOINTS.AUTH.LOGIN, credentials);
    return response.data;
  }),

  signup: tryCatchWrapper(async (data: SignUpFormValues) => {
    const response = await axios.post<RegisteResponse>(API_ENDPOINTS.AUTH.REGISTER, data);

    return response.data;
  }),

  verifyEmail: tryCatchWrapper(async (payload: VerifyEmailPayload) => {
    const response = await axios.post<AuthResponse>(
      createUrlWithQuery(API_ENDPOINTS.AUTH.VERIFY_EMAIL, payload)
    );
    return response.data;
  }),

  socialLogin: tryCatchWrapper(async (credentials: SocialLoginPayload) => {
    const response = await axios.post<AuthResponse>(API_ENDPOINTS.AUTH.SOCIAL_LOGIN, credentials);
    return response.data;
  }),

  forgotPassword: tryCatchWrapper(async (payload: ForgotPasswordFormValues) => {
    const response = await axios.post<ApiResponse>(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, payload);
    return response.data;
  }),

  resetPassword: tryCatchWrapper(async ({ token, email, ...rest }: ResetPasswordPayload) => {
    const response = await axios.post<ApiResponse>(
      createUrlWithQuery(API_ENDPOINTS.AUTH.RESET_PASSWORD, { token, email }),
      rest
    );

    return response.data;
  }),

  uploadImage: tryCatchWrapper(async (file: any) => {
    const formData = new FormData();
    formData.append('profileImage', file);
    const response = await axios.post<UploadImageResponse>(
      API_ENDPOINTS.AUTH.UPLOAD_IMAGE,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  }),

  googleLoginUrl: tryCatchWrapper(async (payload: any) => {
    const response = await axios.get<{ authUrl: string }>(
      createUrlWithQuery(
        `${env.NEXT_PUBLIC_SITE_URL}/api/${API_ENDPOINTS.AUTH.GOOGLE_LOGIN_URL}`,
        payload
      )
    );
    return response.data;
  }),
};
