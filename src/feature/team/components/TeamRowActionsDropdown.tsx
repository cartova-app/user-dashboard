import { CheckCircle2, MoreHorizontal, ShieldCheck, Trash2 } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/core/components/ui/dropdown-menu';
import type { TeamRowModel } from '@/feature/team/types/team';

interface TeamRowActionsDropdownProps {
    row: TeamRowModel;
    currentRole: string;
    canManageMembers: boolean;
    onManageAccess: (row: TeamRowModel) => void;
    onLeave: (row: TeamRowModel) => void;
    onRemoveMember: (row: TeamRowModel) => void;
    onCancelInvite: (row: TeamRowModel) => void;
}

const getCanManageAccess = (row: TeamRowModel, canManageMembers: boolean) =>
    row.kind === 'member' && !row.isYou && canManageMembers;

const getCanRemoveMember = (row: TeamRowModel, currentRole: string, canManageMembers: boolean) => {
    if (row.kind !== 'member' || row.isYou || !canManageMembers) {
        return false;
    }

    if (row.role === 'owner' && currentRole !== 'owner') {
        return false;
    }

    return true;
};

const getCanCancelInvite = (row: TeamRowModel, canManageMembers: boolean) =>
    row.kind === 'invitation' && canManageMembers;

const getCanLeave = (row: TeamRowModel) => row.kind === 'member' && row.isYou;

export default function TeamRowActionsDropdown({
    row,
    currentRole,
    canManageMembers,
    onManageAccess,
    onLeave,
    onRemoveMember,
    onCancelInvite,
}: TeamRowActionsDropdownProps) {
    const canManageAccess = getCanManageAccess(row, canManageMembers);
    const canRemoveMember = getCanRemoveMember(row, currentRole, canManageMembers);
    const canCancelInvite = getCanCancelInvite(row, canManageMembers);
    const canLeave = getCanLeave(row);

    const hasActions = canManageAccess || canLeave || canRemoveMember || canCancelInvite;

    if (!hasActions) {
        return null;
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button
                    type="button"
                    className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    aria-label="Open row actions"
                >
                    <MoreHorizontal className="size-4" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {canManageAccess && (
                    <DropdownMenuItem onClick={() => onManageAccess(row)} className="cursor-pointer">
                        <ShieldCheck className="size-4" />
                        Manage access
                    </DropdownMenuItem>
                )}
                {canLeave && (
                    <DropdownMenuItem onClick={() => onLeave(row)} className="cursor-pointer">
                        <CheckCircle2 className="size-4" />
                        Leave organization
                    </DropdownMenuItem>
                )}
                {canRemoveMember && (
                    <DropdownMenuItem
                        onClick={() => onRemoveMember(row)}
                        className="cursor-pointer text-destructive focus:text-destructive"
                    >
                        <Trash2 className="size-4" />
                        Remove member
                    </DropdownMenuItem>
                )}
                {canCancelInvite && (
                    <DropdownMenuItem
                        onClick={() => onCancelInvite(row)}
                        className="cursor-pointer text-destructive focus:text-destructive"
                    >
                        <Trash2 className="size-4" />
                        Cancel invitation
                    </DropdownMenuItem>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
