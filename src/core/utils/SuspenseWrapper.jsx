import LoadingFallback from "@core/components/ui/LoadingFallback";
import { Suspense } from "react";
const SuspenseWrapper = ({ children }) => (
    <Suspense fallback={<LoadingFallback />}>{children}</Suspense>
);

export default SuspenseWrapper