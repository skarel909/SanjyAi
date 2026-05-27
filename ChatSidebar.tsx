import { useState } from 'react';
import { Plus, MessageSquare, Trash2, Search } from 'lucide-react';

interface ChatItem {
  id: string;
  title: string;
}

interface ChatSidebarProps {
  chats: ChatItem[];
  activeChat: string | null;
  onNewChat: () => void;
  onSelectChat: (id: string) => void;
  onDeleteChat: (id: string) => void;
  onSearch: (query: string) => void;
}

export function ChatSidebar({
  chats,
  activeChat,
  onNewChat,
  onSelectChat,
  onDeleteChat,
  onSearch,
}: ChatSidebarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedChat, setExpandedChat] = useState<string | null>(null);

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    onSearch(value);
  };

  return (
    <div className="hidden md:flex w-64 bg-sanjy-surface border-r border-sanjy-border flex-col h-full">
      <div className="p-4 border-b border-sanjy-border space-y-4">
        <button
          onClick={onNewChat}
          className="w-full flex items-center justify-center gap-2 bg-sanjy-primary text-sanjy-bg px-4 py-2.5 rounded-lg font-medium hover:bg-sanjy-secondary transition-colors text-sm"
        >
          <Plus className="w-4 h-4" />
          New Chat
        </button>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-sanjy-accent" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search chats..."
            className="w-full pl-10 pr-4 py-2 bg-sanjy-bg border border-sanjy-border text-sanjy-primary text-sm rounded-lg placeholder-sanjy-accent focus:outline-none focus:border-sanjy-accent"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-2">
        {chats.length === 0 ? (
          <p className="text-sanjy-accent text-center py-8 text-sm font-light">
            No chats yet
          </p>
        ) : (
          chats.map((chat) => (
            <div
              key={chat.id}
              className={`group relative p-3 rounded-lg cursor-pointer transition-colors ${
                activeChat === chat.id
                  ? 'bg-sanjy-bg border border-sanjy-accent'
                  : 'hover:bg-sanjy-bg border border-transparent'
              }`}
              onMouseEnter={() => setExpandedChat(chat.id)}
              onMouseLeave={() => setExpandedChat(null)}
            >
              <div
                onClick={() => onSelectChat(chat.id)}
                className="flex items-start gap-3 min-w-0"
              >
                <MessageSquare className="w-4 h-4 mt-0.5 flex-shrink-0 text-sanjy-accent" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-sanjy-primary truncate font-light">
                    {chat.title}
                  </p>
                </div>
              </div>

              {expandedChat === chat.id && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteChat(chat.id);
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-red-500/20 rounded transition-colors"
                >
                  <Trash2 className="w-4 h-4 text-red-400" />
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
