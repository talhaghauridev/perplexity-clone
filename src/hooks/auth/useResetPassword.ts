import { authApi } from '@/lib/api/auth';
import {
  ResetPasswordFormValues,
  resetPasswordValidationSchema,
} from '@/validations/auth.validations';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

const initialValues: ResetPasswordFormValues = {
  password: '',
  confirmPassword: '',
};

const useResetPassword = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordValidationSchema),
    mode: 'onChange',
    defaultValues: initialValues,
  });

  const { mutateAsync, isPending, error, isSuccess } = useMutation({
    mutationFn: authApi.resetPassword,
    onError(error) {
      toast.error(error.message);
    },
  });

  const onSubmit = useCallback(
    async (values: ResetPasswordFormValues) => {
      const { password, confirmPassword } = values;

      const token = searchParams.get('token');
      const email = searchParams.get('email');

      if (!token || !email) {
        toast.error('Invalid Link');
        return;
      }
      const response = await mutateAsync({
        password,
        confirmPassword,
        token,
        email,
      });

      if (response?.success && response?.message) {
        form.reset();
        toast.success(response.message);
        router.replace('/sign-in');
      }
    },
    [router, searchParams]
  );

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    isLoading: isPending,
    error,
    isSuccess,
  };
};

export default useResetPassword;
