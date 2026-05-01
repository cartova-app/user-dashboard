import { useMutation, useQueryClient } from '@tanstack/react-query';
import { MailPlus, ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { InputWithIcon } from '@/core/components/common/InputWithIcon';
import Modal from '@/core/components/common/Modal';
import { SelectWithIcon } from '@/core/components/common/Select';
import { Button } from '@/core/components/ui/button';
import { inviteMemberMutationOptions } from '@/feature/team/api/teamQueryDefinitions';
import { getRoleText } from '@/feature/team/utils/team';

interface InviteMemberModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  availableRoles: string[];
}

export default function InviteMemberModal({ open, onOpenChange, availableRoles }: InviteMemberModalProps) {
  const queryClient = useQueryClient();
  const { mutateAsync: inviteMember, isPending } = useMutation(inviteMemberMutationOptions(queryClient));

  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState(availableRoles[0] ?? 'member');
  const [inviteError, setInviteError] = useState('');

  const handleClose = (nextOpen: boolean) => {
    onOpenChange(nextOpen);
    if (!nextOpen) {
      setInviteError('');
      setInviteEmail('');
      setInviteRole(availableRoles[0] ?? 'member');
    }
  };

  const handleInviteSubmit = async () => {
    const email = inviteEmail.trim().toLowerCase();

    if (!email) {
      setInviteError('Email is required');
      return;
    }

    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!validEmail) {
      setInviteError('Please enter a valid email address');
      return;
    }

    try {
      await inviteMember({ email, role: inviteRole });
      toast.success('Invitation sent successfully');
      handleClose(false);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to send invitation';
      setInviteError(message);
      toast.error(message);
    }
  };

  return (
    <Modal
      open={open}
      onOpenChange={handleClose}
      title="Invite team member"
      description="Send an invitation by email and assign an initial role."
      width="520px"
    >
      <div className="space-y-4">
        <InputWithIcon
          label="Email"
          type="email"
          placeholder="name@company.com"
          icon={<MailPlus className="size-4" />}
          value={inviteEmail}
          onChange={(event) => {
            setInviteEmail(event.target.value);
            if (inviteError) {
              setInviteError('');
            }
          }}
          error={inviteError}
        />

        <SelectWithIcon
          label="Role"
          value={inviteRole}
          onValueChange={setInviteRole}
          placeholder="Select role"
          icon={<ShieldCheck className="size-4" />}
          options={availableRoles.map((role) => ({ value: role, label: getRoleText(role) }))}
        />

        <div className="flex justify-end gap-3 pt-2">
          <Button variant="outline" onClick={() => handleClose(false)} disabled={isPending}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleInviteSubmit} disabled={isPending}>
            {isPending ? 'Sending...' : 'Send Invite'}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
