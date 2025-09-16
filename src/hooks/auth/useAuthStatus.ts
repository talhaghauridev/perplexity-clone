'use client';

import { STORAGE_KEYS } from '@/constants/storage-keys';
import { User } from '@/types/users';
import Cookies from 'js-cookie';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { toast } from 'sonner';

export function useAuthStatus() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const hasDetectedRef = useRef(false);

  const userData = useMemo(() => {
    try {
      const userCookie = Cookies.get(STORAGE_KEYS.AUTH.USER_DATA);
      if (userCookie) {
        return JSON.parse(userCookie) as User;
      }
      return null;
    } catch (error) {
      console.error('Failed to parse user data from cookie:', error);
      return null;
    }
  }, []);

  const urlParams = useMemo(() => {
    return {
      authStatus: searchParams.get('auth'),
      errorMessage: searchParams.get('error'),
    };
  }, [searchParams]);

  const showSuccessToast = useCallback(
    (user: User) => {
      const firstName = user.name;
      const provider = user.provider.charAt(0).toUpperCase() + user.provider.slice(1);

      toast.success(`Welcome back, ${firstName}!`, {
        description: `Successfully signed in with ${provider}.`,
        duration: 4000,
      });
    },
    [router]
  );

  const showErrorToast = useCallback(
    (errorMessage: string) => {
      toast.error('Sign in failed', {
        description: errorMessage,
        duration: 6000,
      });
    },
    [router]
  );

  const cleanSuccessParams = useCallback(() => {
    const url = new URL(window.location.href);
    url.searchParams.delete('auth');
    router.replace(url.pathname + url.search, { scroll: false });
  }, [router]);

  const cleanErrorParams = useCallback(() => {
    const url = new URL(window.location.href);
    url.searchParams.delete('error');
    router.replace(url.pathname + url.search, { scroll: false });
  }, [router]);

  useEffect(() => {
    if (hasDetectedRef.current) return;

    const { authStatus, errorMessage } = urlParams;

    if (!authStatus && !errorMessage) return;

    if (authStatus === 'success') {
      if (userData) {
        showSuccessToast(userData);
      }
      cleanSuccessParams();
    } else if (errorMessage) {
      showErrorToast(errorMessage);
      cleanErrorParams();
    }
    hasDetectedRef.current = true;
  }, [urlParams, userData, showSuccessToast, showErrorToast, cleanSuccessParams, cleanErrorParams]);
}
