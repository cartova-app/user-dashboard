import { X } from 'lucide-react';
import assistantAvatar from '@/assets/images/assistant-avatar.png';
import { Button } from '@/core/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
  DrawerTrigger,
} from '@/core/components/ui/drawer';
import ChatInterface from './ChatInterface';

export default function QuickChatFloatingButton() {
  return (
    <div>
      <Drawer direction="right">
        <DrawerTrigger asChild>
          <Button
            type="button"
            size="icon"
            aria-label="Open quick chat"
            className="fixed bottom-6 right-6 z-50 size-14 overflow-hidden rounded-full border border-[#dff66b] bg-slate-950 p-0 shadow-2xl shadow-slate-950/25 hover:scale-105 hover:bg-slate-950"
          >
            <img src={assistantAvatar} alt="" className="h-[78%] w-[78%] object-contain" />
          </Button>
        </DrawerTrigger>
        <DrawerContent className="right-0 bottom-0 left-auto top-0 mt-0 h-screen w-[min(400px,100vw)] rounded-none border-0 border-l border-border bg-background p-0 shadow-[-24px_0_60px_rgba(15,23,42,0.18)] dark:shadow-[-24px_0_60px_rgba(0,0,0,0.45)] [&>div:first-child]:hidden">
          <DrawerTitle className="sr-only">Cartova assistant</DrawerTitle>
          <DrawerDescription className="sr-only">
            Ask Cartova to write, review, summarize, or improve store work.
          </DrawerDescription>
          <ChatInterface
            viewMode="compact"
            headerAction={
              <DrawerClose asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  aria-label="Close assistant"
                  className="size-10 rounded-full text-muted-foreground hover:bg-transparent hover:text-foreground"
                >
                  <X size={28} strokeWidth={2.4} />
                </Button>
              </DrawerClose>
            }
          />
        </DrawerContent>
      </Drawer>
    </div>
  );
}
