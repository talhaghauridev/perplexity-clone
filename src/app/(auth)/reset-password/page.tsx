import { ResetPasswordForm } from '@/components/auth/reset-password-form';
import { InvalidLinkCard } from '@/components/shared/invalid-link-card';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Reset Password',
  description: 'Reset your account password',
};

type PageProps = {
  searchParams: Promise<{
    email: string;
    token: string;
  }>;
};
export default async function Page({ searchParams }: PageProps) {
  const { email, token } = await searchParams;

  if (!token || !email) {
    return <InvalidLinkCard type="reset" />;
  }
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <ResetPasswordForm />
      </div>
    </div>
  );
}
