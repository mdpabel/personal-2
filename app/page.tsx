'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ThemeToggle } from '@/components/theme-toggle';
import {
  Github,
  Twitter,
  Linkedin,
  Mail,
  Send,
  Code,
  Palette,
  BookOpen,
  ArrowUpRight,
  Play,
  Pause,
} from 'lucide-react';

export default function HomePage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isPlaying, setIsPlaying] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      ref={containerRef}
      className='relative bg-black min-h-screen overflow-hidden text-white'>
      {/* Interactive Background */}
      <div className='z-0 fixed inset-0'>
        <div className='absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-cyan-900/20'></div>
        {/* Floating Orbs */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className='absolute opacity-30 blur-3xl rounded-full w-64 h-64 animate-pulse'
            style={{
              background: `radial-gradient(circle, ${
                [
                  '#ff006e',
                  '#8338ec',
                  '#3a86ff',
                  '#06ffa5',
                  '#ffbe0b',
                  '#fb5607',
                ][i]
              }40, transparent)`,
              left: `${20 + i * 15}%`,
              top: `${10 + i * 12}%`,
              animationDelay: `${i * 0.5}s`,
              transform: `translate(${mousePosition.x * 0.01 * (i + 1)}px, ${
                mousePosition.y * 0.01 * (i + 1)
              }px)`,
              transition: 'transform 0.3s ease-out',
            }}></div>
        ))}
        {/* Grid Pattern */}
        <div
          className='absolute inset-0 opacity-10'
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}></div>
      </div>

      {/* Orbital Navigation */}
      <div className='top-8 right-8 z-50 fixed'>
        <div className='relative w-32 h-32'>
          <div className='absolute inset-0 border border-white/20 rounded-full animate-spin-slow'></div>
          <div className='absolute inset-2 border border-cyan-400/40 rounded-full animate-spin-reverse'></div>
          <div className='absolute inset-0 flex justify-center items-center'>
            <div className='flex justify-center items-center bg-white/10 backdrop-blur-xl border border-white/20 rounded-full w-12 h-12'>
              <span className='font-bold text-xs'>JD</span>
            </div>
          </div>
          {/* Orbital Menu Items */}
          {[
            {
              icon: <Code className='w-4 h-4' />,
              angle: 0,
              color: 'bg-purple-500',
            },
            {
              icon: <Palette className='w-4 h-4' />,
              angle: 90,
              color: 'bg-cyan-500',
            },
            {
              icon: <Mail className='w-4 h-4' />,
              angle: 180,
              color: 'bg-pink-500',
            },
            { icon: <ThemeToggle />, angle: 270, color: 'bg-yellow-500' },
          ].map((item, i) => (
            <div
              key={i}
              className='absolute flex justify-center items-center backdrop-blur-xl border border-white/20 rounded-full w-8 h-8 hover:scale-110 transition-transform cursor-pointer'
              style={{
                background: 'rgba(255,255,255,0.1)',
                transform: `rotate(${item.angle}deg) translateY(-48px) rotate(-${item.angle}deg)`,
              }}>
              {item.icon}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className='z-10 relative'>
        {/* Hero - Experimental Layout */}
        <section className='relative flex justify-center items-center min-h-screen'>
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
                    <span className='block'>JOHN</span>
                    <span className='block bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 text-transparent'>
                      DOE
                    </span>
                  </h1>
                  <p className='max-w-md text-white/70 text-xl'>
                    Digital craftsman pushing the boundaries of web experiences
                    through code and creativity.
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
                        src='/placeholder.svg?height=180&width=180'
                        alt='John Doe'
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
                  href='/contact'
                  className='z-10 relative flex items-center space-x-3'>
                  <span className='font-bold text-2xl'>
                    LET'S WORK TOGETHER
                  </span>
                  <ArrowUpRight className='w-6 h-6 group-hover:rotate-45 transition-transform duration-300' />
                </Link>
              </div>

              {/* Stats */}
              <div className='flex flex-col justify-center col-span-1 sm:col-span-3 lg:col-span-3 row-span-1 sm:row-span-2 bg-white/5 backdrop-blur-xl p-6 border border-white/10 rounded-3xl'>
                <div className='mb-2 font-black text-cyan-400 text-4xl'>
                  50+
                </div>
                <div className='text-white/70 text-sm'>Projects Completed</div>
              </div>

              <div className='flex flex-col justify-center col-span-1 sm:col-span-3 lg:col-span-3 row-span-1 sm:row-span-2 bg-white/5 backdrop-blur-xl p-6 border border-white/10 rounded-3xl'>
                <div className='mb-2 font-black text-purple-400 text-4xl'>
                  5+
                </div>
                <div className='text-white/70 text-sm'>Years Experience</div>
              </div>

              {/* Music Player */}
              <div className='flex items-center space-x-4 col-span-1 sm:col-span-6 lg:col-span-4 row-span-1 sm:row-span-2 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 backdrop-blur-xl p-6 border border-white/10 rounded-3xl'>
                <Button
                  size='icon'
                  onClick={() => setIsPlaying(!isPlaying)}
                  className='bg-white/20 hover:bg-white/30 border-0 rounded-full w-12 h-12'>
                  {isPlaying ? (
                    <Pause className='w-6 h-6' />
                  ) : (
                    <Play className='w-6 h-6' />
                  )}
                </Button>
                <div className='flex-1'>
                  <div className='font-semibold text-sm'>Coding Vibes</div>
                  <div className='text-white/70 text-xs'>Lo-fi Hip Hop</div>
                  <div className='bg-white/20 mt-2 rounded-full w-full h-1'>
                    <div className='bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full w-1/3 h-full'></div>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className='flex justify-between items-center col-span-1 sm:col-span-6 lg:col-span-8 row-span-1 sm:row-span-2 bg-white/5 backdrop-blur-xl p-6 border border-white/10 rounded-3xl'>
                <div className='font-semibold text-lg'>Connect With Me</div>
                <div className='flex space-x-4'>
                  {[
                    {
                      icon: <Github className='w-5 h-5' />,
                      color: 'hover:text-purple-400',
                    },
                    {
                      icon: <Twitter className='w-5 h-5' />,
                      color: 'hover:text-cyan-400',
                    },
                    {
                      icon: <Linkedin className='w-5 h-5' />,
                      color: 'hover:text-blue-400',
                    },
                    {
                      icon: <Mail className='w-5 h-5' />,
                      color: 'hover:text-pink-400',
                    },
                  ].map((social, i) => (
                    <Link
                      key={i}
                      href='#'
                      className={`w-10 h-10 rounded-full bg-white/10 flex items-center justify-center transition-colors ${social.color}`}>
                      {social.icon}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Work - Overlapping Cards */}
        <section className='relative py-32'>
          <div className='mx-auto px-6 container'>
            <div className='mb-20 text-center'>
              <h2 className='mb-4 font-black text-6xl'>
                FEATURED
                <br />
                <span className='bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 text-transparent'>
                  WORK
                </span>
              </h2>
            </div>

            {/* Overlapping Project Cards */}
            <div className='relative flex flex-col items-center space-y-8 lg:space-y-0 mx-auto max-w-6xl'>
              {[
                {
                  title: 'E-Commerce Revolution',
                  category: 'Full-Stack Development',
                  image: '/placeholder.svg?height=400&width=600',
                  color: 'from-purple-600 to-pink-600',
                  rotation: '-rotate-6',
                  zIndex: 'z-30',
                },
                {
                  title: 'AI Dashboard',
                  category: 'Data Visualization',
                  image: '/placeholder.svg?height=400&width=600',
                  color: 'from-cyan-600 to-blue-600',
                  rotation: 'rotate-3',
                  zIndex: 'z-20',
                },
                {
                  title: 'Brand Identity',
                  category: 'Visual Design',
                  image: '/placeholder.svg?height=400&width=600',
                  color: 'from-yellow-600 to-orange-600',
                  rotation: '-rotate-2',
                  zIndex: 'z-10',
                },
              ].map((project, i) => (
                <div
                  key={i}
                  className={`w-full sm:w-96 ${project.rotation} ${project.zIndex} group cursor-pointer lg:absolute`}
                  style={{ top: `${i * 40}px`, left: `${i * 60}px` }}>
                  <div className='bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl h-64 overflow-hidden group-hover:scale-105 transition-transform duration-500'>
                    <div className='relative h-full'>
                      <Image
                        src={project.image || '/placeholder.svg'}
                        alt={project.title}
                        width={600}
                        height={400}
                        className='w-full h-full object-cover'
                      />
                      <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent'>
                        <div className='right-6 bottom-6 left-6 absolute'>
                          <div className='mb-2 text-white/70 text-sm'>
                            {project.category}
                          </div>
                          <h3 className='mb-3 font-bold text-2xl'>
                            {project.title}
                          </h3>
                          <div
                            className={`w-full h-1 bg-gradient-to-r ${project.color} rounded-full`}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services - Liquid Shapes */}
        <section className='relative py-32'>
          <div className='mx-auto px-6 container'>
            <div className='items-center gap-20 grid grid-cols-1 lg:grid-cols-2 mx-auto max-w-6xl'>
              <div>
                <h2 className='mb-8 font-black text-6xl'>
                  WHAT I
                  <br />
                  <span className='bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-400 text-transparent'>
                    CREATE
                  </span>
                </h2>
                <p className='mb-12 text-white/70 text-xl'>
                  Transforming ideas into digital experiences that captivate,
                  engage, and inspire action.
                </p>
              </div>

              <div className='space-y-8'>
                {[
                  {
                    icon: <Code className='w-8 h-8' />,
                    title: 'Web Development',
                    description:
                      'Full-stack applications with cutting-edge technologies',
                    color: 'from-purple-500 to-pink-500',
                  },
                  {
                    icon: <Palette className='w-8 h-8' />,
                    title: 'UI/UX Design',
                    description: 'Interfaces that users love and remember',
                    color: 'from-cyan-500 to-blue-500',
                  },
                ].map((service, i) => (
                  <div
                    key={i}
                    className='group relative'
                    style={{
                      transform: `translateX(${i % 2 === 0 ? '0' : '40px'})`,
                    }}>
                    <div className='bg-white/5 group-hover:bg-white/10 backdrop-blur-xl p-8 border border-white/10 rounded-3xl transition-all duration-500'>
                      <div
                        className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6`}>
                        {service.icon}
                      </div>
                      <h3 className='mb-4 font-bold text-2xl'>
                        {service.title}
                      </h3>
                      <p className='text-white/70'>{service.description}</p>
                    </div>
                    {/* Floating accent */}
                    <div
                      className={`absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-br ${service.color} rounded-full opacity-60 group-hover:scale-150 transition-transform duration-500`}></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Blog - Magazine Layout */}
        <section className='relative py-32'>
          <div className='mx-auto px-6 container'>
            <div className='mx-auto max-w-6xl'>
              <h2 className='mb-20 font-black text-6xl text-center'>
                LATEST
                <br />
                <span className='bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400 text-transparent'>
                  THOUGHTS
                </span>
              </h2>

              <div className='gap-8 grid grid-cols-1 lg:grid-cols-3'>
                {/* Featured Article */}
                <div className='group lg:col-span-2 cursor-pointer'>
                  <div className='bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden group-hover:scale-105 transition-transform duration-500'>
                    <div className='relative bg-gradient-to-br from-purple-600/50 to-cyan-600/50 h-64'>
                      <div className='absolute inset-0 flex justify-center items-center'>
                        <BookOpen className='w-16 h-16 text-white/50' />
                      </div>
                    </div>
                    <div className='p-8'>
                      <div className='flex items-center space-x-4 mb-4'>
                        <Badge className='bg-purple-500/20 border-purple-500/30 text-purple-300'>
                          Featured
                        </Badge>
                        <span className='text-white/50 text-sm'>
                          Dec 15, 2024
                        </span>
                      </div>
                      <h3 className='mb-4 font-bold group-hover:text-purple-400 text-3xl transition-colors'>
                        The Future of Web Interfaces
                      </h3>
                      <p className='text-white/70 text-lg'>
                        Exploring how AI and new technologies are reshaping the
                        way we design and build digital experiences.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Side Articles */}
                <div className='space-y-8'>
                  {[
                    {
                      title: 'Micro-interactions That Matter',
                      description: `Exploring how AI and new technologies are reshaping the
                        way we design and build digital experiences.`,
                      date: 'Dec 10, 2024',
                      color: 'from-cyan-500 to-blue-500',
                    },
                    {
                      title: 'Building for Performance',
                      date: 'Dec 5, 2024',
                      description: `Exploring how AI and new technologies are reshaping the
                        way we design and build digital experiences.`,
                      color: 'from-pink-500 to-purple-500',
                    },
                  ].map((article, i) => (
                    <div
                      key={i}
                      className='group bg-white/5 hover:bg-white/10 backdrop-blur-xl p-6 border border-white/10 rounded-2xl transition-all duration-300 cursor-pointer'>
                      <div
                        className={`w-full h-2 bg-gradient-to-r ${article.color} rounded-full mb-4`}></div>
                      <div className='mb-2 text-white/50 text-sm'>
                        {article.date}
                      </div>
                      <h3 className='font-bold group-hover:text-cyan-400 text-xl transition-colors'>
                        {article.title}
                      </h3>
                      <p className='mt-3 text-white/70 text-base'>
                        {article.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter - Experimental Form */}
        <section className='relative py-32'>
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
                    Get exclusive insights on design, development, and the
                    future of digital experiences.
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

        {/* Footer - Minimal */}
        <footer className='py-20 border-white/10 border-t'>
          <div className='mx-auto px-6 container'>
            <div className='text-center'>
              <div className='flex justify-center items-center bg-gradient-to-br from-purple-500 to-cyan-500 mx-auto mb-6 rounded-2xl w-16 h-16'>
                <span className='font-black text-2xl'>J</span>
              </div>
              <p className='text-white/50'>
                © 2024 John Doe. Crafted with passion and pixels.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
