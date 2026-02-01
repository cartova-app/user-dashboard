import { ShoppingBag, Package, MoreHorizontal, ChevronRight } from 'lucide-react';
import StatusCell from '@/core/components/common/StatusCell';
import { useNavigate } from 'react-router';

export default function StoreCard({ store }) {
    const navigate = useNavigate()
    return (
        <div
            onClick={() => {
                navigate(`${store.id}`)
            }}
            className="w-full max-w-md bg-white rounded-xl border border-[#CACACA] cursor-pointer hover:border-black transition-colors overflow-hidden">

            {/* 1. Header Section */}
            <div className="p-6 flex justify-between items-center border-b border-[#CACACA]">
                <div className="flex flex-col gap-1">
                    <h3 className="font-['Anton'] text-xl uppercase tracking-tight text-black">
                        {store?.name || "My store's Store"}
                    </h3>
                    <StatusCell status="active" />
                </div>
                <ChevronRight
                    className="size-6 text-black group-hover:animate-bounce-x"
                />            </div>

            {/* 2. Stats Section (Products & Orders) */}
            <div className="grid grid-cols-2 border-b border-[#CACACA]">
                {/* Products */}
                <div className="p-6 flex items-center gap-4 border-r border-[#CACACA]">
                    <ShoppingBag className="size-6 text-slate-500" strokeWidth={1.2} />
                    <div className="flex flex-col">
                        <span className="text-sm font-medium text-slate-500">Products</span>
                        <span className="text-xl font-bold text-black">24</span>
                    </div>
                </div>

                {/* Orders */}
                <div className="p-6 flex items-center gap-4">
                    <Package className="size-6 text-slate-500" strokeWidth={1.2} />
                    <div className="flex flex-col">
                        <span className="text-sm font-medium text-slate-500">Orders</span>
                        <span className="text-xl font-bold text-black">120</span>
                    </div>
                </div>
            </div>

            {/* 3. Footer Section */}
            <div className="px-6 py-4 flex justify-between items-center">
                <span className="text-sm text-slate-400">
                    Created in {new Date(store?.createdAt).toUTCString().slice(0, 16)}
                </span>
                <button className="text-slate-400 hover:text-black transition-colors">
                    <MoreHorizontal className="size-5" />
                </button>
            </div>

        </div>
    );
}