import { GameLoader } from '@/core/components/ui/LoadingFallback';

/** Full-screen pending UI while a route `loader` resolves (e.g. hard refresh, first entry). */
export function GlobalRoutePending() {
  return (
    <div className="bg-background flex min-h-screen w-full items-center justify-center">
      <GameLoader />
    </div>
  );
}
