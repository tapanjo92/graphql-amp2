// filepath: components/LogoutButton.tsx
import { Auth } from 'aws-amplify';
import { useRouter } from 'next/router';
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
