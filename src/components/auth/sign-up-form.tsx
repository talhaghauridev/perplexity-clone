'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import useSignup from '@/hooks/auth/useSignUp';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useState } from 'react';
import ContentSplitBar from '../shared/content-split-bar';
import { FormInput } from '../shared/input-form';
import SocialLoginButton from '../shared/social-login-buttons';
import { Form } from '../ui/form';
import Logo from '@/lib/logo';

export function SignUpForm() {
  const { isLoading, form, onSubmit, isSuccess } = useSignup();
  const [socialLoading, setSocialLoading] = useState(false);

  if (isSuccess) {
    return <SuccessCard />;
  }

  return (
    <div className="flex flex-col items-center gap-6">
      <Logo className="w-[200px]" />

      <Card className="w-full">
        <CardHeader className="text-center">
          <CardTitle className="flex flex-col items-center justify-center gap-4 text-2xl">
            Create an account
          </CardTitle>
          <CardDescription>Enter your details below to get started</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={onSubmit}
              className="flex flex-col gap-4">
              <FormInput
                control={form.control}
                name="name"
                label="Name"
                type="text"
                placeholder="Full name"
                disabled={isLoading}
              />
              <FormInput
                control={form.control}
                name="email"
                label="Email"
                type="email"
                placeholder="name@example.com"
                disabled={isLoading}
              />
              <FormInput
                control={form.control}
                name="password"
                label="Password"
                type="password"
                placeholder="********"
                disabled={isLoading}
              />
              <Button
                type="submit"
                className="w-full"
                disabled={isLoading || socialLoading}>
                {isLoading ? 'Creating account...' : 'Sign Up'}
              </Button>
            </form>
          </Form>
          <ContentSplitBar
            containerClassName="my-3.5"
            text="Or continue with"
          />
          <SocialLoginButton
            onFormReset={() => form.clearErrors()}
            isLoading={isLoading}
            setLoading={setSocialLoading}
          />
        </CardContent>
        <div className="flex flex-col items-center gap-2 px-6 pt-0">
          <div className="text-sm">
            Already have an account?{' '}
            <Link
              href="/sign-in"
              className="underline underline-offset-4">
              Sign In
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
}

const SuccessCard = () => (
  <div className={cn('flex flex-col items-center gap-6')}>
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Thank you for signing up!</CardTitle>
        <CardDescription>Check your email to confirm</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground text-sm">
          You&apos;ve successfully signed up. Please check your email to confirm your account.
        </p>
      </CardContent>
    </Card>
  </div>
);
