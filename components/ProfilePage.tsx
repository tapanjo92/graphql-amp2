'use client';

import { useState, useEffect } from 'react';
import { getCurrentUser, fetchUserAttributes, signOut } from 'aws-amplify/auth';
import { useRouter } from 'next/navigation';
import ProfileHeader from '@/components/ProfileHeader';
import ProfileInfo from '@/components/ProfileInfo';
import ActionButtons from '@/components/ActionButtons';

interface UserData {
  givenName: string;
  familyName: string;
  email: string;
  isComplete: boolean;
}

const ProfilePage: React.FC = () => {
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
      <div className="flex justify-center items-center h-screen">
        <p>Loading your profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <ProfileHeader userData={userData} />
        <ProfileInfo userData={userData} />
        <ActionButtons handleSignOut={handleSignOut} />
      </div>
    </div>
  );
};

export default ProfilePage;
