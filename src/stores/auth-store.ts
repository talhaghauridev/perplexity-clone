import { createWithEqualityFn } from 'zustand/traditional';
import { shallow } from 'zustand/shallow';
import { STORAGE_KEYS } from '@/constants/storage-keys';
import { User } from '@/types/users';
import Cookies from 'js-cookie';

const COOKIE_OPTIONS = {
  expires: 30,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  path: '/',
};

interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isInitialized: boolean;
  error: string | null;
  initializeAuth: () => Promise<void>;
  setCredentials: (user: User, token: string) => void;
  setUser: (user: User) => void;
  setToken: (token: string) => void;
  logout: () => void;
}

const initialValues = {
  user: null,
  accessToken: null,
  isAuthenticated: false,
  isLoading: false,
  isInitialized: false,
  error: null,
};

export const useAuthStoreInternal = createWithEqualityFn<AuthState>()(
  set => ({
    ...initialValues,
    initializeAuth: async () => {
      set({ isLoading: true, isInitialized: false });
      try {
        const [userData, token] = await Promise.all([
          Cookies.get(STORAGE_KEYS.AUTH.USER_DATA),
          Cookies.get(STORAGE_KEYS.AUTH.ACCESS_TOKEN),
        ]);

        if (userData && token) {
          const user = JSON.parse(userData);
          set({
            user,
            accessToken: token,
            isAuthenticated: true,
            isLoading: false,
            isInitialized: true,
            error: null,
          });
        } else {
          set({
            isLoading: false,
            isInitialized: true,
            error: 'No user data found',
          });
        }
      } catch (error) {
        set({
          isLoading: false,
          isInitialized: true,
          error: 'Failed to load user data',
        });
      }
    },

    setCredentials: (user, token) => {
      set({
        user,
        accessToken: token,
        isAuthenticated: true,
        error: null,
      });
      Cookies.set(STORAGE_KEYS.AUTH.USER_DATA, JSON.stringify(user), COOKIE_OPTIONS);
      Cookies.set(STORAGE_KEYS.AUTH.ACCESS_TOKEN, token, COOKIE_OPTIONS);
    },

    setUser: user => {
      set({ user, isAuthenticated: true, error: null });
      Cookies.set(STORAGE_KEYS.AUTH.USER_DATA, JSON.stringify(user), COOKIE_OPTIONS);
    },

    setToken: async token => {
      set({ accessToken: token, error: null });
      Cookies.set(STORAGE_KEYS.AUTH.ACCESS_TOKEN, token, COOKIE_OPTIONS);
    },

    logout: () => {
      set(state => ({ ...state, isLoading: true }));
      Cookies.remove(STORAGE_KEYS.AUTH.USER_DATA, COOKIE_OPTIONS);
      Cookies.remove(STORAGE_KEYS.AUTH.ACCESS_TOKEN, COOKIE_OPTIONS);
      set({
        user: null,
        accessToken: null,
        isAuthenticated: false,
        error: null,
        isLoading: false,
      });
    },
  }),
  shallow
);

export const useAuthStore = () =>
  useAuthStoreInternal(
    state => ({
      user: state.user,
      accessToken: state.accessToken,
      isAuthenticated: state.isAuthenticated,
      isLoading: state.isLoading,
      isInitialized: state.isInitialized,
      error: state.error,
      initializeAuth: state.initializeAuth,
      setCredentials: state.setCredentials,
      setUser: state.setUser,
      setToken: state.setToken,
      logout: state.logout,
    }),
    shallow
  );
