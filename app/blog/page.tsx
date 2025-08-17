export const dynamic = 'force-static';

import { Metadata } from 'next';
import { getPersonalData, getBlogPosts } from '@/lib/wp-utils';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { ArrowUpRight, Calendar } from 'lucide-react';
import { generateBasicSEOMetadata } from '@/components/seo';
import { wordpress } from '@/lib/wordpress';

export async function generateMetadata(): Promise<Metadata> {
  const personal = await getPersonalData();

  return generateBasicSEOMetadata({
    title: `Blog - ${personal.acf.name}`,
    description: 'Insights on design, development, and digital experiences.',
    image: personal.acf.images?.[0]?.full_image_url || '/images/default-og.jpg',
    url: '/blog',
    type: 'website',
  });
}

export async function generateStaticParams() {
  const { posts } = await wordpress.getPosts();
  return posts.map((p) => p.slug);
}

export default async function BlogPage() {
  const {
    posts: blogPosts,
    hasMore,
    totalPages,
  } = await getBlogPosts({ limit: 9, page: 1 });

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className='relative min-h-screen overflow-hidden text-white'>
      <div className='z-10 relative mx-auto px-4 py-20 max-w-6xl container'>
        <h1 className='bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400 mb-12 font-black text-transparent text-5xl text-center'>
          Latest Thoughts
        </h1>

        <div className='gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className='group bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 rounded-3xl overflow-hidden hover:scale-105 transition-all duration-300'>
              {post.featuredImage?.url && (
                <div className='relative h-48'>
                  <Image
                    src={post.featuredImage.url}
                    alt={post.title}
                    fill
                    className='group-hover:brightness-110 object-cover transition-brightness duration-300'
                  />
                  <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent' />
                </div>
              )}
              <div className='p-6'>
                <h2 className='mb-2 font-bold text-2xl'>{post.title}</h2>
                <p className='mb-4 text-white/70 line-clamp-3'>
                  {post.excerpt.replace(/<[^>]+>/g, '')}
                </p>
                <div className='flex items-center mb-4 text-white/60 text-sm'>
                  <Calendar className='mr-2 w-4 h-4' />
                  {formatDate(post.date)}
                </div>
                <div className='flex flex-wrap gap-2 mb-4'>
                  {post.categories.map((cat) => (
                    <Badge
                      key={cat.id}
                      variant='secondary'
                      className='bg-white/10 text-white/80'>
                      {cat.name}
                    </Badge>
                  ))}
                </div>
                <div className='flex items-center text-cyan-400 group-hover:text-cyan-300 transition-colors'>
                  Read More <ArrowUpRight className='ml-2 w-4 h-4' />
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
