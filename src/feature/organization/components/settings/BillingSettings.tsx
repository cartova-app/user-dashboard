import { Check, CreditCard, FileText } from 'lucide-react';
import { Button } from '@/core/components/ui/button';
import type { OrganizationBillingSettings } from '@/feature/organization/types/settings';
import BillingCard from './BillingCard';
import EmptyBillingState from './EmptyBillingState';

type BillingSettingsProps = {
  billing: OrganizationBillingSettings;
};

const BillingSettings = ({ billing }: BillingSettingsProps) => (
  <div className="space-y-9 px-3">
    <div className="space-y-4">
      <h2 className="font-['Anton'] text-4xl font-normal leading-none text-lime-950 dark:text-lime-200">Billing</h2>
      <p className="text-lg text-muted-foreground">Manage your subscription, invoices, and payment methods.</p>
    </div>

    <div className="grid gap-8 xl:grid-cols-2">
      <div className="space-y-8">
        <BillingCard title="Current Plan">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-foreground">{billing.plan.name}</h3>
              <ul className="space-y-3">
                {billing.plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-base text-muted-foreground">
                    <span className="flex size-6 items-center justify-center rounded-full border-2 border-emerald-500 text-emerald-500">
                      <Check className="size-4" />
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col items-start gap-14 sm:items-end">
              <p className="text-xl text-foreground">{billing.plan.priceLabel}</p>
              <Button variant="primary" className="h-12 rounded-xl px-9 text-base">
                upgrade plan
              </Button>
            </div>
          </div>
        </BillingCard>

        <BillingCard title="Payment method">
          <EmptyBillingState
            icon={<CreditCard className="size-8" />}
            label={billing.hasPaymentMethod ? 'Payment method added' : 'No payment method added'}
            action={billing.hasPaymentMethod ? 'Manage payment method' : 'Add payment method'}
          />
        </BillingCard>
      </div>

      <div className="space-y-8">
        <BillingCard title="Usage & Limits">
          <div className="space-y-6">
            {billing.usage.map((item) => (
              <div key={item.label} className="space-y-2">
                <div className="flex items-center justify-between gap-4 text-xl font-bold text-foreground">
                  <span>{item.label}</span>
                  <span>{item.value}</span>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full bg-sky-100">
                  <div className="h-full rounded-full bg-sky-500" style={{ width: `${item.percent}%` }} />
                </div>
                <p className="text-base text-muted-foreground">{item.note}</p>
              </div>
            ))}
          </div>
        </BillingCard>

        <BillingCard title="Invoices">
          <EmptyBillingState
            icon={<FileText className="size-8" />}
            label={billing.hasInvoices ? 'Invoices available' : 'No invoices yet'}
            action="View billing history"
          />
        </BillingCard>
      </div>
    </div>
  </div>
);

export default BillingSettings;
