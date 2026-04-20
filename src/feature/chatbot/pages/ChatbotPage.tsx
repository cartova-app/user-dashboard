import { Plus } from 'lucide-react';
import ChatInterface from '../components/ChatInterface';
import './../chatbot.css';

export default function ChatbotPage() {
  return (
    <div className="chat-container">
      {/* Sidebar - Chat History */}
      <aside className="sidebar">
        <button className="new-chat-btn">
          <Plus size={16} />
          New chat
        </button>
        <div className="sidebar-history">
          <span className="history-label">Today</span>
          <div className="history-item active">Current conversation</div>
        </div>
      </aside>

      {/* Main chat area */}
      <main className="chat-main">
        <ChatInterface viewMode="full" />
      </main>
    </div>
  );
}
