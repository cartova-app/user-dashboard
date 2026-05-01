import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ShieldCheck } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import Modal from '@/core/components/common/Modal';
import { SelectWithIcon } from '@/core/components/common/Select';
import { Button } from '@/core/components/ui/button';
import { updateMemberRoleMutationOptions } from '@/feature/team/api/teamQueryDefinitions';
import type { TeamRowModel } from '@/feature/team/types/team';
import { getRoleText } from '@/feature/team/utils/team';

interface ManageAccessModalProps {
  row: TeamRowModel | null;
  availableRoles: string[];
  onOpenChange: (open: boolean) => void;
}

export default function ManageAccessModal({ row, availableRoles, onOpenChange }: ManageAccessModalProps) {
  const queryClient = useQueryClient();
  const { mutateAsync: updateMemberRole, isPending } = useMutation(updateMemberRoleMutationOptions(queryClient));

  const [nextRole, setNextRole] = useState('member');

  useEffect(() => {
    if (row) {
      setNextRole(row.role);
    }
  }, [row]);

  const handleOpen = (open: boolean) => {
    if (!open) {
      setNextRole('member');
    }
    onOpenChange(open);
  };

  const handleSubmit = async () => {
    if (!row) {
      return;
    }

    try {
      await updateMemberRole({ memberId: row.id, role: nextRole });
      toast.success('Member role updated');
      onOpenChange(false);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to update role';
      toast.error(message);
    }
  };

  return (
    <Modal
      open={row !== null}
      onOpenChange={handleOpen}
      title="Manage access"
      description={row ? `Update role for ${row.name}${row.email ? ` (${row.email})` : ''}.` : undefined}
      width="500px"
    >
      <div className="space-y-4">
        <SelectWithIcon
          label="Role"
          value={nextRole}
          onValueChange={setNextRole}
          placeholder="Select role"
          icon={<ShieldCheck className="size-4" />}
          options={availableRoles.map((role) => ({ value: role, label: getRoleText(role) }))}
        />

        <div className="flex justify-end gap-3 pt-2">
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isPending}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit} disabled={isPending || !row}>
            {isPending ? 'Updating...' : 'Update Role'}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
