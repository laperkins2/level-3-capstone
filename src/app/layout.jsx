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
        <header>
          <div>
            <nav>
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
        <footer>&copy; Louis Perkins</footer>
      </body>
    </html>
  );
};

export default RootLayout;
