import DataTable, { DataTableColumn } from "@/core/components/common/DataTable";
import StatusCell from "@/core/components/common/StatusCell";
import {
  Hash,
  Package,
  Calendar,
  Folder,
  BarChart3,
  Edit3,
} from "lucide-react";
import { useState } from "react";

interface OrderItem {
  id: string;
  productName: string;
  image: string;
  date: string;
  category: string;
  status: string;
  totalSales: string;
  createdAt: string;
}

interface OrdersData {
  total: number;
  items: OrderItem[];
}

interface RecentOrdersTableProps {
  ordersData?: OrdersData;
}

const sampleOrdersData: OrdersData = {
  total: 45, // Total count for pagination
  items: [
    {
      id: "31265",
      productName: "Yorem ipsum dolor",
      image: "https://api.dicebear.com/7.x/shapes/svg?seed=1", // Placeholder image
      date: "19/02/2024",
      category: "Electronics",
      status: "In Stock",
      totalSales: "2,134",
      createdAt: "2024-02-19T10:00:00Z",
    },
    {
      id: "31266",
      productName: "Yorem ipsum dolor",
      image: "https://api.dicebear.com/7.x/shapes/svg?seed=2",
      date: "19/02/2024",
      category: "Electronics",
      status: "Out of stock",
      totalSales: "2,134",
      createdAt: "2024-02-19T11:30:00Z",
    },
    {
      id: "31267",
      productName: "Sit amet consectetur",
      image: "https://api.dicebear.com/7.x/shapes/svg?seed=3",
      date: "20/02/2024",
      category: "Accessories",
      status: "In Stock",
      totalSales: "1,850",
      createdAt: "2024-02-20T09:15:00Z",
    },
    {
      id: "31268",
      productName: "Adipiscing elit sed",
      image: "https://api.dicebear.com/7.x/shapes/svg?seed=4",
      date: "21/02/2024",
      category: "Fashion",
      status: "In Stock",
      totalSales: "3,420",
      createdAt: "2024-02-21T14:20:00Z",
    },
    {
      id: "31269",
      productName: "Do eiusmod tempor",
      image: "https://api.dicebear.com/7.x/shapes/svg?seed=5",
      date: "22/02/2024",
      category: "Home Decor",
      status: "Out of stock",
      totalSales: "980",
      createdAt: "2024-02-22T16:45:00Z",
    },
  ],
};
export default function RecentOrdersTable({
  ordersData,
}: RecentOrdersTableProps) {
  console.log(ordersData);
  const [page, setPage] = useState(1);

  const columns: DataTableColumn<OrderItem>[] = [
    {
      field: "id",
      headerName: "Id.no",
      flex: 1,
      headerIcon: <Hash className="size-4 text-muted-foreground" />,
      renderCell: ({ row }: { row: OrderItem }) => (
        <span className="font-semibold text-foreground">#{row.id}</span>
      ),
    },
    {
      field: "productName",
      headerName: "Product Name",
      flex: 2,
      headerIcon: <Package className="size-4 text-muted-foreground" />,
      renderCell: ({ row }: { row: OrderItem }) => (
        <div className="flex items-center gap-3">
          {/* Placeholder for Product Image */}
          <div className="size-8 rounded-lg bg-muted flex items-center justify-center overflow-hidden">
            <img src={row.image} alt="" className="object-cover size-full" />
          </div>
          <span className="font-medium text-foreground">{row.productName}</span>
        </div>
      ),
    },
    {
      field: "date",
      headerName: "Date",
      flex: 1.5,
      headerIcon: <Calendar className="size-4 text-muted-foreground" />,
      renderCell: ({ value }: { value: string }) => (
        <span className="text-muted-foreground font-medium">{value}</span>
      ),
    },
    {
      field: "category",
      headerName: "Category",
      flex: 1.5,
      headerIcon: <Folder className="size-4 text-muted-foreground" />,
      renderCell: ({ value }: { value: string }) => (
        <span className="text-foreground font-semibold">{value}</span>
      ),
    },
    {
      field: "status",
      headerName: "Stock",
      flex: 1.2,
      headerIcon: <Package className="size-4 text-muted-foreground" />,
      renderCell: ({ value }: { value: string }) => (
        <StatusCell status={value} /> // "In Stock" (green) or "Out of Stock" (red)
      ),
    },
    {
      field: "totalSales",
      headerName: "Total Sales",
      flex: 1,
      headerIcon: <BarChart3 className="size-4 text-muted-foreground" />,
      renderCell: ({ value }: { value: string }) => (
        <span className="font-bold text-foreground">{value}</span>
      ),
    },
    {
      field: "actions",
      headerName: "Action",
      flex: 0.8,
      headerIcon: <Edit3 className="size-4 text-muted-foreground" />,
      align: "right" as const,
      renderCell: () => (
        <button className="p-2 text-muted-foreground hover:text-foreground transition-colors">
          <span className="text-xl leading-none">...</span>
        </button>
      ),
    },
  ];

  return (
    <div className="p-8 bg-card rounded-2xl border border-border shadow-sm mt-8">
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-bold tracking-tight text-card-foreground">
          Recent Orders
        </h2>
        <div className="flex items-center gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search data"
              className="pl-4 pr-10 py-2 bg-muted border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <button className="text-sm font-semibold text-foreground hover:underline">
            View All
          </button>
        </div>
      </div>

      <DataTable
        columns={columns}
        rows={sampleOrdersData?.items}
        total={sampleOrdersData?.total}
        page={page}
        handlePageChange={(page: number) => setPage(page)}
        pageSize={10}
        onRowClick={(row: OrderItem) => console.log("Order Details:", row)}
      />
    </div>
  );
}
