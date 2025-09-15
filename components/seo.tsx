import { Metadata } from 'next';
import { YoastSEO } from '@/types/wp';
import he from 'he';

interface SEOProps {
  yoastData?: YoastSEO;
  fallbackTitle?: string;
  fallbackDescription?: string;
  fallbackImage?: string;
  canonical: string;
}

/** --- helpers --- */
function afterColon(value?: string, fallback = ''): string {
  if (!value) return fallback;
  const parts = value.split(':');
  return (parts.length > 1 ? parts[1] : parts[0]).trim() || fallback;
}

function toInt(s?: string, fallback = -1): number {
  const n = parseInt(s ?? '', 10);
  return Number.isFinite(n) ? n : fallback;
}

function stripHtml(s?: string): string | undefined {
  if (!s) return undefined;
  return s.replace(/<[^>]*>/g, '').trim();
}

function uniqueBy<T>(arr: T[], key: (t: T) => string) {
  const seen = new Set<string>();
  return arr.filter((x) => {
    const k = key(x);
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
}

function extractKeywords(yoastData?: YoastSEO): string[] {
  if (!yoastData?.schema?.['@graph']) return [];
  const keywords: string[] = [];
  yoastData.schema['@graph'].forEach((item: any) => {
    if (item?.keywords) {
      if (Array.isArray(item.keywords)) {
        keywords.push(...item.keywords);
      } else if (typeof item.keywords === 'string') {
        keywords.push(...item.keywords.split(',').map((k: string) => k.trim()));
      }
    }
  });
  return Array.from(new Set(keywords)); // Deduplicate
}

function cleanExcerpt(s?: string) {
  if (!s) return '';
  const noHtml = s.replace(/<[^>]*>/g, '').trim();
  return noHtml.replace(/\s*\[\s*(…|&hellip;|\u2026)\s*\]\s*$/iu, '');
}

export function generateSEOMetadata({
  yoastData,
  fallbackTitle = 'Professional Web Developer',
  fallbackDescription = 'Experienced web developer creating modern, responsive websites and applications.',
  fallbackImage = '/images/default-og.jpg',
  canonical,
}: SEOProps): Metadata {
  // Title / description (decode and strip)
  const rawTitle =
    yoastData?.title || (yoastData as any)?.og_title || fallbackTitle;
  const title = he.decode(rawTitle);

  const rawDescription = yoastData?.og_description || fallbackDescription;
  const description = he.decode(stripHtml(rawDescription) || '');

  // Images (dedupe + defaults)
  const ogImages = uniqueBy(yoastData?.og_image ?? [], (i: any) => i?.url).map(
    (img: any) => ({
      url: img.url,
      width: img.width || 1200,
      height: img.height || 630,
      alt: title,
      type: img.type || 'image/jpeg',
    }),
  );
  const primaryImage = ogImages[0]?.url || fallbackImage;

  // Robots: respect Yoast index/follow + parse numeric limits
  const index = yoastData?.robots?.index === 'noindex';
  const follow = yoastData?.robots?.follow === 'nofollow';

  const maxSnippet = toInt(
    afterColon(yoastData?.robots?.['max-snippet'], '-1'),
  );
  const maxVideoPreview = toInt(
    afterColon(yoastData?.robots?.['max-video-preview'], '-1'),
  );
  const maxImagePreview = (afterColon(
    yoastData?.robots?.['max-image-preview'],
    'large',
  ) || 'large') as 'large' | 'none' | 'standard';

  // Keywords as array (Next.js also accepts string, but array is cleaner)
  const keywordsArr = extractKeywords(yoastData);
  const keywords = keywordsArr.length ? keywordsArr : undefined;

  // Twitter creator: only set if it looks like an @handle
  const maybeCreator =
    yoastData?.twitter_misc?.['Written by'] || yoastData?.author;
  const twitterCreator =
    typeof maybeCreator === 'string' && maybeCreator.trim().startsWith('@')
      ? maybeCreator.trim()
      : undefined;

  return {
    title,
    description,
    keywords,
    authors: yoastData?.author ? [{ name: yoastData.author }] : undefined,
    creator: yoastData?.author,
    publisher: yoastData?.og_site_name
      ? he.decode(yoastData.og_site_name)
      : undefined,

    robots: {
      index: true,
      follow: true,
      'max-snippet': maxSnippet,
      'max-image-preview': maxImagePreview,
      'max-video-preview': maxVideoPreview,
    },

    openGraph: {
      type: (yoastData?.og_type as any) || 'website',
      locale: yoastData?.og_locale || 'en_US',
      title,
      description,
      url: canonical,
      siteName: yoastData?.og_site_name
        ? he.decode(yoastData.og_site_name)
        : undefined,
      images: ogImages.length
        ? ogImages
        : [{ url: primaryImage, width: 1200, height: 630, alt: title }],
      publishedTime: yoastData?.article_published_time,
      modifiedTime: yoastData?.article_modified_time,
    },

    twitter: {
      card: (yoastData?.twitter_card as any) || 'summary_large_image',
      title,
      description,
      images: ogImages.length ? ogImages.map((i) => i.url) : [primaryImage],
      creator: twitterCreator,
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
