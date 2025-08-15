'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface Project {
  title: string;
  category: string;
  image: string;
  color: string;
  rotation: string;
  zIndex: string;
  slug: string;
  description: string;
}

interface OverlappingCardsClientProps {
  projects: Project[];
}

export default function OverlappingCardsClient({
  projects,
}: OverlappingCardsClientProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isSliderMode, setIsSliderMode] = useState(false);

  const handleCardClick = (index: number) => {
    setActiveIndex(index);
    setIsSliderMode(true);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % projects.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const handleCloseSlider = () => {
    setIsSliderMode(false);
  };

  if (isSliderMode) {
    const project = projects[activeIndex];
    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className='z-50 fixed inset-0 flex justify-center items-center bg-black/80 mt-20 p-4'
          onClick={handleCloseSlider}>
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className='bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl w-full max-w-2xl overflow-hidden'
            onClick={(e) => e.stopPropagation()}>
            <div className='relative h-64'>
              <Image
                src={project.image}
                alt={project.title}
                width={800}
                height={450}
                className='w-full h-full object-cover'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent'>
                <div className='right-6 bottom-6 left-6 absolute'>
                  <div className='mb-2 text-white/70 text-sm'>
                    {project.category}
                  </div>
                  <h3 className='mb-3 font-bold text-2xl'>{project.title}</h3>
                  <div
                    className={`w-full h-1 bg-gradient-to-r ${project.color} rounded-full`}></div>
                </div>
              </div>
            </div>
            <div className='p-6'>
              <p className='text-white/70'>{project.description}</p>
              <Link
                href={`/projects/${project.slug}`}
                className='inline-block mt-4 text-cyan-400 hover:underline'>
                View Full Project
              </Link>
            </div>
            <div className='flex justify-between p-4 border-white/10 border-t'>
              <button
                onClick={handlePrev}
                className='text-white/70 hover:text-white'>
                Previous
              </button>
              <button
                onClick={handleNext}
                className='text-white/70 hover:text-white'>
                Next
              </button>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <div className='relative flex flex-col items-center space-y-8 lg:space-y-0 mx-auto max-w-6xl'>
      {projects.map((project, i) => (
        <div
          key={i}
          className={`w-full sm:w-96 ${project.rotation} ${project.zIndex} group cursor-pointer lg:absolute`}
          style={{ top: `${i * 40}px`, left: `${i * 60}px` }}
          onClick={() => handleCardClick(i)}>
          <div className='bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl h-64 overflow-hidden group-hover:scale-105 transition-transform duration-500'>
            <div className='relative h-full'>
              <Image
                src={project.image}
                alt={project.title}
                width={600}
                height={400}
                className='w-full h-full object-cover'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent'>
                <div className='right-6 bottom-6 left-6 absolute'>
                  <div className='mb-2 text-white/70 text-sm'>
                    {project.category}
                  </div>
                  <h3 className='mb-3 font-bold text-2xl'>{project.title}</h3>
                  <div
                    className={`w-full h-1 bg-gradient-to-r ${project.color} rounded-full`}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
