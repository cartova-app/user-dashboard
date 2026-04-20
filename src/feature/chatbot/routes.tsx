import { lazy } from 'react';
import SuspenseWrapper from '@/core/utils/SuspenseWrapper';

const ChatbotPage = lazy(() => import('./pages/ChatbotPage'));

export const chatbotRoutes = [
  {
    path: '/stores/:storeId/chatbot',
    element: (
      <SuspenseWrapper>
        <ChatbotPage />
      </SuspenseWrapper>
    ),
  },
];
