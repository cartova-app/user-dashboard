import { Building2, FileText, Store } from 'lucide-react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { InputWithIcon } from '@/core/components/common/InputWithIcon';
import { SlugPreview } from '@/core/components/common/SlugPreview';
import { useProfileStore } from '../store/profileStore';
import { StepperButtons } from './StepperButtons';

interface OrganizationFormData {
  organizationName: string;
  storeName: string;
  storeDescription: string;
}

export default function OrganizationForm() {
  const { formData, updateFormData, nextStep } = useProfileStore();

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<OrganizationFormData>({
    defaultValues: {
      organizationName: formData.organizationName || '',
      storeName: formData.storeName || '',
      storeDescription: formData.storeDescription || '',
    },
  });
  const organizationName = useWatch({ control, name: 'organizationName' });

  const onSubmit = (data: OrganizationFormData) => {
    updateFormData(data);
    nextStep();
  };

  return (
    <div className="w-full py-6">
      <div className="mb-8 space-y-1.5">
        <h1 className="text-[32px] font-bold leading-[38px] font-family-satoshi">Let's Set Up Your Store</h1>
        <p
          className="text-[16px] leading-6 text-muted-foreground font-family-satoshi"
          style={{ fontFamily: 'Satoshi, sans-serif' }}
        >
          Tell us more about your business to get started.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <Controller
          name="organizationName"
          control={control}
          rules={{
            required: 'Organization name is required',
            minLength: {
              value: 2,
              message: 'Organization name must be at least 2 characters',
            },
          }}
          render={({ field }) => (
            <InputWithIcon
              label={'Organization Name'}
              id="organizationName"
              type="text"
              placeholder="Organization Name"
              icon={<Building2 className="w-5 h-5" />}
              error={errors.organizationName?.message}
              {...field}
            />
          )}
        />
        <SlugPreview name={organizationName ?? ''} />
        <Controller
          name="storeName"
          control={control}
          rules={{
            required: 'Store name is required',
            minLength: {
              value: 2,
              message: 'Store name must be at least 2 characters',
            },
          }}
          render={({ field }) => (
            <InputWithIcon
              label={'Store Name'}
              id="storeName"
              type="text"
              placeholder="Store Name"
              icon={<Store className="w-5 h-5" />}
              error={errors.storeName?.message}
              {...field}
            />
          )}
        />
        <Controller
          name="storeDescription"
          control={control}
          render={({ field }) => (
            <InputWithIcon
              label={'Store Description'}
              id="storeDescription"
              type="text"
              placeholder="What do you sell? (e.g), Handcrafted jewelry, eco-friendly apparel, digital products."
              icon={<FileText className="w-5 h-5" />}
              error={errors.storeDescription?.message}
              {...field}
            />
          )}
        />
        <StepperButtons showBackButton={false} continueText="Continue" />
      </form>
    </div>
  );
}
