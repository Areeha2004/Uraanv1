'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, Moon, Sun, User, X } from 'lucide-react';
import { useSession, signOut } from 'next-auth/react';
import { useTheme } from '../contexts/ThemeContext';

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { status } = useSession();
  const isAuthenticated = status === 'authenticated';
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/AboutPage', label: 'About' },
    { path: '/HowItWorksPage', label: 'How It Works' },
    { path: '/ExplorePage', label: 'Explore Ideas' },
    { path: '/CommunityPage', label: 'Community' },
    { path: '/CollaborationPage', label: 'Collaborate' },
    { path: '/MyCollaborationsPage', label: 'My Collaborations' },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-primary/12 bg-baby-powder/72 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-3 sm:px-5 lg:px-8">
        <div className="flex h-14 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary-light">
              <span className="text-sm font-bold text-baby-powder">U</span>
            </div>
            <span className="font-display text-xl tracking-tight text-text">URAAN</span>
          </Link>

          <div className="hidden items-center gap-1 rounded-full border border-primary/10 bg-baby-powder/70 px-2 py-1 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`rounded-full px-3 py-1.5 text-[13px] font-medium transition-all duration-200 ${
                  isActive(link.path)
                    ? 'bg-primary text-baby-powder shadow-[0_8px_20px_-14px_rgba(138,31,74,0.95)]'
                    : 'text-text/80 hover:bg-primary/10 hover:text-primary'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden items-center gap-2 md:flex">
            <button
              onClick={toggleTheme}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-primary/15 bg-baby-powder/80 text-text transition-all duration-200 hover:border-primary/35 hover:text-primary"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
            </button>

            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <Link
                  href="/DashboardPage"
                  className="inline-flex items-center gap-2 rounded-lg border border-primary/20 bg-primary/10 px-3 py-2 text-sm font-semibold text-primary transition-all duration-200 hover:border-primary/35 hover:bg-primary/15"
                >
                  <User size={14} />
                  Dashboard
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: '/LoginPage' })}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-text/80 transition-colors duration-200 hover:text-primary"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/LoginPage"
                  className="rounded-lg px-3 py-2 text-sm font-medium text-text/80 transition-colors duration-200 hover:text-primary"
                >
                  Login
                </Link>
                <Link
                  href="/SignupPage"
                  className="rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-baby-powder transition-all duration-200 hover:bg-primary-light"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-primary/15 bg-baby-powder/85 text-text transition-all duration-200 hover:border-primary/35 hover:text-primary md:hidden"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {isOpen && (
          <div className="border-t border-primary/10 py-3 md:hidden">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`rounded-lg px-3 py-2 text-sm transition-all duration-200 ${
                    isActive(link.path)
                      ? 'bg-primary/12 font-semibold text-primary'
                      : 'text-text/80 hover:bg-primary/10 hover:text-primary'
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              <div className="mt-1 flex items-center justify-between rounded-lg border border-primary/10 bg-baby-powder/70 px-3 py-2">
                <span className="text-sm text-text/70">Theme</span>
                <button
                  onClick={toggleTheme}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-primary/15 bg-baby-powder text-text"
                  aria-label="Toggle theme"
                >
                  {theme === 'light' ? <Moon size={15} /> : <Sun size={15} />}
                </button>
              </div>

              {isAuthenticated ? (
                <div className="mt-1 flex flex-col gap-2">
                  <Link
                    href="/DashboardPage"
                    onClick={() => setIsOpen(false)}
                    className="rounded-lg bg-primary px-3 py-2 text-center text-sm font-semibold text-baby-powder"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => signOut({ callbackUrl: '/LoginPage' })}
                    className="rounded-lg px-3 py-2 text-sm text-text/80 hover:text-primary"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="mt-1 grid grid-cols-2 gap-2">
                  <Link
                    href="/LoginPage"
                    onClick={() => setIsOpen(false)}
                    className="rounded-lg border border-primary/15 px-3 py-2 text-center text-sm font-medium text-text/80"
                  >
                    Login
                  </Link>
                  <Link
                    href="/SignupPage"
                    onClick={() => setIsOpen(false)}
                    className="rounded-lg bg-primary px-3 py-2 text-center text-sm font-semibold text-baby-powder"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
