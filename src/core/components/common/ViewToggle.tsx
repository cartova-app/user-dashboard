import { LayoutGrid, Rows } from "lucide-react";
import { Button } from "@/core/components/ui/button";

export type ViewType = "grid" | "list";

interface ViewToggleProps {
  view: ViewType;
  setView: (view: ViewType) => void;
}

export function ViewToggle({ view, setView }: ViewToggleProps) {
  return (
    <div className="flex items-center gap-1">
      {/* Grid View Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setView("grid")}
        className={`size-10 rounded-xl transition-all ${
          view === "grid"
            ? "bg-accent text-accent-foreground shadow-sm"
            : "text-muted-foreground hover:bg-accent/50"
        }`}
      >
        <LayoutGrid className="size-5" strokeWidth={1.5} />
      </Button>

      {/* List View Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setView("list")}
        className={`size-10 rounded-xl transition-all ${
          view === "list"
            ? "bg-accent text-accent-foreground shadow-sm"
            : "text-muted-foreground hover:bg-accent/50"
        }`}
      >
        <Rows className="size-5" strokeWidth={1.5} />
      </Button>
    </div>
  );
}
