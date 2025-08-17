// components/seo.tsx
import { Metadata } from 'next';
import { YoastSEO } from '@/types/wp';

interface SEOProps {
  yoastData?: YoastSEO;
  fallbackTitle?: string;
  fallbackDescription?: string;
  fallbackImage?: string;
}

export function generateSEOMetadata({
  yoastData,
  fallbackTitle = 'Professional Web Developer',
  fallbackDescription = 'Experienced web developer creating modern, responsive websites and applications.',
  fallbackImage = '/images/default-og.jpg',
}: SEOProps): Metadata {
  const title = yoastData?.title || fallbackTitle;
  const description = yoastData?.og_description || fallbackDescription;
  const image = yoastData?.og_image?.[0]?.url || fallbackImage;
  const canonical = yoastData?.canonical;

  return {
    title,
    description,
    keywords: extractKeywords(yoastData).join(', ') || undefined,
    authors: yoastData?.author ? [{ name: yoastData.author }] : undefined,
    creator: yoastData?.author,
    publisher: yoastData?.og_site_name,
    robots: {
      index: yoastData?.robots?.index === 'index',
      follow: yoastData?.robots?.follow === 'follow',
      'max-snippet': parseInt(yoastData?.robots?.['max-snippet'] || '-1'),
      'max-image-preview': (yoastData?.robots?.['max-image-preview'] ||
        'large') as 'large' | 'none' | 'standard' | undefined,
      'max-video-preview': parseInt(
        yoastData?.robots?.['max-video-preview'] || '-1',
      ),
    },
    openGraph: {
      type: (yoastData?.og_type as any) || 'website',
      locale: yoastData?.og_locale || 'en_US',
      title,
      description,
      url: yoastData?.og_url || canonical,
      siteName: yoastData?.og_site_name,
      images: yoastData?.og_image?.map((img) => ({
        url: img.url,
        width: img.width || 1200,
        height: img.height || 630,
        alt: title,
        type: img.type || 'image/jpeg',
      })) || [{ url: image, width: 1200, height: 630, alt: title }],
      publishedTime: yoastData?.article_published_time,
      modifiedTime: yoastData?.article_modified_time,
    },
    twitter: {
      card: (yoastData?.twitter_card as any) || 'summary_large_image',
      title,
      description,
      images: yoastData?.og_image?.map((img) => img.url) || [image],
      creator: yoastData?.twitter_misc?.['Written by'],
    },
    alternates: {
      canonical,
    },
  };
}

interface BasicSEOProps {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'profile';
}

export function generateBasicSEOMetadata({
  title,
  description,
  image = '/images/default-og.jpg',
  url = '',
  type = 'website',
}: BasicSEOProps): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
      url,
      type,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  };
}

function extractKeywords(yoastData?: YoastSEO): string[] {
  if (!yoastData?.schema?.['@graph']) return [];

  const keywords: string[] = [];
  yoastData.schema['@graph'].forEach((item: any) => {
    if (item.keywords) {
      if (Array.isArray(item.keywords)) {
        keywords.push(...item.keywords);
      } else if (typeof item.keywords === 'string') {
        keywords.push(...item.keywords.split(',').map((k: string) => k.trim()));
      }
    }
  });

  return Array.from(new Set(keywords)); // Deduplicate
}

// Schema.org JSON-LD component
export function SchemaOrg({ yoastData }: { yoastData?: YoastSEO }) {
  if (!yoastData?.schema) return null;

  return (
    <script
      type='application/ld+json'
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(yoastData.schema),
      }}
    />
  );
}
