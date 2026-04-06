import { Loader2, Trash2 } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import Modal from '@/core/components/common/Modal';
import { Button } from '@/core/components/ui/button';
import useDeleteCategory from '../../api/mutations/useDeleteCategory';
import type { Category } from '../../services/category';

interface DeleteCategoryDialogProps {
  category: Category | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function DeleteCategoryDialog({ category, open, onOpenChange }: DeleteCategoryDialogProps) {
  const { storeId } = useParams<{ storeId: string }>();
  const { mutateAsync: deleteCategory, isPending } = useDeleteCategory(storeId!);

  const handleDelete = async () => {
    if (!category) return;
    try {
      await deleteCategory(category.id);
      toast.success('Category deleted successfully');
      onOpenChange(false);
    } catch (error) {
      const msg = error instanceof Error ? error.message : 'Failed to delete category';
      toast.error(msg);
    }
  };

  return (
    <Modal open={open} onOpenChange={onOpenChange} title="Delete Category" width="450px">
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Are you sure you want to delete <span className="font-semibold text-foreground">{category?.name}</span>? This
          action cannot be undone.
        </p>
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isPending}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDelete} disabled={isPending}>
            {isPending ? <Loader2 className="size-4 animate-spin" /> : <Trash2 className="size-4" />}
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
}
