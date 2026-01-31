import React, { useState } from 'react';
import CustomPagination from './CustomPagination';
import { useTranslation } from 'react-i18next';

const EmptyState = ({ title, description }) => (
    <div className="flex flex-col items-center justify-center py-16 text-gray-500">
        <div className="mb-6 p-6 bg-slate-50 rounded-full">
            <svg className="w-16 h-16 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
        </div>
        <h3 className="text-lg font-semibold text-slate-700 mb-2">{title || "No results found"}</h3>
        <p className="text-sm text-slate-400">{description || "Try adjusting your filters or search criteria"}</p>
    </div>
);

export const DefaultCell = ({ value, icon = null, maxWidth = "none" }) => (
    <div className="flex items-center h-full gap-2 group">
        <div
            className={`flex items-center gap-2 ${maxWidth !== "none" ? "" : "max-w-full"}`}
            style={maxWidth !== "none" ? { maxWidth } : undefined}
            title={value || ""}
        >
            <span className="text-sm font-medium text-slate-900 wrap-break-word">{value}</span>
            {icon}
        </div>
    </div>
);

// Reuse your existing calculateColumnWidths function
const calculateColumnWidths = (columns, containerWidth) => {
    const totalFlex = columns.reduce((sum, col) => sum + (col.flex || 0), 0);
    const fixedWidth = columns.reduce((sum, col) => {
        if (col.width) return sum + parseFloat(col.width);
        if (!col.flex) return sum + (col.minWidth || 150);
        return sum;
    }, 0);
    const availableWidth = containerWidth - fixedWidth;
    return columns.map((col) => {
        if (col.width) return col.width;
        if (col.flex && totalFlex > 0) {
            const flexWidth = (availableWidth * col.flex) / totalFlex;
            return Math.max(flexWidth, col.minWidth || 150) + 'px';
        }
        return (col.minWidth || 150) + 'px';
    });
};

export default function DataTable({
    columns = [],
    rows = [],
    total = 0,
    page = 1,
    handlePageChange,
    containerWidth = 1200,
    onRowClick,
    pageSize = 10,
    onPageSizeChange,
    pageSizeOptions = [
        { value: 10, label: "10" },
        { value: 25, label: "25" },
        { value: 50, label: "50" },
        { value: 100, label: "100" },
    ],
}) {
    const { t } = useTranslation();
    const [sortConfig, setSortConfig] = useState({ field: null, direction: null });
    const [selectedRows, setSelectedRows] = useState(new Set());

    const pageCount = Math.ceil(total / pageSize);
    const currentPageSizeOption = pageSizeOptions.find(opt => opt.value === pageSize) || pageSizeOptions[0];
    const shouldPaginate = total > 5;
    const columnWidths = calculateColumnWidths(columns, containerWidth);

    const handleSort = (field) => {
        setSortConfig((prev) => {
            if (prev.field === field) {
                if (prev.direction === 'asc') return { field, direction: 'desc' };
                if (prev.direction === 'desc') return { field: null, direction: null };
            }
            return { field, direction: 'asc' };
        });
    };

    return (
        <div className="w-full">
            {/* Container matches the light gray rounded box in your screenshots */}
            <div className="rounded-3xl bg-[#F4F4F5] p-4 border border-slate-100">
                <div className="overflow-x-auto">
                    <table className="w-full border-separate border-spacing-y-2">
                        <thead>
                            <tr>
                                {columns.map((column, index) => {
                                    const headerAlign = column.headerAlign || column.align || 'left';
                                    const textAlign = headerAlign === 'right' ? 'text-right' : headerAlign === 'center' ? 'text-center' : 'text-left';
                                    return (
                                        <th
                                            key={column.field}
                                            className={`px-6 py-4 ${textAlign} border-none`}
                                            style={{ width: columnWidths[index] }}
                                        >
                                            <div className={`flex items-center gap-2 group ${headerAlign === 'right' ? 'justify-end' : headerAlign === 'center' ? 'justify-center' : ''}`}>
                                                {/* Icons match the ones in your design (Home icon for Store Name, etc) */}
                                                {column.headerIcon}
                                                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                                                    {column.headerName}
                                                </span>
                                                {column.sortable !== false && (
                                                    <button onClick={() => handleSort(column.field)} className="text-slate-300 hover:text-slate-600">
                                                        {sortConfig.field === column.field ? (sortConfig.direction === 'asc' ? '↑' : '↓') : '⇅'}
                                                    </button>
                                                )}
                                            </div>
                                        </th>
                                    );
                                })}
                            </tr>
                        </thead>

                        <tbody>
                            {rows.length === 0 ? (
                                <tr>
                                    <td colSpan={columns.length}>
                                        <EmptyState title={t('layout.general.no_data_title')} description={t('layout.general.no_data')} />
                                    </td>
                                </tr>
                            ) : (
                                rows.map((row, rowIndex) => (
                                    <tr
                                        key={row.id || rowIndex}
                                        onClick={() => onRowClick?.(row)}
                                        className="bg-white hover:bg-slate-50 transition-all cursor-pointer group shadow-sm first:rounded-t-xl last:rounded-b-xl"
                                    >
                                        {columns.map((column, colIndex) => {
                                            const align = column.align || 'left';
                                            const textAlign = align === 'right' ? 'text-right' : align === 'center' ? 'text-center' : 'text-left';
                                            return (
                                                <td
                                                    key={colIndex}
                                                    className={`px-6 py-4 text-sm first:rounded-l-2xl last:rounded-r-2xl border-none ${textAlign}`}
                                                >
                                                    {column.renderCell ? (
                                                        column.renderCell({ row, value: row[column.field] })
                                                    ) : (
                                                        <DefaultCell value={row[column.field]} />
                                                    )}
                                                </td>
                                            );
                                        })}
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Section */}
                {shouldPaginate && (
                    <div className="mt-4 flex items-center justify-between px-2">

                        <CustomPagination page={page} pageCount={pageCount} setPage={handlePageChange} />
                    </div>
                )}
            </div>
        </div>
    );
}