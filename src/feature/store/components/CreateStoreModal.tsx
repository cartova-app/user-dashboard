import { zodResolver } from '@hookform/resolvers/zod';
import { BadgeDollarSign, Building2, FileText, Globe, Palette } from 'lucide-react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { InputWithIcon } from '@/core/components/common/InputWithIcon';
import Modal from '@/core/components/common/Modal';
import { MultiSelect } from '@/core/components/common/MultiSelect';
import { SelectWithIcon } from '@/core/components/common/Select';
import { Button } from '@/core/components/ui/button';
import useCreateStore from '../api/mutations/useCreateStore';
import { createStoreSchema } from '../schemas/createStoreSchema';

interface CreateStoreModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface StoreFormData {
  name: string;
  domain?: string;
  description?: string;
  theme: 'basic' | 'advanced';
  type: 'ecommerce' | 'services';
  defaultCurrency: 'EGP' | 'USD' | 'EUR' | 'GBP';
  allowedCurrencies: ('EGP' | 'USD' | 'EUR' | 'GBP')[];
}

export default function CreateStoreModal({ open, onOpenChange }: CreateStoreModalProps) {
  const { mutateAsync: createStoreFn, isPending: isCreateStorePending } = useCreateStore();

  const { control, handleSubmit, reset } = useForm<StoreFormData>({
    resolver: zodResolver(createStoreSchema),
    defaultValues: {
      name: '',
      domain: undefined,
      description: '',
      theme: 'basic',
      type: 'ecommerce',
      defaultCurrency: 'EGP',
      allowedCurrencies: ['EGP'],
    },
  });

  const onSubmit = async (data: StoreFormData) => {
    try {
      const payload = {
        ...data,
        allowedCurrencies: data.allowedCurrencies?.length ? data.allowedCurrencies : [data.defaultCurrency],
      };

      await createStoreFn(payload);

      toast.success('Store created successfully');

      reset();
      onOpenChange(false);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to create Store';
      toast.error(errorMessage);
    }
  };

  const handleClose = (open: boolean) => {
    reset();
    onOpenChange(open);
  };

  return (
    <Modal open={open} onOpenChange={handleClose} title="Create Store" description="Create a new store" width="60%">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Row 1: Store Name + Domain */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Controller
            name="name"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <InputWithIcon
                label="Store Name"
                placeholder="Enter store name"
                icon={<Building2 className="w-5 h-5" />}
                error={error?.message}
                {...field}
              />
            )}
          />

          <Controller
            name="domain"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <InputWithIcon
                label="Domain"
                placeholder="example.com"
                icon={<Globe className="w-5 h-5" />}
                error={error?.message}
                {...field}
              />
            )}
          />
        </div>

        {/* Row 2: Description (full width) */}
        <div className="grid grid-cols-1">
          <Controller
            name="description"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <InputWithIcon
                label="Description"
                placeholder="Store description"
                icon={<FileText className="w-5 h-5" />}
                error={error?.message}
                {...field}
              />
            )}
          />
        </div>

        {/* Row 3: Theme + Type */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Controller
            name="theme"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <SelectWithIcon
                label="Store Theme"
                placeholder="Select Store Theme"
                icon={<Palette className="w-5 h-5" />}
                error={error?.message}
                options={[
                  { value: 'basic', label: 'Basic' },
                  { value: 'advanced', label: 'Advanced' },
                ]}
                value={field.value}
                onValueChange={field.onChange}
              />
            )}
          />

          <Controller
            name="type"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <SelectWithIcon
                label="Store Type"
                placeholder="Select Store Type"
                icon={<Building2 className="w-5 h-5" />}
                error={error?.message}
                options={[
                  { value: 'ecommerce', label: 'Ecommerce' },
                  { value: 'services', label: 'Services' },
                ]}
                value={field.value}
                onValueChange={field.onChange}
              />
            )}
          />
        </div>

        {/* Row 4: Default Currency (half row, other half empty or future field) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Controller
            name="defaultCurrency"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <SelectWithIcon
                label="Default Currency"
                placeholder="Select Currency"
                icon={<BadgeDollarSign className="w-5 h-5" />}
                error={error?.message}
                options={[
                  { value: 'EGP', label: 'Egyptian Pound (EGP)' },
                  { value: 'USD', label: 'US Dollar (USD)' },
                  { value: 'EUR', label: 'Euro (EUR)' },
                ]}
                value={field.value}
                onValueChange={field.onChange}
              />
            )}
          />
          <Controller
            name="allowedCurrencies"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <MultiSelect
                label="Allowed Currencies"
                placeholder="Select Currencies"
                icon={<BadgeDollarSign className="w-5 h-5" />}
                error={error?.message}
                options={[
                  { value: 'EGP', label: 'Egyptian Pound (EGP)' },
                  { value: 'USD', label: 'US Dollar (USD)' },
                  { value: 'EUR', label: 'Euro (EUR)' },
                ]}
                value={field.value}
                onValueChange={field.onChange}
              />
            )}
          />

          {/* Placeholder for future field */}
          <div />
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={() => handleClose(false)} disabled={isCreateStorePending}>
            Cancel
          </Button>
          <Button type="submit" disabled={isCreateStorePending} variant="primary">
            {isCreateStorePending ? 'Creating...' : 'Create'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
