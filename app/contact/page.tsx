import { Metadata } from 'next';
import { getPersonalData } from '@/lib/wp-utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Send } from 'lucide-react';

export async function generateMetadata(): Promise<Metadata> {
  const personal = await getPersonalData();

  return {
    title: 'Contact - John Doe',
    description: 'Get in touch for collaborations or inquiries.',
    openGraph: {
      title: 'Contact - John Doe',
      description: 'Get in touch for collaborations or inquiries.',
      url: '/contact',
      type: 'website',
    },
  };
}

export default async function ContactPage() {
  const personal = await getPersonalData();

  return (
    <div className='relative min-h-screen overflow-hidden text-white'>
      <main className='z-10 relative mx-auto px-4 py-20 max-w-md container'>
        <h1 className='bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 mb-8 font-black text-transparent text-5xl text-center'>
          Get in Touch
        </h1>

        <form className='space-y-6 bg-white/5 backdrop-blur-xl p-8 border border-white/10 rounded-3xl'>
          <Input
            placeholder='Your Name'
            className='bg-white/10 border-white/20 text-white placeholder:text-white/50'
          />
          <Input
            type='email'
            placeholder='Your Email'
            className='bg-white/10 border-white/20 text-white placeholder:text-white/50'
          />
          <Textarea
            placeholder='Your Message'
            className='bg-white/10 border-white/20 min-h-[150px] text-white placeholder:text-white/50'
          />
          <Button
            type='submit'
            className='bg-gradient-to-r from-purple-600 hover:from-purple-700 to-cyan-600 hover:to-cyan-700 w-full'>
            <Send className='mr-2 w-4 h-4' /> Send Message
          </Button>
        </form>

        <div className='mt-8 text-white/70 text-center'>
          <p>Or email directly: {personal.button_url.replace('mailto:', '')}</p>
        </div>
      </main>
    </div>
  );
}
