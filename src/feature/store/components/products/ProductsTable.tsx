import {
  Edit3,
  Ellipsis,
  Package,
  Pencil,
  ShoppingBag,
  Tag,
  Trash2,
} from 'lucide-react';
import DataTable, {
  type DataTableColumn,
} from '@/core/components/common/DataTable';
import StatusCell from '@/core/components/common/StatusCell';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/core/components/ui/dropdown-menu';
import type { Product } from '../../types';

interface ProductRow extends Record<string, unknown> {
  id: string;
  name: string;
  image: string | null;
  status: string;
  category: string;
  quantity: number;
  price: number;
  visible: boolean;
}

interface ProductsTableProps {
  products: Product[];
  total: number;
  page: number;
  onPageChange: (page: number) => void;
  pageSize: number;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
  onSortChange?: (sortBy: string | null, sort: 'asc' | 'desc' | null) => void;
}

function mapProductToRow(product: Product): ProductRow {
  return {
    id: product.id,
    name: product.name,
    image: product.images?.[0]?.url ?? null,
    status: product.visible ? 'active' : 'inactive',
    category: product.categories.map((category) => category.name).join(', '),
    quantity: product.quantity,
    price: product.price,
    visible: product.visible,
  };
}

export default function ProductsTable({
  products,
  total,
  page,
  onPageChange,
  pageSize,
  onEdit,
  onDelete,
  onSortChange,
}: ProductsTableProps) {
  const rows = products.map(mapProductToRow);

  const columns: DataTableColumn<ProductRow>[] = [
    {
      field: 'name',
      headerName: 'Product Name',
      flex: 2,
      sortable: true,
      headerIcon: <ShoppingBag className="size-4 text-muted-foreground" />,
      renderCell: ({ row }) => (
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-lg bg-muted overflow-hidden flex-shrink-0">
            {row.image ? (
              <img
                src={row.image}
                alt={row.name}
                className="size-full object-cover"
              />
            ) : (
              <div className="size-full flex items-center justify-center">
                <Package className="size-5 text-muted-foreground" />
              </div>
            )}
          </div>
          <span className="text-sm font-medium text-foreground truncate">
            {row.name}
          </span>
        </div>
      ),
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      headerIcon: <Tag className="size-4 text-muted-foreground" />,
      renderCell: ({ row }) => <StatusCell status={row.status} />,
    },
    {
      field: 'category',
      headerName: 'Category',
      flex: 1,
      headerIcon: <Tag className="size-4 text-muted-foreground" />,
    },
    {
      field: 'quantity',
      headerName: 'Inventory',
      flex: 1,
      headerIcon: <Package className="size-4 text-muted-foreground" />,
    },
    {
      field: 'price',
      headerName: 'Price',
      flex: 1,
      sortable: true,
      headerIcon: <Tag className="size-4 text-muted-foreground" />,
      renderCell: ({ row }) => (
        <span className="text-sm font-medium">
          {Number(row.price).toLocaleString()}
        </span>
      ),
    },
    {
      field: 'id',
      headerName: 'Action',
      width: '80px',
      headerIcon: <Edit3 className="size-4 text-muted-foreground" />,
      align: 'right',
      sortable: false,
      renderCell: ({ row }) => {
        const product = products.find((p) => p.id === row.id);
        if (!product) return null;
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
              <DropdownMenuItem
                onClick={() => onEdit(product)}
                className="cursor-pointer"
              >
                <Pencil className="size-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onDelete(product)}
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
