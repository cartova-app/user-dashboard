import { ArrowUpRight } from 'lucide-react';
import { Card } from '@/core/components/ui/card';

type StatItem = {
  label: string;
  value: string;
  trend?: string;
  note?: string;
  valueClassName?: string;
};

type OrdersStatsProps = {
  stats: StatItem[];
};

const OrdersStats = ({ stats }: OrdersStatsProps) => (
  <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
    {stats.map((stat) => (
      <Card key={stat.label} className="rounded-xl border-none p-7 shadow-lg shadow-black/10">
        <p className="text-lg uppercase text-muted-foreground">{stat.label}</p>
        <p
          className={`mt-2 font-['Anton'] text-4xl font-normal leading-none ${stat.valueClassName ?? 'text-foreground'}`}
        >
          {stat.value}
        </p>
        <div className="mt-5 flex items-center gap-3 text-sm text-muted-foreground">
          {stat.trend ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1.5 font-bold text-emerald-700">
              <ArrowUpRight className="size-4" />
              {stat.trend}
            </span>
          ) : null}
          {stat.note ? <span>{stat.note}</span> : null}
        </div>
      </Card>
    ))}
  </div>
);

export default OrdersStats;
