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
  color: string;
  bgColor: string;
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
      color: "#27AE60",
      bgColor: "#D1F3E0",
    },
    {
      id: 2,
      name: "Inactive",
      value: "inactive",
      color: "#C0392B",
      bgColor: "#F8D7DA",
    },
    {
      id: 3,
      name: "Pending",
      value: "pending",
      color: "#D35400",
      bgColor: "#FFEAC0",
    },
    {
      id: 4,
      name: "Paused",
      value: "paused",
      color: "#2980B9",
      bgColor: "#D6E8FF",
    },
    {
      id: 5,
      name: "Completed",
      value: "completed",
      color: "#2E7D32",
      bgColor: "#C8E6C9",
    },
    {
      id: 6,
      name: "Failed",
      value: "failed",
      color: "#E74C3C",
      bgColor: "#FDECEA",
    },
    {
      id: 7,
      name: "Cancelled",
      value: "cancelled",
      color: "#8E44AD",
      bgColor: "#EADCF9",
    },
    {
      id: 8,
      name: "In Stock",
      value: "in stock",
      color: "#27AE60",
      bgColor: "#D1F3E0",
    },
    {
      id: 9,
      name: "Out of Stock",
      value: "out of stock",
      color: "#C0392B",
      bgColor: "#F8D7DA",
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
        className="flex justify-center items-center px-2.5 py-1 gap-1.5 rounded-xl"
        style={{ backgroundColor: "#E5E7EB" }}
      >
        <div
          className="w-2 h-2 rounded-full"
          style={{ backgroundColor: "#6B7280" }}
        ></div>
        <p className="text-[#494949] font-satoshi text-xs font-normal leading-4">
          {status}
        </p>
      </div>
    );
  }

  return (
    <div
      className="flex justify-center items-center px-2.5 py-1 gap-1.5 rounded-xl"
      style={{
        backgroundColor: currentStatus?.bgColor,
      }}
    >
      <div
        className="w-2 h-2 rounded-full animate-pulse"
        style={{
          backgroundColor: currentStatus?.color,
        }}
      ></div>
      <p className="text-[#494949] font-satoshi text-xs font-normal leading-4">
        {currentStatus?.name}
      </p>
    </div>
  );
};

export default StatusCell;
