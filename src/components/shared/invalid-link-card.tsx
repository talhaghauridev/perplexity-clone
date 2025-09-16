import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LucideIcon, Mail, Key, Link as LinkIcon, KeyRound } from 'lucide-react';
import Link from 'next/link';

interface InvalidLinkCardProps {
  type?: 'verification' | 'reset' | 'generic';
  title?: string;
  description?: string;
  message?: string;
  buttonText?: string;
  buttonHref?: string;
  icon?: LucideIcon;
}

export function InvalidLinkCard({
  type = 'generic',
  title,
  description,
  message,
  buttonText,
  buttonHref,
  icon: Icon,
}: InvalidLinkCardProps) {
  const configs = {
    verification: {
      title: 'Invalid verification link',
      description: 'This link is not valid',
      message: 'The verification link appears to be invalid or malformed.',
      buttonText: 'Go to sign in',
      buttonHref: '/sign-in',
      icon: Mail,
    },
    reset: {
      title: 'Invalid reset link',
      description: 'This password reset link is not valid',
      message: 'The reset link appears to be invalid, expired, or already used.',
      buttonText: 'Request new reset link',
      buttonHref: '/forgot-password',
      icon: KeyRound,
    },
    generic: {
      title: 'Invalid link',
      description: 'This link is not valid',
      message: 'The link appears to be invalid or malformed.',
      buttonText: 'Go back',
      buttonHref: '/',
      icon: KeyRound,
    },
  };

  const config = configs[type];
  const FinalIcon = Icon || config.icon;

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="flex flex-col items-center gap-4 text-2xl">
            <FinalIcon className="h-9 w-9 text-gray-400" />
            {title || config.title}
          </CardTitle>
          <CardDescription>{description || config.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground text-center text-sm">{message || config.message}</p>
          <Button
            asChild
            variant="outline"
            className="w-full">
            <Link href={buttonHref || config.buttonHref}>{buttonText || config.buttonText}</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
