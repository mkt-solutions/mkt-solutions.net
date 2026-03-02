import React, { ReactNode } from 'react';
import { useAuth } from './AuthContext';
import LoginPage from './LoginPage';

interface ProtectedRouteProps {
  children: ReactNode;
  onBackToHome: () => void;
  onLoginSuccess?: () => void;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, onBackToHome, onLoginSuccess }) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <>{children}</>;
  } else {
    return <LoginPage onBack={onBackToHome} onLoginSuccess={onLoginSuccess} />;
  }
};

export default ProtectedRoute;
