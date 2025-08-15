'use client';

import { useState, useEffect } from 'react';

export function InteractiveBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className='z-0 fixed inset-0'>
      <div className='absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-cyan-900/20'></div>
      {/* Floating Orbs */}
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className='absolute opacity-30 blur-3xl rounded-full w-64 h-64 animate-pulse'
          style={{
            background: `radial-gradient(circle, ${
              [
                '#ff006e',
                '#8338ec',
                '#3a86ff',
                '#06ffa5',
                '#ffbe0b',
                '#fb5607',
              ][i]
            }40, transparent)`,
            left: `${20 + i * 15}%`,
            top: `${10 + i * 12}%`,
            animationDelay: `${i * 0.5}s`,
            transform: `translate(${mousePosition.x * 0.01 * (i + 1)}px, ${
              mousePosition.y * 0.01 * (i + 1)
            }px)`,
            transition: 'transform 0.3s ease-out',
          }}></div>
      ))}
      {/* Grid Pattern */}
      <div
        className='absolute inset-0 opacity-10'
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}></div>
    </div>
  );
}
