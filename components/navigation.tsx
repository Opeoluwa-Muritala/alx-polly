'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navigation = () => {
  const pathname = usePathname();

  return (
    <nav className="flex items-center justify-between w-full">
      {/* Center navigation items */}
      <div className="flex-1"></div>
      <div className="flex items-center justify-center space-x-8 flex-1">
        <Link
          href="/polls/create"
          className={`text-sm font-medium transition-colors hover:text-primary ${
            pathname === '/polls/create' ? 'text-primary underline' : 'text-muted-foreground'
          }`}
        >
          Create Polls
        </Link>
        <Link
          href="/polls"
          className={`text-sm font-medium transition-colors hover:text-primary ${
            pathname === '/polls' ? 'text-primary underline' : 'text-muted-foreground'
          }`}
        >
          My Polls
        </Link>
      </div>
      
      {/* Right-aligned account link */}
      <div className="flex items-center justify-end space-x-4 flex-1">
        <Link
          href="/auth/signin"
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          Account
        </Link>
      </div>
    </nav>
  );
};

export default Navigation;