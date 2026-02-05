import DataTable, { DataTableColumn } from "@/core/components/common/DataTable";
import StatusCell from "@/core/components/common/StatusCell";
import {
  Home,
  Clock,
  Package,
  ShoppingBag,
  Edit3,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";

interface Store {
  id: string;
  name: string;
  status: string;
  products: number;
  orders: number;
  createdAt: string;
}

interface StoresDataTableProps {
  data?: {
    items: Store[];
    total: number;
  };
}

export default function StoresDataTable({ data }: StoresDataTableProps) {
  const [page, setPage] = useState(1);
  const columns: DataTableColumn<Store>[] = [
    {
      field: "name",
      headerName: "Store Name",
      flex: 2,
      headerIcon: <Home className="size-4 text-slate-400" />,
      renderCell: ({ row }: { row: Store }) => (
        <div className="flex items-center gap-2 font-semibold text-slate-900 uppercase">
          {row.name}
          <ChevronRight className="size-4 text-slate-400" />
        </div>
      ),
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      headerIcon: <Clock className="size-4 text-slate-400" />,
      renderCell: ({ value }: { value: string }) => (
        <StatusCell status={value} /> // This handles the "Active" or "Paused" badges
      ),
    },
    {
      field: "products",
      headerName: "Products",
      flex: 1,
      headerIcon: <ShoppingBag className="size-4 text-slate-400" />,
    },
    {
      field: "orders",
      headerName: "Orders",
      flex: 1,
      headerIcon: <Package className="size-4 text-slate-400" />,
    },
    {
      field: "date",
      headerName: "Created At",
      flex: 1.5,
      headerIcon: <Clock className="size-4 text-slate-400" />,
      renderCell: ({ row }: { row: Store }) => (
        <span>{new Date(row?.createdAt).toUTCString().slice(0, 16)}</span>
      ),
    },
    {
      field: "actions",
      headerName: "Action",
      flex: 1,
      headerIcon: <Edit3 className="size-4 text-slate-400" />,
      align: "right" as const,
      renderCell: () => (
        <button className="p-2 text-slate-400 hover:text-black transition-colors">
          <span className="text-xl">...</span>
        </button>
      ),
    },
  ];

  return (
    <div className="p-8 bg-white min-h-screen rounded-2xl">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-['Anton'] uppercase tracking-tight text-black">
          Stores
        </h1>
        {/* You can place your Search and Filter components here */}
      </div>

      <DataTable
        columns={columns}
        rows={data?.items || []}
        total={data?.total || 0}
        page={page}
        handlePageChange={(page: number) => setPage(page)}
        pageSize={10}
        onRowClick={(row: Store) => console.log("Clicked row:", row)}
      />
    </div>
  );
}
