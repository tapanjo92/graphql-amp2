"use client";

import { signOut } from 'aws-amplify/auth';
import { useRouter } from 'next/navigation';
import { useAuthenticator } from '@aws-amplify/ui-react';
import React, { useCallback, useState } from 'react';
import { AuthError } from 'aws-amplify/auth';

/**
 * LogoutButton Component
 * Handles user logout functionality with error handling and loading states
 * Uses AWS Amplify Gen2 signOut method
 */
const LogoutButton: React.FC = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Memoized logout handler to prevent unnecessary re-renders
  const handleLogout = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      await signOut();
      // Clear any application state or local storage if needed
      localStorage.clear();
      // Redirect to home page after successful logout
      router.replace('/');
      router.refresh();
    } catch (error) {
      // Type guard to check if error is AuthError
      if (error instanceof AuthError) {
        setError(`Authentication error: ${error.message}`);
      } else {
        setError('An unexpected error occurred during logout');
      }
      console.error('Error signing out:', error);
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  const { route, authStatus } = useAuthenticator((context) => [context.route, context.authStatus]);

  // Only show logout button when authenticated
  if (route !== 'authenticated' || authStatus !== "authenticated") {
    return null;
  }

  return (
    <div className="logout-container">
      {error && <div className="error-message" role="alert">{error}</div>}
      <button
        onClick={handleLogout}
        disabled={isLoading}
        className="logout-button"
        aria-label="Logout"
      >
        {isLoading ? 'Logging out...' : 'Logout'}
      </button>
      <style jsx>{`
        .logout-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }
        .logout-button {
          padding: 8px 16px;
          border-radius: 4px;
          background-color: #f44336;
          color: white;
          border: none;
          cursor: pointer;
          font-weight: 500;
          transition: background-color 0.2s;
        }
        .logout-button:hover:not(:disabled) {
          background-color: #d32f2f;
        }
        .logout-button:disabled {
          background-color: #ccc;
          cursor: not-allowed;
        }
        .error-message {
          color: #f44336;
          font-size: 14px;
          margin-bottom: 8px;
        }
      `}</style>
    </div>
  );
};

export default LogoutButton;

