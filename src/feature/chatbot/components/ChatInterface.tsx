import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from "ai";
import { useState, useRef, useEffect, FormEvent } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { MessageSquare, Send, StopCircle, User } from 'lucide-react';
import { cn } from '@/core/lib/utils';

interface ChatInterfaceProps {
  viewMode?: 'full' | 'compact';
  className?: string;
}

export default function ChatInterface({ viewMode = 'full', className }: ChatInterfaceProps) {
  const token = localStorage?.getItem("bearer_token"); // ✅ safe optional chaining
  const { messages, sendMessage, status, stop } = useChat({
    transport: new DefaultChatTransport({
      api: import.meta.env.VITE_CHATBOT_API_URL,
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    }),
  });

  const [input, setInput] = useState('');
  const isLoading = status === 'streaming' || status === 'submitted';
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  console.log(messages)
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    sendMessage({ parts: [{ type: 'text', text: input }] });
    setInput('');
  };

  const isCompact = viewMode === 'compact';

  return (
    <div className={cn(
      "chat-interface-wrapper",
      isCompact ? "compact-mode" : "full-mode",
      className
    )}>
      {/* Messages */}
      <div className="messages-container">
        {messages.length === 0 ? (
          <div className="welcome-screen">
            <div className="welcome-icon">
              <MessageSquare size={isCompact ? 32 : 64} className="text-primary" />
            </div>
            <h1 className="welcome-title">{isCompact ? "How can I help?" : "How can I help you today?"}</h1>
            {!isCompact && (
              <div className="suggestions">
                <button className="suggestion-btn" onClick={() => setInput("Explain quantum computing in simple terms")}>
                  <span className="suggestion-icon">💡</span>
                  Explain quantum computing in simple terms
                </button>
                <button className="suggestion-btn" onClick={() => setInput("Write a Python script to scrape a website")}>
                  <span className="suggestion-icon">🐍</span>
                  Write a Python script to scrape a website
                </button>
                <button className="suggestion-btn" onClick={() => setInput("What are the best practices for REST API design?")}>
                  <span className="suggestion-icon">🔧</span>
                  What are the best practices for REST API design?
                </button>
                <button className="suggestion-btn" onClick={() => setInput("Help me debug my code")}>
                  <span className="suggestion-icon">🐛</span>
                  Help me debug my code
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="messages">
            {messages.map((m) => (
              <div key={m.id} className={`message ${m.role}`}>
                <div className="message-avatar">
                  {m.role === 'user' ? (
                    <div className="avatar user-avatar"><User size={14} /></div>
                  ) : (
                    <div className="avatar assistant-avatar">
                      <MessageSquare size={14} />
                    </div>
                  )}
                </div>
                <div className="message-content">
                  {m.parts.map((part, i) => {
                    if (part.type === 'text') return (
                      <div key={i} className="markdown-content">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>{part.text}</ReactMarkdown>
                      </div>
                    );
                    if (part.type.startsWith('tool-')) {
                      const toolPart = part as { type: string; toolCallId: string; title?: string; state: string; input?: unknown; output?: unknown };
                      return (
                        <div key={i} className="tool-call">
                          <span className="tool-name">🔧 {toolPart.title || toolPart.toolCallId}</span>
                          {toolPart.state === 'output-available' && toolPart.output ? (
                            <pre className="tool-result">{JSON.stringify(toolPart.output, null, 2)}</pre>
                          ) : null}
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="message assistant">
                <div className="message-avatar">
                  <div className="avatar assistant-avatar">
                    <MessageSquare size={14} />
                  </div>
                </div>
                <div className="message-content">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input area */}
      <div className="input-container">
        <form onSubmit={handleSubmit} className="input-form">
          <div className="input-wrapper">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
              placeholder="Message..."
              rows={1}
              disabled={isLoading}
              className="chat-input"
            />
            <div className="input-actions">
              {isLoading ? (
                <button type="button" onClick={stop} className="stop-btn">
                  <StopCircle size={20} />
                </button>
              ) : (
                <button type="submit" disabled={!input.trim()} className="send-btn">
                  <Send size={16} />
                </button>
              )}
            </div>
          </div>
        </form>
        {!isCompact && <p className="disclaimer">ChatGPT can make mistakes. Check important info.</p>}
      </div>
    </div>
  );
}
