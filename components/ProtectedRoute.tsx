import React, { ReactNode } from 'react';
import { useAuth } from './AuthContext';
import LoginPage from './LoginPage';

interface ProtectedRouteProps {
  children: ReactNode;
  onBackToHome: () => void;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, onBackToHome }) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <>{children}</>;
  } else {
    return <LoginPage onBack={onBackToHome} />;
  }
};

export default ProtectedRoute;
