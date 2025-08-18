import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getServiceBySlug, getServices } from '@/lib/wp-utils';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { generateSEOMetadata, SchemaOrg } from '@/components/seo';

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  let params: { slug: string }[] = [];
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    const { services, hasMore: more } = await getServices({ limit: 100, page });
    params = [
      ...params,
      ...services.map((service) => ({ slug: service.slug })),
    ];
    hasMore = more;
    page++;
  }

  return params;
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;

  const service = await getServiceBySlug(slug);
  if (!service) return { title: 'Service Not Found' };

  return generateSEOMetadata({
    yoastData: service.yoastSEO,
    fallbackTitle: `${service.title} - Services`,
    fallbackDescription: service.acf.short_description,
    fallbackImage: service.featuredImage?.url || '/images/default-og.jpg',
  });
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) notFound();

  const featuresList =
    service.acf.features
      ?.split(',')
      .map((f) => f.trim())
      .filter(Boolean) || [];

  return (
    <article className='relative min-h-screen overflow-hidden text-white'>
      <SchemaOrg yoastData={service.yoastSEO} />

      <div className='z-10 relative mx-auto px-4 py-20 max-w-4xl container'>
        <header className='mb-12 text-center'>
          <h1
            className='mb-4 font-black text-5xl'
            dangerouslySetInnerHTML={{
              __html: service.title,
            }}></h1>
          <p className='mb-2 text-white/80 text-lg'>{service.acf.subtitle}</p>
          <p className='mb-8 text-white/70 text-xl'>
            {service.acf.short_description}
          </p>
          {service.featuredImage?.url && (
            <div className='relative mb-8 rounded-3xl h-96 overflow-hidden'>
              <Image
                src={service.featuredImage.url}
                alt={service.title}
                fill
                className='object-cover'
              />
            </div>
          )}
        </header>

        <div
          className='prose-code:bg-white/5 prose-invert mb-12 prose-blockquote:border-white/20 max-w-none prose-a:text-cyan-400 prose-headings:text-white prose'
          dangerouslySetInnerHTML={{ __html: service.acf.detailed_description }}
        />

        {featuresList.length > 0 && (
          <section className='mb-12'>
            <h2 className='mb-6 font-bold text-3xl'>Key Features</h2>
            <div className='flex flex-wrap gap-2'>
              {featuresList.map((feature: string) => (
                <Badge
                  key={feature}
                  variant='secondary'
                  className='bg-white/10 text-white/80'>
                  {feature}
                </Badge>
              ))}
            </div>
          </section>
        )}

        <section className='mb-12 text-center'>
          <h2 className='mb-6 font-bold text-3xl'>Pricing</h2>
          {service.acf.discounted_price ? (
            <div className='flex justify-center items-center gap-4'>
              <span className='text-white/50 text-2xl line-through'>
                ${service.acf.orig_price}
              </span>
              <span className='font-bold text-cyan-400 text-3xl'>
                ${service.acf.discounted_price}
              </span>
            </div>
          ) : (
            <span className='font-bold text-cyan-400 text-3xl'>
              ${service.acf.orig_price}
            </span>
          )}
        </section>

        <div className='flex justify-center gap-4'>
          <Link href='/contact'>
            <Button className='bg-gradient-to-r from-purple-600 to-cyan-600 hover:brightness-110 px-8 py-4 rounded-3xl font-bold text-white hover:scale-105 transition-all duration-300'>
              Get Started <ArrowUpRight className='ml-2 w-5 h-5' />
            </Button>
          </Link>
        </div>
      </div>
    </article>
  );
}
