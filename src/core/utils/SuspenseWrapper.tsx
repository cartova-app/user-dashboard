import { Suspense } from 'react';
import { GameLoader } from '@/core/components/ui/LoadingFallback';

const SuspenseWrapper = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<GameLoader />}>{children}</Suspense>
);

export default SuspenseWrapper;
