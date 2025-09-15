import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProjectBySlug } from '@/lib/wp-utils';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Code } from 'lucide-react';
import { generateSEOMetadata, SchemaOrg } from '@/components/seo';

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;

  const project = await getProjectBySlug(slug);
  if (!project) return { title: 'Project Not Found' };

  return generateSEOMetadata({
    yoastData: project.yoastSEO,
    fallbackTitle: `${project.title} - Projects`,
    fallbackDescription: project.acf.short_project_description,
    fallbackImage:
      project.acf.screenshots?.[0]?.full_image_url || '/images/default-og.jpg',
    canonical: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/projects/${slug}`,
  });
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <article className='relative bg-black min-h-screen overflow-hidden text-white'>
      <SchemaOrg yoastData={project.yoastSEO} />
      <div className='absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-cyan-900/20 pointer-events-none'></div>

      <div className='z-10 relative mx-auto px-4 py-20 max-w-4xl container'>
        <header className='mb-12 text-center'>
          <h1 className='mb-4 font-black text-5xl'>{project.title}</h1>
          <p className='mb-8 text-white/70 text-xl'>
            {project.acf.short_project_description}
          </p>
          {project.acf.screenshots?.[0]?.full_image_url && (
            <div className='relative mb-8 rounded-3xl h-96 overflow-hidden'>
              <Image
                src={project.acf.screenshots[0].full_image_url}
                alt={project.title}
                fill
                className='object-cover'
              />
            </div>
          )}
        </header>

        <div
          className='prose-code:bg-white/5 prose-invert mb-12 prose-blockquote:border-white/20 max-w-none prose-a:text-cyan-400 prose-headings:text-white prose'
          dangerouslySetInnerHTML={{ __html: project.acf.project_description }}
        />

        <section className='mb-12'>
          <h2 className='mb-6 font-bold text-3xl'>Tools & Technologies</h2>
          <div className='flex flex-wrap gap-2'>
            {project.acf['tools_&_technologies']
              ?.split(',')
              .map((tech: string) => (
                <Badge
                  key={tech.trim()}
                  variant='secondary'
                  className='bg-white/10 text-white/80'>
                  <Code className='mr-1 w-3 h-3' />
                  {tech.trim()}
                </Badge>
              ))}
          </div>
        </section>

        {project.acf.screenshots?.length > 1 && (
          <section className='mb-12'>
            <h2 className='mb-6 font-bold text-3xl'>Screenshots</h2>
            <div className='gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
              {project.acf.screenshots.slice(1).map((screenshot, i) => (
                <div
                  key={i}
                  className='relative rounded-2xl h-64 overflow-hidden'>
                  <Image
                    src={screenshot.full_image_url}
                    alt={`${project.title} screenshot ${i + 2}`}
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
