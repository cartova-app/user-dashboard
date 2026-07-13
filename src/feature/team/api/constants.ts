import type { QueryDefinitions } from '@/core/constants/api';
import type { TeamMemberQueryParams } from '@/feature/team/types/team';

const teamAllKey = () => ['team'] as const;

export const teamDefinitions = {
  all: {
    key: teamAllKey,
    url: '/organizations/members',
  },
  members: {
    key: (params: TeamMemberQueryParams) => [...teamAllKey(), 'members', params] as const,
    url: '/organizations/members',
  },
  invitations: {
    key: (params: TeamMemberQueryParams) => [...teamAllKey(), 'invitations', params] as const,
    url: '/organizations/invitations',
  },
  activeMember: {
    key: () => [...teamAllKey(), 'active-member'] as const,
    url: '/organizations/members/active',
  },
  activeMemberRole: {
    key: () => [...teamAllKey(), 'active-member-role'] as const,
    url: '/organizations/members/active-role',
  },
  invite: {
    key: () => [...teamAllKey(), 'invite'] as const,
    url: '/organizations/members/invite',
  },
  cancelInvitation: {
    key: () => [...teamAllKey(), 'cancel-invitation'] as const,
    url: '/organizations/invitations/cancel',
  },
  updateRole: {
    key: () => [...teamAllKey(), 'update-role'] as const,
    url: '/organizations/members/role',
  },
  removeMember: {
    key: () => [...teamAllKey(), 'remove-member'] as const,
    url: '/organizations/members/remove',
  },
  leave: {
    key: () => [...teamAllKey(), 'leave'] as const,
    url: '/organizations/leave',
  },
} as const satisfies QueryDefinitions;
