export interface StoreFormData {
  storeName: string;
  logo?: string | null;
  storeDescription?: string | null;
  theme?: string;
  type?: string;
  defaultCurrency?: string;
  allowedCurrencies?: string[];
}

export interface StorePayload {
  name: string;
  logo: string | null;
  description: string | null;
  theme: string;
  type: string;
  defaultCurrency: string;
  allowedCurrencies: string[];
}
