import type authClient from '@/core/config/auth-client';

type ResponseData<T> = T extends { data: infer D } ? D : never;
type ArrayItem<T> = T extends readonly (infer U)[] ? U : T extends (infer U)[] ? U : never;

export type TeamListMembersResponse = Awaited<ReturnType<typeof authClient.organization.listMembers>>;
export type TeamListInvitationsResponse = Awaited<ReturnType<typeof authClient.organization.listInvitations>>;
export type TeamInviteMemberResponse = Awaited<ReturnType<typeof authClient.organization.inviteMember>>;
export type TeamCancelInvitationResponse = Awaited<ReturnType<typeof authClient.organization.cancelInvitation>>;
export type TeamUpdateMemberRoleResponse = Awaited<ReturnType<typeof authClient.organization.updateMemberRole>>;
export type TeamRemoveMemberResponse = Awaited<ReturnType<typeof authClient.organization.removeMember>>;
export type TeamLeaveOrganizationResponse = Awaited<ReturnType<typeof authClient.organization.leave>>;
export type TeamActiveMemberResponse = Awaited<ReturnType<typeof authClient.organization.getActiveMember>>;
export type TeamActiveMemberRoleResponse = Awaited<ReturnType<typeof authClient.organization.getActiveMemberRole>>;

type TeamMembersData = ResponseData<TeamListMembersResponse>;
type TeamInvitationsData = ResponseData<TeamListInvitationsResponse>;
type TeamActiveMemberData = ResponseData<TeamActiveMemberResponse>;
type TeamActiveMemberRoleData = ResponseData<TeamActiveMemberRoleResponse>;

export type TeamMemberSource = ArrayItem<
  TeamMembersData extends { members: infer T }
    ? T
    : TeamMembersData extends readonly unknown[]
      ? TeamMembersData
      : [Record<string, unknown>]
>;

export type TeamInvitationSource = ArrayItem<
  TeamInvitationsData extends { invitations: infer T }
    ? T
    : TeamInvitationsData extends readonly unknown[]
      ? TeamInvitationsData
      : [Record<string, unknown>]
>;

export type TeamActiveMemberSource = TeamActiveMemberData extends {
  member: infer T;
}
  ? T
  : TeamActiveMemberData extends Record<string, unknown>
    ? TeamActiveMemberData
    : null;

export type TeamActiveMemberRoleSource = TeamActiveMemberRoleData extends string
  ? TeamActiveMemberRoleData
  : TeamActiveMemberRoleData extends { role: infer T }
    ? T
    : string;

export type TeamStatusFilter = 'all' | 'active' | 'invited';
export type TeamMfaFilter = 'all' | 'enabled' | 'disabled';

export interface TeamMemberQueryParams {
  search: string;
  status: TeamStatusFilter | '';
  role: string;
  mfa?: TeamMfaFilter | '';
}

export type TeamRowKind = 'member' | 'invitation';

export interface TeamRowModel {
  id: string;
  organizationId?: string;
  kind: TeamRowKind;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'invited';
  mfaEnabled: boolean;
  isYou: boolean;
  createdAt?: number;
}
