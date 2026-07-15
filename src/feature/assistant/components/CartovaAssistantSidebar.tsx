import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Sparkles, ChevronRight, Bot } from 'lucide-react';
import Logo from '@/assets/icons/logo.svg?react';
import { useAssistant } from '@/core/providers/assistant-provider';
import { useCartovaAssistant, ChatMessage } from '../hooks/useCartovaAssistant';

export function CartovaAssistantSidebar() {
  const { isOpen, closeAssistant } = useAssistant();
  const { messages, sendMessage, handleAction } = useCartovaAssistant();
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSend = () => {
    if (inputValue.trim()) {
      sendMessage(inputValue);
      setInputValue('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  if (!isOpen) return null;

  const renderCustomComponent = (msg: ChatMessage) => {
    if (msg.customComponentType === 'steps') {
      return (
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-center mb-2">
            <div className="flex items-center gap-2 bg-[#ecff77]/20 text-xs font-medium px-4 py-1.5 rounded-full text-foreground">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Cartova Intelligence Active</span>
            </div>
          </div>
          <div className="bg-white dark:bg-zinc-900 border shadow-sm rounded-2xl p-5 w-[85%] text-sm text-zinc-700 dark:text-zinc-300">
            <p className="mb-4 text-sm leading-relaxed">
              Starting your store is easy! Follow these three simple steps to get your business off the ground:
            </p>
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#ecff77] flex items-center justify-center text-xs font-bold text-black shrink-0">1</div>
                <p className="leading-snug"><span className="font-semibold text-black dark:text-white">Choose a template.</span> Pick from our library of conversion optimized designs that fit your brand's unique vibe.</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#ecff77] flex items-center justify-center text-xs font-bold text-black shrink-0">2</div>
                <p className="leading-snug"><span className="font-semibold text-black dark:text-white">Add your products.</span> Upload photos, write descriptions, and set your pricing. Our AI can even help draft copy!</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#ecff77] flex items-center justify-center text-xs font-bold text-black shrink-0">3</div>
                <p className="leading-snug"><span className="font-semibold text-black dark:text-white">Launch.</span> Connect your domain, set up payments, and open your digital doors to the world.</p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (msg.customComponentType === 'product_prompt' && msg.productDetails) {
      return (
        <div className="flex flex-col gap-3">
          <div className="bg-white dark:bg-zinc-900 border shadow-sm rounded-2xl p-4 w-[85%] text-sm">
            <h4 className="font-semibold text-black dark:text-white mb-1">Product Found</h4>
            <p className="text-zinc-600 dark:text-zinc-400 mb-3">{msg.productDetails.name}</p>
            <div className="text-xs text-zinc-500 mb-4">Serial: {msg.productDetails.serial}</div>
            
            <p className="text-sm font-medium mb-3 text-black dark:text-white">Would you like to add this to your store?</p>
            
            <div className="flex gap-2">
              <button 
                onClick={() => handleAction('accept_product')}
                className="flex-1 bg-[#ecff77] hover:bg-[#dcee66] text-black font-semibold py-2 rounded-lg transition-colors"
              >
                Accept
              </button>
              <button 
                onClick={() => handleAction('refuse_product')}
                className="flex-1 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-black dark:text-white font-semibold py-2 rounded-lg transition-colors"
              >
                Refuse
              </button>
            </div>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="w-96 flex-shrink-0 flex flex-col h-screen sticky top-0 border-l bg-[#fafafa] dark:bg-zinc-950 z-40 transition-all duration-300">
      {/* Header */}
      <div className="h-14 md:h-24 px-4 flex items-center justify-between border-b bg-white dark:bg-zinc-900 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#ecff77] flex items-center justify-center p-2">
            <Logo className="w-full h-full text-black" />
          </div>
          <div className="flex flex-col">
            <h2 className="font-bold text-base md:text-lg text-black dark:text-white leading-none mb-1">Cartova Assistant</h2>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span className="text-xs text-muted-foreground font-medium">Online & Helpful</span>
            </div>
          </div>
        </div>
        <button 
          onClick={closeAssistant}
          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-6">
        {/* Big Avatar Welcome (only show if few messages) */}
        {messages.length <= 1 && (
          <div className="flex justify-center my-6">
            <div className="w-48 h-48 rounded-full bg-[#ecff77] flex items-center justify-center shadow-lg relative overflow-hidden">
               <div className="absolute inset-x-4 inset-y-12 bg-black rounded-[40px] flex items-center justify-center gap-6">
                  {/* Eyes */}
                  <div className="w-4 h-8 bg-[#ecff77] rounded-full animate-pulse" />
                  <div className="w-4 h-8 bg-[#ecff77] rounded-full animate-pulse" />
               </div>
               <Logo className="absolute top-6 w-8 h-8 text-black" />
               <div className="absolute bottom-12 w-10 h-1 bg-[#ecff77] rounded-full" />
            </div>
          </div>
        )}

        <div className="flex flex-col gap-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex flex-col w-full ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
              
              {/* Message content */}
              {msg.text && (
                <div className="flex items-end gap-2 max-w-[85%]">
                  {msg.sender === 'bot' && (
                    <div className="w-6 h-6 rounded-full bg-[#ecff77] flex items-center justify-center shrink-0 mb-1">
                      <Logo className="w-3.5 h-3.5 text-black" />
                    </div>
                  )}
                  <div 
                    className={`px-4 py-3 text-sm rounded-2xl ${
                      msg.sender === 'user' 
                        ? 'bg-[#ecff77] text-black rounded-br-sm font-medium' 
                        : 'bg-white dark:bg-zinc-900 border shadow-sm rounded-bl-sm text-zinc-700 dark:text-zinc-300'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              )}

              {/* Status text (like DELIVERED or Just now) */}
              {!msg.isTyping && msg.sender === 'user' && msg.text && (
                <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider mt-1 mr-1">
                  Delivered
                </span>
              )}
              {msg.id === 'msg-1' && (
                 <span className="text-[10px] text-zinc-400 font-medium ml-9 mt-1">
                  Just now
                </span>
              )}

              {/* Custom Component rendering */}
              {msg.customComponentType && (
                <div className="mt-2 w-full flex">
                   {/* Spacing for avatar if needed */}
                   <div className="w-8 shrink-0 hidden md:block" />
                   {renderCustomComponent(msg)}
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Queries */}
        {messages.length <= 1 && (
          <div className="mt-auto flex flex-col gap-2 pb-2">
            <span className="text-xs font-semibold text-zinc-500 mb-1 px-1">Suggested for you</span>
            {['How do I start?', 'What does Cartova do?', 'Pricing plans?'].map((suggestion) => (
              <button 
                key={suggestion}
                onClick={() => sendMessage(suggestion)}
                className="flex items-center justify-between w-full p-3.5 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-xl hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors shadow-sm text-sm font-medium text-left text-zinc-700 dark:text-zinc-300 group"
              >
                {suggestion}
                <ChevronRight className="w-4 h-4 text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-200 transition-colors" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white dark:bg-zinc-900 border-t shrink-0">
        <div className="relative flex items-center">
          <input 
            type="text" 
            placeholder="Type your message"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full bg-[#f4f4f5] dark:bg-zinc-800 rounded-full pl-5 pr-12 py-3.5 text-sm font-medium text-zinc-800 dark:text-zinc-200 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#ecff77] transition-all"
          />
          <button 
            onClick={handleSend}
            disabled={!inputValue.trim()}
            className="absolute right-1.5 w-9 h-9 rounded-full bg-[#ecff77] flex items-center justify-center text-black disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#dcee66] transition-colors"
          >
            <Send className="w-4 h-4 ml-0.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
