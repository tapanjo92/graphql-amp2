"use client";
import { useState, useEffect } from "react";
import { fetchUserAttributes } from 'aws-amplify/auth';
import outputs from "@/amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";
import { Authenticator, Button, Heading, View, Text, Flex } from '@aws-amplify/ui-react';
import { useRouter } from 'next/navigation';

/**
 * Main application component with authentication and navigation
 * Implements AWS Amplify Gen2 authentication with Authenticator component
 * @returns React component
 */
export default function App(): JSX.Element {
  const [userName, setUserName] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async (): Promise<void> => {
      try {
        const user = await fetchUserAttributes();
        setUserName(user.email || 'User');
      } catch (error) {
        console.error('Error fetching user:', error);
        setUserName('User');
      }
    };
    fetchUser();
  }, []);

  const handlePTEClick = (): void => {
    router.push('/pte');
  };

  const handleProfileClick = (): void => {
    router.push('/profile');
  };
  
  const handleKeyDown = (event: React.KeyboardEvent, action?: () => void): void => {
    if ((event.key === 'Enter' || event.key === ' ') && action) {
      action();
    }
  };

  return (
    <Authenticator>
      {({ signOut }) => (
        <View as="main" className="max-w-5xl mx-auto p-6 bg-white">
          {/* Header Section */}
          <Flex justifyContent="space-between" alignItems="center" className="mb-6 border-b pb-4">
            <View>
              <Heading level={1} className="text-2xl font-bold text-gray-800">Welcome, {userName}!</Heading>
            </View>
            <Button
              onClick={signOut}
              variation="primary"
              colorTheme="error"
              className="px-4 py-2 rounded"
              aria-label="Sign out of your account"
              tabIndex={0}
              onKeyDown={(e) => handleKeyDown(e, signOut)}
            >
              Sign Out
            </Button>
          </Flex>

          {/* Main Content Section */}
          <Flex direction="column" gap="large" className="mt-10">
            <Flex
              direction={{base: "column", medium: "row"}}
              gap="large" 
              justifyContent="space-between"
              alignItems="stretch"
            >
              {/* PTE Section */}
              <View className="flex-1 p-6 bg-gray-100 rounded-lg text-center shadow">
                <Heading level={2} className="text-xl font-semibold text-gray-700 mb-4">PTE Practice Tests</Heading>
                <Text className="text-gray-600 mb-6">Take a mock PTE test to practice and improve your skills</Text>
                <Button
                  onClick={handlePTEClick}
                  variation="primary"
                  colorTheme="info"
                  className="px-6 py-2 rounded"
                  aria-label="Start PTE practice tests"
                  tabIndex={0}
                  onKeyDown={(e) => handleKeyDown(e, handlePTEClick)}
                >
                  Start PTE Practice
                </Button>
              </View>

              {/* Profile Page Button */}
              <View className="flex-1 p-6 bg-gray-100 rounded-lg text-center shadow">
                <Heading level={2} className="text-xl font-semibold text-gray-700 mb-4">Profile Page</Heading>
                <Text className="text-gray-600 mb-6">View and edit your profile information</Text>
                <Button
                  onClick={handleProfileClick}
                  variation="primary"
                  colorTheme="success"
                  className="px-6 py-2 rounded"
                  aria-label="Navigate to your profile page"
                  tabIndex={0}
                  onKeyDown={(e) => handleKeyDown(e, handleProfileClick)}
                >
                  Go to Profile
                </Button>
              </View>
            </Flex>
          </Flex>

          {/* Footer Section */}
          <View as="footer" className="mt-10 text-center text-gray-600 border-t pt-4">
            <Text>© 2024 PTE Practice Application. All rights reserved.</Text>
          </View>
        </View>
      )}
    </Authenticator>
  );
}



