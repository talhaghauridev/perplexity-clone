'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import useSignIn from '@/hooks/auth/useSignIn';
import Logo from '@/lib/logo';
import { Label } from '@radix-ui/react-label';
import Link from 'next/link';
import { useState } from 'react';
import ContentSplitBar from '../shared/content-split-bar';
import { FormInput } from '../shared/input-form';
import SocialLoginButton from '../shared/social-login-buttons';
import { Form } from '../ui/form';

export function SignInForm() {
  const { form, onSubmit, isLoading } = useSignIn();
  const [socialLoading, setSocialLoading] = useState(false);
  return (
    <div className="flex flex-col items-center gap-6">
      <Logo className="w-[200px]" />
      <Card className="w-full">
        <CardHeader className="text-center">
          <CardTitle className="flex flex-col items-center justify-center gap-4 text-2xl">
            Welcome back
          </CardTitle>
          <CardDescription>Sign in to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={onSubmit}
              className="flex flex-col gap-4">
              <FormInput
                control={form.control}
                name="email"
                label="Email"
                type="email"
                placeholder="name@example.com"
                disabled={isLoading}
              />
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label
                    htmlFor="password"
                    className="text-[13.5px]">
                    Password
                  </Label>
                  <Link
                    href="/forgot-password"
                    className="ml-auto inline-block text-[13px] underline-offset-4 hover:underline">
                    Forgot password?
                  </Link>
                </div>

                <FormInput
                  control={form.control}
                  name="password"
                  type="password"
                  placeholder="********"
                  disabled={isLoading}
                />
              </div>
              <Button
                type="submit"
                className="w-full"
                disabled={isLoading || socialLoading}>
                {isLoading ? 'Logging in...' : 'Sign In'}
              </Button>
            </form>
          </Form>
          <ContentSplitBar
            containerClassName="my-[20px]"
            text="Or continue with"
          />
          <SocialLoginButton
            onFormReset={() => form.clearErrors()}
            isLoading={isLoading}
            setLoading={setSocialLoading}
          />
          <div className="mt-6 text-center text-sm">
            Don&apos;t have an account?{' '}
            <Link
              href="/sign-up"
              className="underline underline-offset-4">
              Sign Up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
