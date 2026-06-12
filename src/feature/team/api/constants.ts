import type { QueryDefinitions } from '@/core/constants/api';

const teamAllKey = () => ['team'] as const;

export const teamDefinitions = {
  all: {
    key: teamAllKey,
    url: '/api/dashboard/team',
  },
  list: {
    key: () => [...teamAllKey(), 'list'] as const,
    url: '/api/dashboard/team',
  },
} as const satisfies QueryDefinitions;
