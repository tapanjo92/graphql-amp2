'use client';

import { usePathname } from 'next/navigation';
import LogoutButton from "./LogoutButton";

export default function HeaderComponent() {
  const pathname = usePathname();

  return (
    <header>
      {pathname !== '/login' && pathname !== '/' && (
        <LogoutButton />
      )}
    </header>
  );
}
