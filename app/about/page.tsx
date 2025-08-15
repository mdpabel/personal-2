import { Metadata } from 'next';
import {
  getPersonalData,
  getExperience,
  getExpertise,
  getReviews,
} from '@/lib/wp-utils';
import { Timeline } from '@/components/ui/timeline';
import { ArrowUpRight, Code, Palette, Quote } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Testimonials from '@/components/testimonials';
import Image from 'next/image';

export async function generateMetadata(): Promise<Metadata> {
  const personal = await getPersonalData();

  return {
    title: `${personal.name} - About Me`,
    description: personal.title__headline,
    openGraph: {
      title: `${personal.name} - About Me`,
      description: personal.title__headline,
      images: [
        {
          url: personal.images?.[0]?.full_image_url || '/placeholder-og.jpg',
          width: 1200,
          height: 630,
          alt: personal.name,
        },
      ],
      url: '/about',
      type: 'profile',
      gender: 'male', // Assuming based on name; adjust if needed
      username: personal.name.toLowerCase().replace(/\s+/g, '-'),
    },
    twitter: {
      card: 'summary_large_image',
      title: `${personal.name} - About Me`,
      description: personal.title__headline,
      images: [personal.images?.[0]?.full_image_url || '/placeholder-og.jpg'],
    },
  };
}

export default async function AboutPage() {
  const personal = await getPersonalData();
  const experiences = await getExperience();
  const expertise = await getExpertise({ limit: 10 });
  const reviews = await getReviews();

  const mainProfileImage =
    personal.images?.[0]?.full_image_url ||
    '/placeholder.svg?height=300&width=300';

  const sortedExperiences = experiences.sort(
    (a, b) => parseInt(b.job_start_year) - parseInt(a.job_start_year),
  );

  const cleanExpertise = expertise.map((exp) => ({
    ...exp,
    shortDescription: exp.shortDescription.replace(/<[^>]+>/g, '').trim(),
  }));

  return (
    <div className='relative min-h-screen overflow-hidden text-white'>
      <div className='z-10 relative mx-auto px-4 py-20 max-w-6xl container'>
        {/* Hero Introduction */}
        <section className='mb-20 text-center'>
          <div className='inline-block relative mb-8'>
            <Image
              src={mainProfileImage}
              alt={personal.name}
              width={200}
              height={200}
              className='from-purple-500 to-cyan-500 border-4 border-gradient-to-r rounded-full !h-[200px] object-cover'
            />
            <div className='-bottom-4 left-1/2 absolute bg-green-400 rounded-full w-4 h-4 -translate-x-1/2 animate-pulse'></div>
          </div>

          <h1 className='bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 mb-4 font-black text-transparent text-5xl'>
            {personal.name}
          </h1>
          <p className='mx-auto max-w-2xl text-white/70 text-xl'>
            {personal.title__headline}
          </p>
        </section>

        {/* Experience Timeline */}
        <section className='mb-20'>
          <h2 className='bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 mb-8 font-black text-transparent text-4xl text-center'>
            Professional Journey
          </h2>
          <Timeline>
            {sortedExperiences.map((exp, i) => (
              <Timeline.Item key={i}>
                <Timeline.Header>
                  <Timeline.Time>
                    {exp.job_start_year} - {exp.job_end_year || 'Present'}
                  </Timeline.Time>
                  <Timeline.Title>{exp.job_title}</Timeline.Title>
                  <Timeline.Subtitle>
                    {exp.company_name} - {exp.location}
                  </Timeline.Subtitle>
                </Timeline.Header>
                <Timeline.Content>
                  <p className='text-white/70'>{exp.job_description}</p>
                  {exp.company_logo?.url && (
                    <Image
                      src={exp.company_logo.url}
                      alt={exp.company_name}
                      width={100}
                      height={100}
                      className='mt-4 rounded-lg'
                    />
                  )}
                </Timeline.Content>
              </Timeline.Item>
            ))}
          </Timeline>
        </section>

        {/* Expertise */}
        <section className='mb-20'>
          <h2 className='bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-400 mb-8 font-black text-transparent text-4xl text-center'>
            My Expertise
          </h2>
          <div className='gap-8 grid grid-cols-1 md:grid-cols-2'>
            {cleanExpertise.map((exp, i) => (
              <div
                key={i}
                className='group relative bg-white/5 hover:bg-white/10 backdrop-blur-xl p-8 border border-white/10 rounded-3xl transition-all duration-500'
                style={{
                  transform: `translateX(${i % 2 === 0 ? '0' : '40px'})`,
                }}>
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${
                    i % 2 === 0
                      ? 'from-purple-500 to-pink-500'
                      : 'from-cyan-500 to-blue-500'
                  } flex items-center justify-center mb-6`}>
                  {i % 2 === 0 ? (
                    <Code className='w-8 h-8' />
                  ) : (
                    <Palette className='w-8 h-8' />
                  )}
                </div>
                <h3 className='mb-4 font-bold text-2xl'>{exp.title}</h3>
                <p className='text-white/70'>{exp.shortDescription}</p>
                <div
                  className={`absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-br ${
                    i % 2 === 0
                      ? 'from-purple-500 to-pink-500'
                      : 'from-cyan-500 to-blue-500'
                  } rounded-full opacity-60 group-hover:scale-150 transition-transform duration-500`}></div>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <Testimonials reviews={reviews} />

        {/* Call to Action */}
        <div className='text-center'>
          <Link href={personal.button_url}>
            <Button className='bg-gradient-to-r from-purple-600 hover:from-purple-700 to-pink-600 hover:to-pink-700 px-8 py-4 rounded-3xl font-bold text-white hover:scale-105 transition-all duration-300'>
              {personal.button_text}
              <ArrowUpRight className='ml-2 w-5 h-5' />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
