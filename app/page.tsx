export const dynamic = 'force-static';

import BlogSection from '@/components/home/blog-section';
import FeaturedWorkSection from '@/components/home/featured-work-section';
import HeroSection from '@/components/home/hero-section';
import ServicesSection from '@/components/home/services-section';
import NewsletterSection from '@/components/newsletter-section';
import {
  getPersonalData,
  getExperience,
  getProjects,
  getBlogPosts,
} from '@/lib/wp-utils';
import { generateBasicSEOMetadata } from '@/components/seo';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const personal = await getPersonalData();

  return generateBasicSEOMetadata({
    title: `${personal.acf.name} Portfolio`,
    description: personal.acf.title__headline,
    image: personal.acf.images?.[0]?.full_image_url || '/images/default-og.jpg',
    url: '/',
    type: 'website',
  });
}

export default async function HomePage() {
  const personal = await getPersonalData();
  const experiences = await getExperience();
  const { total: totalProjects } = await getProjects({ limit: 3 });
  const { posts: blogPosts } = await getBlogPosts({ limit: 3, page: 1 });

  const nameParts = personal.acf.name.toUpperCase().split(' ');
  const firstName = nameParts[0] || 'JOHN';
  const lastName = nameParts.slice(1).join(' ') || 'DOE';

  const currentYear = 2025;
  const minYear =
    experiences.length > 0
      ? Math.min(...experiences.map((e) => parseInt(e.job_start_year)))
      : currentYear;
  const yearsExperience = currentYear - minYear;

  const socialList = personal.acf.social_media_comma_seperated
    ? personal.acf.social_media_comma_seperated
        .split(',')
        .map((s) => s.trim().toLowerCase())
    : [];

  const profileImage =
    personal.acf.images?.[0]?.full_image_url ||
    '/placeholder.svg?height=180&width=180';

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const featuredArticle = blogPosts[0]
    ? {
        title: blogPosts[0].title,
        date: formatDate(blogPosts[0].date),
        description: blogPosts[0].excerpt.replace(/<[^>]+>/g, ''),
      }
    : {
        title: 'The Future of Web Interfaces',
        date: 'Dec 15, 2024',
        description:
          'Exploring how AI and new technologies are reshaping the way we design and build digital experiences.',
      };

  const sideArticles = blogPosts.slice(1).map((post) => ({
    title: post.title,
    date: formatDate(post.date),
    description: post.excerpt.replace(/<[^>]+>/g, ''),
    color: ['from-cyan-500 to-blue-500', 'from-pink-500 to-purple-500'][
      blogPosts.indexOf(post) - (1 % 2)
    ],
  }));

  return (
    <>
      <HeroSection
        personal={personal.acf}
        firstName={firstName}
        lastName={lastName}
        totalProjects={totalProjects}
        yearsExperience={yearsExperience}
        socialList={socialList}
        profileImage={profileImage}
      />
      <FeaturedWorkSection />
      <ServicesSection />
      <BlogSection
        featuredArticle={featuredArticle}
        sideArticles={sideArticles}
      />
      <NewsletterSection />
    </>
  );
}
