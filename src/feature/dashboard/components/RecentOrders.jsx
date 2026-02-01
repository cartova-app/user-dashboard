import DataTable from '@/core/components/common/DataTable';
import StatusCell from '@/core/components/common/StatusCell'; // Assuming this handles 'In Stock' vs 'Out of Stock'
import { Hash, Package, Calendar, Folder, BarChart3, Edit3 } from 'lucide-react';
import { useState } from 'react';
const sampleOrdersData = {
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
            createdAt: "2024-02-19T10:00:00Z"
        },
        {
            id: "31266",
            productName: "Yorem ipsum dolor",
            image: "https://api.dicebear.com/7.x/shapes/svg?seed=2",
            date: "19/02/2024",
            category: "Electronics",
            status: "Out of stock",
            totalSales: "2,134",
            createdAt: "2024-02-19T11:30:00Z"
        },
        {
            id: "31267",
            productName: "Sit amet consectetur",
            image: "https://api.dicebear.com/7.x/shapes/svg?seed=3",
            date: "20/02/2024",
            category: "Accessories",
            status: "In Stock",
            totalSales: "1,850",
            createdAt: "2024-02-20T09:15:00Z"
        },
        {
            id: "31268",
            productName: "Adipiscing elit sed",
            image: "https://api.dicebear.com/7.x/shapes/svg?seed=4",
            date: "21/02/2024",
            category: "Fashion",
            status: "In Stock",
            totalSales: "3,420",
            createdAt: "2024-02-21T14:20:00Z"
        },
        {
            id: "31269",
            productName: "Do eiusmod tempor",
            image: "https://api.dicebear.com/7.x/shapes/svg?seed=5",
            date: "22/02/2024",
            category: "Home Decor",
            status: "Out of stock",
            totalSales: "980",
            createdAt: "2024-02-22T16:45:00Z"
        }
    ]
};
export default function RecentOrdersTable({ ordersData }) {
    console.log(ordersData)
    const [page, setPage] = useState(1);

    const columns = [
        {
            field: 'id',
            headerName: 'Id.no',
            flex: 1,
            headerIcon: <Hash className="size-4 text-slate-400" />,
            renderCell: ({ row }) => (
                <span className="font-semibold text-slate-900">#{row.id}</span>
            ),
        },
        {
            field: 'productName',
            headerName: 'Product Name',
            flex: 2,
            headerIcon: <Package className="size-4 text-slate-400" />,
            renderCell: ({ row }) => (
                <div className="flex items-center gap-3">
                    {/* Placeholder for Product Image */}
                    <div className="size-8 rounded-lg bg-slate-100 flex items-center justify-center overflow-hidden">
                        <img src={row.image} alt="" className="object-cover size-full" />
                    </div>
                    <span className="font-medium text-slate-700">{row.productName}</span>
                </div>
            ),
        },
        {
            field: 'date',
            headerName: 'Date',
            flex: 1.5,
            headerIcon: <Calendar className="size-4 text-slate-400" />,
            renderCell: ({ value }) => (
                <span className="text-slate-600 font-medium">{value}</span>
            ),
        },
        {
            field: 'category',
            headerName: 'Category',
            flex: 1.5,
            headerIcon: <Folder className="size-4 text-slate-400" />,
            renderCell: ({ value }) => (
                <span className="text-slate-700 font-semibold">{value}</span>
            ),
        },
        {
            field: 'status',
            headerName: 'Stock',
            flex: 1.2,
            headerIcon: <Package className="size-4 text-slate-400" />,
            renderCell: ({ value }) => (
                <StatusCell status={value} /> // "In Stock" (green) or "Out of Stock" (red)
            ),
        },
        {
            field: 'totalSales',
            headerName: 'Total Sales',
            flex: 1,
            headerIcon: <BarChart3 className="size-4 text-slate-400" />,
            renderCell: ({ value }) => (
                <span className="font-bold text-slate-900">{value}</span>
            ),
        },
        {
            field: 'actions',
            headerName: 'Action',
            flex: 0.8,
            headerIcon: <Edit3 className="size-4 text-slate-400" />,
            align: 'right',
            renderCell: () => (
                <button className="p-2 text-slate-400 hover:text-black transition-colors">
                    <span className="text-xl leading-none">...</span>
                </button>
            ),
        },
    ];

    return (
        <div className="p-8 bg-white rounded-2xl border border-slate-100 shadow-sm mt-8">
            <div className="mb-6 flex justify-between items-center">
                <h2 className="text-2xl font-bold tracking-tight text-black">Recent Orders</h2>
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search data"
                            className="pl-4 pr-10 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-200"
                        />
                    </div>
                    <button className="text-sm font-semibold text-slate-900 hover:underline">
                        View All
                    </button>
                </div>
            </div>

            <DataTable
                columns={columns}
                rows={sampleOrdersData?.items}
                total={sampleOrdersData?.total}
                page={page}
                handlePageChange={(page) => setPage(page)}
                pageSize={10}
                onRowClick={(row) => console.log('Order Details:', row)}
            />
        </div>
    );
}

