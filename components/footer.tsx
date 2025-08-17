import Link from 'next/link';
import Image from 'next/image';
import {
  Github,
  Twitter,
  Linkedin,
  Mail,
  Facebook,
  Instagram,
  Youtube,
  Music,
} from 'lucide-react';
import { getPersonalData } from '@/lib/wp-utils';

export default async function Footer() {
  const personal = await getPersonalData();

  const socialMap = {
    github: {
      icon: <Github className='w-5 h-5' />,
      color: 'hover:text-purple-400',
    },
    twitter: {
      icon: <Twitter className='w-5 h-5' />,
      color: 'hover:text-cyan-400',
    },
    linkedin: {
      icon: <Linkedin className='w-5 h-5' />,
      color: 'hover:text-blue-400',
    },
    mail: { icon: <Mail className='w-5 h-5' />, color: 'hover:text-pink-400' },
    facebook: {
      icon: <Facebook className='w-5 h-5' />,
      color: 'hover:text-blue-600',
    },
    instagram: {
      icon: <Instagram className='w-5 h-5' />,
      color: 'hover:text-pink-500',
    },
    youtube: {
      icon: <Youtube className='w-5 h-5' />,
      color: 'hover:text-red-600',
    },
    tiktok: {
      icon: <Music className='w-5 h-5' />,
      color: 'hover:text-black',
    },
  };

  const getPlatform = (url: string) => {
    const lowerUrl = url.toLowerCase();
    if (lowerUrl.includes('github.com')) return 'github';
    if (lowerUrl.includes('twitter.com') || lowerUrl.includes('x.com'))
      return 'twitter';
    if (lowerUrl.includes('linkedin.com')) return 'linkedin';
    if (lowerUrl.includes('mailto:')) return 'mail';
    if (lowerUrl.includes('facebook.com')) return 'facebook';
    if (lowerUrl.includes('instagram.com')) return 'instagram';
    if (lowerUrl.includes('youtube.com')) return 'youtube';
    if (lowerUrl.includes('tiktok.com')) return 'tiktok';
    return null;
  };

  const socialList = personal.acf.social_media_comma_seperated
    ? personal.acf.social_media_comma_seperated.split(',').map((s) => s.trim())
    : [];

  const quickLinks = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Projects', href: '/projects' },
    { label: 'Case Studies', href: '/case-studies' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' },
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer className='bg-black/30 backdrop-blur-xl py-12 border-white/20 border-t'>
      <div className='mx-auto px-6 max-w-7xl container'>
        <div className='gap-12 grid grid-cols-1 md:grid-cols-3 mb-8'>
          {/* Logo and Description */}
          <div className='flex flex-col space-y-4'>
            <Link href='/' className='flex items-center space-x-3'>
              <Image
                src={personal.acf.logo.url}
                alt={personal.acf.name}
                width={40}
                height={40}
                className='border border-white/20 rounded-full'
              />
              <span className='bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 font-bold text-transparent text-xl'>
                {personal.acf.name}
              </span>
            </Link>
            <p className='text-white/60 text-sm'>
              {personal.acf.title__headline}
            </p>
          </div>

          {/* Quick Links */}
          <div className='flex flex-col space-y-4'>
            <h3 className='font-semibold text-white text-lg'>Quick Links</h3>
            <ul className='gap-2 grid grid-cols-2'>
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className='block text-white/60 hover:text-white text-sm transition-colors'>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div className='flex flex-col space-y-4'>
            <h3 className='font-semibold text-white text-lg'>Connect</h3>
            <div className='flex flex-wrap gap-3'>
              {socialList.map((url, i) => {
                const platform = getPlatform(url);
                const social = platform
                  ? socialMap[platform as keyof typeof socialMap]
                  : null;
                if (!social) return null;
                return (
                  <Link
                    key={i}
                    href={url}
                    className={`w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center transition-all hover:scale-105 hover:border-white/20 ${social.color}`}>
                    {social.icon}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        <div className='pt-6 border-white/10 border-t text-white/40 text-xs text-center'>
          © {currentYear} {personal.acf.name}. Crafted with passion and pixels.
        </div>
      </div>
    </footer>
  );
}
