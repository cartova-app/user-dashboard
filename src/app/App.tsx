import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router";
import router from "./router";
import { I18nextProvider } from "react-i18next";
import i18n from "@/core/config/localization";
import { Toaster } from "@/core/components/ui/sonner";

const queryClient = new QueryClient();

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <Toaster />
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </I18nextProvider>
  );
}

export default App;
