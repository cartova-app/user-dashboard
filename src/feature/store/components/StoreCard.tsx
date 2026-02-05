import {
  ShoppingBag,
  Package,
  MoreHorizontal,
  ChevronRight,
} from "lucide-react";
import { useNavigate } from "react-router";

interface Store {
  id: string;
  name: string;
  createdAt?: string | Date;
  status?: string;
  productsCount?: number;
  ordersCount?: number;
}

interface StoreCardProps {
  store: Store;
}

export default function StoreCard({ store }: StoreCardProps) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`${store.id}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleCardClick();
    }
  };

  const formattedDate = store?.createdAt
    ? new Date(store.createdAt).toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    })
    : "N/A";



  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleCardClick}
      onKeyDown={handleKeyDown}
      className="group w-full max-w-md bg-white rounded-2xl border border-gray-200 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] hover:border-gray-300 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col"
    >
      {/* 1. Header Section */}
      <div className="p-6 pb-5 flex justify-between items-start">
        <div className="flex flex-col gap-3">
          <h3 className="text-xl font-bold text-slate-900 leading-tight">
            {store?.name || "Down town's Store"}
          </h3>

          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFF8E6] border border-[#FDE6BA] w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]" />
            <span className="text-sm font-medium text-[#92400E]">Paused</span>
          </div>
        </div>

        <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-slate-600 group-hover:translate-x-0.5 transition-all" />
      </div>

      {/* 2. Stats Section */}
      <div className="grid grid-cols-2 border-t border-b border-gray-100 divide-x divide-gray-100">
        {/* Products */}
        <div className="p-5 flex flex-col gap-2">
          <div className="flex items-center gap-2 text-slate-500">
            <ShoppingBag className="w-4 h-4" />
            <span className="text-sm font-medium">Products</span>
          </div>
          <span className="text-2xl font-bold text-slate-900 ml-6">
            {store.productsCount ?? 120}
          </span>
        </div>

        {/* Orders */}
        <div className="p-5 flex flex-col gap-2">
          <div className="flex items-center gap-2 text-slate-500">
            <Package className="w-4 h-4" />
            <span className="text-sm font-medium">Orders</span>
          </div>
          <span className="text-2xl font-bold text-slate-900 ml-6">
            {store.ordersCount ?? 500}
          </span>
        </div>
      </div>

      {/* 3. Footer Section */}
      <div className="px-6 py-4 flex justify-between items-center bg-white">
        <span className="text-sm font-medium text-slate-400">
          Created in {formattedDate}
        </span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            // Handle menu click
          }}
          className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors"
        >
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
