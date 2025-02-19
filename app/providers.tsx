"use client";

import React, { useState, useEffect } from 'react';
import { Amplify } from 'aws-amplify';
import { generateClient } from '@aws-amplify/api';
import { Authenticator, useAuthenticator, View } from '@aws-amplify/ui-react';
import type { AuthUser } from 'aws-amplify/auth';
import { type ReactElement } from 'react';

import config from '../amplify_outputs.json';

Amplify.configure(config);

export const client = generateClient();

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    setIsInitializing(false);
  }, []);

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
      {(): JSX.Element => {
        const { user } = useAuthenticator((context) => [context.user]);

        const pathname = typeof window !== 'undefined' ? window.location.pathname : '';
        const isProtectedRoute = pathname.startsWith('/pte') || pathname.startsWith('/profile');
        const isAuthenticated = !!user;

        const shouldShowHeader = isAuthenticated && isProtectedRoute; // Calculate whether to show header

        if (isInitializing) {
          return (
            <View className="min-h-screen flex items-center justify-center">
              <View className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900" />
            </View>
          );
        }

        if (isProtectedRoute && !isAuthenticated) {
          return <Authenticator />;
        }

        // Pass shouldShowHeader as a prop
        return <View data-should-show-header={shouldShowHeader.toString()}>{children}</View>;
      }}
    </Authenticator>
  );
}
