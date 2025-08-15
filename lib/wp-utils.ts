import { wordpress } from './wordpress';
import {
  ReviewAcf,
  ProjectAcf,
  CaseStudyAcf,
  ExperienceAcf,
  PersonalInfoACF,
} from '@/types/wp';

export const getBlogPosts = async ({
  limit,
  page,
}: {
  limit: number;
  page: number;
}) => {
  const data = await wordpress.getPosts({
    perPage: limit,
    status: 'publish',
    page,
  });

  return data;
};

export const getPostBySlug = async (slug: string) => {
  return wordpress.getPostBySlug(slug);
};

export const getRelatedPosts = async (id: number, limit: number) => {
  return wordpress.getRelatedPosts(id, limit);
};

export const getCaseStudies = async ({
  limit,
  page,
}: {
  limit: number;
  page?: number;
}) => {
  const { posts, hasMore, total, totalPages } =
    await wordpress.getPosts<CaseStudyAcf>({
      postType: 'case-study',
      status: 'publish',
      perPage: limit,
      page,
    });

  return {
    caseStudies: posts.map((p) => ({
      title: p.title,
      slug: p.slug,
      featuredImage: p.featuredImage,
      ...p.acf,
    })),
    hasMore,
    total,
    totalPages,
  };
};

export const getCaseStudyBySlug = async (slug: string) => {
  return await wordpress.getPostBySlug<CaseStudyAcf>(slug, 'case-study');
};

export const getExperience = async () => {
  const { posts } = await wordpress.getPosts<ExperienceAcf>({
    postType: 'experience',
    status: 'publish',
  });

  return posts.map((p) => p.acf);
};

export const getPersonalData = async () => {
  const { posts } = await wordpress.getPosts<PersonalInfoACF>({
    postType: 'personal-info',
    status: 'publish',
  });

  return posts[0].acf;
};

export const getProjects = async ({
  limit,
  page,
}: {
  limit?: number;
  page?: number;
}) => {
  const { posts, hasMore, total, totalPages } =
    await wordpress.getPosts<ProjectAcf>({
      postType: 'project',
      status: 'publish',
      perPage: limit,
      page,
    });

  return {
    projects: posts.map((p) => ({
      title: p.title,
      slug: p.slug,
      ...p.acf,
    })),
    hasMore,
    total,
    totalPages,
  };
};

export const getProjectBySlug = async (slug: string) => {
  return await wordpress.getPostBySlug<ProjectAcf>(slug, 'project');
};

export const getReviews = async () => {
  const { posts } = await wordpress.getPosts<ReviewAcf>({
    postType: 'review',
    status: 'publish',
  });

  return posts.map((p) => p.acf);
};

export const getExpertise = async ({ limit }: { limit: number }) => {
  const { posts } = await wordpress.getPosts({
    postType: 'expertise',
    status: 'publish',
    perPage: limit,
  });

  return posts.map((p) => ({
    title: p.title,
    shortDescription: p.content,
  }));
};
