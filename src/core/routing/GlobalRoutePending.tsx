import { FullScreenLoader } from '@/core/components/ui/LoadingFallback';

/** Full-screen pending UI while a route `loader` resolves (e.g. hard refresh, first entry). */
export function GlobalRoutePending() {
  return <FullScreenLoader />;
}
