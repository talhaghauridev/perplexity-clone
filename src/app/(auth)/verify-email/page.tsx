import VerifyEmail from '@/components/auth/verify-email';
import { InvalidLinkCard } from '@/components/shared/invalid-link-card';

type PageProps = {
  searchParams: Promise<{
    email: string;
    token: string;
  }>;
};

export default async function VerifyEmailPage({ searchParams }: PageProps) {
  const { email, token } = await searchParams;

  if (!token || !email) {
    return <InvalidLinkCard type="verification" />;
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <VerifyEmail />
    </div>
  );
}
