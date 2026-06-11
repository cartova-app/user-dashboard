import { zodResolver } from '@hookform/resolvers/zod';
import { Info, MessageCircleWarning } from 'lucide-react';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { SelectWithIcon } from '@/core/components/common/Select';
import { Button } from '@/core/components/ui/button';
import {
  type OrganizationSecuritySettingsFormValues,
  organizationSecuritySettingsSchema,
} from '@/feature/organization/schemas/organizationSchema';
import type { OrganizationSecuritySettings } from '@/feature/organization/types/settings';
import SettingsPanel from './SettingsPanel';
import SettingsSwitch from './SettingsSwitch';

const sessionTimeoutOptions = [
  { value: '1-hour', label: '1 hour' },
  { value: '8-hours', label: '8 hours' },
  { value: '24-hours', label: '24 hours' },
];

type SecuritySettingsFormProps = {
  defaultValues: OrganizationSecuritySettings;
  isSaving: boolean;
  onSubmit: (values: OrganizationSecuritySettings) => void;
};

const SecuritySettingsForm = ({ defaultValues, isSaving, onSubmit }: SecuritySettingsFormProps) => {
  const { control, handleSubmit, reset, watch } = useForm<OrganizationSecuritySettingsFormValues>({
    resolver: zodResolver(organizationSecuritySettingsSchema),
    defaultValues,
  });

  const requireMfa = watch('requireMfa');

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  return (
    <SettingsPanel
      title="Security settings"
      description="Manage authentication and session security for your organization"
    >
      <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
        <section className="space-y-7">
          <div className="flex gap-6">
            <div className="min-w-0 flex-1 space-y-3">
              <h3 className="text-xl font-bold text-foreground">Require MFA for all members</h3>
              <p className="max-w-5xl text-base leading-snug text-muted-foreground">
                Enforcing multi-factor authentication (MFA) adds an extra layer of security by requiring all members to
                setup a second verification step when logging in <Info className="inline size-4 align-[-2px]" />
              </p>
            </div>
            <Controller
              name="requireMfa"
              control={control}
              render={({ field }) => (
                <SettingsSwitch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  label="Require MFA for all members"
                />
              )}
            />
          </div>

          {requireMfa && (
            <div className="flex gap-5 rounded-xl border-2 border-amber-500 bg-amber-50/60 p-5 text-amber-600 dark:bg-amber-950/20">
              <MessageCircleWarning className="mt-1 size-7 shrink-0 stroke-[1.8]" />
              <div className="space-y-5">
                <p className="text-lg font-bold text-muted-foreground">
                  Enable MFA improves security for your organization.
                </p>
                <Link to="/settings" className="text-lg font-bold text-amber-500 hover:text-amber-600">
                  Learn More
                </Link>
              </div>
            </div>
          )}
        </section>

        <section className="space-y-4 border-t pt-8">
          <h3 className="text-xl font-bold text-foreground">Session Timeout</h3>
          <p className="text-base text-muted-foreground">
            Set the duration of inactivity before members are automatically signed out of their sessions.
          </p>
          <Controller
            name="sessionTimeout"
            control={control}
            render={({ field }) => (
              <SelectWithIcon
                label="Session timeout"
                value={field.value}
                onValueChange={field.onChange}
                disabled={isSaving}
                options={sessionTimeoutOptions}
                className="max-w-md space-y-3"
                triggerClassName="h-14 rounded-xl bg-muted/30 px-4 text-lg text-muted-foreground"
              />
            )}
          />
          <p className="text-base text-muted-foreground/60">
            After the duration of inactivity, users will be required to sign in again to continue using their account.
          </p>
          <Button type="submit" variant="primary" className="h-14 rounded-xl px-7 text-lg" disabled={isSaving}>
            {isSaving ? 'Saving...' : 'Save Changes'}
          </Button>
        </section>
      </form>
    </SettingsPanel>
  );
};

export default SecuritySettingsForm;
