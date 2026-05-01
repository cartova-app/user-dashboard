export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  icon: { key: string; url: string } | null;
  visible: boolean;
  isMain: boolean;
  createdAt: string;
  updatedAt: string;
  storeId: string;
  creatorId: string;
  parentId: string | null;
}

export interface CategoriesResponse {
  items: Category[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;

  };
}

export interface CategoriesParams {
  q?: string;
  sort?: 'asc' | 'desc';
  sortBy?: 'name' | 'createdAt' | 'updatedAt';
  page?: number;
  limit?: number;
}

export interface CreateCategoryData {
  name: string;
  description?: string;
  visible?: boolean;
  isMain?: boolean;
}

export interface UpdateCategoryData {
  name?: string;
  description?: string;
  visible?: boolean;
  isMain?: boolean;
  rank?: number;
}
