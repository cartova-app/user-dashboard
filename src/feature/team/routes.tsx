import { lazy } from 'react';
import SuspenseWrapper from '@/core/utils/SuspenseWrapper';

const TeamListPage = lazy(() => import('./pages/List'));

export const teamRoutes = [
  {
    path: '/team',
    element: (
      <SuspenseWrapper>
        <TeamListPage />
      </SuspenseWrapper>
    ),
  },
];
