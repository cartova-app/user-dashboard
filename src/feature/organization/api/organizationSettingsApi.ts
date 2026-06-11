import { patch } from '@/core/config/axiosInstance';
import type { OrganizationGeneralSettings, OrganizationSecuritySettings } from '@/feature/organization/types/settings';

const organizationSettingsUrl = (organizationId: string, section: 'general' | 'security') =>
  `/api/dashboard/organizations/${organizationId}/settings/${section}`;

export const updateOrganizationGeneralSettings = (organizationId: string, payload: OrganizationGeneralSettings) =>
  patch<OrganizationGeneralSettings>(organizationSettingsUrl(organizationId, 'general'), payload);

export const updateOrganizationSecuritySettings = (organizationId: string, payload: OrganizationSecuritySettings) =>
  patch<OrganizationSecuritySettings>(organizationSettingsUrl(organizationId, 'security'), payload);
