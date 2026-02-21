import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/core/components/ui/pagination";

interface CustomPaginationProps {
  page: number;
  pageCount: number;
  setPage?: (page: number) => void;
}

export default function CustomPagination({
  page,
  pageCount,
  setPage,
}: CustomPaginationProps) {
  // Logic to determine which page numbers to show
  const getPageNumbers = (): (number | string)[] => {
    const pages: (number | string)[] = [];
    if (pageCount <= 5) {
      for (let i = 1; i <= pageCount; i++) pages.push(i);
    } else {
      if (page <= 3) {
        pages.push(1, 2, 3, "...", pageCount);
      } else if (page > pageCount - 3) {
        pages.push(1, "...", pageCount - 2, pageCount - 1, pageCount);
      } else {
        pages.push(1, "...", page, "...", pageCount);
      }
    }
    return pages;
  };

  const handlePageChange = (newPage: number) => {
    if (setPage) {
      setPage(newPage);
    }
  };

  return (
    <Pagination className="justify-end w-auto mx-0">
      <PaginationContent className="gap-1">
        {/* Previous Button */}
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (page > 1) handlePageChange(page - 1);
            }}
            className={`rounded-xl border-none hover:bg-accent ${page === 1 ? "pointer-events-none opacity-40" : ""}`}
          />
        </PaginationItem>

        {/* Page Numbers */}
        {getPageNumbers().map((p, index) => (
          <PaginationItem key={index}>
            {p === "..." ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                href="#"
                isActive={page === p}
                onClick={(e) => {
                  e.preventDefault();
                  if (typeof p === "number") {
                    handlePageChange(p);
                  }
                }}
                className={`rounded-xl border-none transition-all duration-200 ${
                  page === p
                    ? "bg-primary text-primary-foreground hover:bg-primary/90 font-bold"
                    : "text-muted-foreground hover:bg-accent"
                }`}
              >
                {p}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        {/* Next Button */}
        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (page < pageCount) handlePageChange(page + 1);
            }}
            className={`rounded-xl border-none hover:bg-accent ${page === pageCount ? "pointer-events-none opacity-40" : ""}`}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
