import { Metadata } from 'next';
import { getProjects } from '@/lib/wp-utils';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { ArrowUpRight } from 'lucide-react';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Projects - John Doe',
    description:
      'Explore my portfolio of innovative web development and UI/UX design projects.',
    openGraph: {
      title: 'Projects - John Doe',
      description:
        'Explore my portfolio of innovative web development and UI/UX design projects.',
      url: '/projects',
      type: 'website',
    },
  };
}

export default async function ProjectsPage() {
  const { projects, hasMore, totalPages } = await getProjects({
    limit: 9,
    page: 1,
  }); // Paginate if needed

  return (
    <div className='relative min-h-screen overflow-hidden text-white'>
      <div className='z-10 relative mx-auto px-4 py-20 max-w-6xl container'>
        <h1 className='bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 mb-12 font-black text-transparent text-5xl text-center'>
          My Projects
        </h1>

        <div className='gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
          {projects.map((project) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className='group bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 rounded-3xl overflow-hidden hover:scale-105 transition-all duration-300'>
              {project.screenshots?.[0]?.full_image_url && (
                <div className='relative h-48'>
                  <Image
                    src={project.screenshots[0].full_image_url}
                    alt={project.title}
                    fill
                    className='group-hover:brightness-110 object-cover transition-brightness duration-300'
                  />
                  <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent' />
                </div>
              )}
              <div className='p-6'>
                <h2 className='mb-2 font-bold text-2xl'>{project.title}</h2>
                <p className='mb-4 text-white/70 line-clamp-2'>
                  {project.short_project_description}
                </p>
                <div className='flex flex-wrap gap-2 mb-4'>
                  {project['tools_&_technologies']
                    ?.split(',')
                    .map((tech: string) => (
                      <Badge
                        key={tech.trim()}
                        variant='secondary'
                        className='bg-white/10 text-white/80'>
                        {tech.trim()}
                      </Badge>
                    ))}
                </div>
                <div className='flex items-center text-cyan-400 group-hover:text-cyan-300 transition-colors'>
                  View Project <ArrowUpRight className='ml-2 w-4 h-4' />
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
