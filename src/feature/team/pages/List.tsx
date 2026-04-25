import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
    CheckCircle2,
    Edit3,
    MailPlus,
    ShieldCheck,
    User,
    UserRoundPlus,
    Users,
    SearchX,
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';
import DataTable, { type DataTableColumn } from '@/core/components/common/DataTable';
import EmptyState from '@/core/components/common/EmptyState';
import PageHeading from '@/core/components/common/PageHeading';
import SearchInput from '@/core/components/common/SearchInput';
import { SelectWithIcon } from '@/core/components/common/Select';
import StatusCell from '@/core/components/common/StatusCell';
import { Badge } from '@/core/components/ui/badge';
import { Button } from '@/core/components/ui/button';
import { SectionLoader } from '@/core/components/ui/LoadingFallback';
import authClient from '@/core/config/auth-client';
import {
    inviteMemberMutationOptions,
    teamActiveMemberQueryOptions,
    teamActiveMemberRoleQueryOptions,
    teamInvitationsQueryOptions,
    teamMembersQueryOptions,
} from '@/feature/team/api/teamQueryDefinitions';
import ConfirmTeamActionModal, { type TeamConfirmAction } from '@/feature/team/components/ConfirmTeamActionModal';
import InviteMemberModal from '@/feature/team/components/InviteMemberModal';
import ManageAccessModal from '@/feature/team/components/ManageAccessModal';
import TeamLoadErrorState from '@/feature/team/components/TeamLoadErrorState';
import TeamRowActionsDropdown from '@/feature/team/components/TeamRowActionsDropdown';
import type {
    TeamInvitationSource,
    TeamMemberQueryParams,
    TeamMemberSource,
    TeamRowModel,
} from '@/feature/team/types/team';
import { getRoleText } from '@/feature/team/utils/team';

const DEFAULT_FILTERS: TeamMemberQueryParams = {
    search: '',
    status: '',
    role: '',
    mfa: '',
};

const PAGE_SIZE = 10;

type TeamTableRow = TeamRowModel & Record<string, unknown>;

const isRecord = (value: unknown): value is Record<string, unknown> => typeof value === 'object' && value !== null;

const readString = (value: Record<string, unknown>, key: string): string | undefined => {
    const rawValue = value[key];
    return typeof rawValue === 'string' ? rawValue : undefined;
};

const readBoolean = (value: Record<string, unknown>, key: string): boolean | undefined => {
    const rawValue = value[key];
    return typeof rawValue === 'boolean' ? rawValue : undefined;
};

const hasManagementAccess = (role: string) => role === 'owner' || role === 'admin';

const parseCreatedAt = (value: unknown): number | undefined => {
    if (!value) return undefined;
    if (typeof value === 'string' || typeof value === 'number') return new Date(value).getTime();
    if (value instanceof Date) return value.getTime();
    return undefined;
};

const buildMemberRow = (
    member: TeamMemberSource,
    sessionUserId: string | undefined,
    sessionEmail: string | undefined,
): TeamRowModel | null => {
    if (!isRecord(member)) return null;

    const user = isRecord(member.user) ? member.user : undefined;
    const id = readString(member, 'id');
    const userId = readString(member, 'userId');
    const roleValue = readString(member, 'role');
    const email = (user ? readString(user, 'email') : undefined) ?? '';
    const name = (user ? readString(user, 'name') : undefined) ?? (email ? email.split('@')[0] : 'Member');

    if (!id || !roleValue) return null;

    const isYou =
        (sessionUserId !== undefined && userId === sessionUserId) ||
        (sessionEmail !== undefined && email.length > 0 && email.toLowerCase() === sessionEmail.toLowerCase());

    return {
        id,
        kind: 'member',
        name,
        email,
        role: roleValue.toLowerCase(),
        status: 'active',
        mfaEnabled: (user ? readBoolean(user, 'twoFactorEnabled') : undefined) ?? false,
        isYou,
        createdAt: parseCreatedAt(member.createdAt),
    };
};

