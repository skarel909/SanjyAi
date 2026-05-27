import { useState, useRef } from 'react';
import { Send, Paperclip, Mic } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string, file?: File) => void;
  disabled?: boolean;
  selectedModel: string;
  onModelChange: (model: string) => void;
}

export function ChatInput({
  onSendMessage,
  disabled = false,
  selectedModel,
  onModelChange,
}: ChatInputProps) {
  const [input, setInput] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    onSendMessage(input, selectedFile || undefined);
    setInput('');
    setSelectedFile(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  return (
    <div className="border-t border-sanjy-border bg-sanjy-surface/50 p-4 space-y-4">
      {selectedFile && (
        <div className="flex items-center gap-2 text-sm text-sanjy-accent bg-sanjy-bg px-3 py-2 rounded-lg">
          <Paperclip className="w-4 h-4" />
          {selectedFile.name}
          <button
            onClick={() => {
              setSelectedFile(null);
              if (fileInputRef.current) fileInputRef.current.value = '';
            }}
            className="ml-auto text-sanjy-accent hover:text-sanjy-primary"
          >
            ×
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex gap-2 md:gap-3">
        <div className="flex-1 flex items-end gap-2">
          <div className="flex-1 glass rounded-xl p-1 flex items-center">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && e.ctrlKey) {
                  handleSubmit(e as any);
                }
              }}
              placeholder="Ask Sanjy anything..."
              className="flex-1 bg-transparent text-sanjy-primary placeholder-sanjy-accent focus:outline-none resize-none p-3 text-sm"
              rows={1}
              disabled={disabled}
            />

            <div className="flex gap-2 px-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                title="Attach file"
              >
                <Paperclip className="w-4 h-4 text-sanjy-accent" />
              </button>

              <button
                type="button"
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                title="Voice input"
              >
                <Mic className="w-4 h-4 text-sanjy-accent" />
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={disabled || !input.trim()}
            className="p-3 bg-sanjy-primary text-sanjy-bg rounded-xl hover:bg-sanjy-secondary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </form>

      <input
        ref={fileInputRef}
        type="file"
        onChange={handleFileChange}
        className="hidden"
        accept="image/*,.pdf,.txt,.doc,.docx"
      />

      <div className="flex items-center gap-2 text-xs text-sanjy-accent flex-wrap">
        <select
          value={selectedModel}
          onChange={(e) => onModelChange(e.target.value)}
          className="bg-sanjy-bg border border-sanjy-border text-sanjy-primary px-3 py-1 rounded-lg focus:outline-none focus:border-sanjy-accent text-xs"
        >
          <option value="gpt-4">GPT-4</option>
          <option value="gpt-3.5">GPT-3.5</option>
          <option value="claude">Claude</option>
        </select>
        <span className="hidden md:inline">Use Ctrl+Enter to send</span>
      </div>
    </div>
  );
}
