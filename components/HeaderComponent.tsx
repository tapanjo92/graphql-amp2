'use client';

import { usePathname, useRouter } from 'next/navigation';
import { View, Flex, Button, Heading } from '@aws-amplify/ui-react';
import { signOut } from 'aws-amplify/auth';
import Link from 'next/link';

/**
 * Application header component with navigation links and sign out button
 * Conditionally rendered based on current path
 * @returns React component with header navigation
 */
const HeaderComponent = (): JSX.Element | null => {
  const pathname = usePathname();
  const router = useRouter();
  
  // Skip header on login and home page as they have their own auth handling
  if (pathname === '/login' || pathname === '/') {
    return null;
  }
  
  const handleSignOut = async (): Promise<void> => {
    try {
      await signOut();
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };
  
  const handleKeyDown = (event: React.KeyboardEvent, action: () => void): void => {
    if (event.key === 'Enter' || event.key === ' ') {
      action();
    }
  };
  
  return (
    <View 
      as="header" 
      className="bg-white shadow-sm border-b border-gray-200 py-4 px-6"
    >
      <Flex 
        direction="row" 
        justifyContent="space-between" 
        alignItems="center"
        className="max-w-7xl mx-auto"
      >
        <Flex 
          className="gap-6" 
          alignItems="center"
        >
          <Heading level={4} className="font-bold">PTE Practice</Heading>
          
          <nav aria-label="Main navigation">
            <Flex as="ul" className="list-none gap-4" alignItems="center">
              <li>
                <Link 
                  href="/pte" 
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    pathname.includes('/pte') ? 'text-blue-700 bg-blue-50' : 'text-gray-600 hover:text-blue-700'
                  }`}
                  aria-current={pathname.includes('/pte') ? 'page' : undefined}
                >
                  Practice Tests
                </Link>
              </li>
              <li>
                <Link 
                  href="/profile" 
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    pathname.includes('/profile') ? 'text-blue-700 bg-blue-50' : 'text-gray-600 hover:text-blue-700'
                  }`}
                  aria-current={pathname.includes('/profile') ? 'page' : undefined}
                >
                  Profile
                </Link>
              </li>
            </Flex>
          </nav>
        </Flex>
        
        <Button
          onClick={handleSignOut}
          variation="link"
          colorTheme="error"
          aria-label="Sign out of your account"
          tabIndex={0}
          onKeyDown={(e) => handleKeyDown(e, handleSignOut)}
          className="text-sm font-medium"
        >
          Sign Out
        </Button>
      </Flex>
    </View>
  );
};

export default HeaderComponent;

