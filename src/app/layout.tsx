import type { Metadata } from 'next';
import { Syne, JetBrains_Mono } from 'next/font/google';
import { Toaster } from '@/components/ui/sonner';
import Navbar from '@/components/layout/Navbar';
import './globals.css';

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Imamuddin | Full Stack Dev Portfolio',
  description:
    'Java Full Stack learning journey — browse code snippets, projects and notes across HTML, CSS, JS, Java, Spring Boot, React, Python and more.',
  keywords: ['Java', 'Full Stack', 'Portfolio', 'React', 'Spring Boot', 'Python', 'Developer'],
  authors: [{ name: 'Imamuddin' }],
  openGraph: {
    title: 'Imamuddin | Full Stack Dev Portfolio',
    description: 'My complete Java Full Stack learning journey in code.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    /*
      suppressHydrationWarning is required on <html> because the Navbar
      reads localStorage on mount and sets data-theme — this causes a
      mismatch between SSR (data-theme="midnight-aurora") and the client
      value. suppressHydrationWarning silences that expected diff.
    */
    <html lang="en" data-theme="midnight-aurora" suppressHydrationWarning>
      <body className={`${syne.variable} ${jetbrainsMono.variable} antialiased`}>
        <Navbar />
        {/*
          IMPORTANT: <main> must NOT have position:relative or any
          z-index — these create a stacking context that can paint
          OVER the fixed Navbar dropdown panel.

          The globals.css body::before uses z-index:-1 for the
          background mesh, so no z-index escalation is needed here.
        */}
        <main>
          {children}
        </main>
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: 'var(--bg-elevated)',
              border: '1px solid var(--border-default)',
              color: 'var(--text-primary)',
              fontFamily: 'var(--font-sans)',
            },
          }}
        />
      </body>
    </html>
  );
}