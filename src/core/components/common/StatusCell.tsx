import { cn } from "@/core/lib/utils";

export type StatusValue =
  | "active"
  | "inactive"
  | "pending"
  | "paused"
  | "completed"
  | "failed"
  | "cancelled"
  | "in stock"
  | "out of stock";

interface StatusConfig {
  id: number;
  name: string;
  value: StatusValue;
  className: string;
  dotClassName: string;
}

interface StatusCellProps {
  status: string;
}

const StatusCell = ({ status }: StatusCellProps) => {
  const statusList: StatusConfig[] = [
    {
      id: 1,
      name: "Active",
      value: "active",
      className: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
      dotClassName: "bg-green-600 dark:bg-green-500",
    },
    {
      id: 2,
      name: "Inactive",
      value: "inactive",
      className: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
      dotClassName: "bg-red-600 dark:bg-red-500",
    },
    {
      id: 3,
      name: "Pending",
      value: "pending",
      className: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
      dotClassName: "bg-orange-600 dark:bg-orange-500",
    },
    {
      id: 4,
      name: "Paused",
      value: "paused",
      className: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
      dotClassName: "bg-blue-600 dark:bg-blue-500",
    },
    {
      id: 5,
      name: "Completed",
      value: "completed",
      className: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
      dotClassName: "bg-green-600 dark:bg-green-500",
    },
    {
      id: 6,
      name: "Failed",
      value: "failed",
      className: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
      dotClassName: "bg-red-600 dark:bg-red-500",
    },
    {
      id: 7,
      name: "Cancelled",
      value: "cancelled",
      className: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
      dotClassName: "bg-purple-600 dark:bg-purple-500",
    },
    {
      id: 8,
      name: "In Stock",
      value: "in stock",
      className: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
      dotClassName: "bg-green-600 dark:bg-green-500",
    },
    {
      id: 9,
      name: "Out of Stock",
      value: "out of stock",
      className: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
      dotClassName: "bg-red-600 dark:bg-red-500",
    },
  ];

  const normalizedStatus = status?.toLowerCase()?.trim() as StatusValue;
  const currentStatus = statusList.find(
    (item) => item.value === normalizedStatus,
  );

  // Fallback for unknown statuses
  if (!currentStatus) {
    return (
      <div
        className="flex justify-center items-center px-2.5 py-1 gap-1.5 rounded-xl bg-gray-200 dark:bg-gray-800"
      >
        <div
          className="w-2 h-2 rounded-full bg-gray-500 dark:bg-gray-400"
        ></div>
        <p className="text-gray-700 dark:text-gray-300 font-satoshi text-xs font-normal leading-4">
          {status}
        </p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex justify-center items-center px-2.5 py-1 gap-1.5 rounded-xl",
        currentStatus.className
      )}
    >
      <div
        className={cn(
          "w-2 h-2 rounded-full animate-pulse",
          currentStatus.dotClassName
        )}
      ></div>
      <p className="font-satoshi text-xs font-normal leading-4 text-inherit">
        {currentStatus?.name}
      </p>
    </div>
  );
};

export default StatusCell;
