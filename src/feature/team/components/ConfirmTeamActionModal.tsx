import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import Modal from '@/core/components/common/Modal';
import { Button } from '@/core/components/ui/button';
import {
    cancelInvitationMutationOptions,
    leaveOrganizationMutationOptions,
    removeMemberMutationOptions,
} from '@/feature/team/api/teamQueryDefinitions';
import type { TeamRowModel } from '@/feature/team/types/team';

export type TeamConfirmAction =
    | { type: 'leave'; row: TeamRowModel }
    | { type: 'remove'; row: TeamRowModel }
    | { type: 'cancel'; row: TeamRowModel };

interface ConfirmTeamActionModalProps {
    action: TeamConfirmAction | null;
    onOpenChange: (open: boolean) => void;
}

export default function ConfirmTeamActionModal({ action, onOpenChange }: ConfirmTeamActionModalProps) {
    const queryClient = useQueryClient();

    const { mutateAsync: leaveOrganization, isPending: isLeavePending } = useMutation(
        leaveOrganizationMutationOptions(queryClient),
    );
    const { mutateAsync: removeMember, isPending: isRemovePending } = useMutation(
        removeMemberMutationOptions(queryClient),
    );
    const { mutateAsync: cancelInvitation, isPending: isCancelPending } = useMutation(
        cancelInvitationMutationOptions(queryClient),
    );

    const isPending = isLeavePending || isRemovePending || isCancelPending;

    const handleOpen = (open: boolean) => {
        onOpenChange(open);
    };

    const handleSubmit = async () => {
        if (!action) {
            return;
        }

        try {
            if (action.type === 'leave') {
                await leaveOrganization();
                toast.success('You left the organization');
            }

            if (action.type === 'remove') {
                await removeMember({ memberId: action.row.id });
                toast.success('Member removed successfully');
            }

            if (action.type === 'cancel') {
                await cancelInvitation({ invitationId: action.row.id });
                toast.success('Invitation canceled successfully');
            }

            onOpenChange(false);
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Action failed';
            toast.error(message);
        }
    };

    return (
        <Modal
            open={action !== null}
            onOpenChange={handleOpen}
            title={
                action?.type === 'leave'
                    ? 'Leave organization'
                    : action?.type === 'remove'
                        ? 'Remove member'
                        : 'Cancel invitation'
            }
            width="500px"
        >
            <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                    {action?.type === 'leave' &&
                        'You are about to leave this organization. You will lose access to team resources until invited again.'}
                    {action?.type === 'remove' &&
                        `Remove ${action.row.name} from this organization? This action cannot be undone.`}
                    {action?.type === 'cancel' &&
                        `Cancel invitation for ${action.row.email || action.row.name}? This will invalidate the invite link.`}
                </p>

                <div className="flex justify-end gap-3 pt-2">
                    <Button variant="outline" onClick={() => handleOpen(false)} disabled={isPending}>
                        Close
                    </Button>
                    <Button variant="destructive" onClick={handleSubmit} disabled={isPending}>
                        {isPending ? 'Processing...' : 'Confirm'}
                    </Button>
                </div>
            </div>
        </Modal>
    );
}
