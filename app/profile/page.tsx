'use client';

import { useState, useEffect } from 'react';
import { getCurrentUser, fetchUserAttributes, signOut } from 'aws-amplify/auth';
import { useRouter } from 'next/navigation';

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
    checkAuthAndLoadData();
  }, []);

  async function checkAuthAndLoadData() {
    try {
      await getCurrentUser();
      await fetchUserData();
    } catch (error) {
      console.error('Authentication error:', error);
      router.push('/login');
    }
  }

  async function handleSignOut() {
    try {
      await signOut();
      router.push('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  }

  async function fetchUserData() {
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
  }

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
        {/* Header Card */}
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-white">My Profile</h1>
              <button
                onClick={() => router.push('/profile/edit')}
                className="px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors
                         flex items-center space-x-2"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
                <span>Edit Profile</span>
              </button>
            </div>
          </div>
          <div className="p-6">
            <div className="flex items-center space-x-4">
              <div className="h-20 w-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-white">
                  {userData.givenName?.charAt(0)}{userData.familyName?.charAt(0)}
                </span>
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  {userData.givenName} {userData.familyName}
                </h2>
                <p className="text-gray-500">{userData.email}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Information */}
        <div className="bg-white shadow-xl rounded-2xl p-6 space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Professional Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Headline</label>
                <input
                  type="text"
                  placeholder="Add a professional headline"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Location</label>
                <input
                  type="text"
                  placeholder="Add your location"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
            <textarea
              placeholder="Write a short bio"
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            ></textarea>
            <p className="mt-2 text-sm text-gray-500">
              Share your professional background and interests. Links and promotional content are not permitted.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4">
          <button
            onClick={handleSignOut}
            className="px-6 py-2.5 border border-red-500 text-red-500 rounded-lg hover:bg-red-50 transition-colors"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}

