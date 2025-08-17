export const dynamic = 'force-static';

import { Metadata } from 'next';
import { getPersonalData } from '@/lib/wp-utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Send, Mail, Globe, Phone, MapPin } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { generateBasicSEOMetadata } from '@/components/seo';

export async function generateMetadata(): Promise<Metadata> {
  const personal = await getPersonalData();

  return generateBasicSEOMetadata({
    title: `Contact - ${personal.acf.name}`,
    description: 'Get in touch for collaborations or inquiries.',
    image: personal.acf.images?.[0]?.full_image_url || '/images/default-og.jpg',
    url: '/contact',
    type: 'website',
  });
}

export default async function ContactPage() {
  const personal = await getPersonalData();

  const socialList = personal.acf.social_media_comma_seperated
    ? personal.acf.social_media_comma_seperated
        .split(',')
        .map((s) => s.trim().toLowerCase())
    : [];

  const profileImage =
    personal.acf.images?.[0]?.full_image_url ||
    '/placeholder.svg?height=200&width=200';

  // Assuming button_url is mailto:email, extract email
  const email = personal.acf.button_url.replace('mailto:', '');

  // Placeholder for other info; adjust if more fields are added to ACF
  const phone = '+1 (555) 123-4567'; // Add to ACF if needed
  const location = 'San Francisco, CA'; // Add to ACF if needed

  return (
    <div className='relative min-h-screen overflow-hidden text-white'>
      <main className='z-10 relative mx-auto px-4 py-20 max-w-6xl container'>
        <div className='gap-12 grid grid-cols-1 lg:grid-cols-2'>
          {/* Contact Info Section */}
          <div className='space-y-8'>
            <h1 className='bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 mb-4 font-black text-transparent text-5xl'>
              Get in Touch
            </h1>
            <p className='text-white/70 text-xl'>
              {personal.acf.title__headline}
            </p>
            <div className='flex items-center space-x-4'>
              <Image
                src={profileImage}
                alt={personal.acf.name}
                width={100}
                height={100}
                className='rounded-full'
              />
              <div>
                <h2 className='font-bold text-2xl'>{personal.acf.name}</h2>
                <p className='text-white/70'>
                  Let's collaborate on your next project!
                </p>
              </div>
            </div>
            <div className='space-y-4'>
              <div className='flex items-center space-x-3'>
                <Mail className='w-5 h-5 text-cyan-400' />
                <Link
                  href={personal.acf.button_url}
                  className='text-white/90 hover:text-cyan-300'>
                  {email}
                </Link>
              </div>
              <div className='flex items-center space-x-3'>
                <Phone className='w-5 h-5 text-cyan-400' />
                <span>{phone}</span>
              </div>
              <div className='flex items-center space-x-3'>
                <MapPin className='w-5 h-5 text-cyan-400' />
                <span>{location}</span>
              </div>
              <div className='flex items-center space-x-3'>
                <Globe className='w-5 h-5 text-cyan-400' />
                <div className='flex space-x-4'>
                  {socialList.map((social, i) => (
                    <Link
                      key={i}
                      href={`https://${social}.com/yourusername`} // Adjust to actual URLs if stored
                      className='text-white/70 hover:text-cyan-300 capitalize'>
                      {social}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form Section */}
          <div className='bg-white/5 backdrop-blur-xl p-8 border border-white/10 rounded-3xl'>
            <form className='space-y-6'>
              <Input
                placeholder='Your Name'
                className='bg-white/10 border-white/20 text-white placeholder:text-white/50'
              />
              <Input
                type='email'
                placeholder='Your Email'
                className='bg-white/10 border-white/20 text-white placeholder:text-white/50'
              />
              <Input
                placeholder='Subject'
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
          </div>
        </div>
      </main>
    </div>
  );
}
