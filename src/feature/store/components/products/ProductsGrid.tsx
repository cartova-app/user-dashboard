import { Ellipsis, Package, Pencil, Trash2 } from 'lucide-react';
import CustomPagination from '@/core/components/common/CustomPagination';
import StatusCell from '@/core/components/common/StatusCell';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/core/components/ui/dropdown-menu';
import type { Product } from '../../services/product';

interface ProductsGridProps {
  products: Product[];
  total: number;
  page: number;
  onPageChange: (page: number) => void;
  pageSize: number;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}

function ProductCard({
  product,
  onEdit,
  onDelete,
}: {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}) {
  const status = product.visible ? 'active' : 'inactive';

  return (
    <div className="group bg-card rounded-2xl border border-border shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col">
      <div className="relative aspect-square bg-muted overflow-hidden">
        {product.images?.[0]?.url ? (
          <img src={product.images[0].url} alt={product.name} className="size-full object-cover" />
        ) : (
          <div className="size-full flex items-center justify-center">
            <Package className="size-12 text-muted-foreground/50" />
          </div>
        )}
        <div className="absolute top-3 left-3">
          <input
            type="checkbox"
            className="size-5 rounded border-2 border-border bg-background cursor-pointer"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      </div>

      <div className="p-4 flex flex-col gap-2 flex-1">
        <h3 className="text-sm font-semibold text-foreground truncate">{product.name}</h3>
        <p className="text-xs text-muted-foreground capitalize">{product.description || '\u00A0'}</p>

        <div className="flex items-center justify-between mt-1">
          <div className="flex items-baseline gap-1">
            <span className="text-base font-bold text-foreground">{product.price.toLocaleString()}</span>
            <span className="text-xs text-muted-foreground">EG</span>
          </div>
          <span className="text-xs text-muted-foreground">
            {product.quantity} <span>Piece</span>
          </span>
        </div>

        <div className="flex items-center justify-between mt-2">
          <StatusCell status={status} />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="p-1.5 text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted"
              >
                <Ellipsis className="size-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit(product)} className="cursor-pointer">
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
        </div>
      </div>
    </div>
  );
}

export default function ProductsGrid({ products, total, page, onPageChange, pageSize, onEdit, onDelete }: ProductsGridProps) {
  const pageCount = Math.ceil(total / pageSize);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onEdit={onEdit} onDelete={onDelete} />
        ))}
      </div>

      {total > pageSize && (
        <div className="flex justify-end">
          <CustomPagination page={page} pageCount={pageCount} setPage={onPageChange} />
        </div>
      )}
    </div>
  );
}