const buildInvitationRow = (invitation: TeamInvitationSource): TeamRowModel | null => {
    if (!isRecord(invitation)) return null;

    const id = readString(invitation, 'id');
    const email = readString(invitation, 'email') ?? '';
    const roleValue = readString(invitation, 'role');

    if (!id || !roleValue) return null;

    return {
        id,
        kind: 'invitation',
        name: email ? email.split('@')[0] : 'Pending invite',
        email,
        role: roleValue.toLowerCase(),
        status: 'invited',
        mfaEnabled: false,
        isYou: false,
        createdAt: parseCreatedAt(invitation.createdAt),
    };
};

const filterRows = (rows: TeamRowModel[], filters: TeamMemberQueryParams) => {
    const searchLower = filters.search.trim().toLowerCase();

    return rows.filter((row) => {
        if (
            searchLower.length > 0 &&
            !row.name.toLowerCase().includes(searchLower) &&
            !row.email.toLowerCase().includes(searchLower)
        ) {
            return false;
        }

        if (filters.status && filters.status !== 'all' && row.status !== filters.status) return false;
        if (filters.role && filters.role !== 'all' && row.role !== filters.role) return false;
        if (filters.mfa === 'enabled' && !row.mfaEnabled) return false;
        if (filters.mfa === 'disabled' && row.mfaEnabled) return false;

        return true;
    });
};

