import { useMutation } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import authClient from '@/core/config/auth-client';
import {
  updateOrganizationGeneralSettings,
  updateOrganizationSecuritySettings,
} from '@/feature/organization/api/organizationSettingsApi';
import type {
  OrganizationBillingSettings,
  OrganizationGeneralSettings,
  OrganizationSecuritySettings,
} from '@/feature/organization/types/settings';

const DEFAULT_SECURITY_SETTINGS: OrganizationSecuritySettings = {
  requireMfa: true,
  sessionTimeout: '8-hours',
};

const DEFAULT_BILLING_SETTINGS: OrganizationBillingSettings = {
  plan: {
    name: 'Starter Plan',
    priceLabel: '$0 / month',
    features: ['3 stores', '5 team members', 'Basic analytics'],
  },
  usage: [
    {
      label: 'Stores',
      value: '2/3',
      percent: 66,
      note: 'You have 1 store slot remaining on your current plan.',
    },
    {
      label: 'Team members',
      value: '3/5',
      percent: 60,
      note: 'You can invite 2 more team members.',
    },
    {
      label: 'API calls this month',
      value: '8,742 / 10,000',
      percent: 87,
      note: 'Resets on Jul 1, 2026. Upgrade to get unlimited API calls.',
    },
  ],
  hasPaymentMethod: false,
  hasInvoices: false,
};

const getErrorMessage = (error: unknown, fallback: string) => {
  if (error instanceof Error && error.message.trim().length > 0) return error.message;
  return fallback;
};

export const useOrganizationSettings = () => {
  const { data: activeOrganization } = authClient.useActiveOrganization();
  const organizationId = activeOrganization?.id;

  const [securitySettings, setSecuritySettings] = useState<OrganizationSecuritySettings>(DEFAULT_SECURITY_SETTINGS);

  const generalSettings = useMemo<OrganizationGeneralSettings>(
    () => ({
      organizationName: activeOrganization?.name ?? "Seif sweilam's Organization",
      defaultLanguage: 'english',
      timeZone: 'cairo',
    }),
    [activeOrganization?.name],
  );

  const generalMutation = useMutation({
    mutationFn: async (payload: OrganizationGeneralSettings) => {
      if (!organizationId) return payload;
      return updateOrganizationGeneralSettings(organizationId, payload);
    },
    onSuccess: () => toast.success('General settings saved'),
    onError: (error) => toast.error(getErrorMessage(error, 'Failed to save general settings')),
  });

  const securityMutation = useMutation({
    mutationFn: async (payload: OrganizationSecuritySettings) => {
      if (!organizationId) return payload;
      return updateOrganizationSecuritySettings(organizationId, payload);
    },
    onSuccess: (_, payload) => {
      setSecuritySettings(payload);
      toast.success('Security settings saved');
    },
    onError: (error) => toast.error(getErrorMessage(error, 'Failed to save security settings')),
  });

  return {
    billingSettings: DEFAULT_BILLING_SETTINGS,
    generalSettings,
    isSavingGeneral: generalMutation.isPending,
    isSavingSecurity: securityMutation.isPending,
    organizationId,
    saveGeneralSettings: generalMutation.mutate,
    saveSecuritySettings: securityMutation.mutate,
    securitySettings,
    setSecuritySettings,
  };
};
