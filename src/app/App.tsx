import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { I18nextProvider } from 'react-i18next';
import { RouterProvider } from 'react-router-dom';
import { Toaster } from '@/core/components/ui/sonner';
import i18n from '@/core/config/localization';
import { ThemeProvider } from '@/core/providers/theme-provider';
import router from './router';

const queryClient = new QueryClient();

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <Toaster />
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <RouterProvider router={router} />
        </ThemeProvider>
      </QueryClientProvider>
    </I18nextProvider>
  );
}

export default App;
