import {
  mutationOptions,
  type QueryClient,
  queryOptions,
} from "@tanstack/react-query";
import authClient from "@/core/config/auth-client";
import { teamDefinitions } from "@/feature/team/api/constants";
import type {
  TeamActiveMemberResponse,
  TeamActiveMemberRoleResponse,
  TeamCancelInvitationResponse,
  TeamInviteMemberResponse,
  TeamLeaveOrganizationResponse,
  TeamListInvitationsResponse,
  TeamListMembersResponse,
  TeamMemberQueryParams,
  TeamRemoveMemberResponse,
  TeamUpdateMemberRoleResponse,
} from "@/feature/team/types/team";

export const teamDefs = teamDefinitions;

const getErrorMessage = (error: unknown, fallback: string) => {
  if (typeof error !== "object" || error === null) {
    return fallback;
  }

  if (
    "message" in error &&
    typeof error.message === "string" &&
    error.message.trim().length > 0
  ) {
    return error.message;
  }

  return fallback;
};

type ListMembersParams = Parameters<typeof authClient.organization.listMembers>;
type ListInvitationsParams = Parameters<
  typeof authClient.organization.listInvitations
>;

const buildListMembersParams = (
  params: TeamMemberQueryParams,
  organizationId: string,
): ListMembersParams => {
  const query: Record<string, string> = {
    organizationId,
  };

  if (params.search.trim()) {
    query.searchValue = params.search.trim();
  }

  if (params.status && params.status !== "all") {
    query.status = params.status;
  }

  if (params.role && params.role !== "all") {
    query.role = params.role;
  }

  if (params.mfa && params.mfa !== "all") {
    query.mfaEnabled = params.mfa === "enabled" ? "true" : "false";
  }

  if (params.sort && params.sort !== "recent") {
    const [sortBy, sortDirection] = params.sort.split("-");
    query.sortBy = sortBy;
    query.sortDirection = sortDirection;
  }

  return [{ query }] as unknown as ListMembersParams;
};

const buildListInvitationsParams = (
  params: TeamMemberQueryParams,
  organizationId: string,
): ListInvitationsParams => {
  const query: Record<string, string> = {
    organizationId,
  };

  if (params.search.trim()) {
    query.searchValue = params.search.trim();
  }

  if (params.role && params.role !== "all") {
    query.role = params.role;
  }

  return [{ query }] as unknown as ListInvitationsParams;
};

export const teamMembersQueryOptions = (
  params: TeamMemberQueryParams,
  organizationId: string,
) =>
  queryOptions({
    queryKey: teamDefs.members.key(params),
    queryFn: async (): Promise<TeamListMembersResponse> => {
      const response = await authClient.organization.listMembers(
        ...buildListMembersParams(params, organizationId),
      );

      if (response.error) {
        throw new Error(
          getErrorMessage(response.error, "Failed to load team members"),
        );
      }

      return response;
    },
    staleTime: 30_000,
  });

export const teamInvitationsQueryOptions = (
  params: TeamMemberQueryParams,
  organizationId: string,
) =>
  queryOptions({
    queryKey: teamDefs.invitations.key(params),
    queryFn: async (): Promise<TeamListInvitationsResponse> => {
      const response = await authClient.organization.listInvitations(
        ...buildListInvitationsParams(params, organizationId),
      );

      if (response.error) {
        throw new Error(
          getErrorMessage(response.error, "Failed to load invitations"),
        );
      }

      return response;
    },
    staleTime: 30_000,
  });

export const teamActiveMemberQueryOptions = () =>
  queryOptions({
    queryKey: teamDefs.activeMember.key(),
    queryFn: async (): Promise<TeamActiveMemberResponse> => {
      const response = await authClient.organization.getActiveMember();

      if (response.error) {
        throw new Error(
          getErrorMessage(response.error, "Failed to load active member"),
        );
      }

      return response;
    },
    staleTime: 30_000,
  });

