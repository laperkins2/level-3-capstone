import { Inter } from 'next/font/google';
import './globals.css';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Finance App',
  description: 'Finance App to track spending',
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="bg-black text-white py-4 text-center">
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <nav className="relative flex justify-between h-16 items-center">
              <Link className="m-1 hover:text-red-800" href="/">
                Home
              </Link>
              <Link className="m-1 hover:text-red-800" href="/management">
                Track Spending
              </Link>
            </nav>
          </div>
        </header>

        {children}
        <footer className="bg-black text-white py-4 text-center">
          &copy; Louis Perkins
        </footer>
      </body>
    </html>
  );
};

export default RootLayout;
