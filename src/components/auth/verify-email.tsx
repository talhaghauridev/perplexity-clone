'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import useEmailVerification from '@/hooks/auth/useEmailVerification';
import { CheckCircle, XCircle } from 'lucide-react';
import { Spinner } from '../ui/spinner';

export default function VerifyEmail() {
  const { status, error } = useEmailVerification();

  if (status === 'loading') {
    return (
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="flex flex-col items-center gap-4 text-2xl">
            <Spinner
              className="h-8 w-8"
              variant="circle"
            />
            Verifying your email
          </CardTitle>
          <CardDescription>Please wait while we verify your account</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  if (status === 'success') {
    return (
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="flex flex-col items-center gap-4 text-2xl">
            <CheckCircle className="h-8 w-8 text-green-600" />
            Email verified successfully
          </CardTitle>
          <CardDescription>Your account is verified and ready to use</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <CardTitle className="flex flex-col items-center gap-4 text-2xl">
          <XCircle className="h-8 w-8 text-red-600" />
          Verification failed
        </CardTitle>
        <CardDescription>We couldn't verify your email address</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground text-center text-sm">
          {error?.message || 'The verification link may have expired or been used already.'}
        </p>
      </CardContent>
    </Card>
  );
}
