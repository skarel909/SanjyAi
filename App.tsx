import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { SplashScreen } from './components/SplashScreen';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { ChatPage } from './pages/ChatPage';

function AppRoutes() {
  const { user, loading } = useAuth();

  if (loading) {
    return <SplashScreen onComplete={() => {}} />;
  }

  return (
    <Routes>
      <Route
        path="/login"
        element={user ? <Navigate to="/chat" /> : <LoginPage />}
      />
      <Route
        path="/signup"
        element={user ? <Navigate to="/chat" /> : <SignupPage />}
      />
      <Route
        path="/chat"
        element={user ? <ChatPage /> : <Navigate to="/login" />}
      />
      <Route
        path="/"
        element={user ? <Navigate to="/chat" /> : <Navigate to="/login" />}
      />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
