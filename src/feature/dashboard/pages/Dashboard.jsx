

import CompeleteProfileDialog from "@/feature/profile/components/CompeleteProfileDialog";
import SalesChart from "../components/SalesChart";

function StatCard({ title, value, change, positive = true }) {
    return (
        <div className="bg-white rounded-xl shadow-sm p-4 min-w-40">
            <div className="text-xs text-gray-500">{title}</div>
            <div className="mt-2 flex items-center justify-between">
                <div className="text-2xl font-bold">{value}</div>
                <div className={`text-sm ${positive ? "text-green-500" : "text-red-400"}`}>{change}</div>
            </div>
        </div>
    );
}

// Simple lightweight sparkline-like chart built with SVG.

function QuickActions() {
    const actions = [
        { title: "Add Product", hint: "+" },
        // { title: "Customize", hint: "✎" },
        // { title: "View orders", hint: "📄" },
    ];
    return (
        <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="font-semibold mb-4">Quick Actions</div>
            <div className="flex gap-3">
                {actions.map((a) => (
                    <button key={a.title} className="flex items-center gap-3 px-4 py-2 rounded border bg-gray-50">
                        <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center">{a.hint}</div>
                        <div className="text-sm">{a.title}</div>
                    </button>
                ))}
            </div>
        </div>
    );
}

function SetupGuide() {
    const steps = [
        { title: "Add a category", done: true },
        { title: "Add a Product" },
        { title: "Add a regional zone" },
        { title: "Add a payment method" },
        { title: "Add a shipping method" },
        { title: "Choose a theme" },
    ];
    return (
        <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="font-semibold mb-4">Get your first sale</div>
            <div className="text-xs text-gray-500 mb-3">Setup Guide</div>
            <div className="w-full bg-gray-100 rounded-full h-2 mb-4 overflow-hidden">
                <div className="h-2 rounded-full" style={{ width: "20%", background: "linear-gradient(90deg,#60A5FA,#A78BFA)" }} />
            </div>
            <ul className="space-y-3">
                {steps.map((s, i) => (
                    <li key={s.title} className="flex items-center gap-3">
                        <div className={`h-7 w-7 rounded-full flex items-center justify-center text-sm ${s.done ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-400"}`}>
                            {s.done ? "✓" : "+"}
                        </div>
                        <div className="flex-1 text-sm">{s.title}</div>
                        <div className="text-gray-300">{s.done ? "" : "+"}</div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

function Alerts() {
    const alerts = [
        { text: "Failed payment for order#12345", color: "bg-red-100" },
        { text: "API error on order POST", color: "bg-amber-100" },
        { text: "Low stock for 'Blue T-shirt'", color: "bg-gray-100" },
        { text: "Domain expires soon", color: "bg-green-100" },
    ];
    return (
        <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="font-semibold mb-4">Important Alerts</div>
            <ul className="space-y-3">
                {alerts.map((a) => (
                    <li key={a.text} className="flex items-start gap-3">
                        <div className={`h-8 w-8 rounded-full flex items-center justify-center ${a.color}`}>●</div>
                        <div className="text-sm">{a.text}</div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

function Updates() {
    return (
        <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="font-semibold mb-4">Updates & Announcements</div>
            <div className="text-sm text-gray-600">New Features</div>
            <div className="text-xs text-gray-400 mt-1">We've done a few new features on the dashboard</div>
        </div>
    );
}

export default function Dashboard() {
    const stats = {
        sales: { value: "$1,250", change: "+$250" },
        orders: { value: 150, change: "+15" },
        visitors: { value: 2305, change: "-150", positive: false },
    };

    const chartData = [
        { label: "Sat", orders: 80, revenue: 120 },
        { label: "Sun", orders: 120, revenue: 210 },
        { label: "Mon", orders: 90, revenue: 100 },
        { label: "Tue", orders: 75, revenue: 85 },
        { label: "Wed", orders: 85, revenue: 95 },
        { label: "Thu", orders: 100, revenue: 110 },
        { label: "Fri", orders: 95, revenue: 105 },
        { label: "Sat2", orders: 110, revenue: 140 },
        { label: "Sun2", orders: 140, revenue: 180 },
        { label: "Mon2", orders: 100, revenue: 120 },
    ];

    return (
        <>
            <div className="mb-6">
                <h1 className="text-2xl font-extrabold">Welcome to your store !</h1>
                <div className="text-sm text-gray-500">Here is what happening with your store today</div>
            </div>
            <CompeleteProfileDialog isOpen={true} />
            <div className="flex gap-4 flex-wrap mb-6">
                <StatCard title="Today's Sales" value={stats.sales.value} change={stats.sales.change} />
                <StatCard title="Orders" value={stats.orders.value} change={stats.orders.change} />
                <StatCard title="Visitors" value={stats.visitors.value} change={stats.visitors.change} positive={stats.visitors.positive} />
                <div className="flex-1 min-w-[280px]">
                    <SetupGuide />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <SalesChart data={chartData} />
                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <QuickActions />
                        <Updates />
                        <div className="bg-white rounded-xl p-6 shadow-sm">
                            <div className="font-semibold mb-4">Recent Orders</div>
                            <ul>
                                {[1, 2, 3].map((i) => (
                                    <li key={i} className="flex items-center justify-between py-2 border-b last:border-b-0">
                                        <div>
                                            <div className="font-medium">Order #{1234 + i}</div>
                                            <div className="text-xs text-gray-400">2 items • $45.00</div>
                                        </div>
                                        <div className="text-sm text-gray-500">Processing</div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                <div>
                    <Alerts />
                </div>
            </div>
        </>);
}
