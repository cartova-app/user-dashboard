import type { QueryDefinitions } from "@/core/constants/api";

const profileAllKey = () => ["profile"] as const;

export const profileDefinitions = {
  all: {
    key: profileAllKey,
    url: "/api/dashboard/profile",
  },
  createStore: {
    key: () => [...profileAllKey(), "create-store"] as const,
    url: "/api/dashboard/stores",
  },
} as const satisfies QueryDefinitions;
