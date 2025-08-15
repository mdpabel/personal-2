import { getExpertise } from '@/lib/wp-utils';
import { Code, Palette } from 'lucide-react';

export default async function ServicesSection() {
  const expertise = await getExpertise({
    limit: 2,
  });

  return (
    <section className='relative py-32'>
      <div className='mx-auto px-6 container'>
        <div className='items-center gap-20 grid grid-cols-1 lg:grid-cols-2 mx-auto max-w-6xl'>
          <div>
            <h2 className='mb-8 font-black text-6xl'>
              WHAT I
              <br />
              <span className='bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-400 text-transparent'>
                CREATE
              </span>
            </h2>
            <p className='mb-12 text-white/70 text-xl'>
              Transforming ideas into digital experiences that captivate,
              engage, and inspire action.
            </p>
          </div>

          <div className='space-y-8'>
            {expertise.map((service, i) => {
              const description =
                service.shortDescription.match(
                  /<p[^>]*>([\s\S]*?)<\/p>/,
                )?.[1] || '';
              const isUIUX = service.title.includes('UI/UX');
              const icon = isUIUX ? (
                <Palette className='w-8 h-8' />
              ) : (
                <Code className='w-8 h-8' />
              );
              const color = isUIUX
                ? 'from-cyan-500 to-blue-500'
                : 'from-purple-500 to-pink-500';
              return (
                <div
                  key={i}
                  className='group relative'
                  style={{
                    transform: `translateX(${i % 2 === 0 ? '0' : '40px'})`,
                  }}>
                  <div className='bg-white/5 group-hover:bg-white/10 backdrop-blur-xl p-8 border border-white/10 rounded-3xl transition-all duration-500'>
                    <div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center mb-6`}>
                      {icon}
                    </div>
                    <h3 className='mb-4 font-bold text-2xl'>{service.title}</h3>
                    <p className='text-white/70'>{description}</p>
                  </div>
                  {/* Floating accent */}
                  <div
                    className={`absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-br ${color} rounded-full opacity-60 group-hover:scale-150 transition-transform duration-500`}></div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
