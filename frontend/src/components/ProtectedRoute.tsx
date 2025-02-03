// ProtectedRoute.tsx
import { useAuth, RedirectToSignIn, useUser } from '@clerk/clerk-react';
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isSignedIn, user } = useUser();

  if (!isSignedIn) {
    return <RedirectToSignIn />;
  }

  // Check if user is new (doesn't have required metadata)
  const isNewUser = !user?.unsafeMetadata?.hasCompletedOnboarding;
  
  // If user is new and not already on the user-form page, redirect to user-form
  if (isNewUser && window.location.pathname !== '/user-form') {
    return <Navigate to="/user-form" replace />;
  }

  return <>{children}</>;
};