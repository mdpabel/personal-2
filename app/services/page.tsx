export const dynamic = 'force-static';

import { Metadata } from 'next';
import { getPersonalData, getServices } from '@/lib/wp-utils';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { generateBasicSEOMetadata } from '@/components/seo';

export async function generateMetadata(): Promise<Metadata> {
  const personal = await getPersonalData();

  return generateBasicSEOMetadata({
    title: `Services - ${personal.acf.name}`,
    description:
      'Discover my professional services in web development and design.',
    image: personal.acf.images?.[0]?.full_image_url || '/images/default-og.jpg',
    url: '/services',
    type: 'website',
  });
}

export default async function ServicesPage() {
  const { services, hasMore, totalPages } = await getServices({
    limit: 9,
    page: 1,
  });

  return (
    <div className='relative min-h-screen overflow-hidden text-white'>
      <div className='z-10 relative mx-auto px-4 py-20 max-w-6xl container'>
        <h1 className='bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 mb-12 font-black text-transparent text-5xl text-center'>
          My Services
        </h1>

        <div className='gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
          {services.map((service) => {
            const featuresList =
              service.features
                ?.split(',')
                .map((f) => f.trim())
                .filter(Boolean) || [];
            const displayedFeatures = featuresList.slice(0, 6);
            const moreCount = featuresList.length - 6;

            return (
              <div
                key={service.slug}
                className='group bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 rounded-3xl overflow-hidden hover:scale-105 transition-all duration-300'>
                {service.featuredImage?.url && (
                  <div className='relative h-48'>
                    <Image
                      src={service.featuredImage.url}
                      alt={service.title}
                      fill
                      className='group-hover:brightness-110 object-cover transition-brightness duration-300'
                    />
                    <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent' />
                  </div>
                )}
                <div className='p-6'>
                  <h2
                    className='mb-2 font-bold text-2xl'
                    dangerouslySetInnerHTML={{
                      __html: service.title,
                    }}></h2>
                  <p className='mb-1 text-white/80 text-sm'>
                    {service.subtitle}
                  </p>
                  <p className='mb-4 text-white/70 line-clamp-2'>
                    {service.short_description}
                  </p>
                  <div className='flex flex-wrap gap-2 mb-4'>
                    {displayedFeatures.map((feature) => (
                      <Badge
                        key={feature}
                        variant='secondary'
                        className='bg-white/10 text-white/80'>
                        {feature}
                      </Badge>
                    ))}
                    {moreCount > 0 && (
                      <Badge
                        variant='secondary'
                        className='bg-white/10 text-white/80'>
                        +{moreCount} more
                      </Badge>
                    )}
                  </div>
                  <div className='mb-4'>
                    {service.discounted_price ? (
                      <div className='flex items-center gap-2'>
                        <span className='text-white/50 text-lg line-through'>
                          ${service.orig_price}
                        </span>
                        <span className='font-bold text-cyan-400 text-xl'>
                          ${service.discounted_price}
                        </span>
                      </div>
                    ) : (
                      <span className='font-bold text-cyan-400 text-xl'>
                        ${service.orig_price}
                      </span>
                    )}
                  </div>
                  <div className='flex gap-4'>
                    <Link href={`/services/${service.slug}`}>
                      <Button
                        variant='outline'
                        className='hover:bg-cyan-400/20 border-cyan-400 text-cyan-400'>
                        View Details <ArrowUpRight className='ml-2 w-4 h-4' />
                      </Button>
                    </Link>
                    <Link href='/contact'>
                      <Button className='bg-gradient-to-r from-purple-600 to-cyan-600 hover:brightness-110'>
                        Get Started
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
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
