import { Loader2, Plus } from "lucide-react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import EmptyState from "@/core/components/common/EmptyState";
import PageHeading from "@/core/components/common/PageHeading";
import SearchInput from "@/core/components/common/SearchInput";
import { Button } from "@/core/components/ui/button";
import { categoryListQueryOptions } from "../api/storeQueryDefinitions";
import type { Category } from "../types";
import CategoriesTable from "../components/categories/CategoriesTable";
import CategoryFormModal from "../components/categories/CategoryFormModal";
import DeleteCategoryDialog from "../components/categories/DeleteCategoryDialog";

const PAGE_SIZE = 10;

const Categories = () => {
  const { storeId } = useParams<{ storeId: string }>();

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<
    "name" | "createdAt" | "updatedAt" | undefined
  >(undefined);
  const [sort, setSort] = useState<"asc" | "desc" | undefined>(undefined);

  const [formOpen, setFormOpen] = useState(false);
  const [editCategory, setEditCategory] = useState<Category | null>(null);

  const [deleteCategory, setDeleteCategory] = useState<Category | null>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const { data, isPending } = useQuery({
    ...categoryListQueryOptions(storeId ?? "", {
      page,
      limit: PAGE_SIZE,
      q: search || undefined,
      sortBy,
      sort,
    }),
    enabled: Boolean(storeId),
  });

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const categorySortableFields: Record<
    string,
    "name" | "createdAt" | "updatedAt"
  > = {
    name: "name",
    createdAt: "createdAt",
  };

  const handleSortChange = (
    field: string | null,
    direction: "asc" | "desc" | null,
  ) => {
    if (!field || !direction) {
      setSortBy(undefined);
      setSort(undefined);
    } else {
      const mapped = categorySortableFields[field];
      if (mapped) {
        setSortBy(mapped);
        setSort(direction);
        setPage(1);
      }
    }
  };

  const handleCreate = () => {
    setEditCategory(null);
    setFormOpen(true);
  };

  const handleEdit = (category: Category) => {
    setEditCategory(category);
    setFormOpen(true);
  };

  const handleDelete = (category: Category) => {
    setDeleteCategory(category);
    setDeleteOpen(true);
  };

  const categories = data?.items ?? [];
  const total = data?.meta?.total ?? 0;

  return (
    <div className="space-y-6 text-start p-8 w-full">
      {/* Header */}
      <div className="flex justify-between items-end">
        <PageHeading
          heading="Categories"
          description="Manage your store categories."
        />
        <Button variant="primary" onClick={handleCreate}>
          Add New
          <Plus className="size-4" />
        </Button>
      </div>

      {/* Search */}
      <div className="max-w-sm">
        <SearchInput
          value={search}
          onChange={handleSearchChange}
          placeholder="Search categories..."
          variant="default"
          size="md"
          debounceMs={300}
        />
      </div>

      {/* Table */}
      {isPending ? (
        <div className="flex items-center justify-center min-h-[300px]">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : categories.length === 0 ? (
        <EmptyState
          title="No categories found"
          description="Create your first category to organize products."
          actionLabel="Add Category"
          onAction={handleCreate}
        />
      ) : (
        <CategoriesTable
          categories={categories}
          total={total}
          page={page}
          onPageChange={setPage}
          pageSize={PAGE_SIZE}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onSortChange={handleSortChange}
        />
      )}

      {/* Create / Edit Modal */}
      <CategoryFormModal
        open={formOpen}
        onOpenChange={setFormOpen}
        category={editCategory}
      />

      {/* Delete Dialog */}
      <DeleteCategoryDialog
        category={deleteCategory}
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
      />
    </div>
  );
};

export default Categories;
