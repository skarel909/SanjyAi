import { useEffect, useRef } from 'react';
import { Message } from '../types';
import { Loader } from 'lucide-react';

interface ChatWindowProps {
  messages: Message[];
  isLoading: boolean;
}

export function ChatWindow({ messages, isLoading }: ChatWindowProps) {
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  return (
    <div className="flex-1 overflow-y-auto custom-scrollbar p-4 md:p-6 space-y-4 md:space-y-6">
      {messages.length === 0 && !isLoading ? (
        <div className="h-full flex items-center justify-center">
          <div className="text-center space-y-4">
            <img
              src="/Proyek_Baru_163_[62B7F69].png"
              alt="Sanjy"
              className="w-16 h-16 mx-auto opacity-50"
            />
            <p className="text-sanjy-accent font-light text-lg">
              Start a conversation with Sanjy
            </p>
            <p className="text-sanjy-accent/60 text-sm font-light max-w-xs">
              Ask anything, get intelligent responses
            </p>
          </div>
        </div>
      ) : (
        <>
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-slide-up`}
            >
              <div
                className={
                  msg.role === 'user'
                    ? 'chat-bubble-user'
                    : 'chat-bubble-ai'
                }
              >
                <p className="text-sm leading-relaxed whitespace-pre-wrap">
                  {msg.content}
                </p>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start animate-slide-up">
              <div className="chat-bubble-ai flex items-center gap-2">
                <Loader className="w-4 h-4 animate-spin" />
                <span className="text-sm text-sanjy-accent">Sanjy is thinking...</span>
              </div>
            </div>
          )}
        </>
      )}
      <div ref={endRef} />
    </div>
  );
}
