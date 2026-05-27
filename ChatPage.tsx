import { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { supabase } from './supabase';
import { ChatSidebar } from '../components/ChatSidebar';
import { ChatWindow } from '../components/ChatWindow';
import { ChatInput } from '../components/ChatInput';
import { Navbar } from '../components/Navbar';
import { SettingsModal } from '../components/SettingsModal';
import { Message, Chat } from '../types';

export function ChatPage() {
  const { user } = useAuth();
  const [chats, setChats] = useState<Chat[]>([]);
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [selectedModel, setSelectedModel] = useState('gpt-4');

  useEffect(() => {
    if (!user) return;
    loadChats();
  }, [user]);

  useEffect(() => {
    if (!activeChat) return;
    loadMessages();
  }, [activeChat]);

  const loadChats = async () => {
    if (!user) return;
    try {
      const { data, error } = await supabase
        .from('chats')
        .select('*')
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false });

      if (error) throw error;
      setChats(data || []);
      if (data && data.length > 0) {
        setActiveChat(data[0].id);
      }
    } catch (error) {
      console.error('Error loading chats:', error);
    }
  };

  const loadMessages = async () => {
    if (!activeChat) return;
    try {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('chat_id', activeChat)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setMessages(data || []);
    } catch (error) {
      console.error('Error loading messages:', error);
    }
  }

  const handleNewChat = async () => {
    if (!user) return;
    try {
      const { data, error } = await supabase
        .from('chats')
        .insert([
          {
            user_id: user.id,
            title: 'New Chat',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
        ])
        .select()
        .maybeSingle();

      if (error) throw error;
      if (data) {
        setChats([data, ...chats]);
        setActiveChat(data.id);
        setMessages([]);
      }
    } catch (error) {
      console.error('Error creating chat:', error);
    }
  };

  const handleSelectChat = (id: string) => {
    setActiveChat(id);
  };

  const handleDeleteChat = async (id: string) => {
    try {
      const { error } = await supabase.from('chats').delete().eq('id', id);

      if (error) throw error;
      setChats(chats.filter((chat) => chat.id !== id));
      if (activeChat === id) {
        setActiveChat(chats.length > 1 ? chats[0].id : null);
        setMessages([]);
      }
    } catch (error) {
      console.error('Error deleting chat:', error);
    }
  };

  const handleSendMessage = async (content: string) => {
    if (!activeChat || !user) return;

    try {
      const { data: userMsg, error: msgError } = await supabase
        .from('messages')
        .insert([
          {
            chat_id: activeChat,
            user_id: user.id,
            content,
            role: 'user',
            model: selectedModel,
          },
        ])
        .select()
        .maybeSingle();

      if (msgError) throw msgError;
      if (userMsg) {
        setMessages([...messages, userMsg]);
      }

      setIsLoading(true);

      // Simulate AI response
      const aiResponse =
        "I'm Sanjy AI, your intelligent assistant. I'm here to help you with any questions or tasks. This is a demo response. To integrate real AI models, you would need to set up an API connection.";

      setTimeout(async () => {
        try {
          const { data: aiMsg, error: aiError } = await supabase
            .from('messages')
            .insert([
              {
                chat_id: activeChat,
                user_id: user.id,
                content: aiResponse,
                role: 'assistant',
                model: selectedModel,
              },
            ])
            .select()
            .maybeSingle();

          if (aiError) throw aiError;
          if (aiMsg) {
            setMessages((prev) => [...prev, aiMsg]);
          }

          // Update chat title if first message
          if (messages.length === 0) {
            const chatTitle = content.substring(0, 30) + (content.length > 30 ? '...' : '');
            await supabase
              .from('chats')
              .update({ title: chatTitle, updated_at: new Date().toISOString() })
              .eq('id', activeChat);
          }
        } catch (error) {
          console.error('Error sending AI response:', error);
        } finally {
          setIsLoading(false);
        }
      }, 1000);
    } catch (error) {
      console.error('Error sending message:', error);
      setIsLoading(false);
    }
  };

  const handleSearchChats = (query: string) => {
    if (!query) return;
    // Implement search logic
  };

  return (
    <div className="h-screen bg-sanjy-bg flex flex-col">
      <Navbar onSettingsClick={() => setShowSettings(true)} />

      <div className="flex-1 flex overflow-hidden">
        <ChatSidebar
          chats={chats}
          activeChat={activeChat}
          onNewChat={handleNewChat}
          onSelectChat={handleSelectChat}
          onDeleteChat={handleDeleteChat}
          onSearch={handleSearchChats}
        />

        <div className="flex-1 flex flex-col">
          {activeChat ? (
            <>
              <ChatWindow messages={messages} isLoading={isLoading} />
              <ChatInput
                onSendMessage={handleSendMessage}
                disabled={isLoading}
                selectedModel={selectedModel}
                onModelChange={setSelectedModel}
              />
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center space-y-4">
                <img
                  src="/Proyek_Baru_163_[62B7F69].png"
                  alt="Sanjy"
                  className="w-20 h-20 mx-auto opacity-40"
                />
                <p className="text-sanjy-accent font-light text-lg">
                  Select a chat or create a new one
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <SettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
      />
    </div>
  );
}
