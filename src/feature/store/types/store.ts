export interface StoreData {
  name: string;
  domain?: string;
  description?: string;
  theme?: string;
  type?: string;
  defaultCurrency?: string;
  allowedCurrencies?: string[];
}

export type StoreListItem = {
  id: string;
  name: string;
  [key: string]: unknown;
};

export interface StoreListResponse {
  items: StoreListItem[];
  meta?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

/** Shape returned by GET /stores/:id — extend when the API exposes more fields. */
export type StoreDetail = {
  id: string;
  name: string;
  [key: string]: unknown;
};
