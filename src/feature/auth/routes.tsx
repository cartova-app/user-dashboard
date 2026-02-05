import { lazy } from "react";
import SuspenseWrapper from "@/core/utils/SuspenseWrapper";
import GuestRoute from "@/core/utils/GuestRoute";

const Login = lazy(() => import("./pages/Login"));
const SignUp = lazy(() => import("./pages/SignUp"));

export const authRoutes = [
  {
    path: "/login",
    element: (
      <GuestRoute>
        <SuspenseWrapper>
          <Login />
        </SuspenseWrapper>
      </GuestRoute>
    ),
  },
  {
    path: "/sign-up",
    element: (
      <GuestRoute>
        <SuspenseWrapper>
          <SignUp />
        </SuspenseWrapper>
      </GuestRoute>
    ),
  },
];
