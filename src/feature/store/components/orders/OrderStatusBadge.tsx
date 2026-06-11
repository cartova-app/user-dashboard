import { Badge } from '@/core/components/ui/badge';
import { cn } from '@/core/lib/utils';
import { orderStatusMeta } from '@/feature/store/data/orders';
import type { OrderStatus } from '@/feature/store/types/order';

type OrderStatusBadgeProps = {
  status: OrderStatus;
};

const OrderStatusBadge = ({ status }: OrderStatusBadgeProps) => {
  const meta = orderStatusMeta[status];

  return (
    <Badge className={cn('gap-2 rounded-full border-none px-4 py-2 text-base font-bold shadow-none', meta.className)}>
      <span className={cn('size-2 rounded-full', meta.dot)} />
      {meta.label}
    </Badge>
  );
};

export default OrderStatusBadge;
