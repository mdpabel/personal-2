import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

import { InteractiveBackground } from '@/components/interactive-background';
import { Navigation } from '@/components/navigation';
import Footer from '@/components/footer';
import { getPersonalData } from '@/lib/wp-utils';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'John Doe Portfolio',
  description: 'Digital craftsman pushing the boundaries of web experiences',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const personal = await getPersonalData();

  return (
    <html lang='en'>
      <body className={inter.className}>
        <div className='relative bg-black min-h-screen overflow-hidden text-white'>
          <InteractiveBackground />
          <Navigation logo={personal.logo.url} name={personal.name} />
          <div className='z-10 relative'>{children}</div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
