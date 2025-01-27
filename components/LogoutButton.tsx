"use client";

import { Auth } from '@aws-amplify/auth';
import { useRouter } from 'next/navigation';
import React from 'react';

const LogoutButton: React.FC = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await Auth.signOut();
      router.push('/'); // Redirect to home page after logout
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };

  return (
    <button onClick={handleLogout}>
      Logout
    </button>
  );
};

export default LogoutButton;
