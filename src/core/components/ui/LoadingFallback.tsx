import { DotLoader } from '@/core/components/ui/dot-loader';
import { cn } from '@/core/lib/utils';

type LoaderMode = 'fullscreen' | 'section' | 'inline';

type GameLoaderProps = {
  mode?: LoaderMode;
  className?: string;
  dotClassName?: string;
};

const game = [
  [14, 7, 0, 8, 6, 13, 20],
  [14, 7, 13, 20, 16, 27, 21],
  [14, 20, 27, 21, 34, 24, 28],
  [27, 21, 34, 28, 41, 32, 35],
  [34, 28, 41, 35, 48, 40, 42],
  [34, 28, 41, 35, 48, 42, 46],
  [34, 28, 41, 35, 48, 42, 38],
  [34, 28, 41, 35, 48, 30, 21],
  [34, 28, 41, 48, 21, 22, 14],
  [34, 28, 41, 21, 14, 16, 27],
  [34, 28, 21, 14, 10, 20, 27],
  [28, 21, 14, 4, 13, 20, 27],
  [28, 21, 14, 12, 6, 13, 20],
  [28, 21, 14, 6, 13, 20, 11],
  [28, 21, 14, 6, 13, 20, 10],
  [14, 6, 13, 20, 9, 7, 21],
];
const modeClassName: Record<LoaderMode, string> = {
  fullscreen: 'bg-background flex min-h-screen w-full items-center justify-center',
  section: 'flex min-h-[300px] w-full items-center justify-center',
  inline: 'inline-flex items-center justify-center',
};

export const GameLoader = ({
  mode = 'fullscreen',
  className,
  dotClassName,
}: GameLoaderProps) => {
  return (
    <div role="status" aria-live="polite" className={cn(modeClassName[mode], className)}>
      <DotLoader
        frames={game}
        className="gap-0.5"
        dotClassName={cn('size-1.5 bg-foreground/15 [&.active]:bg-primary', dotClassName)}
      />
      <span className="sr-only">Loading</span>
    </div>
  );
};

export const FullScreenLoader = (props: Omit<GameLoaderProps, 'mode'>) => (
  <GameLoader mode="fullscreen" {...props} />
);

export const SectionLoader = (props: Omit<GameLoaderProps, 'mode'>) => (
  <GameLoader mode="section" {...props} />
);

export const InlineLoader = (props: Omit<GameLoaderProps, 'mode'>) => (
  <GameLoader mode="inline" {...props} />
);
