import { authApi } from '@/lib/api/auth';
import {
  ForgotPasswordFormValues,
  forgotPasswordValidationSchema,
} from '@/validations/auth.validations';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

const initialValues: ForgotPasswordFormValues = {
  email: '',
};

const useForgotPassword = () => {
  const router = useRouter();
  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordValidationSchema),
    mode: 'onSubmit',
    defaultValues: initialValues,
  });

  const { mutateAsync, isPending, error, isSuccess } = useMutation({
    mutationFn: authApi.forgotPassword,
    onError(error) {
      toast.error(error.message);
    },
  });

  const onSubmit = useCallback(
    async (values: ForgotPasswordFormValues) => {
      const { email } = values;
      const response = await mutateAsync({
        email,
      });

      if (response?.success && response?.message) {
        form.reset();
        toast.success(response.message);
      }
    },
    [router]
  );

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    isLoading: isPending,
    error,
    isSuccess,
  };
};

export default useForgotPassword;
