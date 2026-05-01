import { ChevronRight, Clock, Edit3, Home, Package, ShoppingBag } from 'lucide-react';
import { useState } from 'react';
import DataTable, { type DataTableColumn } from '@/core/components/common/DataTable';
import StatusCell from '@/core/components/common/StatusCell';
import type { StoreListResponse, StoreListItem } from '../types';

interface StoresDataTableProps {
  data?: StoreListResponse;
}

export default function StoresDataTable({ data }: StoresDataTableProps) {
  const [page, setPage] = useState(1);
  const columns: DataTableColumn<StoreListItem>[] = [
    {
      field: 'name',
      headerName: 'Store Name',
      flex: 2,
      headerIcon: <Home className="size-4 text-muted-foreground" />,
      renderCell: ({ row }) => (
        <div className="flex items-center gap-2 font-semibold text-foreground uppercase">
          {row.name}
          <ChevronRight className="size-4 text-muted-foreground" />
        </div>
      ),
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      headerIcon: <Clock className="size-4 text-muted-foreground" />,
      renderCell: ({ value }) => (
        <StatusCell status={String(value ?? '')} />
      ),
    },
    {
      field: 'products',
      headerName: 'Products',
      flex: 1,
      headerIcon: <ShoppingBag className="size-4 text-muted-foreground" />,
      renderCell: ({ value }) => <span>{String(value ?? 0)}</span>,
    },
    {
      field: 'orders',
      headerName: 'Orders',
      flex: 1,
      headerIcon: <Package className="size-4 text-muted-foreground" />,
      renderCell: ({ value }) => <span>{String(value ?? 0)}</span>,
    },
    {
      field: 'createdAt',
      headerName: 'Created At',
      flex: 1.5,
      headerIcon: <Clock className="size-4 text-muted-foreground" />,
      renderCell: ({ value }) => (
        <span>{value ? new Date(String(value)).toUTCString().slice(0, 16) : '-'}</span>
      ),
    },
    {
      field: 'id',
      headerName: 'Action',
      flex: 1,
      headerIcon: <Edit3 className="size-4 text-muted-foreground" />,
      align: 'right' as const,
      renderCell: () => (
        <button type="button" className="p-2 text-muted-foreground hover:text-foreground transition-colors">
          <span className="text-xl">...</span>
        </button>
      ),
    },
  ];

  return (
    <div className="p-8 bg-card min-h-screen rounded-2xl">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-['Anton'] uppercase tracking-tight text-foreground">Stores</h1>
      </div>

      <DataTable
        columns={columns}
        rows={data?.items || []}
        total={data?.meta?.total || 0}
        page={page}
        handlePageChange={(page: number) => setPage(page)}
        pageSize={10}
        onRowClick={(row: StoreListItem) => console.log('Clicked row:', row)}
      />
    </div>
  );
}
