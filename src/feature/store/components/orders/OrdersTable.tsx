import {
  CalendarDays,
  Check,
  CreditCard,
  DollarSign,
  Ellipsis,
  Package,
  Pencil,
  ScanLine,
  SlidersHorizontal,
  User,
} from 'lucide-react';
import type React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Card } from '@/core/components/ui/card';
import { cn } from '@/core/lib/utils';
import type { StoreOrder } from '@/feature/store/types/order';
import OrderStatusBadge from './OrderStatusBadge';
import SelectedOrdersBar from './SelectedOrdersBar';

type OrdersTableProps = {
  orders: StoreOrder[];
  selectedOrderIds: string[];
  onToggleOrder: (id: string) => void;
  onClearSelection: () => void;
};

const OrdersTable = ({ orders, selectedOrderIds, onToggleOrder, onClearSelection }: OrdersTableProps) => {
  const { storeId } = useParams();

  return (
    <Card className="relative rounded-2xl border-none p-6 shadow-xl shadow-black/10">
      <div className="overflow-hidden rounded-2xl bg-muted/60 p-4">
        <div className="grid min-w-[1120px] grid-cols-[48px_90px_180px_220px_110px_180px_160px_140px_90px] items-center gap-4 px-6 py-4 text-lg font-bold text-muted-foreground">
          <span className="flex size-7 items-center justify-center rounded-md border-2 border-violet-600 text-violet-600" />
          <HeaderCell icon={<ScanLine className="size-5" />} label="Id" />
          <HeaderCell icon={<User className="size-5" />} label="Customer" />
          <HeaderCell icon={<Package className="size-6" />} label="Products" />
          <HeaderCell icon={<DollarSign className="size-6" />} label="Total" />
          <HeaderCell icon={<CreditCard className="size-6" />} label="Payment" />
          <HeaderCell icon={<SlidersHorizontal className="size-5" />} label="Status" />
          <HeaderCell icon={<CalendarDays className="size-6" />} label="Date" />
          <HeaderCell icon={<Pencil className="size-5" />} label="Action" />
        </div>

        <div className="min-w-[1120px] space-y-3">
          {orders.map((order) => {
            const selected = selectedOrderIds.includes(order.id);
            const firstProduct = order.products[0];

            return (
              <div
                key={order.id}
                className={cn(
                  'grid grid-cols-[48px_90px_180px_220px_110px_180px_160px_140px_90px] items-center gap-4 rounded-xl bg-background px-6 py-4 text-base',
                  selected && 'bg-primary/20',
                )}
              >
                <button
                  type="button"
                  onClick={() => onToggleOrder(order.id)}
                  aria-label={`Select order ${order.id}`}
                  className={cn(
                    'flex size-6 items-center justify-center rounded-md border-2 border-muted-foreground/50',
                    selected && 'border-violet-600 bg-violet-600 text-background',
                  )}
                >
                  {selected && <Check className="size-4" />}
                </button>
                <Link
                  to={`/stores/${storeId}/orders/${order.id}`}
                  className="font-bold text-foreground hover:text-sky-600"
                >
                  #{order.id}
                </Link>
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-full bg-violet-600 font-bold text-background">
                    {order.customer.name[0]}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate font-bold text-foreground">{order.customer.name}</p>
                    <p className="truncate text-xs text-muted-foreground">{order.customer.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <img src={firstProduct.image} alt="" className="size-9 rounded-full object-cover" />
                  <span className="max-w-36 truncate rounded-full bg-muted px-3 py-2 font-bold text-foreground">
                    {firstProduct.name} ...
                  </span>
                  {order.products.length > 1 && (
                    <span className="text-muted-foreground">+{order.products.length - 1}</span>
                  )}
                </div>
                <p className="font-bold text-foreground">${order.total.toLocaleString()}</p>
                <div className="flex items-center gap-2 text-foreground">
                  <CreditCard className="size-5" />
                  <span className="truncate">{order.paymentLabel}</span>
                </div>
                <OrderStatusBadge status={order.status} />
                <p className="text-foreground">{order.date}</p>
                <button type="button" className="flex size-9 items-center justify-center rounded-full hover:bg-muted">
                  <Ellipsis className="size-5" />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex items-center justify-between px-10 pt-8 text-base font-semibold">
        <button type="button">← Back</button>
        <div className="flex items-center gap-2">
          {[1, 2, 3, 4, 5].map((page) => (
            <button key={page} type="button" className="size-9 rounded-md border bg-background">
              {page}
            </button>
          ))}
          <button type="button" className="size-9 rounded-md border bg-background">
            ...
          </button>
        </div>
        <button type="button">Next →</button>
      </div>

      <SelectedOrdersBar count={selectedOrderIds.length} onClear={onClearSelection} />
    </Card>
  );
};

type HeaderCellProps = {
  icon: React.ReactNode;
  label: string;
};

const HeaderCell = ({ icon, label }: HeaderCellProps) => (
  <span className="flex items-center gap-3">
    {icon}
    {label}
  </span>
);

export default OrdersTable;
