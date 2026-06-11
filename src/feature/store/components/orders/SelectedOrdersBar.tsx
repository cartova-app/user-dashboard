import { CheckCircle2, Download, Trash2, X } from 'lucide-react';
import { Button } from '@/core/components/ui/button';

type SelectedOrdersBarProps = {
  count: number;
  onClear: () => void;
};

const SelectedOrdersBar = ({ count, onClear }: SelectedOrdersBarProps) => {
  if (count === 0) return null;

  return (
    <div className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 items-center gap-5 rounded-xl bg-neutral-950 px-7 py-4 text-background shadow-2xl">
      <span className="border-r border-background/30 pr-5 text-lg font-bold text-primary">
        {count} {count === 1 ? 'order' : 'orders'} selected
      </span>
      <Button variant="ghost" className="h-auto px-0 text-base text-background hover:bg-transparent hover:text-primary">
        <CheckCircle2 className="size-5" />
        Mark Delivered
      </Button>
      <Button variant="ghost" className="h-auto px-0 text-base text-background hover:bg-transparent hover:text-primary">
        <Download className="size-5" />
        Export
      </Button>
      <Button variant="ghost" className="h-auto px-0 text-base text-background hover:bg-transparent hover:text-primary">
        <Trash2 className="size-5" />
        Cancel Orders
      </Button>
      <button
        type="button"
        className="text-background/70 hover:text-background"
        onClick={onClear}
        aria-label="Clear selection"
      >
        <X className="size-5" />
      </button>
    </div>
  );
};

export default SelectedOrdersBar;
