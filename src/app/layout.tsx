import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { DeepgramContextProvider } from '@/lib/contexts/DeepgramContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AI Image Generator',
  description: 'Generate images using voice or text input',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <DeepgramContextProvider>
          {children}
        </DeepgramContextProvider>
      </body>
    </html>
  );
}