const List = () => {
    const queryClient = useQueryClient();
    const { data: sessionData } = authClient.useSession();

    const [filters, setFilters] = useState<TeamMemberQueryParams>(DEFAULT_FILTERS);
    const [inviteModalOpen, setInviteModalOpen] = useState(false);
    const [roleModalRow, setRoleModalRow] = useState<TeamRowModel | null>(null);
    const [confirmAction, setConfirmAction] = useState<TeamConfirmAction | null>(null);

    const organizationId = sessionData?.session?.activeOrganizationId;

    const {
        data: membersData,
        isPending: isMembersPending,
        isRefetching: isMembersRefetching,
        error: membersError,
        refetch: refetchMembers,
    } = useQuery(teamMembersQueryOptions(filters, organizationId || ''));

    const {
        data: invitationsData,
        isPending: isInvitationsPending,
        isRefetching: isInvitationsRefetching,
        error: invitationsError,
        refetch: refetchInvitations,
    } = useQuery(teamInvitationsQueryOptions(filters, organizationId || ''));

    const { error: activeMemberError, refetch: refetchActiveMember } = useQuery(teamActiveMemberQueryOptions());

    const {
        data: activeRoleData,
        error: activeRoleError,
        refetch: refetchActiveRole,
    } = useQuery(teamActiveMemberRoleQueryOptions());

    const { mutateAsync: inviteMember, isPending: isInvitePending } = useMutation(
        inviteMemberMutationOptions(queryClient),
    );

    const members = useMemo<TeamMemberSource[]>(() => {
        if (!membersData?.data || !isRecord(membersData.data) || !Array.isArray(membersData.data.members)) {
            return [];
        }
        return membersData.data.members as TeamMemberSource[];
    }, [membersData]);

    const invitations = useMemo<TeamInvitationSource[]>(() => {
        if (!invitationsData?.data || !isRecord(invitationsData.data) || !Array.isArray(invitationsData.data.invitations)) {
            return [];
        }
        return invitationsData.data.invitations as TeamInvitationSource[];
    }, [invitationsData]);

    const sessionUserId = sessionData?.session?.userId;
    const sessionEmail = sessionData?.user?.email;

    const rowModels = useMemo(() => {
        const memberRows = members
            .map((member) => buildMemberRow(member, sessionUserId, sessionEmail))
            .filter((row): row is TeamRowModel => row !== null);

        const invitationRows = invitations
            .map((invitation) => buildInvitationRow(invitation))
            .filter((row): row is TeamRowModel => row !== null);

        return [...memberRows, ...invitationRows];
    }, [members, invitations, sessionUserId, sessionEmail]);

    const filteredRows = useMemo(() => filterRows(rowModels, filters), [rowModels, filters]);

    const availableRoles = useMemo(() => {
        const dynamicRoles = rowModels.map((row) => row.role).filter((role) => role.trim().length > 0);
        const merged = new Set<string>(['owner', 'admin', 'member', ...dynamicRoles]);
        return Array.from(merged.values());
    }, [rowModels]);

    const currentRole = useMemo(() => activeRoleData?.data?.role?.toLowerCase() ?? 'member', [activeRoleData]);

    const canManageMembers = hasManagementAccess(currentRole);
    const hasError = membersError || invitationsError || activeMemberError || activeRoleError;
    const isInitialLoading = isMembersPending || isInvitationsPending;
    const isRefreshing = isMembersRefetching || isInvitationsRefetching;

    const updateFilters = (updater: (current: TeamMemberQueryParams) => TeamMemberQueryParams) => {
        setFilters((current) => updater(current));
    };

    const resetFilters = () => setFilters(DEFAULT_FILTERS);

    const onRetry = async () => {
        await Promise.allSettled([refetchMembers(), refetchInvitations(), refetchActiveMember(), refetchActiveRole()]);
    };

    const handleResendInvite = async (row: TeamRowModel) => {
        try {
            await inviteMember({ email: row.email, role: row.role });
            toast.success('Invitation resent successfully');
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Failed to resend invitation';
            toast.error(message);
        }
    };

    const columns: DataTableColumn<TeamTableRow>[] = [
        {
            field: 'name',
            headerName: 'User',
            flex: 2,
            sortable: true,
            headerIcon: <User className="size-4 text-muted-foreground" />,
            renderCell: ({ row }) => (
                <div className="flex items-center gap-2">
                    <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-foreground">{row.name}</p>
                        <p className="truncate text-xs text-muted-foreground">{row.email || 'No email'}</p>
                    </div>
                    {row.isYou && (
                        <Badge variant="outline" className="rounded-full px-2 py-0.5 text-[10px] uppercase tracking-wide">
                            You
                        </Badge>
                    )}
                </div>
            ),
        },
        {
            field: 'status',
            headerName: 'Status',
            flex: 1,
            sortable: true,
            headerIcon: <CheckCircle2 className="size-4 text-muted-foreground" />,
            renderCell: ({ row }) => <StatusCell status={row.status} />,
        },
        {
            field: 'mfaEnabled',
            headerName: 'MFA',
            flex: 1,
            headerIcon: <ShieldCheck className="size-4 text-muted-foreground" />,
            renderCell: ({ row }) =>
                row.kind === 'invitation' ? (
                    <Badge variant="outline">Pending</Badge>
                ) : (
                    <StatusCell status={row.mfaEnabled ? 'active' : 'inactive'} />
                ),
        },
        {
            field: 'role',
            headerName: 'Role',
            flex: 1,
            sortable: true,
            headerIcon: <ShieldCheck className="size-4 text-muted-foreground" />,
            renderCell: ({ row }) => <Badge variant="outline">{getRoleText(row.role)}</Badge>,
        },
        {
            field: 'id',
            headerName: 'Action',
            width: '120px',
            align: 'right',
            headerAlign: 'right',
            headerIcon: <Edit3 className="size-4 text-muted-foreground" />,
            renderCell: ({ row }) => (
                <div className="flex items-center justify-end gap-2">
                    {row.kind === 'invitation' && canManageMembers && (
                        <Button size="sm" variant="ghost" onClick={() => handleResendInvite(row)} disabled={isInvitePending}>
                            <MailPlus className="size-4" />
                            Resend
                        </Button>
                    )}
                    <TeamRowActionsDropdown
                        row={row}
                        currentRole={currentRole}
                        canManageMembers={canManageMembers}
                        onManageAccess={setRoleModalRow}
                        onLeave={(actionRow) => setConfirmAction({ type: 'leave', row: actionRow })}
                        onRemoveMember={(actionRow) => setConfirmAction({ type: 'remove', row: actionRow })}
                        onCancelInvite={(actionRow) => setConfirmAction({ type: 'cancel', row: actionRow })}
                    />
                </div>
            ),
        },
    ];

    if (isInitialLoading) {
        return <SectionLoader className="min-h-[420px]" />;
    }

    if (hasError) {
        return <TeamLoadErrorState onRetry={onRetry} />;
    }

    return (
        <div className="space-y-8 text-start">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <PageHeading heading="Team" description="Manage organization members, roles, and pending invitations." />
                <Button variant="primary" onClick={() => setInviteModalOpen(true)} disabled={!canManageMembers}>
                    <UserRoundPlus className="size-4" />
                    Invite member
                </Button>
            </div>

            <div className="space-y-4 rounded-2xl border bg-card p-4 md:p-5">
                <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                    <SearchInput
                        value={filters.search}
                        onChange={(search) => updateFilters((current) => ({ ...current, search }))}
                        placeholder="Search by name or email"
                        showClearButton
                        containerClassName="w-full lg:max-w-md"
                        className="bg-background"
                    />

                    <div className="flex flex-wrap items-center gap-2">
                        <Badge variant="outline" className="rounded-full px-3 py-1 text-xs">
                            {filteredRows.length} {filteredRows.length === 1 ? 'result' : 'results'}
                        </Badge>
                        <Button variant="ghost" size="sm" onClick={resetFilters}>
                            Reset filters
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                    <SelectWithIcon
                        value={filters.status}
                        onValueChange={(status) =>
                            updateFilters((current) => ({ ...current, status: status as TeamMemberQueryParams['status'] }))
                        }
                        placeholder="Status"
                        icon={<CheckCircle2 className="size-4" />}
                        options={[
                            { value: 'all', label: 'All statuses' },
                            { value: 'active', label: 'Active' },
                            { value: 'invited', label: 'Invited' },
                        ]}
                    />
                    <SelectWithIcon
                        value={filters.role}
                        onValueChange={(role) => updateFilters((current) => ({ ...current, role }))}
                        placeholder="Role"
                        icon={<ShieldCheck className="size-4" />}
                        options={[
                            { value: 'all', label: 'All roles' },
                            ...availableRoles.map((role) => ({ value: role, label: getRoleText(role) })),
                        ]}
                    />
                    <SelectWithIcon
                        value={filters.mfa}
                        onValueChange={(mfa) =>
                            updateFilters((current) => ({ ...current, mfa: mfa as TeamMemberQueryParams['mfa'] }))
                        }
                        placeholder="MFA"
                        icon={<ShieldCheck className="size-4" />}
                        options={[
                            { value: 'all', label: 'All MFA states' },
                            { value: 'enabled', label: 'MFA enabled' },
                            { value: 'disabled', label: 'MFA disabled' },
                        ]}
                    />
                </div>

                {rowModels.length === 0 ? (
                    <EmptyState
                        icon={<Users className="size-8 text-muted-foreground" />}
                        title="No team members yet"
                        description="Invite your first teammate to start collaborating in this organization."
                        actionLabel={canManageMembers ? 'Invite member' : undefined}
                        onAction={canManageMembers ? () => setInviteModalOpen(true) : undefined}
                    />
                ) : filteredRows.length === 0 ? (
                    <EmptyState
                        icon={<SearchX className="size-8 text-muted-foreground" />}
                        title="No matching people"
                        description="Try adjusting your search terms or filter selections."
                    />
                ) : (
                    <DataTable
                        columns={columns}
                        rows={filteredRows as TeamTableRow[]}
                        pageSize={PAGE_SIZE}
                    />
                )}
            </div>

            <InviteMemberModal open={inviteModalOpen} onOpenChange={setInviteModalOpen} availableRoles={availableRoles} />

            <ManageAccessModal
                row={roleModalRow}
                availableRoles={availableRoles}
                onOpenChange={(open) => {
                    if (!open) setRoleModalRow(null);
                }}
            />

            <ConfirmTeamActionModal
                action={confirmAction}
                onOpenChange={(open) => {
                    if (!open) setConfirmAction(null);
                }}
            />

            {isRefreshing && <p className="text-xs text-muted-foreground">Refreshing team data...</p>}
        </div>
    );
};

export default List;
