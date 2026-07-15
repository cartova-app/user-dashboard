import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { I18nextProvider } from 'react-i18next';
import { RouterProvider } from 'react-router-dom';
import { ErrorBoundary } from '@/core/components/common/ErrorBoundary';
import { Toaster } from '@/core/components/ui/sonner';
import i18n from '@/core/config/localization';
import SessionQuerySyncProvider from '@/core/providers/session-query-sync-provider';
import { AssistantProvider } from '@/core/providers/assistant-provider';
import { ThemeProvider } from '@/core/providers/theme-provider';
import { queryClient } from './query-client';
import router from './router';

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <Toaster />
      <QueryClientProvider client={queryClient}>
        <SessionQuerySyncProvider />
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <AssistantProvider>
            <ErrorBoundary>
              <RouterProvider router={router} />
            </ErrorBoundary>
          </AssistantProvider>
        </ThemeProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </I18nextProvider>
  );
}

export default App;
