'use client';

import { User } from '@/types/users';
import { useAuthStoreInternal } from '@/stores/auth-store';
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isInitialized: boolean;
  error: string | null;
}

interface AuthContextType extends AuthState {}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
  user?: User | null;
  accessToken?: string | null;
}

export function AuthProvider({
  children,
  user: serverUser = null,
  accessToken: serverToken = null,
}: AuthProviderProps) {
  const store = useAuthStoreInternal();

  const [hasInitializedFromCookies, setHasInitializedFromCookies] = useState(false);

  useEffect(() => {
    if (serverUser && serverToken) {
      setHasInitializedFromCookies(true);
      return;
    }

    if (!hasInitializedFromCookies) {
      store.initializeAuth().then(() => {
        setHasInitializedFromCookies(true);
      });
    }
  }, [serverUser, serverToken, hasInitializedFromCookies, store]);

  const contextValue: AuthContextType = {
    user: store.user || serverUser,
    accessToken: store.accessToken || serverToken,
    isAuthenticated: !!(serverUser && serverToken) || store.isAuthenticated,
    isLoading: serverUser && serverToken ? false : store.isLoading,
    isInitialized: serverUser && serverToken ? true : store.isInitialized,
    error: serverUser && serverToken ? null : store.error,
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}

export function useAuthState(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthState must be used within an AuthProvider');
  }
  return context;
}

export function useAuthActions() {
  const store = useAuthStoreInternal();
  return {
    setCredentials: store.setCredentials,
    setUser: store.setUser,
    setToken: store.setToken,
    logout: store.logout,
    initializeAuth: store.initializeAuth,
  };
}
