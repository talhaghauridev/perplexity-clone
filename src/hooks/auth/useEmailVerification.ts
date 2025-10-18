import { authApi } from '@/lib/api/auth';
import { useAuthStore } from '@/stores/auth-store';
import { useMutation } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

type StatusType = 'loading' | 'success' | 'error' | 'invalid';

const useEmailVerification = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<StatusType>('loading');
  const { setCredentials } = useAuthStore();

  const token = searchParams.get('token');
  const email = searchParams.get('email');

  const { mutateAsync: verifyEmail, error } = useMutation({
    mutationFn: authApi.verifyEmail,
  });

  const handleVerification = async () => {
    if (!token || !email) {
      setStatus('invalid');
      return;
    }

    try {
      setStatus('loading');
      const { success, data, message } = await verifyEmail({ token, email });

      if (success) {
        setCredentials(data.user, data.accessToken);
        setStatus('success');
        toast.success(message || 'Email verified successfully!');

        setTimeout(() => {
          router.replace('/');
        }, 1500);
      } else {
        setStatus('error');
      }
    } catch (error: any) {
      setStatus('error');
    }
  };

  useEffect(() => {
    if (!token || !email) {
      setStatus('invalid');
      return;
    }

    handleVerification();
  }, [token, email]);

  const retryVerification = () => {
    handleVerification();
  };

  return {
    status,
    retryVerification,
    error,
  };
};

export default useEmailVerification;
