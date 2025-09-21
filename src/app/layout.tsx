import { Toaster } from '@/components/ui/sonner';
import { AuthProvider } from '@/lib/auth-provider';
import Providers from '@/lib/providers';
import { getAuthenticatedUser } from '@/utils/get-user';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import type React from 'react';
import './globals.css';

const FKGrotesk = localFont({
  src: './fonts/FKGrotesk.woff2',
  display: 'swap',
  preload: true,
  variable: '--font-FKGrotesk',
  fallback: ['system-ui', 'arial'],
});

export const metadata: Metadata = {
  title: {
    default: 'Perplexity',
    template: '%s - Perplexity',
  },
  description:
    'Ask anything and get instant, accurate answers powered by AI. Search the web with conversational AI that provides real-time, cited responses.',
  keywords: [
    'AI search',
    'search engine',
    'AI answers',
    'perplexity',
    'question answering',
    'real-time search',
    'AI research',
    'conversational search',
  ],
  authors: [{ name: 'Talha Ghauri' }],
  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user, accessToken } = await getAuthenticatedUser();

  return (
    <html
      lang="en"
      className={`${FKGrotesk.variable}`}>
      <body className="bg-background">
        <Toaster />
        <AuthProvider
          user={user}
          accessToken={accessToken}>
          <Providers>{children}</Providers>
        </AuthProvider>
      </body>
    </html>
  );
}
