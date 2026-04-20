import { MessagesSquare } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/core/components/ui/popover';
import ChatInterface from './ChatInterface';

export default function QuickChatFloatingButton() {
  return (
    <div className="quick-chat-wrapper">
      <Popover>
        <PopoverTrigger asChild>
          <button className="quick-chat-fab" aria-label="Open quick chat">
            <MessagesSquare size={24} />
          </button>
        </PopoverTrigger>
        <PopoverContent 
          side="top" 
          align="end" 
          sideOffset={16} 
          className="p-0 bg-transparent border-none shadow-none w-auto"
        >
          <ChatInterface viewMode="compact" />
        </PopoverContent>
      </Popover>
    </div>
  );
}
