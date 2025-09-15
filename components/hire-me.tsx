'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Mail, ArrowRight } from 'lucide-react';

export function HireMeSection() {
  return (
    <section className='col-span-1 sm:col-span-6 lg:col-span-4 row-span-1 sm:row-span-2 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 backdrop-blur-xl p-6 border border-white/10 rounded-3xl'>
      <div className='flex items-center gap-3 w-full sm:w-auto'>
        <Button
          asChild
          className='bg-yellow-400/90 hover:bg-yellow-400 px-5 rounded-full font-medium text-black'>
          <Link href='/contact' aria-label='Hire me — go to contact page'>
            <span className='inline-flex items-center gap-2'>
              <Mail className='w-4 h-4' aria-hidden='true' />
              Hire Me
            </span>
          </Link>
        </Button>

        <Button
          variant='ghost'
          asChild
          className='hover:bg-yellow-400/90 rounded-full text-white/80 hover:text-white'>
          <Link href='/projects' aria-label='My project'>
            <span className='inline-flex items-center gap-1'>
              Browse my projects
              <ArrowRight className='w-4 h-4' aria-hidden='true' />
            </span>
          </Link>
        </Button>
      </div>
    </section>
  );
}
