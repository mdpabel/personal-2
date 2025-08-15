// components/home/BlogSection.tsx
import { Badge } from '@/components/ui/badge';
import { BookOpen } from 'lucide-react';

interface BlogSectionProps {
  featuredArticle: {
    title: string;
    date: string;
    description: string;
  };
  sideArticles: {
    title: string;
    date: string;
    description: string;
    color: string;
  }[];
}

export default function BlogSection({
  featuredArticle,
  sideArticles,
}: BlogSectionProps) {
  return (
    <section className='relative pb-32'>
      <div className='mx-auto px-6 container'>
        <div className='mx-auto max-w-6xl'>
          <h2 className='mb-20 font-black text-6xl text-center'>
            LATEST
            <br />
            <span className='bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400 text-transparent'>
              THOUGHTS
            </span>
          </h2>

          <div className='gap-8 grid grid-cols-1 lg:grid-cols-3'>
            {/* Featured Article */}
            <div className='group lg:col-span-2 cursor-pointer'>
              <div className='bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden group-hover:scale-105 transition-transform duration-500'>
                <div className='relative bg-gradient-to-br from-purple-600/50 to-cyan-600/50 h-64'>
                  <div className='absolute inset-0 flex justify-center items-center'>
                    <BookOpen className='w-16 h-16 text-white/50' />
                  </div>
                </div>
                <div className='p-8'>
                  <div className='flex items-center space-x-4 mb-4'>
                    <Badge className='bg-purple-500/20 border-purple-500/30 text-purple-300'>
                      Featured
                    </Badge>
                    <span className='text-white/50 text-sm'>
                      {featuredArticle.date}
                    </span>
                  </div>
                  <h3 className='mb-4 font-bold group-hover:text-purple-400 text-3xl transition-colors'>
                    {featuredArticle.title}
                  </h3>
                  <p className='text-white/70 text-lg line-clamp-2'>
                    {featuredArticle.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Side Articles */}
            <div className='space-y-8'>
              {sideArticles.map((article, i) => (
                <div
                  key={i}
                  className='group bg-white/5 hover:bg-white/10 backdrop-blur-xl p-6 border border-white/10 rounded-2xl transition-all duration-300 cursor-pointer'>
                  <div
                    className={`w-full h-2 bg-gradient-to-r ${article.color} rounded-full mb-4`}></div>
                  <div className='mb-2 text-white/50 text-sm'>
                    {article.date}
                  </div>
                  <h3 className='font-bold group-hover:text-cyan-400 text-xl transition-colors'>
                    {article.title}
                  </h3>
                  <p className='mt-3 text-white/70 text-base line-clamp-2'>
                    {article.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
