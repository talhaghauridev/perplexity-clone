import { authApi } from '@/lib/api/auth';
import { usePathname } from 'next/navigation';
import { Dispatch, memo, SetStateAction, useEffect, useState } from 'react';
import { FaGoogle } from 'react-icons/fa6';
import { Button } from '../ui/button';
import { Spinner } from '../ui/spinner';

type SocialLoginButtonProps = {
  isLoading: boolean;
  setLoading?: Dispatch<SetStateAction<boolean>>;
  onFormReset?: () => void;
};

const SocialLoginButton = ({
  isLoading: formIsLoading,
  setLoading,
  onFormReset,
}: SocialLoginButtonProps) => {
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const pathname = usePathname();

  const handleGoogleLogin = async () => {
    if (onFormReset) {
      onFormReset();
    }
    try {
      setIsGoogleLoading(true);
      const res = await authApi.googleLoginUrl({
        returnTo: '/',
        errorTo: pathname,
      });
      if (res?.authUrl) {
        window.location.href = res.authUrl;
      }
    } catch (error) {
      setIsGoogleLoading(false);
    }
  };

  useEffect(() => {
    if (setLoading) {
      setLoading(isGoogleLoading);
    }
  }, [isGoogleLoading]);

  return (
    <div className="flex flex-col gap-4">
      <Button
        variant="outline"
        type="button"
        className="w-full"
        disabled={formIsLoading || isGoogleLoading}
        onClick={handleGoogleLogin}>
        {isGoogleLoading ? (
          <Spinner
            className="mr-2 h-4 w-4"
            variant="circle-filled"
          />
        ) : (
          <FaGoogle className="mr-2 h-4 w-4" />
        )}
        Sign In with Google
      </Button>
    </div>
  );
};

export default memo(SocialLoginButton);
