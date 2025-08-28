import Link from 'next/link';
import Navigation from './navigation';

const Header = () => {
  return (
    <header className="border-b">
      <div className="container mx-auto py-4 px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/polls" className="text-2xl font-bold text-primary">
              Alx Polly
            </Link>
          </div>
          <Navigation />
        </div>
      </div>
    </header>
  );
};

export default Header;