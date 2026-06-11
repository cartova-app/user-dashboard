import { Download, Filter, ListFilter, Plus, Search, ShoppingBag } from 'lucide-react';
import { useMemo, useState } from 'react';
import SearchInput from '@/core/components/common/SearchInput';
import { Button } from '@/core/components/ui/button';
import { Card } from '@/core/components/ui/card';
import { cn } from '@/core/lib/utils';
import OrdersEmptyState from '@/feature/store/components/orders/OrdersEmptyState';
import OrdersFilterSheet from '@/feature/store/components/orders/OrdersFilterSheet';
import OrdersStats from '@/feature/store/components/orders/OrdersStats';
import OrdersTable from '@/feature/store/components/orders/OrdersTable';
import { orders } from '@/feature/store/data/orders';
import type { OrderStatus } from '@/feature/store/types/order';

type StatusFilter = 'all' | OrderStatus;

const statusFilters: { value: StatusFilter; label: string; count?: number }[] = [
  { value: 'all', label: 'All', count: 248 },
  { value: 'pending', label: 'Pending', count: 24 },
  { value: 'confirmed', label: 'Confirmed' },
  { value: 'shipped', label: 'Shipped' },
  { value: 'delivered', label: 'Delivered' },
];

const stats = [
  { label: 'Total Orders', value: '248', trend: '+12.5%', note: 'Vs Last Month' },
  { label: 'Pending', value: '24', note: 'Awaiting fulfillment', valueClassName: 'text-amber-700' },
  { label: 'Delivered', value: '189', trend: '+8.1%', note: 'Vs Last Month', valueClassName: 'text-emerald-600' },
  { label: 'Revenue', value: '$48.2K', trend: '+18.4%', note: 'Vs Last Month' },
];

const Orders = () => {
  const [activeStatus, setActiveStatus] = useState<StatusFilter>('all');
  const [search, setSearch] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedOrderIds, setSelectedOrderIds] = useState<string[]>([]);

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesStatus = activeStatus === 'all' || order.status === activeStatus;
      const searchValue = search.trim().toLowerCase();
      const matchesSearch =
        searchValue.length === 0 ||
        order.id.includes(searchValue) ||
        order.customer.name.toLowerCase().includes(searchValue) ||
        order.customer.email.toLowerCase().includes(searchValue);

      return matchesStatus && matchesSearch;
    });
  }, [activeStatus, search]);

  const hasOrders = orders.length > 0;

  const toggleOrder = (id: string) => {
    setSelectedOrderIds((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));
  };

  return (
    <div className="space-y-7 px-8 py-10 lg:px-12">
      <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
        <div className="space-y-6">
          <h1 className="font-['Anton'] text-4xl font-normal leading-none text-foreground">Orders</h1>
          <p className="flex items-center gap-3 text-lg text-muted-foreground">
            <ShoppingBag className="size-6" />
            Orders overview . {hasOrders ? '248' : '0'} total order
          </p>
        </div>
        <div className="flex gap-5">
          <Button variant="outline" className="h-12 rounded-xl border-2 px-8 text-base">
            Export
            <Download className="size-5" />
          </Button>
          <Button variant="primary" className="h-12 rounded-xl px-8 text-base">
            Create Order
            <Plus className="size-5" />
          </Button>
        </div>
      </div>

      <OrdersStats
        stats={
          hasOrders
            ? stats
            : stats.map((stat) => ({ ...stat, value: stat.label === 'Revenue' ? '0' : '0', trend: '+0%' }))
        }
      />

      {hasOrders ? (
        <Card className="space-y-6 rounded-2xl border-none p-6 shadow-xl shadow-black/10">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div className="flex w-full max-w-2xl rounded-xl bg-muted p-1">
              {statusFilters.map((filter) => (
                <button
                  type="button"
                  key={filter.value}
                  onClick={() => setActiveStatus(filter.value)}
                  className={cn(
                    'flex h-10 flex-1 items-center justify-center gap-2 rounded-lg px-4 text-base font-bold text-muted-foreground transition',
                    activeStatus === filter.value && 'bg-background text-foreground shadow-sm',
                  )}
                >
                  {filter.label}
                  {filter.count ? <span className="text-muted-foreground/70">{filter.count}</span> : null}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <SearchInput
                value={search}
                onChange={setSearch}
                placeholder="Search order"
                icon={<Search className="size-5" />}
                showClearButton
                containerClassName="w-72"
                className="h-12 rounded-xl border-2 bg-background text-base"
              />
              <Button
                variant="outline"
                size="icon"
                className="size-12 rounded-full border-2"
                onClick={() => setFilterOpen(true)}
              >
                <Filter className="size-5" />
              </Button>
              <Button variant="outline" size="icon" className="size-12 rounded-full border-2">
                <ListFilter className="size-5" />
              </Button>
            </div>
          </div>

          {filteredOrders.length > 0 ? (
            <OrdersTable
              orders={filteredOrders}
              selectedOrderIds={selectedOrderIds}
              onToggleOrder={toggleOrder}
              onClearSelection={() => setSelectedOrderIds([])}
            />
          ) : (
            <OrdersEmptyState />
          )}
        </Card>
      ) : (
        <OrdersEmptyState />
      )}

      <OrdersFilterSheet open={filterOpen} onOpenChange={setFilterOpen} />
    </div>
  );
};

export default Orders;
