// components/home/NewsletterSection.tsx
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send } from 'lucide-react';

export default function NewsletterSection() {
  return (
    <section className='relative pb-32'>
      <div className='mx-auto px-6 container'>
        <div className='mx-auto max-w-4xl text-center'>
          <div className='relative'>
            <div className='absolute inset-0 bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-cyan-600/20 blur-3xl'></div>
            <div className='relative bg-white/5 backdrop-blur-xl p-16 border border-white/10 rounded-3xl'>
              <h2 className='mb-6 font-black text-5xl'>
                STAY IN THE
                <br />
                <span className='bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 text-transparent'>
                  LOOP
                </span>
              </h2>
              <p className='mx-auto mb-12 max-w-2xl text-white/70 text-xl'>
                Get exclusive insights on design, development, and the future of
                digital experiences.
              </p>
              <div className='flex sm:flex-row flex-col gap-4 mx-auto max-w-md'>
                <Input
                  placeholder='your@email.com'
                  className='bg-white/10 backdrop-blur-xl px-6 py-4 border-white/20 rounded-2xl text-white placeholder:text-white/50'
                />
                <Button className='bg-gradient-to-r from-purple-600 hover:from-purple-700 to-cyan-600 hover:to-cyan-700 px-8 py-4 rounded-2xl font-semibold'>
                  <Send className='mr-2 w-4 h-4' />
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
