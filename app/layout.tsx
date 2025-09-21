import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

import { InteractiveBackground } from '@/components/interactive-background';
import { Navigation } from '@/components/navigation';
import Footer from '@/components/footer';
import { getPersonalData } from '@/lib/wp-utils';
import { generateBasicSEOMetadata } from '@/components/seo';
import { getMenu } from '@/lib/get-menus';

const inter = Inter({ subsets: ['latin'] });

export async function generateMetadata(): Promise<Metadata> {
  const personal = await getPersonalData();

  return generateBasicSEOMetadata({
    title: `${personal.acf.name} Portfolio`,
    description: personal.acf.title__headline,
    image: personal.acf.images?.[0]?.full_image_url || '/images/default-og.jpg',
    url: '/',
    type: 'website',
  });
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const personal = await getPersonalData();
  const menu = await getMenu();

  return (
    <html lang='en'>
      <body className={inter.className}>
        <div className='relative bg-black min-h-screen overflow-hidden text-white'>
          <InteractiveBackground />
          <Navigation
            items={menu}
            logo={personal.acf.logo.url}
            name={personal.acf.name}
          />
          <div className='z-10 relative'>{children}</div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
