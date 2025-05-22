
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ReactNode, useEffect } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  useEffect(() => {
    // Log authentication state to help with debugging
    console.log('Protected route - auth state:', isAuthenticated, 'path:', location.pathname);
  }, [isAuthenticated, location]);

  if (!isAuthenticated) {
    // Redirect to landing page if not authenticated
    console.log('User not authenticated, redirecting to landing page');
    return <Navigate to="/" replace />;
  }

  // User is authenticated, render the protected content
  return <>{children}</>;
};

export default ProtectedRoute;
