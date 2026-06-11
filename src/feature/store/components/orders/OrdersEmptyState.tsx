import noOrdersImage from '@/assets/images/no-orders.png';
import { Button } from '@/core/components/ui/button';

type OrdersEmptyStateProps = {
  onCreateOrder?: () => void;
};

const OrdersEmptyState = ({ onCreateOrder }: OrdersEmptyStateProps) => (
  <div className="flex min-h-[640px] flex-col items-center justify-center rounded-2xl bg-card p-10 text-center shadow-xl shadow-black/10">
    <img src={noOrdersImage} alt="" className="h-72 w-72 object-contain" />
    <h2 className="font-['Anton'] text-4xl font-normal text-foreground">No orders yet</h2>
    <p className="mt-5 max-w-2xl text-lg font-semibold text-muted-foreground">
      This is where you'll fulfill orders, collect payments, and track order progress.
    </p>
    <Button variant="primary" className="mt-10 h-14 px-10 text-lg" onClick={onCreateOrder}>
      Create order
    </Button>
  </div>
);

export default OrdersEmptyState;
