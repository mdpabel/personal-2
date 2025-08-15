import { ReactNode } from 'react';
import { cn } from '@/lib/utils'; // Assuming you have a cn utility from shadcn

interface TimelineProps {
  children: ReactNode;
  className?: string;
}

export function Timeline({ children, className }: TimelineProps) {
  return (
    <div className={cn('relative ml-4 border-white/20 border-l', className)}>
      {children}
    </div>
  );
}

interface TimelineItemProps {
  children: ReactNode;
  className?: string;
}

Timeline.Item = function TimelineItem({
  children,
  className,
}: TimelineItemProps) {
  return (
    <div className={cn('mb-8 ml-6', className)}>
      <span className='-left-2 absolute flex justify-center items-center bg-white/10 rounded-full ring-4 ring-black w-4 h-4'>
        <div className='bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full w-2 h-2'></div>
      </span>
      {children}
    </div>
  );
};

interface TimelineHeaderProps {
  children: ReactNode;
  className?: string;
}

Timeline.Header = function TimelineHeader({
  children,
  className,
}: TimelineHeaderProps) {
  return <div className={cn('flex flex-col', className)}>{children}</div>;
};

interface TimelineContentProps {
  children: ReactNode;
  className?: string;
}

Timeline.Content = function TimelineContent({
  children,
  className,
}: TimelineContentProps) {
  return <div className={cn('mt-2 text-white/70', className)}>{children}</div>;
};

interface TimelineTimeProps {
  children: ReactNode;
  className?: string;
}

Timeline.Time = function TimelineTime({
  children,
  className,
}: TimelineTimeProps) {
  return (
    <time
      className={cn(
        'font-normal text-white/50 text-sm leading-none',
        className,
      )}>
      {children}
    </time>
  );
};

interface TimelineTitleProps {
  children: ReactNode;
  className?: string;
}

Timeline.Title = function TimelineTitle({
  children,
  className,
}: TimelineTitleProps) {
  return (
    <h3 className={cn('font-semibold text-white text-lg', className)}>
      {children}
    </h3>
  );
};

interface TimelineSubtitleProps {
  children: ReactNode;
  className?: string;
}

Timeline.Subtitle = function TimelineSubtitle({
  children,
  className,
}: TimelineSubtitleProps) {
  return <p className={cn('text-white/70 text-sm', className)}>{children}</p>;
};
