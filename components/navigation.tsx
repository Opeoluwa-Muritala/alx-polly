'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/app/auth/context/auth-context';

const Navigation = () => {
  const pathname = usePathname();
  const { user } = useAuth();

  return (
    <nav className="flex items-center justify-between w-full">
      {/* Center navigation items */}
      <div className="flex-1"></div>
      <div className="flex items-center justify-center space-x-2 flex-1">
        <Link
          href="/polls/create"
          className={`px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 ${
            pathname === '/polls/create' ? 'text-primary' : 'text-muted-foreground'
          }`}
        >
          Create Polls
        </Link>
        <Link
          href="/polls"
          className={`px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 ${
            pathname === '/polls' ? 'text-primary' : 'text-muted-foreground'
          }`}
        >
          My Polls
        </Link>
      </div>
      
      <div className="flex-1"></div>
    </nav>
  );
};

export default Navigation;