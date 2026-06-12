import { Ellipsis, Package, Pencil, Trash2 } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import CustomPagination from '@/core/components/common/CustomPagination';
import StatusCell from '@/core/components/common/StatusCell';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/core/components/ui/dropdown-menu';
import type { Product } from '../../types';

interface ProductsGridProps {
  products: Product[];
  total: number;
  page: number;
  onPageChange: (page: number) => void;
  pageSize: number;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}

interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}

function ProductCard({ product, onEdit, onDelete }: ProductCardProps) {
  const navigate = useNavigate();
  const { storeId } = useParams();

  const status = product.visible ? 'active' : 'inactive';

  return (
    <div
      role="button"
      tabIndex={0}
      className="group bg-card rounded-2xl border border-border shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col cursor-pointer"
      onClick={() => {
        if (storeId) {
          navigate(`/stores/${storeId}/products/${product.id}`);
        }
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          if (storeId) {
            navigate(`/stores/${storeId}/products/${product.id}`);
          }
        }
      }}
    >
      {/* Image */}
      <div className="relative aspect-square bg-muted overflow-hidden">
        {product.images?.[0]?.url ? (
          <img src={product.images[0].url} alt={product.name} className="size-full object-cover" />
        ) : (
          <div className="size-full flex items-center justify-center">
            <Package className="size-12 text-muted-foreground/50" />
          </div>
        )}

        {/* Checkbox */}
        <div className="absolute top-3 left-3">
          <input
            type="checkbox"
            className="size-5 rounded border-2 border-border bg-background cursor-pointer"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col gap-2 flex-1">
        <h3 className="text-sm font-semibold text-foreground truncate">{product.name}</h3>

        <p className="text-xs text-muted-foreground capitalize">{product.description || '\u00A0'}</p>

        {/* Price & Quantity */}
        <div className="flex items-center justify-between mt-1">
          <div className="flex items-baseline gap-1">
            <span className="text-base font-bold text-foreground">{product.price.toLocaleString()}</span>
            <span className="text-xs text-muted-foreground">EG</span>
          </div>

          <span className="text-xs text-muted-foreground">
            {product.quantity} <span>Piece</span>
          </span>
        </div>

        {/* Status + Actions */}
        <div className="flex items-center justify-between mt-2">
          <StatusCell status={status} />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                onClick={(e) => e.stopPropagation()}
                className="p-1.5 text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted"
              >
                <Ellipsis className="size-4" />
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(product);
                }}
                className="cursor-pointer"
              >
                <Pencil className="size-4" />
                Edit
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(product);
                }}
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

export default function ProductsGrid({
  products,
  total,
  page,
  onPageChange,
  pageSize,
  onEdit,
  onDelete,
}: ProductsGridProps) {
  const pageCount = Math.ceil(total / pageSize);

  return (
    <div className="space-y-6">
      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onEdit={onEdit} onDelete={onDelete} />
        ))}
      </div>

      {/* Pagination */}
      {total > pageSize && (
        <div className="flex justify-end">
          <CustomPagination page={page} pageCount={pageCount} setPage={onPageChange} />
        </div>
      )}
    </div>
  );
}
