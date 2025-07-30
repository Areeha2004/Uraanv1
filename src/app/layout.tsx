import './globals.css';
import { Inter } from 'next/font/google';
import Script from 'next/script';

import Navigation from "../components/Navigation"
import Footer from "../components/Footer"
import { Providers } from "./Providers"

export const metadata = { title: "Uraan — Your Launch Begins Here" }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* your <link> tags */}
      </head>
      <body>
        <Providers>
          <div className="min-h-screen bg-gradient-to-br from-base to-baby-powder">
            <Navigation />
            <main>{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  )
}
