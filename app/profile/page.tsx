'use client';

import { useState, useEffect } from 'react';
import { getCurrentUser, fetchUserAttributes, signOut } from 'aws-amplify/auth';
import { useRouter } from 'next/navigation';
import { View, Card, Heading, Text, Button, Flex, Loader } from '@aws-amplify/ui-react';

/**
 * User profile data interface with typed properties
 */
interface UserData {
  givenName: string;
  familyName: string;
  email: string;
  isComplete: boolean;
}

/**
 * Profile page component displays user information and profile management options
 * Uses AWS Amplify Gen2 authentication to secure the page
 * @returns React component with user profile information
 */
export default function ProfilePage(): JSX.Element {
  const router = useRouter();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkAuthAndLoadData = async (): Promise<void> => {
      try {
        await getCurrentUser();
        await fetchUserData();
      } catch (error) {
        console.error('Authentication error:', error);
        router.push('/login');
      }
    };

    checkAuthAndLoadData();
  }, [router]);

  const fetchUserData = async (): Promise<void> => {
    try {
      const currentUser = await getCurrentUser();
      const attributes = await fetchUserAttributes();

      const missingAttributes: string[] = [];
      if (!attributes.email) missingAttributes.push('email');
      if (!attributes.given_name) missingAttributes.push('first name');
      if (!attributes.family_name) missingAttributes.push('last name');

      setUserData({
        email: attributes.email || currentUser.signInDetails?.loginId || '',
        givenName: attributes.given_name || currentUser.username || '',
        familyName: attributes.family_name || '',
        isComplete: missingAttributes.length === 0,
      });
    } catch (error) {
      console.error('Error fetching user data:', error);
      router.push('/login');
    } finally {
      setLoading(false);
    }
  };
  
  const handleEditProfile = (): void => {
    router.push('/profile/edit');
  };

  const handleSignOut = async (): Promise<void> => {
    try {
      await signOut();
      router.push('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };
  
  const handleKeyDown = (event: React.KeyboardEvent, action: () => void): void => {
    if (event.key === 'Enter' || event.key === ' ') {
      action();
    }
  };

  if (loading || !userData) {
    return (
      <View className="flex justify-center items-center h-screen">
        <Loader size="large" variation="linear" />
        <Text className="mt-4">Loading your profile...</Text>
      </View>
    );
  }

  return (
    <View as="main" className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <View className="max-w-4xl mx-auto space-y-6">
        <Card shadow="small">
          <Heading level={2} className="text-2xl font-semibold mb-4">Profile</Heading>
          <Flex direction="column" gap="medium">
            <Flex alignItems="center">
              <Text className="font-medium w-24">Name:</Text>
              <Text>{userData.givenName} {userData.familyName}</Text>
            </Flex>
            <Flex alignItems="center">
              <Text className="font-medium w-24">Email:</Text>
              <Text>{userData.email}</Text>
            </Flex>
          </Flex>
        </Card>
        
        <Card variation="outlined" shadow="small">
          <Heading level={3} className="text-xl font-semibold mb-2">Professional Information</Heading>
          <Text className="mb-4">Add your professional headline and location.</Text>
          <Flex gap="medium" marginTop="large">
            <Button 
              onClick={handleEditProfile}
              variation="primary"
              colorTheme="info"
              aria-label="Edit your profile information"
              tabIndex={0}
              onKeyDown={(e) => handleKeyDown(e, handleEditProfile)}
            >
              Edit Profile
            </Button>
            <Button 
              onClick={handleSignOut}
              variation="link"
              colorTheme="error"
              aria-label="Sign out of your account"
              tabIndex={0}
              onKeyDown={(e) => handleKeyDown(e, handleSignOut)}
            >
              Sign Out
            </Button>
          </Flex>
        </Card>
      </View>
    </View>
  );
};
