import type { ReactNode } from 'react';
import { Button } from '@/core/components/ui/button';
import { cn } from '@/core/lib/utils';

interface EmptyStateProps {
  icon?: ReactNode;
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export default function EmptyState({ icon, title, description, actionLabel, onAction, className }: EmptyStateProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center py-16 px-4 text-center', className)}>
      {icon && <div className="w-16 h-16 rounded-full bg-muted grid place-items-center mb-4">{icon}</div>}
      {title && <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>}
      {description && <p className="text-sm text-muted-foreground max-w-sm mb-6">{description}</p>}
      {actionLabel && onAction && (
        <Button onClick={onAction} variant="primary">
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
