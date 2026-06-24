import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { ArrowUp, ChevronRight, CircleStop, User } from 'lucide-react';
import { type FormEvent, type ReactNode, useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import assistantAvatar from '@/assets/images/assistant-avatar.png';
import { Button } from '@/core/components/ui/button';
import { cn } from '@/core/lib/utils';

interface ChatInterfaceProps {
  viewMode?: 'full' | 'compact';
  className?: string;
  headerAction?: ReactNode;
}

const suggestions = [
  {
    label: 'How do I start?',
    prompt: 'How do I start building my online store with Cartova?',
  },
  {
    label: 'What does Cartova do?',
    prompt: 'What does Cartova do for online stores?',
  },
  {
    label: 'Pricing plans?',
    prompt: 'Explain Cartova pricing plans.',
  },
];

export default function ChatInterface({ viewMode = 'full', className, headerAction }: ChatInterfaceProps) {
  const token = localStorage?.getItem('bearer_token');
  const { messages, sendMessage, status, stop } = useChat({
    transport: new DefaultChatTransport({
      api: import.meta.env.VITE_CHATBOT_API_URL,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  });

  const [input, setInput] = useState('');
  const isLoading = status === 'streaming' || status === 'submitted';
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isCompact = viewMode === 'compact';

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  });

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (!input.trim() || isLoading) return;

    sendMessage({ parts: [{ type: 'text', text: input }] });
    setInput('');
  };

  return (
    <section
      className={cn(
        'flex h-full min-h-0 w-full flex-col overflow-hidden bg-background text-foreground',
        isCompact ? 'max-w-full' : 'min-h-[calc(100vh-4rem)]',
        className,
      )}
    >
      <header className="flex min-h-[82px] items-center gap-3.5 border-b border-border px-7">
        <div className="grid size-10 shrink-0 place-items-center overflow-hidden rounded-full bg-[#ecff77]">
          <img src={assistantAvatar} alt="" className="h-[82%] w-[82%] object-contain" />
        </div>

        <div className="min-w-0 flex-1">
          <h2 className="truncate text-2xl font-extrabold leading-tight text-foreground">Cartova Assistant</h2>
          <div className="mt-1 flex items-center gap-2 text-sm font-semibold text-muted-foreground">
            <span className="size-2.5 rounded-full bg-teal-700" />
            <span>Online &amp; Helpful</span>
          </div>
        </div>

        {headerAction}
      </header>

      <div className="min-h-0 flex-1 overflow-y-auto px-7 py-8">
        {messages.length === 0 ? (
          <div className="flex min-h-full flex-col">
            <div className="flex flex-col items-center pt-2">
              <div className="relative">
                <img
                  src={assistantAvatar}
                  alt="Cartova assistant"
                  className="h-auto w-[min(220px,68vw)] object-contain"
                />
                <div className="mx-auto mt-3 h-3.5 w-32 rounded-full bg-foreground/15 blur-md" />
              </div>
            </div>

            <div className="mt-16 max-w-[232px]">
              <div className="rounded-[18px] border border-border bg-card px-4 py-3.5 text-lg leading-[1.45] text-card-foreground shadow-[0_16px_35px_rgba(15,23,42,0.08)] dark:shadow-none">
                Hi, I&apos;m Cartova Assistant. Ask me anything about building your online store.
              </div>
              <div className="mt-1 pl-5 text-xs font-medium text-muted-foreground">Just now</div>
            </div>

            <div className="mt-auto pt-10">
              <h3 className="mb-3 text-sm font-bold text-muted-foreground">Suggested for you</h3>
              <div className="space-y-3">
                {suggestions.map((suggestion) => (
                  <Button
                    key={suggestion.label}
                    type="button"
                    variant="outline"
                    onClick={() => setInput(suggestion.prompt)}
                    className="h-[52px] w-full justify-between rounded-[16px] border-border bg-card px-5 text-left text-lg font-medium text-card-foreground shadow-none hover:scale-100 hover:bg-muted/45 hover:shadow-none"
                  >
                    <span className="truncate">{suggestion.label}</span>
                    <ChevronRight className="size-6 shrink-0 text-[#006ecb]" strokeWidth={3} />
                  </Button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-5">
            {messages.map((message) => (
              <div key={message.id} className={cn('flex gap-3', message.role === 'user' && 'justify-end')}>
                {message.role !== 'user' && (
                  <div className="grid size-8 shrink-0 place-items-center overflow-hidden rounded-full bg-[#ecff77]">
                    <img src={assistantAvatar} alt="Cartova assistant" className="h-[82%] w-[82%] object-contain" />
                  </div>
                )}

                <div
                  className={cn(
                    'max-w-[82%] rounded-[18px] px-4 py-3 text-[15px] leading-6',
                    message.role === 'user'
                      ? 'bg-[#ecff77] text-slate-950'
                      : 'border border-border bg-card text-card-foreground shadow-[0_12px_28px_rgba(15,23,42,0.08)] dark:shadow-none',
                  )}
                >
                  {message.parts.map((part) => {
                    if (part.type === 'text') {
                      const partKey = `${message.id}-text-${part.text.slice(0, 48)}`;

                      return (
                        <ReactMarkdown
                          key={partKey}
                          remarkPlugins={[remarkGfm]}
                          components={{
                            p: ({ children }) => <p className="mb-3 last:mb-0">{children}</p>,
                            code: ({ children }) => (
                              <code className="rounded bg-muted px-1.5 py-0.5 text-sm text-foreground">{children}</code>
                            ),
                            pre: ({ children }) => (
                              <pre className="my-3 overflow-x-auto rounded-xl bg-muted p-3 text-sm text-foreground">
                                {children}
                              </pre>
                            ),
                          }}
                        >
                          {part.text}
                        </ReactMarkdown>
                      );
                    }

                    if (part.type.startsWith('tool-')) {
                      const toolPart = part as {
                        type: string;
                        toolCallId: string;
                        title?: string;
                        state: string;
                        output?: unknown;
                      };
                      const partKey = `${message.id}-${toolPart.toolCallId}-${toolPart.state}`;

                      return (
                        <div key={partKey} className="rounded-xl border border-border bg-muted/45 p-3 text-sm">
                          <span className="font-bold">{toolPart.title || toolPart.toolCallId}</span>
                          {toolPart.state === 'output-available' && toolPart.output ? (
                            <pre className="mt-2 overflow-x-auto rounded-lg bg-background p-3 text-xs text-foreground">
                              {JSON.stringify(toolPart.output, null, 2)}
                            </pre>
                          ) : null}
                        </div>
                      );
                    }

                    return null;
                  })}
                </div>

                {message.role === 'user' && (
                  <div className="grid size-8 shrink-0 place-items-center rounded-full bg-muted text-muted-foreground">
                    <User size={16} />
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-3">
                <div className="grid size-8 shrink-0 place-items-center overflow-hidden rounded-full bg-[#ecff77]">
                  <img src={assistantAvatar} alt="Cartova assistant" className="h-[82%] w-[82%] object-contain" />
                </div>
                <div
                  className="flex items-center gap-1 rounded-[18px] border border-border bg-card px-4 py-4 shadow-[0_12px_28px_rgba(15,23,42,0.08)] dark:shadow-none"
                  role="status"
                  aria-label="Cartova assistant is responding"
                >
                  <span className="size-2 rounded-full bg-muted-foreground" />
                  <span className="size-2 rounded-full bg-muted-foreground" />
                  <span className="size-2 rounded-full bg-muted-foreground" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      <footer className="border-t border-border px-7 py-4">
        <form onSubmit={handleSubmit}>
          <div className="flex min-h-[58px] items-center gap-3 rounded-full border border-border bg-muted/45 px-4 shadow-inner">
            <textarea
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' && !event.shiftKey) {
                  event.preventDefault();
                  handleSubmit(event);
                }
              }}
              placeholder="Type your message"
              rows={1}
              disabled={isLoading}
              className="min-h-7 flex-1 resize-none border-0 bg-transparent p-0 text-lg leading-7 text-foreground outline-none placeholder:text-muted-foreground disabled:opacity-60"
            />

            {isLoading ? (
              <Button
                type="button"
                onClick={stop}
                size="icon"
                aria-label="Stop response"
                className="size-[42px] shrink-0 rounded-full bg-[#ecff77] text-slate-950 shadow-none hover:scale-100 hover:bg-[#ecff77]"
              >
                <CircleStop size={22} />
              </Button>
            ) : (
              <Button
                type="submit"
                disabled={!input.trim()}
                size="icon"
                aria-label="Send message"
                className="size-[42px] shrink-0 rounded-full bg-[#ecff77] text-slate-950 shadow-none hover:scale-100 hover:bg-[#ecff77] disabled:opacity-50"
              >
                <ArrowUp size={26} className="rotate-90" strokeWidth={4} />
              </Button>
            )}
          </div>
        </form>
      </footer>
    </section>
  );
}
