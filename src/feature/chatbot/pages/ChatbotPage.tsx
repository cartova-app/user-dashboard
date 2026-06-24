import { Plus } from 'lucide-react';
import { Button } from '@/core/components/ui/button';
import ChatInterface from '../components/ChatInterface';

export default function ChatbotPage() {
  return (
    <div className="flex h-[calc(100vh-4rem)] min-h-[560px] overflow-hidden bg-background text-foreground">
      <aside className="hidden w-[270px] flex-col gap-6 border-r border-border bg-card p-4 md:flex">
        <Button
          type="button"
          variant="primary"
          className="h-11 justify-start rounded-lg px-4 text-sm font-extrabold text-slate-950 shadow-none hover:scale-100"
        >
          <Plus size={16} />
          New chat
        </Button>
        <div className="min-h-0 flex-1 overflow-y-auto">
          <span className="block px-2 pb-2 text-xs font-extrabold uppercase text-muted-foreground">Today</span>
          <div className="rounded-lg border border-[#ecff77]/60 bg-[#ecff77]/15 px-3 py-3 text-sm font-semibold text-slate-800">
            Current conversation
          </div>
        </div>
      </aside>

      <main className="min-w-0 flex-1">
        <ChatInterface viewMode="full" className="mx-auto max-w-[400px] border-x border-border shadow-sm" />
      </main>
    </div>
  );
}
