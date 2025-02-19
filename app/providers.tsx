"use client";

import { Amplify } from 'aws-amplify';
import { generateClient } from '@aws-amplify/api';
import { Authenticator } from '@aws-amplify/ui-react';
import config from '../amplify_outputs.json';

// Configure Amplify for the application
Amplify.configure(config);

export const client = generateClient();

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  // Centralize auth state management
  return (
    <Authenticator
      loginMechanisms={['email']}
      socialProviders={[]}
      hideSignUp={false}
      initialState="signIn"
      variation="modal"
      formFields={{
        signIn: {
          username: {
            required: true,
            placeholder: 'Enter your email',
            label: 'Email',
          },
          password: {
            required: true,
            placeholder: 'Enter your password',
            label: 'Password',
          },
        },
      }}
      components={{
        Header() {
          return (
            <div className="text-center p-4">
              <h1 className="text-2xl font-bold">Welcome Back</h1>
              <p className="text-sm text-gray-600 mt-2">Please sign in to continue</p>
            </div>
          );
        },
      }}
    >
      {({ route, authStatus }) => {
        // Check if we're on a protected route
        const pathname = typeof window !== 'undefined' ? window.location.pathname : '';
        const isProtectedRoute = pathname.startsWith('/pte') || pathname.startsWith('/profile');
        const isAuthenticated = route === 'authenticated' && authStatus === "authenticated";

        // Show loading spinner while configuring auth
        if (authStatus === "configuring") {
          return (
            <div className="min-h-screen flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
            </div>
          );
        }

        // For protected routes, only show content when authenticated
        if (isProtectedRoute) {
          // Return the Authenticator if not authenticated, otherwise return the children
          return isAuthenticated ? children : <Authenticator />;
        }

        // For public routes, always show content
        return children;
      }}
    </Authenticator>
  );
}
