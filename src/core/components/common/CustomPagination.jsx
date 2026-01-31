import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@core/components/ui/pagination"

export default function CustomPagination({ page, pageCount, setPage }) {
    // Logic to determine which page numbers to show
    const getPageNumbers = () => {
        const pages = []
        if (pageCount <= 5) {
            for (let i = 1; i <= pageCount; i++) pages.push(i)
        } else {
            if (page <= 3) {
                pages.push(1, 2, 3, "...", pageCount)
            } else if (page > pageCount - 3) {
                pages.push(1, "...", pageCount - 2, pageCount - 1, pageCount)
            } else {
                pages.push(1, "...", page, "...", pageCount)
            }
        }
        return pages
    }

    return (
        <Pagination className="justify-end w-auto mx-0">
            <PaginationContent className="gap-1">
                {/* Previous Button */}
                <PaginationItem>
                    <PaginationPrevious
                        href="#"
                        onClick={(e) => {
                            e.preventDefault()
                            if (page > 1) setPage(page - 1)
                        }}
                        className={`rounded-xl border-none hover:bg-slate-100 ${page === 1 ? 'pointer-events-none opacity-40' : ''}`}
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
                                    e.preventDefault()
                                    setPage(p)
                                }}
                                className={`rounded-xl border-none transition-all duration-200 ${page === p
                                    ? "bg-[#E5E5E5] text-black hover:bg-[#E5E5E5] font-bold"
                                    : "text-slate-500 hover:bg-slate-100"
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
                            e.preventDefault()
                            if (page < pageCount) setPage(page + 1)
                        }}
                        className={`rounded-xl border-none hover:bg-slate-100 ${page === pageCount ? 'pointer-events-none opacity-40' : ''}`}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}