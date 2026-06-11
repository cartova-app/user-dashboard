export type OrganizationGeneralSettings = {
  organizationName: string;
  logoUrl?: string;
  defaultLanguage: string;
  timeZone: string;
};

export type OrganizationSecuritySettings = {
  requireMfa: boolean;
  sessionTimeout: string;
};

export type BillingPlan = {
  name: string;
  priceLabel: string;
  features: string[];
};

export type BillingUsageItem = {
  label: string;
  value: string;
  percent: number;
  note: string;
};

export type OrganizationBillingSettings = {
  plan: BillingPlan;
  usage: BillingUsageItem[];
  hasPaymentMethod: boolean;
  hasInvoices: boolean;
};

export type OrganizationSettingsModel = {
  general: OrganizationGeneralSettings;
  security: OrganizationSecuritySettings;
  billing: OrganizationBillingSettings;
};
