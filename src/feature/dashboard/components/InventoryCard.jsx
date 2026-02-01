import { Card, CardContent, CardHeader, CardTitle } from "@core/components/ui/card"
import { Button } from "@core/components/ui/button"
import { Box, AlertTriangle } from "lucide-react"

const InventoryCard = () => {
    return (
        <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-xl font-bold">Inventory</CardTitle>
                <button className="text-sm font-medium text-muted-foreground hover:underline">
                    Manage Products
                </button>
            </CardHeader>

            <CardContent className="space-y-4">
                {/* Total Products Section */}
                <div className="flex items-center p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <div className="p-2 bg-white rounded-lg shadow-sm mr-4">
                        <Box className="w-5 h-5 text-slate-600" />
                    </div>
                    <div className="text-start">
                        <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                            Total Products
                        </p>
                        <p className="text-xl font-bold">847</p>
                    </div>
                </div>

                {/* Low Stock Warning Section */}
                <div className="flex items-center p-4 bg-yellow-50 rounded-xl border border-yellow-100">
                    <div className="p-2 bg-white rounded-lg shadow-sm mr-4">
                        <AlertTriangle className="w-5 h-5 text-yellow-500" />
                    </div>
                    <div className="text-start">
                        <p className="text-xs font-medium text-yellow-600 uppercase tracking-wider">
                            Low Stock
                        </p>
                        <p className="text-xl font-bold text-yellow-700">12</p>
                    </div>
                </div>

                {/* Action Button */}
                <Button
                    variant="outline"
                    className="w-full mt-4 border-slate-300 text-slate-700 hover:bg-slate-50 h-12 text-md font-semibold"
                >
                    View Inventory
                </Button>
            </CardContent>
        </Card>
    )
}

export default InventoryCard