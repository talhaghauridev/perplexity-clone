import { STORAGE_KEYS } from '@/constants/storage-keys';
import { authApi } from '@/lib/api/auth';
import { useAuthStore } from '@/stores/auth-store';
import { LocalStorage } from '@/utils/local-storage';
import { SignInFormValues, signinValidationSchema } from '@/validations/auth.validations';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

const initialValues: SignInFormValues = {
  email: '',
  password: '',
};

const useSignIn = () => {
  const router = useRouter();
  const form = useForm<SignInFormValues>({
    resolver: zodResolver(signinValidationSchema),
    mode: 'onChange',
    defaultValues: initialValues,
  });

  const { setCredentials } = useAuthStore();

  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: authApi.login,
    onError(error) {
      toast.error(error.message);
    },
  });

  const onSubmit = useCallback(
    async (values: SignInFormValues) => {
      const { email, password } = values;
      console.log({ values });
      const response = await mutateAsync({
        email,
        password,
      });

      const { accessToken, user } = response?.data;

      if (!accessToken && !user && email) {
        LocalStorage.setItem(
          STORAGE_KEYS.AUTH.EMAIL_VERIFICATION_INFO,
          JSON.stringify({ email: response.data?.email })
        );
        form.reset();
        toast.success(response.message);
        return;
      }

      if (user && accessToken && !response.data?.email) {
        setCredentials(user, accessToken);
        form.reset();
        toast.success(response.message);
        router.replace('/');
      }
    },
    [router]
  );

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    isLoading: isPending,
    error,
  };
};

export default useSignIn;
