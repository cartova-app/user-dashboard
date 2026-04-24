export interface StoreData {
  name: string;
  domain?: string;
  description?: string;
  theme?: string;
  type?: string;
  defaultCurrency?: string;
  allowedCurrencies?: string[];
}

export interface Store {
  id: string;
  name: string;
  logo: string | null;
  description: string | null;
  domain: string | null;
  theme: string;
  type: string;
  defaultCurrency: string;
  allowedCurrencies: string[];
  createdAt: string;
  updatedAt: string;
  organizationId: string;

  // UI Specific properties (currently not returned by API)
  status?: string;
  products?: number;
  orders?: number;
}


export interface StoreListResponse {
  items: Store[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

/** Shape returned by GET /stores/:id */
export type StoreDetail = Store;
