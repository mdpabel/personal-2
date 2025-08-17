import Link from 'next/link';
import Image from 'next/image';
import {
  Github,
  Twitter,
  Linkedin,
  Mail,
  ArrowUpRight,
  Facebook,
  Instagram,
  Youtube,
  Music,
} from 'lucide-react';
import { MusicPlayer } from '@/components/music-player';
import { PersonalInfoACF } from '@/types/wp';

interface HeroSectionProps {
  personal: PersonalInfoACF;
  firstName: string;
  lastName: string;
  totalProjects: number;
  yearsExperience: number;
  socialList: string[];
  profileImage: string;
}

export default function HeroSection({
  personal,
  firstName,
  lastName,
  totalProjects,
  yearsExperience,
  socialList,
  profileImage,
}: HeroSectionProps) {
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

  return (
    <section className='relative flex justify-center items-center mt-5 min-h-screen'>
      <div className='mx-auto px-6 container'>
        {/* Bento Grid Layout */}
        <div className='gap-4 grid grid-cols-1 sm:grid-cols-6 lg:grid-cols-12 mx-auto py-12 max-w-6xl h-auto min-h-screen'>
          {/* Main Title - Spans multiple cells */}
          <div className='relative flex flex-col justify-center col-span-1 sm:col-span-6 lg:col-span-8 row-span-1 sm:row-span-4 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl p-8 border border-white/10 rounded-3xl overflow-hidden'>
            <div className='top-0 right-0 absolute bg-gradient-to-br from-purple-500/30 to-transparent blur-2xl rounded-full w-32 h-32'></div>
            <div className='z-10 relative'>
              <div className='flex items-center space-x-3 mb-4'>
                <div className='bg-green-400 rounded-full w-3 h-3 animate-pulse'></div>
                <span className='font-mono text-green-400 text-sm'>
                  AVAILABLE FOR WORK
                </span>
              </div>
              <h1 className='mb-4 font-black text-6xl lg:text-8xl leading-none'>
                <span className='block'>{firstName}</span>
                <span className='block bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 text-transparent'>
                  {lastName}
                </span>
              </h1>
              <p className='max-w-md text-white/70 text-xl'>
                {personal.title__headline}
              </p>
            </div>
          </div>

          {/* Profile Image - Liquid Shape */}
          <div className='relative flex justify-center items-center col-span-1 sm:col-span-6 lg:col-span-4 row-span-1 sm:row-span-4 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 backdrop-blur-xl p-6 border border-white/10 rounded-3xl overflow-hidden'>
            <div className='absolute inset-0 bg-gradient-to-br from-cyan-400/10 to-purple-400/10'></div>
            <div className='relative'>
              <div
                className='relative w-48 h-48'
                style={{
                  clipPath:
                    'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
                  background:
                    'linear-gradient(45deg, #ff006e, #8338ec, #3a86ff)',
                  padding: '4px',
                }}>
                <div
                  className='flex justify-center items-center bg-black w-full h-full'
                  style={{
                    clipPath:
                      'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
                  }}>
                  <Image
                    src={profileImage}
                    alt={personal.name}
                    width={180}
                    height={180}
                    className='w-full h-full object-cover'
                    style={{
                      clipPath:
                        'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className='group relative flex justify-center items-center col-span-1 sm:col-span-6 lg:col-span-6 row-span-1 sm:row-span-2 bg-gradient-to-r from-purple-600 to-pink-600 p-6 rounded-3xl overflow-hidden cursor-pointer'>
            <div className='absolute inset-0 bg-gradient-to-r from-pink-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>
            <Link
              href={personal.button_url}
              className='z-10 relative flex items-center space-x-3'>
              <span className='font-bold text-2xl'>{personal.button_text}</span>
              <ArrowUpRight className='w-6 h-6 group-hover:rotate-45 transition-transform duration-300' />
            </Link>
          </div>

          {/* Stats */}
          <div className='flex flex-col justify-center col-span-1 sm:col-span-3 lg:col-span-3 row-span-1 sm:row-span-2 bg-white/5 backdrop-blur-xl p-6 border border-white/10 rounded-3xl'>
            <div className='mb-2 font-black text-cyan-400 text-4xl'>
              {totalProjects}+
            </div>
            <div className='text-white/70 text-sm'>Projects Completed</div>
          </div>

          <div className='flex flex-col justify-center col-span-1 sm:col-span-3 lg:col-span-3 row-span-1 sm:row-span-2 bg-white/5 backdrop-blur-xl p-6 border border-white/10 rounded-3xl'>
            <div className='mb-2 font-black text-purple-400 text-4xl'>
              {yearsExperience}+
            </div>
            <div className='text-white/70 text-sm'>Years Experience</div>
          </div>

          {/* Music Player */}
          <MusicPlayer />

          {/* Social Links */}
          <div className='flex justify-between items-center col-span-1 sm:col-span-6 lg:col-span-8 row-span-1 sm:row-span-2 bg-white/5 backdrop-blur-xl p-6 border border-white/10 rounded-3xl'>
            <div className='font-semibold text-lg'>Connect With Me</div>
            <div className='flex space-x-4'>
              {socialList.map((url, i) => {
                const platform = getPlatform(url);
                const social = socialMap[platform as keyof typeof socialMap];
                if (!social) return null;
                return (
                  <Link
                    key={i}
                    href={url}
                    className={`w-10 h-10 rounded-full bg-white/10 flex items-center justify-center transition-colors ${social.color}`}>
                    {social.icon}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
