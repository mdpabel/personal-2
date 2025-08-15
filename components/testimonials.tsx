import { ReviewAcf } from '@/types/wp';
import { Quote } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

const Testimonials = ({ reviews }: { reviews: ReviewAcf[] }) => {
  return (
    <section className='mb-20'>
      <h2 className='bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400 mb-8 font-black text-transparent text-4xl text-center'>
        What Clients Say
      </h2>
      <div className='gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
        {reviews.map((review, i) => (
          <div
            key={i}
            className='bg-white/5 backdrop-blur-xl p-6 border border-white/10 rounded-2xl'>
            <Quote className='mb-4 w-8 h-8 text-white/30' />
            <p
              className='mb-4 text-white/70'
              dangerouslySetInnerHTML={{
                __html: review.testimonial_quote,
              }}></p>
            <div className='flex items-center'>
              {review.image?.url && (
                <Image
                  src={review.image.url}
                  alt={review.client_name}
                  width={40}
                  height={40}
                  className='mr-3 rounded-full'
                />
              )}
              <div>
                <h4 className='font-bold'>{review.client_name}</h4>
                <p className='text-white/50 text-sm'>
                  {review.testimonial_author_title}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
