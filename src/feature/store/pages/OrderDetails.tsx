import { ChevronLeft, Clock, CreditCard, Download, MapPin, Phone } from 'lucide-react';
import type React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button } from '@/core/components/ui/button';
import { Card } from '@/core/components/ui/card';
import OrderStatusBadge from '@/feature/store/components/orders/OrderStatusBadge';
import OrderTracker from '@/feature/store/components/orders/OrderTracker';
import { orders } from '@/feature/store/data/orders';

const OrderDetails = () => {
  const { orderId, storeId } = useParams();
  const order = orders.find((item) => item.id === orderId) ?? orders[0];
  const subtotal = order.products.reduce((sum, product) => sum + product.price, 0);
  const tax = 280;
  const total = subtotal + tax;

  return (
    <div className="space-y-8 px-8 py-10 lg:px-12">
      <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
        <div className="space-y-5">
          <Link to={`/stores/${storeId}/orders`} className="inline-flex items-center gap-3 text-base font-semibold">
            <ChevronLeft className="size-5" />
            Back to Orders
          </Link>
          <div className="space-y-3">
            <h1 className="font-['Anton'] text-4xl font-normal leading-none text-foreground">Order #{order.id}</h1>
            <div className="flex flex-wrap items-center gap-3 text-base text-muted-foreground">
              <OrderStatusBadge status={order.status} />
              <span>March 1, 2026 . 11:42 AM</span>
              <span>.{order.shippingProvider}</span>
              <span>. Tracking: {order.tracking}</span>
            </div>
          </div>
        </div>

        <div className="flex gap-5">
          <Button variant="outline" className="h-12 rounded-xl border-2 px-8 text-base">
            Invoice
            <Download className="size-5" />
          </Button>
          <Button variant="primary" className="h-12 rounded-xl px-8 text-base">
            Update status
          </Button>
        </div>
      </div>

      <div className="grid gap-8 xl:grid-cols-[minmax(0,1.6fr)_minmax(380px,1fr)]">
        <div className="space-y-8">
          <DetailCard
            title={`Order Items . ${order.products.length}`}
            action={
              <button type="button" className="font-bold text-sky-600">
                Edit order
              </button>
            }
          >
            <div className="space-y-0">
              {order.products.map((product) => (
                <div key={product.id} className="flex items-center gap-5 border-b py-4 last:border-b-0">
                  <img src={product.image} alt="" className="size-16 rounded-lg object-cover" />
                  <div className="min-w-0 flex-1">
                    <h3 className="text-lg font-bold text-foreground">{product.name}</h3>
                    <p className="text-sm text-muted-foreground">{product.variant}</p>
                    <p className="text-sm text-muted-foreground">Qty: {product.quantity}</p>
                  </div>
                  <p className="text-xl font-bold text-foreground">${product.price.toLocaleString()}</p>
                </div>
              ))}
            </div>
          </DetailCard>

          <DetailCard
            title="Order Tracking"
            action={
              <button type="button" className="font-bold text-sky-600">
                Add Note
              </button>
            }
          >
            <OrderTracker
              status={order.status}
              timeline={order.timeline}
              tracking={order.tracking}
              shippingProvider={order.shippingProvider}
            />
          </DetailCard>
        </div>

        <div className="space-y-8">
          <DetailCard title="Summary">
            <div className="space-y-4 text-base">
              <SummaryRow label={`Subtotal (${order.products.length} items)`} value={`$${subtotal.toLocaleString()}`} />
              <SummaryRow label="Shipping" value="Free" valueClassName="text-emerald-600" />
              <SummaryRow label="Discount" value="-$0.00" valueClassName="text-red-600" />
              <SummaryRow label="Tax(14%)" value={`$${tax}`} />
              <div className="flex justify-between border-t pt-4 text-lg font-bold">
                <span>Total</span>
                <span>${total.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-4 rounded-lg border bg-muted/50 p-4">
                <div className="flex size-12 items-center justify-center rounded-md bg-muted">
                  <CreditCard className="size-7" />
                </div>
                <div>
                  <p className="font-bold">Visa ending in 4242</p>
                  <p className="text-sm text-muted-foreground">Charged ${total.toLocaleString()} . Mar 1</p>
                </div>
              </div>
            </div>
          </DetailCard>

          <DetailCard
            title="Customer"
            action={
              <button type="button" className="font-bold text-sky-600">
                View profile
              </button>
            }
          >
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="flex size-14 items-center justify-center rounded-full bg-violet-700 text-xl font-bold text-background">
                  {order.customer.name[0]}
                </div>
                <div>
                  <h3 className="font-bold text-foreground">{order.customer.name}</h3>
                  <p className="text-sm text-muted-foreground">{order.customer.email}</p>
                </div>
              </div>
              <CustomerInfo icon={<Phone className="size-5" />} label="Phone" value={order.customer.phone} />
              <CustomerInfo
                icon={<MapPin className="size-5" />}
                label="Shipping Address"
                value={order.customer.address}
              />
              <CustomerInfo
                icon={<Clock className="size-5" />}
                label="Customer since"
                value={`${order.customer.since} | total orders: ${order.customer.totalOrders}`}
              />
            </div>
          </DetailCard>

          <DetailCard
            title="Order Notes"
            action={
              <button type="button" className="font-bold text-sky-600">
                Add Note
              </button>
            }
          >
            <div className="rounded-xl border-2 border-amber-500 bg-amber-50/50 p-5 text-lg text-muted-foreground">
              "{order.note}"
            </div>
            <p className="mt-4 text-sm text-muted-foreground">Added by customer . Mar 1, 11:42 AM</p>
          </DetailCard>
        </div>
      </div>
    </div>
  );
};

type DetailCardProps = {
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
};

const DetailCard = ({ title, action, children }: DetailCardProps) => (
  <Card className="overflow-hidden rounded-2xl border-none shadow-xl shadow-black/10">
    <div className="flex items-center justify-between border-b px-8 py-6">
      <h2 className="text-xl font-bold text-foreground">{title}</h2>
      {action}
    </div>
    <div className="px-8 py-5">{children}</div>
  </Card>
);

const SummaryRow = ({ label, value, valueClassName }: { label: string; value: string; valueClassName?: string }) => (
  <div className="flex justify-between text-muted-foreground">
    <span>{label}</span>
    <span className={valueClassName}>{value}</span>
  </div>
);

const CustomerInfo = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) => (
  <div className="flex gap-4">
    <span className="mt-1 text-muted-foreground">{icon}</span>
    <div>
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="whitespace-pre-line text-base text-foreground">{value}</p>
    </div>
  </div>
);

export default OrderDetails;
