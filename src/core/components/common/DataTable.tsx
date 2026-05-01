import {
    type ColumnDef,
    type PaginationState,
    type SortingState,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table';
import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react';
import { type ReactNode, useMemo, useState } from 'react';
import { cn } from '@/core/lib/utils';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/core/components/ui/table';
import CustomPagination from './CustomPagination';

export interface DataTableColumn<R = Record<string, unknown>> {
    field: keyof R & string;
    headerName: string;
    headerIcon?: ReactNode;
    width?: string;
    minWidth?: number;
    flex?: number;
    align?: 'left' | 'center' | 'right';
    headerAlign?: 'left' | 'center' | 'right';
    sortable?: boolean;
    renderCell?: (params: { row: R; value: R[keyof R] }) => ReactNode;
}

interface DataTableMeta {
    align?: 'left' | 'center' | 'right';
    headerAlign?: 'left' | 'center' | 'right';
    width?: string;
}

interface DataTableProps<R extends Record<string, unknown>> {
    columns: DataTableColumn<R>[];
    rows: R[];
    pageSize?: number;
    onRowClick?: (row: R) => void;
    // Server-side pagination — when provided, DataTable renders rows as-is
    total?: number;
    page?: number;
    handlePageChange?: (page: number) => void;
    // Server-side sort — when provided, DataTable calls this instead of sorting internally
    onSortChange?: (field: string | null, direction: 'asc' | 'desc' | null) => void;
}

export default function DataTable<R extends Record<string, unknown>>({
    columns,
    rows,
    pageSize = 10,
    onRowClick,
    total,
    page: externalPage,
    handlePageChange,
    onSortChange,
}: DataTableProps<R>) {
    const isServerPagination = handlePageChange !== undefined;
    const isServerSort = onSortChange !== undefined;

    const [sorting, setSorting] = useState<SortingState>([]);
    const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize });

    const columnDefs = useMemo<ColumnDef<R>[]>(
        () =>
            columns.map((col) => ({
                id: col.field,
                accessorKey: col.field,
                enableSorting: col.sortable ?? false,
                meta: {
                    align: col.align,
                    headerAlign: col.headerAlign,
                    width: col.width,
                } satisfies DataTableMeta,
                header: () => (
                    <div
                        className={cn(
                            'flex items-center gap-2',
                            col.headerAlign === 'right' && 'justify-end',
                            col.headerAlign === 'center' && 'justify-center',
                        )}
                    >
                        {col.headerIcon}
                        {col.headerName}
                    </div>
                ),
                cell: ({ row }) =>
                    col.renderCell ? (
                        col.renderCell({ row: row.original, value: row.original[col.field] })
                    ) : (
                        <span className="font-medium text-foreground">
                            {String(row.original[col.field] ?? '')}
                        </span>
                    ),
            })),
        [columns],
    );

    const table = useReactTable({
        data: rows,
        columns: columnDefs,
        state: {
            sorting,
            pagination: isServerPagination
                ? { pageIndex: (externalPage ?? 1) - 1, pageSize }
                : pagination,
        },
        manualSorting: isServerSort,
        manualPagination: isServerPagination,
        pageCount: isServerPagination ? Math.ceil((total ?? 0) / pageSize) : undefined,
        onSortingChange: (updater) => {
            const next = typeof updater === 'function' ? updater(sorting) : updater;
            setSorting(next);
            if (isServerSort) {
                const first = next[0];
                onSortChange(first?.id ?? null, first ? (first.desc ? 'desc' : 'asc') : null);
            }
        },
        onPaginationChange: (updater) => {
            if (!isServerPagination) {
                setPagination((prev) => (typeof updater === 'function' ? updater(prev) : updater));
            }
        },
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    const pageCount = isServerPagination
        ? Math.ceil((total ?? 0) / pageSize)
        : table.getPageCount();

    const currentPage = isServerPagination
        ? (externalPage ?? 1)
        : pagination.pageIndex + 1;

    const setPage = isServerPagination
        ? handlePageChange
        : (p: number) => table.setPageIndex(p - 1);

    return (
        <div className="space-y-4">
            <div className="rounded-2xl border bg-card">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id} className="hover:bg-transparent">
                                {headerGroup.headers.map((header) => {
                                    const meta = header.column.columnDef.meta as DataTableMeta | undefined;
                                    const canSort = header.column.getCanSort();
                                    return (
                                        <TableHead
                                            key={header.id}
                                            style={{ width: meta?.width }}
                                            className={cn(
                                                meta?.headerAlign === 'right' && 'text-right',
                                                meta?.headerAlign === 'center' && 'text-center',
                                            )}
                                        >
                                            {header.isPlaceholder ? null : canSort ? (
                                                <button
                                                    type="button"
                                                    onClick={header.column.getToggleSortingHandler()}
                                                    className="flex items-center gap-2 transition-colors hover:text-foreground"
                                                >
                                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                                    {header.column.getIsSorted() === 'asc' ? (
                                                        <ArrowUp className="size-3.5 text-foreground" />
                                                    ) : header.column.getIsSorted() === 'desc' ? (
                                                        <ArrowDown className="size-3.5 text-foreground" />
                                                    ) : (
                                                        <ArrowUpDown className="size-3.5 opacity-40" />
                                                    )}
                                                </button>
                                            ) : (
                                                flexRender(header.column.columnDef.header, header.getContext())
                                            )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>

                    <TableBody>
                        {table.getRowModel().rows.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    onClick={() => onRowClick?.(row.original)}
                                    className={onRowClick ? 'cursor-pointer' : ''}
                                >
                                    {row.getVisibleCells().map((cell) => {
                                        const meta = cell.column.columnDef.meta as DataTableMeta | undefined;
                                        return (
                                            <TableCell
                                                key={cell.id}
                                                className={cn(
                                                    meta?.align === 'right' && 'text-right',
                                                    meta?.align === 'center' && 'text-center',
                                                )}
                                            >
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow className="hover:bg-transparent">
                                <TableCell colSpan={columns.length} className="h-24 text-center text-muted-foreground">
                                    No results found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {pageCount > 1 && (
                <div className="flex justify-end px-2">
                    <CustomPagination page={currentPage} pageCount={pageCount} setPage={setPage} />
                </div>
            )}
        </div>
    );
}
