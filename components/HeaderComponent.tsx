'use client';

import { usePathname } from 'next/navigation';
import { Authenticator } from '@aws-amplify/ui-react';
import LogoutButton from "./LogoutButton";

export default function HeaderComponent() {
  const pathname = usePathname();

  return (
    <header>
      <Authenticator>
        {({ signOut, user }) => (
          <>
            {user && pathname !== '/login' && pathname !== '/' && (
              <LogoutButton />
            )}
          </>
        )}
      </Authenticator>
    </header>
  );
}

