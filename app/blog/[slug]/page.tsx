import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPostBySlug, getRelatedPosts } from '@/lib/wp-utils';
import Image from 'next/image';
import { Calendar, Tag } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { generateSEOMetadata, SchemaOrg } from '@/components/seo';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;

  const post = await getPostBySlug(slug);
  if (!post) return { title: 'Post Not Found' };

  return generateSEOMetadata({
    yoastData: post.yoastSEO,
    fallbackTitle: `${post.title} - Blog`,
    fallbackDescription: post.excerpt.replace(/<[^>]+>/g, ''),
    fallbackImage: post.featuredImage?.url || '/images/default-og.jpg',
    canonical: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/blog/${slug}`,
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;

  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const relatedPosts = await getRelatedPosts(post.id, 3);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <article className='relative min-h-screen overflow-hidden text-white'>
      <SchemaOrg yoastData={post.yoastSEO} />
      <div className='z-10 relative mx-auto px-4 py-20 max-w-4xl container'>
        <header className='mb-12 text-center'>
          <h1 className='mb-4 font-black text-5xl'>{post.title}</h1>
          <div className='flex justify-center items-center mb-4 text-white/70'>
            <Calendar className='mr-2 w-4 h-4' />
            {formatDate(post.date)}
          </div>
          <div className='flex flex-wrap justify-center gap-2 mb-8'>
            {post.categories.map((cat) => (
              <Badge
                key={cat.id}
                variant='secondary'
                className='bg-white/10 text-white/80'>
                {cat.name}
              </Badge>
            ))}
          </div>
          {post.featuredImage?.url && (
            <div className='relative mb-8 rounded-3xl h-96 overflow-hidden'>
              <Image
                src={post.featuredImage.url}
                alt={post.title}
                fill
                className='object-cover'
              />
            </div>
          )}
        </header>

        <div
          className='prose-code:bg-white/5 prose-invert prose-blockquote:border-white/20 max-w-none prose-a:text-cyan-400 prose-headings:text-white prose'
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <section className='mt-20'>
          <h2 className='mb-8 font-bold text-3xl text-center'>Related Posts</h2>
          <div className='gap-6 grid grid-cols-1 md:grid-cols-3'>
            {relatedPosts.map((related) => (
              <Link
                key={related.slug}
                href={`/blog/${related.slug}`}
                className='group bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 rounded-2xl overflow-hidden transition-all'>
                {related.featuredImage?.url && (
                  <div className='relative h-32'>
                    <Image
                      src={related.featuredImage.url}
                      alt={related.title}
                      fill
                      className='object-cover group-hover:scale-105 transition-transform'
                    />
                  </div>
                )}
                <div className='p-4'>
                  <h3 className='mb-2 font-bold group-hover:text-cyan-300 transition-colors'>
                    {related.title}
                  </h3>
                  <p className='text-white/60 text-sm line-clamp-2'>
                    {related.excerpt.replace(/<[^>]+>/g, '')}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </article>
  );
}
