import { zodResolver } from '@hookform/resolvers/zod';
import { Building2 } from 'lucide-react';
import { useState } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { toast } from 'sonner';
import { InputWithIcon } from '@/core/components/common/InputWithIcon';
import { SlugPreview } from '@/core/components/common/SlugPreview';
import Modal from '@/core/components/common/Modal';
import { Button } from '@/core/components/ui/button';
import { authClient } from '@/core/config/auth-client';
import useGenerateSlug from '@/core/hooks/useGenerateSlug';
import { createOrganizationSchema } from '../schemas/organizationSchema';

export default function CreateOrganizationModal({
  open,
  onOpenChange,
  onSuccess,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const { generateSlug } = useGenerateSlug();
  const {
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({
    resolver: zodResolver(createOrganizationSchema),
    defaultValues: {
      name: '',
    },
  });
  const organizationName = useWatch({ control, name: 'name' });

  const onSubmit = async (data: { name: string }) => {
    setIsLoading(true);
    try {
      const slug = await generateSlug(data.name);
      const { error } = await authClient.organization.create({
        name: data.name,
        slug: slug.slug,
      });

      if (error) {
        throw new Error(error.message || 'Failed to create organization');
      }

      toast.success('Organization created successfully');
      reset();
      onOpenChange(false);
      onSuccess?.();
    } catch (error) {
      console.error('Error creating organization:', error);
      toast.error((error as Error)?.message || 'Failed to create organization');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = (open: boolean) => {
    if (!isLoading) {
      reset();
      onOpenChange(open);
    }
  };

  return (
    <Modal
      open={open}
      onOpenChange={handleClose}
      title="Create Organization"
      description="Add a new organization to manage your stores"
      width="450px"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <InputWithIcon
              label="Organization Name"
              id="name"
              type="text"
              placeholder="Enter organization name"
              icon={<Building2 className="w-5 h-5" />}
              error={errors.name?.message}
              disabled={isLoading}
              required
              {...field}
            />
          )}
        />
        <SlugPreview name={organizationName ?? ''} />

        <div className="flex gap-3 justify-end">
          <Button type="button" variant="outline" onClick={() => handleClose(false)} disabled={isLoading}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading} variant="primary">
            {isLoading ? 'Creating...' : 'Create'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
