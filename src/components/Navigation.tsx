"use client"; // ✅ Required if you’re using Next.js App Router with client-side hooks

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; // ✅ Next’s equivalent for useLocation
import { Menu, X, Sun, Moon, User } from 'lucide-react';

import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { user, isAuthenticated, logout } = useAuth();

  // ✅ Next.js equivalent for location.pathname
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/AboutPage', label: 'About' },
    { path: '/HowItWorksPage', label: 'How It Works' },
    { path: '/ExplorePage', label: 'Explore Ideas' },
    { path: '/CommunityPage', label: 'Community' },
    { path: '/CollaborationPage', label: 'Collaborate' },
  ];

  return (
    <nav className="bg-glass-bg backdrop-blur-lg border-b border-secondary/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-light rounded-lg flex items-center justify-center">
              <span className="text-baby-powder font-bold text-lg">U</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent1 bg-clip-text text-transparent">
              URAAN
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`text-sm font-medium transition-all duration-200 hover:text-primary hover:scale-105 ${
                  isActive(link.path) ? 'text-primary' : 'text-text/80'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-glass-bg hover:bg-secondary/20 transition-all duration-200"
            >
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </button>

            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <Link
                  href="/DashboardPage"
                  className="flex items-center space-x-2 px-4 py-2 bg-primary text-baby-powder rounded-lg hover:bg-primary-light transition-all duration-200"
                >
                  <User size={16} />
                  <span>Dashboard</span>
                </Link>
                <button
                  onClick={logout}
                  className="px-4 py-2 text-text/80 hover:text-primary transition-all duration-200"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  href="/LoginPage"
                  className="px-4 py-2 text-text/80 hover:text-primary transition-all duration-200"
                >
                  Login
                </Link>
                <Link
                  href="/SignupPage"
                  className="px-4 py-2 bg-primary text-baby-powder rounded-lg hover:bg-primary-light transition-all duration-200 hover:shadow-lg hover:shadow-result-cta-shadow"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-secondary/20 transition-all duration-200"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-secondary/20">
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                    isActive(link.path)
                      ? 'bg-primary/10 text-primary'
                      : 'text-text/80 hover:bg-secondary/20'
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              <div className="flex items-center justify-between px-4 py-2">
                <span className="text-sm text-text/60">Theme</span>
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-lg bg-glass-bg hover:bg-secondary/20 transition-all duration-200"
                >
                  {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
                </button>
              </div>

              {isAuthenticated ? (
                <div className="flex flex-col space-y-2 px-4">
                  <Link
                    href="/DashboardPage"
                    onClick={() => setIsOpen(false)}
                    className="py-2 bg-primary text-baby-powder rounded-lg text-center hover:bg-primary-light transition-all duration-200"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setIsOpen(false);
                    }}
                    className="py-2 text-text/80 hover:text-primary transition-all duration-200"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex flex-col space-y-2 px-4">
                  <Link
                    href="/LoginPage"
                    onClick={() => setIsOpen(false)}
                    className="py-2 text-center text-text/80 hover:text-primary transition-all duration-200"
                  >
                    Login
                  </Link>
                  <Link
                    href="/SignupPage"
                    onClick={() => setIsOpen(false)}
                    className="py-2 bg-primary text-baby-powder rounded-lg text-center hover:bg-primary-light transition-all duration-200"
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