export const teamActiveMemberRoleQueryOptions = () =>
  queryOptions({
    queryKey: teamDefs.activeMemberRole.key(),
    queryFn: async (): Promise<TeamActiveMemberRoleResponse> => {
      const response = await authClient.organization.getActiveMemberRole();

      if (response.error) {
        throw new Error(
          getErrorMessage(response.error, "Failed to load active role"),
        );
      }

      return response;
    },
    staleTime: 30_000,
  });

type InviteMemberParams = Parameters<
  typeof authClient.organization.inviteMember
>;
type CancelInvitationParams = Parameters<
  typeof authClient.organization.cancelInvitation
>;
type UpdateMemberRoleParams = Parameters<
  typeof authClient.organization.updateMemberRole
>;
type RemoveMemberParams = Parameters<
  typeof authClient.organization.removeMember
>;
type LeaveParams = Parameters<typeof authClient.organization.leave>;

const invalidateTeamQueries = (queryClient: QueryClient) => {
  void queryClient.invalidateQueries({ queryKey: teamDefs.all.key() });
};

export const inviteMemberMutationOptions = (queryClient: QueryClient) =>
  mutationOptions({
    mutationKey: teamDefs.invite.key(),
    mutationFn: async (payload: {
      email: string;
      role: string;
    }): Promise<TeamInviteMemberResponse> => {
      const params = [
        { email: payload.email, role: payload.role },
      ] as unknown as InviteMemberParams;
      const response = await authClient.organization.inviteMember(...params);

      if (response.error) {
        throw new Error(
          getErrorMessage(response.error, "Failed to invite team member"),
        );
      }

      return response;
    },
    onSuccess: () => invalidateTeamQueries(queryClient),
  });

export const cancelInvitationMutationOptions = (queryClient: QueryClient) =>
  mutationOptions({
    mutationKey: teamDefs.cancelInvitation.key(),
    mutationFn: async (payload: {
      invitationId: string;
    }): Promise<TeamCancelInvitationResponse> => {
      const params = [
        { invitationId: payload.invitationId },
      ] as unknown as CancelInvitationParams;
      const response = await authClient.organization.cancelInvitation(
        ...params,
      );

      if (response.error) {
        throw new Error(
          getErrorMessage(response.error, "Failed to cancel invitation"),
        );
      }

      return response;
    },
    onSuccess: () => invalidateTeamQueries(queryClient),
  });

export const updateMemberRoleMutationOptions = (queryClient: QueryClient) =>
  mutationOptions({
    mutationKey: teamDefs.updateRole.key(),
    mutationFn: async (payload: {
      memberId: string;
      role: string;
    }): Promise<TeamUpdateMemberRoleResponse> => {
      const params = [
        { memberId: payload.memberId, role: payload.role },
      ] as unknown as UpdateMemberRoleParams;
      const response = await authClient.organization.updateMemberRole(
        ...params,
      );

      if (response.error) {
        throw new Error(
          getErrorMessage(response.error, "Failed to update role"),
        );
      }

      return response;
    },
    onSuccess: () => invalidateTeamQueries(queryClient),
  });

export const removeMemberMutationOptions = (queryClient: QueryClient) =>
  mutationOptions({
    mutationKey: teamDefs.removeMember.key(),
    mutationFn: async (payload: {
      memberId: string;
    }): Promise<TeamRemoveMemberResponse> => {
      const params = [
        { memberId: payload.memberId },
      ] as unknown as RemoveMemberParams;
      const response = await authClient.organization.removeMember(...params);

      if (response.error) {
        throw new Error(
          getErrorMessage(response.error, "Failed to remove member"),
        );
      }

      return response;
    },
    onSuccess: () => invalidateTeamQueries(queryClient),
  });

export const leaveOrganizationMutationOptions = (queryClient: QueryClient) =>
  mutationOptions({
    mutationKey: teamDefs.leave.key(),
    mutationFn: async (): Promise<TeamLeaveOrganizationResponse> => {
      const response = await authClient.organization.leave(
        ...([] as unknown as LeaveParams),
      );

      if (response.error) {
        throw new Error(
          getErrorMessage(response.error, "Failed to leave organization"),
        );
      }

      return response;
    },
    onSuccess: () => invalidateTeamQueries(queryClient),
  });
