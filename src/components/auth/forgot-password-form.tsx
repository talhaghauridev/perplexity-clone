'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import useForgotPassword from '@/hooks/auth/useForgotPassword';
import Link from 'next/link';
import { FormInput } from '../shared/input-form';
import { Form } from '../ui/form';

export function ForgotPasswordForm() {
  const { form, isLoading, onSubmit } = useForgotPassword();

  return (
    <div className="flex flex-col items-center gap-6">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl">Forgot Password</CardTitle>
          <CardDescription>Enter your email to receive a password reset link</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={onSubmit}
              className="flex flex-col gap-6">
              <FormInput
                control={form.control}
                name="email"
                label="Email"
                type="email"
                placeholder="name@example.com"
                disabled={isLoading}
              />
              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}>
                {isLoading ? 'Sending...' : 'Send reset link'}
              </Button>
              <div className="text-center text-sm">
                Remember your password?{' '}
                <Link
                  href="/sign-in"
                  className="underline underline-offset-4">
                  Sign in
                </Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
