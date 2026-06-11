import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight, UserCircle } from 'lucide-react';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { InputWithIcon } from '@/core/components/common/InputWithIcon';
import { SelectWithIcon } from '@/core/components/common/Select';
import { Button } from '@/core/components/ui/button';
import {
  type OrganizationGeneralSettingsFormValues,
  organizationGeneralSettingsSchema,
} from '@/feature/organization/schemas/organizationSchema';
import type { OrganizationGeneralSettings } from '@/feature/organization/types/settings';
import FormField from './FormField';
import SettingsPanel from './SettingsPanel';

const languageOptions = [
  { value: 'english', label: 'English' },
  { value: 'arabic', label: 'Arabic' },
];

const timeZoneOptions = [
  { value: 'cairo', label: '(UTC +02:00) Cairo' },
  { value: 'utc', label: '(UTC +00:00) UTC' },
];

type GeneralSettingsFormProps = {
  defaultValues: OrganizationGeneralSettings;
  isSaving: boolean;
  onSubmit: (values: OrganizationGeneralSettings) => void;
};

const GeneralSettingsForm = ({ defaultValues, isSaving, onSubmit }: GeneralSettingsFormProps) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm<OrganizationGeneralSettingsFormValues>({
    resolver: zodResolver(organizationGeneralSettingsSchema),
    defaultValues,
  });

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  return (
    <SettingsPanel title="General settings" description="Update your organization details">
      <form className="space-y-7" onSubmit={handleSubmit(onSubmit)}>
        <InputWithIcon
          id="organizationName"
          label="Organization Name"
          error={errors.organizationName?.message}
          disabled={isSaving}
          className="max-w-[820px] space-y-3"
          inputClassName="h-14 rounded-xl bg-muted/30 px-4 text-lg text-muted-foreground"
          {...register('organizationName')}
        />

        <FormField label="Organization logo">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="flex size-28 items-center justify-center rounded-xl border-2 bg-background">
              <div className="flex size-20 items-center justify-center rounded-full bg-emerald-50 text-foreground">
                <UserCircle className="size-12 stroke-[1.8]" />
              </div>
            </div>
            <div className="space-y-3">
              <Button type="button" variant="outline" className="h-12 rounded-xl border-2 px-6 text-base">
                Upload new
                <ArrowRight className="size-4" />
              </Button>
              <p className="text-base text-muted-foreground">Recommended size 256 x 256 px</p>
            </div>
          </div>
        </FormField>

        <Controller
          name="defaultLanguage"
          control={control}
          render={({ field }) => (
            <SelectWithIcon
              label="Default language"
              value={field.value}
              onValueChange={field.onChange}
              disabled={isSaving}
              error={errors.defaultLanguage?.message}
              options={languageOptions}
              className="max-w-[820px] space-y-3"
              triggerClassName="h-14 rounded-xl bg-muted/30 px-4 text-lg text-muted-foreground"
            />
          )}
        />

        <Controller
          name="timeZone"
          control={control}
          render={({ field }) => (
            <SelectWithIcon
              label="Time Zone"
              value={field.value}
              onValueChange={field.onChange}
              disabled={isSaving}
              error={errors.timeZone?.message}
              options={timeZoneOptions}
              className="max-w-[820px] space-y-3"
              triggerClassName="h-14 rounded-xl bg-muted/30 px-4 text-lg text-muted-foreground"
            />
          )}
        />

        <Button type="submit" variant="primary" className="h-14 rounded-xl px-7 text-lg" disabled={isSaving}>
          {isSaving ? 'Saving...' : 'Save Changes'}
        </Button>
      </form>
    </SettingsPanel>
  );
};

export default GeneralSettingsForm;
