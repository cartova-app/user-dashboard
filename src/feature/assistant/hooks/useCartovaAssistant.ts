import { useState, useCallback } from 'react';

export type MessageSender = 'user' | 'bot';

export interface ChatMessage {
  id: string;
  sender: MessageSender;
  text?: string;
  timestamp: Date;
  customComponentType?: 'steps' | 'product_prompt';
  productDetails?: { name: string; serial: string };
  isTyping?: boolean; // Used for "Looking up details..." state or generic typing
}

const initialMessages: ChatMessage[] = [
  {
    id: 'msg-1',
    sender: 'bot',
    text: "Hi, I'm Cartova Assistant. Ask me anything about building your online store.",
    timestamp: new Date(),
  },
];

export function useCartovaAssistant() {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);

  const addMessage = useCallback((message: Omit<ChatMessage, 'id' | 'timestamp'>) => {
    const newMessage: ChatMessage = {
      ...message,
      id: Math.random().toString(36).substring(7),
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);
    return newMessage.id;
  }, []);

  const updateMessage = useCallback((id: string, updates: Partial<ChatMessage>) => {
    setMessages((prev) =>
      prev.map((msg) => (msg.id === id ? { ...msg, ...updates } : msg))
    );
  }, []);

  const streamMessage = useCallback((fullText: string) => {
    const id = addMessage({ sender: 'bot', text: '' });
    
    let currentIndex = 0;
    const interval = setInterval(() => {
      // Simulate real LLM streaming chunks (1-4 characters at a time)
      currentIndex += Math.floor(Math.random() * 4) + 1;
      if (currentIndex > fullText.length) currentIndex = fullText.length;
      
      setMessages((prev) => prev.map(msg => 
        msg.id === id ? { ...msg, text: fullText.slice(0, currentIndex) } : msg
      ));
      
      if (currentIndex >= fullText.length) {
        clearInterval(interval);
      }
    }, 25);
  }, [addMessage]);

  const handleAction = useCallback((action: 'accept_product' | 'refuse_product') => {
    if (action === 'accept_product') {
      streamMessage('Product added successfully! You can view it in your products list.');
    } else if (action === 'refuse_product') {
      streamMessage('Okay, cancelled. Let me know if you want to search for something else.');
    }
  }, [streamMessage]);

  const sendMessage = useCallback((text: string) => {
    // Add user message
    addMessage({ sender: 'user', text });

    const lowerText = text.toLowerCase();

    // Simulation logic
    if (lowerText.includes('how do i start')) {
      setTimeout(() => {
        addMessage({ sender: 'bot', customComponentType: 'steps' });
      }, 600);
    } else if (lowerText.includes('add a product with serial')) {
      // Extract serial roughly
      const serialMatch = lowerText.match(/serial ([\w-]+)/i);
      const serial = serialMatch ? serialMatch[1] : 'UNKNOWN-SERIAL';

      setTimeout(() => {
        const typingMsgId = addMessage({ sender: 'bot', text: 'Looking up product details...', isTyping: true });
        
        setTimeout(() => {
          updateMessage(typingMsgId, {
            text: undefined,
            isTyping: false,
            customComponentType: 'product_prompt',
            productDetails: { name: 'Sony Alpha a7 III Mirrorless Camera', serial },
          });
        }, 1500);
      }, 500);
    } else if (lowerText.includes('hello') || lowerText.includes('hi')) {
      setTimeout(() => streamMessage("Hello! I am Cartova Assistant. I'm here to help you build and manage your online store. What would you like to do next?"), 400);
    } else if (lowerText.includes('pricing') || lowerText.includes('price')) {
      setTimeout(() => streamMessage("Cartova offers flexible pricing plans that scale with your business. You can start for free, and upgrade as your traffic and sales grow!"), 500);
    } else if (lowerText.includes('what does cartova do') || lowerText.includes('what is cartova')) {
      setTimeout(() => streamMessage("Cartova provides a comprehensive platform for building and scaling your online business, from storefront design to checkout and inventory management."), 500);
    } else {
      setTimeout(() => {
        const responses = [
          "That's a great question. Let's focus on setting up your store first. Would you like me to guide you through the process?",
          "I can definitely help with that. To get started, I recommend adding your first product. Do you have a serial number I can look up?",
          "I've noted that! Let's make sure your store's foundation is solid first. Would you like to see the quick start guide?",
          "I'm here to help! My primary expertise right now is helping you build your store and manage products seamlessly.",
          "Interesting. How about we try adding a product to your inventory so you can see how the system works?"
        ];
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        streamMessage(randomResponse);
      }, 600);
    }
  }, [addMessage, updateMessage, streamMessage]);

  return {
    messages,
    sendMessage,
    handleAction,
  };
}
