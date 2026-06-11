import { CalendarDays, CreditCard, DollarSign, Filter, ListChecks, PackageCheck } from 'lucide-react';
import type React from 'react';
import { Button } from '@/core/components/ui/button';
import { Input } from '@/core/components/ui/input';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/core/components/ui/sheet';
import { cn } from '@/core/lib/utils';
import { orderStatusMeta } from '@/feature/store/data/orders';
import type { OrderStatus } from '@/feature/store/types/order';

const statusCounts: Record<OrderStatus, number> = {
  pending: 24,
  confirmed: 11,
  shipped: 42,
  delivered: 189,
  cancelled: 8,
};

const paymentMethods = ['Visa', 'Mastercard', 'Cash on delivery', 'Bank Transfer', 'wallet'];
const moreOptions = ['Has customer notes', 'Has discount applied', 'New customer order'];

type OrdersFilterSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const OrdersFilterSheet = ({ open, onOpenChange }: OrdersFilterSheetProps) => (
  <Sheet open={open} onOpenChange={onOpenChange}>
    <SheetContent className="flex w-full max-w-[590px] flex-col gap-0 p-0 sm:max-w-[590px]">
      <SheetHeader className="flex-row items-center justify-between border-b px-7 py-7 text-left">
        <div className="flex items-center gap-5">
          <div className="flex size-14 items-center justify-center rounded-lg bg-primary text-foreground">
            <Filter className="size-7" />
          </div>
          <SheetTitle className="text-xl font-bold">Filter orders</SheetTitle>
        </div>
        <div className="mr-8 flex items-center gap-6">
          <button type="button" className="font-bold text-red-600">
            Reset all
          </button>
        </div>
      </SheetHeader>

      <div className="min-h-0 flex-1 overflow-y-auto">
        <FilterSection icon={<PackageCheck className="size-5" />} title="Status">
          <div className="space-y-3">
            {(Object.keys(orderStatusMeta) as OrderStatus[]).map((status) => {
              const meta = orderStatusMeta[status];
              return (
                <label key={status} className="flex items-center gap-4">
                  <input
                    type="checkbox"
                    defaultChecked={status === 'delivered'}
                    className="size-6 rounded-md accent-violet-600"
                  />
                  <span
                    className={cn(
                      'inline-flex min-w-32 items-center gap-2 rounded-full px-4 py-2 font-bold',
                      meta.className,
                    )}
                  >
                    <span className={cn('size-2 rounded-full', meta.dot)} />
                    {meta.label}
                  </span>
                  <span className="ml-auto text-muted-foreground">{statusCounts[status]}</span>
                </label>
              );
            })}
          </div>
        </FilterSection>

        <FilterSection icon={<CalendarDays className="size-5" />} title="Date Range">
          <div className="grid grid-cols-2 gap-4">
            <DateInput label="From" />
            <DateInput label="To" />
          </div>
        </FilterSection>

        <FilterSection icon={<DollarSign className="size-5" />} title="Order Amount">
          <div className="grid grid-cols-2 gap-4">
            <AmountInput label="Min" />
            <AmountInput label="Max" />
          </div>
        </FilterSection>

        <FilterSection icon={<CreditCard className="size-5" />} title="Payment Method">
          <div className="flex flex-wrap gap-3">
            {paymentMethods.map((method) => (
              <button
                type="button"
                key={method}
                className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-base font-semibold text-muted-foreground"
              >
                <CreditCard className="size-5" />
                {method}
              </button>
            ))}
          </div>
        </FilterSection>

        <FilterSection icon={<ListChecks className="size-5" />} title="More Options">
          <div className="space-y-3">
            {moreOptions.map((option) => (
              <label key={option} className="flex items-center gap-3 text-base text-muted-foreground">
                <input type="checkbox" className="size-6 rounded-md accent-violet-600" />
                {option}
              </label>
            ))}
          </div>
        </FilterSection>
      </div>

      <div className="grid grid-cols-2 gap-4 border-t px-7 py-7">
        <Button variant="ghost" className="h-12 text-base" onClick={() => onOpenChange(false)}>
          Cancel
        </Button>
        <Button variant="primary" className="h-12 text-base" onClick={() => onOpenChange(false)}>
          Apply Filters
        </Button>
      </div>
    </SheetContent>
  </Sheet>
);

type FilterSectionProps = {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
};

const FilterSection = ({ icon, title, children }: FilterSectionProps) => (
  <section className="space-y-5 border-b px-7 py-7">
    <h3 className="flex items-center gap-3 text-base font-medium uppercase text-muted-foreground">
      {icon}
      {title}
    </h3>
    {children}
  </section>
);

const DateInput = ({ label }: { label: string }) => (
  <div className="space-y-2 text-sm text-muted-foreground">
    <span>{label}</span>
    <div className="relative">
      <Input className="h-14 rounded-xl border-2 pr-11 text-base" placeholder="mm/dd/yyyy" />
      <CalendarDays className="absolute right-4 top-1/2 size-5 -translate-y-1/2 text-foreground" />
    </div>
  </div>
);

const AmountInput = ({ label }: { label: string }) => (
  <div className="space-y-2 text-sm text-muted-foreground">
    <span>{label}</span>
    <div className="relative">
      <DollarSign className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
      <Input className="h-14 rounded-xl border-2 pl-12 text-lg" defaultValue="0" />
    </div>
  </div>
);

export default OrdersFilterSheet;
