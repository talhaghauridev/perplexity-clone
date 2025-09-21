import { STORAGE_KEYS } from '@/constants/storage-keys';
import { authApi } from '@/lib/api/auth';
import { LocalStorage } from '@/utils/local-storage';
import { SignUpFormValues, signupValidationSchema } from '@/validations/auth.validations';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

const initialValues: SignUpFormValues = {
  email: '',
  password: '',
  name: '',
};

const useSignup = () => {
  const router = useRouter();
  const [isSuccess, setSuccess] = useState(false);
  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signupValidationSchema),
    mode: 'onSubmit',
    defaultValues: initialValues,
  });

  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: authApi.signup,
    onError(error) {
      toast.error(error.message);
    },
  });

  const onSubmit = useCallback(
    async (values: SignUpFormValues) => {
      const payload = {
        name: values.name,
        email: values.email,
        password: values.password,
      };

      const { message, data } = await mutateAsync(payload);

      if (data && data?.email) {
        LocalStorage.setItem(
          STORAGE_KEYS.AUTH.EMAIL_VERIFICATION_INFO,
          JSON.stringify({ email: data?.email })
        );

        form.reset();
        toast.success(message);
        setSuccess(true);
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

export default useSignup;
