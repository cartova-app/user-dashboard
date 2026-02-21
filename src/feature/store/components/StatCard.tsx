import { Card, CardContent } from "@/core/components/ui/card";
import { ArrowUpRight, LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  percentage: string;
  icon: LucideIcon;
  colorClass: string;
}

const StatCard = ({
  title,
  value,
  percentage,
  icon: Icon,
  colorClass,
}: StatCardProps) => (
  <Card className={"py-0 "}>
    <CardContent className="space-y-4 p-6 text-start">
      <div className="flex justify-between items-start">
        <div
          className={`p-2 rounded-lg border border-${colorClass} bg-opacity-10`}
        >
          <Icon className={`w-6 h-6 text-${colorClass}`} />
        </div>
        <button className="text-muted-foreground">•••</button>
      </div>
      <div className="mt-4">
        <p className="text-base font-normal leading-6 text-muted-foreground uppercase">
          {title}
        </p>
        <h3 className="font-anton text-2xl font-bold leading-7 text-card-foreground">
          {value}
        </h3>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex items-center text-xs font-medium text-green-500 bg-green-50 w-fit px-2 py-1 rounded-full">
          <ArrowUpRight className="w-3 h-3 mr-1" />
          {percentage}
        </div>
        <span className="text-xs font-normal leading-4 text-muted-foreground">
          Vs Last Month
        </span>
      </div>
    </CardContent>
  </Card>
);

export default StatCard;
