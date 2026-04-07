import { Suspense } from 'react';
import { FullScreenLoader } from '@/core/components/ui/LoadingFallback';

const SuspenseWrapper = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<FullScreenLoader />}>{children}</Suspense>
);

export default SuspenseWrapper;
