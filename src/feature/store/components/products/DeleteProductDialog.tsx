import { Trash2 } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import Modal from '@/core/components/common/Modal';
import { Button } from '@/core/components/ui/button';
import { InlineLoader } from '@/core/components/ui/LoadingFallback';
import { deleteProductMutationOptions } from '@/feature/store/api/storeQueryDefinitions';
import type { Product } from '../../types';

interface DeleteProductDialogProps {
  product: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDeleted?: () => void;
}

export default function DeleteProductDialog({ product, open, onOpenChange, onDeleted }: DeleteProductDialogProps) {
  const { storeId } = useParams<{ storeId: string }>();
  const queryClient = useQueryClient();
  const { mutateAsync: deleteProduct, isPending } = useMutation(
    deleteProductMutationOptions(queryClient, storeId ?? ''),
  );

  const handleDelete = async () => {
    if (!product) return;
    try {
      await deleteProduct(product.id);
      toast.success('Product deleted successfully');
      onOpenChange(false);
      if (typeof onDeleted === 'function') onDeleted();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to delete product';
      toast.error(errorMessage);
    }
  };

  return (
    <Modal open={open} onOpenChange={onOpenChange} title="Delete Product" width="450px">
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Are you sure you want to delete <span className="font-semibold text-foreground">{product?.name}</span>? This
          action cannot be undone.
        </p>
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isPending}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDelete} disabled={isPending}>
            {isPending ? <InlineLoader className="size-4" /> : <Trash2 className="size-4" />}
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
}
