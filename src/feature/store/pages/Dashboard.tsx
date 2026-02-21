import { Wallet, ShoppingCart, Users, UserPlus } from "lucide-react";
import InventoryCard from "../components/InventoryCard";
import RecentOrdersTable from "../components/RecentOrders";
import SalesChart from "../components/SalesChart";
import StatCard from "../components/StatCard";

export default function Dashboard() {
  return (
    <div className="p-8 min-h-screen">
      <header className="mb-8 text-start">
        <h1 className="text-3xl font-bold">Welcome to your store!</h1>
        <p className="text-muted-foreground">
          Here is what happening with your store today
        </p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          title="Total Revenue Made"
          value="$27,450"
          percentage="+12.5%"
          icon={Wallet}
          colorClass="purple-500"
        />
        <StatCard
          title="Total Orders"
          value="1000"
          percentage="+12.5%"
          icon={ShoppingCart}
          colorClass="yellow-500"
        />
        <StatCard
          title="Total Visitors"
          value="500"
          percentage="+12.5%"
          icon={Users}
          colorClass="green-500"
        />
        <StatCard
          title="New Customers"
          value="20"
          percentage="+12.5%"
          icon={UserPlus}
          colorClass="blue-500"
        />
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SalesChart />
        </div>
        <div>
          {/* Inventory Component would go here */}
          <InventoryCard />
        </div>
      </div>

      <RecentOrdersTable />
    </div>
  );
}
