import { Metadata } from 'next';
import { getCaseStudies } from '@/lib/wp-utils';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { ArrowUpRight, Calendar, Clock } from 'lucide-react';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Case Studies - John Doe',
    description:
      'In-depth case studies of my most impactful projects and solutions.',
    openGraph: {
      title: 'Case Studies - John Doe',
      description:
        'In-depth case studies of my most impactful projects and solutions.',
      url: '/case-studies',
      type: 'website',
    },
  };
}

export default async function CaseStudiesPage() {
  const { caseStudies, hasMore, totalPages } = await getCaseStudies({
    limit: 9,
    page: 1,
  });

  return (
    <div className='relative min-h-screen overflow-hidden text-white'>
      <div className='z-10 relative mx-auto px-4 py-20 max-w-6xl container'>
        <h1 className='bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-400 mb-12 font-black text-transparent text-5xl text-center'>
          Case Studies
        </h1>

        <div className='gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
          {caseStudies.map((study) => (
            <Link
              key={study.slug}
              href={`/case-studies/${study.slug}`}
              className='group bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 rounded-3xl overflow-hidden hover:scale-105 transition-all duration-300'>
              {study.featuredImage?.url && (
                <div className='relative h-48'>
                  <Image
                    src={study.featuredImage.url}
                    alt={study.title}
                    fill
                    className='group-hover:brightness-110 object-cover transition-brightness duration-300'
                  />
                  <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent' />
                </div>
              )}
              <div className='p-6'>
                <h2 className='mb-2 font-bold text-2xl'>{study.title}</h2>
                <p className='mb-4 text-white/70 line-clamp-2'>
                  Client: {study.client_name}
                </p>
                <div className='flex flex-wrap gap-4 mb-4 text-white/60 text-sm'>
                  <div className='flex items-center'>
                    <Calendar className='mr-2 w-4 h-4' />
                    Completed: {study.completion_date}
                  </div>
                  <div className='flex items-center'>
                    <Clock className='mr-2 w-4 h-4' />
                    Duration: {study.project_duration}
                  </div>
                </div>
                <div className='flex items-center text-cyan-400 group-hover:text-cyan-300 transition-colors'>
                  View Case Study <ArrowUpRight className='ml-2 w-4 h-4' />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {hasMore && (
          <div className='mt-12 text-center'>
            <button className='bg-gradient-to-r from-purple-600 to-cyan-600 hover:brightness-110 px-8 py-3 rounded-full font-semibold text-white transition-all'>
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
