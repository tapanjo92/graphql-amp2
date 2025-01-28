'use client';

import { usePathname } from 'next/navigation';
import LogoutButton from "./LogoutButton";

const HeaderComponent: React.FC = () => {
  const pathname = usePathname();

  return (
    <header>
      {pathname !== '/login' && pathname !== '/' && (
        <LogoutButton />
      )}
    </header>
  );
};

export default HeaderComponent;
