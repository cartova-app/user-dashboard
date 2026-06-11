import type React from 'react';
import { Button } from '@/core/components/ui/button';

type EmptyBillingStateProps = {
  icon: React.ReactNode;
  label: string;
  action: string;
};

const EmptyBillingState = ({ icon, label, action }: EmptyBillingStateProps) => (
  <div className="flex min-h-[160px] flex-col items-center justify-center gap-5 text-center">
    <div className="flex size-16 items-center justify-center rounded-full bg-muted text-foreground">{icon}</div>
    <p className="text-base text-muted-foreground">{label}</p>
    <Button variant="outline" className="h-12 rounded-xl border-2 px-8 text-base">
      {action}
    </Button>
  </div>
);

export default EmptyBillingState;
