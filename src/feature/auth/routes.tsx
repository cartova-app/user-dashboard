import { lazy } from 'react';
import GuestRoute from '@/core/utils/GuestRoute';
import SuspenseWrapper from '@/core/utils/SuspenseWrapper';

const Login = lazy(() => import('./pages/Login'));
const SignUp = lazy(() => import('./pages/SignUp'));

export const authRoutes = [
  {
    path: '/login',
    element: (
      <GuestRoute>
        <SuspenseWrapper>
          <Login />
        </SuspenseWrapper>
      </GuestRoute>
    ),
  },
  {
    path: '/sign-up',
    element: (
      <GuestRoute>
        <SuspenseWrapper>
          <SignUp />
        </SuspenseWrapper>
      </GuestRoute>
    ),
  },
];
