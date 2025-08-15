import { getProjects } from '@/lib/wp-utils';
import OverlappingCardsClient from './overlapping-cards';

export default async function FeaturedWorkSection() {
  const { projects } = await getProjects({ limit: 3 });

  const colors = [
    'from-purple-600 to-pink-600',
    'from-cyan-600 to-blue-600',
    'from-yellow-600 to-orange-600',
  ];
  const rotations = ['-rotate-6', 'rotate-3', '-rotate-2'];
  const zIndexes = ['z-30', 'z-20', 'z-10'];

  const featuredProjects = projects.map((p, i) => ({
    title: p.title,
    category: 'Project',
    image:
      p.screenshots?.[0]?.full_image_url ||
      '/placeholder.svg?height=400&width=600',
    color: colors[i % colors.length],
    rotation: rotations[i % rotations.length],
    zIndex: zIndexes[i % zIndexes.length],
    slug: p.slug,
    description: p.short_project_description,
  }));

  return (
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

        {/* Overlapping Project Cards as Client Component */}
        <OverlappingCardsClient projects={featuredProjects} />
      </div>
    </section>
  );
}
