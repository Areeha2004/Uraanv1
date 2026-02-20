import './globals.css';
import { Manrope, Playfair_Display } from 'next/font/google';

import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { Providers } from './Providers';

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['400', '500', '600', '700', '800'],
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['600', '700', '800'],
});

export const metadata = { title: 'Uraan - Your Launch Begins Here' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} ${playfair.variable}`}>
        <Providers>
          <div className="min-h-screen bg-gradient-to-br from-base to-baby-powder">
            <Navigation />
            <main>{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
