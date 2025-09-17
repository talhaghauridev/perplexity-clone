import { Toaster } from '@/components/ui/sonner';
import Providers from '@/lib/providers';
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
  title: 'Claude - AI Assistant',
  description: 'Your AI assistant for conversations, projects, and more',
  generator: 'v0.app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${FKGrotesk.variable}`}>
      <body className="bg-background">
        <Toaster />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
