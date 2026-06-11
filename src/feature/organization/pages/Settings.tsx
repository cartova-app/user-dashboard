import { type GlobalTabItem, GlobalTabsList } from '@/core/components/common/GlobalTabs';
import { Tabs, TabsContent } from '@/core/components/ui/tabs';
import BillingSettings from '@/feature/organization/components/settings/BillingSettings';
import GeneralSettingsForm from '@/feature/organization/components/settings/GeneralSettingsForm';
import SecuritySettingsForm from '@/feature/organization/components/settings/SecuritySettingsForm';
import { useOrganizationSettings } from '@/feature/organization/hooks/useOrganizationSettings';

const settingsTabs: GlobalTabItem[] = [
  { value: 'general', label: 'General' },
  { value: 'security', label: 'Security' },
  { value: 'billing', label: 'Billing' },
  { value: 'coming-soon', label: 'Coming soon', disabled: true },
];

const SettingsPage = () => {
  const {
    billingSettings,
    generalSettings,
    isSavingGeneral,
    isSavingSecurity,
    saveGeneralSettings,
    saveSecuritySettings,
    securitySettings,
  } = useOrganizationSettings();

  return (
    <div className="mx-auto w-full max-w-[1540px] px-2 py-8 text-start md:px-6 lg:px-10">
      <Tabs defaultValue="general" className="w-full">
        <div className="space-y-9">
          <h1 className="font-['Anton'] text-4xl font-normal leading-none text-foreground md:text-[42px]">
            Organization settings
          </h1>

          <GlobalTabsList items={settingsTabs} />
        </div>

        <TabsContent value="general" className="mt-8">
          <GeneralSettingsForm
            defaultValues={generalSettings}
            isSaving={isSavingGeneral}
            onSubmit={saveGeneralSettings}
          />
        </TabsContent>

        <TabsContent value="security" className="mt-8">
          <SecuritySettingsForm
            defaultValues={securitySettings}
            isSaving={isSavingSecurity}
            onSubmit={saveSecuritySettings}
          />
        </TabsContent>

        <TabsContent value="billing" className="mt-8">
          <BillingSettings billing={billingSettings} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsPage;
