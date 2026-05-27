import { ReactNode } from 'react';
import { useAuth } from '../context/AuthContext';
import { SplashScreen } from '../components/SplashScreen';

interface ProtectedRouteProps {
  children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading } = useAuth();

  if (loading) {
    return <SplashScreen onComplete={() => {}} />;
  }

  if (!user) {
    window.location.href = '/login';
    return null;
  }

  return <>{children}</>;
}

export function PublicRoute({ children }: ProtectedRouteProps) {
  const { user, loading } = useAuth();

  if (loading) {
    return <SplashScreen onComplete={() => {}} />;
  }

  if (user) {
    window.location.href = '/chat';
    return null;
  }

  return <>{children}</>;
}
