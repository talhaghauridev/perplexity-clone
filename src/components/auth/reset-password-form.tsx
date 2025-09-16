'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import useResetPassword from '@/hooks/auth/useResetPassword';
import { FormInput } from '../shared/input-form';
import { Form } from '../ui/form';

export function ResetPasswordForm() {
  const { form, isLoading, onSubmit } = useResetPassword();

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Reset Password</CardTitle>
          <CardDescription>Enter a new password for your account</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={onSubmit}>
              <div className="flex flex-col gap-6">
                <FormInput
                  control={form.control}
                  name="password"
                  label="New password"
                  type="password"
                  placeholder="Enter new password"
                  disabled={isLoading}
                />

                <FormInput
                  control={form.control}
                  name="confirmPassword"
                  label="Confirm password"
                  type="password"
                  placeholder="Confirm new password"
                  disabled={isLoading}
                />

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoading}>
                  {isLoading ? 'Updating password...' : 'Update password'}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
