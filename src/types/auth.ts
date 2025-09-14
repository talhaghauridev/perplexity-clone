import { AvailableOAuthProviders } from '@/constants/constants';
import { ApiResponse } from '.';
import { User } from './users';
import { ResetPasswordFormValues } from '@/validations/auth.validations';

type AuthResponse = ApiResponse<{
  user: User;
  accessToken: string;
}>;

type UploadImageResponse = ApiResponse<{
  public_id: string;
  url: string;
}>;

type LoginResponse = ApiResponse<{
  user?: User;
  accessToken?: string;
  email?: string;
}>;

type RegisteResponse = ApiResponse<{ email: string }>;

type VerifyEmailPayload = {
  token: string;
  email: string;
};

type ForgotPasswordPayload = {
  email: string;
};

type ResetPasswordPayload = ResetPasswordFormValues & {
  token: string;
  email: string;
};
type SocialLoginPayload = {
  name: string;
  email: string;
  profilePicture: string;
  provider: OAuthProvider;
};

type OAuthProvider = (typeof AvailableOAuthProviders)[number];

export type {
  AuthResponse,
  OAuthProvider,
  SocialLoginPayload,
  UploadImageResponse,
  VerifyEmailPayload,
  LoginResponse,
  RegisteResponse,
  ResetPasswordPayload,
};
