import { zodResolver } from '@hookform/resolvers/zod';
import { FolderTree } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { Controller, useForm, type Resolver } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { InputWithIcon } from '@/core/components/common/InputWithIcon';
import Modal from '@/core/components/common/Modal';
import { Button } from '@/core/components/ui/button';
import { InlineLoader } from '@/core/components/ui/LoadingFallback';
import { Label } from '@/core/components/ui/label';
import {
  createCategoryMutationOptions,
  updateCategoryMutationOptions,
} from '@/feature/store/api/storeQueryDefinitions';
import { categorySchema, type CategoryFormData } from '../../schemas/categorySchema';
import type { Category } from '../../types';

interface CategoryFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  category: Category | null;
}

export default function CategoryFormModal({ open, onOpenChange, category }: CategoryFormModalProps) {
  const { storeId } = useParams<{ storeId: string }>();
  const isEditing = !!category;
  const queryClient = useQueryClient();

  const { mutateAsync: createCategory, isPending: isCreating } = useMutation(
    createCategoryMutationOptions(queryClient, storeId ?? ''),
  );
  const { mutateAsync: updateCategory, isPending: isUpdating } = useMutation(
    updateCategoryMutationOptions(queryClient, storeId ?? ''),
  );
  const isPending = isCreating || isUpdating;

  const { control, handleSubmit, reset } = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema) as Resolver<CategoryFormData>,
    defaultValues: {
      name: '',
      description: '',
      visible: true,
      isMain: false,
    },
  });

  useEffect(() => {
    if (open && category) {
      reset({
        name: category.name,
        description: category.description ?? '',
        visible: category.visible,
        isMain: category.isMain,
      });
    } else if (open) {
      reset({ name: '', description: '', visible: true, isMain: false });
    }
  }, [open, category, reset]);

  const onSubmit = async (data: CategoryFormData) => {
    try {
      if (isEditing) {
        await updateCategory({ categoryId: category.id, data });
        toast.success('Category updated successfully');
      } else {
        await createCategory(data);
        toast.success('Category created successfully');
      }
      onOpenChange(false);
    } catch (error) {
      const msg = error instanceof Error ? error.message : `Failed to ${isEditing ? 'update' : 'create'} category`;
      toast.error(msg);
    }
  };

  const handleClose = (value: boolean) => {
    reset();
    onOpenChange(value);
  };

  return (
    <Modal
      open={open}
      onOpenChange={handleClose}
      title={isEditing ? 'Edit Category' : 'Create Category'}
      width="500px"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <Controller
          name="name"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <InputWithIcon
              label="Name"
              placeholder="Category name"
              icon={<FolderTree className="w-5 h-5" />}
              error={error?.message}
              required
              {...field}
            />
          )}
        />

        <Controller
          name="description"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <div className="space-y-1">
              <Label className="text-sm font-medium text-foreground">Description</Label>
              <textarea
                placeholder="Optional description"
                className="w-full min-h-[80px] rounded-xl border-2 border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-ring focus:border-ring outline-none resize-none"
                {...field}
              />
              {error?.message && <p className="text-sm text-destructive">{error.message}</p>}
            </div>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <Controller
            name="visible"
            control={control}
            render={({ field }) => (
              <label className="flex items-center gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={field.value}
                  onChange={field.onChange}
                  className="size-4 rounded border-border"
                />
                <span className="text-sm font-medium text-foreground">Visible</span>
              </label>
            )}
          />

          <Controller
            name="isMain"
            control={control}
            render={({ field }) => (
              <label className="flex items-center gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={field.value}
                  onChange={field.onChange}
                  className="size-4 rounded border-border"
                />
                <span className="text-sm font-medium text-foreground">Main category</span>
              </label>
            )}
          />
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <Button type="button" variant="outline" onClick={() => handleClose(false)} disabled={isPending}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" disabled={isPending}>
            {isPending && <InlineLoader className="size-4" />}
            {isEditing ? 'Save Changes' : 'Create'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
