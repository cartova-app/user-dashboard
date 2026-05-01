import { useSuspenseQuery } from '@tanstack/react-query';
import { Plus, Settings } from 'lucide-react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import EmptyState from '@/core/components/common/EmptyState';
import PageHeading from '@/core/components/common/PageHeading';
import type { ViewType } from '@/core/components/common/ViewToggle';
import { Button } from '@/core/components/ui/button';
import { productListQueryOptions } from '../api/storeQueryDefinitions';
import AddProductForm from '../components/products/AddProductForm';
import DeleteProductDialog from '../components/products/DeleteProductDialog';
import EditProductModal from '../components/products/EditProductModal';
import ProductsGrid from '../components/products/ProductsGrid';
import ProductsTable from '../components/products/ProductsTable';
import ProductsToolbar from '../components/products/ProductsToolbar';
import type { Product } from '../types';

type PageView = 'list' | 'add';
type FilterTab = 'all' | 'status' | 'inventory' | 'price';

const PAGE_SIZE = 8;

const Products = () => {
  const { storeId } = useParams<{ storeId: string }>();

  const [pageView, setPageView] = useState<PageView>('list');
  const [view, setView] = useState<ViewType>('list');
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState<FilterTab>('all');
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'createdAt' | 'updatedAt' | undefined>(undefined);
  const [sort, setSort] = useState<'asc' | 'desc' | undefined>(undefined);

  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const [deleteProduct, setDeleteProduct] = useState<Product | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const { data } = useSuspenseQuery({
    ...productListQueryOptions(storeId || '', {
      page,
      limit: PAGE_SIZE,
      q: search || undefined,
      sortBy,
      sort,
    }),
  });

  if (!storeId) {
    return null;
  }

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const productSortableFields: Record<string, 'name' | 'price' | 'createdAt' | 'updatedAt'> = {
    name: 'name',
    price: 'price',
    createdAt: 'createdAt',
  };

  const handleSortChange = (field: string | null, direction: 'asc' | 'desc' | null) => {
    if (!field || !direction) {
      setSortBy(undefined);
      setSort(undefined);
    } else {
      const mapped = productSortableFields[field];
      if (mapped) {
        setSortBy(mapped);
        setSort(direction);
        setPage(1);
      }
    }
  };

  const handleEdit = (product: Product) => {
    setEditProduct(product);
    setEditDialogOpen(true);
  };

  const handleDelete = (product: Product) => {
    setDeleteProduct(product);
    setDeleteDialogOpen(true);
  };

  const handleAddSuccess = () => {
    setPageView('list');
    setPage(1);
  };

  if (pageView === 'add') {
    return (
      <div className="space-y-6 text-start p-8 w-full">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <button
            type="button"
            onClick={() => setPageView('list')}
            className="hover:text-foreground transition-colors flex items-center gap-1"
          >
            <Settings className="size-4" />
            Product Overview
          </button>
          <span>&gt;</span>
          <span className="text-foreground font-medium flex items-center gap-1">
            <Plus className="size-4" />
            Add new product
          </span>
        </div>

        <PageHeading heading="Products" />

        <AddProductForm onSuccess={handleAddSuccess} onCancel={() => setPageView('list')} />
      </div>
    );
  }

  const products = data?.items ?? [];
  const total = data?.meta?.total ?? 0;

  return (
    <div className="space-y-6 text-start p-8 w-full">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <PageHeading heading="Products" />
          <button
            type="button"
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mt-2 transition-colors"
          >
            <Settings className="size-4" />
            Product Overview
          </button>
        </div>
        <Button variant="primary" onClick={() => setPageView('add')}>
          Add New
          <Plus className="size-4" />
        </Button>
      </div>

      {/* Toolbar */}
      <ProductsToolbar
        search={search}
        onSearchChange={handleSearchChange}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        view={view}
        onViewChange={setView}
      />

      {/* Content */}
      {products.length === 0 ? (
        <EmptyState
          title="No products found"
          description="Add your first product to get started."
          actionLabel="Add Product"
          onAction={() => setPageView('add')}
        />
      ) : view === 'list' ? (
        <ProductsTable
          products={products}
          total={total}
          page={page}
          onPageChange={handlePageChange}
          pageSize={PAGE_SIZE}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onSortChange={handleSortChange}
        />
      ) : (
        <ProductsGrid
          products={products}
          total={total}
          page={page}
          onPageChange={handlePageChange}
          pageSize={PAGE_SIZE}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      {/* Edit Modal */}
      <EditProductModal product={editProduct} open={editDialogOpen} onOpenChange={setEditDialogOpen} />

      {/* Delete Dialog */}
      <DeleteProductDialog product={deleteProduct} open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen} />
    </div>
  );
};

export default Products;
