import { X, Sun, Moon } from 'lucide-react';
import { useState } from 'react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [fontSize, setFontSize] = useState('medium');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-40 p-4">
      <div className="glass w-full max-w-md rounded-2xl p-6 space-y-6 max-h-96 overflow-y-auto custom-scrollbar">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-light text-sanjy-primary">Settings</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {darkMode ? (
                <Moon className="w-4 h-4 text-sanjy-accent" />
              ) : (
                <Sun className="w-4 h-4 text-sanjy-accent" />
              )}
              <span className="text-sm font-light">Dark Mode</span>
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`relative w-10 h-6 rounded-full transition-colors ${
                darkMode ? 'bg-sanjy-primary' : 'bg-sanjy-border'
              }`}
            >
              <div
                className={`absolute top-1 w-4 h-4 bg-sanjy-bg rounded-full transition-transform ${
                  darkMode ? 'translate-x-5' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm font-light">Notifications</span>
            <button
              onClick={() => setNotifications(!notifications)}
              className={`relative w-10 h-6 rounded-full transition-colors ${
                notifications ? 'bg-sanjy-primary' : 'bg-sanjy-border'
              }`}
            >
              <div
                className={`absolute top-1 w-4 h-4 bg-sanjy-bg rounded-full transition-transform ${
                  notifications ? 'translate-x-5' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-light">Font Size</label>
            <select
              value={fontSize}
              onChange={(e) => setFontSize(e.target.value)}
              className="w-full bg-sanjy-bg border border-sanjy-border text-sanjy-primary px-3 py-2 rounded-lg focus:outline-none focus:border-sanjy-accent text-sm"
            >
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-light">AI Model</label>
            <select
              defaultValue="gpt-4"
              className="w-full bg-sanjy-bg border border-sanjy-border text-sanjy-primary px-3 py-2 rounded-lg focus:outline-none focus:border-sanjy-accent text-sm"
            >
              <option value="gpt-4">GPT-4 (Default)</option>
              <option value="gpt-3.5">GPT-3.5</option>
              <option value="claude">Claude 3</option>
            </select>
          </div>
        </div>

        <div className="pt-4 border-t border-sanjy-border space-y-2 text-xs text-sanjy-accent font-light">
          <p>Version 1.0.0</p>
          <p>© 2024 Sanjy AI. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
