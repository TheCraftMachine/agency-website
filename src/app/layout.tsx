import type { Metadata } from 'next';
import './globals.css';
import { SiteNav } from '@/components/layout/site-nav';
import { SiteFooter } from '@/components/layout/site-footer';
import { EntranceCurtain } from '@/components/entrance/entrance-curtain';
import { NextIntlClientProvider } from 'next-intl';

export const metadata: Metadata = {
  title: 'TheCraftMachine — Web Agency',
  description: 'We build digital machines that move people. Web design, brand identity, and film from Paris.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=clash-display@500,600,700&f[]=satoshi@400,500,700&display=swap"
        />
      </head>
      <body>
        <EntranceCurtain />
        <SiteNav />
        <main>
          <NextIntlClientProvider>{children}</NextIntlClientProvider>
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
