import { Check, Clock, Edit3, Ellipsis, FolderTree, Pencil, Trash2, X } from 'lucide-react';
import DataTable, { type DataTableColumn } from '@/core/components/common/DataTable';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/core/components/ui/dropdown-menu';
import type { Category } from '../../types';

type CategoryIcon = Category['icon'];

interface CategoryRow extends Record<string, unknown> {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  icon: CategoryIcon;
  visible: boolean;
  isMain: boolean;
  createdAt: string;
}

interface CategoriesTableProps {
  categories: Category[];
  total: number;
  page: number;
  onPageChange: (page: number) => void;
  pageSize: number;
  onEdit: (category: Category) => void;
  onDelete: (category: Category) => void;
  onSortChange?: (sortBy: string | null, sort: 'asc' | 'desc' | null) => void;
}

function mapToRow(category: Category): CategoryRow {
  return {
    id: category.id,
    name: category.name,
    slug: category.slug,
    description: category.description,
    icon: category.icon,
    visible: category.visible,
    isMain: category.isMain,
    createdAt: category.createdAt,
  };
}

export default function CategoriesTable({
  categories,
  total,
  page,
  onPageChange,
  pageSize,
  onEdit,
  onDelete,
  onSortChange,
}: CategoriesTableProps) {
  const rows = categories.map(mapToRow);

  const columns: DataTableColumn<CategoryRow>[] = [
    {
      field: 'name',
      headerName: 'Name',
      flex: 2,
      sortable: true,
      headerIcon: <FolderTree className="size-4 text-muted-foreground" />,
      renderCell: (row) => (
        <div className="flex items-center gap-3">
          {row.icon?.url ? (
            <img src={row.icon.url} alt="" className="size-8 rounded-lg object-cover" />
          ) : (
            <div className="size-8 rounded-lg bg-muted flex items-center justify-center">
              <FolderTree className="size-4 text-muted-foreground" />
            </div>
          )}
          <span className="text-sm font-medium text-foreground">{row.name}</span>
        </div>
      ),
    },
    {
      field: 'slug',
      headerName: 'Slug',
      flex: 1.5,
    },
    {
      field: 'visible',
      headerName: 'Visible',
      flex: 0.8,
      renderCell: (row) =>
        row.visible ? (
          <span className="inline-flex items-center gap-1 text-green-600 text-sm">
            <Check className="size-4" /> Yes
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 text-muted-foreground text-sm">
            <X className="size-4" /> No
          </span>
        ),
    },
    {
      field: 'isMain',
      headerName: 'Main',
      flex: 0.8,
      renderCell: (row) =>
        row.isMain ? (
          <span className="inline-flex items-center gap-1 text-green-600 text-sm">
            <Check className="size-4" /> Yes
          </span>
        ) : (
          <span className="text-sm text-muted-foreground">No</span>
        ),
    },
    {
      field: 'createdAt',
      headerName: 'Created',
      flex: 1.2,
      sortable: true,
      headerIcon: <Clock className="size-4 text-muted-foreground" />,
      renderCell: (row) => (
        <span className="text-sm text-muted-foreground">{new Date(row.createdAt).toLocaleDateString()}</span>
      ),
    },
    {
      field: 'id',
      headerName: 'Action',
      width: '80px',
      headerIcon: <Edit3 className="size-4 text-muted-foreground" />,
      align: 'right',
      sortable: false,
      renderCell: (row) => {
        const category = categories.find((c) => c.id === row.id);
        if (!category) return null;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted"
              >
                <Ellipsis className="size-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit(category)} className="cursor-pointer">
                <Pencil className="size-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onDelete(category)}
                className="cursor-pointer text-destructive focus:text-destructive"
              >
                <Trash2 className="size-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return (
    <DataTable
      columns={columns}
      rows={rows}
      total={total}
      page={page}
      handlePageChange={onPageChange}
      pageSize={pageSize}
      onSortChange={onSortChange}
    />
  );
}
