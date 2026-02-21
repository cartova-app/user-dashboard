import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/core/components/ui/card";
import { Button } from "@/core/components/ui/button";
import { Box, AlertTriangle } from "lucide-react";

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
        <div className="flex items-center p-4 bg-muted/50 rounded-xl border border-border">
          <div className="p-2 bg-card rounded-lg shadow-sm mr-4">
            <Box className="w-5 h-5 text-muted-foreground" />
          </div>
          <div className="text-start">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Total Products
            </p>
            <p className="text-xl font-bold">847</p>
          </div>
        </div>

        {/* Low Stock Warning Section */}
        <div className="flex items-center p-4 bg-yellow-500/10 rounded-xl border border-yellow-500/20">
          <div className="p-2 bg-card rounded-lg shadow-sm mr-4">
            <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
          </div>
          <div className="text-start">
            <p className="text-xs font-medium text-yellow-600 dark:text-yellow-400 uppercase tracking-wider">
              Low Stock
            </p>
            <p className="text-xl font-bold text-yellow-700 dark:text-yellow-300">
              12
            </p>
          </div>
        </div>

        {/* Action Button */}
        <Button
          variant="outline"
          className="w-full mt-4 border-input text-foreground hover:bg-accent h-12 text-md font-semibold"
        >
          View Inventory
        </Button>
      </CardContent>
    </Card>
  );
};

export default InventoryCard;
