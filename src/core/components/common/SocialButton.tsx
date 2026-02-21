// components/SocialButton.js

import type { ReactNode } from 'react';
import { Button } from '@/core/components/ui/button';
import { cn } from '@/core/lib/utils';

interface SocialButtonProps {
  children: ReactNode;
  icon: ReactNode;
  className?: string;
}

export function SocialButton({ children, icon, className = '' }: SocialButtonProps) {
  return (
    <Button
      variant="outline"
      className={cn(
        'w-full flex items-center justify-center gap-3 py-2.5 px-4 text-sm font-medium rounded-xl',
        'bg-background hover:bg-accent/50 border-2 border-border',
        'dark:bg-card dark:hover:bg-accent/30 dark:border-border',
        'transition-all duration-200 ease-out',
        'hover:shadow-md hover:scale-[1.01] active:scale-[0.99]',
        className,
      )}
    >
      {icon}
      {children}
    </Button>
  );
}
