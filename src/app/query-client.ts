import { QueryClient } from '@tanstack/react-query';

/**
 * Single QueryClient for the SPA — used by `QueryClientProvider` and route loaders
 * (`ensureQueryData` / `prefetchQuery`).
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      refetchOnWindowFocus: false,
    },
  },
});
