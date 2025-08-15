'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause } from 'lucide-react';

export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(true);

  return (
    <div className='flex items-center space-x-4 col-span-1 sm:col-span-6 lg:col-span-4 row-span-1 sm:row-span-2 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 backdrop-blur-xl p-6 border border-white/10 rounded-3xl'>
      <Button
        size='icon'
        onClick={() => setIsPlaying(!isPlaying)}
        className='bg-white/20 hover:bg-white/30 border-0 rounded-full w-12 h-12'>
        {isPlaying ? (
          <Pause className='w-6 h-6' />
        ) : (
          <Play className='w-6 h-6' />
        )}
      </Button>
      <div className='flex-1'>
        <div className='font-semibold text-sm'>Coding Vibes</div>
        <div className='text-white/70 text-xs'>Lo-fi Hip Hop</div>
        <div className='bg-white/20 mt-2 rounded-full w-full h-1'>
          <div className='bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full w-1/3 h-full'></div>
        </div>
      </div>
    </div>
  );
}
