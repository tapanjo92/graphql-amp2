'use client';

import { useState, useEffect } from 'react';
import { getCurrentUser, fetchUserAttributes, signOut } from 'aws-amplify/auth';
import { useRouter } from 'next/navigation';
import { View, Card, Heading, Text, Button, Flex } from '@aws-amplify/ui-react';

interface UserData {
  givenName: string;
  familyName: string;
  email: string;
  isComplete: boolean;
}

export default function ProfilePage() {
  const router = useRouter();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthAndLoadData = async () => {
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

  const fetchUserData = async () => {
    try {
      const currentUser = await getCurrentUser();
      const attributes = await fetchUserAttributes();

      const missingAttributes = [];
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

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (loading || !userData) {
    return (
      <View className="flex justify-center items-center h-screen">
        <p>Loading your profile...</p>
      </View>
    );
  }

  return (
    <View className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <View className="max-w-4xl mx-auto space-y-6">
        <Card>
          <Heading level={3}>Profile</Heading>
          <Flex direction="column" gap="medium">
            <Text>Name: {userData.givenName} {userData.familyName}</Text>
            <Text>Email: {userData.email}</Text>
          </Flex>
        </Card>
        
        <Card variation="outlined">
          <Heading level={4}>Professional Information</Heading>
          <Text>Add your professional headline and location.</Text>
          <Flex gap="medium" marginTop="medium">
            <Button onClick={() => router.push('/profile/edit')}>Edit Profile</Button>
            <Button onClick={handleSignOut} variation="link">Sign Out</Button>
          </Flex>
        </Card>
      </View>
    </View>
  );
};
