import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getCaseStudyBySlug } from '@/lib/wp-utils';
import Image from 'next/image';
import { Calendar, Clock, User } from 'lucide-react';

interface CaseStudyPageProps {
  params: { slug: string };
}

export async function generateMetadata({
  params,
}: CaseStudyPageProps): Promise<Metadata> {
  const study = await getCaseStudyBySlug(params.slug);
  if (!study) return { title: 'Case Study Not Found' };

  return {
    title: `${study.title} - John Doe Case Studies`,
    description: `Case study for ${study.acf.client_name}`,
    openGraph: {
      title: `${study.title} - John Doe Case Studies`,
      description: `Case study for ${study.acf.client_name}`,
      images: study.featuredImage?.url
        ? [{ url: study.featuredImage.url }]
        : [],
      url: `/case-studies/${params.slug}`,
      type: 'article',
      publishedTime: study.acf.completion_date,
    },
  };
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const study = await getCaseStudyBySlug(params.slug);
  if (!study) notFound();

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <article className='relative min-h-screen overflow-hidden text-white'>
      <div className='z-10 relative mx-auto px-4 py-20 max-w-4xl container'>
        <header className='mb-12 text-center'>
          <h1 className='mb-4 font-black text-5xl'>{study.title}</h1>
          <div className='flex justify-center gap-6 mb-8 text-white/70 text-sm'>
            <div className='flex items-center'>
              <User className='mr-2 w-4 h-4' />
              Client: {study.acf.client_name}
            </div>
            <div className='flex items-center'>
              <Calendar className='mr-2 w-4 h-4' />
              Completed: {formatDate(study.acf.completion_date)}
            </div>
            <div className='flex items-center'>
              <Clock className='mr-2 w-4 h-4' />
              Duration: {study.acf.project_duration}
            </div>
          </div>
          {study.featuredImage?.url && (
            <div className='relative mb-8 rounded-3xl h-96 overflow-hidden'>
              <Image
                src={study.featuredImage.url}
                alt={study.title}
                fill
                className='object-cover'
              />
            </div>
          )}
        </header>

        <div
          className='prose-code:bg-white/5 prose-invert mb-12 prose-blockquote:border-white/20 max-w-none prose-a:text-cyan-400 prose-headings:text-white prose'
          dangerouslySetInnerHTML={{ __html: study.content }}
        />

        {study.acf.screenshots?.length > 0 && (
          <section className='mb-12'>
            <h2 className='mb-6 font-bold text-3xl'>Screenshots</h2>
            <div className='gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
              {study.acf.screenshots.map((screenshot, i) => (
                <div
                  key={i}
                  className='relative rounded-2xl h-64 overflow-hidden'>
                  <Image
                    src={screenshot.full_image_url}
                    alt={`${study.title} screenshot ${i + 1}`}
                    fill
                    className='object-cover'
                  />
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
}
