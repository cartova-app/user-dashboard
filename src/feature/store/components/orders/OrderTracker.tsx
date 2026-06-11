import { Check, Home, Truck } from 'lucide-react';
import { cn } from '@/core/lib/utils';
import type { OrderStatus, OrderTimelineItem } from '@/feature/store/types/order';

type OrderTrackerProps = {
  status: OrderStatus;
  timeline: OrderTimelineItem[];
  tracking: string;
  shippingProvider: string;
};

const trackerSteps = ['Order Placed', 'Payment Confirmed', 'Order Confirmed', 'Shipped . In Transit', 'Delivered'];

const statusStepIndex: Record<OrderStatus, number> = {
  pending: 0,
  confirmed: 2,
  shipped: 3,
  delivered: 4,
  cancelled: 0,
};

const buildFallbackTimeline = (
  status: OrderStatus,
  tracking: string,
  shippingProvider: string,
): OrderTimelineItem[] => {
  const activeIndex = statusStepIndex[status];

  if (status === 'cancelled') {
    return [
      {
        title: 'Order Cancelled',
        description: 'This order was cancelled before fulfillment',
        date: 'Mar 1, 2026',
        state: 'current',
      },
    ];
  }

  return trackerSteps.map((title, index) => {
    const state = index < activeIndex ? 'done' : index === activeIndex ? 'current' : 'upcoming';

    return {
      title,
      description:
        title === 'Shipped . In Transit'
          ? `${shippingProvider} | Tracking: ${tracking}`
          : title === 'Delivered'
            ? 'Expected delivery date'
            : getFallbackDescription(title),
      date: index <= activeIndex ? 'Mar 1, 2026' : 'Expected Mar 3, 2026',
      state,
    };
  });
};

const getFallbackDescription = (title: string) => {
  switch (title) {
    case 'Order Placed':
      return 'Customer placed the order successfully';
    case 'Payment Confirmed':
      return 'Payment received';
    case 'Order Confirmed':
      return 'Warehouse received and processing';
    default:
      return 'Pending update';
  }
};

const OrderTracker = ({ status, timeline, tracking, shippingProvider }: OrderTrackerProps) => {
  const items = timeline.length > 0 ? timeline : buildFallbackTimeline(status, tracking, shippingProvider);

  return (
    <div className="space-y-0 py-2">
      {items.map((item, index) => (
        <div key={`${item.title}-${index}`} className="relative grid grid-cols-[58px_1fr] gap-4 pb-7 last:pb-0">
          {index < items.length - 1 && (
            <span
              className={cn(
                'absolute left-[21px] top-11 h-full w-0.5',
                item.state === 'upcoming' ? 'bg-border' : 'bg-emerald-500/70',
              )}
            />
          )}
          <div
            className={cn(
              'z-10 flex size-11 items-center justify-center rounded-full border-2 bg-background',
              item.state === 'done' && 'border-emerald-500 bg-emerald-500 text-background',
              item.state === 'current' && 'border-sky-400 text-sky-500 ring-4 ring-sky-100',
              item.state === 'upcoming' && 'border-muted text-muted-foreground',
              status === 'cancelled' && item.state === 'current' && 'border-red-500 text-red-500 ring-red-100',
            )}
          >
            {item.state === 'current' ? (
              <Truck className="size-5" />
            ) : item.state === 'upcoming' ? (
              <Home className="size-5" />
            ) : (
              <Check className="size-5" />
            )}
          </div>
          <div className={cn(item.state === 'upcoming' && 'text-muted-foreground/70')}>
            <h3 className="text-lg font-bold">{item.title}</h3>
            <p className="text-base text-muted-foreground">{item.description}</p>
            <p className="text-sm text-muted-foreground">{item.date}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderTracker;
