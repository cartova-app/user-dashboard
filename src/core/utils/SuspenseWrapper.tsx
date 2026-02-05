import { GameLoader } from "@/core/components/ui/LoadingFallback";
import { Suspense } from "react";
const SuspenseWrapper = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<GameLoader />}>{children}</Suspense>
);

export default SuspenseWrapper;
