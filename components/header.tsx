'use client';

import Link from 'next/link';
import Navigation from './navigation';
import { useAuth } from '@/app/auth/context/auth-context';
import { Button } from './ui/button';

const Header = () => {
  const { user, signOut } = useAuth();

  return (
    <header className="border-b border-gray-200/60 dark:border-gray-800/60">
      <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/polls" className="text-2xl font-bold text-primary">
              ALX Polly
            </Link>
          </div>
          <Navigation />
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <span>Welcome, {user.email}</span>
                <Button onClick={signOut}>Sign Out</Button>
              </>
            ) : (
              <Link
                href="/auth/signin"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                Account
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;