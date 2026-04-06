import { Filter, SlidersHorizontal } from 'lucide-react';
import SearchInput from '@/core/components/common/SearchInput';
import { ViewToggle, type ViewType } from '@/core/components/common/ViewToggle';
import { Button } from '@/core/components/ui/button';

type FilterTab = 'all' | 'status' | 'inventory' | 'price';

interface ProductsToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;
  activeTab: FilterTab;
  onTabChange: (tab: FilterTab) => void;
  view: ViewType;
  onViewChange: (view: ViewType) => void;
}

const tabs: { value: FilterTab; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'status', label: 'Status' },
  { value: 'inventory', label: 'Inventory' },
  { value: 'price', label: 'Price' },
];

export default function ProductsToolbar({
  search,
  onSearchChange,
  activeTab,
  onTabChange,
  view,
  onViewChange,
}: ProductsToolbarProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div className="flex items-center gap-1">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            type="button"
            onClick={() => onTabChange(tab.value)}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
              activeTab === tab.value
                ? 'bg-foreground text-background shadow-sm'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <SearchInput
          value={search}
          onChange={onSearchChange}
          placeholder="Search Members"
          variant="default"
          size="md"
          debounceMs={300}
          containerClassName="w-[200px]"
        />
        <ViewToggle view={view} setView={onViewChange} />
        <Button variant="ghost" size="icon" className="size-10 rounded-xl text-muted-foreground hover:bg-accent/50">
          <Filter className="size-5" strokeWidth={1.5} />
        </Button>
        <Button variant="ghost" size="icon" className="size-10 rounded-xl text-muted-foreground hover:bg-accent/50">
          <SlidersHorizontal className="size-5" strokeWidth={1.5} />
        </Button>
      </div>
    </div>
  );
}
