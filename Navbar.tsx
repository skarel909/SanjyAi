import { Settings, LogOut, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

interface NavbarProps {
  onSettingsClick: () => void;
}

export function Navbar({ onSettingsClick }: NavbarProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <nav className="h-16 border-b border-sanjy-border bg-sanjy-surface/50 backdrop-blur-xs flex items-center justify-between px-4 md:px-6">
      <div className="flex items-center gap-3">
        <img
          src="/Proyek_Baru_163_[62B7F69].png"
          alt="Sanjy"
          className="w-8 h-8"
        />
        <h1 className="text-lg font-light tracking-wide text-sanjy-primary hidden sm:block">
          Sanjy AI
        </h1>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <div className="hidden md:flex items-center gap-2 text-sm text-sanjy-accent font-light">
          <User className="w-4 h-4" />
          {user?.name || user?.email}
        </div>

        <button
          onClick={onSettingsClick}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          title="Settings"
        >
          <Settings className="w-5 h-5 text-sanjy-accent" />
        </button>

        <button
          onClick={handleLogout}
          className="p-2 hover:bg-red-500/20 rounded-lg transition-colors"
          title="Logout"
        >
          <LogOut className="w-5 h-5 text-red-400" />
        </button>
      </div>
    </nav>
  );
}
