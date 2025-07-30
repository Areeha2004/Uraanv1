// app/layout.tsx


import './globals.css';
import { Inter } from 'next/font/google';
import Script from 'next/script';

import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

import { ThemeProvider } from '../contexts/ThemeContext'

import {AuthProvider} from '../contexts/AuthContext';

export const metadata = {
  title: 'Uraan — Your Launch Begins Here',
  description: '...',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Playfair+Display:wght@700&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://unpkg.com/swiper/swiper-bundle.min.css"
        />
        <link
          rel="stylesheet"
          href="https://unpkg.com/aos@2.3.1/dist/aos.css"
        />
      </head>
      <body>
        <ThemeProvider>
          <AuthProvider>
            <div className="min-h-screen bg-gradient-to-br from-base to-baby-powder">
              <Navigation />
              <main>{children}</main>
              <Footer />
            </div>
          </AuthProvider>
        </ThemeProvider>

        {/* Remove this if you already use Tailwind via `globals.css` */}
        {/* <Script src="https://cdn.tailwindcss.com" strategy="beforeInteractive" />*/ }
      </body>
    </html>
  );
}
