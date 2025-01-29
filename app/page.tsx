"use client";
import { useState, useEffect } from "react";
import { Amplify } from "aws-amplify";
import { fetchUserAttributes } from 'aws-amplify/auth';
import outputs from "@/amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";
import { Authenticator, Button } from '@aws-amplify/ui-react';
import { useRouter } from 'next/navigation';

Amplify.configure(outputs);

export default function App() {
  const [userName, setUserName] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
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

  const handlePTEClick = () => {
    router.push('/pte');
  };

  const handleProfileClick = () => {
    router.push('/profile');
  };

  return (
    <Authenticator>
      {({ signOut }) => (
        <main className="max-w-5xl mx-auto p-6 bg-white">
          {/* Header Section */}
          <div className="flex justify-between items-center mb-6 border-b pb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Welcome, {userName}!</h1>
            </div>
            <Button
              onClick={signOut}
              variation="primary"
              className="bg-red-600 text-white px-4 py-2 rounded"
            >
              Sign Out
            </Button>
          </div>

          {/* Main Content Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
            {/* PTE Section */}
            <div className="p-6 bg-gray-100 rounded-lg text-center shadow">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">PTE Practice Tests</h2>
              <p className="text-gray-600 mb-6">Take a mock PTE test to practice and improve your skills</p>
              <Button
                onClick={handlePTEClick}
                variation="primary"
                className="bg-blue-500 text-white px-6 py-2 rounded"
              >
                Start PTE Practice
              </Button>
            </div>

            {/* Profile Page Button */}
            <div className="p-6 bg-gray-100 rounded-lg text-center shadow">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">Profile Page</h2>
              <p className="text-gray-600 mb-6">View and edit your profile information</p>
              <Button
                onClick={handleProfileClick}
                variation="primary"
                className="bg-green-500 text-white px-6 py-2 rounded"
              >
                Go to Profile
              </Button>
            </div>
          </div>

          {/* Footer Section */}
          <footer className="mt-10 text-center text-gray-600 border-t pt-4">
            <p>© 2024 Your Application Name. All rights reserved.</p>
          </footer>
        </main>
      )}
    </Authenticator>
  );
}
