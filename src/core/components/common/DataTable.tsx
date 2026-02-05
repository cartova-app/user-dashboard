import React, { useState, ReactNode } from "react";
import CustomPagination from "./CustomPagination";
import { useTranslation } from "react-i18next";

interface EmptyStateProps {
  title?: string;
  description?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ title, description }) => (
  <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
    <div className="mb-6 p-6 bg-muted rounded-full">
      <svg
        className="w-16 h-16 text-muted-foreground/50"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
    </div>
    <h3 className="text-lg font-semibold text-foreground mb-2">
      {title || "No results found"}
    </h3>
    <p className="text-sm text-muted-foreground">
      {description || "Try adjusting your filters or search criteria"}
    </p>
  </div>
);

interface DefaultCellProps {
  value: string | number | null | undefined;
  icon?: ReactNode;
  maxWidth?: string;
}

export const DefaultCell: React.FC<DefaultCellProps> = ({
  value,
  icon = null,
  maxWidth = "none",
}) => (
  <div className="flex items-center h-full gap-2 group">
    <div
      className={`flex items-center gap-2 ${maxWidth !== "none" ? "" : "max-w-full"}`}
      style={maxWidth !== "none" ? { maxWidth } : undefined}
      title={String(value || "")}
    >
      <span className="text-sm font-medium text-foreground wrap-break-word">
        {value}
      </span>
      {icon}
    </div>
  </div>
);

export interface DataTableColumn<R = any> {
  field: string;
  headerName: string;
  headerIcon?: ReactNode;
  width?: string;
  minWidth?: number;
  flex?: number;
  align?: "left" | "center" | "right";
  headerAlign?: "left" | "center" | "right";
  sortable?: boolean;
  renderCell?: (params: { row: R; value: any }) => ReactNode;
}

// Reuse your existing calculateColumnWidths function
const calculateColumnWidths = (
  columns: DataTableColumn[],
  containerWidth: number,
): string[] => {
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
      return Math.max(flexWidth, col.minWidth || 150) + "px";
    }
    return (col.minWidth || 150) + "px";
  });
};

interface DataTableProps<R = any> {
  columns: DataTableColumn<R>[];
  rows: R[];
  total?: number;
  page?: number;
  handlePageChange?: (page: number) => void;
  containerWidth?: number;
  onRowClick?: (row: R) => void;
  pageSize?: number;
  onPageSizeChange?: (pageSize: number) => void;
}
export default function DataTable<R extends Record<string, any>>({
  columns = [],
  rows = [],
  total = 0,
  page = 1,
  handlePageChange,
  containerWidth = 1200,
  onRowClick,
  pageSize = 10,
}: DataTableProps<R>) {
  const { t } = useTranslation();
  const [sortConfig, setSortConfig] = useState<{
    field: string | null;
    direction: "asc" | "desc" | null;
  }>({ field: null, direction: null });
  const [_selectedRows, _setSelectedRows] = useState(
    new Set<string | number>(),
  );

  const pageCount = Math.ceil(total / pageSize);
  const shouldPaginate = total > 5;
  const columnWidths = calculateColumnWidths(columns, containerWidth);

  const handleSort = (field: string) => {
    setSortConfig((prev) => {
      if (prev.field === field) {
        if (prev.direction === "asc")
          return { field, direction: "desc" as const };
        if (prev.direction === "desc") return { field: null, direction: null };
      }
      return { field, direction: "asc" as const };
    });
  };

  return (
    <div className="w-full">
      {/* Container matches the light gray rounded box in your screenshots */}
      <div className="rounded-3xl bg-card p-4 border border-border">
        <div className="overflow-x-auto">
          <table className="w-full border-separate border-spacing-y-2">
            <thead>
              <tr>
                {columns.map((column, index) => {
                  const headerAlign =
                    column.headerAlign || column.align || "left";
                  const textAlign =
                    headerAlign === "right"
                      ? "text-right"
                      : headerAlign === "center"
                        ? "text-center"
                        : "text-left";
                  return (
                    <th
                      key={column.field}
                      className={`px-6 py-4 ${textAlign} border-none`}
                      style={{ width: columnWidths[index] }}
                    >
                      <div
                        className={`flex items-center gap-2 group ${headerAlign === "right" ? "justify-end" : headerAlign === "center" ? "justify-center" : ""}`}
                      >
                        {/* Icons match the ones in your design (Home icon for Store Name, etc) */}
                        {column.headerIcon}
                        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                          {column.headerName}
                        </span>
                        {column.sortable !== false && (
                          <button
                            onClick={() => handleSort(column.field)}
                            className="text-muted-foreground/50 hover:text-foreground"
                          >
                            {sortConfig.field === column.field
                              ? sortConfig.direction === "asc"
                                ? "↑"
                                : "↓"
                              : "⇅"}
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
                    <EmptyState
                      title={t("layout.general.no_data_title")}
                      description={t("layout.general.no_data")}
                    />
                  </td>
                </tr>
              ) : (
                rows.map((row: any, rowIndex) => (
                  <tr
                    key={(row as any).id || rowIndex}
                    onClick={() => onRowClick?.(row)}
                    className="bg-card hover:bg-muted/50 transition-all cursor-pointer group shadow-sm first:rounded-t-xl last:rounded-b-xl"
                  >
                    {columns.map((column, colIndex) => {
                      const align = column.align || "left";
                      const textAlign =
                        align === "right"
                          ? "text-right"
                          : align === "center"
                            ? "text-center"
                            : "text-left";
                      return (
                        <td
                          key={colIndex}
                          className={`px-6 py-4 text-sm first:rounded-l-2xl last:rounded-r-2xl border-none ${textAlign}`}
                        >
                          {column.renderCell ? (
                            column.renderCell({
                              row,
                              value: (row as any)[column.field],
                            })
                          ) : (
                            <DefaultCell value={(row as any)[column.field]} />
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
            <CustomPagination
              page={page}
              pageCount={pageCount}
              setPage={handlePageChange}
            />
          </div>
        )}
      </div>
    </div>
  );
}
