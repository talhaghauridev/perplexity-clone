import { ApiResponse } from '.';
import { OAuthProvider } from './auth';

export interface User {
  id: string;
  email: string;
  name: string;

  profilePicture?: string;

  isVerified: boolean;

  createdAt: string;
  updatedAt: string;
  provider: OAuthProvider;
}

export interface CurrentUserResponse extends ApiResponse {
  user: User;
}

export interface UpdateProfileResponse extends ApiResponse {
  user: User;
}
